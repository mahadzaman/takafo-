<template>
  <!-- Search and Button Group -->
  <div>
    <v-menu
      v-model="showCard"
      :close-on-content-click="false"
      location="bottom"
    >
      <template v-slot:activator="{ props }">
        <v-btn
          icon
          class="filter-btn base-button small-button greyed-out secondary-button font-size-26"
          :class="{ 'filter-btn-selected': showCard }"
          v-bind="props"
        >
          <i class="icon-settings"></i>
        </v-btn>
      </template>
      <div class="base-card filter-card">
        <div
          class="d-flex align-center justify-space-between flex-wrap pad-x-6 pad-y-6"
        >
          <h1 class="base-title">
            <v-icon
              size="small"
              v-if="filterHistory"
              @click="filterHistory = false"
              class="cursor-pointer"
            >
              mdi-arrow-left
            </v-icon>
            {{ filterHistory ? 'History' : 'Filters' }}
          </h1>
          <div class="d-flex align-center ga-2" v-if="!filterHistory">
            <div
              class="d-flex align-center cursor-pointer"
              @click="filterHistory = true"
            >
              <img
                alt="icon"
                class="icon-svg mar-x-4"
                src="/src/assets/icons/document-filter.svg"
              />
              <p class="base-disabled-text mb-0">Filter History</p>
            </div>
            <div class="d-flex align-center">
              <img
                alt="icon"
                class="icon-svg mar-x-4"
                src="/src/assets/icons/tick-double.svg"
              />
              <p class="base-body-text-1 mb-0 text-[#000010]">Save Filters</p>
            </div>
          </div>
          <div v-else>
            <img
              alt="icon"
              width="90px"
              class="icon-svg mar-x-4 cursor-pointer"
              src="/src/assets/images/load-more.svg"
            />
          </div>
        </div>
        <v-divider class="divider"></v-divider>
        <div class="mar-t-16 base-form" v-if="!filterHistory">
          <!-- Top fields -->
          <div class="card-responsive custom-scrollbar">
            <div class="d-flex align-center form-field v-field flex-wrap">
              <div class="select-width">
                <v-select
                  placeholder="Job Title"
                  hide-details
                  variant="solo"
                  class="form-field-input"
                ></v-select>
              </div>
              <h2 class="font-weight-medium base-body-text-1 mx-4">
                That Contains
              </h2>
              <v-text-field
                class="search-bar-container  mar-t-2"
                type="text"
                hide-details
                placeholder="Type"
                variant="solo"
              ></v-text-field>
            </div>
            <div
              class="d-flex align-center mar-y-18 ga-1 flex-wrap"
              v-for="(item, index) in jobFilter"
              :key="index"
            >
              <div class="d-flex align-center ga-2 select-width">
                <v-select
                  v-model="item.operator"
                  placeholder="And"
                  hide-details
                  :items="Operators"
                  variant="solo"
                  class="form-field-input"
                ></v-select>
                <v-select
                  v-model="item.platform"
                  placeholder="Platform"
                  hide-details
                  variant="solo"
                  class="form-field-input"
                ></v-select>
              </div>
              <h2 class="font-weight-medium base-body-text-1 mx-2">
                That Contains
              </h2>
              <v-select
                v-model="item.selectOption"
                placeholder="Select"
                hide-details
                variant="solo"
                class="form-field-input mar-t-sm-2"
                append-icon="mdi-close"
                @click:append="removeFilters(index)"
              ></v-select>
            </div>
          </div>
          <v-divider class="divider mar-t-14"></v-divider>
          <div class="d-flex align-center justify-space-between mt-2">
            <v-btn solo class="secondary-button btn-grp" @click="addFilters">
              Add More
            </v-btn>
            <v-btn solo class="primary-button btn-grp"> Apply </v-btn>
          </div>
        </div>
        <div v-else class="mar-t-12 custom-scrollbar">
          <div class="mar-b-10">
            <p class="base-disabled-text mb-0">12-10-2024</p>
          </div>
          <div
            class="d-flex align-center mar-t-6 ga-2 flex-wrap"
            v-for="i in [1, 1, 1, 1]"
            :key="i"
          >
            <div class="d-flex align-center card flex-wrap">
              <div class="base-card card-filter">JR No.</div>
              <div class="base-card card-filter">1210204</div>
              <div class="base-card card-filter">AND</div>
              <div class="base-card card-filter">Job Type</div>
              <div class="base-card card-filter">Internship</div>
              <div class="base-card card-filter">OR</div>
              <div class="base-card card-filter">Status</div>
            </div>
            <p class="base-body-text-1 text-primary" style="width: 7rem">
              Use Filters
            </p>
          </div>
          ``
        </div>
      </div>
    </v-menu>

    <v-btn
      v-if="props.showButton"
      @click="handleButtonClick"
      class="primary-button mb-0"
    >
      {{ props.btn_title }}
    </v-btn>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits, computed } from 'vue';
import { useRouter } from 'vue-router';
import {
  JobOperators,
  type JobFilters,
} from '@/stores/modules/job/job.interface';

const router = useRouter();

const props = defineProps<{
  heading?: string;
  showButton?: boolean;
  showFilter?: boolean;
  path?: string;
  name?: string;
  btn_title?: string;
}>();

const showCard = ref<boolean>(false);

const filterHistory = ref<boolean>(false);

const emit = defineEmits(['modalVisible']);

const jobFilter = ref<JobFilters[]>([
  { operator: JobOperators.AND, platform: null, selectOption: null },
  { operator: JobOperators.AND, platform: null, selectOption: null },
]);

const Operators = computed(() => Object.values(JobOperators));

function handleButtonClick() {
  if (props.path) {
    router.push(props.path);
  } else {
    emit('modalVisible', true);
  }
}

const addFilters = () => {
  jobFilter.value.push({
    operator: JobOperators.AND,
    platform: null,
    selectOption: null,
  });
};

const removeFilters = (index: number) => {
  jobFilter.value.splice(index, 1);
};
</script>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/assets/styles/scss/variables';
@import '@/assets/styles/scss/typography';
@import '@/assets/styles/scss/mixins';
@import '@/assets/styles/scss/cards';
@import '@/assets/styles/scss/forms';

.filter-btn {
  width: 44px;
  height: 43px;
  gap: 0px;
  border-radius: 12px;
  opacity: 0px;

  &-selected {
    border: 2px solid lightColor(primary);
  }
}

.base-btn {
  width: 100%;
}

.filter-card {
  max-width: 630px;
  max-height: 500px;
  margin-top: 9px;
  background: #f9fdff;

  padding: $gutter * 2;
  @include desktop {
    width: 640px;
  }
}

.divider {
  margin-left: -20px;
  margin-right: -20px;
}

.btn-grp {
  height: 44px;
  width: 82px;
  padding: 8px 12px 8px 12px;
}

.select-width {
  width: 15rem;
}
.card {
  gap: 0.3rem;
  background: #f4f9fb;
  width: 79%;
  border: 1px solid #858d981f;
  padding: 2px;
  border-radius: 11px;
  &-filter {
    height: 41px;
    padding: 10px 4px 6px 8px;
    border-radius: 11px;
  }
  &-small {
    width: 70px;
  }

  &-large {
    width: 86px;
  }
}

.card-responsive {
  // overflow-x: auto;
  // width: 610px;
  height: 190px;
  max-height: 195px;
  overflow-y: auto;
  overflow-x: auto;
  max-width: 590px;
}

.filter-history {
  max-height: 500px;
  overflow-y: auto;
}
</style>
