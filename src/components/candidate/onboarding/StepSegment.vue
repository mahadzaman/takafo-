<template>
  <div class="step-indicator d-flex justify-space-between">
    <div
      v-for="step in totalSteps"
      :key="step"
      :class="['step-segment', { active: step === props.currentStep }]"
    ></div>
  </div>
  <div class="step-content">
    <div class="d-flex align-center">
      <h2 class="base-title stepper mar-b-40">
        Step {{ props.currentStep }}
        <span class="base-heading-1 text-disabled"
style="font-size: 28px"
          >/ {{ totalSteps }}</span
        >
      </h2>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/scss/variables';

.step-indicator {
  width: 100%;
  max-width: 600px;
  height: 4px;
  margin-bottom: 16px;
  position: relative;
}

.step-segment {
  flex-grow: 1;
  height: 100%;
  background-color: lightColor(step-segment);
  margin-right: 4px;

  &.active {
    background-color: lightColor(primary);
  }

  &:last-child {
    margin-right: 0;
  }
}

.step-content {
  text-align: left;
  width: 100%;
  max-width: 600px;

  .stepper {
    color: lightColor(step-segment);
  }
}
</style>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  currentStep: number;
}>();

const totalSteps = 4;
</script>
