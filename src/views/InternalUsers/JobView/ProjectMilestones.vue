<template>
  <div
    class="base-card rap-card"
    :class="{ 'border-bottom-and-radius': role !== 'recruiter' }"
  >
    <div class="jr-details-wrap">
      <job-view-header
        title="Project Milestones"
        :badge="{ type: 'counter', counter: 6 }"
        customClasses="bordered-header"
        :prev-next-nav="role === 'recruiter' ? withNext : withoutNext"
        back-to-module="RAP"
      />

      <div class="card-content">
        <project-milestone
          v-for="(item, i) in mileStonesSchema"
          :key="`mileStone ${i + 1}`"
          :title="milestonesTitles[i]"
          :item="(item as any)[Object.keys(item)[0]]"
          :role="role"
          :options="getOptionsForDropdown(i)"
        />
      </div>

      <template v-if="role === 'recruiter'">
        <job-view-footer
          @submit-form="saveProjectMileStones"
          @resetForm="handleResetForm"
          percentage="90"
        />
      </template>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, watchEffect } from 'vue';
import { useAuthStore } from '@/stores';
import JobViewHeader from '@/components/jobView/JobViewHeader.vue';
import JobViewFooter from '@/components/jobView/JobViewFooter.vue';
import ProjectMilestone from '@/components/jobView/projectMilestones/ProjectMilestone.vue';
import ProjectMilestonesService from '@/services/ProjectMilestonesService';
import UserServices from '@/services/userService';
import { useRoute } from 'vue-router';
import { notify } from '@kyvg/vue3-notification';

import type {
  CreateProjectMilestoneDTO,
  UpdateProjectMilestoneDTO,
} from '@/api-docs';

const apiProjectMileStones = new ProjectMilestonesService();
const apiUser = new UserServices();
const authstore = useAuthStore();
const route = useRoute();
const mileStoneID = ref(null);
const role = ref<string>();
const withNext = ref({
  backLink: 'AssessmentPlan',
  nextLink: 'SubmitRap',
});
const withoutNext = ref({
  backLink: 'AssessmentPlan',
});

const recruiterOptions = ref([]);
const hiringManagerOptions = ref([]);
const offerApproverOptions = ref([]);
const candidateOptions = ref([]);

watchEffect(() => {
  role.value = authstore.getActiveRole().value?.role_name;
});

const milestonesTitles = [
  'RAP Send',
  'RAP Approve',
  'Shortlist Delivery',
  'Assessment Complete',
  'Hiring Decision',
  'Offer Approved',
  'Offer Accepted',
  'Start Date',
];

const formatDate = (date: Date | null) => {
  if (!date) {
    return null;
  }
  return date;
};

const getProjectMileStones = async () => {
  try {
    const { data } = await apiProjectMileStones.getProjectMilestoneByJobId(
      route.params.id.toString()
    );
    mileStoneID.value = data.id;
    mapApiDataToSchema(data);
  } catch (error) {
    console.log('Error Fetching Project MileStones ', error);
  }
};

const handleResetForm = () => {
  mileStonesSchema.value.forEach(item => {
    Object.keys(item).forEach(key => {
      const milestone = item[key as keyof typeof item] as any;
      if (milestone) {
        milestone.responsible_person = '';
        milestone.average_cycle_time = 0;
        milestone.target_date = null;
      }
    });
  });
};

const getUsersByRoleName = async (role: string) => {
  try {
    const { data } = await apiUser.getUsersByRole(role);
    const options = data.map((user: any) => ({
      title: `${user.user_first_name} ${user.user_last_name}`.trim(),
      value: user.user_id,
    }));

    return options;
  } catch (error) {
    console.log('Error Fetching Users ', error);
  }
};

const getData = async () => {
  recruiterOptions.value = await getUsersByRoleName('Recruiter');
  hiringManagerOptions.value = await getUsersByRoleName('Hiring Manager');
  candidateOptions.value = await getUsersByRoleName('Candidate');
  offerApproverOptions.value = await getUsersByRoleName('Offer Approver');
  getProjectMileStones();
};

