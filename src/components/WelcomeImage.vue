<template>
  <v-col class="image-section" cols="12" md="6">
    <img
      alt="Welcome Image"
      class="welcome-image"
      src="@/assets/lady-image.png"
    />
  </v-col>
</template>

<style lang="scss" scoped>
.image-section {
  display: flex;
  justify-content: center;

  .welcome-image {
    max-width: 80%;
    height: auto;
  }
}

@media (max-width: 600px) {
  .image-section {
    display: none;
  }
}
</style>
