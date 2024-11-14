<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6" sm="12">
        <div class="mt-10 ml-9">
          <h2 class="base-title">Verify Email</h2>

          <p class="base-body-text-1 mr-2 mb-3">
            Enter the verification code sent to your email -
            <span class="base-heading">{{ userEmail }}</span>
          </p>

          <v-form
            v-model="otpForm"
            class="otp-form"
            @submit.prevent="verifyOtp"
          >
            <div class="form-field d-flex mb-10">
              <v-otp-input
                ref="otpInput"
                v-model="otpValue"
                class="form-field-input"
                length="4"
                variant="solo"
              ></v-otp-input>
            </div>

            <v-btn
              :class="{
                'base-button': otpForm,
                'base-disable-button': !otpForm,
              }"
              :loading="isOtpPending"
              type="submit"
            >
              Verify
            </v-btn>
          </v-form>

          <div class="text-center">
            <p v-if="timer > 0" class="base-body-text-1 mt-8">
              Resend Code in
              <span class="timer text-primary">{{ timer }} Sec</span>
            </p>

            <v-btn
              v-else
              class="resend-link text-primary mt-8"
              :loading="isResendPending"
              variant="plain"
              @click="resendOtp"
            >
              Resend OTP
            </v-btn>
          </div>
        </div>
      </v-col>
      <Sidebar />
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { notify } from '@kyvg/vue3-notification';
import Sidebar from '@/components/Sidebar.vue';
import { appUtils } from '@/utils';
import { useForgotPasswordEmail, useOtpVerification } from '@/hooks/auth';
import { useAuthStore } from '@/stores';
import { AppRoutes } from '@/interfaces/';

const { mutate: verifyOtpMutate, isPending: isOtpPending } =
  useOtpVerification();

const { mutate: resendOtpMutate, isPending: isResendPending } =
  useForgotPasswordEmail();

const otpValue = ref('');

const otpError = ref('');

const timer = ref(59);

const intervalId = ref();

const otpForm = ref(false);

const authStore = useAuthStore();

const userEmail = computed(() => authStore.getUserEmail().value?.email || '');

const router = useRouter();

const route = useRoute();

const validateOtp = () => {
  const otp = otpValue.value;

  if (/^\d{4}$/.test(otp)) {
    otpError.value = '';
    otpForm.value = true;
  } else {
    otpError.value = 'OTP must be a 4-digit number';
    otpForm.value = false;
  }
};

watch(otpValue, validateOtp);

const verifyOtp = () => {
  if (!otpForm.value) {
    return;
  }

  const otpCode = parseInt(otpValue.value);

  authStore.setEmailOtp(otpCode);

  if (!authStore.emailOtp) {
    return;
  }

  verifyOtpMutate(authStore.emailOtp, {
    onSuccess: () => {
      notify({
        title: 'OTP Verified ',
        text: 'OTP has been successfully verified',
        type: 'success',
      });

      router.push(AppRoutes.Auth.EMAIL_VERIFIED);
    },
    onError: error => {
      const errorResp = appUtils.extractAxiosErrorMessage(error);

      notify({
        title: 'OTP Error',
        text: errorResp.msg,
        type: 'error',
      });

      otpValue.value = '';
      otpForm.value = false;
    },
  });
};

const startTimer = () => {
  if (intervalId.value) clearInterval(intervalId.value);
  timer.value = 59;
  intervalId.value = setInterval(() => {
    if (timer.value > 0) {
      timer.value--;
    } else {
      if (intervalId.value) clearInterval(intervalId.value);
    }
  }, 1000);
};

const resendOtp = () => {
  resendOtpMutate(authStore.forgotPasswordPayload, {
    onSuccess: () => {
      notify({
        title: 'Reset Password Link Success',
        text: 'Password reset link sent successfully',
        type: 'success',
      });
      timer.value = 59;
      startTimer();
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

onMounted(() => {
  const queryOtp = route.query.token;

  if (queryOtp && typeof queryOtp === 'string') {
    otpValue.value = queryOtp;
    validateOtp();

    if (otpForm.value) {
      verifyOtp();
    }
  } else if (!userEmail.value) {
    router.push(AppRoutes.Auth.WELCOME);
  } else {
    authStore.forgotPasswordPayload.email = userEmail.value;
  }

  startTimer();
});

onUnmounted(() => {
  if (intervalId.value) clearInterval(intervalId.value);
});
</script>

<style lang="scss" scoped>
.resend-link {
  cursor: pointer;
  text-decoration: none;
}
</style>
