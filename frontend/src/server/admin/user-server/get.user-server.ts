"use server";
import { instance } from "@/app/axios.interceptor";
import { FetchUsersResponse } from "@/type/type-user/interfase.data-user";
import { errorMessage } from "@/app/axios.inperceptor_helper";

export async function fetchUsers(): Promise<FetchUsersResponse> {
  try {
    const response = await instance({
      url: "/API-photo/user/allUser",
      method: "GET",
    });

    if (!response.data) throw new Error("данные с бэкэнда не пришли");
    return { data: response.data };
  } catch (error: any) {
    const userError = errorMessage(error);
    return {
      errors: {
        message: userError || "Авторизируйтесь ",
        status: error.status,
      },
    };
  }
}
