<template>
  <v-dialog v-model="dialog" max-width="700" persistent>
    <div class="base-card d-flex base-card-dialog flex-column base-form">
      <div class="d-flex my-5 justify-space-between">
        <p class="base-heading-3">
          {{ props.title }}
        </p>
        <v-icon @click="closeModal" color="danger" icon="mdi-close"></v-icon>
      </div>
      <p v-if="subtitle" class="mb-3 base-body-text-1 font-weight-medium">
        {{ props.subtitle }}
      </p>
      <div>
        <v-select
          :items="roles"
          v-model="comment"
          variant="outlined"
        ></v-select>
      </div>

      <v-btn
        :class="comment ? 'base-button' : 'base-disable-button'"
        class="mt-6"
        @click="saveComment"
      >
        Save
      </v-btn>
    </div>
  </v-dialog>
</template>

<script lang="ts" setup>
import { ref, defineProps } from 'vue';

const props = defineProps<{
  title: string;
  subtitle: string;
}>();

const emit = defineEmits(['close']);

const dialog = ref(true);

const roles = ref([
  'Talent Partner',
  'Recruiter',
  'Admin',
  'Candidate',
  'Super Admin',
]);

const comment = ref<string | null>(null);

const saveComment = () => {
  closeModal();
};

const closeModal = () => {
  emit('close');
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/scss/typography';
@import '@/assets/styles/scss/forms';
</style>
