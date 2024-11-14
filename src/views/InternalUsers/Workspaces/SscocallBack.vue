<template>
  <div class="d-flex align-center justify-center">
    <Vue3Lottie :animationData="jsonAnimation" height="700px" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { notify } from '@kyvg/vue3-notification';
import type { AxiosResponse } from 'axios';
import { Vue3Lottie } from 'vue3-lottie';
import { msalInstance } from '@/msalConfig';
import { useSsoLogin } from '@/hooks/auth';
import { useAuthStore } from '@/stores';
import { appUtils } from '@/utils';
import { IApp } from '@/interfaces';
import type { IAuth } from '@/stores/modules/auth';
import jsonAnimation from '@/assets/takafo-loader2.json';

const email = ref('');

const idToken = ref('');

const portal = import.meta.env.VITE_APP_FE_URL;

const authStore = useAuthStore();

const { mutate: verifyLoginMutate, isPending: isLoginPending } = useSsoLogin();

const logoutAndRedirect = async () => {
  console.log('<<<<<--------------Start-------------------->>>>>');
  console.log(import.meta.env.VITE_APP_BASE_URL,'fe url');
  console.log('<<<<<---------------End--------------------->>>>>');

  try {
    await msalInstance.logoutRedirect({
      postLogoutRedirectUri:
        import.meta.env.VITE_APP_BASE_URL ?? 'http://localhost:5173', // Redirect to welcome page or desired location
    });
    localStorage.clear();
    sessionStorage.clear();
  } catch (error) {
    console.error('Error during logout:', error);
  }
};

(async () =>{
  try {
    if (!msalInstance) {
      return;
    }

    const response = await msalInstance.handleRedirectPromise();

    if (response && response.account) {
      email.value = response.account.username;
      idToken.value = response.idToken;

      authStore.setTokens({
        id_token: response.idToken,
        sso_access_token: response.accessToken
      })

      authStore.SsologinPayload.email = email.value.toLowerCase();

      try {
        verifyLoginMutate(undefined, {
          onSuccess: (
            data: AxiosResponse<IApp.APICallResponse<IAuth.LoginUserResponse>>
          ) => {
            authStore.processLogin(data.data.data);

            notify({
              title: 'Login Successful',
              text: "Welcome back! You're now logged in.",
              type: 'success',
            });
          },
          onError: async error => {
            const errorResp = appUtils.extractAxiosErrorMessage(error);

            notify({
              title: errorResp.msg ? 'Login Error!' : 'Service Unavalaible!',
              text: errorResp.msg,
              type: 'error',
              duration: 5000,
            });

            authStore.setAppState(IApp.AppStates.UNAUTHENTICATED);

            // Log the user out and redirect to the welcome page
            await logoutAndRedirect();
          },
        });
      } catch (tokenError) {
        notify({
          title: 'Service Unavalaible!',
          text: 'Login Error!',
          type: 'error',
          duration: 5000,
        });
        await logoutAndRedirect();
      }
    } else {
      notify({
        title: 'Login Unsuccessful',
        text: 'No account information found after redirect.',
        type: 'error',
        duration: 5000,
      });
      authStore.setAppState(IApp.AppStates.UNAUTHENTICATED);
      await logoutAndRedirect();
    }
  } catch (error) {
    notify({
      title: 'Service Unavalaible!',
      text: 'Login Error!',
      type: 'error',
      duration: 5000,
    });
    await logoutAndRedirect();
  }
})();
</script>
