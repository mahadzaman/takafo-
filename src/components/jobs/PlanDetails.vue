<template>
  <v-row>
    <v-col cols="12">
      <div class="display-field pa-3 bg-job-table-head">
        <div class="d-flex align-center flex-wrap justify-space-between">
          <h1 class="base-heading-3 mb-">Plan Info</h1>

          <v-icon
            v-if="showPlanDetail"
            @click="closePlanDetails"
            color="primary"
            icon="mdi-minus-circle-outline"
          ></v-icon>

          <v-icon
            v-if="!showPlanDetail"
            @click="openPlanDetails"
            color="primary"
            icon="mdi-plus-circle-outline"
          ></v-icon>
        </div>

        <div class="mt-3" v-if="showPlanDetail">
          <v-row>
            <v-col md="4">
              <ElementDescription title="Number Of Hires" subTitle="4 " />
              <ElementDescription title="Budgeted Type" subTitle="Permanent" />
            </v-col>
            <v-col md="4">
              <ElementDescription title="Contract Type" subTitle="Permanent" />
              <ElementDescription title="Budgeted Year" subTitle="2025" />
            </v-col>
            <v-col md="4">
              <ElementDescription
                title="Bussiness Case"
                subTitle="Dubai, UAE"
                height="152px"
              />
            </v-col>
          </v-row>
          <!-- <v-row>
            <v-col cols="12" sm="6" md="4">
              <ElementDescription title="Number Of Hires" subTitle="4 " />
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <ElementDescription title="Budgeted Type" subTitle="Permanent" />
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <ElementDescription title="Bussiness Case" subTitle="Dubai, UAE" />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="6" md="4">
              <ElementDescription title="Contract Type" subTitle="Permanent" />
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <ElementDescription title="Budgeted Year" subTitle="2025" />
            </v-col>
          </v-row> -->
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import ElementDescription from '@/components/jobs/ElementDescription.vue';

const showPlanDetail = ref(false);

function closePlanDetails() {
  showPlanDetail.value = false;
}

function openPlanDetails() {
  showPlanDetail.value = true;
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/scss/typography';
.text-data {
  @extend .base-body-text-2;
  font-weight: 550;
  font-size: 12px;
}

.display-field {
  border-radius: 12px;
}
</style>
