import { createEnv } from "@t3-oss/env-nextjs"; 
import * as z from "zod";

export const env = createEnv({
 
  server: {
    BACKEND_API_URL: z.url(),
    AUTH_API_URL: z.url(),
  },
  
  client: {
    NEXT_PUBLIC_FRONTEND_API_URL: z.url(),
  },
 
  runtimeEnv: {
    NEXT_PUBLIC_FRONTEND_API_URL: process.env.NEXT_PUBLIC_FRONTEND_API_URL,
    BACKEND_API_URL: process.env.BACKEND_API_URL,
    AUTH_API_URL: process.env.AUTH_API_URL,
  },
});