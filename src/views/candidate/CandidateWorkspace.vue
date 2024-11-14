<template>
  <WorkspaceHeader :name="'Shumaila'" />

  <v-row class="main">
    <v-col cols="12" md="8">
      <v-row>
        <v-col cols="12" md="12">
          <AppProfileStatus />
        </v-col>
        <v-col cols="12" md="6">
          <v-row>
            <v-col cols="12">
              <div class="match pa-6 base-form">
                <v-row class="d-flex align-center justify-space-between mb-3">
                  <v-col>
                    <p class="base-heading-2">Matching Jobs</p>
                  </v-col>
                </v-row>
                <div class="custom-scrollbar">
                  <AppMatchingJobs
                    v-for="(job, index) in matchingJobs"
                    :key="index"
                    :title="job.title"
                    :date="job.date"
                    :percentageMatch="job.percentageMatch"
                  />
                </div>
              </div>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" md="6">
          <v-row>
            <v-col cols="12">
              <div class="match pa-6 base-form">
                <v-row class="d-flex align-center justify-space-between mb-3">
                  <v-col>
                    <p class="base-heading-2">Applied Jobs</p>
                  </v-col>
                </v-row>
                <div class="custom-scrollbar">
                  <AppAppliedJobs
                    v-for="(job, index) in appliedJobs"
                    :key="index"
                    :title="job.title"
                    :date="job.date"
                    :status="job.status"
                  />
                </div>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12" md="4">
      <AppOnboarding />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import WorkspaceHeader from '@/components/shared/workspace/WorkspaceHeader.vue';
import AppMatchingJobs from '@/components/shared/AppMatchingJobs.vue';
import AppAppliedJobs from '@/components/shared/AppAppliedJobs.vue';
import AppProfileStatus from '@/components/shared/AppProfileStatus.vue';
import AppOnboarding from '@/components/shared/AppOnboarding.vue';

const matchingJobs = ref([
  {
    title: 'Software Engineer II',
    date: '10th June, 2024',
    percentageMatch: '93',
  },
  {
    title: 'Software Engineer II',
    date: '10th June, 2024',
    percentageMatch: '93',
  },
  {
    title: 'Software Engineer II',
    date: '10th June, 2024',
    percentageMatch: '93',
  },
  {
    title: 'Software Engineer II',
    date: '10th June, 2024',
    percentageMatch: '93',
  },
]);

const appliedJobs = ref([
  {
    title: 'Software Engineer II',
    date: '10th June, 2024',
    status: 'onboarding',
  },
  {
    title: 'Software Engineer II',
    date: '10th June, 2024',
    status: 'onboarding',
  },
  {
    title: 'Software Engineer II',
    date: '10th June, 2024',
    status: 'onboarding',
  },
]);
</script>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/assets/styles/scss/variables';

.profile-option {
  background-color: aqua;
}

.step-indicator {
  width: 100%;
  max-width: 900px;
  height: 4px;
  margin-bottom: 16px;
  position: relative;
}

.step-segment {
  flex-grow: 1;
  height: 100%;
  background-color: lightColor(primary);
  margin-right: 4px;
}

.main {
  .custom-scrollbar {
    max-height: 250px;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 12px;
    }

    &::-webkit-scrollbar-track {
      background: lightColor(background);
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: color.adjust(lightColor(border-color), $alpha: -0.8);
      border-radius: 10px;
      border: 3px solid lightColor(background);
    }

    &::-webkit-scrollbar-thumb:hover {
      background-color: lightColor(
        primary
      ); /* Color of the scrollbar handle on hover */
    }
  }

  .alert-scroll {
    max-height: 200px; /* Adjust as needed */
    overflow-y: auto;
  }

  .match-scroll {
    max-height: 230px; /* Adjust as needed */
    overflow-y: auto;
  }
}
</style>
