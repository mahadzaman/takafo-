<template>
  <!-- {{ formData[0].formFields[0].value }} -->
  <v-row>
    <template v-for="(item, index) in form" :key="`form${index}`">
      <v-col cols="12" lg="6" md="6">
        <div v-if="item.heading === 'External'" class="card-tile">
          <h6 class="card-tile-title">{{ item.heading }}</h6>
        </div>

        <div v-else class="card-tile" direction="column">
          <div class="d-flex align-center justify-space-between">
            <h6 class="card-tile-title">{{ item.heading }}</h6>

            <v-checkbox
              v-if="isRecruiter"
              v-model="item.sameAsExternal.value"
              class="base-checkbox"
              label="Same as External"
              hide-details
            ></v-checkbox>
          </div>
        </div>

        <div class="card-tile">
          <template v-for="(field, i) in item.formFields" :key="`field${i}`">
            <AppTextArea
              v-if="field.ele === 'TextArea'"
              :custom-class="[
                { 'opacity-6': item.sameAsExternal?.value && isRecruiter },
                { 'disabled-input-readonly': !isRecruiter },
                'mar-b-20',
              ]"
              :model-value="field.value"
              :title="`${field.label}`"
              :disabled="item.sameAsExternal?.value || !isRecruiter"
              :placeholder="isRecruiter ? 'Write...' : ''"
              @update:model-value="newValue => (field.value = newValue)"
            />

            <AppSelect
              v-else-if="field.ele === 'Select'"
              :custom-class="[
                { 'opacity-6': item.sameAsExternal?.value && isRecruiter },
                { 'disabled-input-readonly': !isRecruiter },
              ]"
              :model-value="field.value"
              :options="field.options ?? []"
              :disabled="item.sameAsExternal?.value || !isRecruiter"
              :title="field.label"
              @update:model-value="newValue => (field.value = newValue)"
            />

            <div v-else-if="field.ele === 'DateInput'" class="dates-container">
              <label for="" class="field-label">{{ field.label }}</label>

              <template v-if="item.heading === 'External'">
                <v-date-input
                  v-if="field.label === 'Start Date'"
                  v-model="field.value"
                  :min="new Date(new Date().setDate(new Date().getDate() - 1))"
                  class="relative base-date-input"
                  :class="[
                    { 'opacity-6': item.sameAsExternal?.value && isRecruiter },
                    { 'disabled-input-readonly': !isRecruiter },
                  ]"
                  variant="outlined"
                  prepend-icon=""
                  :disabled="item.sameAsExternal?.value || !isRecruiter"
                >
                  <template v-slot:default>
                    <i class="icon-calendar font-size-24"></i>
                  </template>
                </v-date-input>

                <v-date-input
                  v-if="field.label === 'End Date'"
                  v-model="field.value"
                  :min="externalMinEndDate"
                  class="relative base-date-input"
                  :class="[
                    { 'opacity-6': item.sameAsExternal?.value && isRecruiter },
                    { 'disabled-input-readonly': !isRecruiter },
                  ]"
                  variant="outlined"
                  prepend-icon=""
                  :disabled="item.sameAsExternal?.value || !isRecruiter"
                >
                  <template v-slot:default>
                    <i class="icon-calendar font-size-24"></i>
                  </template>
                </v-date-input>
              </template>

              <template v-else-if="item.heading === 'Internal'">
                <v-date-input
                  v-if="field.label === 'Start Date'"
                  v-model="field.value"
                  :min="new Date(new Date().setDate(new Date().getDate() - 1))"
                  class="relative base-date-input"
                  :class="[
                    { 'opacity-6': item.sameAsExternal?.value && isRecruiter },
                    { 'disabled-input-readonly': !isRecruiter },
                  ]"
                  variant="outlined"
                  prepend-icon=""
                  :disabled="item.sameAsExternal?.value || !isRecruiter"
                >
                  <template v-slot:default>
                    <i class="icon-calendar font-size-24"></i>
                  </template>
                </v-date-input>

                <v-date-input
                  v-if="field.label === 'End Date'"
                  v-model="field.value"
                  :min="internalMinEndDate"
                  class="relative base-date-input"
                  :class="[
                    { 'opacity-6': item.sameAsExternal?.value && isRecruiter },
                    { 'disabled-input-readonly': !isRecruiter },
                  ]"
                  variant="outlined"
                  prepend-icon=""
                  :disabled="item.sameAsExternal?.value || !isRecruiter"
                >
                  <template v-slot:default>
                    <i class="icon-calendar font-size-24"></i>
                  </template>
                </v-date-input>
              </template>
            </div>
          </template>
        </div>
      </v-col>
    </template>
  </v-row>
