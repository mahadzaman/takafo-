<template>
  <div class="base-card mar-t-16">
    <div class="d-flex flex-wrap align-start mar-b-8 justify-space-between">
      <h6 class="card-title">Matching Candidates</h6>
    </div>

    <v-row class="row-gap-12">
      <v-col md="6" lg="3">
        <AppMatchingCandidates name="Bilal" :image="person_image" />
      </v-col>
      <v-col md="6" lg="3">
        <AppMatchingCandidates name="Bilal" :image="person_image" />
      </v-col>
      <v-col md="6" lg="3">
        <AppMatchingCandidates name="Bilal" :image="person_image" />
      </v-col>
      <v-col md="6" lg="3">
        <AppMatchingCandidates name="Bilal" :image="person_image" />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts" setup>
import AppMatchingCandidates from '@/components/shared/AppMatchingCandidates.vue';
import person_image from '@/assets/images/person_image.svg';
</script>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/assets/styles/scss/variables';
@import '@/assets/styles/scss/cards';

.row-gap-12 {
  margin: -0.375rem;

  .v-col {
    padding: 0.375rem;
  }
}
</style>

