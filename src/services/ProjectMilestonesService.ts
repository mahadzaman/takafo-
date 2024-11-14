import { getApiConfiguration } from '@/common/config/apiConfig';
import { ProjectMilestonesApi } from '@/api-docs';
import type { CreateProjectMilestoneDTO, UpdateProjectMilestoneDTO } from '@/api-docs';

export default class ProjectMilestonesService {
    async getProjectMilestoneByJobId(jobId: string): Promise<any> {
      const api = new ProjectMilestonesApi(await getApiConfiguration());
  
      const response = await api.jobsControllerFindProjectMilestoneByJobId(jobId);
  
      return response.data;
    }
  
    async createProjectMileStone(params: CreateProjectMilestoneDTO): Promise<any> {
      const api = new ProjectMilestonesApi(await getApiConfiguration());
  
      const response = await api.jobsControllerCreateProjectMilestone(params)  
      return response.data;
    }
  
    async updateProjectMileStone(
      params: UpdateProjectMilestoneDTO,
      mileStoneId: string
    ): Promise<void> {
      const api = new ProjectMilestonesApi(await getApiConfiguration());
  
      const response = await api.jobsControllerUpdateProjectMilestone(mileStoneId, params)
  
      return response.data;
    }
  }