<template>
  <div class="app-container pa-md-1 mt-3">
    <div class="base-form">
      <div class="form-field ml-1 mt-1">
        <v-row>
          <v-col cols="12" md="6">
            <h1 class="base-body-text-1 font-weight-bold">Requisition Title</h1>

            <v-text-field
              v-model="mubadalaFormValues.requisitionTitle"
              placeholder="Enter Job Title"
              class="form-field-job-input"
              hide-details
              variant="solo"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <h1 class="base-body-text-1 mx-1 font-weight-bold">
              Recruiter Assistant
            </h1>

            <v-text-field
              v-model="mubadalaFormValues.assets"
              class="form-field-job-input"
              hide-details
              variant="solo"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mb-3">
          <v-col cols="12" md="6">
            <h1 class="base-body-text-1 font-weight-bold">Recruiter</h1>
            <v-select
              v-model="mubadalaFormValues.recruiter"
              :items="recruiter"
              placeholder="Select..."
              hide-details
              menu-icon=""
              variant="solo"
              class="form-field-job-input radius-16"
            >
              <template v-slot:append-inner>
                <v-icon color="primary" icon="mdi-chevron-down"></v-icon>
              </template>
            </v-select>
          </v-col>
          <v-col cols="12" md="6">
            <h1 class="base-body-text-1 font-weight-bold">Hiring Manager</h1>
            <v-select
              v-model="mubadalaFormValues.hiringManager"
              :items="names"
              placeholder="Select..."
              hide-details
              menu-icon=""
              variant="solo"
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
            <h1 class="base-body-text-1 font-weight-bold">Head of Talent</h1>
            <v-select
              v-model="mubadalaFormValues.headOfTalentPartner"
              :items="headOfTalent"
              placeholder="Select..."
              hide-details
              menu-icon=""
              variant="solo"
              class="form-field-job-input radius-16"
            >
              <template v-slot:append-inner>
                <v-icon color="primary" icon="mdi-chevron-down"></v-icon>
              </template>
            </v-select>
          </v-col>
          <v-col cols="12" md="6">
            <h1 class="base-body-text-1 font-weight-bold">ManPower Planning</h1>
            <v-select
              v-model="mubadalaFormValues.recruiterAssistant"
              :items="manPowerPlanning"
              placeholder="Select..."
              hide-details
              menu-icon=""
              variant="solo"
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
              v-model="mubadalaFormValues.businessCase"
              placeholder="Write..."
              class="form-field-job-input"
              hide-details
              variant="solo"
            ></v-textarea>
          </v-col>

          <v-col cols="12">
            <h1 class="base-body-text-1 font-weight-bold">Purpose</h1>

            <v-textarea
              v-model="mubadalaFormValues.purpose"
              placeholder="Write..."
              class="form-field-job-input"
              hide-details
              variant="solo"
            ></v-textarea>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineExpose } from 'vue';

const names = ref([
  'Tamir Alam',
  'Sariba Nagi',
  'Barak Bangura',
  'Nofia Faraj',
  'Nadim Allee',
]);

const recruiter = ref([
  '0033c41c-616c-4e37-80f1-bb66210f124e',
  '77bcb4bc-f40e-4aec-a1a7-f3ee51b1d9e1',
  '8693dcd6-4985-4364-874a-d4a33d8e5815',
  '3f04c2df-1042-42b9-93a4-db438d24febd',
]);

const manPowerPlanning = ref([
  '77bcb4bc-f40e-4aec-a1a7-f3ee51b1d9e1',
  '0033c41c-616c-4e37-80f1-bb66210f124e',
  '8693dcd6-4985-4364-874a-d4a33d8e5815',
  '3f04c2df-1042-42b9-93a4-db438d24febd',
]);

const headOfTalent = ref(['3f04c2df-1042-42b9-93a4-db438d24febd']);

const mubadalaFormValues = ref({
  requisitionTitle: '',
  assets: 'ABC',
  recruiter: null,
  hiringManager: null,
  headOfTalentPartner: null,
  recruiterAssistant: null,
  businessCase: '',
  purpose: '',
});

function reset(): void {
  mubadalaFormValues.value = {
    requisitionTitle: '',
    assets: '',
    recruiter: null,
    hiringManager: null,
    headOfTalentPartner: null,
    recruiterAssistant: null,
    businessCase: '',
    purpose: '',
  };
}

defineExpose({ reset, mubadalaFormValues });
</script>

<style lang="scss" scoped>
.app-container {
  background-color: lightColor(background);
  border-radius: 20px;
}
</style>
