<template>
  <v-row>
    <v-col
      class="header d-flex align-center flex-row ga-2 mar-b-16 pa-a-10 justify-space-between"
      cols="12"
    >
      <div class="d-flex">
        <v-btn :flat="true" icon>
          <img max-width="20%" :src="arrow_left" />
        </v-btn>
        <div class="d-flex align-center ga-5">
          <h1 class="counter-wrap base-heading-2">01.</h1>
          <h1 class="base-heading-1">Job Advert</h1>
        </div>
      </div>
      <div class="progress-wrap d-flex">
        <v-btn
          class="button-wrap secondary-button pad-y-22 base-body-text-4 px-5 py-2"
        >
          Next
        </v-btn>
      </div>
    </v-col>
  </v-row>
</template>
<script lang="ts" setup>
import arrow_left from '@/assets/job/create_job/arrow-left.svg';
</script>

<style lang="scss">
@import '@/assets/styles/scss/cards';
@import '@/assets/styles/scss/typography';
@import '@/assets/styles/scss/button';

.header {
  @extend .base-card;
  border: 0px !important;
}
.counter-wrap {
  @extend .base-card;
  background-color: lightColor(background) !important;
}
.button-wrap {
  //to set the color of next
}
</style>
