import { ErrorI } from "../type-error/interface-error";
export interface IDataUser {
  id: number;
  name: string;
  surname: string;
  email: string;
  roleId: number;
  gardenId: number;
  role: {
    name: string;
    permissions: string[];
  };
}

export interface FetchUsersResponse {
  data?: IDataUser[];
  errors?: ErrorI
}
