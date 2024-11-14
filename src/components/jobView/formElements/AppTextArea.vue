<template>
  <label class="field-label">{{ title }}</label>
  <v-textarea
  v-model="internalModel"
    :class="['base-textarea', customClass]"
    :placeholder="placeholder"
    hide-details
    variant="solo"
    :rows="rows"
    :disabled="disabled"
  ></v-textarea>
  <p
    v-if="role === 'recruiter'"
    class="d-flex text-disabled justify-end mar-t-10"
  >
    4000 Characters Max
  </p>
</template>

<script setup lang="ts">
import { watch, ref, onUpdated } from 'vue';
import { useAuthStore } from '@/stores';

const authstore = useAuthStore();

const role = authstore.getActiveRole().value?.role_name;

interface Props {
  title: string;
  placeholder?: string;
  rows?: number;
  modelValue: any;
  disabled?: boolean;
  customClass?: Array<string | Record<string, boolean>>;
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Text area',
  placeholder: 'Enter text',
  rows: 6,
  disabled: false,
});

const internalModel = ref(props.modelValue);

const emit = defineEmits(['update:modelValue']);

watch(() => internalModel, (newInternal) => {
  emit('update:modelValue', newInternal);
}, {deep: true});

watch(() => props.modelValue, (newPropVal) => {
  internalModel.value = newPropVal;
})
</script>
