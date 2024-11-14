import type { IApp } from ".";

export interface SidebarLinks {
  title: string;
  icon: string;
  link: string;
  children?: SidebarLinks[];
  roles?: IApp.RoleEnum[];
}

