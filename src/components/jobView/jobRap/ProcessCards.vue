<template>
  <div class="process-card-col">
    <div class="process-card" :class="{ active: status === 'In Progress' }">
      <div class="process-card-header">
        <div class="counter-badge">
          <span>{{ counter }}</span>
        </div>

        

        <span :class="[statusClass(status), 'capitalize status-tag', {'chip-sekeleton-loading': loading}]">
          <!-- <v-progress-circular v-if="!loading" indeterminate color="white" /> -->
          {{ status }}
        </span>
      </div>
      <h6 class="process-card-title">{{ title }}</h6>
      <v-btn class="process-card-action base-button color-primary" :to="link">
        <span>Click to view</span>
        <i class="icon-arrow-circle mar-l-6"></i>
      </v-btn>
    </div>
  </div>
</template>
<script lang="ts" setup>
interface Props {
  title: string;
  status?: string;
  counter: string;
  link: string | undefined;
  loading?: boolean;
}

const props = defineProps<Props>();

const statusClass = (status: string | null | undefined) => {
  if (status !== null && status !== undefined) {
    if (status?.toLowerCase() === 'pending') {
      return 'warning-bg';
    } else if (status?.toLowerCase() === 'in progress') {
      return 'progress-bg';
    } else {
      return 'success-bg';
    }
  }
};
</script>
<style lang="scss" scoped>
@use 'sass:color';
@import '@/assets/styles/scss/functions';
@import '@/assets/styles/scss/variables';
@import '@/assets/styles/scss/mixins';
@import '@/assets/styles/scss/responsive';
@import '@/assets/styles/scss/cards';

.process-card-col {
  flex: 1 0 calc(100% / 4);
  max-width: calc(100% / 4);
  padding: 0.5rem;
  padding-bottom: 3.5rem;
  position: relative;

  @include desktopWider {
    flex: 1 0 calc(100% / 6);
    max-width: calc(100% / 6);
  }

  @include tabletZone {
    flex: 1 0 calc(100% / 3);
    max-width: calc(100% / 3);
  }

  @include tablet {
    flex: 1 0 calc(100% / 2);
    max-width: calc(100% / 2);
  }

  @include mobile {
    flex: 1 0 100%;
    max-width: 100%;
  }

  &:after {
    content: '';
    bottom: 0.5rem;
    height: 1px;
    @include centralize-absolute-x;
    width: 100%;
    background: color.adjust(lightColor(disabled), $alpha: -0.68);
  }

  &:last-child:after {
    width: calc(100% - 0.5rem);
    transform: translateX(calc(-50% - 0.25rem));
  }
}

.process-card {
  background: lightColor(step-segment);
  padding: pxToRem(8);
  padding-bottom: pxToRem(16);
  border-radius: $card-tile-radius;
  border: 1px solid;
  border-color: transparent;
  position: relative;

  &:before,
  &:after {
    content: '';
    color: lightColor(primary);
    @include centralize-absolute-x;
    z-index: 1;
  }

  &:before {
    width: 1px;
    height: 3rem;
    bottom: -3rem;
    border: 1px dashed;
    color: color.adjust(lightColor(disabled), $alpha: -0.68);
  }

  &:after {
    width: pxToRem(12);
    height: pxToRem(12);
    border-radius: 50%;
    bottom: calc(-3rem - 7px);
    background: lightColor(disabled-light);
  }

  &.active {
    border-color: lightColor(primary);

    &:before {
      color: lightColor(primary);
    }

    &:after {
      background: lightColor(primary);
    }
  }

  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .counter-badge {
      color: lightColor(disabled);
      font-size: pxToRem(20);
    }
  }

  &-title {
    font-weight: 600;
    font-size: 1rem;
    margin-top: 1rem;
    white-space: nowrap;
    max-width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  &-action {
    margin-top: pxToRem(12);
    padding: 0;
  }

  .capitalize {
    text-transform: capitalize;
  }
}
</style>
