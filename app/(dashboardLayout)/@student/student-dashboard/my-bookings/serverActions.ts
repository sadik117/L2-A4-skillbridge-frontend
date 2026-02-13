"use server"

import { cookies } from "next/headers";
import { env } from "@/env";

export async function submitReviewAction(bookingId: string, rating: number, comment: string) {
  const cookieStore = await cookies();
  const allCookies = cookieStore.toString();

  try {
    const res = await fetch(`${env.NEXT_PUBLIC_FRONTEND_API_URL}/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: allCookies,
      },
      body: JSON.stringify({ bookingId, rating, comment }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { 
        success: false, 
        message: data.message || "Review submission failed",
        duplicate: data.message?.includes("already reviewed") 
      };
    }

    return { success: true };
  } catch (err: any) {
    console.log(err);
    return { success: false, message: "Internal Server Error" };
  }
}