getData();

const saveProjectMileStones = async () => {
  const payload = generatePayload();
  const isDatesUnique = checkUniqueDates(payload);
  if (isDatesUnique !== 'unique') {
    const notificationTitle =
      isDatesUnique === 'matching'
        ? 'Please ensure all dates are unique.'
        : 'Please select all required dates before submitting.';

    notify({
      title: notificationTitle,
      text: 'Project Milestones',
      type: 'warning',
    });
    return;
  }
  if (!mileStoneID.value) {
    try {
      const {data} =  await apiProjectMileStones.createProjectMileStone(
        payload as unknown as CreateProjectMilestoneDTO
      );
      mileStoneID.value = data.id;
      notify({
        title: 'Project MileStone Created Successfully',
        text: 'Project MileStones',
        type: 'success',
      });
    } catch (error) {
      notify({
        title: 'Error Creating Project MileStone',
        text: 'Project MileStones',
        type: 'error',
      });
      console.log('Error Creating Project MileStones', error);
    }
  } else {
    delete payload.job_id;
    try {
      if (mileStoneID.value)
        await apiProjectMileStones.updateProjectMileStone(
          payload as unknown as UpdateProjectMilestoneDTO,
          mileStoneID.value
        );
      notify({
        title: 'Project MileStone Updated Successfully',
        text: 'Project MileStones',
        type: 'success',
      });
    } catch (error) {
      notify({
        title: 'Error Updating Project MileStone',
        text: 'Project MileStones',
        type: 'error',
      });
      console.log('Error Updating Project MileStones', error);
    }
  }
};

const checkStatus = () => {
  return mileStonesSchema.value.every(milestone => {
    const key = Object.keys(milestone)[0];
    const item = (milestone as any)[key];

    if (typeof item === 'object') {
      if (key === 'start_date') {
        return item.target_date !== null;
      } else {
        return (
          item.responsible_person !== '' &&
          item.average_cycle_time > 0 &&
          item.target_date !== null
        );
      }
    }
    return false;
  });
};

const generatePayload = () => {
  const modifiedMileStonesSchema = [...mileStonesSchema.value.slice(0, -1)];
  let finalResult = modifiedMileStonesSchema.reduce((acc, item) => {
    const key = Object.keys(item)[0];
    acc[key as keyof typeof item] = item[key as keyof typeof item];
    return acc;
  }, {} as any);
  Object.keys(finalResult).forEach(key => {
    finalResult[key].target_date = formatDate(finalResult[key].target_date);
    finalResult[key].average_cycle_time = String(
      finalResult[key].average_cycle_time
    );
  });
  finalResult = {
    ...finalResult,
    start_date: formatDate(
      mileStonesSchema.value[7]['start_date']?.target_date
        ? mileStonesSchema.value[7]['start_date']?.target_date
        : null
    ),
    job_id: route.params.id.toString(),
    status: checkStatus() ?  'completed' : 'pending',
  };

  return finalResult;
};

const checkUniqueDates = (data: any): string => {
  const parseDate = (dateStr: any): number | null => {
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? null : date.getTime();
  };
  const dates = [
    parseDate(data.rap_send?.target_date),
    parseDate(data.rap_approve?.target_date),
    parseDate(data.shortlist_delivery?.target_date),
    parseDate(data.assessment_complete?.target_date),
    parseDate(data.hiring_decision?.target_date),
    parseDate(data.offer_approved?.target_date),
    parseDate(data.offer_accepted?.target_date),
    parseDate(data.start_date),
  ];
  if (dates.includes(0)) {
    return 'dateMissing';
  }
  const uniqueDates = new Set(dates);
  return uniqueDates.size === dates.length ? 'unique' : 'matching';
};

