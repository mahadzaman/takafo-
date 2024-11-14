<template>
  <i :class="[`icon-${iconName}`, props.className, `icon-${iconSize}`]">
    <span
      v-for="i in Number(props.iconPathCount)"
      :key="i"
      :class="`path${i}`"
    ></span>
  </i>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  iconName: {
    type: String,
    required: true,
  },
  iconPathCount: {
    type: Number,
    required: true,
  },
  className: {
    type: String,
    required: false,
  },
  iconSize: {
    type: String,
  },
});
</script>

<style scoped lang="scss">
.icon-large {
  font-size: 1.4rem; /* Adjust this value to increase/decrease the size */
}
</style>
