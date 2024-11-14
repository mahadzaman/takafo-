<template>
  <v-row class="base-form mt-4">
    <v-col cols="12">
      <h2 class="base-heading">
        {{ props.title }}
      </h2>
      <div class="form-field">
        <v-autocomplete
          v-model="value"
          :items="items"
          :label="label"
          class="form-field-input"
          variant="solo"
          max-width="500px"
        >
          <template v-slot:append-inner>
            <img
              src="/src/assets/icons/drop-down.svg"
              alt="icon"
              class="icon"
            />
          </template>
        </v-autocomplete>
      </div>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { ref, defineProps, defineExpose, type PropType } from 'vue';

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

const value = ref<string>('');

function reset(): void {
  value.value = '';
}

defineExpose({ reset });
</script>

<style lang="scss" scoped>
/* Your styles here */
</style>
