<template>
  <div
    class="base-card rap-card"
    :class="{ 'border-bottom-and-radius': !isRecruiter }"
  >
    <div class="jr-details-wrap">
      <job-view-header
        title="Assessment Plan"
        :badge="{ type: 'counter', counter: 5 }"
        customClasses="bordered-header"
        :prev-next-nav="{
          backLink: 'SourcingPlan',
          nextLink: 'ProjectMilestones',
        }"
        back-to-module="RAP"
      />

      <div class="card-content">
        <!-- will name this section LATER -->
        <div class="card-tile gap-16 mar-b-32" direction="column">
          <div class="d-flex align-center justify-space-between flex-wrap">
            <h6 class="card-tile-title">
              Select Assessment Type to Add Skills
            </h6>

            <div class="checkbox-group d-flex align-center">
              <v-checkbox
                class="base-checkbox"
                label="High Level"
                v-model="high_level"
                @change="detailed = !high_level"
              />
              <v-checkbox
                class="base-checkbox"
                label="Detailed"
                v-model="detailed"
                @change="high_level = !detailed"
              />
            </div>
          </div>

          <v-textarea
            v-if="detailed"
            model-value=""
            class="base-textarea"
            placeholder="Add skills"
            variant="outlined"
          />
        </div>

        <v-row>
          <v-col lg="6" cols="12">
            <label class="field-label" for="online_assessments"
              >Online Assessments</label
            >

            <v-select
              v-model="onlineAssessmentsValue"
              :items="onlineAssessments"
              item-title="title"
              item-value="value"
              name="online_assessments"
              variant="outlined"
            ></v-select>
          </v-col>
        </v-row>

        <div class="add-interviews-section mar-b-32">
          <transition-group name="fade" tag="div">
            <div
              v-for="(item, index) in interviews"
              :key="item.interviewNo"
              class="card-tile"
              direction="column"
            >
              <div class="d-flex align-center">
                <h6 class="card-tile-title mar-b-16">
                  {{ `Interview ${item.interviewNo}` }}
                </h6>
                <button
                  v-if="index > 0"
                  @click="interviews.splice(index, 1)"
                  class="mar-l-auto font-size-16 color-danger"
                >
                  <i class="icon-trash"></i>
                </button>
              </div>
              <v-row>
                <v-col
                  v-for="(dropdown, i) in item.dropdowns"
                  :key="i"
                  cols="12"
                  lg="6"
                >
                  <label for="interviewers" class="field-label">
                    {{ dropdown.label }}</label
                  >

                  <v-select
                    name="interviewers"
                    variant="outlined"
                    :items="dropdown.options"
                  ></v-select>
                </v-col>
              </v-row>
            </div>
          </transition-group>

          <div class="add-interview-button-container">
            <button class="add-interview" @click="addInterview($event)">
              <i class="icon-plus-bordered"></i>
              <span>Add More</span>
            </button>
          </div>
        </div>

        <v-row>
          <v-col lg="6" cols="12">
            <label class="field-label" for="online_assessments"
              >Case Study/Technical Test</label
            >

            <v-file-input
              class="base-file-input"
              variant="outlined"
              prepend-icon=""
            >
              <template #append-inner>
                <button class="secondary-button x-small-button">Upload</button>
              </template>
            </v-file-input>
          </v-col>
        </v-row>
      </div>

      <template v-if="isRecruiter">
        <job-view-footer percentage="80" />
      </template>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { shallowRef, ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import JobViewHeader from '@/components/jobView/JobViewHeader.vue';
import JobViewFooter from '@/components/jobView/JobViewFooter.vue';
import { useAuthStore, useJobStore } from '@/stores';
import AssessmentPlanService from '@/services/AssessmentPlanService';
import AssessmentsService from '@/services/AssessmentsService';

const route = useRoute();
const jobStore = useJobStore();
const authstore = useAuthStore();
const isRecruiter = ref<boolean>(false);
const status = ref<string>('pending');
const assessmentPlanService = new AssessmentPlanService();
const assessmentsService = new AssessmentsService();

interface Assessment {
  title: string; // Adjust the type of `id` as necessary
  value: string;
}

const onlineAssessments = ref<Assessment[]>([]);
const onlineAssessmentsValue = ref();

isRecruiter.value = authstore.getActiveRole().value?.role_name === 'recruiter';

const getAssessmentPlan = async () => {
  const { assessment_plan_status } = await jobStore.fetchJobRAP(
    `${route.params.id}`
  );

  status.value = assessment_plan_status;

  if (!status?.value || status?.value === 'pending') {
    return;
  }

  try {
    const { data } = await assessmentPlanService.getAssessmentPlan(
      `${route.params.id}`
    );

    console.log(data);

    onlineAssessmentsValue.value = data.assessment_id;

    // caseStudy.value = data.case_study;
  } catch (error) {
    console.log(error);
  }

  const { data } = await getAssessments();

  console.log(data);

  onlineAssessments.value = data.map((item: any) => {
    return {
      title: item.purpose,
      value: item.id,
    } as Assessment;
  });

  console.log(onlineAssessments.value);
};

const getAssessments = async () => {
  try {
    const data = await assessmentsService.getAllAssessments(10, 1);
    return data;
  } catch (error) {
    console.log(error);
  }
};

getAssessmentPlan();

watch(
  () => authstore.getActiveRole().value,
  (newRole, oldRole) => {
    if (newRole?.role_name && oldRole) {
      getAssessmentPlan();
    }

    if (newRole?.role_name === 'recruiter') {
      isRecruiter.value = true;
    } else {
      isRecruiter.value = false;
    }
  }
);

const high_level = shallowRef<boolean>(true);

const detailed = shallowRef<boolean>(false);

const dropDowns = {
  interviewNo: 1,
  dropdowns: [
    { label: 'Interviewers', options: ['option1', 'option2'] },
    { label: 'Purpose', options: ['option1', 'option2'] },
  ],
};

const formData = ref({
  assessment_id: '',
  case_study: '',
  configuration: '',
  id: '',
  status: 'pending',
});

const interviews = ref<Array<Record<string, any>>>([dropDowns]);

const addInterview = (e: MouseEvent) => {
  const lastInterview = interviews.value.at(-1);

  const newInterviewNo = lastInterview ? lastInterview.interviewNo + 1 : 1;

  const newInterview = {
    ...dropDowns,
    interviewNo: newInterviewNo,
  };

  interviews.value.push(newInterview);

  (e.target as HTMLElement)?.previousElementSibling?.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
  });
};
</script>
<style lang="scss" scoped>
@use 'sass:color';
@import '@/assets/styles/scss/cards';
@import '@/assets/styles/scss/functions';
@import '@/assets/styles/scss/variables';
@import '@/assets/styles/scss/mixins';
@import '@/assets/styles/scss/responsive';

.fade-enter-active,
.fade-leave-active {
  transition: transform ease 0.2s;
  overflow: hidden;
}

.fade-enter-active,
.fade-leave-to {
  transform: scale(0);
}

.fade-enter-to {
  transform: scale(1);
}

.add-interview-button-container {
  margin-top: 1rem;

  .add-interview {
    color: lightColor(primary);
    font-size: pxToRem(12);
    display: flex;
    align-items: center;
    font-weight: 500;
    gap: pxToRem(8);

    .icon-plus-bordered {
      font-size: pxToRem(20);
    }
  }
}

.card-tile.mar-b-32 {
  margin-bottom: pxToRem(32);
}

.base-card .card-tile-title.mar-b-16 {
  margin-bottom: pxToRem(16);
}
</style>
