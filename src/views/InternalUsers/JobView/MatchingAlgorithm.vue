<template>
  <div
    class="base-card rap-card"
    :class="{ 'border-bottom-and-radius': role !== 'recruiter' }"
    direction="row"
  >
    <div class="jr-details-wrap">
      <job-view-header
        title="Matching Algorithm"
        :badge="{ type: 'counter', counter: 2 }"
        customClasses="bordered-header"
        :prev-next-nav="{
          backLink: 'JobsAdvert',
          nextLink: 'PreScreeningQuestions',
        }"
        back-to-module="RAP"
      />

      <div class="card-content">
        <!--  Top Fields  -->
        <v-row>
          <v-col cols="12" md="6">
            <label class="field-label"> Experienced</label>
            <v-text-field
              class="base-input disabled-input"
              type="text"
              hide-details
              placeholder="Type"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <label class="field-label"> Career Level</label>
            <v-text-field
              class="base-input disabled-input"
              type="text"
              hide-details
              placeholder="Type"
              variant="outlined"
            ></v-text-field>
          </v-col>
        </v-row>
        <!-- Skill Group -->

        <div class="card-color mar-t-20">
          <div class="d-flex align-center">
            <h4 class="base-body-text-2">Skill Group</h4>

            <v-chip class="ma-2 chip" label color="white">
              Business Skill
            </v-chip>
          </div>
        </div>
      </div>

      <template v-if="role === 'recruiter'">
        <job-view-footer percentage="35" />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue';
import { useAuthStore } from '@/stores';
import JobViewHeader from '@/components/jobView/JobViewHeader.vue';
import JobViewFooter from '@/components/jobView/JobViewFooter.vue';

const authstore = useAuthStore();

const role = ref<string>();

watchEffect(() => {
  role.value = authstore.getActiveRole().value?.role_name;
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/scss/functions';
@import '@/assets/styles/scss/cards';

.base-card {
  .card-tile {
    padding: pxToRem(20);
    margin-bottom: 1rem;

    .card-tile-title-container {
      margin-left: 1rem;
    }
  }
}

.card-color {
  background-color: #f4f9fb;
  height: 300px;
  padding: 14px;
}

.chip {
  // background: #ffffff !important;
  border: 1px solid #a4a8ab33;
}
</style>
