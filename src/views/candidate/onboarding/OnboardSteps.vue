<template>
  <v-container class="app">

    <AiBotProfile
      v-if="stepCounter === 0"
      @buttonClick="onButtonClick"
      @BackbuttonClick="backToSuccess"
    />

    <CandidateAvailability
      v-if="stepCounter === 1"
      @buttonClick="onButtonClick"
      @BackbuttonClick="goBack"
    />

    <CandidateProfilePictureUpload
      v-if="stepCounter === 2"
      @buttonClick="onButtonClick"
      @BackbuttonClick="goBack"
    />

    <CandidateResumeUpload
      v-if="stepCounter === 3"
      @buttonClick="onButtonClick"
      @BackbuttonClick="goBack"
    />

    <CandidateMediaLinks
      v-if="stepCounter === 4"
      @buttonClick="onButtonClick"
      @BackbuttonClick="goBack"
    />

    <CandidateProfileSuccess
      v-if="stepCounter === 5"
      @BackbuttonClick="goBack"
    />
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AiBotProfile from '@/components/candidate/onboarding/AiBotProfile.vue';
import CandidateAvailability from '@/components/candidate/onboarding/CandidateAvailability.vue';
import CandidateProfilePictureUpload from '@/components/candidate/onboarding/CandidateProfilePictureUpload.vue';
import CandidateResumeUpload from '@/components/candidate/onboarding/CandidateResumeUpload.vue';
import CandidateMediaLinks from '@/components/candidate/onboarding/CandidateMediaLinks.vue';
import CandidateProfileSuccess from '@/components/candidate/onboarding/CandidateProfileSuccess.vue';
import { AppRoutes } from '@/interfaces/';

const stepCounter = ref(0);

const router = useRouter();

const goBack = (): void => {
  stepCounter.value--;
};

const backToSuccess = (): void => {
  router.push(AppRoutes.Auth.EMAIL_VERIFIED);
};

const onButtonClick = (): void => {
  stepCounter.value++;
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/scss/variables.scss';
.app {
  width: 100%;
  background-color: lightColor(background);
  padding: 0 !important;
}
</style>
