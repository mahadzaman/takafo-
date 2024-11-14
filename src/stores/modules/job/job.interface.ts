export interface Job {
  actionsList: ActionsList;
  budget_type: string;
  budget_year: string;
  business_case: string;
  contract_type: string;
  created_at: string;
  created_by: string;
  grade: string;
  hiring_count: number;
  id: string;
  job_associations: JobAssociations[]; // Replace with a more detailed type if needed
  job_title: string;
  jr_number: number;
  location: string;
  nationality: string;
  platform: string;
  project_code: string;
  status: string;
  statusId: number;
  unit: string;
  updated_at: string;
  user_role: string;
}

export interface JobDetails {
  message: string;
  data: Job[];
}

type Status = 'Pending' | 'In Progress' | 'Completed';

export interface JobRap {
  job_id: string;
  job_title: string;
  location: string;
  created_at: string;
  job_advert_status: Status;
  project_milestone_status: Status;
  sourcing_plan_status: Status;
  assessment_plan_status: Status;
  prescreen_question_status: Status;
}

export interface JobAssociations {
  id: string;
  action: string;
  action_by: string;
  role_id: string;
  role: string;
}

export interface JobResponse {
  data: Job[];
}

export interface Question {
  question: string;
  question_type: string;
  options?: string[];
  target_candidate: string;
  question_tag: string;
  is_preset: boolean;
  is_mandatory: boolean;
}

export interface PrescreenQuestions {
  preset_question_id?: string[];
  custom_questions: Question[];
  job_id: string;
}

export interface JobFilters {
  operator: JobOperators;
  platform: string | null;
  selectOption: string | null;
}

export enum JobOperators {
  AND = 'AND',
  OR = 'OR',
  NOT = 'NOT',
  LIKE = 'LIKE',
  EQUAL = 'EQUAL',
}

interface Action {
  action: string;
  noAction?: string[];
}

interface ActionsList {
  view: Action;
  calender: Action;
  candidate: Action;
}

export enum JobTypes {
  ASSIGNED_JRS = "Assigned JR's",
  NOT_ASSIGNED_JRS = "Not Assigned JR's",
}
