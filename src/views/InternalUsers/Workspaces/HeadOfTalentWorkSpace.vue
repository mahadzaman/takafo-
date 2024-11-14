<template>
  <section>
    <div v-if="isFetching" class="text-gray-500">Loading jobs...</div>
    <div v-else-if="requestedJobs && requestedJobs.data">
      <WorkspaceHeader
        :showButton="false"
        :showFilter="true"
        :heading="heading"
      />

      <AppJobList :jobs="requestedJobs.data" />
    </div>

    <div v-if="error" class="text-red-500">
      {{ error.message }}
    </div>
  </section>
</template>
<script lang="ts" setup>
import { ref, watchEffect } from 'vue';
import WorkspaceHeader from '@/components/shared/workspace/WorkspaceHeader.vue';
import AppJobList from '@/components/shared/AppJobList.vue';
import { useFetchAssociatedJobs } from '@/hooks/jobs';
import type { JobResponse } from '@/stores/modules/job/job.interface';
const heading = 'Job Requisitions';

const requestedJobs = ref<JobResponse | null>(null);

const { data: jobs, isFetching, error } = useFetchAssociatedJobs();

watchEffect(() => {
  if (jobs.value) {
    requestedJobs.value = jobs.value;
  }
});
// const jobList = [
//   {
//     id: 'da855447-bf60-436d-9ec4-c10a2bd625f7',
//     contract_type: 'Full Time Employee11111111111',
//     opportunity_type: 'Contract',
//     requisition_title: 'SE',
//     business_case: 'SEDE',
//     lk_assessment_id: 'UAE, Abu Dhabi',
//     lk_hiring_type_id: '2024-08-07T19:00:00.000Z',
//     lk_location_id: 'UAE, Abu Dhabi',
//     lk_budjet_id: 'Non-Budgeted',
//     roles_responsibility: 'takafo',
//     status: 'approved',
//     created_at: '2024-08-29T13:12:13.882Z',
//     hiring_count: 5,
//     plateform: 'Finance',
//     grade: 'A1',
//     location: 'Abu Dhabi',
//     unit: 'C',
//     job_associations: []
//   },
//   {
//     id: 'da855447-bf60-436d-9ec4-c10a2bd625f7',
//     contract_type: 'Full Time Employeerrrrrrrrrrrr',
//     opportunity_type: 'Contract',
//     requisition_title: 'SE',
//     business_case: 'SEDE',
//     lk_assessment_id: 'UAE, Abu Dhabi',
//     lk_hiring_type_id: '2024-08-07T19:00:00.000Z',
//     lk_location_id: 'UAE, Abu Dhabi',
//     lk_budjet_id: 'Non-Budgeted',
//     roles_responsibility: 'takafo',
//     status: 'pending',
//     created_at: '2024-08-29T13:12:13.882Z',
//     hiring_count: 5,
//     plateform: 'Finance',
//     grade: 'A1',
//     location: 'Abu Dhabi',
//     unit: 'C',
//     job_associations: []
//   }
// ]
</script>
