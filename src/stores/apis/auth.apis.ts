import axios, { type AxiosRequestConfig } from 'axios';
import { IAuth } from '@/stores/modules/auth';
import { AuthUrls } from '@/stores/urls';

const emailLogin = async (payload: IAuth.AuthFormPayload) => {
  return await axios.post(AuthUrls.EMAIL_LOGIN, payload);
};

const candidateLogin = async (payload: IAuth.AuthFormPayload) => {
  return await axios.post(AuthUrls.CANDIDATE_LOGIN, payload);
};

const SsoLogin = async () => {
  const idToken = localStorage.getItem('id_token');

  const accessToken = localStorage.getItem('sso_access_token');

  return await axios.post(AuthUrls.SSO_LOGIN, undefined, {
    headers: {
      Authorization: `Bearer ${accessToken}`, // Attach the ID token in the headers
      IdToken: `Bearer ${idToken}`, // Attach the ID token in the headers
    },
  });
};

const signUp = async (payload: IAuth.AuthSignUpFormPayload) => {
  return await axios.post(AuthUrls.CANDIDATE_SIGN_UP, payload);
};

const forgotPasswordEmail = async (payload: IAuth.ForgotPasswordPayload) => {
  return await axios.post(AuthUrls.FORGOT_PASSWORD_EMAIL, payload);
};

const verfiyOtp = async (payload: number) => {
  const url = `${AuthUrls.VERIFY_OTP}?otp=${payload}`;

  return await axios.post(url);
};

const refreshToken = async <T>(payload: IAuth.RefreshTokenPayload) => {
  const url = `${AuthUrls.REFRESH_TOKEN}?refresh_token=${payload.refresh_token}`;

  return await axios.post<T>(url, null);
};

const fetchMe = async <T>() => {
  return await axios.get<T>(AuthUrls.ME);
};

const fetchCandidate = async <T>() => {
  return await axios.get<T>(AuthUrls.CANDIDATE);
};

const forgotPassword = async <T>(payload: IAuth.ForgotPasswordPayload) => {
  return await axios.post<T>(AuthUrls.FORGOT_PASSWORD, payload);
};

const resetPassword = async <T>(payload: IAuth.ResetPasswordPayload) => {
  return await axios.post<T>(AuthUrls.RESET_PASSWORD, payload);
};

const verifyEmail = async <T>(payload: IAuth.VerifyEmailOtpPayload) => {
  const url = `${AuthUrls.VERIFY_EMAIL}?otp=${payload.otp}`;

  return await axios.post<T>(url, null);
};

const userType = async (payload: IAuth.AuthUserTypePayload) => {
  return await axios.post(AuthUrls.USER_TYPE, payload);
};

const fetchMenu = async () => {
  return await axios.get(AuthUrls.MENUS);
};

export default {
  emailLogin,
  forgotPasswordEmail,
  refreshToken,
  fetchMe,
  forgotPassword,
  resetPassword,
  verifyEmail,
  verfiyOtp,
  userType,
  signUp,
  candidateLogin,
  fetchCandidate,
  SsoLogin,
  fetchMenu,
};
