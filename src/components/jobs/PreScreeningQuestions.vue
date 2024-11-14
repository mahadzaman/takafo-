<template>
  <!-- Header -->
  <div
    v-if="props.role === 'recruiter'"
    class="card-tile justify-space-between align-center mar-b-24"
  >
    <h6 class="card-tile-title">Pre-Screening Questions</h6>

    <div class="d-flex align-center flex-wrap">
      <v-checkbox
        v-model="isPrescreeningQuestions"
        :value="true"
        label="Yes"
        class="base-checkbox"
        hide-details
      />

      <v-checkbox
        v-model="isPrescreeningQuestions"
        :value="false"
        label="No"
        class="base-checkbox"
        hide-details
      />
    </div>
  </div>

  <template v-if="isPrescreeningQuestions || props.role === 'hiring_manager'">
    <!-- Questions -->
    <div class="mar-b-20">
      <v-row>
        <v-col cols="12" sm="6">
          <label class="field-label">Questions Preset</label>
          <v-select
            class="multi-select"
            :disabled="props.role === 'hiring_manager'"
            :class="
              props.role === 'hiring_manager' ? 'disabled-input-readonly' : ''
            "
            v-model="presetQuestion"
            @update:modelValue="presetQuestionChanged"
            :items="listPresetQuestionsMultiSelect"
            placeholder="Select Preset Questions"
            multiple
            :loading="presetQuestionsLoading"
            variant="solo"
            menu-icon="mdi-chevron-down"
          />
        </v-col>
      </v-row>
    </div>

    <div
      class="card-tile mar-b-32"
      direction="column"
      v-for="(item, index) in prescreeningQuestions"
      :key="index"
    >
      <div class="d-flex align-center flex-wrap mar-b-28">
        <div class="d-flex align-center flex-wrap">
          <v-checkbox
            v-if="
              props.role === 'recruiter' ||
              (props.role === 'hiring_manager' && item.inputType === 'internal')
            "
            :readonly="props.role === 'hiring_manager'"
            :class="
              props.role === 'hiring_manager' ? 'disabled-input-readonly' : ''
            "
            v-model="item.inputType"
            :value="'internal'"
            label="Internal Candidate"
            hide-details
            class="base-checkbox"
            checked
          />
          <button
            v-if="props.role === 'recruiter' && $vuetify.display.smAndDown"
            @click="deleteQuestions(index)"
            class="font-size-12 font-weight-500 color-danger d-flex align-center gap-x-6 mar-b-10 ml-auto"
          >
            <i class="icon-trash font-size-20"></i>
          </button>
          <v-checkbox
            v-if="
              props.role === 'recruiter' ||
              (props.role === 'hiring_manager' && item.inputType === 'external')
            "
            :readonly="props.role === 'hiring_manager'"
            :class="
              props.role === 'hiring_manager' ? 'disabled-input-readonly' : ''
            "
            v-model="item.inputType"
            :value="'external'"
            label="External Candidate"
            hide-details
            class="base-checkbox"
          />

          <v-checkbox
            v-if="
              props.role === 'recruiter' ||
              (props.role === 'hiring_manager' && item.selectionType === 'both')
            "
            :readonly="props.role === 'hiring_manager'"
            :class="
              props.role === 'hiring_manager' ? 'disabled-input-readonly' : ''
            "
            v-model="item.inputType"
            :value="'both'"
            label="Both"
            hide-details
            class="base-checkbox"
          />
        </div>

        <button
          v-if="props.role === 'recruiter' && $vuetify.display.mdAndUp"
          @click="deleteQuestions(index)"
          class="mar-l-auto font-size-12 font-weight-500 color-danger d-flex align-center gap-x-6"
        >
          <i class="icon-trash font-size-20"></i>
          <span>Delete Question</span>
        </button>
      </div>

      <div class="d-flex align-center flex-wrap mar-b-14">
        <label class="field-label mar-b-0">Question {{ index + 1 }}</label>

        <div class="d-flex align-center flex-wrap mar-r-2">
          <v-checkbox
            v-if="
              props.role === 'recruiter' ||
              (props.role === 'hiring_manager' &&
                item.requiredType === 'optional')
            "
            :readonly="props.role === 'hiring_manager'"
            :class="
              props.role === 'hiring_manager' ? 'disabled-input-readonly' : ''
            "
            v-model="item.requiredType"
            :value="'optional'"
            label="Optional"
            hide-details
            class="base-checkbox"
          />

          <v-checkbox
            v-if="
              props.role === 'recruiter' ||
              (props.role === 'hiring_manager' &&
                item.requiredType === 'mandatory')
            "
            :readonly="props.role === 'hiring_manager'"
            :class="
              props.role === 'hiring_manager' ? 'disabled-input-readonly' : ''
            "
            v-model="item.requiredType"
            :value="'mandatory'"
            label="Mandatory"
            hide-details
            class="base-checkbox"
          />
        </div>
      </div>

      <v-text-field
        :readonly="props.role === 'hiring_manager'"
        v-model="item.question"
        class="base-input"
        type="text"
        hide-details
        placeholder="Type"
        variant="outlined"
      />

      <div class="d-flex align-center flex-wrap mar-t-18">
        <v-checkbox
          v-if="
            props.role === 'recruiter' ||
            (props.role === 'hiring_manager' && item.selectionType === 'radio')
          "
          v-model="item.selectionType"
          :readonly="props.role === 'hiring_manager'"
          :value="'radio'"
          label="Radio Buttons"
          hide-details
          class="base-checkbox"
        />

        <v-checkbox
          v-if="
            props.role === 'recruiter' ||
            (props.role === 'hiring_manager' && item.selectionType === 'text')
          "
          v-model="item.selectionType"
          :readonly="props.role === 'hiring_manager'"
          :value="'text'"
          label="Text Fields"
          hide-details
          class="base-checkbox"
        />
      </div>

      <div class="mar-t-18" v-if="item.selectionType == 'radio'">
        <v-row>
          <v-col cols="6">
            <v-text-field
              :readonly="props.role === 'hiring_manager'"
              v-model="item.yes"
              class="base-input"
              type="text"
              hide-details
              placeholder="Yes"
              variant="outlined"
            />
          </v-col>

          <v-col cols="6">
            <v-text-field
              :readonly="props.role === 'hiring_manager'"
              v-model="item.no"
              class="base-input"
              type="text"
              hide-details
              placeholder="No"
              variant="outlined"
            />
          </v-col>
        </v-row>
      </div>
    </div>

    <div
      v-if="props.role === 'recruiter'"
      class="add-interview-button-container"
    >
      <button class="add-interview" @click="addModel">
        <i class="icon-plus-bordered"></i>
        <span>Add More</span>
      </button>
    </div>
  </template>
