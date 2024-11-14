// useStatusClass.ts
import { JobStatus } from '@/constants/jobStatus';

export function useStatusClass() {
  function statusClass(status: string) {
    return {
        'text-white bg-info radius-14 px-2 py-1': status === JobStatus.PUBLISHED,
        'text-white bg-success radius-14 px-2 py-1': status === JobStatus.DRAFTED,
        'text-white bg-warning radius-14 px-2 py-1': status === JobStatus.PENDING,
        'text-white bg-green radius-14 px-2 py-1': status === JobStatus.APPROVED,
        'text-white bg-danger radius-14 px-2 py-1': status === JobStatus.REJECTED,
    };
  }

  return {
    statusClass,
  };
}
