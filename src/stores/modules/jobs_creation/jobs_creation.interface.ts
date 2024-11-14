import { JobPostingType } from '@/enums/jobs/jobs.enum';
export interface CreateJobPayload {
  platform: string;
  unit: string;
  uae_expat: string;
  contract_type: string;
  opportunity_type: string;
  requisition_title: string;
  business_case: string;
  lk_assessment_id: string;
  lk_hiring_type_id: string;
  lk_location_id: string;
  lk_budjet_id: string;
  hiring_type: string;
  hiring_count: number;
  grade: string;
  location: string;
  budget_type: string;
  budget_year: string;
  assests: string;
  purpose: string;
  rolesResponsibility: string;
  category_id: string;
  jobAssociation: {
    actionBy: UserDetail[];
  }[];
}

export interface UserDetail {
  user_id: string;
  role_id: string;
  role_label: string;
}

export interface JobAdvertPayload {
  external_about_us: string;
  external_what_will_you_do: string;
  external_what_we_offer_you: string;
  external_what_you_will_bring: string;
  external_key_indicators: string;
  external_job_posting_type: JobPostingType;
  external_agency: string;
  external_start_date: string;
  external_end_date: string;
  internal_about_us: string;
  internal_what_will_you_do: string;
  internal_what_we_offer_you: string;
  internal_what_you_will_bring: string;
  internal_key_indicators: string;
  internal_job_posting_type: JobPostingType;
  internal_start_date: string;
  internal_end_date: string;
  same_as_external: boolean;
  status: string;
  job_id: string;
}
