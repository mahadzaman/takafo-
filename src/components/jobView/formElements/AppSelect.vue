<template>
  <p class="field-label">
    {{ title }}
  </p>

  <v-select
    v-model="internalValue"
    :class="[customClass]"
    :items="options"
    :label="placeholder"
    variant="solo"
    :disabled="disabled"
    :required="isRequired"
  ></v-select>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

interface Props<T> {
  title: string;
  placeholder?: string;
  options: Array<T>;
  modelValue: string | undefined;
  disabled?: boolean;
  isRequired?: boolean;
  customClass?: Array<string | Record<string, boolean>>;
}

const props = withDefaults(defineProps<Props<any>>(), {
  title: 'Select an option',
  placeholder: 'Select an option',
});

// Emit events
const emit = defineEmits(['update:modelValue']);

const internalValue = ref(props.modelValue);

watch(
  () => props.modelValue,
  newValue => {
    internalValue.value = newValue;
  },
  { deep: true }
);

watch(
  () => internalValue,
  newValue => {
    emit('update:modelValue', newValue);
  },
  { deep: true }
);
</script>

<style lang="scss" scoped>
@import '@/assets/styles/scss/functions';

.form-field-input {
  border-radius: pxToRem(20);
  /* Add styles to make it consistent with TextField */
}
</style>
