<template>
  <v-container class="base-form availability pa-3">
    <v-row class="align-center justify-space-between">
      <v-col cols="12" md="6" class="text-section">
        <div class="d-flex align-center justify-center flex-column">
          <StepSegment :currentStep="1" />

          <div class="step-content">
            <h3 class="base-heading-1" style="margin-bottom: 10px">
              Choose your Availability.
            </h3>
            <v-select
              v-model="availability"
              :items="availabilityOptions"
              placeholder="Select Availability"
              prepend-inner-icon="mdi-ghost"
              hide-details
              variant="solo"
              class="form-field-input"
            ></v-select>
            <v-chip
              v-if="availability"
              color="primary"
              class="base-body-text-1 selected-availability mt-4"
            >
              {{ availability }}
              <v-icon right @click="clearAvailability"> mdi-close </v-icon>
            </v-chip>
            <v-row class="mt-7 buttons-row" justify="space-between" no-gutters>
              <v-col class="button-col" cols="3">
                <v-btn class="base-button" @click="onGoBackClick">
                  Go Back
                </v-btn>
              </v-col>
              <v-col class="button-col" cols="3">
                <v-btn class="base-button" @click="onButtonClick"> Next </v-btn>
              </v-col>
            </v-row>
          </div>
        </div>
      </v-col>
      <Sidebar />
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import Sidebar from '@/components/Sidebar.vue';
import StepSegment from './StepSegment.vue';

const availability = ref<string | null>(null);

const availabilityOptions = ref<string[]>([
  'Remote - Full Time',
  'Remote - Part Time',
  'Onsite - Full Time',
  'Onsite - Part Time',
]);

const emit = defineEmits(['buttonClick', 'BackbuttonClick']);

const onButtonClick = () => {
  if (availability.value) {
    emit('buttonClick');
  } else {
    alert('Please select your availability');
  }
};

const onGoBackClick = () => {
  emit('BackbuttonClick');
};

const clearAvailability = (): void => {
  availability.value = null;
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/scss/variables';

.availability {
  .text-section {
    .step-indicator {
      width: 100%;
      max-width: 600px;
      height: 4px;
      margin-bottom: 16px;
      position: relative;

      .step-segment {
        flex-grow: 1;
        height: 100%;
        background-color: lightColor(step-segment);
        margin-right: 4px;

        &.active {
          background-color: lightColor(primary);
        }

        &:last-child {
          margin-right: 0;
        }
      }
    }

    .step-content {
      text-align: left;
      width: 100%;
      max-width: 600px;
    }
    .selected-availability {
      .v-icon {
        color: lightColor(white);
        border-radius: 20px;
        background-color: lightColor(danger);
        margin-left: 10px;
        cursor: pointer;
      }
    }
  }
}
</style>
