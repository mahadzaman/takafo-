import { getApiConfiguration } from '@/common/config/apiConfig';
import { PrescreenQuestionsApi, QuestionsApi } from '@/api-docs/api';
import type { CreatePrescreenQuestionDto, UpdatePrescreenQuestionDto } from '@/api-docs';
export default class PrescreenQuestionsService {
  async getQuestions(
    jobId: string,
    limit?: number,
    offset?: number
  ): Promise<any> {
    const api = new PrescreenQuestionsApi(await getApiConfiguration());

    const response = await api.jobsControllerGetQuestionsByJobId(
      jobId,
      limit,
      offset
    );

    return response.data;
  }

  async createQuestions(params: CreatePrescreenQuestionDto): Promise<void> {
    const api = new PrescreenQuestionsApi(await getApiConfiguration());

    const response = await api.jobsControllerCreatePrescreenQuestions(params);

    return response.data;
  }

  async deleteQuestion(jobId: string, questionId: string): Promise<void> {
    const api = new PrescreenQuestionsApi(await getApiConfiguration());

    const response = await api.jobsControllerDeletePrescreenQuestion(
      jobId,
      questionId
    );

    return response.data;
  }
  async getPresetQuestions(): Promise<any> {
    const api = new QuestionsApi(await getApiConfiguration());

    const MAX_LIMIT = 1000000; // 1 Million items max

    const response = await api.questionsControllerGetAllQuestions(
      MAX_LIMIT,
      undefined,
      true
    );

    return response.data;
  }
  async updateQuestions(jobId: string, params: UpdatePrescreenQuestionDto): Promise<void> {
    const api = new PrescreenQuestionsApi(await getApiConfiguration());

    const response = await api.jobsControllerUpdatePrescreenQuestions(jobId, params)

    return response.data;
  }
}

