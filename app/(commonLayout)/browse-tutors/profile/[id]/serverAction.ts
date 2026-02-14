"use server";

import { env } from "@/env";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function bookSessionAction(tutorId: string, slotId: string) {
  const API = env.NEXT_PUBLIC_FRONTEND_API_URL;
  const cookieStore = await cookies();

  try {
    const res = await fetch(`${API}/booking/book-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cookie": cookieStore.toString(),
      },
      body: JSON.stringify({ tutorId, slotId }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, message: data.message || "Booking failed" };
    }

    revalidatePath(`/tutor/profile/${tutorId}`);
    return { success: true };
  } catch (err) {
    return { success: false, message: "Network error. Please try again." };
  }
}