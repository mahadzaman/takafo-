<template>
  <v-row class="base-form mt-4">
    <v-col cols="12">
      <h2 class="base-heading">
        {{ title }}
      </h2>
      <div class="form-field">
        <v-btn
          variant="outlined"
          color="primary"
          class="radius-16 text-capitalize button"
        >
          Mubadla Investment Company
        </v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { ref, defineProps, type PropType } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: 'Choose Rewards',
  },
  label: {
    type: String,
    default: 'Select...',
  },
  items: {
    type: Array as PropType<string[]>,
    required: true,
  },
});
</script>
