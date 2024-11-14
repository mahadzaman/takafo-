import { IApp } from '@/interfaces';
import type { SidebarLinks } from '@/interfaces/sidebar-link.interface';

// Define the structure for sidebar links

// Define the navigation links based on roles
const navsideLinks: Record<IApp.RoleEnum | string, SidebarLinks[]> = {
  [IApp.RoleEnum.RECRUITER]: [
    {
      title: 'Workspace',
      icon: 'dashboard',
      link: '/user/workspace',
      roles: [IApp.RoleEnum.RECRUITER],
      children: [],
    },
    {
      title: 'AI Candidates',
      icon: 'user-speak',
      link: '/jr-status',
      roles: [IApp.RoleEnum.RECRUITER],
      children: [],
    },
    {
      title: 'Settings',
      icon: 'gear',
      link: '/settings',
      roles: [IApp.RoleEnum.RECRUITER],
      children: [],
    },
  ],
  [IApp.RoleEnum.HIRING_MANAGER]: [
    {
      title: 'Workspace',
      icon: 'dashboard',
      link: '/user/workspace',
      roles: [IApp.RoleEnum.HIRING_MANAGER],
      children: [],
    },
    {
      title: 'Settings',
      icon: 'gear',
      link: '/settings',
      roles: [IApp.RoleEnum.HIRING_MANAGER],
      children: [],
    },
  ],
  [IApp.RoleEnum.TALENT_PARTNER]: [],
  [IApp.RoleEnum.ADMIN]: [],
  [IApp.RoleEnum.CANDIDATE]: [],
  [IApp.RoleEnum.MAN_POWER_PLANNING]: [],
  [IApp.RoleEnum.HEAD_OF_TALENT]: [],
};

// Function to retrieve navigation links based on role
export function getNavsideLinks(
  role: IApp.RoleEnum.RECRUITER | string
): SidebarLinks[] {
  return navsideLinks[role] || [];
}
