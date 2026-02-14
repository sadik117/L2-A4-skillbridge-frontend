"use server";

import { env } from "@/env";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function updateBookingStatusAction(bookingId: string) {
  const API = env.NEXT_PUBLIC_FRONTEND_API_URL;
  const cookieStore = await cookies();

  try {
    const res = await fetch(`${API}/booking/complete/${bookingId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Cookie": cookieStore.toString(), // Passes auth session to backend
      },
    });

    const data = await res.json();

    if (!res.ok) {
      return { 
        success: false, 
        message: data.message || "Failed to update booking status" 
      };
    }

    // Refresh the data on the current page without a full reload
    revalidatePath("/tutor/bookings");
    
    return { success: true };
  } catch (err) {
    return { 
      success: false, 
      message: "A network error occurred. Please try again." 
    };
  }
}