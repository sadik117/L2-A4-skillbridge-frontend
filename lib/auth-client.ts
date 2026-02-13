// import { createAuthClient } from "better-auth/react";

// export const authClient = createAuthClient({
//   baseURL: "https://skill-bridge-server-beta.vercel.app", // only the auth endpoint
//   fetchOptions: {
//     credentials: "include", // MUST include cookies
//   },
// });

import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: typeof window !== "undefined" ? window.location.origin : "",
  basePath: "/api/auth",
  fetchOptions: {
    credentials: "include",
  },
});
