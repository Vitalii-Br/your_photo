"use server";
// app/api/check-auth/route.js (или Server Action)

import { NextResponse } from "next/server";
import { cookies, headers } from "next/headers";

export async function validateToken() {
  const response = await fetch(
    "http://localhost:4200/API-photo/auth/tokenByFront",
    {
      method: "GET",
      credentials: "include", // Отправляет cookie с запросом
    }
  );

  if (!response.ok) {
    return new Response(JSON.stringify({ isAuthenticated: false }), {
      status: 401,
    });
  }

  const data = await response.json();

  console.log("data =", data);
  return new Response(
    JSON.stringify({ isAuthenticated: true, user: data.dataUser }),
    { status: 200 }
  );
}

// ===========================

export async function getUserToken() {
  const serverCookie = await cookies();
  const refreshToken = serverCookie.get("refreshToken")?.value;


}
