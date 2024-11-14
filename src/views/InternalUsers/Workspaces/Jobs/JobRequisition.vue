<template>
  <div class="job-base-card">
    <div class="header d-flex align-center flex-row ga-2">
      <v-btn :flat="true" icon @click="goBack">
        <img max-width="20%" :src="arrow_left" />
      </v-btn>
      <img max-width="80px" :src="job_creation_image" />
      <h1 class="title-heading">Request for Job Requisition</h1>
    </div>
    <v-divider class="ma-md-3 ma-1"></v-divider>
    <div class="base-form ma-10">
      <div class="form-field custom-scrollbar">
        <v-row class="align-stretch">
          <v-col cols="3" v-if="isLargeScreen">
            <div class="sidebar">
              <div class="ml-md-2 pa-md-4 d-flex flex-column ga-3">
                <div
                  class="d-flex flex-wrap v-icon--clickable align-center ga-2"
                  @click="setPositionInfo"
                >
                  <img class="text-disabled" :src="dot" alt="" />

                  <p
                    class="nav-heading"
                    :class="{ 'text-primary': positionValue }"
                  >
                    Position Info
                  </p>

                  <img
                    class="nav-heading text-disabled"
                    :src="!changepositioninfoimage ? circle : tick"
                    alt=""
                  />
                </div>

                <div
                  class="d-flex flex-wrap v-icon--clickable align-center ga-2"
                  @click="setPlanInfo"
                >
                  <img class="text-disabled" :src="dot" alt="" />

                  <p class="nav-heading" :class="{ 'text-primary': planValue }">
                    Plan Info
                  </p>

                  <img
                    class="nav-heading text-disabled"
                    :src="!changeplaninfoimage ? circle : tick"
                    alt=""
                  />
                </div>

                <div
                  class="d-flex flex-wrap v-icon--clickable align-center ga-2"
                  @click="setRecruitingTeamInfo"
                >
                  <img class="text-disabled" :src="dot" alt="" />

                  <p
                    class="nav-heading"
                    :class="{ 'text-primary': recruitingTeamValue }"
                  >
                    Recruiting Team Info
                  </p>

                  <img class="nav-heading text-disabled" :src="circle" alt="" />
                </div>
              </div>
            </div>
          </v-col>
          <v-col :cols="isLargeScreen ? 9 : 12" class="main-container">
            <PositionInfo
              :formValues="PositionInfoFormValues"
              ref="positionInfoForm"
              @updateFormValues="updatePositionInfoFormValues"
              v-if="positionValue"
            />

            <PlanInfo
              :formValues="PlanInfoFormValues"
              @updateFormValues="updatePlanInfoFormValues"
              ref="planInfoForm"
              v-if="planValue"
            />

            <RecruitingTeamInfo
              :formValues="RecruiterTeamInfoFormValues"
              @updateFormValues="updateRecruitingInfoFormValues"
              ref="recruiterTeamInfoForm"
              v-if="recruitingTeamValue"
            />

            <div class="d-md-flex ml-5 flex-wrap mt-5 ga-4">
              <v-btn
                class="text-disabled base-button font-weight-bold"
                @click="goFormBack"
              >
                Back
              </v-btn>
              <v-btn
                v-if="!recruitingTeamValue"
                class="base-button text-primary job-approve-btn font-weight-bold"
                @click="goFormNext"
              >
                Next
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>
    <div class="d-md-flex ml-5 flex-wrap align-center mt-5 ga-4">
      <v-btn class="base-button" @click="submitForm"> Request Now </v-btn>
      <v-btn class="base-button" @click="resetAll"> Reset All </v-btn>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { notify } from '@kyvg/vue3-notification';
