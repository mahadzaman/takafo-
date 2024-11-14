<template>
  <section>
    <WorkspaceHeader />
    <div class="max-height-500">
      <v-row class="main1">
        <v-col cols="12" md="4">
          <MyAlerts />
        </v-col>
        <v-col cols="12" md="8">
          <JrStatus />
        </v-col>
      </v-row>
    </div>

    <MatchingCandidates />
  </section>
</template>

<script lang="ts" setup>
import WorkspaceHeader from '@/components/shared/workspace/WorkspaceHeader.vue';
import MyAlerts from '@/components/shared/workspace/MyAlerts.vue';
import MatchingCandidates from '@/components/shared/workspace/MatchingCandidates.vue';
import JrStatus from '@/components/shared/workspace/JrStatus.vue';
</script>

<style lang="scss" scoped>
.max-height-500 {
  max-height: 500px;

  .v-row,
  .v-col-md-4,
  .v-col-md-8 {
    max-height: inherit;
  }
}
</style>
