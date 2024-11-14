<template>
  <v-row>
    <v-col cols="12">
      <div class="display-field pa-3 bg-job-table-head">
        <div class="d-flex align-center flex-wrap justify-space-between">
          <h1 class="base-heading-3 mb-">Recruiting Team Info</h1>

          <v-icon
            v-if="showRecruitingTeamDetail"
            @click="closeRecruitingTeamDetails"
            color="primary"
            icon="mdi-minus-circle-outline"
          ></v-icon>

          <v-icon
            v-if="!showRecruitingTeamDetail"
            @click="openRecruitingTeamDetails"
            color="primary"
            icon="mdi-plus-circle-outline"
          ></v-icon>
        </div>

        <div class="mt-3" v-if="showRecruitingTeamDetail">
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <ElementDescription title="Hiring Manager" subTitle="Ahmad" />
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <ElementDescription title="Head Of Talent" subTitle="Bilal" />
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <ElementDescription title="Man Power Planning" subTitle="Ali" />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="6" md="4">
              <ElementDescription title="Recruiter" subTitle="Farukh" />
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <ElementDescription title="Recruiter Support" subTitle="Shamir" />
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

const showRecruitingTeamDetail = ref(false);

function closeRecruitingTeamDetails() {
  showRecruitingTeamDetail.value = false;
}

function openRecruitingTeamDetails() {
  showRecruitingTeamDetail.value = true;
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