</template>

<script setup lang="ts">
import { ref, watchEffect, watch, computed } from 'vue';
import AppTextArea from '@/components/jobView/formElements/AppTextArea.vue';
import { useAuthStore } from '@/stores';
import AppSelect from '@/components/jobView/formElements/AppSelect.vue';

interface Props {
  formData: { [key: string]: any };
}

const props = defineProps<Props>();

const form = ref(props.formData);

const authstore = useAuthStore();

const role = ref<string>();

const isRecruiter = ref<boolean>(false);

const externalEndDate = form.value[0].formFields[8].value;
const externalMinEndDate = ref(new Date(externalEndDate.setDate(externalEndDate.getDate() + 1)));

const internalEndDate = form.value[1].formFields[7].value;
const internalMinEndDate = ref(new Date(internalEndDate.setDate(internalEndDate.getDate() + 1)));

watch(
  () => form.value,
  newForm => {
    const externalFields = newForm[0].formFields;
    const internalFields = newForm[1].formFields;

    if (newForm[1].sameAsExternal.value) {
      externalFields.forEach((externalItem: any) => {
        let externalLabel = externalItem.label;
        let externalValue = externalItem.value;

        internalFields.find((internalItem: any) => {
          if (externalLabel === internalItem.label) {
            internalItem.value = externalValue;
          }
        });
      });
    }

    // Check if start date >= end date
    const externalStartDate = externalFields[7].value;
    const externalEndDate = externalFields[8].value;

    if (externalStartDate && externalEndDate && externalStartDate.getDate() >= externalEndDate.getDate()) {
      const newMinEndDate = new Date(externalStartDate);
      newMinEndDate.setDate(externalStartDate.getDate() + 1);

      // Only update if externalMinEndDate has changed
      if (externalMinEndDate.value?.getTime() !== newMinEndDate.getTime()) {
        externalMinEndDate.value = newMinEndDate;
        form.value[0].formFields[8].value = newMinEndDate;
      }
    }

    const internalStartDate = internalFields[6].value;
    const internalEndDate = internalFields[7].value;

    if (internalStartDate && internalEndDate && internalStartDate.getDate() >= internalEndDate.getDate()) {
      const newMinEndDate = new Date(internalStartDate);
      newMinEndDate.setDate(internalStartDate.getDate() + 1);

      // Only update if internalMinEndDate has changed
      if (internalMinEndDate.value?.getTime() !== newMinEndDate.getTime()) {
        internalMinEndDate.value = newMinEndDate;
        form.value[1].formFields[7].value = newMinEndDate;
      }
    }

  },
  { deep: true }
);

watchEffect(() => {
  role.value = authstore.getActiveRole().value?.role_name;
  isRecruiter.value = role.value === 'recruiter';
});
</script>

<style scoped lang="scss">
@import '@/assets/styles/scss/cards';
@import '@/assets/styles/scss/responsive';

.card-tile {
  & > * {
    flex: 0 0 100%;
  }

  .dates-container {
    flex: 0 0 calc(50% - 8px);
    max-width: calc(50% - 8px);

    &:last-of-type {
      margin-left: auto;
    }

    @include tablet {
      flex: 0 0 100%;
      max-width: 100%;
    }
  }
}
</style>
