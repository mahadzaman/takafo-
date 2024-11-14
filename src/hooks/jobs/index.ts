import { useMutation } from '@tanstack/vue-query';
import { useQuery } from '@tanstack/vue-query';
import { JobsApis } from '@/stores/apis';
import type { IJobCreation } from '@/stores/modules/jobs_creation';

const useSaveJob = () => {
  return useMutation({
    mutationFn: JobsApis.createJob,
  });
};

const useFetchRequestedJobs = () => {
  return useQuery({
    queryKey: ['fetchRequestedJobs'],
    queryFn: JobsApis.fetchRequestedJobs,
    select: response => response.data.data, // Select only the jobs data
  });
};

const useFetchAssociatedJobs = (enabled = true) => {
  return useQuery({
    queryKey: ['fetchAssociatedJobs'],
    queryFn: JobsApis.fetchAssociatedJobs,
    select: response => response.data.data,
    enabled,
  });
};

const useFetchAllJobs = (enabled = true) => {
  return useQuery({
    queryKey: ['fetchAllJobs'],
    queryFn: JobsApis.fetchAllJobs,
    select: response => response.data.data,
    enabled,
  });
};

const useFetchJob = (jobId: string) => {
  return useQuery({
    queryKey: ['fetchJob', jobId],
    queryFn: () => JobsApis.fetchJob(`${jobId}`),
    select: response => response.data.data,
  });
};

const useFetchJobRap = (jobId: string) => {
  return useQuery({
    queryKey: ['fetchJobRap', jobId],
    queryFn: () => JobsApis.fetchJobRap(`${jobId}`),
    select: response => response.data.data,
  });
};

const useFetchApprovedJobs = () => {
  return useQuery({
    queryKey: ['fetchApprovedJobs'],
    queryFn: JobsApis.fetchApprovedJobs,
    select: response => response.data.data, // Select only the jobs data
  });
};

const useFetchRejectedJobs = () => {
  return useQuery({
    queryKey: ['fetchRejectedJobs'],
    queryFn: JobsApis.fetchRejectedJobs,
    select: response => response.data.data,
  });
};

const useSaveJobAdvert = () => {
  return useMutation({
    mutationFn: JobsApis.createJobAdvert,
  });
};

const useUpdateJobAdvert = () => {
  return useMutation({
    mutationFn: (data: { advertId: string; payload: IJobCreation.JobAdvertPayload }) => 
      JobsApis.updateJobAdvert(data),
  });
};

const useFetchJobAdvert = (jobId: string) => {
  return useQuery({
    queryKey: ['fetchJobAdvert', jobId],
    queryFn: () => JobsApis.fetchJobAdvert(`${jobId}`),
    select: response => response.data.data,
  });
};

export {
  useSaveJob,
  useFetchAllJobs,
  useFetchRequestedJobs,
  useFetchApprovedJobs,
  useFetchRejectedJobs,
  useFetchAssociatedJobs,
  useFetchJobAdvert,
  useSaveJobAdvert,
  useFetchJob,
  useFetchJobRap,
  useUpdateJobAdvert
};
