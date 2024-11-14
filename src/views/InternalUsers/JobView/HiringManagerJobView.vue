<template>
  <div class="base-card rap-card border-bottom-and-radius">
    <div class="jr-details-wrap">
      <job-view-header
        custom-classes="pad-t-36 pad-b-0"
        title="Recruitment Action Plan"
        percentage="100"
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
                <h6 class="card-tile-title">JR Kick-Off Meeting</h6>
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
          <div class="card-tile-content gr-2" direction="row">
            <div class="d-flex">
              <div class="card-badge">
                <i class="icon-notes"></i>
              </div>
              <div
                class="card-tile-title-container d-flex align-center flex-wrap gr-2 gc-4"
              >
                <p class="card-tile-title">Job Requisition Details</p>
                <span class="status-tag success-bg">Completed</span>
              </div>
            </div>

            <router-link
              :to="{ path: `/user/job/${route.params.id}/jr-details` }"
              class="base-button router-link color-primary mar-l-auto align-self-center"
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
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import JobViewHeader from '@/components/jobView/JobViewHeader.vue';
import ProcessCards from '@/components/jobView/jobRap/ProcessCards.vue';
import { AppRoutes } from '@/interfaces';

const route = useRoute();

type Status = 'Pending' | 'In Progress' | 'Completed';

interface ProcessItems {
  title: string;
  status: Status;
  link?: string;
}

const processItems = [
  {
    title: 'Job Advert',
    status: 'Completed',
    link: `/user/job/${route.params.id}/job-advert`,
  },
  {
    title: 'Matching Algorithm',
    status: 'Completed',
    link: `/user/job/${route.params.id}/matching-algorithm`,
  },
  {
    title: 'Prescreening Questions',
    status: 'Completed',
    link: `/user/job/${route.params.id}/prescreening-questions`,
  },
  {
    title: 'Sourcing Plan',
    status: 'Completed',
    link: `/user/job/${route.params.id}/sourcing-plan`,
  },
  {
    title: 'Assessment Plan',
    status: 'Completed',
    link: `/user/job/${route.params.id}/assessment-plan`,
  },
  {
    title: 'Project Milestones',
    status: 'Completed',
    link: `/user/job/${route.params.id}/project-milestones`,
  },
] as ProcessItems[];

const statusClass = (status: Status) => {
  if (status === 'Pending') return 'warning-bg';
  else if (status === 'In Progress') return 'progress-bg';
  else return 'success-bg';
};
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
