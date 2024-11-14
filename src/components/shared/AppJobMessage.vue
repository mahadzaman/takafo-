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

      <div v-if="props.subtitle" class="form-field">
        <v-textarea
          v-model="comment"
          placeholder="Write..."
          class="form-field-job-input"
          hide-details
          variant="solo"
          :rows="rowHeight"
        ></v-textarea>
      </div>

      <p v-if="props.fieldSubtitle1" class="mb-3 base-body-text-1 font-weight-medium">
        {{ props.fieldSubtitle1 }}
      </p>

      <div v-if="props.fieldSubtitle1" class="form-field">
        <v-text-field
          v-model="fieldData1"
          placeholder="Write..."
          class="form-field-job-input"
          hide-details
          variant="solo"
        ></v-text-field>
      </div>
      <p v-if="props.fieldSubtitle2" class="mb-3 base-body-text-1 font-weight-medium">
        {{ props.fieldSubtitle2 }}
      </p>

      <div v-if="props.fieldSubtitle2" class="form-field">
        <v-text-field
          v-model="fieldData2"
          placeholder="Write..."
          class="form-field-job-input"
          hide-details
          variant="solo"
        ></v-text-field>
      </div>
      <v-btn
        :class="
          comment || fieldData1 || fieldData2
            ? 'base-button'
            : 'base-disable-button'
        "
        class="mt-6"
        @click="saveComment"
      >
        Save
      </v-btn>
    </div>
  </v-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { defineProps } from 'vue';


const props = defineProps({
  placeholder: {
    type: String,
    default: 'Search Anything',
  },
  width: {
    type: String,
    default: '250px',
  },
  fieldSubtitle2: {
    type: String,
    default: null,
  },
  fieldSubtitle1: {
    type: String,
    default: null,
  },
  subtitle: {
    type: String,
    default: null,
  },
  title: {
    type: String,
    default: 'Comments',
  },
  rowHeight: {
    type: Number,
    default: 5,
  }
});

const emit = defineEmits(['close']);

const dialog = ref(true);

const comment = ref<string | null>(null);

const fieldData1 = ref<string | null>(null);

const fieldData2 = ref<string | null>(null);

const saveComment = () => {
  closeModal();
};

const closeModal = () => {
  emit('close');
};
</script>
