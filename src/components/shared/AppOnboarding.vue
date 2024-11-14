<template>
  <div class="container flex-wrap pa-md-2 mb-3 base-card">
    <div class="ml-3">
      <p class="base-heading-2 mt-3">Onboarding</p>
      <p class="base-body-text-1 text-disabled my-4">
        For Sr.Software Engineer @Takafo+
      </p>
      <div class="custom-scrollbar">
        <AppOnboardingElement
          v-for="(element, index) in onboardingElements"
          :key="index"
          :title="element.title"
          :status="element.status"
        />
        <v-btn class="base-button mt-11">
          Continue
          <v-icon icon="mdi-arrow-right-drop-circle-outline" end></v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import AppOnboardingElement from './AppOnboardingElement.vue';

const onboardingElements = ref([
  { title: 'Contract Offer', status: 'Completed' },
  { title: 'Intake Form', status: 'Pending' },
  { title: 'CV/Resume', status: 'Completed' },
  { title: 'Passport', status: 'Completed' },
  { title: 'ID Card', status: 'Completed' },
  { title: 'Visa & Relocation', status: 'Pending' },
]);
</script>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/assets/styles/scss/variables';
@import '@/assets/styles/scss/button';

.base-button {
  @extend .base-button;
  background: lightColor(job-table-head) !important;
  border: 1.5px solid lightColor(primary);
  color: lightColor(primary);
  min-height: 50px !important;
}

.custom-scrollbar {
  max-height: 535px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    background: lightColor(background);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: color.adjust(lightColor(border-color), $alpha: -0.8);
    border-radius: 10px;
    border: 3px solid lightColor(background);
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: lightColor(primary);
  }
}
</style>