</template>

<script lang="ts" setup>
import { ref, withDefaults, watch } from 'vue';
import { useRoute } from 'vue-router';
import { notify } from '@kyvg/vue3-notification';
import PrescreenQuestionsService from '@/services/ScreeningQuestionsService';
import type {
  CreatePrescreenQuestionDto,
  UpdatePrescreenQuestionDto,
} from '@/api-docs';

const apiPreScreen = new PrescreenQuestionsService();

const route = useRoute();

interface Props {
  role: string;
}
const props = withDefaults(defineProps<Props>(), {
  role: 'recruiter',
});

const presetQuestion = ref([]) as any;

const listPresetQuestions = ref([]);

const listPresetQuestionsMultiSelect = ref<string[]>([]);

const isPrescreeningQuestions = ref(false);

const prescreeningQuestions = ref([]) as any;

const isUpdateApiToCall = ref(false);

const dataChanged = ref(false);

const presetQuestionsLoading = ref(false);
const presetTemp = ref([]) as any;
watch(presetQuestion, newValue => {
  presetTemp.value = newValue;
});

watch(
  () => props.role,
  () => {
    presetQuestion.value = [];
    prescreeningQuestions.value = [];
    getAllQuestions();
  }
);

async function getAllQuestions() {
  try {
    const res = (await apiPreScreen.getQuestions(`${route.params.id}`)) as any;

    const alreadyPreset = [
      ...new Set(
        res.data
          .filter(
            (q: any) =>
              q.question_tag && q.question_tag.toLowerCase() !== 'custom'
          )
          .map((q: any) => q.question_tag)
      ),
    ];

    presetQuestion.value = [...alreadyPreset];
    const mappedArray = res.data.map((item: any) => ({
      id: item.id,
      selectionType: item.question_type.toLowerCase(),
      question: item.question,
      requiredType: item.is_mandatory ? 'mandatory' : 'optional',
      inputType: item.target_candidate.toLowerCase(),
      textFields: item.options.length > 0,
      yes: 'Yes',
      no: 'No',
      isDeleted: item.is_deleted,
      is_preset: item.is_preset,
    }));

    prescreeningQuestions.value = mappedArray;
    isUpdateApiToCall.value = true;

    if (prescreeningQuestions.value.length > 0) {
      isPrescreeningQuestions.value = true;
      dataChanged.value = true;
    }
  } catch (error) {
    console.log('Error Fetching Screening Questions ', error);
  }
}

