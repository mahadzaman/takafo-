<template>
  <v-row align="center" justify="center">
    <div class="base-card-tab mt-5 mb-10">
      <v-img
        class="micro-phone"
        :width="40"
        aspect-ratio="16/9"
        :src="Mic"
      ></v-img>
      <div class="d-flex align-center justify-center flex-r flex-wrap">
        <p class="base-body-text-2 font-weight-bold text-disabled">
          You will be talking with
        </p>
        <div class="d-flex align-center mt-2">
          <v-img :width="100" aspect-ratio="16/9" :src="userImage"></v-img>
          <div>
            <p class="base-heading ml">
              {{ userName }}
            </p>
            <p class="base-body-text-2 text-disabled">
              {{ userRole }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </v-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Mic from '@/assets/welcome/Mic.svg';
import userImage from '@/assets/welcome/kat_james.png';
const userName = ref('Kat James');

const userRole = ref('Lead UX');
</script>

<style lang="scss" scoped>
.micro-phone {
  position: absolute;
  left: -5px;
  top: -10px !important;
}
</style>
