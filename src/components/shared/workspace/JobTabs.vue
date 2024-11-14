<template>
  <v-tabs v-model="internalTab">
    <v-tab
      v-for="(tab, index) in tabs"
      :key="index"
      :class="{
        'text-primary': internalTab === index,
        'text-disabled': internalTab !== index,
        'text-none base-body-text-1': true,
      }"
      @click="updateTab(index)"
    >
      {{ tab }}
    </v-tab>
  </v-tabs>
</template>
<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue';

const props = defineProps({
  tab: {
    type: Number,
    required: true,
  },
  tabs: {
    type: Array as () => string[],
    required: true,
  },
});

const emit = defineEmits(['update:tab']);

const internalTab = ref(props.tab);

watch(
  () => props.tab,
  newVal => {
    internalTab.value = newVal;
  }
);

const updateTab = (newTab: number) => {
  internalTab.value = newTab;
  emit('update:tab', newTab);
};
</script>
