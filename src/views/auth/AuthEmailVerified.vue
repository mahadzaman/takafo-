<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6" sm="12">
        <div class="v-divider__wrapper d-flex v-color-picker__controls">
          <v-img
            :width="150"
            aspect-ratio="16/9"
            class="mt-15 mb-8"
            :src="Email"
          ></v-img>

          <h2 class="base-title" style="margin-bottom: 20px">
            Email Verified!
          </h2>
          <v-btn
            v-if="state === 'candidate'"
            class="base-button"
            variant="plain"
            @click="moveToResetPassword"
          >
            Proceed to Registration
          </v-btn>
          <v-btn
            v-else
            class="base-button"
            variant="plain"
            @click="moveToResetPassword"
          >
            Proceed to Reset Password
          </v-btn>
        </div>
      </v-col>
      <Sidebar />
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Sidebar from '@/components/Sidebar.vue';
import { useAuthStore } from '@/stores';
import { AppRoutes } from '@/interfaces';
import Email from '@/assets/images/email-verified.png';

const authStore = useAuthStore();

const userOtp = computed(() => authStore.emailOtp);

const state = sessionStorage.getItem('state');

const router = useRouter();

const moveToResetPassword = () => {
  if (state === 'candidate') {
    router.push(AppRoutes.Onboarding.STEPS);
  } else {
    router.push(AppRoutes.Auth.RESET_PASSWORD);
  }
};

onMounted(() => {
  if (!userOtp.value) {
    router.push(AppRoutes.Auth.WELCOME);
  }
});
</script>
