<template>
  <div class="app d-flex flex-column">
    <v-container>
      <v-container
        class="main-container base-form d-flex flex-column justify-space-between pa-5"
      >
        <v-row class="align-center justify-space-between">
          <v-col class="text-section" cols="12" md="6">
            <div class="d-flex align-center justify-center flex-column">
              <StepSegment :currentStep="3" />
              <div class="step-content">
                <h3 class="base-heading-1" style="margin-bottom: 10px">
                  Upload your CV/Resume.
                </h3>
                <div class="pic-container d-flex flex-column align-center pa-5">
                  <div
                    class="file-upload-container"
                    @dragover.prevent
                    @dragenter.prevent
                    @drop.prevent="onFileDrop"
                  >
                    <input type="file" @change="onFileSelected" />

                    <div class="upload-prompt">
                      <p class="base-body-text-1">
                        Drop your file here, or <span>Browse</span>.
                      </p>
                      <p class="base-body-text-1 text-disabled">
                        .pdf, .docx files are supported (Max. file size is 5.0
                        mb)
                      </p>
                    </div>
                  </div>
                  <div
                    v-if="selectedFile"
                    class="d-flex flex-row align-center justify-space-between"
                    style="margin-top: 40px; width: 100%"
                  >
                    <div class="d-flex flex-row" style="width: 100%">
                      <img :src="filesvg" alt="Selected Image" width="50px" />
                      <div class="d-flex align-start flex-column">
                        <h4 class="base-heading">
                          {{ truncatedFileName }}
                        </h4>
                        <p class="base-body-text-1 text-disabled">
                          {{ (selectedFile.size / 1024 / 1024).toFixed(2) }}mb
                        </p>
                      </div>
                    </div>

                    <v-progress-linear
                      v-if="uploadProgress > 0"
                      :value="uploadProgress"
                      color="primary"
                      height="4"
                      style="margin-right: 40px"
                    ></v-progress-linear>

                    <v-btn icon @click="clearFile">
                      <v-icon style="color: red"> mdi-delete </v-icon>
                    </v-btn>
                  </div>
                </div>
                <v-row
                  class="mt-7 buttons-row"
                  justify="space-between"
                  no-gutters
                >
                  <v-col class="button-col" cols="3">
                    <v-btn class="base-button" @click="onGoBackClick">
                      Go Back
                    </v-btn>
                  </v-col>
                  <v-col class="button-col" cols="3">
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
    </v-container>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import Sidebar from '@/components/Sidebar.vue';
import StepSegment from './StepSegment.vue';
import filesvg from '@/assets/cv.svg';

interface FileObject {
  name: string;
  size: number;
  type: string;
}
const selectedFile = ref<FileObject | null>(null);

const fileUrl = ref<string>('');

const uploadProgress = ref<number>(50); // This should be dynamic based on actual upload progress

const emit = defineEmits(['buttonClick', 'BackbuttonClick']);

const onButtonClick = () => {
  if (selectedFile.value) {
    emit('buttonClick');
  } else {
    alert('Please upload your resume/CV.');
  }
};

const onGoBackClick = () => {
  emit('BackbuttonClick');
};

const isValidFileType = (file: FileObject): boolean => {
  const validTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/docx',
  ];

  return validTypes.includes(file.type);
};

const onFileSelected = (event: Event): void => {
  const target = event.target as HTMLInputElement;

  const file = (target.files as FileList)[0];

  if (file) {
    if (file.size <= 5 * 1024 * 1024 && isValidFileType(file as FileObject)) {
      selectedFile.value = {
        name: file.name,
        size: file.size,
        type: file.type,
      };
    } else {
      alert('Invalid file. Only .pdf, .docx files under 5 MB are supported.');
      clearFile();
    }
  }
};

const onFileDrop = (event: DragEvent): void => {
  if (!event?.dataTransfer || event?.dataTransfer?.files?.length <= 0) return;
  const file = event.dataTransfer.files[0];

  if (file) {
    if (file.size <= 5 * 1024 * 1024 && isValidFileType(file as FileObject)) {
      selectedFile.value = {
        name: file.name,
        size: file.size,
        type: file.type,
      };
    } else {
      alert('Invalid file. Only .pdf, .docx files under 5 MB are supported.');
      clearFile();
    }
  }
};

const clearFile = (): void => {
  selectedFile.value = null;
  fileUrl.value = '';
  uploadProgress.value = 0;
};

const truncatedFileName = computed<string>(() => {
  const file = selectedFile.value;

  if (file && file.name.length > 20) {
    return file.name.slice(0, 10) + '...' + file.name.slice(-10);
  }

  return file ? file.name : '';
});
</script>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/assets/styles/scss/variables';

.app {
  background-color: lightColor(background);
}

.main-container {
  background-color: lightColor(background);

  height: 100%; /* Ensures the container takes the full height available */

  .text-section {
    .step-indicator {
      width: 100%;
      max-width: 600px;
      height: 4px;
      margin-bottom: 16px;

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
      text-align: left;
      width: 100%;
      max-width: 600px;
    }

    .pic-container {
      width: 100%;
      background-color: lightColor(white);
      border-radius: 20px;
      border: color.adjust(lightColor(border-color), $alpha: -0.8) 0.5px solid;

      .file-upload-container {
        width: 100%;
        padding: 20px;
        border: 2px dashed lightColor(primary);
        background-color: lightColor(white);
        border-radius: 20px;
        position: relative;
        cursor: pointer;

        &:hover {
          background-color: lightColor(background);
        }

        input[type='file'] {
          width: 100%;
          height: 100%;
          opacity: 0;
          cursor: pointer;
          position: absolute;
          top: 0;
          left: 0;
        }
      }
    }
  }
}

@media (max-width: 576px) {
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
</style>