import { AppRoutes } from '@/interfaces';
import PositionInfo from '@/components/forms/JobRequistion/PositionInfo.vue';
import PlanInfo from '@/components/forms/JobRequistion/PlanInfo.vue';
import RecruitingTeamInfo from '@/components/forms/JobRequistion/RecruitingTeamInfo.vue';
import type { CreateJobPayload } from '@/stores/modules/jobs_creation/jobs_creation.interface';
import { useSaveJob } from '@/hooks/jobs';
import { appUtils } from '@/utils';
import job_creation_image from '@/assets/job/create_job/post-job-heading.svg';
import arrow_left from '@/assets/job/create_job/arrow-left.svg';
import dot from '@/assets/icons/job/cd.svg';
import circle from '@/assets/icons/job/info-circle.svg';
import tick from '@/assets/icons/job/tick-circle.svg';

const router = useRouter();

const { mutate } = useSaveJob();

const positionInfoForm = ref<any>(null);

const planInfoForm = ref<any>(null);

const recruiterTeamInfoForm = ref<any>(null);

const positionValue = ref<boolean>(true);

const planValue = ref<boolean>(false);

const recruitingTeamValue = ref<boolean>(false);

const isLargeScreen = ref(window.innerWidth >= 850);

function updateScreenSize() {
  isLargeScreen.value = window.innerWidth >= 850;
}

onMounted(() => {
  window.addEventListener('resize', updateScreenSize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateScreenSize);
});

const updatePositionInfoFormValues = (newValues: any) => {
  PositionInfoFormValues.value = newValues;
};

const updatePlanInfoFormValues = (newValues: any) => {
  PlanInfoFormValues.value = newValues;
};

const updateRecruitingInfoFormValues = (newValues: any) => {
  RecruiterTeamInfoFormValues.value = newValues;
};

const RecruiterTeamInfoFormValues = ref({
  hiringManager: null,
  headOfTalent: null,
  mpPlanningManager: null,
  recruiter: null,
  recruiterSupport: null,
  talentPartner: null,
});

const PlanInfoFormValues = ref({
  numberOfHires: '',
  budgetType: null,
  budgetYear: null,
  contractType: null,
  businessCase: '',
});

const PositionInfoFormValues = ref({
  jobTitle: '',
  grade: '',
  platform: '',
  unit: '',
  location: null,
  countryExpat: '',
});

function goFormNext() {
  if (positionValue.value) {
    changepositioninfoimage.value = true;
    setPlanInfo();
  } else if (planValue.value) {
    changeplaninfoimage.value = true;
    setRecruitingTeamInfo();
  }
}

function goFormBack() {
  if (recruitingTeamValue.value) {
    setPlanInfo();
  } else if (planValue.value) {
    setPositionInfo();
  } else {
    goBack();
  }
}

function setPositionInfo() {
  setAllform();
  positionValue.value = true;
}

function setPlanInfo() {
  setAllform();
  planValue.value = true;
}

function setRecruitingTeamInfo() {
  setAllform();
  recruitingTeamValue.value = true;
}

function setAllform() {
  planValue.value = false;
  positionValue.value = false;
  recruitingTeamValue.value = false;
}

function resetAll() {
  resetPositionForm();
  resetPlanForm();
  resetRecruitingForm();
}

function resetPositionForm() {
  PositionInfoFormValues.value.jobTitle = '';
  PositionInfoFormValues.value.grade = '';
  PositionInfoFormValues.value.platform = '';
  PositionInfoFormValues.value.unit = '';
  PositionInfoFormValues.value.location = null;
  PositionInfoFormValues.value.countryExpat = '';
}

function resetPlanForm() {
  PlanInfoFormValues.value.numberOfHires = '';
  PlanInfoFormValues.value.budgetYear = null;
  PlanInfoFormValues.value.budgetType = null;
  PlanInfoFormValues.value.contractType = null;
  PlanInfoFormValues.value.businessCase = '';
}

function resetRecruitingForm() {
  RecruiterTeamInfoFormValues.value.hiringManager = null;
  RecruiterTeamInfoFormValues.value.headOfTalent = null;
  RecruiterTeamInfoFormValues.value.mpPlanningManager = null;
  RecruiterTeamInfoFormValues.value.recruiter = null;
  RecruiterTeamInfoFormValues.value.recruiterSupport = null;
  RecruiterTeamInfoFormValues.value.talentPartner = null;
}

