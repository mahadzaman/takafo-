<template>
  <div class="base-card rap-card border-bottom-and-radius" direction="row">
    <div class="jr-details-wrap">
      <job-view-header
        title="Job Requisition Details"
        :badge="{ type: 'icon', icon: 'icon-notes' }"
        customClasses="bordered-header"
      />

      <div class="card-content">
        <div
          v-for="(item, index) in data"
          :key="index"
          class="card-tile"
          direction="column"
        >
          <div class="card-tile-header mar-b-24">
            <h6 class="card-tile-title">{{ item.title }}</h6>
          </div>
          <div class="pad-y-12">
            <v-row>
              <template v-for="(field, i) in item.fields" :key="i">
                <v-col v-if="field.text.length >= 100" cols="12">
                  <label class="field-label">{{ field.title }}</label>
                  <v-textarea
                    variant="outlined"
                    class="base-textarea disabled-input-readonly"
                    disabled
                    :model-value="field.text"
                  ></v-textarea>
                </v-col>

                <v-col v-else lg="4" md="6" sm="12" cols="12">
                  <label class="field-label">{{ field.title }}</label>
                  <v-text-field
                    variant="outlined"
                    class="base-input disabled-input-readonly"
                    :model-value="field.text"
                    disabled
                  />
                </v-col>
              </template>
            </v-row>
          </div>
        </div>

        <div class="card-tile" direction="column">
          <div class="card-tile-header mar-b-24">
            <h6 class="card-tile-title">Recruiting Team Info</h6>
          </div>

          <div class="pad-y-12">
            <v-row>
              <v-col lg="4" md="6" sm="12" cols="12">
                <label class="field-label">Hiring Manager</label>

                <v-text-field
                  variant="outlined"
                  class="base-input disabled-input-readonly"
                  model-value="Jackson"
                  disabled
                />
              </v-col>
              <v-col lg="4" md="6" sm="12" cols="12">
                <label class="field-label">Heads of Talent</label>

                <v-text-field
                  variant="outlined"
                  class="base-input disabled-input-readonly"
                  model-value="Sarah"
                  disabled
                />
              </v-col>
              <v-col lg="4" md="6" sm="12" cols="12">
                <label class="field-label">Talent Partner</label>
                <v-text-field
                  variant="outlined"
                  class="base-input disabled-input-readonly"
                  model-value="Rodri"
                  disabled
                />
              </v-col>
              <v-col lg="4" md="6" sm="12" cols="12">
                <label class="field-label">Recruiter</label>
                <v-text-field
                  variant="outlined"
                  class="base-input disabled-input-readonly"
                  model-value="Mike"
                  disabled
                />
              </v-col>
              <v-col lg="4" md="6" sm="12" cols="12">
                <label class="field-label">Recruiting Support</label>
                <v-text-field
                  variant="outlined"
                  class="base-input disabled-input-readonly"
                  model-value="Jimmy"
                  disabled
                />
              </v-col>
            </v-row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import JobViewHeader from '@/components/jobView/JobViewHeader.vue';
import { useFetchJob } from '@/hooks/jobs';
import type { JobDetails, Job } from '@/stores/modules/job/job.interface';

const route = useRoute();

const positionInfo = {
  groupTitle: 'Position Info',
  job_title: 'Job Title',
  grade: 'Grade',
  platform: 'Platform',
  unit: 'Unit',
  location: 'Location',
  nationality: 'Nationality',
};

const planInfo = {
  groupTitle: 'Plan Info',
  project_code: 'Project code',
  jr_number: 'JR number',
  hiring_count: 'Number of hires',
  contact_type: 'Contact type',
  budget_type: 'Budget type',
  budget_year: 'Budget year',
  business_case: 'Business case',
};

const recruitingTeamInfo = {
  groupTitle: 'Recruiting Team Info',
  hiring_manager: 'Hiring Manager',
  head_of_talent: 'Head of Talent',
  talent_partner: 'Talent Partner',
  recruiter: 'Recruiter',
  recruiting_support: 'Recruiting Support',
};

const jobDetails = ref<JobDetails | null>(null);

const data = ref<Array<Record<string, any>>>([]);

const sortData = (getJob: Job, dataGroup: any) => {
  const fields = Object.entries(getJob)
    .filter(([key]) => Object.keys(dataGroup).includes(key))
    .map(([key, value]) => ({
      title: dataGroup[key],
      text: value,
    }));

  if (fields.length > 0) {
    data.value.push({
      title: dataGroup.groupTitle,
      fields: fields,
    });
  }
};

const { data: job, isFetching, error } = useFetchJob(`${route.params.id}`);

watchEffect(() => {
  if (job.value) {
    jobDetails.value = job.value;

    sortData(job.value, positionInfo);
    sortData(job.value, planInfo);
    sortData(job.value, recruitingTeamInfo);

    if (data.value.length) {
      console.log(data.value);
    }
  }
});
</script>
<style lang="scss" scoped>
@import '@/assets/styles/scss/cards';
@import '@/assets/styles/scss/functions';
@import '@/assets/styles/scss/variables';
@import '@/assets/styles/scss/responsive';

.jr-details-wrap {
  flex: 1 1 auto;
}
</style>
