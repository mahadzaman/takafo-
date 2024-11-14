<template>
  <v-main>
    <div>
      <v-row align="center" justify="center">
        <v-col cols="12" class="d-flex align-center justify-center flex-column">
          <v-img :src="completed" width="500px" alt="Completion Image" />
          <h2
            class="text-center"
            style="
              font-family: 'Urbanist', sans-serif;
              font-size: 32px;
              font-weight: 700;
              line-height: 40px;
              letter-spacing: 0.02em;
              text-align: center;
              color: #024343;
              margin-bottom: 20px;
              max-width: 700px;
            "
          >
            Onboarding Process Completed Successfully!
          </h2>
          <div class="">
            <v-btn
              class="base-button"
              max-width="600px"
              style="margin-bottom: 10px"
              @click="continueToLogIn"
            >
              Continue to Log in
            </v-btn>
            <v-btn class="base-button" @click="onGoBackClick"> Go Back </v-btn>
          </div>
        </v-col>
      </v-row>
    </div>
  </v-main>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import completed from '@/assets/Congratulations.svg';

const router = useRouter();

const continueToLogIn = (): void => {
  router.push('/welcome');
  sessionStorage.removeItem('state');
};

const emit = defineEmits(['BackbuttonClick']);

const onGoBackClick = () => {
  emit('BackbuttonClick');
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@700&display=swap');

.button-container {
  flex-direction: column;
  align-items: center;
}
</style>
