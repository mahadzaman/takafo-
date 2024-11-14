<template>
  <div class="jr-status-chip">
    <i :class="props.iconClass"></i>
    <span class="chip-count">{{ props.count }}</span>
    <span class="chip-label">{{ props.label }}</span>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  src: {
    type: String,
    required: false,
  },
  iconClass: {
    type: String,
    required: false,
  },
  count: {
    type: Number,
    required: false,
    default: undefined,
  },
  label: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/scss/variables';

.jr-status-chip {
  background: lightColor(white);
  display: flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  border: 1px solid;
  gap: 0.125rem;
  font-size: 0.625rem;
  font-weight: 500;

  i[class*='icon-'] {
    font-size: 0.875rem;
    padding-right: 1px;
  }

  .chip-label {
    color: lightColor(disabled);
  }

  &:not(:first-of-type) {
    margin-left: 0.375rem;
  }

  $starting-hue: 137;
  $variation: 79;
  $saturation: 0;

  @for $i from 0 through 9 {
    $varying-hue: $starting-hue + $i * $variation;
    $lightness: $i * 2 + 41%;

    @if $i == 2 {
      $saturation: 7;
      $varying-hue: 7;
      $lightness: 73%;
    } @else if $i == 3 {
      $lightness: 64%;
      $varying-hue: 266;
    } @else if $i == 5 {
      $saturation: 0;
    } @else {
      $starting-hue: 11 * $i + $variation;
    }

    &:nth-of-type(#{$i + 1}) {
      color: hsl($varying-hue, $saturation + 93%, $lightness);
      border-color: hsla($varying-hue, $saturation + 93%, $lightness, 0.2);
    }
  }
}
</style>
