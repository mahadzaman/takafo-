import axios, { type InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/stores';

export default () => {
  axios.interceptors.request.use(
    async function (config: InternalAxiosRequestConfig) {
      // Append necessary information in headers
      if (config.headers && !config?.url?.includes('auth/refresh-token') && !config?.url?.includes('/sso-login')) {
        const authStore = useAuthStore();

        const accessToken = authStore.tokens?.access_token;

        if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    },
    function (err) {
      return Promise.reject(err);
    }
  );
};
