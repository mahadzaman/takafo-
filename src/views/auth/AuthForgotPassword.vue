<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6" sm="12">
        <div class="mt-10">
          <v-card-text>
            <div class="mt-8">
              <div class="heading-with-icon">
                <p class="title-heading mb-7">
                  Forgot <span class="lock">Password 🔒</span>
                </p>
              </div>
              <p class="base-body-text-1 mb-6">
                No worries. We will send you reset instruction.
              </p>
              <v-form
                v-model="forgotPasswordForm"
                class="base-form"
                @submit.prevent="verifyEmail"
              >
                <div class="form-field">
                  <v-text-field
                    v-model.trim="authStore.forgotPasswordPayload.email"
                    class="form-field-input"
                    :rules="emailRule"
                    placeholder="Your Email"
                    prepend-inner-icon="mdi-email-lock"
                    type="email"
                    variant="solo"
                  >
                  </v-text-field>
                </div>

                <v-btn
                  class="mt-5"
                  :loading="isPending"
                  :class="{
                    'base-button': forgotPasswordForm,
                    'base-disable-button': !forgotPasswordForm,
                  }"
                  type="submit"
                >
                  Reset Password
                </v-btn>
              </v-form>
              <p class="my-md-8">
                Already have an account?

                <router-link
                  class="text-primary text-decoration-none"
                  :to="AppRoutes.Auth.WELCOME"
                >
                  Log In
                </router-link>
              </p>
            </div>
          </v-card-text>
        </div>
      </v-col>
      <Sidebar />
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { notify } from '@kyvg/vue3-notification';
import Sidebar from '@/components/Sidebar.vue';
import { appUtils, formUtils } from '@/utils';
import { useForgotPasswordEmail } from '@/hooks/auth';
import { useAuthStore } from '@/stores';
import { AppRoutes } from '@/interfaces';
import { SessionKeys } from '@/constants/sessionKeys';

const { mutate, isPending } = useForgotPasswordEmail();

const forgotPasswordForm = ref(false);

const router = useRouter();

const authStore = useAuthStore();

const emailRule = [
  formUtils.requiredRule('Email is required'),
  formUtils.emailFormatRule('Email is invalid'),
];

const verifyEmail = () => {
  mutate(authStore.forgotPasswordPayload, {
    onSuccess: () => {
      authStore.setUserEmail(authStore.forgotPasswordPayload);
      notify({
        title: 'Reset Password Link Success',
        text: 'Password reset link sent successfully',
        type: 'success',
      });
      router.push(AppRoutes.Auth.OTP);
      sessionStorage.removeItem(SessionKeys.STATE);
    },
    onError: error => {
      const errorResp = appUtils.extractAxiosErrorMessage(error);

      notify({
        title: 'Reset Password Link Error',
        text: errorResp.msg,
        type: 'error',
      });
    },
  });
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/scss/typography';

.title-heading {
  @extend .base-title;
  font-size: 3rem;
}
</style>
