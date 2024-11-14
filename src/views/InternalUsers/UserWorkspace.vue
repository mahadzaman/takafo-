<template>
  <div>
    <!-- Dynamically Rendered Dashboard Based on Role -->
    <component :is="currentDashboardComponent" />
  </div>
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
      return defineAsyncComponent(
        () =>
          import(
            '@/views/InternalUsers/Workspaces/RecruiterWorkSpace.vue'
          )
      );
    case IApp.RoleEnum.TALENT_PARTNER:
      return defineAsyncComponent(
        () =>
          import(
            '@/views/InternalUsers/Workspaces/TalentPartnerWorkSpace.vue'
          )
      );
    case IApp.RoleEnum.HIRING_MANAGER:
      return defineAsyncComponent(
        () =>
          import(
            '@/views/InternalUsers/Workspaces/HiringManagerWorkSpace.vue'
          )
      );
    case IApp.RoleEnum.MAN_POWER_PLANNING:
      return defineAsyncComponent(
        () =>
          import(
            '@/views/InternalUsers/Workspaces/ManPowerPlanningWorkSpace.vue'
          )
      );
    case IApp.RoleEnum.HEAD_OF_TALENT:
      return defineAsyncComponent(
        () =>
          import(
            '@/views/InternalUsers/Workspaces/HeadOfTalentWorkSpace.vue'
          )
      );
    case IApp.RoleEnum.ADMIN:
      return defineAsyncComponent(
        () => import('@/views/InternalUsers/Admin/AdminWorkspace.vue')
      );
    default:
      return null;
  }
});
</script>

<style lang="scss" scoped></style>
