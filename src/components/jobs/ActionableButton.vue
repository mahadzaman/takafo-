<template>
  <div class="align-center d-flex flex-wrap mt-3">
    <!-- Conditionally render buttons based on status -->
    <template v-if="props.status === 'pending'">
      <v-btn
        @click="handleJobAction('approve')"
        class="mx-2 mt-4 text-primary base-button job-approve-btn font-weight-bold"
      >
        Approve Now
      </v-btn>

      <v-btn
        @click="handleJobAction('reject')"
        class="mx-2 mt-4 text-danger base-button job-reject-btn font-weight-bold"
      >
        Reject
      </v-btn>

      <v-btn
        variant="text"
        prepend-icon="mdi-help-circle-outline"
        class="mx-2 text-primary font-weight-bold text-capitalize"
      >
        Ask More Information
      </v-btn>
    </template>

    <AppJobMessage
      v-if="jobModalVisible"
      :title="jobModalTitle"
      :subtitle="jobModalSubtitle"
      @close="closeJobModal"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import AppJobMessage from '@/components/shared/AppJobMessage.vue';

const props = defineProps({
  status: {
    type: String,
    required: true,
  },
});

const jobModalVisible = ref<boolean>(false);

const jobModalTitle = ref<string>('');

const jobModalSubtitle = ref<string>('');

const handleJobAction = (action: 'approve' | 'reject'): void => {
  if (action === 'approve') {
    jobModalTitle.value = 'Approve Requisition';
    jobModalSubtitle.value = 'Comments';
  } else if (action === 'reject') {
    jobModalTitle.value = 'Reject Requisition';
    jobModalSubtitle.value = 'Add Reason';
  }

  jobModalVisible.value = true;
};

const closeJobModal = (): void => {
  jobModalVisible.value = false;
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/scss/variables';

.base-button {
  @extend .base-button;
  background: lightColor(white) !important;
  min-height: 50px !important;
}

.job-approve-btn {
  border: 2px solid lightColor(primary) !important;
}

.job-reject-btn {
  border: 2px solid lightColor(red) !important;
}
</style>
