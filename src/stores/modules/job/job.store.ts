import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { IJob } from '.';
import { JobTypes } from './job.interface';
import JobRAPService from '@/services/JobRAPService';

export const useJobStore = defineStore('job', () => {
  // ****** State ******
  const selectedJob = ref<IJob.Job>({} as IJob.Job);

  const selectedJrStatus = ref(JobTypes.ASSIGNED_JRS as string);
  
  const jobRapApi = new JobRAPService();

  const jobRAP = ref<IJob.JobRap>({} as IJob.JobRap);


  const fetchJobRAP = async (jobId: string) => {
    // console.log(jobRAP.value);

    const findJobId = Object.entries(jobRAP.value)
      .map(([key, value]) => ({
        [key]: value,
      }))
      .find(item => item.job_id);

    if (
      Object.entries(jobRAP.value).length > 0 &&
      findJobId &&
      findJobId.job_id === jobId
    ) {
      return jobRAP.value;
    }

    try {
      const { data } = await jobRapApi.getJobRAPByJobId(jobId);

      if (data) {
        jobRAP.value = data;

        return data;
      }
    } catch (error) {
      console.log(error);

      return error;
    }
  };

  const setJobRAP = (moduleStatus: any) => {
    let key = Object.keys(moduleStatus)[0] as keyof IJob.JobRap;

    if (jobRAP.value) {
      jobRAP.value[key] = moduleStatus[key];
    }
  };

  // ****** Setter ******
  const setSelectedJob = (status: IJob.Job) => {
    selectedJob.value = status;
  };

  // ****** Getter ******

  const getSelectedJob = (): IJob.Job => {
    return selectedJob.value;
  };

  return {
    // ****** State Value ****** //
    selectedJrStatus,
    // ****** Mutations ****** //
    setSelectedJob,
    // ****** Getters ****** //
    getSelectedJob,
    fetchJobRAP,
    setJobRAP,
    jobRAP,
  };
});
