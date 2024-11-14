import { getApiConfiguration } from '@/common/config/apiConfig';
import { SourcingPlanApi } from '@/api-docs/api';
import type { UpdateSourcingPlanDto, CreateSourcingPlanDTO } from '@/api-docs/';

export default class SourcingPlanService {
  //post
  async createSourcingPlan(createData: CreateSourcingPlanDTO): Promise<void> {
    const api = new SourcingPlanApi(await getApiConfiguration());
    const response = await api.jobsControllerCreateSourcingPlan(createData);

    return response.data;
  }

  //get by id
  async jobsControllerGetSourcingPlanByJobId(jobId: string): Promise<any> {
    const api = new SourcingPlanApi(await getApiConfiguration());
    const response = await api.jobsControllerGetSourcingPlanByJobId(jobId);

    return response.data;
  }

  //patch/update
  async jobsControllerUpdateSourcingPlan(
    jobId: string,
    updateData: UpdateSourcingPlanDto
  ): Promise<void> {
    const api = new SourcingPlanApi(await getApiConfiguration());
    const response = await api.jobsControllerUpdateSourcingPlan(
      jobId,
      updateData
    );

    return response.data;
  }
}
