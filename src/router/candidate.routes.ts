import type { RouteRecordRaw } from 'vue-router';
import { AppRoutes, IApp } from '@/interfaces';

const candidateRoutes: RouteRecordRaw[] = [
  {
    path: AppRoutes.Candidate.ROOT,
    component: () => import('@/views/candidate/CandidateIndex.vue'),
    children: [
      {
        path: '',
        redirect: {
          path: AppRoutes.Candidate.WORKSPACE,
        },
      },
      {
        path: AppRoutes.Candidate.WORKSPACE,
        name: 'candidate-workspace',
        component: () => import('@/views/candidate/CandidateWorkspace.vue'),
        meta: {
          title: 'Candidate Workspace',
          allowedStates: [IApp.AppStates.CANDIDATE],
        },
      },
    ],
  },
  {
    path: AppRoutes.Onboarding.ROOT,
    children: [
      {
        path: '',
        redirect: {
          path: AppRoutes.Onboarding.STEPS,
        },
      },
      {
        path: AppRoutes.Onboarding.STEPS,
        name: 'Onboarding',
        component: () =>
          import('@/views/candidate/onboarding/OnboardingSteps.vue'),
        meta: {
          title: 'Onboarding',
          allowedStates: [IApp.AppStates.UNAUTHENTICATED],
        },
      },
    ],
  },
];

export default candidateRoutes;
