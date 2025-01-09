import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
 async rewrites() {
  return [
    {
      source: '/api/:path*',  // Перехватываем все запросы, начинающиеся с /api
      destination: 'http://localhost:4200/api/:path*', // Проксируем на сервер NestJS на порту 4200
    },
  ];
},
};

export default nextConfig;
