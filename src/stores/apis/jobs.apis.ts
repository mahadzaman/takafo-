import axios, { type AxiosResponse } from 'axios';
import JobUrls from '@/stores/urls/jobs.urls';
import { IJobCreation } from '@/stores/modules/jobs_creation';
import { JobsUrls } from '../urls';

// Define the API calls
const createJob = async (payload: IJobCreation.CreateJobPayload) => {
  return await axios.post(JobUrls.JOBS, payload);
};

const fetchAllJobs = async () => {
  return await axios.get(`${JobUrls.JOBS}`);
};

const fetchAllQuestions = async () => {
  return await axios.get(`${JobUrls.QUESTIONS}`);
};

const fetchJob = async (jobId: string) => {
  return await axios.get(`${JobUrls.JOBS_DETAILS}/${jobId}`);
};

const fetchJobRap = async (jobId: string) => {
  return await axios.get(`${JobUrls.RAP}/${jobId}`);
};

const fetchRequestedJobs = async () => {
  return await axios.get(`${JobUrls.REQUESTED_JOBS}`);
};

const fetchAssociatedJobs = async () => {
  return await axios.get(`${JobUrls.ASSOCIATED_JOBS}`);
};

const fetchApprovedJobs = async () => {
  return await axios.get(`${JobUrls.APPROVED_JOBS}`);
};

const fetchRejectedJobs = async () => {
  return await axios.get(`${JobUrls.REJECTED_JOBS}`);
};

const fetchJobAdvert = async (jobId: string) => {
  return await axios.get(`${JobUrls.ADVERT}/${jobId}`);
};

const updateJobAdvert = async ({ advertId, payload }: { advertId: string; payload: IJobCreation.JobAdvertPayload }) => {
  return await axios.patch<AxiosResponse<any, any>>(`${JobsUrls.ADVERT}/${advertId}`, payload);
};

const createJobAdvert = async (payload: IJobCreation.JobAdvertPayload) => {
  return await axios.post(JobsUrls.ADVERT, payload);
};

export default {
  createJob,
  fetchAllJobs,
  fetchRequestedJobs,
  fetchApprovedJobs,
  fetchRejectedJobs,
  fetchAssociatedJobs,
  createJobAdvert,
  fetchJob,
  fetchJobRap,
  fetchJobAdvert,
  updateJobAdvert,
  fetchAllQuestions
};
