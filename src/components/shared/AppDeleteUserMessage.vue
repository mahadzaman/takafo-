<template>
  <v-dialog v-model="dialog" max-width="550" persistent>
    <div class="base-card d-flex base-card-dialog flex-column base-form">
      <div class="d-flex my-5 justify-space-between">
        <v-img class="bg-job-table-head" :src="profileImage" />
        <v-icon @click="closeModal" color="danger" icon="mdi-close"></v-icon>
      </div>
      <p v-if="title" class="mb-3 base-heading-3">
        {{ props.title }}
      </p>
      <div class="d-flex direction-row justify-end">
        <v-btn
          class="mt-6 mr-2 base-body-text-1 base-button"
          @click="cancelDeletion"
        >
          Cancel
        </v-btn>
        <v-btn :class="'base-button'" class="mt-6" @click="executeDeletion">
          Delete
        </v-btn>
      </div>
    </div>
  </v-dialog>
</template>

<script lang="ts" setup>
import { ref, defineProps } from 'vue';
import profileImage from '@/assets/images/dummy-profile-image.svg';
const props = defineProps<{
  title: string;
}>();

const emit = defineEmits(['close']);

const dialog = ref(true);

const cancelDeletion = () => {
  closeModal();
};

const executeDeletion = () => {
  console.log('Handle deletion logic here!');
  closeModal();
};

const closeModal = () => {
  emit('close');
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/scss/cards';
@import '@/assets/styles/scss/typography';
@import '@/assets/styles/scss/forms';

.base-card-dialog {
  @extend .base-card;
  padding: 0 1.25rem !important;
  border-radius: 12px !important;
}
.v-img {
  max-width: 50px;
  margin: 10px;
  border-radius: 12px;
}
.v-btn {
  max-width: 130px;
  min-height: 50px;
}
</style>
