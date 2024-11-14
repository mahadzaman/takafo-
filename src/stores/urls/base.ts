const BASE_URL =
  (import.meta.env.VITE_APP_BACKEND_URL as string) ??
  'http://localhost:3000/v1';

const AUTH_BASE_URL = BASE_URL + '/v1' + '/auth';

const USERS_BASE_URL = BASE_URL + '/v1' + '/users';

const ADMIN_BASE_URL = BASE_URL + '/v1' + '/admin';

const JOBS_BASE_URL = BASE_URL + '/v1' + '/jobs';

const APPLICANTS_BASE_URL = BASE_URL + '/v1' + '/applicants';

export default {
  BASE_URL,
  AUTH_BASE_URL,
  USERS_BASE_URL,
  ADMIN_BASE_URL,
  JOBS_BASE_URL,
  APPLICANTS_BASE_URL,
};
