<template>
  <section>
    <div class="jr-card d-flex align-center justify-space-between flex-wrap">
      <v-menu :close-on-content-click="true" location="bottom">
        <template v-slot:activator="{ props }">
          <div class="d-flex align-center flex cursor-pointer" v-bind="props">
            <h2 class="base-title">{{ jobStore.selectedJrStatus }}</h2>
            <img
              src="/src/assets/icons/dashboard/direction-down.svg"
              alt="icon"
              class="icon cursor-pointer"
            />
          </div>
        </template>
        <div class="jr-menu">
          <div
            class="d-flex align-center justify-space-between mb-1 cursor-pointer"
            v-for="(item, index) in JrStatus"
            :key="index"
          >
            <h3
              :class="{
                'base-text': jobStore.selectedJrStatus === item.title,
                'base-disabled-text': jobStore.selectedJrStatus !== item.title,
              }"
              @click="selectJR(item.title)"
            >
              {{ item.title }}
            </h3>
            <img
              v-if="jobStore.selectedJrStatus === item.title"
              alt="icon"
              class="icon-svg mar-x-4"
              src="/src/assets/icons/tick-double.svg"
            />
          </div>
        </div>
      </v-menu>
      <!-- Search and Button Group -->
      <div class="d-flex align-center search-bar-container ga-2">
        <v-autocomplete
          class="search-field"
          hide-details
          hide-no-data
          :items="jobsNames"
          item-text="title"
          item-value="title"
          menu-icon=""
          placeholder="Search JR's..."
          theme="light"
          variant="solo"
        >
          <template #prepend-inner>
            <img :src="filesvg" alt="" />
          </template>
        </v-autocomplete>
        <!-- Job Filter -->
        <JobQueryFilters />
      </div>
    </div>
    <CustomDataTable
      :headers="headers"
      :items="paginatedJobs"
      :loading="props.loading"
      @view="onViewJob"
    />
    <div class="d-flex base-card mt-1 bg-white" style="padding: 0 !important">
      <v-pagination
        v-model:currentPage="currentPage"
        :length="pageCount"
        :total-visible="5"
        @update:modelValue="onPageChange"
      ></v-pagination>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed, ref, defineProps } from 'vue';
// import AppJobMessage from '@/components/shared/AppJobMessage.vue';
import CustomDataTable from './CustomDataTable.vue';
import type { DataTable } from '@/interfaces/datatable.interface';
import router from '@/router';
import { JobStatus } from '@/constants/jobStatus';
import filesvg from '@/assets/icons/dashboard/magnify.png';
import JobQueryFilters from '@/components/jobs/JobQueryFilters.vue';
import { useJobStore } from '@/stores';
import type { IJob } from '@/stores/modules/job';
import { JobTypes } from '@/stores/modules/job/job.interface';

const emit = defineEmits(['fetchJobs']);

const jobStore = useJobStore();

const props = defineProps({
  jobs: {
    type: Array as () => any,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const JrStatus = ref([
  { title: JobTypes.ASSIGNED_JRS, selected: true },
  { title: JobTypes.NOT_ASSIGNED_JRS, selected: false },
]);

const jobsNames = ref([
  { title: 'Software Engineer' },
  { title: 'Software Engineer II' },
]);

const headers = [
  // { title: 'JR Number', value: 'jr_number' },
  { title: 'Job Title', value: 'job_title' },
  // { title: 'Job Type', value: 'contract_type' },
  { title: 'Platform/Unit', value: 'platform' },
  // { title: 'No of Hires', value: 'hiring_count' },
  // { title: 'Grade', value: 'grade' },
  { title: 'Location', value: 'location' },
  { title: 'Status', value: 'status' },
  {
    title: 'Actions',
    value: 'actions',
    sortable: false,
  },
] as DataTable.Header[];

const itemsPerPage = 11;

const currentPage = ref(1);

const pageCount = computed(() => Math.ceil(props.jobs.length / itemsPerPage));

function onPageChange(newPage: number) {
  currentPage.value = newPage;
}

const selectJR = (title: string) => {
  jobStore.selectedJrStatus = title;
  // JrStatus.value.forEach(item => {
  //   item.selected = item.title === jobStore.selectedJrStatus;
  // });
  emit('fetchJobs');
};

const paginatedJobs = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;

  const end = currentPage.value * itemsPerPage;

  return props.jobs.slice(start, end).map((job: any, index: number) => {
    let statusId = 0;

    return {
      ...job,
      created_at: formatDate(job.created_at),
      platform: `${job.platform} / ${job.unit} `,
      status: job.status,
      statusId: statusId,
      actionsList:
        jobStore.selectedJrStatus === JobTypes.ASSIGNED_JRS
          ? {
              view: {
                action: 'View',
              },
              calender: {
                action: 'Calender',
                noAction: [JobStatus.PUBLISHED],
              },
              candidate: {
                action: 'Candidate',
                noAction: [JobStatus.DRAFTED],
              },
            }
          : {
              userTick: {
                action: 'User Tick',
                noAction: [],
              },
            },
    };
  });
});

const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, '0');

  const month = String(date.getMonth() + 1).padStart(2, '0');

  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

const onViewJob = (job: IJob.Job) => {
  jobStore.setSelectedJob(job);
  router.push(`/user/job/${job.id}`);
};
</script>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/assets/styles/scss/variables';
@import '@/assets/styles/scss/typography';
@import '@/assets/styles/scss/mixins';
@import '@/assets/styles/scss/cards';
@import '@/assets/styles/scss/forms';
.main {
  height: 750px; // Default for larger screens
}

.container-item {
  width: 40%;
  min-width: 300px;
  gap: 1rem;
}

.jr-card {
  border-top-left-radius: 1rem; /* Top left corner */
  border-top-right-radius: 1rem; /* Top right corner */
  background: lightColor(white);
  min-height: 70px;
  padding: 12px;
  margin: 5px;
}

.search-bar-container {
  .search-field {
    min-width: 15.125rem;
  }
}

.action-container {
  border: 1px solid color.adjust(lightColor(border-color), $alpha: -0.8);
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 600px) {
    justify-content: center;
    width: 100%;
    margin-top: 1rem;
  }
}

.filter-btn {
  width: 44px;
  height: 43px;
  gap: 0px;
  border-radius: 12px;
  opacity: 0px;

  &-selected {
    border: 2px solid lightColor(primary);
  }
}

.base-btn {
  width: 100%;
}

.filter-card {
  width: 600px;
  margin-top: 9px;
  height: 345px;
  background: #f9fdff;
}

.divider {
  margin-left: -20px;
  margin-right: -20px;
}

.btn-grp {
  height: 44px;
  width: 82px;
  padding: 8px 12px 8px 12px;
}

.select-width {
  width: 15rem;
}
.card {
  gap: 0.3rem;
  background: #f4f9fb;
  width: 100%;
  border: 1px solid #858d981f;
  padding: 2px;
  border-radius: 11px;
  &-filter {
    height: 41px;
    padding: 10px 4px 6px 8px;
    border-radius: 11px;
  }
  &-small {
    width: 70px;
  }

  &-large {
    width: 86px;
  }
}

.jr-menu {
  background: lightColor(white);
  border-radius: 14px;
  width: 220px;
  margin-top: 26px;
  padding: 12px;

  @media (min-width: 600px) {
    height: 80px;
  }

  .base-text {
    font-family: Urbanist;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.02em;

    @include desktop {
      font-size: 17px;
    }
  }
}

.base-title {
  @extend .base-title;
  @media (max-width: 600px) {
    font-size: 1.8rem;
  }
}
</style>
