<template>
  <div>
    <v-app>
      <section class="page">
        <AppNavbar />

        <div class="main-container">
          <div class="dash-row">
            <AppSidebar />
            <div class="content">
              <router-view></router-view>
            </div>
          </div>
        </div>
      </section>
    </v-app>
  </div>
</template>

<script lang="ts" setup>
import AppNavbar from '@/components/shared/AppNavbar.vue';
import AppSidebar from '@/components/shared/AppSidebar.vue';
</script>

<style lang="scss" scoped>
@import '@/assets/styles/scss/variables';
@import '@/assets/styles/scss/responsive';

.page {
  background: lightColor(background);
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
}

.main-container {
  width: 100%;
  padding: $gutter * 3;

  @include tablet {
    padding: $gutter * 2;
  }

  .dash-row {
    display: flex;
    margin-left: -#{$gutter};
    margin-right: -#{$gutter};
    max-width: calc(100% + 1rem);
  }

  .content {
    padding-left: $gutter;
    padding-right: $gutter;
    position: relative;
    flex-shrink: 1;
    flex-grow: 1;
    max-width: 100%;
  }
}
</style>
