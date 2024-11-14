<template>
  <section class="mt-10">
    <v-row>
      <v-col cols="12" md="6">
        <AppEoStatus
          :counter="formatCounter(1)"
          date="12 March, 2024"
          location="By ManPower"
          title="Software Engineer"
          status="Approved"
        />
      </v-col>
      <v-col cols="12" md="6">
        <AppEoStatus
          :counter="formatCounter(2)"
          date="12 March, 2024"
          location="By ManPower"
          title="Software Engineer "
          status="Approved"
        />
      </v-col>
    </v-row>
  </section>
</template>

<script setup lang="ts">
import AppEoStatus from '@/components/shared/AppEoStatus.vue';

const formatCounter = (counter: number) => {
  return counter < 10 ? `0${counter}` : counter.toString();
};
</script>
