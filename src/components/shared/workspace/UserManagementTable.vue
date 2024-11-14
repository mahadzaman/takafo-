<template>
  <div class="base-card pa-0">
    <v-data-table
      :headers="headers"
      class="table"
      :items="paginatedusers"
      :hide-default-footer="true"
      no-data-text="No data available"
    >
      <!-- Column Templates -->
      <template v-slot:[`item.id`]="{ item }">
        {{ item.id }}
      </template>
      <template v-slot:[`item.name`]="{ item }">
        {{ item.name }}
      </template>
      <template v-slot:[`item.role`]="{ item }">
        {{ item.role }}
      </template>
      <template v-slot:[`item.phone`]="{ item }">
        {{ item.phone }}
      </template>
      <template v-slot:[`item.email`]="{ item }">
        {{ item.email }}
      </template>
      <template v-slot:[`item.password`]="{ item }">
        {{ maskPassword(item.password) }}
      </template>
      <template v-slot:[`item.status`]="{ item }">
        <button :class="['status-btn', getStatusClass(item.status)]">
          {{ item.status }}
        </button>
      </template>

      <!-- Actions Column -->
      <template v-slot:[`item.actions`]="{}">
        <div>
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" elevation="0">
                <img
                  class="icon-lg"
                  src="@/assets/icons/circular_menu.svg"
                  alt="View"
                />
              </v-btn>
            </template>

            <v-list>
              <v-list-item v-for="(item, index) in items" :key="index">
                <v-btn
                  @click="validateAndHandleAction(item.title)"
                  elevation="0"
                >
                  <template v-slot:prepend>
                    <v-icon
                      class="icon-sm menu-icon"
                      :icon="item.icon"
                    ></v-icon>
                  </template>
                  <v-list-item-title class="menu-title">
                    {{ item.title }}
                  </v-list-item-title>
                </v-btn>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </template>
    </v-data-table>

    <div class="d-flex mt-1 bg-white" style="border-radius: 10px">
      <v-pagination
        v-model="currentPage"
        :length="pageCount"
        :total-visible="5"
        @update:modelValue="onPageChange"
      ></v-pagination>
    </div>

    <AppDeleteUserMessage
      v-if="deleteUserVisible"
      :title="deleteSubtitle"
      @close="closeDeleteUserModal"
      style="backdrop-filter: blur(2px)"
    />

    <vuetify-dialog
      v-model="assignRoleDialog"
      :title="_title"
      :subtitle="_subtitle"
    >
      <template #popupContent>
        <v-select
          :items="roles"
          v-model="selectedRole"
          persistent-placeholder
          label="Select"
          variant="outlined"
        ></v-select>
      </template>

      <template #actions>
        <v-btn
          :class="selectedRole ? 'base-button' : 'base-disable-button'"
          class="popup-action-btn pad-y-18"
          @click="saveSelectedRole"
        >
          Assign Role
        </v-btn>
      </template>
    </vuetify-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, shallowRef, computed } from 'vue';
import { useRouter } from 'vue-router';
import AppDeleteUserMessage from '@/components/shared/AppDeleteUserMessage.vue';
import VuetifyDialog from '@/components/vuetify/VuetifyDialog.vue';

const roles = ref([
  'Talent Partner',
  'Recruiter',
  'Admin',
  'Candidate',
  'Super Admin',
]);

const assignRoleDialog = shallowRef(false);

const router = useRouter();

const deleteUserVisible = ref<boolean>(false);

const selectedRole = ref<string | null>(null);

const closeAssignRoleDialog = () => {
  assignRoleDialog.value = false;
};

const saveSelectedRole = () => {
  closeAssignRoleDialog();
};

const assignRoleDialogVisible = (): void => {
  assignRoleDialog.value = true;
};

const closeDeleteUserModal = (): void => {
  deleteUserVisible.value = false;
};

const deleteUserModalVisible = (): void => {
  deleteUserVisible.value = true;
};

const _title = 'Assign Role';

const _subtitle = 'User Role';

const deleteSubtitle = 'Are you sure you want to Delete user "ABC XYZ"?';

const actions = [
  'Edit User',
  'Assign Role',
  'View Details',
  'Delete User',
] as const;

type UserAction = (typeof actions)[number];

