<template>
  <div
    class="d-flex ga-1 flex-column action-container bg-white"
    v-if="
      authStore.getActiveRole().value?.role_name ===
      IApp.RoleEnum.TALENT_PARTNER
    "
  >
    <div class="d-flex ml-4 ga-1 align-center">
      <v-icon size="18" color="primary"> mdi-eye-outline </v-icon>
      <p class="text-primary base-body-text-2">View Details</p>
    </div>
  </div>

  <div
    class="d-flex ga-1 flex-column action-container bg-white"
    v-if="
      authStore.getActiveRole().value?.role_name ===
      IApp.RoleEnum.MAN_POWER_PLANNING
    "
  >
    <div v-if="props.status === JobStatus.PENDING">
      <div
        @click="handleJob('approve')"
        class="d-flex ml-4 ga-1 mt-1 align-center"
      >
        <v-icon size="18" color="primary"> mdi-checkbox-outline </v-icon>
        <p class="text-primary base-body-text-2">Approve</p>
      </div>
      <v-divider class="border-opacity-25"></v-divider>

      <div @click="handleJob('reject')" class="d-flex ml-4 ga-1 align-center">
        <v-icon size="18" color="danger"> mdi-close-box-outline </v-icon>
        <p class="text-danger base-body-text-2">Reject</p>
      </div>
      <v-divider class="border-opacity-25"></v-divider>
    </div>

    <div class="d-flex ml-4 ga-1 align-center">
      <v-icon size="18" color="primary"> mdi-eye-outline </v-icon>
      <p class="text-primary base-body-text-2">View Details</p>
    </div>
  </div>
  <div
    class="d-flex ga-1 flex-column action-container bg-white"
    v-if="
      authStore.getActiveRole().value?.role_name ===
      IApp.RoleEnum.HEAD_OF_TALENT
    "
  >
    <div v-if="props.status === JobStatus.PENDING">
      <div
        @click="handleJob('approve')"
        class="d-flex ml-4 ga-1 mt-1 align-center"
      >
        <v-icon size="18" color="primary"> mdi-checkbox-outline </v-icon>
        <p class="text-primary base-body-text-2">Approve</p>
      </div>
      <v-divider class="border-opacity-25"></v-divider>

      <div @click="handleJob('reject')" class="d-flex ml-4 ga-1 align-center">
        <v-icon size="18" color="danger"> mdi-close-box-outline </v-icon>
        <p class="text-danger base-body-text-2">Reject</p>
      </div>
      <v-divider class="border-opacity-25"></v-divider>
    </div>

    <div class="d-flex ml-4 ga-1 align-center">
      <v-icon size="18" color="primary"> mdi-eye-outline </v-icon>
      <p class="text-primary base-body-text-2">View Details</p>
    </div>
  </div>
  <div
    class="d-flex ga-1 flex-column action-container bg-white"
    v-if="
      authStore.getActiveRole().value?.role_name ===
      IApp.RoleEnum.HIRING_MANAGER
    "
  >
    <div v-if="props.status === JobStatus.PENDING">
      <div
        @click="handleJob('approve')"
        class="d-flex ml-4 ga-1 mt-1 align-center"
      >
        <v-icon size="18" color="primary"> mdi-checkbox-outline </v-icon>
        <p class="text-primary base-body-text-2">Approve</p>
      </div>
      <v-divider class="border-opacity-25"></v-divider>

      <div @click="handleJob('reject')" class="d-flex ml-4 ga-1 align-center">
        <v-icon size="18" color="danger"> mdi-close-box-outline </v-icon>
        <p class="text-danger base-body-text-2">Reject</p>
      </div>
      <v-divider class="border-opacity-25"></v-divider>
    </div>

    <div class="d-flex ml-4 ga-1 align-center">
      <v-icon size="18" color="primary"> mdi-eye-outline </v-icon>
      <p class="text-primary base-body-text-2">View Details</p>
    </div>
  </div>
  <div
    class="d-flex ga-1 flex-column action-container bg-white"
    v-if="
      authStore.getActiveRole().value?.role_name === IApp.RoleEnum.RECRUITER
    "
  >
    <div v-if="props.status === JobStatus.PENDING">
      <div
        @click="handleJob('approve')"
        class="d-flex ml-4 ga-1 mt-1 align-center"
      >
        <v-icon size="18" color="primary"> mdi-checkbox-outline </v-icon>
        <p class="text-primary base-body-text-2">Approve</p>
      </div>
      <v-divider class="border-opacity-25"></v-divider>

      <div @click="handleJob('reject')" class="d-flex ml-4 ga-1 align-center">
        <v-icon size="18" color="danger"> mdi-close-box-outline </v-icon>
        <p class="text-danger base-body-text-2">Reject</p>
      </div>
      <v-divider class="border-opacity-25"></v-divider>
    </div>

    <div class="d-flex ml-4 ga-1 align-center">
      <v-icon size="18" color="primary"> mdi-eye-outline </v-icon>
      <p class="text-primary base-body-text-2">View Details</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults } from 'vue';
import { useRouter } from 'vue-router';
import { AppRoutes, IApp } from '@/interfaces';
import { JobStatus } from '@/constants/jobStatus';
import { useAuthStore } from '@/stores';

const authStore = useAuthStore();

const router = useRouter();

const emit = defineEmits(['buttonClick']);

const props = withDefaults(
  defineProps<{
    status: string;
    statusId: number;
  }>(),
  {
    status: '',
    statusId: 0,
  }
);

const handleJob = (action: 'approve' | 'reject'): void => {
  emit('buttonClick', action);
};


</script>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/assets/styles/scss/variables';

.action-container {
  border: 1px solid color.adjust(lightColor(border-color), $alpha: -0.8);
  width: 140px;
}
</style>
