import type { NextConfig } from "next";
import { env } from "./env";

// const BACKEND_API= env.NEXT_PUBLIC_BACKEND_URL

const nextConfig: NextConfig = {
  
  // for production
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: "https://skill-bridge-server-beta.vercel.app/api/auth/:path*",
      },
    ];
  },
  
};


export default nextConfig;