function goBack() {
  router.back();
}

const changepositioninfoimage = ref<boolean>(false);

const changeplaninfoimage = ref<boolean>(false);

function submitForm() {
  const recruitingValues = RecruiterTeamInfoFormValues.value || {};

  const positionFormValues = PositionInfoFormValues.value || {};

  const planFormValues = PlanInfoFormValues.value || {};

  const payload: CreateJobPayload = {
    contract_type: planFormValues.contractType ?? '',
    opportunity_type: 'Contract',
    requisition_title: positionFormValues.jobTitle,
    business_case: planFormValues.businessCase,
    lk_assessment_id: positionFormValues.location ?? '',
    lk_hiring_type_id: planFormValues.budgetYear ?? '',
    lk_location_id: positionFormValues.location ?? '',
    lk_budjet_id: planFormValues.budgetType ?? '',
    rolesResponsibility: 'takafo',
    category_id: 'd35a8b4d-15ae-4dbb-82c0-1be5d43b9a7c',
    hiring_type: planFormValues.numberOfHires ?? '', // Correct field based on formValues
    hiring_count: Number(planFormValues.numberOfHires), // Ensure number conversion
    grade: positionFormValues.grade ?? '',
    location: positionFormValues.location ?? '',
    budget_type: planFormValues.budgetType ?? '',
    budget_year: planFormValues.budgetYear ?? '',
    assests: 'assets',
    purpose: 'purpose',
    platform: positionFormValues.platform ?? '',
    unit: positionFormValues.unit ?? '',
    uae_expat: positionFormValues.countryExpat ?? '',
    jobAssociation: [
      {
        actionBy: [
          {
            user_id: 'a85bf14b-2d3c-45a2-944a-b85f52642e20',
            role_id: '18dab2de-f8e2-49b1-8e9a-59e9cdc950e2',
            role_label: 'Man Power Planning',
          },
        ],
      },
    ],
  };

  mutate(payload, {
    onSuccess: (data: any) => {
      notify({
        title: 'Request Sent',
        text: 'Your Job Creation Request has been sent successfully.',
        type: 'success',
      });
      router.push(AppRoutes.User.WORKSPACE);
    },
    onError: error => {
      const errorResp = appUtils.extractAxiosErrorMessage(error);

      notify({
        title: 'Request Error',
        text: errorResp.msg,
        type: 'error',
      });
    },
  });
}
</script>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/assets/styles/scss/typography';
@import '@/assets/styles/scss/variables';

.job-approve-btn {
  border: 2px solid lightColor(primary) !important;
}

.sidebar {
  height: 100%;
  background-color: lightColor(background);
}

.title-heading {
  @extend .base-heading-2;
}

.nav-heading {
  @extend .base-body-text-1;
  font-size: 12px;
}

.app-container {
  .button {
    background-color: lightColor(background);
  }

  background-color: lightColor(background);

  .job-container {
    background-color: lightColor(background);
    border-radius: 20px;
  }
}

.button-selected {
  background-color: lightColor(primary) !important;
  color: lightColor(white) !important;
}

.custom-scrollbar {
  max-height: 530px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    background: lightColor(background);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: color.adjust(lightColor(border-color), $alpha: -0.8);
    border-radius: 10px;
    border: 3px solid lightColor(background);
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: lightColor(
      primary
    ); /* Color of the scrollbar handle on hover */
  }
}

@media (max-width: 1000px) {
  .custom-scrollbar {
    max-height: 400px;
  }

  .title-heading {
    font-size: 0.95rem; /* Adjust font size for small screens */
  }

  .base-card {
    padding: 0.5rem 0.5rem;
  }
}

@media (max-width: 430px) {
  .custom-scrollbar {
    max-height: 600px;
  }
}

@media (max-width: 375px) {
  .custom-scrollbar {
    max-height: 340px;
  }
}

@media (max-width: 850px) {
  .nav-heading {
    display: none; // Hide the text when the screen is smaller than 850px
  }
}

.date-field {
  background-color: black;
}
</style>
