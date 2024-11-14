import { getApiConfiguration } from '@/common/config/apiConfig';
import { JobAdvertApi } from '@/api-docs/apis/job-advert-api';
import type { CreateJobAdvertDTO } from '@/api-docs/models/create-job-advert-dto';
import type { UpdateJobAdvertDTO } from '@/api-docs/models/update-job-advert-dto';

export default class JobAdvertService {
  async getJobadvertById(jobId: string): Promise<any> {
    const api = new JobAdvertApi(await getApiConfiguration());

    const response = await api.jobsControllerGetJobAdvertByJobId(jobId);

    return response.data;
  }

  async createJobAdvert(params: CreateJobAdvertDTO): Promise<void> {
    const api = new JobAdvertApi(await getApiConfiguration());

    const response = await api.jobsControllerCreateJobAdvert(params);

    return response.data;
  }

  async updateJobAdvert(
    params: UpdateJobAdvertDTO,
    advertId: string
  ): Promise<void> {
    const api = new JobAdvertApi(await getApiConfiguration());

    const response = await api.jobsControllerUpdateJobAdvert(advertId, params);

    return response.data;
  }
}
