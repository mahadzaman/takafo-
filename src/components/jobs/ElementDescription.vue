<template>
  <v-row>
    <v-col cols="12">
      <div class="d-flex flex-column">
        <p class="text-data">
          {{ title }}
        </p>
        <div
          class="py-3 px-5 mt-1 display-field bg-white"
          :style="{ height: props.height ? height : 'auto' }"
        >
          <p class="text-data">
            {{ subTitle }}
          </p>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults } from 'vue';

const props = withDefaults(
  defineProps<{
    title: string;
    subTitle: string;
    height?: string;
  }>(),
  {
    title: 'Job Title',
    subTitle: 'Sr. Software Developer',
    height: undefined,
  }
);
</script>

<style lang="scss" scoped>
@import '@/assets/styles/scss/typography';

.text-data {
  @extend .base-body-text-2;
  font-weight: 550;
  font-size: 12px;
}

.display-field {
  border-radius: 12px;
}
</style>
