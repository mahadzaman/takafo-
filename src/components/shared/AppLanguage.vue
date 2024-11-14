<template>
  <v-select
    v-model="selectedLanguage"
    :items="languages"
    class="mt-2"
    item-title="value"
    variant="plain"
    width="90"
  >
    <template v-slot:selection="{ item }">
      <div class="d-flex align-center ga-2">
        <v-img :src="getFlag(item.value)" contain width="25"></v-img>
        <p>{{ item.value }}</p>
      </div>
    </template>
    <template v-slot:item="{ props, item }">
      <div class="d-flex mt-2 justify-space-around align-center" v-bind="props">
        <v-img class="ml-3"
contain
:src="Flag"
width="20"></v-img>
        <p class="ml-5">
          {{ item.value }}
        </p>
      </div>
    </template>
  </v-select>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Flag from '@/assets/us_flag.png';

const selectedLanguage = ref('US');

const languages = [
  { value: 'US', flag: Flag },
  { value: 'ES', flag: Flag },
  { value: 'AR', flag: Flag },
];

const getFlag = (languageValue: string) => {
  const language = languages.find(lang => lang.value === languageValue);

  return language ? language.flag : '';
};
</script>
