<template>
  <section class="continer">
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
  </section>
</template>

<script lang="ts" setup>
import WorkspaceHeader from '@/components/shared/workspace/WorkspaceHeader.vue';
import MyAlerts from '@/components/shared/workspace/MyAlerts.vue';
import MatchingCandidates from '@/components/shared/workspace/MatchingCandidates.vue';
import JrStatus from '@/components/shared/workspace/JrStatus.vue';
</script>
