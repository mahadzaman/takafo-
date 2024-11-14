<template>
  <section>
    <div>
      <WorkspaceHeader />

      <AppJobList
        :jobs="(jobs && jobs.data) || (allJobs && allJobs.data) || []"
        :loading="isFetching || isFetchingAllJobs"
        @fetchJobs="fetchJobs"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import WorkspaceHeader from '@/components/shared/workspace/WorkspaceHeader.vue';
import AppJobList from '@/components/shared/AppJobList.vue';
import { useFetchAssociatedJobs, useFetchAllJobs } from '@/hooks/jobs';
import { useJobStore } from '@/stores';
import { JobTypes } from '@/stores/modules/job/job.interface';

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

// Boolean to track whether jobs have been fetched after mount

// Function to handle job fetching based on selected JR status
const fetchJobs = () => {
  if (jobStore.selectedJrStatus === JobTypes.ASSIGNED_JRS) {
    refetchAssociatedJobs(); // Manually trigger fetching associated jobs
  } else {
    refetchAllJobs(); // Manually trigger fetching all jobs
  }
};

// Run only when the component is mounted
onMounted(() => {
  fetchJobs(); // Fetch jobs after component is mounted
});
</script>
