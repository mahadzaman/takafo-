<template>
  <div
    class="base-card rap-card"
    :class="{ 'border-bottom-and-radius': !isRecruiter }"
  >
    <div class="jr-details-wrap">
      <job-view-header
        title="Sourcing Plan"
        :badge="{ type: 'counter', counter: 4 }"
        customClasses="bordered-header"
        :prev-next-nav="{
          backLink: 'PreScreeningQuestions',
          nextLink: 'AssessmentPlan',
        }"
        back-to-module="RAP"
      />

      <div class="card-content">
        <!-- will name this section LATER -->
        <template v-for="(item, index) in dataGroups" :key="index">
          <div
            v-if="item.title === 'withTile'"
            class="card-tile"
            direction="column"
          >
            <div class="pad-y-12">
              <v-row>
                <template v-for="(field, i) in item.fields" :key="i">
                  <v-col lg="6" md="6" sm="12" cols="12">
                    <label class="field-label">{{ field.label }}</label>

                    <v-combobox
                      v-model="field.value"
                      clearable
                      multiple
                      :class="[
                        { 'disabled-input-readonly': !isRecruiter },
                        'v-combobox',
                      ]"
                      variant="outlined"
                      :readonly="!isRecruiter"
                      :disabled="!isRecruiter"
                    >
                      <template v-slot:selection="data">
                        <v-chip :key="JSON.stringify(data.item)" size="small">
                          {{ data.item.title }}
                          <v-icon
                            small
                            @click.stop="
                              () => {
                                field.value = field.value.filter(
                                  (i: string) => i !== data.item.title
                                );
                              }
                            "
                            >mdi-close</v-icon
                          >
                        </v-chip>
                      </template>
                    </v-combobox>
                  </v-col>
                </template>
              </v-row>
            </div>
          </div>

          <div v-else class="pad-y-12">
            <v-row>
              <template v-for="(field, i) in item.fields" :key="i">
                <v-col lg="4" md="6" sm="12" cols="12">
                  <label class="field-label">{{ field.label }}</label>

                  <v-combobox
                    v-if="field.ele === 'comboBox'"
                    v-model="field.value"
                    clearable
                    multiple
                    :class="[
                      { 'disabled-input-readonly': !isRecruiter },
                      'v-comboboxWithoutTile',
                    ]"
                    variant="outlined"
                    :readonly="!isRecruiter"
                    :disabled="!isRecruiter"
                  >
                    <template v-slot:selection="data">
                      <v-chip :key="JSON.stringify(data.item)" size="small">
                        {{ data.item.title }}
                        <v-icon
                          small
                          icon="mdi-close"
                          @click.stop="
                            () => {
                              field.value = field.value.filter(
                                (i: string) => i !== data.item.title
                              );
                            }
                          "
                        />
                      </v-chip>
                    </template>
                  </v-combobox>

                  <v-text-field
                    v-else-if="field.ele !== 'select'"
                    :class="[
                      { 'disabled-input-readonly': !isRecruiter },
                      'base-input',
                    ]"
                    v-model="field.value"
                    variant="outlined"
                    :readonly="!isRecruiter"
                    :disabled="!isRecruiter"
                  />

                  <v-select
                    v-else
                    v-model="field.value"
                    :items="field.options"
                    item-title="title"
                    item-value="value"
                    :class="{ 'disabled-input-readonly': !isRecruiter }"
                    variant="outlined"
                    :readonly="!isRecruiter"
                    :disabled="!isRecruiter"
                  />
                </v-col>
              </template>
            </v-row>
          </div>
        </template>
      </div>

      <template v-if="isRecruiter">
        <job-view-footer
          percentage="65"
          @submit-form="handleSubmitForm"
          @resetForm="handleResetForm"
        />
      </template>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch, toRaw } from 'vue';
import { useRoute } from 'vue-router';
import { notify } from '@kyvg/vue3-notification';
import { useAuthStore, useJobStore } from '@/stores';
import JobViewHeader from '@/components/jobView/JobViewHeader.vue';
import JobViewFooter from '@/components/jobView/JobViewFooter.vue';
import SourcingPlanService from '@/services/SourcingPlanService';
import { Status } from '@/enums/jobs/jobs.enum';
import type { UpdateSourcingPlanDto, CreateSourcingPlanDTO } from '@/api-docs';

const resetDataGroup = ref([]);
const sourcePlanApi = new SourcingPlanService();
const authstore = useAuthStore();
const route = useRoute();
const planId = ref<string>('');
const isRecruiter = ref<boolean>(
  authstore.getActiveRole().value?.role_name === 'recruiter'
);
const recordAvailable = ref<boolean>(false);
const status = ref<string>('pending');
const jobStore = useJobStore();

const dataGroups = ref<Record<string, any>>([
  {
    title: 'withTile',
    fields: [
      {
        label: 'Target Companies',
        value: [] as string[],
      },
      {
        label: 'Target Job Titles',
        value: [] as string[],
      },
      {
        label: 'Target Locations',
        value: [] as string[],
      },
      {
        label: 'Hands Off List',
        value: [] as string[],
      },
    ],
  },
  {
    title: 'withoutTile',
    fields: [
      {
        label: 'Referrals',
        value: [] as string[],
        ele: 'comboBox',
      },
      {
        label: 'Sourcing Channels',
        value: [] as string[],
        ele: 'comboBox',
      },
      {
        label: 'Careers Site',
        value: [] as string[],
        ele: 'comboBox',
      },
      {
        label: 'Agency',
        value: '',
      },
      {
        label: 'Grow',
        value: '',
      },
      {
        label: 'Data Base Search Automated (Default On!)',
        value: true,
        ele: 'select',
        options: [
          { title: 'ON', value: true },
          { title: 'OFF', value: false },
        ],
      },
    ],
  },
]);

