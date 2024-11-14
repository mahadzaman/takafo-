<template>
  <div class="container flex-wrap pa-md-2 mb-3">
    <div class="content d-flex flex-wrap justify-space-between align-center">
      <div class="info d-flex align-center">
        <v-img
          class="mr-2"
          :width="40"
          aspect-ratio="16/9"
          :src="props.image ? props.image : dummyImage"
        >
        </v-img>

        <div class="d-flex flex-column">
          <p class="base-body-text-1 mb-1">
            {{ props.title }}
          </p>
          <p class="base-body-text-1 text-disabled">
            {{ props.date }}
          </p>
        </div>
      </div>
      <div>
        <p class="pa-1 text-green">
          {{ props.status }}
        </p>
      </div>
    </div>
    <div class="ml-12">
      <p class="base-body-text-1 text-disabled my-2">
        Takafo+ offered you a contract
      </p>
      <div class="d-flex align-center">
        <v-btn
          max-width="123"
          class="mx-1 mt-4 text-primary base-button job-approve-btn font-weight-bold"
        >
          Approve Now
        </v-btn>
        <v-btn
          max-width="70"
          class="mx-1 mt-4 text-danger base-button job-reject-btn font-weight-bold"
        >
          Reject
        </v-btn>
        <v-btn
          variant="text"
          prepend-icon="mdi-eye"
          class="text-primary text-capitalize"
        >
          View Offer
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults } from 'vue';
import dummyImage from '@/assets/images/dummy-image.jpg';

const props = withDefaults(
  defineProps<{
    title: string;
    date: string;
    status: string;
    image?: string;
  }>(),
  {
    name: 'Software Engineer',
    date: '10th June, 2024',
    status: 'onboarding',
  }
);
</script>

<style lang="scss" scoped>
@import '@/assets/styles/scss/variables';

.container {
  background-color: lightColor(background);
  border-radius: 8px;

  .content {
    .match {
      background-color: lightColor(white);
      border-radius: 6px;
    }
  }
}

.base-button {
  @extend .base-button;
  background: lightColor(white) !important;
  min-height: 20px !important;
  font-size: 15px;
}

.job-approve-btn {
  border: 1px solid lightColor(primary) !important;
}

.job-reject-btn {
  border: 1px solid lightColor(red) !important;
}
</style>
