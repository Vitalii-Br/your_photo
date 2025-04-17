"use server";
import { cookies } from "next/headers";
import { TokenAuth } from "@/type/type-auth/interfase.token";

export async function setCookiesToken(token: TokenAuth) {
  const { accessToken, refreshToken } = token;
  if (!accessToken || !refreshToken)
    throw new Error(
      "токены в setCookiesToken из dataFormAuth или refreshAccessToken не пришли"
    );

  const createCookie = await cookies();
  const setAccessToken = createCookie.set("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    maxAge: 15 * 60 * 1000,
  });

  const setRefreshToken = createCookie.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });

  return {
    accessToken: setAccessToken,
    refreshToken: setRefreshToken,
  };
}

export async function getCookiesToken(): Promise<TokenAuth | null> {
  const getCookies = await cookies();
  const getAccessToken = getCookies.get("accessToken")?.value;
  const getRefreshToken = getCookies.get("refreshToken")?.value;

  if (!getAccessToken && !getRefreshToken) return null;

  return {
    accessToken: getAccessToken,
    refreshToken: getRefreshToken,
  };
}

export async function dataFormAuth(data: any, props: string) {
  if (!process.env.NEXT_PUBLIC_Auth_Login_URL) {
    throw new Error("URL логина не найден");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_Auth_Login_URL}${props}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data }),
    }
  );
  if (!response.ok) {
    const errorData = await response.json();
    const errorMessage = errorData.message;
    return { error: errorMessage };
  }
  const dataUser = await response.json();
  const { user, role, token } = dataUser;
  if (!token) {
    throw new Error("Токены не получены от сервера");
  }
  await setCookiesToken(token);
  await getAccessToken();
  return { user, role };
}

export async function clearCookieToken() {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
}

// Централизованная функция обновления токена с "замком"
let isRefreshing = false; //указывает, идет ли в данный момент процесс обновления токена.
let refreshPromise: Promise<TokenAuth> | null = null; //возвращает объект TokenAuth (новые токены), или null, если обновление еще не началось.

export async function refreshAccessToken(
  refreshToken: string
): Promise<TokenAuth> {
  if (!process.env.NEXT_PUBLIC_Auth_Refresh_URL) {
    throw new Error("URL для обновления токена отсутствует");
  }

  if (isRefreshing && refreshPromise) {
    //проверяет, не запущен ли уже процесс обновления токена.
    return refreshPromise;
    // Возвращаем существующий промис, если обновление уже идет
  }

  isRefreshing = true;
  refreshPromise = fetch(process.env.NEXT_PUBLIC_Auth_Refresh_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  })
    .then(async (response) => {
      if (!response.ok) throw new Error("Не удалось обновить токен");
      const newToken: TokenAuth = await response.json();
      await setCookiesToken(newToken);
      return newToken;
    })
    .finally(() => {
      isRefreshing = false;
      refreshPromise = null;
    });

  return refreshPromise;
}

export async function getAccessToken(): Promise<TokenAuth | null> {
  const tokens = await getCookiesToken();

  if (!tokens) return null;
  const { accessToken, refreshToken } = tokens;

  if (!accessToken && !refreshToken) return null;

  if (!accessToken && refreshToken) {
    const allToken = await refreshAccessToken(refreshToken);

    return {
      accessToken: allToken.accessToken,
      refreshToken: allToken.refreshToken,
    };
  }
  return { accessToken, refreshToken };
}
