<template>
  <v-select
    v-model="activeRoleLabel"
    :items="userRoles"
    item-title="role_label"
    item-value="role_label"
    hide-details
    rounded
    class="dis-none role-switch-dropdown"
    :menu-icon="
      (authStore?.user?.rolesWithPermissions || []).length > 1
        ? 'mdi-chevron-down'
        : 'null'
    "
    variant="solo"
    :readonly="(authStore?.user?.rolesWithPermissions || []).length <= 1"
    :hide-selected="true"
    @update:modelValue="switchRole"
  >
    <!-- Customizing the selected item with an image and text truncation -->
    <template v-slot:selection="{ item }">
      <div v-if="item" class="d-flex align-center" style="margin-top: -3px">
        <v-img
          :src="UserType"
          width="25"
          class="mar-r-4"
          rounded="circle"
        ></v-img>
        <span class="base-title text-truncate font-weight-500 font-size-12">
          {{ item.title.length > 11 ? `${item.title}` : item.title }}
        </span>
      </div>
    </template>

    <!-- Customizing the dropdown items with images -->
    <template v-slot:item="{ props, item }">
      <v-list-item v-bind="props" :title="item.title">
        <template v-slot:prepend>
          <v-img width="25" :src="UserType" class="mr-1"></v-img>
        </template>
      </v-list-item>
    </template>
  </v-select>
  
  <v-list active-strategy="leaf" mandatory nav>
    <template
      v-for="(link, index) in getNavsideLinks(
        authStore.getActiveRole().value?.role_name || ''
      ) || []"
      :key="index"
    >
      <v-list-item class="radius-12" link>
        <v-list-item-title
          ><router-link :to="link.link" class="base-button color-disabled">{{
            link.title
          }}</router-link></v-list-item-title
        >
        <template v-slot:prepend>
          <i class="mar-r-6 color-primary" :class="[`icon-${link.icon}`]"></i>
        </template>
      </v-list-item>
    </template>
  </v-list>

  <v-btn
    class="text-danger text-capitalize logout-btn font-weight-bold pad-y-12 mar-l-24"
    prepend-icon="mdi-arrow-left-bold"
    variant="plain"
    @click="handleLogOut"
  >
    <template v-slot:prepend>
      <GenericCustomIcons :iconPathCount="2" icon-name="logout" />
    </template>
    Log Out
  </v-btn>
</template>

<script lang="ts" setup>
import {ref, computed} from 'vue';
import { notify } from '@kyvg/vue3-notification';
import { useRouter, useRoute } from 'vue-router';
import type { AxiosResponse } from 'axios';
import { IApp } from '@/interfaces';
import UserType from '@/assets/images/profile.svg';
import { useAuthStore } from '@/stores';
import { useUserType } from '@/hooks/auth';
import GenericCustomIcons from '../shared/GenericCustomIcons.vue';
import { IAuth } from '@/stores/modules/auth/';
import { appUtils } from '@/utils';
import { getNavsideLinks } from '@/utils/navside-links';

const { mutate: mutateUserType, isPending: userPending } = useUserType();

const router = useRouter();

const route = useRoute();

const authStore = useAuthStore();

const activeRoleLabel = ref(authStore.getActiveRole().value?.role_label)

const userRoles = computed(() => authStore.getUser().value?.rolesWithPermissions
    .filter((role: any) => {
      return ['Hiring Manager', 'Recruiter'].includes(
        role?.roleDetails?.role_label
      );
    })
    .map((role: any) => {
      return {
        ...role?.roleDetails,
      };
    })
    .filter((role: any) => role.role_label !== authStore.getActiveRole().value?.role_label));

function handleLogOut() {
  authStore.logout();
}

const switchRole = async (role_label: string) => {
  const { getUser } = authStore;

  if (
    route.fullPath.endsWith('/submit-rap') &&
    role_label === 'Hiring Manager'
  ) {
    await router.push(`/user/job/${route.params.id}`);
  }

  const rolesWithPermissions = getUser().value?.rolesWithPermissions;

  if (role_label) {
    const selectedRole = rolesWithPermissions?.find(item => {
      return item?.roleDetails?.role_label === role_label;
    });

    if (selectedRole && selectedRole?.roleDetails) {
      await fetchType(selectedRole?.roleDetails);
    }
  }
};

const fetchType = async (selectedRole: IAuth.Role) => {
  mutateUserType({role_id: selectedRole.id}, {
    onSuccess: (
      response: AxiosResponse<IApp.APICallResponse<IAuth.LoginUserResponse>>
    ) => {
      const { access_token, refresh_token } = response.data.data;
      authStore.setActiveRole(selectedRole);
      authStore.setTokens({access_token, refresh_token});
      authStore.rehydrateNavigation();

      notify({
        title: 'Role Selection Successful',
        text: 'Role switch happened successfully.',
        type: 'success',
      });
    },
    onError: error => {
      const errorResp = appUtils.extractAxiosErrorMessage(error);

      notify({
        title: 'Login Error',
        text: errorResp.msg,
        type: 'error',
      });
    },
  });
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/scss/variables';
@import '@/assets/styles/scss/responsive';
@import '@/assets/styles/scss/functions';

@include desktop {
  .scrolled-top {
    min-height: 100dvh;
  }
}

.sub-links-wrapper {
  border-left: 1px dotted lightColor(white);
}

.role-switch-dropdown {
  ::v-deep(.v-field) {
    height: pxToRem(60);
    background: lightColor(step-segment);
    border: none;

    .v-field__input {
      height: pxToRem(60);
      min-height: pxToRem(60);
      padding: pxToRem(12);
      padding-right: pxToRem(10);
    }
  }
}

.dis-none {
  ::v-deep(.v-input__append-inner) {
    display: none !important;
  }
}
.active {
  background-color: lightColor(primary);
  color: white !important;
}

.sub-link {
  text-decoration: none;
  font-size: small;

  .selected-child {
    font-weight: bolder;
  }
}

.logout-btn {
  position: fixed;
  bottom: 2px;
}
</style>
