<template>
  <div class="base-form">
    <div class="form-field">
      <v-text-field
        v-model="selectedValue"
        :hide-details="true"
        :placeholder="props.placeholder"
        :width="props.width"
        min-width="100"
        :items="values"
        class="form-field-input"
        variant="solo"
      >
        <template #prepend-inner>
          <img
            alt="Custom Icon"
            class="custom-icon"
            src="/src/assets/icons/search-status.svg"
          />
        </template>
      </v-text-field>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref } from 'vue';

const props = defineProps({
  placeholder: {
    type: String,
    default: 'Search Anything',
  },
  width: {
    type: String,
    default: '250px',
  },
});

const values = ref<string[]>(['Option 1', 'Option 2', 'Option 3']);

const selectedValue = ref<string>('');

function reset() {
  selectedValue.value = '';
}

defineExpose({ reset });
</script>

<style lang="scss" scoped></style>
