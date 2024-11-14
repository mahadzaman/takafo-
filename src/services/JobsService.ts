import { getApiConfiguration } from '@/common/config/apiConfig';
import { JobsApi } from '@/api-docs/api';
import type { UpdateSourcingPlanDto, CreateSourcingPlanDTO } from '@/api-docs/';
import type { UpdateJobApprovalDto } from '@/api-docs';


export default class JobsService {
    async getJobDetails(jobId: string): Promise<any> {
        const api = new JobsApi(await getApiConfiguration());
        const response = await api.jobsControllerJobdetails(jobId);

        return response.data;
    }

    async ApprovalRequest(jobId: string, payload: UpdateJobApprovalDto): Promise<any> {
        const api = new JobsApi(await getApiConfiguration());
        const response = await api.jobsControllerUpdateJobAssociation(jobId, payload);
        return response.data;
    }
    
}