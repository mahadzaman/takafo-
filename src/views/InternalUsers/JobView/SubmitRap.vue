<template>
  <div
    class="base-card rap-card"
    :class="{ 'border-bottom-and-radius': role !== 'recruiter' }"
  >
    <div class="jr-details-wrap">
      <job-view-header
        custom-classes="pad-t-36 pad-b-0"
        title="Are you sure you want to submit this JR to Hiring Manager?"
        :badge="{ type: 'icon', icon: 'icon-exclaimatory' }"
        back-to-module="RAP"
        :prev-next-nav="{
          backLink: 'ProjectMilestones',
        }"
      />

      <div class="card-content">
        <p class="text-line mar-b-24">
          Fill out the required fields with information about the employment
          opportunity you're posting. This typically includes the title,
          description, responsibilities, qualifications, location, salary, and
          any other relevant details.
        </p>

        <!-- app process cards section -->
        <div v-if="processItems.length > 0" class="process-cards">
          <process-cards
            v-for="(item, index) in processItems"
            :key="`card-${index}`"
            :title="item.title"
            :status="item.status"
            :counter="`0${index + 1}.`"
            :link="item.link"
          />
        </div>
      </div>

      <template v-if="role === 'recruiter'">
        <job-view-footer
          :is-completed="allCompleted"
          :submit="true"
          :reset="false"
          @submitForm="submitJobRap"
          percentage="100"
        />
      </template>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, watchEffect, computed } from 'vue';
import JobViewHeader from '@/components/jobView/JobViewHeader.vue';
import JobViewFooter from '@/components/jobView/JobViewFooter.vue';
import ProcessCards from '@/components/jobView/jobRap/ProcessCards.vue';
import { useAuthStore, useJobStore } from '@/stores';
import { AppRoutes } from '@/interfaces';

import { useRoute } from 'vue-router';
import { notify } from '@kyvg/vue3-notification';
import JobRAPService from '@/services/JobRAPService';

const apiRAP = new JobRAPService();
const route = useRoute();

const authstore = useAuthStore();
const jobStore = useJobStore();

const role = ref<string>();
watchEffect(() => {
  role.value = authstore.getActiveRole().value?.role_name;
});

type Status = 'Pending' | 'In Progress' | 'Completed';

interface ProcessItems {
  title: string;
  status: Status;
  link?: string;
}

const allCompleted = computed(() => {
  return processItems.value.every(
    item =>
      item.status.toLowerCase() === 'completed' ||
      item.title === 'Matching Algorithm'
  );
});

const getJobRapFromStore = async () => {
  const data = await jobStore.fetchJobRAP(`${route.params.id}`);
  if (data) {
    const {
      job_advert_status,
      prescreen_question_status,
      sourcing_plan_status,
      assessment_plan_status,
      project_milestone_status,
    } = data;
    processItems.value[0].status =
      job_advert_status === null ? 'Pending' : job_advert_status;
    processItems.value[2].status =
      prescreen_question_status === null
        ? 'Pending'
        : prescreen_question_status;
    processItems.value[3].status =
      sourcing_plan_status === null ? 'Pending' : sourcing_plan_status;
    processItems.value[4].status =
      assessment_plan_status === null ? 'Pending' : assessment_plan_status;
    processItems.value[5].status =
      project_milestone_status === null ? 'Pending' : project_milestone_status;
  }
};
getJobRapFromStore();

const submitJobRap = async () => {
  try {
    await apiRAP.submitRapForJob(route.params.id.toString());
    notify({
      title: 'Job Rap Submitted Successfully',
      text: 'Job RAP',
      type: 'success',
    });
  } catch (error) {
    notify({
      title: 'Error In Submitting Rap',
      text: 'Job RAP',
      type: 'error',
    });
    console.log('Error In Submitting Rap', error);
  }
};

const processItems = ref<ProcessItems[]>([
  {
    title: 'Job Advert',
    status: 'Pending',
    link: `/user/job/${route.params.id}/job-advert`,
  },
  {
    title: 'Matching Algorithm',
    status: 'Pending',
    link: `/user/job/${route.params.id}/matching-algorithm`,
  },
  {
    title: 'Prescreening Questions',
    status: 'Pending',
    link: `/user/job/${route.params.id}/screening-questions`,
  },
  {
    title: 'Sourcing Plan',
    status: 'Pending',
    link: `/user/job/${route.params.id}/sourcing-plan`,
  },
  {
    title: 'Assessment Plan',
    status: 'Pending',
    link: `/user/job/${route.params.id}/assessment-plan`,
  },
  {
    title: 'Project Milestones',
    status: 'Pending',
    link: `/user/job/${route.params.id}/project-milestones`,
  },
]);
</script>
<style lang="scss" scoped>
@use 'sass:color';
@import '@/assets/styles/scss/cards';
@import '@/assets/styles/scss/functions';
@import '@/assets/styles/scss/variables';
@import '@/assets/styles/scss/mixins';
@import '@/assets/styles/scss/responsive';

.base-card {
  .card-tile {
    .card-tile-title-container {
      margin-left: 1rem;
    }
  }

  .jr-details-wrap {
    .pad-b-0 {
      padding-bottom: 0;
    }
  }
}

.jr-details-wrap {
  flex: 1 1 auto;
}

.process-cards {
  display: flex;
  flex-wrap: wrap;
  margin: -0.5rem;
  position: relative;
  isolation: isolate;

  &:before,
  &:after {
    content: '';
    background: lightColor(white);
    height: calc(100% - 1rem);
    width: 0.5rem;
    z-index: 2;
    @include centralize-absolute-y;
  }

  &:before {
    left: 0;
  }

  &:after {
    right: 0;
  }
}
</style>

