<template>
  <div class="card-tile" direction="column">
    <h6 class="card-tile-title">{{ title }}</h6>
  </div>

  <v-row>
    <template v-if="title === 'Start Date'">
      <v-col cols="12" lg="4" md="2">
        <label for="" class="field-label">Select Date</label>

        <v-date-input
          :readonly="role !== 'recruiter'"
          class="relative base-date-input"
          variant="outlined"
          v-model="itemData.target_date"
          :min="new Date(new Date().setDate(new Date().getDate() - 1))"
          prepend-icon=""
        >
          <template #default>
            <i class="icon-calendar font-size-24"></i>
          </template>
        </v-date-input>
      </v-col>
    </template>

    <template v-else>
      <v-col cols="12" lg="4" md="6">
        <label for="" class="field-label"
          >Who is Responsible</label
        >
        <v-select
          :readonly="role !== 'recruiter'"
          :items="options"
          item-title="title"
          item-value="value"
          v-model="itemData.responsible_person"
          variant="outlined"
        />
      </v-col>

      <v-col cols="12" lg="4" md="6">
        <label for="" class="field-label">Average Cycle Time</label>
        <v-text-field
          :readonly="role !== 'recruiter'"
          class="base-input"
          v-model="itemData.average_cycle_time"
          placeholder="Type"
          variant="outlined"
          type="number"
        />
      </v-col>

      <v-col cols="12" lg="4" md="6">
        <label for="" class="field-label">Target Date</label>

        <v-date-input
          class="relative base-date-input"
          variant="outlined"
          v-model="itemData.target_date"
          :min="new Date(new Date().setDate(new Date().getDate() - 1))"
          prepend-icon=""
        >
          <template #default>
            <i class="icon-calendar font-size-24"></i>
          </template>
        </v-date-input>
      </v-col>
    </template>
  </v-row>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const kk = 1;

interface Props {
  title: string;
  role: string | undefined;
  item: any;
  options: any;
}

const props = defineProps<Props>();
const itemData = ref(props.item);
</script>
<style lang="scss" scoped>
@import '@/assets/styles/scss/cards';
</style>

