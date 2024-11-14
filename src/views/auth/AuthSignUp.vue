<template>
  <v-container class="signup">
    <v-row>
      <v-col cols="12" md="6" sm="12">
        <div class="signup-container">
          <v-card-text>
            <div class="signup-form d-flex flex-column">
              <h2 class="base-title mt-3 mb-3">Sign Up 👽</h2>
              <p class="base-body-text-1">
                Please enter your details to setup a new account.
              </p>
              <v-form
                v-model="signUpForm"
                class="base-form"
                @submit.prevent="signup"
              >
                <div class="form-field">
                  <div class="child-container d-flex">
                    <v-text-field
                      v-model.trim="authStore.signUpPayload.full_name"
                      :rules="fullNameRule"
                      class="form-field-input name-field"
                      placeholder="Full Name"
                      prepend-inner-icon="mdi-account"
                      type="text"
                      variant="solo"
                    ></v-text-field>

                    <v-text-field
                      v-model.trim="authStore.signUpPayload.phone"
                      :rules="phoneRule"
                      class="form-field-input"
                      placeholder="Phone Number"
                      prepend-inner-icon="mdi-phone"
                      type="text"
                      variant="solo"
                    ></v-text-field>
                  </div>

                  <v-text-field
                    v-model.trim="authStore.signUpPayload.email"
                    :rules="emailRule"
                    class="form-field-input"
                    placeholder="Your Email"
                    prepend-inner-icon="mdi-email-lock"
                    type="email"
                    variant="solo"
                  ></v-text-field>

                  <v-text-field
                    v-model.trim="authStore.signUpPayload.password"
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
                  ></v-text-field>

                  <v-text-field
                    v-model.trim="confirmPassword"
                    :append-inner-icon="
                      showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'
                    "
                    :rules="confirmPasswordRule"
                    :type="showConfirmPassword ? 'text' : 'password'"
                    class="form-field-input"
                    placeholder="Confirm Password"
                    prepend-inner-icon="mdi-lock"
                    variant="solo"
                    @click:append-inner="toggleConfirmPasswordVisibility"
                  ></v-text-field>
                </div>

                <v-checkbox v-model="agreeTerms" :rules="[termsRule]">
                  <template v-slot:label>
                    <div>
                      I have read and agree to
                      <a
                        class="text-primary text-decoration-none"
                        href="https://vuetifyjs.com"
                        target="_blank"
                        @click.stop
                      >
                        Terms & Condition.
                      </a>
                    </div>
                  </template>
                </v-checkbox>

                <v-btn
                  :class="{
                    'base-button': signUpForm,
                    'base-disable-button': !signUpForm,
                  }"
                  type="submit"
                >
                  Join Now
                </v-btn>
              </v-form>
            </div>
          </v-card-text>
        </div>
      </v-col>

      <Sidebar />
    </v-row>
    <div class="pl-6">
      <div class="social-signup d-md-flex align-center">
        <p class="base-body-text-1 text-disabled">
          Or sign up using these accounts
        </p>
        <v-img
          aspect-ratio="16/9"
          max-heigth="120"
          max-width="80"
          src="/src/assets/images/google.png"
          @click="signupWithGoogle"
        ></v-img>

        <v-img
          aspect-ratio="16/9"
          max-heigth="120"
          max-width="80"
          src="/src/assets/images/linkedin.png"
          @click="signupWithLinkedIn"
        ></v-img>
      </div>
      <p class="base-body-text-1 text-disabled">
        Already have an account?
        <router-link
          class="text-primary text-decoration-none"
          :to="AppRoutes.Auth.WELCOME"
        >
          Log In
        </router-link>
      </p>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { notify } from '@kyvg/vue3-notification';
import Sidebar from '@/components/Sidebar.vue';
import { appUtils, formUtils } from '@/utils';
import { useAuthStore } from '@/stores';
import { useSignUp } from '@/hooks/auth';
import { IAuth } from '@/stores/modules/auth/';
import { IApp, AppRoutes } from '@/interfaces';

const { mutate, isPending } = useSignUp();

// const fullName = ref('')
// const phoneNumber = ref('')
const email = ref('');

const password = ref('');

const confirmPassword = ref('');

const agreeTerms = ref(false);

const showPassword = ref(false);

const showConfirmPassword = ref(false);

const signUpForm = ref(false);

const termsRule = (value: boolean) =>
  value || 'You must agree to the terms and conditions';

const router = useRouter();

const authStore = useAuthStore();

const fullNameRule = [formUtils.requiredRule('Full Name is required')];

const phoneRule = [
  formUtils.requiredRule('Phone Number is required'),
  formUtils.numberEnsurityRule('Phone Number should be digit'),
  formUtils.maxLengthRule('Phone Number must be 11 digit', 11),
  formUtils.minLengthRule('Phone Number must be 11 digit', 11),
];

const emailRule = [
  formUtils.requiredRule('Email is required'),
  formUtils.emailFormatRule('Email is invalid'),
];

const passwordRule = computed(() => [
  formUtils.requiredRule('Password is required'),
  formUtils.minLengthRule('Password must be at least 8 characters'),
  formUtils.maxLengthRule('Password must be at most 16 characters'),
  formUtils.passwordFormatRule(),
]);

const confirmPasswordRule = computed(() => [
  formUtils.requiredRule('Confirm Password is required'),
  formUtils.matchPasswordRule(
    'Passwords do not match',
    authStore.signUpPayload.password
  ),
]);

const signup = () => {
  if (signUpForm.value) {
    mutate(authStore.signUpPayload, {
      onSuccess: () => {
        authStore.setUserEmail({ email: authStore.signUpPayload.email });

        notify({
          title: 'Registration Successful',
          text: 'User is successfully registered.',
          type: 'success',
        });

        router.push(AppRoutes.Auth.OTP);
      },
      onError: error => {
        const errorResp = appUtils.extractAxiosErrorMessage(error);

        notify({
          title: 'Signup Error',
          text: errorResp.msg,
          type: 'error',
        });
      },
    });
  } else {
    console.log('Form is not valid');
  }
};

const signupWithGoogle = () => {
  console.log('Signing up with Google');
};

const signupWithLinkedIn = () => {
  console.log('Signing up with LinkedIn');
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const toggleConfirmPasswordVisibility = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/scss/variables.scss';

.child-container {
  .form-field-input {
    flex: 1;
  }

  .name-field {
    margin-right: 2%;
  }
}
</style>
