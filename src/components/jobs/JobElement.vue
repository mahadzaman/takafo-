<template>
  <v-row>
    <v-col class="d-flex ga-7 flex-wrap">
      <AppDashboardElement
        :src="location"
        label="Abu Dhabi, UAE"
        extra-class="font-weight-bold"
      />
      <AppDashboardElement
        :src="location"
        label="UAE, International"
        extra-class="font-weight-bold"
      />
      <AppDashboardElement
        :src="dollar"
        label="Budgeted/2024"
        extra-class="font-weight-bold"
      />
      <AppDashboardElement
        :src="monitor"
        label="Full Time Employee(FTE)"
        extra-class="font-weight-bold"
      />
      <AppDashboardElement
        :src="award"
        label="4th Grade"
        extra-class="font-weight-bold"
      />
      <AppDashboardElement
        :src="profileuser"
        label="2 Hires"
        extra-class="font-weight-bold"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import AppDashboardElement from '@/components/shared/AppDashboardElement.vue';
import location from '@/assets/icons/job/location.svg';
import dollar from '@/assets/icons/job/dollar-circle.svg';
import award from '@/assets/icons/job/award.svg';
import monitor from '@/assets/icons/job/monitor.svg';
import profileuser from '@/assets/icons/job/profile-2user.svg';
</script>
