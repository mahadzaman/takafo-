<template>
  <div
    class="base-card rap-card"
    :class="{ 'border-bottom-and-radius': !isRecruiter }"
    direction="row"
  >
    <div class="jr-details-wrap">
      <job-view-header
        title="Job Advert"
        :badge="{ type: 'counter', counter: 1 }"
        customClasses="bordered-header"
        :prev-next-nav="{ nextLink: 'MatchingAlgo' }"
        back-to-module="RAP"
      />

      <div class="card-content">
        <job-advert-form :formData="formData" />
      </div>

      <template v-if="isRecruiter">
        <job-view-footer
          :loading="loading"
          @resetForm="handleFormDataState(true)"
          @submitForm="submitForm"
          percentage="20"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from 'vue';
import { notify } from '@kyvg/vue3-notification';
import { useRoute } from 'vue-router';
import { useAuthStore, useJobStore } from '@/stores';
import JobViewHeader from '@/components/jobView/JobViewHeader.vue';
import JobViewFooter from '@/components/jobView/JobViewFooter.vue';
import JobAdvertForm from '@/components/jobView/jobAdvert/JobAdvertForm.vue';
import JobAdvertService from '@/services/JobAdvertService';
import type { CreateJobAdvertDTO } from '@/api-docs/models/create-job-advert-dto';
import type { UpdateJobAdvertDTO } from '@/api-docs/models/update-job-advert-dto';
import { UpdateJobAdvertDTOExternalJobPostingTypeEnum } from '@/api-docs/models/update-job-advert-dto';
import { Status } from '@/enums/jobs/jobs.enum';

const route = useRoute();
const loading = ref<boolean>(false);
const status = ref<string>('pending');
const authStore = useAuthStore();
const jobStore = useJobStore();
const isRecruiter = ref<boolean>(false);

isRecruiter.value = authStore.getActiveRole().value?.role_name === 'recruiter';

const formData = ref([
  {
    heading: 'External',
    formFields: [
      {
        key: 'external_about_us',
        label: 'About Us',
        value: '',
        defaultValue: '',
        ele: 'TextArea',
      },
      {
        key: 'external_what_will_you_do',
        label: 'What you will do',
        value: '',
        defaultValue: '',
        ele: 'TextArea',
      },
      {
        key: 'external_what_you_will_bring',
        label: 'What will you bring',
        value: '',
        defaultValue: '',
        ele: 'TextArea',
      },
      {
        key: 'external_what_we_offer_you',
        label: 'What we offer',
        value: '',
        defaultValue: '',
        ele: 'TextArea',
      },
      {
        key: 'external_key_indicators',
        label: 'Key Indicators',
        value: '',
        defaultValue: '',
        ele: 'TextArea',
      },
      {
        key: 'external_job_posting_type',
        label: 'Job Management',
        value: '',
        options: [
          ...Object.values(UpdateJobAdvertDTOExternalJobPostingTypeEnum),
        ],
        defaultValue: '',
        ele: 'Select',
      },
      {
        key: 'external_agency',
        label: 'Agency',
        value: '',
        options: ['ABC', 'XYZ', '321 Org', 'The Agency.my'],
        defaultValue: '',
        ele: 'Select',
      },
      {
        key: 'external_start_date',
        label: 'Start Date',
        value: new Date(),
        defaultValue: new Date(),
        ele: 'DateInput',
      },
      {
        key: 'external_end_date',
        label: 'End Date',
        value: new Date(),
        defaultValue: new Date(),
        ele: 'DateInput',
      },
    ],
  },
  {
    heading: 'Internal',
    id: '',
    sameAsExternal: {
      key: 'same_as_external',
      label: 'Same as External',
      value: false,
      defaultValue: false,
    },
    formFields: [
      {
        key: 'internal_about_us',
        label: 'About Us',
        value: '',
        defaultValue: '',
        ele: 'TextArea',
      },
      {
        key: 'internal_what_will_you_do',
        label: 'What you will do',
        value: '',
        defaultValue: '',
        ele: 'TextArea',
      },
      {
        key: 'internal_what_you_will_bring',
        label: 'What will you bring',
        value: '',
        defaultValue: '',
        ele: 'TextArea',
      },
      {
        key: 'internal_what_we_offer_you',
        label: 'What we offer',
        value: '',
        defaultValue: '',
        ele: 'TextArea',
      },
      {
        key: 'internal_key_indicators',
        label: 'Key Indicators',
        value: '',
        defaultValue: '',
        ele: 'TextArea',
      },
      {
        key: 'internal_job_posting_type',
        label: 'Job Management',
        value: '',
        options: [
          ...Object.values(UpdateJobAdvertDTOExternalJobPostingTypeEnum),
        ],
        defaultValue: '',
        ele: 'Select',
      },
      {
        key: 'internal_start_date',
        label: 'Start Date',
        value: new Date(),
        defaultValue: new Date(),
        ele: 'DateInput',
      },
      {
        key: 'internal_end_date',
        label: 'End Date',
        value: new Date(),
        defaultValue: new Date(),
        ele: 'DateInput',
      },
      {
        key: 'status',
        value: Status.Pending,
        defaultValue: Status.Pending,
      },
    ],
  },
]);

const jobAdvertService = new JobAdvertService();

const prepareDataForUI = (respData: any) => {
  const { data } = respData;

  const valuesMap: Record<string, any> = {
    ...data,
  };

  formData.value.forEach(item => {
    if (item.sameAsExternal) {
      item.sameAsExternal.value = valuesMap[item.sameAsExternal.key];
      item.sameAsExternal.defaultValue = valuesMap[item.sameAsExternal.key];
    }

    if (item.id === '') {
      item.id = valuesMap.id;
    }

    item.formFields.forEach(field => {
      if (field.key.includes('_date')) {
        field.value = new Date(valuesMap[field.key]);
        field.defaultValue = new Date(valuesMap[field.key]);

        return;
      }

      field.value = valuesMap[field.key];
      field.defaultValue = valuesMap[field.key];
    });
  });
};

