// middleware.js
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  // const cookieStore = req.cookies;
  // const accessToken = cookieStore.get('access_token')?.value;
  // const refreshToken = cookieStore.get('refresh_token')?.value;

  // console.log('middleware - cookieStore =',cookieStore)
  // console.log('middleware - accessToken =',accessToken)
  // console.log('middleware - refreshToken =',refreshToken)

  // if (!accessToken && !refreshToken) {
  //   return NextResponse.redirect(new URL("/login", req.url));
  // }

  // const headers = new Headers();
  // if (accessToken) {
  //   headers.set('Authorization', `Bearer ${accessToken}`);
  // }

//   try {
//     const res = await fetch("http://localhost:4200/API-photo/auth/tokenByFront", {
//       method: "GET",
//       credentials: "include",
//       headers,
//     });

//     if (!res.ok) {
//       if (res.status === 401 && refreshToken) {
//         // Try to refresh token
//         const refreshResponse = await fetch("http://localhost:4200/API-photo/auth/refresh", {
//           method: "POST",
//           credentials: "include",
//           headers: {
//             "Cookie": `refresh_token=${refreshToken}`
//           }
//         });

//         if (refreshResponse.ok) {
//           const response = NextResponse.next();
//           return response; // New tokens will be set in cookies
//         }
//       }
//       return NextResponse.redirect(new URL("/login", req.url));
//     }

//     const data = await res.json();
//     const response = NextResponse.next();
//     response.headers.set("x-user", JSON.stringify(data));
//     return response;

//   } catch (error) {
//     console.error('Middleware error:', error);
//     return NextResponse.redirect(new URL("/login", req.url));
//   }
// }

// export const config = {
//   matcher: ["/protected/:path*"],
};


//================================

/*
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const headers = new Headers();
  const cookie = req.headers.get("cookie");
  if (cookie) {
    headers.set("cookie", cookie); // Устанавливаем только если cookie не null
  }

  console.log(' middleware- Cookie =',cookie)
  
  const res = await fetch("http://localhost:4200/API-photo/auth/tokenByFront", {
    method: "GET",
    credentials: "include",
    headers, // Передаём объект Headers
  });

  console.log(' middleware- Res =',res)
  
  if (!res.ok) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  
  const data = await res.json();
  const response = NextResponse.next();
  response.headers.set("x-user", JSON.stringify(data.dataUser));
  console.log(' middleware - data =',data)
  return response;
}

export const config = {
  matcher: ["/protected/:path*"],
};
*/