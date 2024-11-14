<template>
  <div class="base-card">
    <div class="d-flex justify-space-between align-center">
      <p class="base-heading-2">Profile Status</p>
      <v-icon color="primary" size="30">
        mdi-arrow-right-drop-circle-outline
      </v-icon>
    </div>

    <div class="d-flex justify-space-between align-center my-3">
      <p class="base-body-text-2 text-disabled">Completion</p>
      <p class="text-primary font-weight-black base-body-text-2">55%</p>
    </div>

    <v-progress-linear color="primary" model-value="55"></v-progress-linear>

    <p class="base-body-text-1 my-6">
      Pending areas to cover. Complete profile to get more suitable matching
      jobs
    </p>

    <div class="d-flex flex-wrap">
      <v-btn
        class="ma-2 base-body-text-3 bg-job-table-head profile-option text-none"
        variant="text"
      >
        <v-icon icon="mdi-home" start></v-icon>
        Work Experiance
      </v-btn>

      <v-btn
        class="ma-2 base-body-text-3 bg-job-table-head profile-option text-none"
        variant="text"
      >
        <v-icon icon="mdi-home" start></v-icon>
        Education
      </v-btn>

      <v-btn
        class="ma-2 base-body-text-3 bg-job-table-head profile-option text-none"
        variant="text"
      >
        <v-icon icon="mdi-home" start></v-icon>
        Documents
      </v-btn>

      <v-btn
        class="ma-2 base-body-text-3 bg-job-table-head profile-option text-none"
        variant="text"
      >
        <v-icon icon="mdi-home" start></v-icon>
        Certifications
      </v-btn>

      <v-btn
        class="ma-2 base-body-text-3 bg-job-table-head profile-option text-none"
        variant="text"
      >
        <v-icon icon="mdi-home" start></v-icon>
        Skills
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
@import '@/assets/styles/scss/variables';
</style>
