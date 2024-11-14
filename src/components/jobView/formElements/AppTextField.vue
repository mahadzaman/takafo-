<template>
  <div>
    <label class="field-label">{{ title }}</label>

    <v-text-field
      v-model="internalValue"
      class="base-input"
      :placeholder="placeholder"
      hide-details
      variant="solo"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

interface Props {
  title: string;
  modelValue: string;
  placeholder?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Text area',
  placeholder: 'Enter text',
  disabled: false,
});

const internalValue = ref(props.modelValue);

// Emit events
const emit = defineEmits(['update:modelValue']);

watch(
  () => internalValue,
  newValue => {
    emit('update:modelValue', newValue);
  },
  { deep: true }
);
</script>

<style lang="scss" scoped>

</style>
