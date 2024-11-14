<template>
  <div class="ma-4 candidate-card">
    <v-img
      height="80"
      :src="sidebarCandidateInfo.background_image"
      cover
    ></v-img>

    <div class="d-flex flex-column align-center profile-container">
      <v-img
        rounded="sm"
        class="profile-image"
        width="70"
        :src="sidebarCandidateInfo.profile_image"
        cover
      ></v-img>

      <h1 class="base-heading">
        {{ sidebarCandidateInfo.name }}
      </h1>
      <p class="sub-title mb-3">
        {{ sidebarCandidateInfo.designation }}
      </p>

      <div class="rounded-xl bg-white pa-2 my-3 d-flex v-breadcrumbs__prepend">
        <div class="rounded-circle bg-black py-2 px-1">
          <p class="text-white sub-title font-weight-bold">50%</p>
        </div>

        <p class="mx-1 sub-title font-weight-bold">Profile Status</p>
        <v-icon
          color="primary"
          icon="mdi-arrow-right-drop-circle-outline"
        ></v-icon>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import { type SidebarCandidateInformation } from '@/interfaces/sidebar-candidate-info.interface';

const props = defineProps<{
  sidebarCandidateInfo: SidebarCandidateInformation;
}>();
</script>

<style lang="scss" scoped>
@import '@/assets/styles/scss/typography';

.sub-title {
  @extend .base-body-text-1;
  font-size: 0.85rem;
}

.profile-container {
  margin-top: -35px;
}
</style>
