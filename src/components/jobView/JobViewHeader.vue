<template>
  <!-- JR details header section -->
  <div
    :class="[
      'card-header-wrap',
      'gap-y-16',
      customClasses,
      { 'bordered-header': border },
    ]"
  >
    <back-button :module="backToModule" />

    <div class="card-title-wrap d-flex align-center">
      <div v-if="badge" class="card-badge card-badge-lg mar-r-24" invert>
        <i v-if="badge.type === 'icon'" :class="badge.icon"></i>
        <span v-else>{{ `0${badge.counter}.` }}</span>
      </div>

      <h6 class="card-title">{{ title }}</h6>
    </div>

    <progress-percentage v-if="percentage" :percentage="percentage" />

    <div
      v-if="prevNextNav"
      class="prev-next-nav mar-l-auto d-flex align-center gap-22"
    >
      <router-link
        v-if="props.prevNextNav?.backLink"
        class="base-button color-disabled router-link"
        :to="backLink"
      >
        <span>Back</span>
      </router-link>

      <router-link
        v-if="props.prevNextNav?.nextLink"
        class="secondary-button regular-button"
        :to="nextLink"
        >Next</router-link
      >
    </div>
  </div>
</template>
<script lang="ts" setup>
import BackButton from '@/components/shared/common/BackButton.vue';
import ProgressPercentage from '@/components/jobView/ProgressPercentage.vue';
import { useJobStore } from '@/stores';
const jobStore = useJobStore();

const {
  job_advert_status,
  prescreen_question_status,
  sourcing_plan_status,
  assessment_plan_status,
  project_milestone_status,
} = jobStore.jobRAP;

type Badge =
  | { type: 'counter'; counter: number }
  | { type: 'icon'; icon: string };

interface PrevNext {
  backLink?: string;
  nextLink?: string;
}

interface Props {
  title: string;
  badge?: Badge;
  percentage?: string;
  border?: boolean;
  customClasses?: string | string[];
  prevNextNav?: PrevNext;
  backToModule?: string;
}

const props = withDefaults(defineProps<Props>(), {
  border: false,
});

const backLink = { name: props.prevNextNav?.backLink };

const nextLink = { name: props.prevNextNav?.nextLink };
</script>
<style lang="scss" scoped>
@import '@/assets/styles/scss/functions';
@import '@/assets/styles/scss/cards';
@import '@/assets/styles/scss/spacing';

.base-card {
  .card-header-wrap.pad-t-36 {
    padding-top: pxToRem(36);
  }
}
</style>

