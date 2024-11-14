<template>
  <v-row>
    <v-col cols="12" class="align-center">
      <div class="align-center">
        <!-- JobApprovalStatus component will show for certain roles -->
        <JobApprovalStatus
          :jobs="jobs"
          v-if="
            isTalentPartner ||
            isHiringManager ||
            isHeadOfTalent ||
            isRecruiter ||
            isManPowerPlanning
          "
        />

        <!-- Iterate over jobs and pass computed status to ActionableButton -->
        <div>
          <ActionableButton
            :status="computedStatus"
            v-if="isHeadOfTalent || isManPowerPlanning"
          />
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue';
import { IApp } from '@/interfaces';
import { useAuthStore } from '@/stores';
import JobApprovalStatus from './JobApprovalStatus.vue';
import ActionableButton from './ActionableButton.vue';

const authStore = useAuthStore();

// Define props for jobs
const props = defineProps<{
  jobs: Array<{ id: string; role: string; status: string }>;
}>();

// Get the active role of the user
const activeRole = computed(() => authStore.getActiveRole().value?.role_name);

// Define role-based computed properties
const isTalentPartner = computed(
  () => activeRole.value === IApp.RoleEnum.TALENT_PARTNER
);

const isHiringManager = computed(
  () => activeRole.value === IApp.RoleEnum.HIRING_MANAGER
);

const isHeadOfTalent = computed(
  () => activeRole.value === IApp.RoleEnum.HEAD_OF_TALENT
);

const isManPowerPlanning = computed(
  () => activeRole.value === IApp.RoleEnum.MAN_POWER_PLANNING
);

const isRecruiter = computed(
  () => activeRole.value === IApp.RoleEnum.RECRUITER
);

// Computed property to determine the overall status based on job statuses
const computedStatus = computed(() => {
  // Check if any job is "rejected"
  if (props.jobs.some(job => job.status === 'rejected')) {
    return 'rejected';
  }

  // Check if any job is "approved"
  if (props.jobs.some(job => job.status === 'approved')) {
    return 'approved';
  }

  // If all jobs are "pending"
  if (props.jobs.every(job => job.status === 'pending')) {
    return 'pending';
  }

  // Default case, if none of the above conditions match
  return 'pending';
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/scss/typography';
@import '@/assets/styles/scss/variables';

.base-button {
  @extend .base-button;
  background: lightColor(white) !important;
}

.job-approve-btn {
  border: 2px solid lightColor(primary) !important;
}

.job-reject-btn {
  border: 2px solid lightColor(red) !important;
}
</style>