// Get Sourcing Plan Data
const getSourcingPlan = async () => {

  jobStore.fetchJobRAP(`${route.params.id}`).then((data: any) => {
    status.value = data.job_advert_status;

    if (status.value && status.value === 'pending') {
      return;
    }
  });

  try {
    handleResetForm()
    const { data } = await sourcePlanApi.jobsControllerGetSourcingPlanByJobId(
      `${route.params.id}`
    );

    recordAvailable.value = true;

    dataGroups.value[0].fields[0].value = data.target_companies;
    dataGroups.value[0].fields[1].value = data.target_job_titles;
    dataGroups.value[0].fields[2].value = data.target_locations;
    dataGroups.value[0].fields[3].value = data.hands_off_list;
    dataGroups.value[1].fields[0].value = data.referrals;
    dataGroups.value[1].fields[1].value = data.sourcing_channels;
    dataGroups.value[1].fields[2].value = data.career_sites;
    dataGroups.value[1].fields[3].value = data.agency;
    dataGroups.value[1].fields[4].value = data.grow;
    dataGroups.value[1].fields[5].value = data.database_search_automated;
    planId.value = data.id;
    resetDataGroup.value = JSON.parse(JSON.stringify(dataGroups.value));
  } catch (error) {
    console.log('Error Fetching Sourcing Plan', error);
  }
};

const handleResetForm = () => {
  dataGroups.value = dataGroups.value.map((group: any) => ({
    ...group,
    fields: group.fields.map((field: any) => {
      let resetValue = field.value;

      if (typeof Array.isArray(resetValue)) {
        resetValue = [];
      } else if (typeof resetValue === 'string') {
        resetValue = '';
      } else if (typeof resetValue === 'boolean') {
        resetValue = true;
      }

      return {
        ...field,
        value: resetValue,
      };
    }),
  }));
};

getSourcingPlan();

watch(
  () => authstore.getActiveRole().value,
  newRole => {
    if (newRole) {
      getSourcingPlan();

      if (newRole?.role_name === 'recruiter') {
        isRecruiter.value = true;
      } else {
        isRecruiter.value = false;
      }
    }
  }
);

const prepareData = (dataGroups: any) => {
  let payload: Record<string, any> = {
    target_companies: dataGroups.value[0].fields[0].value,
    target_job_titles: dataGroups.value[0].fields[1].value,
    target_locations: dataGroups.value[0].fields[2].value,
    hands_off_list: dataGroups.value[0].fields[3].value,
    referrals: dataGroups.value[1].fields[0].value,
    sourcing_channels: dataGroups.value[1].fields[1].value,
    career_sites: dataGroups.value[1].fields[2].value,
    agency: dataGroups.value[1].fields[3].value,
    grow: dataGroups.value[1].fields[4].value,
    database_search_automated: dataGroups.value[1].fields[5].value,
    job_id: route.params.id.toString(),
    status: Status.Pending,
  };

  let values;

  if (recordAvailable.value) {
    values = Object.values(payload).slice(0, -2);
  } else {
    values = Object.values(payload).slice(0, -1);
  }

  const allFilled = values.every((item, i) => {
    let val = toRaw(item);

    if ((typeof val === 'string' && val.trim()) || val.length > 0) {
      return true;
    } else if (typeof val === 'boolean') {
      return true;
    } else {
      return false;
    }
  });

  if (!allFilled) {
    payload.status = Status.InProgress;
  } else {
    payload.status = Status.Completed;
  }

  if (recordAvailable.value) {
    delete payload.job_id;
  }

  return payload;
};

const createSourcingPlan = async () => {
  const payload = prepareData(dataGroups);

  try {
    await sourcePlanApi.createSourcingPlan(payload as CreateSourcingPlanDTO);

    jobStore.setJobRAP({ sourcing_plan_status: payload.status });

    notify({
      title: 'Sourcing Plan Created',
      text: 'Sourcing Plan Created Successfully.',
      type: 'success',
    });
  } catch (error) {
    console.log('Error Creating Sourcing Plan', error);
  }
};

const updateSourcingPlan = async () => {
  const payload = prepareData(dataGroups);

  try {
    await sourcePlanApi.jobsControllerUpdateSourcingPlan(
      planId.value,
      payload as UpdateSourcingPlanDto
    );

    jobStore.setJobRAP({ sourcing_plan_status: payload.status });

    resetDataGroup.value = JSON.parse(JSON.stringify(dataGroups.value));
    notify({
      title: 'Sourcing Plan Updated',
      text: 'Sourcing Plan Updated Successfully.',
      type: 'success',
    });
  } catch (error) {
    console.log('Error Updating Sourcing Plan', error);
  }
};

const handleSubmitForm = () => {
  if (status.value === 'pending') {
    if (
      JSON.stringify(resetDataGroup.value) === JSON.stringify(dataGroups.value)
    ) {
      notify({
        title: 'No change detected',
        text: 'No Change Detected in the form',
        type: 'warn',
      });
      return;
    }

    createSourcingPlan();
  } else {
    if (
      JSON.stringify(resetDataGroup.value) === JSON.stringify(dataGroups.value)
    ) {
      notify({
        title: 'No change detected',
        text: 'No Change Detected in the form.',
        type: 'warn',
      });
      return;
    }

    updateSourcingPlan();
  }
};

</script>
<style lang="scss" scoped>
@import '@/assets/styles/scss/cards';
</style>

