import { NextResponse, NextRequest } from "next/server";
import axios, { AxiosError } from "axios";


const api = axios.create({
  baseURL: "http://localhost:4200", // Базовый URL для всех запросов
});
export async function POST(req: NextRequest) {
  const data = await req.json();
  console.log("Request data:", data);
  try {
    const response = await api.post("/API-photo/auth/login", data, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("Response from NestJS:", response.data);
    return NextResponse.json({ ...response.data }, { status: 200 });
  } catch (error: any) {
    console.error("Axios error:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      headers: error.response?.headers,
    });
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


/*
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const response = await axios.post(
      "http://localhost:4200/API-photo/auth/login",data,
      // {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // }
    );

    console.log('API Data login =', data);
    console.log('API Response login =', response.data);

    // Return the response data
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

*/

// export async function POST(req: NextRequest) {
//   const data = await req.json();
//   const response = await axios.post("/API-photo/auth/login", data, {
//     headers: { "Content-Type": "application/json" },
//   });
//    console.log('API Data login =',data)
//   console.log("API Response login =", response.data);
//   return NextResponse.json({ ...response.data }, { status: 200 });
// }

export async function GET() {
  const array = {
    name: "ivan",
    age: 10,
  };

  return NextResponse.json({ ...array });
}
