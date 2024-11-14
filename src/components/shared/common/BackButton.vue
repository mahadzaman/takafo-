<template>
  <v-btn @click="goBack" :class="['base-button', 'back-button', customClasses]">
    <i class="icon-arrow"></i>
  </v-btn>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();

interface Props {
  customClasses?: string | string[];
  module?: string;
}

const props = defineProps<Props>();

const goBack = () => {
  if (props.module) {
    router.push({ name: props.module });

    return;
  }

  router.back();
};
</script>
<style lang="scss" scoped>
@import '@/assets/styles/scss/functions';
@import '@/assets/styles/scss/responsive';

.back-button {
  width: pxToRem(32);
  height: pxToRem(32);
  aspect-ratio: 1/1;
  margin-right: 1.5rem;

  @include tablet {
    margin-right: 1rem;
  }
}
</style>
