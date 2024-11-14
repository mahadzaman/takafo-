import { Configuration } from '@/api-docs';

export const getApiConfiguration = async (): Promise<Configuration> => {
  const basePath = import.meta.env.VITE_APP_BACKEND_URL;

  return new Configuration({ basePath });
};
