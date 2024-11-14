// Name should be same as roles table in DB
export enum RoleEnum {
  ADMIN = 'admin',
  RECRUITER = 'recruiter',
  CANDIDATE = 'candidate',
  HIRING_MANAGER = 'hiring_manager',
  TALENT_PARTNER = 'talent_partner',
  MAN_POWER_PLANNING = 'man_power_planning',
  HEAD_OF_TALENT = 'talent_head',
}

export interface ErrorMsgResponse {
  msg: string;
  type: string;
}

export enum AppStates {
  UNAUTHENTICATED = 'unauthenticated',
  EMAIL_VERIFICATION_PENDING = 'emailVerificationPending',
  CANDIDATE = 'candidate',
  ADMIN = 'admin',
  SUPER_ADMIN = 'superAdmin',
  ROOT_ERROR = 'rootError',
  USER = 'user',
  TALENT_PARTNER = 'talentPartner',
  MAN_POWER_PLANNING = 'manPowerPlanning',
  HEAD_OF_TALENT = 'headOfTalent',
  RECRUITER = 'recruiter',
  HIRING_MANAGER = 'hiringManager',
}

export interface APICallResponse<T> {
  data: T;
  status?: number;
  message: string;
}
