"use server";

import { env } from "@/env";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function updateUserStatusAction(userId: string, status: "ACTIVE" | "BANNED") {
  const API = env.NEXT_PUBLIC_FRONTEND_API_URL;
  const cookieStore = await cookies();

  try {
    const res = await fetch(`${API}/admin/user-status/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Cookie": cookieStore.toString(),
      },
      body: JSON.stringify({ status }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, message: data.message || "Action failed" };
    }

    revalidatePath("/admin/users");
    return { success: true };
  } catch (err) {
    return { success: false, message: "Network error occurred." };
  }
}