<template>
  <div class="container flex-wrap pa-md-2 mb-3">
    <div class="content d-flex flex-wrap align-center">
      <div class="d-flex align-center">
        <v-img
          class="mr-5"
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
      <p class="base-body-text-2">{{ props.percentageMatch }}% Match</p>
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
    percentageMatch: string;
    image?: string;
  }>(),
  {
    name: 'Software Engineer',
    date: '10th June, 2024',
    percentageMatch: '90',
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
</style>
