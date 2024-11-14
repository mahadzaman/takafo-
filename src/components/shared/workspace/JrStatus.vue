<template>
  <div class="base-card height-100">
    <div class="d-flex flex-wrap align-start mar-b-8 justify-space-between">
      <h6 class="card-title">JRs Status</h6>

      <div class="base-form">
        <div class="form-field">
          <v-select
            v-model="position"
            :items="positionList"
            hide-details
            variant="solo"
            class="form-field-job-input radius-16"
          ></v-select>
        </div>
      </div>
    </div>
    <div class="custom-scrollbar">
      <AppEoStatus
        :counter="formatCounter(1)"
        :dashboardElements="dashboardElements"
        status="Open"
        date="12 March, 2024"
        location="Abu Dhabi"
        title="Software Engineer 112"
      />

      <AppEoStatus
        :counter="formatCounter(2)"
        :dashboardElements="dashboardElements"
        date="12 March, 2024"
        location="Abu Dhabi"
        title="Software Engineer"
        status="Open"
      />

      <AppEoStatus
        :counter="formatCounter(3)"
        :dashboardElements="dashboardElements"
        date="12 March, 2024"
        location="Dubai"
        title="HR Manager"
        status="Closed"
      />

      <AppEoStatus
        :counter="formatCounter(4)"
        :dashboardElements="dashboardElements"
        date="12 March, 2024"
        location="Abu Dhabi"
        title="Software Engineer"
        status="Open"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import AppEoStatus from '@/components/shared/AppEoStatus.vue';
import shortlisted from '@/assets/icons/dashboard/shortlisted.svg';
import prescreen from '@/assets/icons/dashboard/prescreen.svg';
import contract from '@/assets/icons/dashboard/contract.svg';
import onboarding from '@/assets/icons/dashboard/onboarding.svg';
import offer from '@/assets/icons/dashboard/offer.svg';

const position = ref<string | null>('Open');

const positionList = ref<string[]>(['Open', 'Close']);

const formatCounter = (counter: number) => {
  return counter < 10 ? `0${counter}` : counter.toString();
};

const dashboardElements = ref([
  {
    src: 'icon-user-edit',
    count: 0,
    label: 'Longlist',
  },
  {
    src: 'icon-user-search',
    count: 0,
    label: 'Prescreen',
  },
  {
    src: 'icon-user-tick',
    count: 0,
    label: 'Shortlisted',
  },
  {
    src: 'icon-user-search',
    count: 0,
    label: 'Assess',
  },
  {
    src: 'icon-document-text',
    count: 0,
    label: 'Offer',
  },
  {
    src: 'icon-tick-square',
    count: 0,
    label: 'Contract',
  },
  {
    src: 'icon-task-square',
    count: 0,
    label: 'Onboarding',
  },
]);
</script>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/assets/styles/scss/variables';
@import '@/assets/styles/scss/cards';

.JRStatus-scrollbar {
  max-height: 700px;
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
    background-color: lightColor(
      primary
    ); /* Color of the scrollbar handle on hover */
  }
}
</style>
