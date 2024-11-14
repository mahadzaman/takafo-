import { getApiConfiguration } from '@/common/config/apiConfig';
import { AssessmentsApi } from '@/api-docs/apis/assessments-api';

export default class JobAdvertService {
  async getAllAssessments(limit?: number, offset?: number): Promise<any> {
    const api = new AssessmentsApi(await getApiConfiguration());

    const response = await api.assessmentsControllerFindAllAssessments(limit, offset);

    return response.data;
  }
}
