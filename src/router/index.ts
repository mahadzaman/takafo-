import { createRouter, createWebHistory } from 'vue-router';
import { storeToRefs } from 'pinia';
import { AppRoutes, IApp } from '@/interfaces';
import authentication_routes from '@/router/auth.routes';
import { useAuthStore } from '@/stores';
import candidateRoutes from './candidate.routes';
import userRoutes from './user.routes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      redirect: {
        path: 'welcome',
      },
      meta: {
        allowedStates: [IApp.AppStates.UNAUTHENTICATED],
      },
    },
    authentication_routes,
    ...candidateRoutes,
    userRoutes,
    {
      path: '/welcome',
      name: 'Welcome',
      component: () => import('@/views/WelcomePage.vue'),
      meta: {
        title: 'Welcome',
        allowedStates: [IApp.AppStates.UNAUTHENTICATED],
      },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  const { state, tokens, roleId } = storeToRefs(authStore);

  // console.log({...authStore});

  const accessToken = tokens.value?.access_token;

  // console.log(roleId.value)

  // Wait for user state to initialize if access token exists
  if (state.value === IApp.AppStates.UNAUTHENTICATED && accessToken) {
    console.log(state.value)
    await authStore.initUser();
    console.log(state.value)
    // debugger;
  }

  const routeMetaState = to.meta?.allowedStates
    ? (to.meta.allowedStates as IApp.AppStates)
    : [IApp.AppStates.UNAUTHENTICATED];

  // debugger;

  // Ensure that app state is fully initialized before navigation
  if (routeMetaState.includes(state.value)) {
    // debugger;
    next(); // Proceed to the target route
  } else {
    // debugger;
    // Optional: Handle redirection for unauthenticated users
    next({ path: AppRoutes.Auth.WELCOME });
  }
});


export default router;
