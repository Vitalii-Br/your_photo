import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  /* config options here */
  
 async rewrites() {
  return [
    {
      source: '/API-photo/:path*',  // Перехватываем все запросы, начинающиеся с /api
      destination: 'http://localhost:4200/API-photo/:path*', // Проксируем на сервер NestJS на порту 4200
    },
  ];
},
 output: "standalone",// для dev режима
};

export default nextConfig;

