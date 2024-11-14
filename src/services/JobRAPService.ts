import { getApiConfiguration } from '@/common/config/apiConfig';
import { JobsApi } from '@/api-docs/apis/jobs-api';

export default class JobRAPService {
  async getJobRAPByJobId(jobId: string): Promise<any> {
    const api = new JobsApi(await getApiConfiguration());

    const response = await api.jobsControllerFindRAPDetails(jobId);

    return response.data;
  }
  async submitRapForJob(jobId: string): Promise<void> {
    const api = new JobsApi(await getApiConfiguration());

    const response = await api.jobsControllerSubmitRAP(jobId);

    return response.data;
  }
}
