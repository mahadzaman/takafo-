import axios, { type AxiosRequestConfig } from 'axios';
import { storeToRefs } from 'pinia';
import { notify } from '@kyvg/vue3-notification';
import { useAuthStore } from '@/stores';
import { AuthApis } from '@/stores/apis';
import { IApp } from '@/interfaces';
import { IAuth } from '@/stores/modules/auth';

export default () => {
  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async function (error): Promise<any> {
      const authStore = useAuthStore();

      // Response undefined means => backend didn't receive request from frontend
      // Means that firewall blocks backend app ip or any other issue
      if (!error.response) {
        error.response = {
          data: {
            message: 'Network Error',
          },
        };
      }

      // If response status is 401 => refresh token
      if (
        error.response.status === 401 &&
        !error?.request?.responseURL?.includes('auth/refresh-token')
      ) {
        const { tokens } = storeToRefs(authStore);

        const _refreshToken = tokens?.value?.refresh_token;

        // If refresh token exist => get new token
        if (_refreshToken) {
          try {
            // Get new token from refresh token
            const response = await AuthApis.refreshToken<
              IApp.APICallResponse<IAuth.LoginUserResponse>
            >({ refresh_token: _refreshToken });

            const { userData, ...tokens } = response.data.data;
            
            authStore.setTokens(tokens); // Update token in store

            return axios.request(error.config); // Retry request
          } catch (e) {
            authStore.logout();
            throw 'Invalid Refresh Token';
          }
        } else {
          authStore.logout();
          throw 'Invalid Refresh Token';
        }
      } else if (
        error.response.status === 401 &&
        error?.request?.responseURL?.includes('auth/refresh-token')
      ) {
        // If refresh token is invalid => logout user
        authStore.logout();
        throw 'Invalid Refresh Token';
      } else if (error.response.status === 429) {
        notify({
          type: 'error',
          text: 'Too many requests. Please try again later.',
          title: 'Limit Reached',
        });
        throw 'Too many requests';
      }

      return Promise.reject(error);
    }
  );
};
