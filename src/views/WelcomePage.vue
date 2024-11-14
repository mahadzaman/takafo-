<template>
  <div class="app">
    <main class="welcome-bg">
      <div class="welcome-container">
        <div class="logo d-flex justify-center">
          <img alt="Logo" src="@/assets/images/takafo-logo.svg" />
        </div>

        <div class="text-section">
          <h1>Log In 🚀</h1>
          <p class="base-body-text-1 welcome-subtext">
            Welcome back, by clicking below you will be redirected to SSO log
            in.
          </p>

          <v-btn
            class="primary-button pad-y-22"
            :loading="loading"
            @click="login"
            :disabled="loading"
          >
            <template v-if="!loading">Log in with SSO</template>
            <v-progress-circular
              v-else
              indeterminate
              color="white"
              size="20"
            ></v-progress-circular>
          </v-btn>
        </div>

        <!-- <div class="welcome-footer mar-t-60">
          <h2 class="base-heading-1 my-6 text-center">Career Path</h2>

          <div class="career-featured-compnaies">
            <div v-for="job in jobs" :key="job.company">
              <CareerItem :job="job" />
            </div>
          </div>
        </div> -->

        <!-- <div class="mar-t-20">
          <WelcomeChat />
        </div> -->
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useDisplay } from 'vuetify';
import { notify } from '@kyvg/vue3-notification';
import CareerItem from '@/components/CareerItem.vue';
import WelcomeChat from '@/components/WelcomeChat.vue';
import { AppRoutes } from '@/interfaces';
import Ueno from '@/assets/welcome/Btn.svg';
import Ui8 from '@/assets/welcome/Ui8.svg';
import Invision from '@/assets/welcome/Invision.svg';
import Facebook from '@/assets/welcome/Facebook.svg';
import { msalInstance } from '@/msalConfig'; // Ensure correct import path

const { mdAndDown } = useDisplay();

const loading = ref<boolean>(false);

console.log(import.meta.env.MODE);

// Define the login function
const login = (): void => {
  loading.value = true;
  const loginRequest = {
    scopes: [
      'openid',
      'profile',
      'email',
      'https://takafoplus.onmicrosoft.com/accesstoken/Read',
    ], // Add additional scopes if needed
  };

  msalInstance.loginRedirect(loginRequest).catch(error => {
    loading.value = false; // Stop loading if there's an error
    // notify({
    //   title: 'Service Unavalaible!',
    //   type: 'error',
    //   duration: 5000,
    // });
  });
};

// Handle redirect after login
const handleRedirect = async (): Promise<void> => {
  try {
    const response = await msalInstance.handleRedirectPromise();
    
    if (response) {
      console.log('Login successful', response);
    }
  } catch (error) {
    // notify({ /* error notification */ });
  } finally {
    loading.value = false; // Always stop loading after login attempt
  }
};

onMounted(() => {
  handleRedirect();
});

const router = useRouter();

interface Job {
  company: string;
  role: string;
  duration: string;
  image: string;
}

const jobs = ref<Job[]>([
  {
    company: 'Ueno',
    role: 'Sr. Web Developer',
    duration: '8 months - Current',
    image: Ueno,
  },
  {
    company: 'Ui8',
    role: 'Mid Web Developer',
    duration: '8 months - 2022/23',
    image: Ui8,
  },
  {
    company: 'Invision',
    role: 'Web Developer',
    duration: '8 months - 2021/20',
    image: Invision,
  },
  {
    company: 'Facebook',
    role: 'Jr. Web Developer',
    duration: '8 months - 2020/19',
    image: Facebook,
  },
]);

const continueToLogIn = (): void => {
  router.push(AppRoutes.Auth.WELCOME);
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/scss/variables';
@import '@/assets/styles/scss/button';
@import '@/assets/styles/scss/spacing';
@import '@/assets/styles/scss/functions';
@import '@/assets/styles/scss/responsive';

.app {
  width: 100%;
  background-color: lightColor(welcome-bg);

  .welcome-bg {
    background-image: url('@/assets/images/welcome-bg.png');
  }

  .welcome-container {
    max-width: pxToRem(468);
    margin-right: auto;
    margin-left: auto;
    padding: pxToRem(40) pxToRem(20);
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
    text-align: center;

    .logo {
      margin-top: pxToRem(60);
      margin-bottom: calc(10vh + 5.125rem);
    }

    .text-section {
      h1 {
        font-size: pxToRem(48);
        font-family: $font-family-urbanist;
      }

      p {
        font-size: pxToRem(14);
        margin-top: pxToRem(20);
      }

      .primary-button {
        margin-top: pxToRem(96);
        width: 100%;
      }
    }
  }
}

.wave {
  display: inline-block;
  animation: wave-animation 2.5s infinite;
}

@keyframes wave-animation {
  0%,
  60%,
  100% {
    transform: rotate(0deg);
  }
  10%,
  30% {
    transform: rotate(14deg);
  }
  20%,
  40% {
    transform: rotate(-8deg);
  }
  50% {
    transform: rotate(10deg);
  }
}
</style>
