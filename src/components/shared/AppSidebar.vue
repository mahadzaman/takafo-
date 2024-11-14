<template>
  <div class="drawer-container" v-if="drawer">
    <div ref="sideBar" :class="{ 'scrolled-top': isAtTop }">
      <v-navigation-drawer
        v-model="drawer"
        class="navigationn radius-16"
        width="240"
      >
        <AppSidebarCandidateInfo
          :sidebarCandidateInfo="SidebarCandidateInfoContent"
          v-if="IApp.AppStates.CANDIDATE === authStore.getAppState().value"
        />
        <Sidebar />
      </v-navigation-drawer>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { watchEffect, onMounted, onUnmounted, ref } from 'vue';
import { useDisplay } from 'vuetify';
import Sidebar from '../sidebar/SidebarLinks.vue';
import AppSidebarCandidateInfo from './AppSidebarCandidateInfo.vue';
import { type SidebarLinks } from '@/interfaces/sidebar-link.interface';
import { type SidebarCandidateInformation } from '@/interfaces/sidebar-candidate-info.interface';
import { IApp } from '@/interfaces';
import { useAuthStore } from '@/stores';
import CoverPhoto from '@/assets/candidate/cover.png';
import ProfilePhoto from '@/assets/candidate/profile.png';
import { useDrawerEmitter } from '@/composables/useDrawerEmitter';

const isAtTop = ref<boolean>(false);

const sideBar = ref<HTMLElement | null>(null);

const handleScroll = () => {
  if (sideBar.value) {
    const scrollTop = sideBar.value.getBoundingClientRect().y;

    isAtTop.value = scrollTop <= 30;
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

const authStore = useAuthStore();


const SidebarCandidateInfoContent: SidebarCandidateInformation = {
  name: 'Shumaila Jubara',
  designation: 'Software Engineer',
  background_image: CoverPhoto,
  profile_image: ProfilePhoto,
};

const { drawer } = useDrawerEmitter();

const { lgAndUp, mdAndDown } = useDisplay();

watchEffect(() => {
  if (lgAndUp.value) {
    drawer.value = true;
  }
});
</script>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/assets/styles/scss/variables';
@import '@/assets/styles/scss/mixins';

.drawer-container {
  top: 1.5rem;

  @media (min-width: 1280px) {
    position: sticky;
    padding-left: $gutter;
    padding-right: $gutter;
    align-self: start;
  }

  .navigationn {
    background: lightColor(white);
    border-radius: $card-radius;
    @include create-fields-border(10);
    padding: 1.5rem;
    padding-bottom: 1.25rem;
    min-height: unset;
    transition: min-height 0.2s linear;

    ::v-deep(.v-list.v-list--nav) {
      margin: 0;
      margin-top: 1.25rem;
      padding: 0;
    }

    @media (min-width: 1280px) {
      position: unset !important;
      min-height: calc(100dvh - 9rem);
      height: unset !important;
    }
  }

  @media (min-width: 1280px) {
    .scrolled-top {
      .navigationn {
        min-height: calc(100dvh - 3rem);
      }
    }
  }
}
</style>
