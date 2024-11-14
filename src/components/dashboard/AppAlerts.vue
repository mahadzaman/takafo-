<template>
  <div class="card-tile">
    <div class="card-badge">
      <img src="@/assets/images/3d-bell.png" :width="20" aspect-ratio="1/1" />
    </div>

    <div class="card-tile-content">
      <p class="card-tile-title">
        {{ props.title }}
      </p>

      <p class="card-text-unemph">
        <span>{{ props.date }}</span>
        <span v-if="props.status === 'Approved'">{{
          props.approvalStatus
        }}</span>
        <span class="dot-status" v-else>{{ props.approvalStatus }}</span>
      </p>

      <div class="card-actions alert-actions" position="bottom">
        <v-btn
          v-if="props.status === 'Pending'"
          class="secondary-button x-small-button font-size-12"
          @click="nextStep"
        >
          Approve
        </v-btn>

        <v-btn
          v-else
          class="secondary-button x-small-button font-size-12"
          @click="nextStep"
        >
          Join Meeting
        </v-btn>

        <div class="d-flex align-center">
          <v-btn
            variant="text"
            class="base-button x-small-button font-size-12 color-primary mar-l-6"
          >
            <i class="icon-eye font-size-18"
              ><span class="path1"></span><span class="path2"></span
            ></i>
            View
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';

// Define props with default values
const props = withDefaults(
  defineProps<{
    title: string;
    date: string;
    approvalStatus: string;
    status?: string;
  }>(),
  {
    title: 'Senior Software Engineer',
    date: 'March 12,2024',
    approvalStatus: 'Head of talent',
    status: 'Pending',
  }
);

function nextStep() {
  console.log('Next step clicked');
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/scss/typography';
@import '@/assets/styles/scss/cards';

.card-tile {
  background: lightColor(white);
  border-radius: 10px;
}

.sub-title {
  @extend .base-body-text-3;
  font-size: 0.65rem;
  line-height: 15px;
}

.alert-actions {
  button.v-btn {
    border-radius: 0.5rem;
  }
}
</style>
