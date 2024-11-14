<template>
  <div class="app">
    <v-main>
      <v-container class="main-container base-form">
        <v-row class="align-center justify-space-between">
          <v-col cols="12" md="6" class="text-section">
            <div class="step-container">
              <StepSegment :currentStep="4" />
              <div class="step-content">
                <h3 class="base-heading-1" style="margin-bottom: 10px">
                  Add your Personal Social Links.
                </h3>

                <v-text-field
                  v-model.trim="twitter"
                  class="form-field-input"
                  type="text"
                  placeholder="Twitter Link"
                  variant="solo"
                  :rules="twitterRule"
                >
                  <template #prepend-inner>
                    <v-icon size="20" class="mx-sm-3">
                      <img
                        src="@/assets/socialicon/twitter.svg"
                        alt="Linkedin Icon"
                      />
                    </v-icon>
                  </template>
                </v-text-field>

                <v-text-field
                  v-model.trim="facebook"
                  class="form-field-input"
                  type="text"
                  placeholder="Facebook Link"
                  variant="solo"
                  :rules="facebookRule"
                >
                  <template #prepend-inner>
                    <v-icon size="20" class="mx-sm-3">
                      <img
                        src="@/assets/socialicon/facebook.svg"
                        alt="Linkedin Icon"
                      />
                    </v-icon>
                  </template>
                </v-text-field>

                <v-text-field
                  v-model.trim="instagram"
                  class="form-field-input"
                  type="text"
                  placeholder="Instagram Link"
                  variant="solo"
                  :rules="instagramRule"
                >
                  <template #prepend-inner>
                    <v-icon size="20" class="mx-sm-3">
                      <img
                        src="@/assets/socialicon/instagram.svg"
                        alt="Instagram Icon"
                      />
                    </v-icon>
                  </template>
                </v-text-field>

                <v-text-field
                  v-model.trim="linkedin"
                  class="form-field-input"
                  type="text"
                  placeholder="Linkedin Link"
                  variant="solo"
                  :rules="linkedinRule"
                >
                  <template #prepend-inner>
                    <v-icon size="20" class="mx-sm-3">
                      <img
                        src="@/assets/socialicon/linkedin.svg"
                        alt="Linkedin Icon"
                      />
                    </v-icon>
                  </template>
                </v-text-field>

                <v-text-field
                  v-model.trim="whatsapp"
                  class="form-field-input"
                  type="text"
                  placeholder="Whatsapp"
                  variant="solo"
                >
                  <template #prepend-inner>
                    <v-icon size="20" class="mx-sm-3">
                      <img
                        src="@/assets/socialicon/whatsapp.svg"
                        alt="WhatsApp Icon"
                      />
                    </v-icon>
                  </template>
                </v-text-field>

                <v-row
                  class="buttons-row mt-7"
                  justify="space-between"
                  no-gutters
                >
                  <v-col cols="12" md="3" class="button-col">
                    <v-btn class="base-button" @click="onGoBackClick">
                      Go Back
                    </v-btn>
                  </v-col>

                  <v-col cols="12" md="3" class="button-col">
                    <v-btn class="base-button" @click="onButtonClick">
                      Next
                    </v-btn>
                  </v-col>
                </v-row>
              </div>
            </div>
          </v-col>
          <Sidebar />
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Sidebar from '@/components/Sidebar.vue';
import { formUtils } from '@/utils';
import StepSegment from './StepSegment.vue';

const facebook = ref('');

const twitter = ref('');

const linkedin = ref('');

const instagram = ref('');

const whatsapp = ref('');

const twitterRule = [formUtils.twitterFormatRule('Twitter Url is invalid')];

const instagramRule = [
  formUtils.instagramFormatRule('Instagram Url is invalid'),
];

const facebookRule = [formUtils.facebookFormatRule('Facebook Url is invalid')];

const linkedinRule = [formUtils.linkedinFormatRule('Linkedin Url is invalid')];

const emit = defineEmits(['buttonClick', 'BackbuttonClick']);

const onButtonClick = () => {
  emit('buttonClick');
};

const onGoBackClick = () => {
  emit('BackbuttonClick');
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/scss/variables';

.app {
  width: 100%;
  padding: 0 !important;
}

.main-container {
  padding: 20px;

  .text-section {
    .step-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      border-radius: 8px;
    }

    .step-indicator {
      display: flex;
      justify-content: space-between;
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
      width: 100%;
      max-width: 600px;
    }
  }

  .buttons-row {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .button-col {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;

    @media (max-width: 600px) {
      width: 100%;
    }
  }
}

@media (max-width: 600px) {
  .main-container {
    .text-section {
      margin-bottom: 20px;
    }

    .buttons-row {
      flex-direction: column;
      align-items: center;

      .button-col {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
