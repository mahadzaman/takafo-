export namespace DataTable {
  export interface Header {
    title: string;
    value: string;
    key?: string;
    sortable?: boolean;
    actionsList: ActionsList[];
  }

  export interface ActionsList {
    action: string;
    toParent: string;
    noAction: string[];
  }
  export interface Items {
    [key: string]: any;
  }
}
