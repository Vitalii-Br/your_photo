// pages/api/check-auth.js
import { parse } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cookies = parse(req.headers.cookie || "");
  const token = cookies.auth_token;

  console.log('cookies =',cookies)
  if (!token) {
      return res.status(401).json({ message: "Токен не найден" });
    }
    
    // Проверка токена (например, отправка на бэкенд Nest.js)
    const response = await fetch("/API-photo/auth/login", {
        headers: { Authorization: `Bearer ${token}` },
    });
    console.log(' Coocie - response =',response)

  if (!response.ok) {
    return res.status(401).json({ message: "Недействительный токен" });
  }

  const data = await response.json();
  return res.status(200).json(data);
}

