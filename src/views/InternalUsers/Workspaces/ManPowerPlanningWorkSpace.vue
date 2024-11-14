<template>
  <section>
    <div v-if="isFetching" class="text-gray-500">Loading jobs...</div>
    <div v-else-if="requestedJobs && requestedJobs.data">
      <WorkspaceHeader
        :showButton="false"
        :showFilter="true"
        :btn_title="button_title"
      />

      <AppJobList :jobs="requestedJobs.data" />
    </div>

    <div v-if="error" class="text-red-500">
      {{ error.message }}
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import WorkspaceHeader from '@/components/shared/workspace/WorkspaceHeader.vue';
import AppJobList from '@/components/shared/AppJobList.vue';
import { useFetchAssociatedJobs } from '@/hooks/jobs';
import type { JobResponse } from '@/stores/modules/job/job.interface';

const requestedJobs = ref<JobResponse | null>(null);

const { data: jobs, isFetching, error } = useFetchAssociatedJobs();

const button_title = 'Create JR Request';

watchEffect(() => {
  if (jobs.value) {
    requestedJobs.value = jobs.value;
  }
});
</script>

<style lang="scss" scoped></style>
