import { BaseUrls } from '.';

const ME = BaseUrls.AUTH_BASE_URL + '/user';

const CANDIDATE = BaseUrls.APPLICANTS_BASE_URL + '/details';

const REFRESH_TOKEN = BaseUrls.AUTH_BASE_URL + '/refresh-token';

const EMAIL_LOGIN = BaseUrls.AUTH_BASE_URL + '/login';

const CANDIDATE_LOGIN = BaseUrls.APPLICANTS_BASE_URL + '/login';

const FORGOT_PASSWORD_EMAIL = BaseUrls.APPLICANTS_BASE_URL + '/forgot-password';

const VERIFY_EMAIL = BaseUrls.APPLICANTS_BASE_URL + '/verify-email';

const FORGOT_PASSWORD = BaseUrls.APPLICANTS_BASE_URL + '/forgot-password';

const RESET_PASSWORD = BaseUrls.APPLICANTS_BASE_URL + '/reset-password';

const VERIFY_OTP = BaseUrls.APPLICANTS_BASE_URL + '/verify-otp';

const USER_TYPE = BaseUrls.AUTH_BASE_URL + '/switch-role';

const SSO_LOGIN = BaseUrls.AUTH_BASE_URL + '/sso-login';

const CANDIDATE_SIGN_UP = BaseUrls.APPLICANTS_BASE_URL;

const MENUS = BaseUrls.ADMIN_BASE_URL + '/resources/parent/children';

export default {
  EMAIL_LOGIN,
  FORGOT_PASSWORD_EMAIL,
  ME,
  REFRESH_TOKEN,
  VERIFY_EMAIL,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  VERIFY_OTP,
  USER_TYPE,
  CANDIDATE_SIGN_UP,
  CANDIDATE_LOGIN,
  CANDIDATE,
  SSO_LOGIN,
  MENUS,
};
