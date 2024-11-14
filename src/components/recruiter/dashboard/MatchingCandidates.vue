<template>
  <div class="container flex-wrap pa-md-2 mb-3">
    <div class="content d-flex flex-wrap justify-space-between align-center">
      <div class="info d-flex align-center">
        <img
          src="@/assets/recruiter/dashboard/person_image.svg"
          :width="50"
          aspect-ratio="1"
          class="mr-2"
        />
        <div class="d-flex flex-column">
          <p class="base-body-text-1 mb-1">Humam Rassi</p>
          <p class="base-body-text-1 text-disabled">@SimForm</p>
        </div>
      </div>
      <div class="match d-flex align-center justify-center pa-1 ml-15 mb-2">
        <p class="base-body-text-3">94% Match</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts"></script>

<style lang="scss" scoped>
.container {
  background-color: lightColor(background);
  border-radius: 8px;
}
</style>
