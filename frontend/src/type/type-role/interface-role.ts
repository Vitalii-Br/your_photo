import { ErrorI } from "../type-error/interface-error";


export interface DataRoleI {
data?: RoleI[],
errors?: ErrorI
}

export interface RoleI {
  id: number;
  name: string;
  permissions: PermissionsI[];
}

export interface PermissionsI {
  actions: ActionsI[];
  id: number;
  resource: string;
}

export interface ActionsI {
  delete: string;
  create: string;
  update: string;
  read: string;
}
