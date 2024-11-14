<template>
  <!-- Dynamically Rendered Dashboard Based on Role -->
  <component :is="currentDashboardComponent" />
</template>

<script lang="ts" setup>
import { computed, defineAsyncComponent } from 'vue';
import { useAuthStore } from '@/stores';
import { IApp } from '@/interfaces';

const authStore = useAuthStore();

// Dynamically determine the current dashboard component based on active role
const currentDashboardComponent = computed(() => {
  switch (authStore.getActiveRole().value?.role_name) {
    case IApp.RoleEnum.RECRUITER:
      return defineAsyncComponent(() => import('./JobView.vue'));
    case IApp.RoleEnum.HIRING_MANAGER:
      return defineAsyncComponent(() => import('./HiringManagerJobView.vue'));
    case IApp.RoleEnum.ADMIN:
      return defineAsyncComponent(
        () => import('@/views/InternalUsers/Admin/UserDetails.vue')
      );
    default:
      return null;
  }
});
</script>

<style lang="scss" scoped></style>
