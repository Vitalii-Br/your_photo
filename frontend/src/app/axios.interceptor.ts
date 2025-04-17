import axios from "axios";
import { getAccessToken } from "@/server/action/server-auth.action";
import { errorMessage } from "./axios.inperceptor_helper";
import { clearCookieToken } from "@/server/action/server-auth.action";

const axiosOption = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
};

export const instance = axios.create(axiosOption);
export const classic = axios.create(axiosOption);

instance.interceptors.request.use(async (config) => {
  const token = await getAccessToken();

  console.log(" instance- token =", token);
  if (token?.accessToken)
    config.headers.Authorization = `Bearer ${token.accessToken}`;

  return config;
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      (error?.response?.status === 401 ||
        errorMessage(error) === "jwt expired") &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;

      try {
        const token = await getAccessToken();
        if (!token) {
          return Promise.reject({
            message:
              "instance:  отсутствует accessToken, необходимо залогинется",
            status: error?.response?.status,
          });
        }
        originalRequest.headers.Authorization = `Bearer ${token.accessToken}`;
        return instance.request(originalRequest);
      } catch (err) {
        await clearCookieToken();
        console.log(
          "Ошибка при обновлении токена, требуется повторная авторизация"
        );

        return Promise.reject(
          new Error(" instance Требуется повторная авторизация")
        );
      }
    }

    return Promise.reject(error); // Передаём ошибку дальшеответить
  }
);
