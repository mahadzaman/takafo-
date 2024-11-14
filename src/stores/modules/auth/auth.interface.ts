export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  new_password: string;
  otp: number | null;
}

export interface AuthFormPayload extends ForgotPasswordPayload {
  password: string;
}

export interface AuthSignUpFormPayload extends AuthFormPayload {
  full_name: string;
  phone: string;
}

export interface RefreshTokenPayload {
  refresh_token: string;
}

export interface VerifyEmailOtpPayload {
  otp: number;
}

export interface Candidate {
  id: string;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
  deleted_at: null;
  full_name: string;
  email: string;
  phone: string;
  password: string;
  refresh_token: string;
  password_changed_at: null;
  is_verified: boolean;
  is_onboarded: boolean;
}

export interface User {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
  first_name: string;
  last_name: string;
  user_name: string;
  phone: string;
  is_super_admin: boolean;
  rolesWithPermissions: RoleWithPermissions[];
}

export interface RoleWithPermissions {
  roleDetails?: Role;
}

export interface Role {
  role_name: string;
  role_description: string;
  role_label: string;
  id: string;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
}

export interface Tokens {
  access_token?: string;
  sso_access_token?: string;
  refresh_token?: string;
  id_token?: string
}

export interface Email extends ForgotPasswordPayload {}

export interface LoginUserResponse extends Tokens {
  userData: User;
}

export interface LoginCandidateResponse extends Tokens {
  data: Candidate;
}
export interface AuthUserTypePayload {
  role_id: string;
}
export interface AuthSsoLoginPayload {
  email: string;
}

export interface Menu {
  message: string;
  count: number;
  data: MenuDetail[];
}

export interface MenuDetail {
  parent: MenuItem;
}

export interface MenuItem {
  label: string;
  route: string;
  icon: string;
  active_icon: null;
}
