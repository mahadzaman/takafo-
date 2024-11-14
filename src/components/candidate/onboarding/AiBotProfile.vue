<template>
  <v-container class="app">
    <v-main>
      <v-container class="main-container">
        <v-row class="align-center justify-space">
          <v-col cols="12" md="6">
            <img :src="avatarUrl" alt="Avatar" />
            <h1 class="base-heading-1">
              Let’s continue creating profile as a Candidate
            </h1>
            <p class="base-body-text-1">
              or Skip all steps and start creating profile using our A.I Bot.
              It’s Quick & Easy.
            </p>
            <v-btn class="base-ai-bot-button mt-8">
              <img :src="chatImage" alt="Chatbot Image" class="chat-image" />
              <span class="base-body-text-1"
                >Use A.I Bot to Complete Profile</span
              >
            </v-btn>
          </v-col>
          <Sidebar />
        </v-row>
        <v-row class="button-group align-center">
          <v-col cols="6" md="3">
            <v-btn class="base-button" @click="onGoBackClick"> Go Back </v-btn>
          </v-col>
          <v-col cols="6" md="3">
            <v-btn class="base-button" @click="onButtonClick"> Next </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-container>
</template>

<script setup lang="ts">
import Sidebar from '@/components/Sidebar.vue';
import avatarUrl from '@/assets/avatar.svg';
import chatImage from '@/assets/ChatBotButton.svg';

const emit = defineEmits(['buttonClick', 'BackbuttonClick']);

const onButtonClick = () => {
  emit('buttonClick');
};

const onGoBackClick = () => {
  emit('BackbuttonClick');
};
</script>

<style lang="scss" scoped>
.app {
  width: 100%;
  background-color: lightColor(background);
  padding: 0 !important;

  .main-container {
    background-color: lightColor(background);
    width: 100%;
  }
}

@media (max-width: 600px) {
  .button-group {
    flex-direction: column;
  }
}
</style>
