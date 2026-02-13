"use server";

import { cookies } from "next/headers";
import { env } from "@/env";

interface TutorProfileInput {
  bio: string;
  hourlyRate: number;
  experience: number;
  categoryId: string;
}

export async function submitTutorProfile(data: TutorProfileInput) {
  const cookieStore = await cookies();
  const allCookies = cookieStore.toString();

  try {
    const res = await fetch(`${env.NEXT_PUBLIC_FRONTEND_API_URL}/tutor/profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: allCookies,
      },
      body: JSON.stringify(data),
    });

    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.message || "Failed to save profile");
    }

    return { success: true };
  } catch (err: any) {
    console.error("Server Action Error:", err);
    throw new Error(err.message || "Server error occurred");
  }
}
