<template>
  <section>
    <div>
      <WorkspaceHeader />

      <AppJobList
        :jobs="
          jobStore.selectedJrStatus === JobTypes.ASSIGNED_JRS
            ? jobs && jobs.data || []
            : (allJobs && allJobs.data) || []
        "
        :loading="isFetching || isFetchingAllJobs"
        @fetchJobs="fetchJobs"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { onMounted, watch } from 'vue';
import WorkspaceHeader from '@/components/shared/workspace/WorkspaceHeader.vue';
import AppJobList from '@/components/shared/AppJobList.vue';
import { useFetchAssociatedJobs, useFetchAllJobs } from '@/hooks/jobs';
import { useJobStore, useAuthStore } from '@/stores';
import { JobTypes } from '@/stores/modules/job/job.interface';

const authStore = useAuthStore();
const jobStore = useJobStore();

// Initialize useFetchAssociatedJobs with 'enabled: false' to prevent auto-fetching
const {
  data: jobs,
  isFetching,
  refetch: refetchAssociatedJobs,
} = useFetchAssociatedJobs(false); // Do not fetch immediately

// Initialize useFetchAllJobs with 'enabled: false' to prevent auto-fetching
const {
  data: allJobs,
  isFetching: isFetchingAllJobs,
  refetch: refetchAllJobs,
} = useFetchAllJobs(false); // Do not fetch immediately

// Function to handle job fetching based on selected JR status
const fetchJobs = () => {
  if (jobStore.selectedJrStatus === JobTypes.ASSIGNED_JRS) {
    refetchAssociatedJobs(); // Manually trigger fetching associated jobs
  } else {
    refetchAllJobs(); // Manually trigger fetching all jobs
  }
};

fetchJobs();

watch(
  () => authStore.getActiveRole().value,
  (newRole, oldRole) => {
    // only fetch in case of role switch
    // old and new roles can only be true when there was a previous role
    if (newRole?.role_name && oldRole) {
      fetchJobs();
    }
  }
);
</script>

