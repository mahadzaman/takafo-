<template>
  <v-container class="email">
    <v-row>
      <v-col cols="12" md="6" sm="12">
        <div class="mt-10">
          <v-card-text>
            <div class="reset-form mt-10">
              <div class="heading-with-icon">
                <h2 class="base-title mb-4">Choose Password 🔒</h2>
              </div>

              <p class="base-body-text-1 mb-10">
                Must be at least 8 characters.
              </p>

              <v-form
                v-model="resetPasswordForm"
                class="base-form"
                @submit.prevent="verifyPassword"
              >
                <div class="form-field">
                  <v-text-field
                    v-model.trim="authStore.resetPasswordPayload.new_password"
                    :append-inner-icon="
                      showPassword ? 'mdi-eye' : 'mdi-eye-off'
                    "
                    :rules="passwordRule"
                    :type="showPassword ? 'text' : 'password'"
                    class="form-field-input"
                    placeholder="Password"
                    prepend-inner-icon="mdi-lock"
                    variant="solo"
                    @click:append-inner="togglePasswordVisibility"
                  >
                  </v-text-field>

                  <v-text-field
                    v-model.trim="confirm_password"
                    :append-inner-icon="
                      showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'
                    "
                    :rules="confirmPasswordRules"
                    :type="showConfirmPassword ? 'text' : 'password'"
                    class="form-field-input"
                    placeholder="Confirm Password"
                    prepend-inner-icon="mdi-lock"
                    variant="solo"
                    @click:append-inner="toggleConfirmPasswordVisibility"
                  >
                  </v-text-field>
                </div>

                <v-btn
                  :loading="isPending"
                  :class="{
                    'base-button': resetPasswordForm,
                    'base-disable-button': !resetPasswordForm,
                  }"
                  type="submit"
                >
                  Reset Password
                </v-btn>
              </v-form>

              <p class="base-body-text-1">
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

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { ref, computed, onMounted } from 'vue';
import { notify } from '@kyvg/vue3-notification';
import Sidebar from '@/components/Sidebar.vue';
import { appUtils, formUtils } from '@/utils';
import { useAuthStore } from '@/stores';
import { AppRoutes } from '@/interfaces';
import { useResetPassword } from '@/hooks/auth';
const { mutate, isPending } = useResetPassword();

const confirm_password = ref('');

const router = useRouter();

const resetPasswordForm = ref(false);

const showPassword = ref(false);

const showConfirmPassword = ref(false);

const authStore = useAuthStore();

const userOtp = computed(() => authStore.emailOtp);

const passwordRule = [
  formUtils.requiredRule('Password is required'),
  formUtils.minLengthRule('Password must be at least 8 characters'),
  formUtils.maxLengthRule('Password must be at most 16 characters'),
  formUtils.passwordFormatRule(),
];

const confirmPasswordRules = computed(() => [
  formUtils.requiredRule('Confirm Password is required'),
  formUtils.minLengthRule('Confirm Password must be at least 8 characters'),
  formUtils.maxLengthRule('Confirm Password must be at most 16 characters'),
  formUtils.passwordFormatRule(),
  formUtils.matchPasswordRule(
    'Passwords do not match',
    authStore.resetPasswordPayload.new_password
  ),
]);

onMounted(() => {
  if (!userOtp.value) {
    router.push(AppRoutes.Auth.WELCOME);
  } else {
    authStore.resetPasswordPayload.otp = userOtp.value;
  }
});

const verifyPassword = () => {
  mutate(authStore.resetPasswordPayload, {
    onSuccess: () => {
      notify({
        title: 'Password Changed',
        text: 'Password has been successfully reset',
        type: 'success',
      });
      router.push(AppRoutes.Auth.RESET_PASSWORD_SUCCESS);
    },
    onError: error => {
      const errorResp = appUtils.extractAxiosErrorMessage(error);

      notify({
        title: 'Login Error',
        text: errorResp.msg,
        type: 'error',
      });
    },
  });
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const toggleConfirmPasswordVisibility = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};
</script>
