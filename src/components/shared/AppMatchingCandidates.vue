<template>
  <div class="card-tile">
    <div class="card-badge">
      <img
        :src="props.image"
        :width="50"
        aspect-ratio="1"
        class="some-image-class"
      />
    </div>

    <div class="card-tile-content">
      <div class="card-tile-header">
        <div class="card-tile-title">
          <p>{{ props.name }}</p>
          <p class="card-text-unemph">
            <span>Senior Sofware Engineer</span>
          </p>
        </div>

        <div class="star-rating">
          <span>4.0</span>
          <i class="icon-star"></i>
        </div>
      </div>

      <div class="card-tile-vertical-details mar-t-16">
        <div class="vertical-detail">
          <i class="icon-buildings">
            <span class="path1"></span>
            <span class="path2"></span>
            <span class="path3"></span>
            <span class="path4"></span>
            <span class="path5"></span>
            <span class="path6"></span>
            <span class="path7"></span>
          </i>
          <span>@SimForm</span>
        </div>

        <div class="vertical-detail">
          <i class="icon-location">
            <span class="path1"></span>
            <span class="path2"></span>
          </i>
          <span>Dubai, UAE</span>
        </div>

        <div class="vertical-detail">
          <i class="icon-brifecase-tick">
            <span class="path1"></span>
            <span class="path2"></span>
            <span class="path3"></span>
            <span class="path4"></span>
          </i>
          <span>5 Years of Experience</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults } from 'vue';

const props = withDefaults(
  defineProps<{
    name: string;
    image: string;
  }>(),
  {
    name: 'Hammad Yusuf',
    email: '@hammadY',
    percentageMatch: '90',
    image: '/src/assets/images/person_image.svg',
  }
);
</script>

<style lang="scss" scoped>
@import '@/assets/styles/scss/variables';
@import '@/assets/styles/scss/typography';
@import '@/assets/styles/scss/cards';

.container {
  background-color: lightColor(background);
  border-radius: 8px;
}

.sub-title {
  @extend .base-body-text-3;
  font-size: 0.65rem;
  line-height: 15px;
}
</style>