const validateAndHandleAction = (title: string): void => {
  if (actions.includes(title as UserAction)) {
    handleUserActions(title as UserAction);
  } else {
    console.error('Invalid action:', title);
  }
};

const handleUserActions = (title: UserAction): void => {
  if (!actions.includes(title)) return;

  switch (title) {
    case 'Edit User':
      console.log('Edit User');
      break;
    case 'Assign Role':
      assignRoleDialogVisible();
      break;
    case 'Delete User':
      deleteUserModalVisible();
      break;
    default:
      break;
  }
};

// Define TypeScript interface for referral data
interface User {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  password: string;
  status: string;
}

// Define the headers for the v-data-table
const headers = [
  { title: 'User ID', value: 'id' },
  { title: 'User Name', value: 'name' },
  { title: 'Role', value: 'role' },
  { title: 'Phone', value: 'phone' },
  { title: 'Email', value: 'email' },
  { title: 'Password', value: 'password' },
  { title: 'Status', value: 'status' },
  { title: 'Action', value: 'actions' },
];

// Create a ref for the users data with type Referral[]
// const users = reactive<User[]>([])

// onMounted(async () => {
//   try {
//     const response = await axios.get<User[]>('http://localhost:3000/users')
//     users.splice(0, users.length, ...response.data)
//   } catch (error) {
//     console.error('Error fetching users:', error)
//   }
// })

//Create Temporary Users Array

const users = [
  {
    id: 'T-001',
    name: 'User 1',
    role: 'User',
    phone: '123-456-7801',
    email: 'user1@example.com',
    password: 'password1',
    status: 'Inactive',
  },
  {
    id: 'T-002',
    name: 'User 2',
    role: 'Guest',
    phone: '123-456-7802',
    email: 'user2@example.com',
    password: 'password2',
    status: 'Inactive',
  },
  {
    id: 'T-003',
    name: 'User 3',
    role: 'Admin',
    phone: '123-456-7803',
    email: 'user3@example.com',
    password: 'password3',
    status: 'Active',
  },
  {
    id: 'T-004',
    name: 'User 4',
    role: 'User',
    phone: '123-456-7804',
    email: 'user4@example.com',
    password: 'password4',
    status: 'Inactive',
  },
  {
    id: 'T-005',
    name: 'User 5',
    role: 'Guest',
    phone: '123-456-7805',
    email: 'user5@example.com',
    password: 'password5',
    status: 'Inactive',
  },
  {
    id: 'T-006',
    name: 'User 6',
    role: 'Admin',
    phone: '123-456-7806',
    email: 'user6@example.com',
    password: 'password6',
    status: 'Active',
  },
  {
    id: 'T-007',
    name: 'User 7',
    role: 'User',
    phone: '123-456-7807',
    email: 'user7@example.com',
    password: 'password7',
    status: 'Inactive',
  },
  {
    id: 'T-008',
    name: 'User 8',
    role: 'Guest',
    phone: '123-456-7808',
    email: 'user8@example.com',
    password: 'password8',
    status: 'Inactive',
  },
  {
    id: 'T-009',
    name: 'User 9',
    role: 'Admin',
    phone: '123-456-7809',
    email: 'user9@example.com',
    password: 'password9',
    status: 'Active',
  },
  {
    id: 'T-010',
    name: 'User 10',
    role: 'User',
    phone: '123-456-7810',
    email: 'user10@example.com',
    password: 'password10',
    status: 'Inactive',
  },
  {
    id: 'T-011',
    name: 'User 11',
    role: 'Guest',
    phone: '123-456-7811',
    email: 'user11@example.com',
    password: 'password11',
    status: 'Inactive',
  },
  {
    id: 'T-012',
    name: 'User 12',
    role: 'Admin',
    phone: '123-456-7812',
    email: 'user12@example.com',
    password: 'password12',
    status: 'Active',
  },
  {
    id: 'T-013',
    name: 'User 13',
    role: 'User',
    phone: '123-456-7813',
    email: 'user13@example.com',
    password: 'password13',
    status: 'Inactive',
  },
  {
    id: 'T-014',
    name: 'User 14',
    role: 'Guest',
    phone: '123-456-7814',
    email: 'user14@example.com',
    password: 'password14',
    status: 'Inactive',
  },
  {
    id: 'T-015',
    name: 'User 15',
    role: 'Admin',
    phone: '123-456-7815',
    email: 'user15@example.com',
    password: 'password15',
    status: 'Active',
  },
  {
    id: 'T-016',
    name: 'User 16',
    role: 'User',
    phone: '123-456-7816',
    email: 'user16@example.com',
    password: 'password16',
    status: 'Inactive',
  },
  {
    id: 'T-017',
    name: 'User 17',
    role: 'Guest',
    phone: '123-456-7817',
    email: 'user17@example.com',
    password: 'password17',
    status: 'Inactive',
  },
  {
    id: 'T-018',
    name: 'User 18',
    role: 'Admin',
    phone: '123-456-7818',
    email: 'user18@example.com',
    password: 'password18',
    status: 'Active',
  },
  {
    id: 'T-019',
    name: 'User 19',
    role: 'User',
    phone: '123-456-7819',
    email: 'user19@example.com',
    password: 'password19',
    status: 'Inactive',
  },
  {
    id: 'T-020',
    name: 'User 20',
    role: 'Guest',
    phone: '123-456-7820',
    email: 'user20@example.com',
    password: 'password20',
    status: 'Inactive',
  },
  {
    id: 'T-021',
    name: 'User 21',
    role: 'Admin',
    phone: '123-456-7821',
    email: 'user21@example.com',
    password: 'password21',
    status: 'Active',
  },
  {
    id: 'T-022',
    name: 'User 22',
    role: 'User',
    phone: '123-456-7822',
    email: 'user22@example.com',
    password: 'password22',
    status: 'Inactive',
  },
] satisfies User[];

