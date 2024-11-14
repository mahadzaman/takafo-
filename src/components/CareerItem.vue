<template>
  <section class="career-item d-flex align-center">
    <div class="d-flex align-center">
      <v-img
        :src="props.job.image"
        :width="120"
        alt="company logo"
        class="mx-0 px-0"
      />
      <div class="career-details">
        <h3 class="base-heading-3">
          {{ props.job.company }}
        </h3>
        <p class="base-body-text-2 text-disabled">
          {{ props.job.role }}
        </p>
        <p class="base-body-text-2 text-disabled">
          {{ props.job.duration }}
        </p>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

const props = defineProps<{
  job: {
    company: string;
    role: string;
    duration: string;
    image: string;
  };
}>();
</script>

<style lang="scss" scoped>
.career-item {
  background-color: lightColor(stepSegment);
}
</style>
