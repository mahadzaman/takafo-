<template>
  <div class="workspace-header-wrapper mar-b-16">
    <div>
      <template v-if="!props.heading">
        <h1 class="base-title mar-b-tab-16">
          <span class="font-weight-400">Hey {{ props.name }},</span> Welcome
          Back 👋
        </h1>
      </template>
      <template v-else>
        <h1 class="base-heading-2">
          {{ props.heading }}
        </h1>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

const props = defineProps<{
  heading?: string;
  showButton?: boolean;
  showFilter?: boolean;
  path?: string;
  name?: string;
  btn_title?: string;
}>();
</script>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/assets/styles/scss/variables';
@import '@/assets/styles/scss/typography';
@import '@/assets/styles/scss/mixins';
@import '@/assets/styles/scss/cards';
@import '@/assets/styles/scss/forms';

.workspace-header-wrapper {
  @include card-settings;
  padding: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
</style>
