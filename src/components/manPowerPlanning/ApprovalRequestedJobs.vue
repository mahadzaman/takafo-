<template>
  <section class="mt-10">
    <div v-if="isFetching" class="text-gray-500">Loading jobs...</div>
    <v-row v-else-if="requestedJobs && requestedJobs.data">
      <v-col
        v-for="(job, index) in requestedJobs.data"
        :key="job.id"
        cols="12"
        md="6"
      >
        <AppEoStatus
          :counter="formatCounter(index + 1)"
          location="By Talent Partner"
        />
      </v-col>
    </v-row>

    <div v-if="error" class="text-red-500">
      {{ error.message }}
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useFetchAssociatedJobs } from '@/hooks/jobs';
import AppEoStatus from '@/components/shared/AppEoStatus.vue';
import type { JobResponse } from '@/stores/modules/job/job.interface';

const requestedJobs = ref<JobResponse | null>(null);

const { data: jobs, isFetching, error } = useFetchAssociatedJobs();

const formatCounter = (counter: number) => {
  return counter < 10 ? `0${counter}` : counter.toString();
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  };

  return new Intl.DateTimeFormat('en-US', options).format(date);
};

watchEffect(() => {
  if (jobs.value) {
    requestedJobs.value = jobs.value;
  }
});
</script>
