<template>
  <v-col class="image-section pad-l-desktop-only-78" cols="12" md="6">
    <img
      alt="Welcome Image"
      class="welcome-image"
      src="@/assets/images/lady-image-blue.png"
    />
  </v-col>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/scss/functions';
@import '@/assets/styles/scss/responsive';

.image-section {
  display: flex;
  justify-content: flex-start;

  .welcome-image {
    max-width: 100%;
    height: auto;
  }

  @include desktop {
    padding-left: pxToRem(78);
  }

  @include notDesktop {
    justify-content: center;

    .welcome-image {
      max-width: 60%;
    }
  }
}
</style>
