<template>
  <!-- Navbar-->
  <header
    :elevation="0"
    class="app-bar d-flex justify-space-between pad-x-48 pad-y-18 pad-x-not-desktop-20"
  >
    <div class="d-flex align-center">
      <template v-if="mdAndDown">
        <v-btn
          class="secondary-button small-button greyed-out"
          icon="mdi-dots-vertical"
          @click="toggleDrawer"
          variant="text"
        ></v-btn>
      </template>
      <v-img class="mar-x-not-desktop-24" :width="mdAndDown ? '130' : '220'" :src="logo" />
    </div>
    <!-- Navbar Actions -->
    <NavbarActions />
  </header>
</template>

<script lang="ts" setup>
import { useDisplay } from 'vuetify';
import NavbarActions from '@/components/navbar/NavbarActions.vue';
import { useDrawerEmitter } from '@/composables/useDrawerEmitter';
import logo from '@/assets/images/takafo-logo.svg';

const { toggleDrawer } = useDrawerEmitter();

const { lgAndDown, mdAndDown } = useDisplay();
</script>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/assets/styles/scss/variables';
@import '@/assets/styles/scss/mixins';

.app-bar {
  @include create-fields-border(20);
  background: lightColor(white);
}
</style>
