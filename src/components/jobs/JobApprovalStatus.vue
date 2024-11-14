<template>
  <div class="d-flex flex-column">
    <p class="base-body-text-1 font-weight-black mb-2">JR Approval Status</p>

    <div class="d-flex flex-wrap-reverse align-center ga-3">
      <div v-for="job in jobs" :key="job.id" class="d-flex mt-sm-9 flex-column">
        <div
          :class="statusClass(job.status)"
          class="d-flex bg-job-table-head radius-16 py-3 px-2 align-center"
        >
          <v-img :width="30" aspect-ratio="16/9" :src="UserOctagon"></v-img>
          <p class="base-body-text-2 mx-2">
            {{ job.role }}
          </p>
          <p
            :class="statusClass(job.status)"
            class="base-body-text-2 radius-16 text-white font-weight-bold py-1 px-3"
          >
            {{ job.status }}
          </p>
        </div>

        <div :class="dottedLineClass(job.status)"></div>
      </div>
    </div>

    <!-- Conditionally show approval or rejection date based on the status -->
    <template v-if="jobs.some(job => job.status === 'approved')">
      <p class="base-body-text-1 font-weight-black">Approved on</p>
      <p class="base-body-text-2">10th June 2024 - 09:34pm</p>
    </template>

    <template v-if="jobs.some(job => job.status === 'rejected')">
      <p class="base-body-text-1 font-weight-black">Rejected on</p>
      <p class="base-body-text-2">10th June 2024 - 09:34pm</p>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import UserOctagon from '@/assets/images/user-octagon.png';

const props = defineProps<{
  jobs: Array<{ id: string; role: string; status: string }>;
}>();

const statusClass = (status: string) => {
  if (status === 'approved') {
    return 'bg-light-green-published-btn';
  } else if (status === 'rejected') {
    return 'bg-red';
  } else {
    return 'bg-warning'; // Yellow background for pending status
  }
};

const dottedLineClass = (status: string) => {
  if (status === 'approved') {
    return 'dotted-line';
  } else if (status === 'rejected') {
    return 'rejected-dotted-line';
  } else {
    return 'mb-13';
  }
};
</script>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/assets/styles/scss/typography';
@import '@/assets/styles/scss/variables';

.dashed-divider {
  border-top: 3px dashed color.adjust(lightColor(border-color), $alpha: -0.8);
}

.bg-light-green-published-btn {
  background-color: lightColor(green);
}

.bg-warning {
  background-color: lightColor(yellow);
}

.bg-red {
  background-color: lightColor(red);
}

.dotted-line {
  height: 50px;
  border-left: 3px dashed lightColor(primary);
  margin-left: 30px;
}

.rejected-dotted-line {
  height: 50px;
  border-left: 3px dashed lightColor(danger);
  margin-left: 30px;
}

.mb-9 {
  margin-bottom: 9px;
}
</style>
