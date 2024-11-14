<template>
  <section>
    <v-data-table
      :headers="headers"
      :items="items"
      :loading="props.loading"
      class="elevation-0 custom-data-table card"
      disable-pagination
      hide-default-footer
    >
      <template v-slot:loading>
        <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
      </template>
      <template v-slot:[`item.status`]="{ item }">
        <div :class="statusClass(item.status)" class="text-capitalize status">
          {{ item.status }}
        </div>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <span
          class="cursor-pointer d-flex align-center ga-2"
        >
          <GenericCustomIcons
            v-if="
              item.actionsList?.calender &&
              !item.actionsList?.calender?.noAction?.includes(item.status)
            "
            icon-name="calendar-tick"
            :icon-path-count="9"
            class-name="text-primary"
            icon-size="large"
            @click="() => emit('calendar', item)"
          />
          <img
            v-if="
              item.actionsList?.candidate &&
              !item.actionsList?.candidate?.noAction?.includes(item.status)
            "
            src="/src/assets/icons/job/profile-user.svg"
            alt=""
          />
          <GenericCustomIcons
            v-if="
              item.actionsList?.view &&
              !item.actionsList?.view?.noAction?.includes(item.status)
            "
            icon-name="eye"
            :icon-path-count="2"
            class-name="text-primary"
            icon-size="large"
            @click="() => emit('view', item)"
          />
          <GenericCustomIcons
            v-if="
              item.actionsList?.userTick &&
              !item.actionsList?.userTick?.noAction?.includes(item.status)
            "
            icon-name="user-tick"
            :icon-path-count="1"
            class-name="text-primary"
            icon-size="large"
            @click="() => emit('users', item)"
          />
        </span>
      </template>
    </v-data-table>
  </section>
</template>

<script setup lang="ts">
import { useStatusClass } from '@/composables/statusClasses';
import GenericCustomIcons from './GenericCustomIcons.vue';
import type { DataTable } from '@/interfaces/datatable.interface';

const emit = defineEmits(['view', 'calendar', 'users']);

const { statusClass } = useStatusClass();

const props = defineProps({
  headers: {
    type: Array as () => DataTable.Header[], // Use a function type assertion
    required: true,
  },
  items: {
    type: Array as () => DataTable.Items[], // Use a function type assertion
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  }
});
</script>

<style scoped lang="scss">
@import '@/assets/styles/scss/variables';
@import '@/assets/styles/scss/variables.scss';

:deep(.v-pagination__item--is-active) {
  background-color: lightColor(primary);
  color: lightColor(white);
}

:deep(.v-pagination__next) {
  color: lightColor(primary);
}

:deep(.v-pagination__prev) {
  color: lightColor(primary);
}

:deep(.search-field) {
  .v-input__control {
    .v-field.v-field--appended.v-field--center-affix.v-field--prepended.v-field--no-label.v-field--variant-solo.v-theme--light.v-locale--is-ltr {
      border-radius: 15px !important;
    }
  }
}

:deep(.card) {
  .v-table__wrapper {
    thead {
      background-color: lightColor(light-bg);
    }
    tr {
      td {
        font-size: 12px !important;
        min-width: 50px;
      }
    }
  }
}

@media (max-width: 900px) {
  :deep(.card) {
    .v-table__wrapper {
      tr {
        th {
          min-width: 100px !important;
        }
      }
    }
  }
}
.status {
  width: 4.5rem;
  text-align: center;
}
</style>
