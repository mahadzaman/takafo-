<template>
  <div class="job-view-footer-wrap mar-t-auto">
    <div class="d-flex align-center flex-wrap gap-16">
      <div>
        <template v-if="!hiringApproval">
          <v-btn
            v-if="!submit"
            @click="handleSubmitClick"
            :loading="loading"
            class="primary-button regular-button mar-r-20"
            >Save Changes</v-btn
          >
          <span
            v-else
            :title="
              isCompleted
                ? 'Click to submit'
                : 'Please complete all steps before submitting'
            "
          >
            <v-btn
              @click="handleSubmitClick"
              class="primary-button regular-button mar-r-20"
              :readonly="!isCompleted"
              >Submit</v-btn
            >
          </span>
          <v-btn
            v-if="reset"
            @click="handleResetClick"
            class="base-button color-primary"
            >Reset All
          </v-btn>
        </template>

        <template v-else>
          <v-btn
            outlined
            class="secondary-button regular-button mar-r-20"
            @click="handleApprove"
            >Approve Now</v-btn
          >

          <v-btn
            outlined
            class="secondary-button regular-button color-danger"
            @click="handleReject"
            >Reject</v-btn
          >
        </template>
      </div>

      <progress-percentage
        v-if="percentage && !hiringApproval"
        :percentage="percentage"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import ProgressPercentage from '@/components/jobView/ProgressPercentage.vue';

interface Props {
  percentage?: string;
  submit?: boolean;
  loading?: boolean;
  isCompleted?: boolean;
  hiringApproval?: boolean;
  reset?: boolean;
}

withDefaults(defineProps<Props>(), {
  loading: false,
  isCompleted: false,
  reset: true,
});

const emit = defineEmits<{
  (e: 'resetForm'): void;
  (e: 'submitForm'): void;
  (e: 'ApproveForm'): void;
  (e: 'RejectForm'): void;
}>();

const handleResetClick = () => {
  emit('resetForm');
};

const handleSubmitClick = () => {
  emit('submitForm');
};
const handleApprove = () => {
  emit('ApproveForm');
};
const handleReject = () => {
  emit('RejectForm');
};
</script>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/assets/styles/scss/variables';
@import '@/assets/styles/scss/functions';
@import '@/assets/styles/scss/responsive';

.job-view-footer-wrap {
  border-top: 2px solid color.adjust(lightColor(disabled-light), $alpha: -0.88);
  padding: pxToRem(14) pxToRem(32) pxToRem(14) pxToRem(80);

  @include tablet {
    padding-left: 1rem;
  }
}

.color-danger {
  color: lightColor(danger);
}
</style>

