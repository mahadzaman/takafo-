<template>
  <v-row>
    <v-col cols="12">
      <div class="base-card" style="min-height: 100vh; height: auto">
        <div class="display-field pa-3">
          <div
            class="d-flex flex-row justify-space-between align-center bg-white"
          >
            <div class="d-flex flex-row align-center">
              <v-btn icon elevation="0" @click="viewDetailsPage()">
                <v-icon>mdi-arrow-left</v-icon>
              </v-btn>
              <v-img
                class="bg-job-table-head"
                style="width: 50px; margin: 10px; border-radius: 12px"
                :src="profileImage"
              />
              <div class="d-flex flex-column align-center">
                <h2 class="base-heading-3">Shumaila Jabara</h2>
                <p class="base-body-text-2">Software Engineer @CubeTec Inc.</p>
              </div>
            </div>
            <div>
              <v-btn variant="outlined" color="primary" class="no-uppercase">
                Edit Details
              </v-btn>
            </div>
          </div>

          <div
            class="card mt-10 bg-job-table-head"
            style="margin-left: 120px; padding-left: 20px; border-radius: 12px"
          >
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <ElementDescription title="User ID" subTitle="T-001 " />
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <ElementDescription title="Name" subTitle="John Doe" />
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <ElementDescription title="Role" subTitle="Candidate" />
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="6" md="4">
                <ElementDescription title="Phone" subTitle="+96 234 689 0121" />
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <ElementDescription
                  title="Email"
                  subTitle="johndoe123@gmail.com"
                />
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <ElementDescription title="Password" subTitle="********" />
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="6" md="4">
                <ElementDescription title="Status" subTitle="Active" />
              </v-col>
            </v-row>
          </div>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import ElementDescription from '@/components/jobs/ElementDescription.vue';
import profileImage from '@/assets/images/dummy-profile-image.svg';
import { AppRoutes } from '@/interfaces';

const router = useRouter();

const viewDetailsPage = () => {
  router.push(AppRoutes.User.WORKSPACE);
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/scss/typography';
@import '@/assets/styles/scss/button';
@import '@/assets/styles/scss/variables';
@import '@/assets/styles/scss/cards';

.card {
  @extend .base-card;
  border: 0px !important;
}
.text-data {
  @extend .base-body-text-2;
  font-weight: 550;
  font-size: 12px;
}

.display-field {
  border-radius: 12px;
  background-color: white;
}

.no-uppercase {
  text-transform: none;
  font-weight: bold;
}
</style>
