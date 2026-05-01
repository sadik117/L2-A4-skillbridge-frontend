import type { NextConfig } from "next";
import { env } from "./env";

// const BACKEND_API= env.NEXT_PUBLIC_BACKEND_URL

const nextConfig: NextConfig = {
  
  async rewrites() {
    // Route auth requests to local backend in development, otherwise to production
    const isDev = process.env.NODE_ENV !== 'production';
    const destination = isDev 
      ? "http://localhost:5000/api/auth/:path*" 
      : "https://skill-bridge-server-beta.vercel.app/api/auth/:path*";
      
    return [
      {
        source: "/api/auth/:path*",
        destination,
      },
    ];
  },
  
};


export default nextConfig;
