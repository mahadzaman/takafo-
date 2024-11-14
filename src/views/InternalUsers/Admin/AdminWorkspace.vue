<template>
  <div>
    <v-row>
      <v-col cols="12">
        <WorkspaceHeader
          :showFilter="true"
          :showButton="true"
          :btn_title="button_title"
          :heading="heading"
          @modalVisible="modalVisible"
        />
      </v-col>

      <v-col cols="12" md="12" sm="12">
        <UserManagementTable />
      </v-col>
      <v-col>
        <AppJobMessage
          v-if="jobModalVisible"
          :title="jobModalTitle"
          :fieldSubtitle1="jobModalFirstSubtitle"
          :fieldSubtitle2="jobModalSecondSubtitle"
          @close="closeJobModal"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import UserManagementTable from '@/components/shared/workspace/UserManagementTable.vue';
import WorkspaceHeader from '@/components/shared/workspace/WorkspaceHeader.vue';
import AppJobMessage from '@/components/shared/AppJobMessage.vue';
const button_title = 'Add User';

const heading = 'User Management';

const jobModalVisible = ref<boolean>(false);

const jobModalTitle = ref<string>('Add User');

const jobModalFirstSubtitle = ref<string>('Email');

const jobModalSecondSubtitle = ref<string>('User Role');

const closeJobModal = (): void => {
  jobModalVisible.value = false;
};

const modalVisible = (): void => {
  jobModalVisible.value = true;
};
</script>
