<template>
  <v-row>
    <v-col cols="12">
      <PositionDetails />

      <PlanDetails />

      <RecruitingTeamInfo />
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import PositionDetails from '@/components/jobs/PositionDetails.vue';
import PlanDetails from '@/components/jobs/PlanDetails.vue';
import RecruitingTeamInfo from '@/components/jobs/RecruitingTeamInfo.vue';
</script>

<style lang="scss" scoped></style>
