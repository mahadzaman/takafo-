<template>
  <v-dialog
    v-model="visible"
    :max-width="PopupSize.sm"
    :persistent="persistent"
  >
    <!-- Title -->

    <v-card class="base-card pad-y-24 pad-x-24">
      <div class="d-flex align-center justify-space-between">
        <v-card-title class="d-flex align-center justify-space-between font-weight-600 pad-0">
          {{ title }}
        </v-card-title>
        <v-btn
          v-if="isClosable"
          @click="close"
          color="danger"
          variant="text"
          icon="mdi-close"
        ></v-btn>
      </div>

      <!-- Dialog Content -->
      <template v-if="$slots.popupContent">
        <div
          class="popup-content"
          :class="isClosable ? 'min-margin' : 'max-margin'"
        >
          <p class="sub-title" v-if="subtitle">
            {{ subtitle }}
          </p>
          <slot name="popupContent"></slot>
        </div>
      </template>

      <!-- Optional Actions (via Slot) -->
      <template v-if="$slots.actions">
        <div class="actions-wrapper mar-t-20">
          <slot name="actions"></slot>
        </div>
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { PopupSize } from '@/common/interfaces/popup.interface';

interface Props {
  modelValue: boolean;
  title?: string;
  subtitle?: string;
  size?: PopupSize;
  persistent?: boolean;
  isClosable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  size: PopupSize.md,
  persistent: true,
  isClosable: true,
});

interface Emits {
  (event: 'update:modelValue', value: boolean): void;
}

// Define emits with TypeScript
const emit = defineEmits<Emits>();

// Local reactive dialog visibility state
const visible = ref(props.modelValue);

// Watch for changes to modelValue (visibility) and sync with local state
watch(
  () => props.modelValue,
  newValue => {
    visible.value = newValue;
  }
);

// Close dialog and emit event to parent
const close = () => {
  emit('update:modelValue', false);
};
</script>

<style lang="scss" scoped>
@use '@/assets/styles/scss/button';
@import '@/assets/styles/scss/typography';
@import '@/assets/styles/scss/cards';

.actions-wrapper {
  margin-top: auto;

  ::v-deep(.base-disable-button),
  ::v-deep(.primary-button) {
    width: 100%;
  }

  ::v-deep(.base-disable-button) {
    @include button.base-disable-button;
  }

  ::v-deep(.primary-button) {
    @include button.primary-button;
  }
}
</style>
