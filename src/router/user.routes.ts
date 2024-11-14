import type { RouteRecordRaw } from 'vue-router';
import { AppRoutes, IApp } from '@/interfaces';
const userRoutes: RouteRecordRaw = {
  path: AppRoutes.User.ROOT,
  meta: {
    title: 'User Workspace',
    allowedStates: [IApp.AppStates.USER],
  },
  children: [
    {
      path: '',
      component: () => import('@/views/InternalUsers/UserIndex.vue'),
      redirect: {
        path: AppRoutes.User.WORKSPACE,
      },
      children: [
        {
          path: AppRoutes.User.WORKSPACE,
          name: 'user-dashboard',
          component: () =>
            import('@/views/InternalUsers/UserJobRequisitionList.vue'),
        },
        {
          path: AppRoutes.User.Jobs.JOB,
          children: [
            {
              path: '',
              name: 'RAP',
              component: () =>
                import('@/views/InternalUsers/JobView/JobView.vue'),
            },
            {
              path: AppRoutes.User.Jobs.JR_DETAILS,
              component: () =>
                import(
                  '@/views/InternalUsers/JobView/JobRequisitionDetails.vue'
                ),
            },
            {
              path: AppRoutes.User.Jobs.ADVERT,
              name: 'JobsAdvert',
              component: () =>
                import('@/views/InternalUsers/JobView/JobAdvert.vue'),
            },
            {
              path: AppRoutes.User.Jobs.MATCHING_ALGORITHM,
              name: 'MatchingAlgo',
              component: () =>
                import('@/views/InternalUsers/JobView/MatchingAlgorithm.vue'),
            },
            {
              path: AppRoutes.User.Jobs.SCREENING_QUESTIONS,
              name: 'PreScreeningQuestions',
              component: () =>
                import('@/views/InternalUsers/JobView/ScreeningQuestions.vue'),
            },
            {
              path: AppRoutes.User.Jobs.SOURCING_PLAN,
              name: 'SourcingPlan',
              component: () =>
                import('@/views/InternalUsers/JobView/SourcingPlan.vue'),
            },
            {
              path: AppRoutes.User.Jobs.ASSESSMENT_PLAN,
              name: 'AssessmentPlan',
              component: () =>
                import('@/views/InternalUsers/JobView/AssessmentPlan.vue'),
            },
            {
              path: AppRoutes.User.Jobs.PROJECT_MILESTONES,
              name: 'ProjectMilestones',
              component: () =>
                import('@/views/InternalUsers/JobView/ProjectMilestones.vue'),
            },
            {
              path: AppRoutes.User.Jobs.SUBMIT_RAP,
              name: 'SubmitRap',
              component: () =>
                import('@/views/InternalUsers/JobView/SubmitRap.vue'),
            },
          ],
        },
      ],
    },
  ],
};

export default userRoutes;
