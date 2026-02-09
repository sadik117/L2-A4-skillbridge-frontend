import { env } from "@/env";
import { cookies } from "next/headers";

const AUTH_URL = env.AUTH_API_URL;

export const userService = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();
      const token = cookieStore.get("better-auth.session_token")?.value;

      if (!token) {
        return { data: null, error: { message: "No session cookie found" } };
      }

      const res = await fetch(`${AUTH_URL}/get-session`, {
        headers: {
          Cookie: `better-auth.session_token=${token}`, 
        },
        cache: "no-store",
      });

      if (!res.ok) {
        return { data: null, error: { message: "Session fetch failed" } };
      }

      const session = await res.json();

      // console.log(session);

      if (!session) {
        return { data: null, error: { message: "Session is missing." } };
      }

      return { data: session, error: null };
    } catch (err) {
      console.error(err);
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
};
