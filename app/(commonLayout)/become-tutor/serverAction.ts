"use server";

import { env } from "@/env";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function updateRoleToTutor() {
  const API = env.NEXT_PUBLIC_FRONTEND_API_URL;
  const cookieStore = await cookies();
  
  try {
    const res = await fetch(`${API}/user/role`, {
      method: "PATCH",
      headers: { 
        "Content-Type": "application/json",
        "Cookie": cookieStore.toString(),
      },
      body: JSON.stringify({ role: "TUTOR" }),
      // 307 often happens because of automatic redirects. 
      // 'follow' is default, but 'manual' lets you see what's happening.
      redirect: "follow", 
    });

    // If the response URL is different from your API URL, a redirect happened
    if (res.redirected) {
       console.log("Redirected to:", res.url);
       // If it redirects to a login page, the session is likely expired
       if (res.url.includes("login")) {
         return { success: false, message: "Session expired. Please log in again." };
       }
    }

    const data = await res.json();

    if (!res.ok) {
      return { success: false, message: data.message || "Failed to update role" };
    }

    revalidatePath("/");
    return { success: true };
  } catch (err) {
    console.error("Action Error:", err);
    return { success: false, message: "A connection error occurred." };
  }
}