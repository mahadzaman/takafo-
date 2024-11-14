<template>
  <div
    class="base-card rap-card"
    :class="{ 'border-bottom-and-radius': role !== 'recruiter' }"
    direction="row"
  >
    <div class="jr-details-wrap">
      <job-view-header
        title="Prescreening Questions"
        :badge="{ type: 'counter', counter: 3 }"
        customClasses="bordered-header"
        :prev-next-nav="{
          backLink: 'MatchingAlgo',
          nextLink: 'SourcingPlan',
        }"
        back-to-module="RAP"
      />
      <div class="card-content">
        <PreScreeningQuestions ref="childRef" :role="role"/>
      </div>

      <template v-if="role === 'recruiter'">
        <job-view-footer @resetForm="resetForm" @submitForm="submitForm" percentage="50" />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect, defineExpose } from 'vue';
import { useAuthStore } from '@/stores';
import PreScreeningQuestions from '@/components/jobs/PreScreeningQuestions.vue';
import JobViewHeader from '@/components/jobView/JobViewHeader.vue';
import JobViewFooter from '@/components/jobView/JobViewFooter.vue';

const authstore = useAuthStore();

const childRef = ref<InstanceType<typeof PreScreeningQuestions> | null>(null);

const role = ref<string>();

watchEffect(() => {
  role.value = authstore.getActiveRole().value?.role_name;
});

const submitForm = ()=>{
  if (childRef.value) {
    childRef.value.saveChangesofQuestions(role.value ? role.value : 'recruiter');
  }
}

const resetForm = ()=>{
  if (childRef.value) {
    childRef.value.resetFormToDefault(role.value ? role.value : 'recruiter');
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/scss/cards';
@import '@/assets/styles/scss/functions';
@import '@/assets/styles/scss/variables';
@import '@/assets/styles/scss/responsive';

.base-card {
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