getAllQuestions();

(async function getAllPresetQuestions() {
  try {
    const res = await apiPreScreen.getPresetQuestions();

    const mappedQuestions = res.data.map((item: any) => ({
      ...item,
      requiredType: item.is_mandatory ? 'mandatory' : 'optional',
      inputType: item.target_candidate.toLowerCase(),
    }));

    listPresetQuestions.value = mappedQuestions;
    listPresetQuestionsMultiSelect.value = [
      ...new Set(listPresetQuestions.value.map((q: any) => q.question_tag)),
    ];
  } catch (error) {
    console.log('Error Getting Preset Questions ', error);
  }
})();

const presetQuestionChanged = () => {
  presetQuestionsLoading.value = true;
  setTimeout(() => {
    const filteredQuestions = listPresetQuestions.value.filter(
      (question: any) => presetTemp.value.includes(question.question_tag)
    );

    const filteredData = prescreeningQuestions.value.filter(
      (item: any) => item.is_preset !== true
    );

    prescreeningQuestions.value = [...filteredData, ...filteredQuestions];
    presetQuestionsLoading.value = false;
  }, 100);
};

const addModel = () => {
  prescreeningQuestions?.value.push({
    selectionType: '',
    question: '',
    requiredType: '',
    inputType: '',
    textFields: false,
    yes: '',
    no: '',
    is_preset: false,
  });
};

const resetFormToDefault = async (role: string) => {
  if (role !== 'recruiter') {
    return;
  }
  presetQuestion.value = [];
  prescreeningQuestions.value = [];
  await getAllQuestions();
};

