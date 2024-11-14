<template>
  <v-container class="login">
    <div class="centralize-full-vp-content">
      <v-row>
        <v-col
          cols="12"
          md="6"
          sm="12"
          class="pad-r-desktop-only-78 pad-x-common-desktop-60"
        >
          <div class="login-container">
            <div class="d-flex flex-column login-form">
              <h2 class="base-title d-flex align-center mar-b-12">Log In 🚀</h2>
              <p class="mar-b-80">Welcome back, Please enter your details.</p>
              <v-btn
                class="primary-button pad-y-22"
                type="submit"
                :loading="loading"
                @click="login"
              >
                Log In with SSO
              </v-btn>
            </div>
          </div>
        </v-col>
        <Sidebar />
      </v-row>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Sidebar from '@/components/Sidebar.vue';
import { msalInstance } from '@/msalConfig'; // Ensure correct import path

const loading = ref<boolean>(false);

// Define the login function
const login = (): void => {
  loading.value = true;
  const loginRequest = {
    scopes: ['openid', 'profile'], // Add additional scopes if needed
  };

  msalInstance.loginRedirect(loginRequest).catch(error => {
    console.error('Login failed', error);
  });
  loading.value = false;
};

// Define the logout function

// Define the function to handle redirect response
const handleRedirect = async (): Promise<void> => {
  try {
    const response = await msalInstance.handleRedirectPromise();

    if (response) {
      console.log('Login successful', response);
    } else {
      console.error('No response found during the login process.');
    }
  } catch (error) {
    console.error('Error handling redirect', error);
  }
};

// Use onMounted lifecycle hook to handle redirect when component loads
onMounted(() => {
  handleRedirect();
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/scss/button';
@import '@/assets/styles/scss/typography';
@import '@/assets/styles/scss/spacing';

.centralize-full-vp-content {
  min-height: calc(100dvh - 172px);

  .v-row {
    align-items: center;
  }
}
</style>