// Helper method for status button styling
function getStatusClass(status: string) {
  switch (status) {
    case 'Inactive':
      return 'Inactive-status';
    case 'Active':
      return 'Active-status';
    default:
      return '';
  }
}

const itemsPerPage = 11;

const currentPage = ref(1);

const pageCount = computed(() => Math.ceil(users.length / itemsPerPage));

const paginatedusers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;

  const end = currentPage.value * itemsPerPage;

  return users.slice(start, end);
});

function onPageChange(newPage: number) {
  currentPage.value = newPage;
}

function maskPassword(password: string): string {
  return '*'.repeat(password.length);
}

const items = ref([
  { title: 'Edit User', icon: 'mdi-account-edit-outline' },
  { title: 'View Details', icon: 'mdi-eye-outline' },
  { title: 'Assign Role', icon: 'mdi-school-outline' },
  { title: 'Delete User', icon: 'mdi-trash-can-outline' },
]);
</script>

<style lang="scss" scoped>
@import '@/assets/styles/scss/typography';
@import '@/assets/styles/scss/forms';
@import '@/assets/styles/scss/variables';
@import '@/assets/styles/scss/button';
@import '@/assets/styles/scss/spacing';

.table {
  width: 100%;
  border-collapse: collapse;
}

.status-btn {
  color: white;
  border: none;
  padding: 4px 10px !important;
  font-size: xx-small;
  font-weight: bolder;
  border-radius: 4px;
  cursor: pointer;
}

.Inactive-status {
  background-color: lightColor(danger) !important;
}

.Active-status {
  background-color: lightColor(success) !important;
}

.simple-button-1 {
  @extend .base-button;
  color: lightColor(disabled);
  min-height: 35px;
  display: flex;
  margin: 0;
  align-items: center;
  justify-content: center;
  border-style: none;
}

:deep(.table) {
  .v-table__wrapper {
    thead tr {
      background-color: lightColor(job-table-head);
    }
  }
}

:deep(.v-pagination__item--is-active) {
  background-color: lightColor(primary);
  color: lightColor(white);
  border-radius: 15px;
}

:deep(.v-pagination__next) {
  color: lightColor(primary);
}

:deep(.v-pagination__prev) {
  color: lightColor(primary);
}

.icon-lg {
  width: 75px;
  height: 32px;
}

.icon-sm-x {
  width: 15px;
  height: 15px;
  display: flex;
  align-items: center;
}

.icon-md {
  width: 60px;
  height: 25px;
}

.menu-icon {
  color: lightColor(primary-flat) !important;
}

.menu-title {
  color: lightColor(primary-flat) !important;
}
</style>
