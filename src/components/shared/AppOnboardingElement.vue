<template>
  <div class="d-flex bg-job-table-head my-3 radius-16 justify-space-between">
    <v-btn
      class="my-3 base-body-text-1 font-weight-bold text-none"
      variant="text"
    >
      <v-icon icon="mdi-account" start></v-icon>
      {{ props.title }}
    </v-btn>

    <p
      v-if="status"
      :class="[
        'base-body-text-3 pa-1 my-4 mr-2 radius-16 base-body-text-2 font-weight-bold',
        statusClass,
      ]"
    >
      {{ props.status }}
    </p>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue';
import { computed } from 'vue';

const props = defineProps<{
  title: string;
  status: string;
}>();

const statusClass = computed(() => {
  switch (props.status) {
    case 'Pending':
      return 'status-pending';
    case 'Completed':
      return 'status-completed';
    default:
      return '';
  }
});
</script>
<style lang="scss" scoped>
.status-pending {
  background-color: lightColor(warning);
  color: lightColor(white);
}

.status-completed {
  background-color: lightColor(success);
  color: lightColor(white);
}

.status-rejected {
  background-color: lightColor(danger);
  color: lightColor(white);
}
</style>
