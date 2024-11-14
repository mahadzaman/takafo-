<template>
  <div class="alert base-card">
    <h1 class="card-title mar-b-20">Alerts</h1>

    <div class="custom-scrollbar">
      <AppAlerts
        approvalStatus="Technical Manager"
        date="20/March/2012"
        title="Junior Inter"
      />
      <!-- Same For Below-->
      <AppAlerts
        approvalStatus="Technical Manager"
        date="20/March/2012"
        title="Junior Inter"
      />
      <AppAlerts
        approvalStatus="Technical Manager"
        date="20/March/2012"
        title="Junior Inter"
      />
      <!-- Add more AppAlerts as needed -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import AppAlerts from '@/components/dashboard/AppAlerts.vue';
</script>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/assets/styles/scss/cards';
@import '@/assets/styles/scss/typography';
@import '@/assets/styles/scss/variables';

.alert.base-card {
  height: 100%;
}
</style>
