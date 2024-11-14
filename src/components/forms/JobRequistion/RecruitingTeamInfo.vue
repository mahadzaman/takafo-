<template>
  <div class="base-form">
    <div class="form-field">
      <v-row>
        <v-col>
          <h1 class="base-heading-1 main mb-5">Recruiter Team Info</h1>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <h1 class="base-body-text-1 font-weight-bold">Hiring Manager</h1>
          <v-select
            v-model="localFormValues.hiringManager"
            :items="dummyData"
            @input="emitFormValues"
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
          <h1 class="base-body-text-1 font-weight-bold">Head of Talent</h1>
          <v-select
            v-model="localFormValues.headOfTalent"
            :items="dummyData"
            @input="emitFormValues"
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
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <h1 class="base-body-text-1 font-weight-bold">MP Planning Manager</h1>
          <v-select
            v-model="localFormValues.mpPlanningManager"
            :items="dummyData"
            @input="emitFormValues"
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
          <h1 class="base-body-text-1 font-weight-bold">Recruiter</h1>
          <v-select
            v-model="localFormValues.recruiter"
            :items="dummyData"
            @input="emitFormValues"
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
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <h1 class="base-body-text-1 font-weight-bold">Recruiter Support</h1>

          <v-select
            v-model="localFormValues.recruiterSupport"
            :items="dummyData"
            @input="emitFormValues"
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
        <v-col cols="12" md="6">
          <h1 class="base-body-text-1 font-weight-bold">Talent Partner</h1>
          <v-select
            v-model="localFormValues.talentPartner"
            :items="dummyData"
            @input="emitFormValues"
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue';

const dummyData = ref(['19ddb998-fc05-43ff-84fd-a9ea0bb6c41c']);

const props = defineProps({
  formValues: {
    type: Object,
    required: true,
  },
});

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
    font-size: 1.2rem;
  }
  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
}
</style>
