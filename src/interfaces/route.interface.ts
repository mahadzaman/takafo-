const RecruiterWorkSpace = {
  ROOT: '/recruiter/workspace',
};

const ManPowerPlanningWorkSpace = {
  ROOT: '/man-power-planning/workspace',
};

const HeadOfTalentWorkSpace = {
  ROOT: '/head-of-talent/workspace',
};

const TelentPartnerWorkSpace = {
  ROOT: '/talent-partner/workspace',
};

const Jobs = '/job/';

export namespace AppRoutes {
  export const Auth = {
    WELCOME: '/welcome',
    ROOT: '/auth',
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    EMAIL_VERIFICATION: '/auth/email-verification',
    FORGOT_PASSWORD: '/auth/forgot-password',
    OTP: '/auth/otp',
    EMAIL_VERIFIED: '/auth/email-verified',
    RESET_PASSWORD: '/auth/reset-password',
    RESET_PASSWORD_SUCCESS: '/auth/reset-password-success',
    CALLBACK: '/v1/auth/azure/callback',
  } as const;

  export const SuperAdmin = {
    ROOT: '/super-admin',
    DASHBOARD: '/super-admin/dashboard',
  } as const;

  export const Recruiter = {
    ROOT: '/recruiter',
    DASHBOARD: '/recruiter/dashboard',
    JOBS: {
      ROOT: '/recruiter/jobs',
      LISTINGS: {
        ROOT: '/recruiter/jobs/listings',
        LIST: '/recruiter/jobs/listings/list',
      },
      CREATE: {
        ROOT: '/recruiter/jobs/create',
        REQUEST: {
          ROOT: '/recruiter/jobs/create/request',
        },
      },
    },
    WORKSPACE: RecruiterWorkSpace,
  } as const;

  export const ManPowerPlanning = {
    ROOT: '/man-power-planning',
    WORKSPACE: ManPowerPlanningWorkSpace,
  } as const;

  export const HeadOfTalent = {
    ROOT: '/head-of-talent',
    WORKSPACE: HeadOfTalentWorkSpace,
  } as const;

  export const TalentPartner = {
    ROOT: '/talent-partner',
    WORKSPACE: TelentPartnerWorkSpace,
    JOBS: {
      ROOT: '/talent-partner/jobs',
      CREATE: {
        ROOT: '/talent-partner/jobs/create',
      },
    },
  } as const;

  export const User = {
    ROOT: '/user',
    WORKSPACE: '/user/workspace',
    Jobs: {
      JOB: '/user/job/:id',
      JR_DETAILS: 'jr-details',
      JOB_REQUISITION_LIST: `/user${Jobs}:id/jobsList`,
      ADVERT: `/user${Jobs}:id/job-advert`,
      SCREENING_QUESTIONS: `/user${Jobs}:id/prescreening-questions`,
      MATCHING_ALGORITHM: `/user${Jobs}:id/matching-algorithm`,
      SOURCING_PLAN: `/user${Jobs}:id/sourcing-plan`,
      ASSESSMENT_PLAN: `/user${Jobs}:id/assessment-plan`,
      PROJECT_MILESTONES: `/user${Jobs}:id/project-milestones`,
      SUBMIT_RAP: `/user${Jobs}:id/submit-rap`,
    },
    LOGIN: '/user/login',
  } as const;
  export const HiringManager = {
    ROOT: '/hiring-manager',
    DASHBOARD: '/hiring-manager/dashboard',
  } as const;

  export const Candidate = {
    ROOT: '/candidate',
    WORKSPACE: '/candidate/workspace',
  } as const;

  export const Onboarding = {
    ROOT: '/onboarding',
    STEPS: '/onboarding/steps',
    // STEPS: {
    //   STEP0: '/onboarding/step0',
    //   STEP1: '/onboarding/step1',
    //   STEP2: '/onboarding/step2',
    //   STEP3: '/onboarding/step3',
    //   STEP4: '/onboarding/step4',
    //   STEP5: '/onboarding/step5'
    // }
  } as const;

  export const Admin = {
    ROOT: '/admin',
    WORKSPACE: '/admin/admin-workspace',
    USERDETAILS: '/admin/user-details',
  } as const;
}
