<template>
  <section class="mt-10">
    <div v-if="isFetching" class="text-gray-500">Loading jobs...</div>
    <v-row v-else-if="jobing && jobing.data">
      <v-col v-for="(job, index) in jobing.data"
:key="job.id"
cols="12"
md="6">
        <AppEoStatus
          :counter="formatCounter(index + 1)"
          :date="formatDate(job.created_at)"
          :location="job.location"
          :title="job.requisition_title"
          status="Pending"
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
import { useFetchRequestedJobs } from '@/hooks/jobs';
import AppEoStatus from '@/components/shared/AppEoStatus.vue';

// Fetch jobs data
const { data: jobs, isFetching, error } = useFetchRequestedJobs();

interface Job {
  id: string;
  created_at: string;
  location: string;
  requisition_title: string;
}

interface JobResponse {
  data: Job[];
}

const jobing = ref<JobResponse | null>(null); // Initialize as null or with a proper type

// Watch jobs data to ensure it is being fetched correctly
watchEffect(() => {
  if (jobs.value) {
    jobing.value = jobs.value;
    console.log('Fetched jobs:', jobs.value);
  }
});

// Function to format the counter with leading zero
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
</script>
