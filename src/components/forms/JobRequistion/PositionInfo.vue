<template>
  <div class="base-form">
    <div class="form-field pa-md-5">
      <v-row>
        <v-col>
          <h1 class="base-heading-1 main mb-2">Position Info</h1>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <h1 class="base-body-text-1 font-weight-bold">Job Title</h1>
          <v-text-field
            v-model="localFormValues.jobTitle"
            @input="emitFormValues"
            placeholder="Type..."
            class="form-field-job-input"
            hide-details
            variant="solo"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <h1 class="base-body-text-1 font-weight-bold">Grade</h1>
          <v-text-field
            v-model="localFormValues.grade"
            @input="emitFormValues"
            placeholder="Type..."
            class="form-field-job-input"
            hide-details
            variant="solo"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <h1 class="base-body-text-1 font-weight-bold">Platform</h1>
          <v-text-field
            v-model="localFormValues.plateform"
            @input="emitFormValues"
            placeholder="Type..."
            class="form-field-job-input"
            hide-details
            variant="solo"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <h1 class="base-body-text-1 font-weight-bold">Unit</h1>
          <v-text-field
            v-model="localFormValues.unit"
            @input="emitFormValues"
            placeholder="Type..."
            class="form-field-job-input"
            hide-details
            variant="solo"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <h1 class="base-body-text-1 font-weight-bold">Location</h1>

          <v-select
            v-model="localFormValues.location"
            @input="emitFormValues"
            :items="location"
            placeholder="Select..."
            hide-details
            menu-icon="none"
            variant="solo"
            title="Select Contract Type"
            class="form-field-job-input"
          >
            <template v-slot:append-inner>
              <v-icon color="primary" icon="mdi-chevron-down"></v-icon>
            </template>
          </v-select>
        </v-col>
        <v-col cols="12" md="6">
          <h1 class="base-body-text-1 font-weight-bold">UAE/UAE Expat</h1>
          <v-text-field
            v-model="localFormValues.countryExpat"
            @input="emitFormValues"
            placeholder="Type..."
            class="form-field-job-input"
            hide-details
            variant="solo"
          ></v-text-field>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue';

const props = defineProps({
  formValues: {
    type: Object,
    required: true,
  },
});

const location = ref(['UAE, Abu Dhabi']);

const emit = defineEmits(['updateFormValues']);

const localFormValues = ref({ ...props.formValues });

watch(props.formValues, newValues => {
  localFormValues.value = { ...newValues };
});

const emitFormValues = () => {
  emit('updateFormValues', localFormValues.value);
};
</script>

<style lang="scss" scoped>
.main {
  @media (max-width: 960px) {
    font-size: 1.6rem;
  }
  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
}
</style>
