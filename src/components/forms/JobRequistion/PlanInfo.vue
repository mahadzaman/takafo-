<template>
  <div class="base-form">
    <div class="form-field pa-md-5">
      <v-row>
        <v-col>
          <h1 class="base-heading-1 main mb-5">Plan Info</h1>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <h1 class="base-body-text-1 font-weight-bold">Number of Hires</h1>
          <v-text-field
            v-model="localFormValues.numberOfHires"
            @input="emitFormValues"
            placeholder="Type..."
            class="form-field-job-input"
            hide-details
            variant="solo"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <h1 class="base-body-text-1 font-weight-bold">Budget Type</h1>

          <v-select
            v-model="localFormValues.budgetType"
            @input="emitFormValues"
            :items="budgetType"
            placeholder="Select..."
            hide-details
            menu-icon="none"
            variant="solo"
            title="Select Contract Type"
            class="form-field-job-input radius-16"
          >
            <template v-slot:append-inner>
              <v-icon color="primary" icon="mdi-chevron-down"></v-icon>
            </template>
          </v-select>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <h1 class="base-body-text-1 font-weight-bold">Budget Year</h1>
          <v-date-input
            v-model="localFormValues.budgetYear"
            @input="emitFormValues"
            placeholder="00/00/0000"
            prepend-icon=""
            append-inner-icon="mdi-calendar-month"
            hide-details
            color="primary"
            class="form-field-job-input radius-16"
          >
          </v-date-input>
        </v-col>
        <v-col cols="12" md="6">
          <h1 class="base-body-text-1 font-weight-bold">Contract Type</h1>

          <v-select
            v-model="localFormValues.contractType"
            @input="emitFormValues"
            :items="contractType"
            placeholder="Select..."
            hide-details
            menu-icon="none"
            variant="solo"
            title="Select Contract Type"
            class="form-field-job-input radius-16"
          >
            <template v-slot:append-inner>
              <v-icon color="primary" icon="mdi-chevron-down"></v-icon>
            </template>
          </v-select>
        </v-col>

        <v-col cols="12">
          <h1 class="base-body-text-1 font-weight-bold">Business Case</h1>

          <v-textarea
            v-model="localFormValues.businessCase"
            @input="emitFormValues"
            placeholder="Type..."
            class="form-field-job-input"
            hide-details
            variant="solo"
          ></v-textarea>
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

const contractType = ref(['Contract', 'Full Time Employee', 'Maseeraty']);

const budgetType = ref(['Budgeted', 'Non-Budgeted']);

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