const getJobAdvert = async () => {
  const { job_advert_status } = await jobStore.fetchJobRAP(
    `${route.params.id}`
  );

  status.value = job_advert_status;

  if (!status.value || status.value === 'pending') {
    return;
  }

  try {
    const data = await jobAdvertService.getJobadvertById(`${route.params.id}`);

    if (data) {
      prepareDataForUI(data);
    }
  } catch (error: any) {
    console.log(error);
    const { data } = error.response;
  }
};

getJobAdvert();

const handleFormDataState = (
  reset: boolean = false,
  isUpdated: boolean = false
) => {
  formData.value.forEach(item => {
    if (reset) {
      if (item.sameAsExternal) {
        item.sameAsExternal.value = item.sameAsExternal.defaultValue;
      }

      item.formFields.forEach(field => {
        field.value = field.defaultValue;
      });
    } else if (isUpdated) {
      if (item.sameAsExternal) {
        item.sameAsExternal.defaultValue = item.sameAsExternal.value;
      }

      item.formFields.forEach(field => {
        field.defaultValue = field.value;
      });
    }
  });
};

const areFieldsFilled = (): boolean => {
  return formData.value.every(item =>
    item.formFields.every(field => {
      return field?.value?.toString().trim() !== '';
    })
  );
};

const isDirty = (): boolean => {
  return formData.value.some(item => {
    if (item.sameAsExternal) {
      if (item.sameAsExternal.value !== item.sameAsExternal.defaultValue) {
        return true;
      }
    }

    return item.formFields.some(field => {
      if (field.key.includes('_date')) {
        return (
          field.defaultValue instanceof Date &&
          field.value instanceof Date &&
          field.defaultValue.getTime() !== field.value.getTime()
        );
      }

      return field.defaultValue !== field.value;
    });
  });
};

const payload: Partial<UpdateJobAdvertDTO> = {};

const updateJobAdvert = async (payload: UpdateJobAdvertDTO) => {
  loading.value = true;

  try {
    await jobAdvertService.updateJobAdvert(payload, `${formData.value[1].id}`);
    handleFormDataState(false, true);

    jobStore.setJobRAP({
      job_advert_status: payload.status,
    });

    notify({
      title: 'Job Advert Saved Successfully',
      text: 'Job Advert Updated.',
      type: 'success',
    });

    loading.value = false;
  } catch (error: any) {
    loading.value = false;
    console.log(error);
    const { data } = error.response;

    notify({
      title: 'Something went wrong',
      text: data.message,
      type: 'error',
    });
  }
};

const createJobAdvert = async (payload: CreateJobAdvertDTO) => {
  loading.value = true;

  try {
    await jobAdvertService.createJobAdvert(payload);
    handleFormDataState(false, true);

    jobStore.setJobRAP({
      job_advert_status: payload.status,
    });

    notify({
      title: 'Job Advert Created Successfully',
      text: 'Job Advert Created.',
      type: 'success',
    });

    loading.value = false;
  } catch (error: any) {
    loading.value = false;
    console.log(error);
    const { data } = error.response;

    notify({
      title: 'Something went wrong',
      text: data.message,
      type: 'error',
    });
  }
};

const submitForm = () => {
  if (!isDirty()) {
    notify({
      title: 'No change detected',
      text: 'Please update the form in order to Save.',
      type: 'warn',
    });

    return;
  }

  if (areFieldsFilled()) {
    payload.status = Status.Completed;
  } else {
    payload.status = Status.InProgress;
  }

  formData.value.forEach((item: any) => {
    if (item.sameAsExternal)
      payload[item.sameAsExternal.key as keyof UpdateJobAdvertDTO] =
        item.sameAsExternal.value ?? '';

    item.formFields.forEach((field: any, i: number) => {
      if (field.key === 'status') return;

      payload[field.key as keyof UpdateJobAdvertDTO] = field.value ?? '';

      if (i === item.formFields.length - 1)
        (payload as Partial<UpdateJobAdvertDTO> & { job_id: string })[
          'job_id'
        ] = route.params.id as string;
    });
  });

  if (!status.value || status.value === 'pending') {
    createJobAdvert(payload as CreateJobAdvertDTO);
  } else {
    delete (payload as Partial<UpdateJobAdvertDTO> & { job_id?: string }).job_id;
    updateJobAdvert(payload as UpdateJobAdvertDTO);
  }
};

watch(
  () => authStore.getActiveRole().value,
  (newRole, oldRole) => {
    if (newRole?.role_name && oldRole) {
      getJobAdvert();
    }

    if (newRole?.role_name === 'recruiter') {
      isRecruiter.value = true;
    } else {
      isRecruiter.value = false;
    }
  }
);
</script>

<style lang="scss" scoped>
@import '@/assets/styles/scss/cards';
@import '@/assets/styles/scss/functions';
@import '@/assets/styles/scss/variables';
@import '@/assets/styles/scss/responsive';

.secondary-button {
  border: none;
}

.base-card {
  .back-button-card {
    @include tablet {
      flex-direction: column;
    }
  }

  .card-tile {
    padding: pxToRem(20);
    margin-bottom: 1rem;

    .card-tile-title-container {
      margin-left: 1rem;
    }
  }
}

.jr-details-wrap {
  width: 100%;
}
</style>
