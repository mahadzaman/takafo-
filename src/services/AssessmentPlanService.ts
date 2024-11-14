import { getApiConfiguration } from '@/common/config/apiConfig';
import { AssessmentPlanApi } from '@/api-docs/apis/assessment-plan-api';

export default class AssessmentPlanService {
  async createAssessmentPlan(
    assessmentId: string,
    configuration: any,
    caseStudy: File,
    status: string,
    jobId?: string
  ): Promise<any> {
    const api = new AssessmentPlanApi(await getApiConfiguration());

    const { data } = await api.jobsControllerCreateAssessmentPlan(
      assessmentId,
      configuration,
      caseStudy,
      status,
      jobId
    );

    return data;
  }

  async getAssessmentPlan(jobId: string): Promise<any> {
    const api = new AssessmentPlanApi(await getApiConfiguration());

    const { data } = await api.jobsControllerFindAssessmentPlanByJobId(jobId);

    return data;
  }

  async updateAssessmentPlan(id: string, assessmentId: string): Promise<any> {
    const api = new AssessmentPlanApi(await getApiConfiguration());

    const { data } = await api.jobsControllerUpdateAssessmentPlan(
      id,
      assessmentId
    );

    return data;
  }
}
