<template>
  <v-container>
    <div class="v-divider__wrapper d-flex v-color-picker__controls">
      <v-img :width="250" src="/src/assets/images/success-party.png"></v-img>

      <p class="base-heading-1">Password Reset Successfully!</p>

      <v-btn
        class="base-button mt-10 continue-btn"
        variant="plain"
        @click="continueToLogin"
      >
        Continue to Log In
      </v-btn>

      <v-btn class="base-button mt-5 back-btn" variant="plain" @click="goBack">
        Go Back
      </v-btn>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { AppRoutes } from '@/interfaces/';

const router = useRouter();

const continueToLogin = () => {
  router.push(AppRoutes.Auth.WELCOME);
};

const goBack = () => {
  router.back();
};
</script>

<style lang="scss" scoped>
.continue-btn,
.back-btn {
  width: 100%;
  max-width: 375px;
}
</style>
