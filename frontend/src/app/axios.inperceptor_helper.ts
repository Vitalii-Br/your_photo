

export const errorMessage = (error: any): string  => {

  const allMethod = ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"];
  const method: string = error?.response?.config?.method?.toUpperCase() || "";
  const findMethob = allMethod.find((ell) => ell === method);

  const status = error?.response?.status;
  const url = error?.response?.config?.url;

  if (status === 404) {
    return `Ошибка: проверьте ваш url: сейчас он (${url})`;
  } else if (status === 400) {
    if (!findMethob) {
      return `Ошибка: проверьте написание method: Сейчас написано(${method})`;
    } 
  }else if (error.status === 401) {
        return error.message; 
  }

  const message = error?.response?.data?.message;
  return message
    ? typeof error.response.data.message == "object"
      ? message[0]
      : message
    : error.message;
};
