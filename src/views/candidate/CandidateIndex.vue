<template>
  <v-app>
    <section class="page">
      <AppNavbar />
      <AppSidebar :sidebarLinks="sidebarLinks" />
      <v-main class="content">
        <router-view />
      </v-main>
    </section>
  </v-app>
</template>

<script lang="ts" setup>
import AppNavbar from '@/components/shared/AppNavbar.vue';
import AppSidebar from '@/components/shared/AppSidebar.vue';
import ActiveJobsIcon from '@/assets/icons/nav_sidebar/active/jobs.svg';
import Workspace from '@/assets/images/navbar/workspace.png';
import Requisition from '@/assets/images/navbar/job-requisition.png';
import Assesment from '@/assets/images/navbar/assesment.png';
import Refarrals from '@/assets/images/navbar/refarrals.png';
import Profile from '@/assets/images/navbar/profile.png';

const sidebarLinks: any = [
  {
    parent: {
      label: 'Workspace',
      route: '',
      icon: Workspace,
      active_icon: ActiveJobsIcon,
    },
    children: [],
  },
  {
    parent: {
      label: 'Jobs',
      route: '',
      icon: Requisition,
      active_icon: ActiveJobsIcon,
    },
    children: [],
  },
  {
    parent: {
      label: 'Assesments',
      route: '',
      icon: Assesment,
      active_icon: ActiveJobsIcon,
    },
    children: [],
  },
  {
    parent: {
      label: 'Referrals',
      route: '',
      icon: Refarrals,
      active_icon: ActiveJobsIcon,
    },
    children: [],
  },
  {
    parent: {
      label: 'My Profile',
      route: '',
      icon: Profile,
      active_icon: ActiveJobsIcon,
    },
    children: [],
  },
];
</script>

<style lang="scss" scoped>
@import '@/assets/styles/scss/variables';

.page {
  background: lightColor(background);
}
</style>
