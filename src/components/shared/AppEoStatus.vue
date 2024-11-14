<template>
  <div class="card-tile">
    <div class="card-badge">
      <span>{{ counter }}</span>
    </div>

    <div class="card-tile-content">
      <div class="card-tile-header">
        <div>
          <p class="card-tile-title">
            {{ title }}
          </p>

          <div class="card-text-unemph mar-t-4">
            <span>
              {{ date }}
            </span>

            <span class="dot-status">
              {{ location }}
            </span>

            <span class="dot-status"> Mike Jackson </span>

            <span class="dot-status"> Finance </span>

            <span v-if="status" class="dot-status">
              {{ status }}
            </span>
          </div>
        </div>

        <div class="card-actions">
          <v-btn
            variant="text"
            class="base-button x-small-button font-size-12 color-primary"
          >
            <i class="icon-eye font-size-18">
              <span class="path1"></span>
              <span class="path2"></span>
            </i>
            View
          </v-btn>
        </div>
      </div>

      <template v-if="dashboardElements && dashboardElements.length > 0">
        <div class="d-flex dashboard-scroll">
          <AppDashboardElement
            v-for="(element, index) in dashboardElements"
            :key="index"
            :iconClass="element.src"
            :count="element.count"
            :label="element.label"
          />
        </div>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';
import { AppRoutes } from '@/interfaces';
import type { DashboardElement } from '@/interfaces/eo-status.interface';
import AppDashboardElement from './AppDashboardElement.vue';

const router = useRouter();

interface Props {
  counter: string;
  title?: string;
  date?: string;
  location: string;
  status?: string;
  dashboardElements?: DashboardElement[]; // Make this optional
}

defineProps<Props>();

</script>
<style lang="scss" scoped>
@import '@/assets/styles/scss/variables';
@import '@/assets/styles/scss/typography';
@import '@/assets/styles/scss/cards';

.content-container {
  width: 170px !important;
}

.sub-title {
  @extend .base-body-text-3;
  font-size: 0.65rem;
  line-height: 12px;
}

.container {
  background-color: lightColor(background);
  border-radius: 8px;
}

.dashboard-scroll {
  overflow-x: auto;
  white-space: wrap;
  margin-top: 0.75rem;
  max-width: 100%;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
