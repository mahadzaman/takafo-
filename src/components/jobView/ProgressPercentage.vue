<template>
  <!-- Overall Progress Section -->
  <div
    v-if="percentage"
    class="d-flex mar-l-auto align-center progress-container"
  >
    <p class="text-unemphed">Overall Progress:</p>
    <span class="progress-percentage">{{ `${percentage}%` }}</span>
  </div>
</template>
<script lang="ts" setup>
interface Props {
  percentage: string;
}

defineProps<Props>();
</script>
<style lang="scss" scoped>
@import '@/assets/styles/scss/variables';
@import '@/assets/styles/scss/functions';

.progress-percentage {
  font-size: pxToRem(20);
  font-weight: 600;
  margin-left: pxToRem(4);
  color: lightColor(primary);
}
</style>