const saveChangesofQuestions = async (role: string) => {
  if (role !== 'recruiter') {
    return;
  }
  if (!isPrescreeningQuestions.value && dataChanged.value) {
    const payload: any = {
      question_id: [],
      custom_questions: [],
      status: 'pending',
    };
    try {
      await apiPreScreen.updateQuestions(
        route.params.id.toString(),
        payload as UpdatePrescreenQuestionDto
      );
      prescreeningQuestions.value = [];
      presetQuestion.value = [];
    } catch (error) {
      notify({
        title: 'Error Updating Prescreening Question',
        text: 'Prescreening Questions',
        type: 'error',
      });
    }
    return;
  }

  if (!dataChanged.value && prescreeningQuestions.value.length < 1) {
    notify({
      title: 'Please add some questions',
      text: 'Prescreening Questions',
      type: 'warning',
    });
    return;
  }
  const preSetData = prescreeningQuestions.value.filter(
    (item: any) => !item.is_preset
  );

  const nonPresetIds = prescreeningQuestions.value
    .filter((item: any) => item.is_preset)
    .map((item: any) => item.id);

  const customQuestions = preSetData.map(
    (obj: {
      question: any;
      selectionType: string;
      yes: any;
      no: any;
      inputType: string;
      requiredType: string;
    }) => ({
      question: obj.question,
      question_type: obj.selectionType
        ? obj.selectionType.charAt(0).toUpperCase() + obj.selectionType.slice(1)
        : '',
      options: [obj.yes, obj.no],
      question_tag: 'Custom',
      target_candidate: obj.inputType
        ? obj.inputType.charAt(0).toUpperCase() + obj.inputType.slice(1)
        : '',
      is_preset: false,
      is_mandatory: obj.requiredType === 'mandatory',
    })
  );

  const payload: any = {
    question_id: nonPresetIds,
    custom_questions: customQuestions,
    job_id: route.params.id.toString(),
    status:
      nonPresetIds.length > 0 || customQuestions.length > 0
        ? 'completed'
        : 'pending',
  };
  if (isUpdateApiToCall.value) {
    try {
      delete payload.job_id;

      await apiPreScreen.updateQuestions(
        route.params.id.toString(),
        payload as UpdatePrescreenQuestionDto
      );
      notify({
        title: 'Prescreening Question Updated Successfully',
        text: 'Prescreening Questions',
        type: 'success',
      });
    } catch (error) {
      notify({
        title: 'Error Updating Prescreening Question',
        text: 'Prescreening Questions',
        type: 'error',
      });
      console.log('Error Creating Screening Question', error);
    }
  } else {
    try {
      await apiPreScreen.createQuestions(payload as CreatePrescreenQuestionDto);
      notify({
        title: 'Prescreening Question Created Successfully',
        text: 'Prescreening Questions',
        type: 'success',
      });
    } catch (error) {
      notify({
        title: 'Error Creating Prescreening Question',
        text: 'Prescreening Questions',
        type: 'error',
      });
      console.log('Error Creating Screening Question', error);
    }
  }
};

const deleteQuestions = async (index: number) => {
  prescreeningQuestions.value.splice(index, 1);
};

defineExpose({
  saveChangesofQuestions,
  resetFormToDefault,
});
</script>

<style scoped lang="scss">
@use 'sass:color';
@import '@/assets/styles/scss/cards';
@import '@/assets/styles/scss/mixins';
@import '@/assets/styles/scss/functions';

.card-tile.mar-b-24 {
  margin-bottom: pxToRem(24);
}

.header-card {
  min-height: 60px;
  max-height: 140px;
  opacity: 0px;
  padding: 0px 12px 0px 12px;

  border-radius: 15px;
}

.card-color {
  background: #f4f9fb;
}

.content-card {
  max-height: 500px;
  border-radius: 15px;
  padding: 12px 24px;
}

.feild {
  ::v-deep(.v-input__control) {
    .v-field {
      box-shadow: none;
      border: 1px solid color.adjust(lightColor(border-color), $alpha: -0.78);
      border-radius: $fields-border-radius;
      height: 48px;

      .v-field__field {
        height: 48px;
      }
    }

    .v-field__input {
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      min-height: 48px;
    }

    .icon-search {
      font-size: 1.5rem;
    }
  }
}

.text-black {
  color: #010c14;
  font-family: Poppins;
  font-size: 12px;
  // font-weight: 500;
  line-height: 20px;
  text-align: left;
}
.btn-grp {
  height: 44px;
  width: 82px;
  padding: 8px 12px 8px 12px;
}

.card-tile-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0;
}

.add-interview-button-container {
  margin-top: 1rem;

  .add-interview {
    color: lightColor(primary);
    font-size: pxToRem(12);
    display: flex;
    align-items: center;
    font-weight: 500;
    gap: pxToRem(8);

    .icon-plus-bordered {
      font-size: pxToRem(20);
    }
  }
}
</style>

