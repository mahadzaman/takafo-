<template>
  <div class="base-card rap-card border-bottom-and-radius">
    <div class="jr-details-wrap">
      <job-view-header
        custom-classes="pad-t-36 pad-b-0"
        title="Recruitment Action Plan"
        percentage="20"
        back-to-module="user-workspace"
      />

      <div class="card-content">
        <!-- app kick off section -->
        <div class="card-tile">
          <div class="card-tile-content gr-2" direction="row">
            <div class="d-flex">
              <div class="card-badge">
                <i class="icon-user-speak"></i>
              </div>
              <div class="card-tile-title-container">
                <h6 class="card-tile-title">JR Kick-Off Meeting </h6>
                <p class="text-unemphed">
                  17th July, 2024 - 07:00pm (Central European Time)
                </p>
              </div>
            </div>
            <div class="mar-l-auto">
              <div class="d-flex align-center">
                <v-btn class="base-button regular-button color-primary"
                  >Reschedule</v-btn
                >
                <v-btn class="secondary-button regular-button">
                  Join Now
                </v-btn>
              </div>
            </div>
          </div>
        </div>
        <!-- will name this section LATER -->
        <div class="card-tile">
          <div class="card-tile-content" direction="row">
            <div class="d-flex">
              <div class="card-badge">
                <i class="icon-notes"></i>
              </div>
              <div
                class="card-tile-title-container d-flex align-center flex-wrap gr-2 gc-4"
              >
                <p class="card-tile-title">Job Requisition Details</p>
                <span class="status-tag bg-info">Completed</span>
              </div>
            </div>
            <router-link
              :to="{ path: `/user/job/${route.params.id}/jr-details` }"
              class="base-button color-primary mar-l-auto align-self-center router-link"
            >
              <span>Click to view</span>
              <i class="icon-arrow-circle mar-l-6"></i>
            </router-link>
          </div>
        </div>

        <p class="text-line mar-t-32 mar-b-24">
          Fill out the required fields with information about the employment
          opportunity you're posting. This typically includes the title,
          description, responsibilities, qualifications, location, salary, and
          any other relevant details.
        </p>

        <!-- app process cards section -->
        <div class="process-cards">
          <process-cards
            v-for="(item, index) in processItems"
            :key="`card-${index}`"
            :title="item.title"
            :status="item.status"
            :counter="`0${index + 1}.`"
            :link="item.link"
            :loading="loading"
          />
        </div>
      </div>
      <vuetify-dialog
        v-model="handleFormState"
        title="Approve Requistion"
        subtitle="Comments"
      >
        <template #popupContent>
          <v-textarea v-model="rapComments" variant="outlined"></v-textarea>
        </template>
        <template #actions>
          <v-btn
            @click="handleApprovalRequest"
            class="popup-action-btn primary-button pad-y-18 base-button"
            >Done</v-btn
          >
        </template>
      </vuetify-dialog>

      <job-view-footer
        v-if="!isRecruiter && allCompleted"
        :hiring-approval="allCompleted"
        @ApproveForm="handleApprove"
        @RejectForm="handleReject"
        percentage="20"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore, useJobStore } from '@/stores';
import JobViewHeader from '@/components/jobView/JobViewHeader.vue';
import ProcessCards from '@/components/jobView/jobRap/ProcessCards.vue';
import { Status } from '@/enums/jobs/jobs.enum';
import VuetifyDialog from '@/components/vuetify/VuetifyDialog.vue';
import JobViewFooter from '@/components/jobView/JobViewFooter.vue';
import JobsService from '@/services/JobsService';

const route = useRoute();
const authstore = useAuthStore();
const jobStore = useJobStore();
const handleFormState = ref<boolean>(false);
const rapComments = ref<string>('');
const jobDetailsApi = new JobsService();
const isApproved = ref(true);
const loading = ref<boolean>(false);
const isRecruiter = ref<boolean>(false);

isRecruiter.value = authstore.getActiveRole().value?.role_name === 'recruiter';

const ApprovalRequestComments = async (payload: any) => {
  try {
    await jobDetailsApi.ApprovalRequest(`${route.params.id}`, payload);
    // handleFormState.value=false
  } catch (error) {
    console.log(error);
    return error;
  }
};

interface ProcessItems {
  title: string;
  status: Status;
  link?: string;
}

watch(
  () => authstore.getActiveRole().value,
  (newRole, oldRole) => {
    if (newRole?.role_name && oldRole) {
      // Add any api call here if required
    }

    if (newRole?.role_name === 'recruiter') {
      isRecruiter.value = true;
    } else {
      isRecruiter.value = false;
    }
  }
);

const processItems = ref<ProcessItems[]>([
  {
    title: 'Job Advert',
    status: Status.Pending,
    link: `/user/job/${route.params.id}/job-advert`,
  },
  {
    title: 'Matching Algorithm',
    status: Status.Pending,
    link: `/user/job/${route.params.id}/matching-algorithm`,
  },
  {
    title: 'Prescreening Questions',
    status: Status.Pending,
    link: `/user/job/${route.params.id}/prescreening-questions`,
  },
  {
    title: 'Sourcing Plan',
    status: Status.Pending,
    link: `/user/job/${route.params.id}/sourcing-plan`,
  },
  {
    title: 'Assessment Plan',
    status: Status.Pending,
    link: `/user/job/${route.params.id}/assessment-plan`,
  },
  {
    title: 'Project Milestones',
    status: Status.Pending,
    link: `/user/job/${route.params.id}/project-milestones`,
  },
]);

(async () => {
  loading.value = true;
  const data = await jobStore.fetchJobRAP(`${route.params.id}`);

  if (data) {
    const {
      job_advert_status,
      prescreen_question_status,
      sourcing_plan_status,
      assessment_plan_status,
      project_milestone_status,
    } = data;

    const statusMap: Record<string, Status> = {
      'Job Advert': job_advert_status ?? Status.Pending,
      'Matching Algorithm': Status.Pending, // Static for now
      'Prescreening Questions': prescreen_question_status ?? Status.Pending,
      'Sourcing Plan': sourcing_plan_status ?? Status.Pending,
      'Assessment Plan': assessment_plan_status ?? Status.Pending,
      'Project Milestones': project_milestone_status ?? Status.Pending,
    };

    processItems.value.forEach(item => {
      item.status = statusMap[item.title] || Status.Pending; // Default to 'Pending' if no match
    });

    loading.value = false;

    // temporarily change statutes in dev environment for testing
    // processItems.value[4].status = Status.Completed // Assessment plan status
    // processItems.value[5].status = Status.Completed // Project Milestones status
  }
})();

const allCompleted = computed(() => {
  return processItems.value.every(
    item =>
      item.status.toLowerCase() === 'completed' ||
      item.title === 'Matching Algorithm'
  );
});

const handleApprovalRequest = () => {
  if (isApproved.value) {
    const payload = {
      action: 'approved',
      comment: rapComments.value,
    };

    handleFormState.value = false;
    ApprovalRequestComments(payload);
  } else {
    const payload = {
      action: 'rejected',
      comment: rapComments.value,
    };
    handleFormState.value = false;
    ApprovalRequestComments(payload);
  }
};

const handleApprove = () => {
  handleFormState.value = true;
  isApproved.value = true;
};

const handleReject = () => {
  handleFormState.value = true;
  isApproved.value = false;
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/scss/cards';
@import '@/assets/styles/scss/variables';
@import '@/assets/styles/scss/mixins';

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