const getOptionsForDropdown = (index: number) => {
  switch (index) {
    case 0:
      return recruiterOptions.value;
    case 1:
      return hiringManagerOptions.value;
    case 2:
      return hiringManagerOptions.value;
    case 3:
      return recruiterOptions.value;
    case 4:
      return recruiterOptions.value;
    case 5:
      return offerApproverOptions.value;
    case 6:
      return candidateOptions.value;
    default:
      return [];
  }
};

const mapApiDataToSchema = (apiData: any) => {
  const milestones = mileStonesSchema.value;
  milestones.forEach((milestone, index) => {
    if (milestone.rap_send) {
      milestone.rap_send.target_date = new Date(
        apiData.rap_send.target_date
      ) as any;
      milestone.rap_send.average_cycle_time =
        apiData.rap_send.average_cycle_time;
      milestone.rap_send.responsible_person =
        apiData.rap_send.responsible_person;
    }
    if (milestone.rap_approve) {
      milestone.rap_approve.target_date = new Date(
        apiData.rap_approve.target_date
      ) as any;
      milestone.rap_approve.average_cycle_time =
        apiData.rap_approve.average_cycle_time;
      milestone.rap_approve.responsible_person =
        apiData.rap_approve.responsible_person;
    }
    if (milestone.shortlist_delivery) {
      milestone.shortlist_delivery.target_date = new Date(
        apiData.shortlist_delivery.target_date
      ) as any;
      milestone.shortlist_delivery.average_cycle_time =
        apiData.shortlist_delivery.average_cycle_time;
      milestone.shortlist_delivery.responsible_person =
        apiData.shortlist_delivery.responsible_person;
    }
    if (milestone.assessment_complete) {
      milestone.assessment_complete.target_date = new Date(
        apiData.assessment_complete.target_date
      ) as any;
      milestone.assessment_complete.average_cycle_time =
        apiData.assessment_complete.average_cycle_time;
      milestone.assessment_complete.responsible_person =
        apiData.assessment_complete.responsible_person;
    }
    if (milestone.hiring_decision) {
      milestone.hiring_decision.target_date = new Date(
        apiData.hiring_decision.target_date
      ) as any;
      milestone.hiring_decision.average_cycle_time =
        apiData.hiring_decision.average_cycle_time;
      milestone.hiring_decision.responsible_person =
        apiData.hiring_decision.responsible_person;
    }
    if (milestone.offer_approved) {
      milestone.offer_approved.target_date = new Date(
        apiData.offer_approved.target_date
      ) as any;
      milestone.offer_approved.average_cycle_time =
        apiData.offer_approved.average_cycle_time;
      milestone.offer_approved.responsible_person =
        apiData.offer_approved.responsible_person;
    }
    if (milestone.offer_accepted) {
      milestone.offer_accepted.target_date = new Date(
        apiData.offer_accepted.target_date
      ) as any;
      milestone.offer_accepted.average_cycle_time =
        apiData.offer_accepted.average_cycle_time;
      milestone.offer_accepted.responsible_person =
        apiData.offer_accepted.responsible_person;
    }
    if (milestone.start_date) {
      milestone.start_date.target_date = new Date(apiData.start_date) as any;
    }
  });
};

const mileStonesSchema = ref([
  {
    rap_send: {
      responsible_person: '',
      average_cycle_time: 0,
      target_date: null,
    },
  },
  {
    rap_approve: {
      responsible_person: '',
      average_cycle_time: 0,
      target_date: null,
    },
  },
  {
    shortlist_delivery: {
      responsible_person: '',
      average_cycle_time: 0,
      target_date: null,
    },
  },
  {
    assessment_complete: {
      responsible_person: '',
      average_cycle_time: 0,
      target_date: null,
    },
  },
  {
    hiring_decision: {
      responsible_person: '',
      average_cycle_time: 0,
      target_date: null,
    },
  },
  {
    offer_approved: {
      responsible_person: '',
      average_cycle_time: 0,
      target_date: null,
    },
  },
  {
    offer_accepted: {
      responsible_person: '',
      average_cycle_time: 0,
      target_date: null,
    },
  },
  {
    start_date: {
      target_date: null,
    },
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
</style>

