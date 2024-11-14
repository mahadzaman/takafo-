import type { RouteRecordRaw } from 'vue-router';
import { AppRoutes, IApp } from '@/interfaces';
const authentication_routes: RouteRecordRaw = {
  path: AppRoutes.Auth.ROOT,
  component: () => import('@/views/auth/AuthIndex.vue'),
  children: [
    {
      path: '',
      redirect: {
        path: '/auth/login',
      },
    },
    {
      path: AppRoutes.Auth.LOGIN,
      name: 'Login',
      component: () => import('@/views/auth/AuthLogin.vue'),
      meta: {
        title: 'Login',
        allowedStates: [IApp.AppStates.UNAUTHENTICATED],
      },
    },
    {
      path: AppRoutes.Auth.SIGNUP,
      name: 'Sign Up',
      component: () => import('@/views/auth/AuthSignUp.vue'),
      meta: {
        title: 'Sign Up',
        allowedStates: [IApp.AppStates.UNAUTHENTICATED],
      },
    },
    {
      path: AppRoutes.Auth.FORGOT_PASSWORD,
      name: 'Forgot Password',
      component: () => import('@/views/auth/AuthForgotPassword.vue'),
      meta: {
        title: 'Forgot Password',
        allowedStates: [IApp.AppStates.UNAUTHENTICATED],
      },
    },
    {
      path: AppRoutes.Auth.OTP,
      name: 'Email Otp',
      component: () => import('@/views/auth/AuthOtp.vue'),
      meta: {
        title: 'Email Otp',
        allowedStates: [IApp.AppStates.UNAUTHENTICATED],
      },
    },
    {
      path: AppRoutes.Auth.EMAIL_VERIFICATION,
      name: 'Email Verified',
      component: () => import('@/views/auth/AuthEmailVerified.vue'),
      meta: {
        title: 'Email Verified',
        allowedStates: [IApp.AppStates.UNAUTHENTICATED],
      },
    },
    {
      path: AppRoutes.Auth.RESET_PASSWORD,
      name: 'Reset Password',
      component: () => import('@/views/auth/AuthResetPassword.vue'),
      meta: {
        title: 'Reset Password',
        allowedStates: [IApp.AppStates.UNAUTHENTICATED],
      },
    },
    {
      path: AppRoutes.Auth.RESET_PASSWORD_SUCCESS,
      name: 'Reset Password Success',
      component: () => import('@/views/auth/AuthResetPasswordSuccess.vue'),
      meta: {
        title: 'Reset Password Success',
        allowedStates: [IApp.AppStates.UNAUTHENTICATED],
      },
    },
    {
      path: AppRoutes.Auth.CALLBACK,
      name: 'SSOCallback',
      component: () =>
        import('@/views/InternalUsers/Workspaces/SscocallBack.vue'),

      meta: {
        title: 'Callback',
        allowedStates: [IApp.AppStates.UNAUTHENTICATED],
      },
    },
  ],
};

export default authentication_routes;
