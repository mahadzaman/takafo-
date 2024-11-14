import { defineStore } from 'pinia';
import { ref } from 'vue';
import { JobsApis } from '@/stores/apis';
import type { IJobCreation } from '.';

//  Todo -> migrate this store to the job store module
export const useJobCreationStore = defineStore('jobs_creation', () => {
  const jobPayload = ref<IJobCreation.CreateJobPayload>({
    contract_type: '',
    opportunity_type: '',
    requisition_title: '',
    business_case: '',
    lk_assessment_id: '',
    lk_hiring_type_id: '',
    lk_location_id: '',
    lk_budjet_id: '',
    rolesResponsibility: '',
    category_id: '', //'d35a8b4d-15ae-4dbb-82c0-1be5d43b9a7c'
    hiring_type: '',
    hiring_count: 0,
    grade: '',
    location: '',
    budget_type: '',
    budget_year: '',
    purpose: '',
    assests: '',
    platform: '',
    unit: '',
    uae_expat: '',
    jobAssociation: [],
  });

  const saveJob = async (saveJobPayLoad: IJobCreation.CreateJobPayload) => {
    try {
      const response = await JobsApis.createJob(saveJobPayLoad);

      console.log(response, 'response');
    } catch (error) {
      // Handle error
      console.error('Error creating job:', error);
    }
  };

  return {
    jobPayload,
    saveJob,
  };
});
