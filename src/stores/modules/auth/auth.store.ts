import { defineStore } from 'pinia';
import { computed, ref, watchEffect } from 'vue';
import { IAuth } from '.';
import { AuthApis } from '@/stores/apis';
import { AppRoutes, IApp } from '@/interfaces';
import router from '@/router';
import { msalInstance } from '@/msalConfig';
import authApis from '@/stores/apis/auth.apis';
import type { AuthUserTypePayload } from './auth.interface';

export const useAuthStore = defineStore('auth', () => {
  // ****** State ******
  const user = ref<IAuth.User | null>(null);

  const candidate = ref<IAuth.Candidate | null>(null);

  const activeRole = ref<IAuth.Role | null>(null);

  const tokens = ref<IAuth.Tokens | null>(null);

  const emailOtp = ref<number | null>(null);

  const userEmail = ref<IAuth.Email | null>(null);

  const rehydrateLoading = ref<boolean>(false);

  const appState = ref<IApp.AppStates>(IApp.AppStates.UNAUTHENTICATED);

  const candidateState = ref<boolean>(false);

  const roleId = ref<string | undefined>(localStorage.getItem('roleId') || '');

  const loginPayload = ref<IAuth.AuthFormPayload>({
    email: '',
    password: '',
  });

  const SsologinPayload = ref<IAuth.AuthSsoLoginPayload>({
    email: '',
  });

  const signUpPayload = ref<IAuth.AuthSignUpFormPayload>({
    email: '',
    password: '',
    phone: '',
    full_name: '',
  });

  const userTypePayload = computed(() => {
    return {
      role_id: roleId.value,
    } as IAuth.AuthUserTypePayload;
  });

  const forgotPasswordPayload = ref<IAuth.ForgotPasswordPayload>({
    email: '',
  });

  const resetPasswordPayload = ref<IAuth.ResetPasswordPayload>({
    new_password: '',
    otp: null,
  });

  // ****** Getters ******
  const getUser = () => computed(() => user.value);

  const getCandidate = () => computed(() => candidate.value);

  const getUserEmail = () => computed(() => userEmail.value);

  const getTokens = () => computed(() => tokens.value);

  const getEmailOtp = () => computed(() => emailOtp.value);

  const getRehydrateLoading = () => computed(() => rehydrateLoading.value);

  const getAppState = () => computed(() => appState.value);

  const getLoginPayload = () => computed(() => loginPayload.value);

  const getResetPasswordPayload = () =>
    computed(() => resetPasswordPayload.value);

  const getActiveRole = () => computed(() => activeRole.value);

  const getCandidateState = () => computed(() => candidateState.value);

  const getSignUpPayload = () => computed(() => signUpPayload.value);

  // ****** Mutations ******
  const setUser = async (newUser: IAuth.User | null) => {
    user.value = newUser;
  };

  const setCandidate = (newUser: IAuth.Candidate | null) => {
    candidate.value = newUser;
  };

  const setUserEmail = (newEmail: IAuth.Email | null) => {
    userEmail.value = newEmail;
  };

  const setTokens = async (newTokens: IAuth.Tokens | null) => {
    tokens.value = {
      ...tokens.value,
      ...newTokens,
    } as IAuth.Tokens;
  };

  const deleteTokens = () => (tokens.value = null);

  const setEmailOtp = (newEmailOtp: number) => {
    emailOtp.value = newEmailOtp;
  };

  const setRehydrateLoading = (loading: boolean) => {
    rehydrateLoading.value = loading;
  };

  const setAppState = (newAppState: IApp.AppStates) => {
    appState.value = newAppState;
  };

  const setLoginPayload = (payload: IAuth.AuthFormPayload) => {
    loginPayload.value = payload;
  };

  const setResetPasswordPayload = (payload: IAuth.ResetPasswordPayload) => {
    resetPasswordPayload.value = payload;
  };

  const setActiveRole = (role: IAuth.Role) => {
    activeRole.value = role;
  };

  const setCandidateState = (value: boolean) => {
    candidateState.value = value;
  };

  const setSignUpPayload = (payload: IAuth.AuthSignUpFormPayload) => {
    signUpPayload.value = payload;
  };

  // ****** Actions ******

  (() => {
    // load tokens from session storage
    const localTokens: IAuth.Tokens = {
      access_token: localStorage.getItem('access_token') ?? '',
      sso_access_token: localStorage.getItem('sso_access_token') ?? '',
      id_token: localStorage.getItem('id_token') ?? '',
      refresh_token: localStorage.getItem('refresh_token') ?? '',
    };

    setTokens(localTokens);
  })();

  // Process the login response and set the user and tokens
  const processLogin = async (loginUserResponse: IAuth.LoginUserResponse) => {
    const { userData, ...tokens } = loginUserResponse;

    await setUser(userData); // Set the user
    setTokens(tokens); // Set the tokens
    rehydrateState();
    rehydrateNavigation();
  };

  // Rehydrate the state based on the roles and status of the user
  const rehydrateState = async () => {
    const _user = user.value;

    if (!_user) {
      setAppState(IApp.AppStates.UNAUTHENTICATED);
      return;
    }

    const roleWithPermissions = _user.rolesWithPermissions ?? [];
    const singleRole = roleWithPermissions.length === 1;
    const multipleRoles = roleWithPermissions.length > 1;
    const isSuperAdmin = _user.is_super_admin;

    if (isSuperAdmin) {
      setAppState(IApp.AppStates.SUPER_ADMIN);
      return;
    }

    if (singleRole) {
      const roleDetails: IAuth.Role = roleWithPermissions[0]
        .roleDetails as IAuth.Role;
      setActiveRole(roleDetails);

      if (
        Object.values(IApp.RoleEnum).includes(
          roleDetails?.role_name as IApp.RoleEnum
        )
      ) {
        setAppState(IApp.AppStates.USER);
        roleId.value = roleDetails.id;
      }
      return;
    }

    if (multipleRoles) {
      const localRoleId = roleId.value;
      const localRole = roleWithPermissions.find(
        item => item.roleDetails?.id === localRoleId
      )?.roleDetails;

      /* if (
        tokens.value?.access_token &&
        localRoleId &&
        localRole?.id !== roleWithPermissions[0].roleDetails
      ) {
        try {
          const res = await authApis.userType(userTypePayload.value);

          const { access_token, refresh_token } = res.data.data;
          await setTokens({ access_token, refresh_token });
          setActiveRole(localRole as IAuth.Role);
          setAppState(IApp.AppStates.USER);
          return;
        } catch (error) {
          console.log(error);
          setAppState(IApp.AppStates.UNAUTHENTICATED);
          return;
        }
      } */

      // const activeRole = localRole || roleWithPermissions[0].roleDetails;
      const activeRole = roleWithPermissions[0].roleDetails;

      setActiveRole(activeRole as IAuth.Role);
      setAppState(IApp.AppStates.USER);
      return;
    }

    setAppState(IApp.AppStates.UNAUTHENTICATED);
  };

  // Navigate user based on the app state
  const rehydrateNavigation = async () => {
    const state = appState.value;

    const _user = user.value;

    if (state === IApp.AppStates.UNAUTHENTICATED) {
      // Navigate to the login page
      await router.push(AppRoutes.Auth.WELCOME);
    } else if (state === IApp.AppStates.SUPER_ADMIN) {
      // Navigate to the admin portal
      await router.push(AppRoutes.SuperAdmin.DASHBOARD);
    } else if (state === IApp.AppStates.USER) {
      await router.push(AppRoutes.User.ROOT);
    } else if (state === IApp.AppStates.ROOT_ERROR) {
      // Navigate to the root error page
      await router.push(AppRoutes.Auth.ROOT);
    } else if (state === IApp.AppStates.CANDIDATE) {
      await router.push('/candidate');
    }

    return;
  };

  // Initialize the user
  const initUser = async () => {
    try {
      const response =
        await AuthApis.fetchMe<IApp.APICallResponse<IAuth.User>>();

      await setUser(response.data.data);

      const activeRole = user.value?.rolesWithPermissions.find(
        role => role.roleDetails?.id === roleId.value
      );

      setActiveRole(activeRole?.roleDetails as IAuth.Role);

      setAppState(IApp.AppStates.USER);

      // await rehydrateNavigation();
    } catch (error) {
      console.log(error);
      setAppState(IApp.AppStates.UNAUTHENTICATED);
    }
  };

  const logout = async () => {
    localStorage.clear();
    sessionStorage.clear();
    setUser(null);
    deleteTokens();
    setAppState(IApp.AppStates.UNAUTHENTICATED);

    await msalInstance.logoutRedirect({
      postLogoutRedirectUri: AppRoutes.Auth.WELCOME, // Set the redirect URI after logout
    });
    setRehydrateLoading(false);
    await rehydrateNavigation();
  };

  watchEffect(() => {
    if (activeRole.value?.id) {
      roleId.value = activeRole.value?.id;
    }

    localStorage.setItem('roleId', roleId?.value || '');

    if (tokens.value) {
      tokens.value.access_token
        ? localStorage.setItem('access_token', tokens.value.access_token)
        : (tokens.value.access_token = '');

      tokens.value.sso_access_token
        ? localStorage.setItem(
            'sso_access_token',
            tokens.value.sso_access_token
          )
        : (tokens.value.sso_access_token = '');

      tokens.value.id_token
        ? localStorage.setItem('id_token', tokens.value.id_token)
        : tokens.value.id_token;

      tokens.value.refresh_token
        ? localStorage.setItem('refresh_token', tokens.value.refresh_token)
        : tokens.value.refresh_token;
    }
  });

  return {
    // ****** State ******
    user,
    candidate,
    userEmail,
    tokens,
    rehydrateLoading,
    state: appState,
    loginPayload,
    forgotPasswordPayload,
    emailOtp,
    resetPasswordPayload,
    activeRole,
    candidateState,
    userTypePayload,
    signUpPayload,
    roleId,
    SsologinPayload,

    // ****** Getters ******
    getUser,
    getCandidate,
    getUserEmail,
    getTokens,
    getRehydrateLoading,
    getAppState,
    getLoginPayload,
    getEmailOtp,
    getResetPasswordPayload,
    getActiveRole,
    getCandidateState,
    getSignUpPayload,

    // ****** Mutations ******
    setUser,
    setCandidate,
    setUserEmail,
    setTokens,
    setRehydrateLoading,
    setAppState,
    setLoginPayload,
    setEmailOtp,
    setResetPasswordPayload,
    setActiveRole,
    setCandidateState,
    setSignUpPayload,
    // ****** Actions ******
    processLogin,
    // processCandidateLogin,
    initUser,
    rehydrateState,
    rehydrateNavigation,
    logout,
  };
});
