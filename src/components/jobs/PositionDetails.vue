<template>
  <v-row>
    <v-col cols="12">
      <div class="display-field pa-3 bg-job-table-head">
        <div class="d-flex align-center flex-wrap justify-space-between">
          <h1 class="base-heading-3 mb-">Position Info</h1>

          <v-icon
            v-if="showPositionDetail"
            @click="closePositionDetails"
            color="primary"
            icon="mdi-minus-circle-outline"
          ></v-icon>

          <v-icon
            v-if="!showPositionDetail"
            @click="openPositionDetails"
            color="primary"
            icon="mdi-plus-circle-outline"
          ></v-icon>
        </div>

        <div class="mt-3" v-if="showPositionDetail">
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <ElementDescription
                title="Job Title"
                subTitle="Sr. Software Developer"
              />
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <ElementDescription title="Grade" subTitle="8" />
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <ElementDescription title="Platform" subTitle="Accounting" />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="6" md="4">
              <ElementDescription title="Unit" subTitle="Fiance" />
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <ElementDescription title="Location" subTitle="Dubai, UAE" />
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <ElementDescription title="UAE EXPAT" subTitle="UAE" />
            </v-col>
          </v-row>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import ElementDescription from '@/components/jobs/ElementDescription.vue';

const showPositionDetail = ref(false);

function closePositionDetails() {
  showPositionDetail.value = false;
}

function openPositionDetails() {
  showPositionDetail.value = true;
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
