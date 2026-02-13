"use server";

import { env } from "@/env";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

type Slot = {
  startTime: string; 
  endTime: string;  
  daysOfWeek?: string[];
  date?: string | null; 
};

export const postAvailability = async (slots: Slot[]) => {
  const API = env.NEXT_PUBLIC_FRONTEND_API_URL;
  const cookieStore = await cookies();

  try {
    const formattedSlots = slots.map(slot => {
      // Used a fixed date string for time-only slots to avoid timezone shifting issues
      const baseDate = slot.date || "2026-01-01"; 
      return {
        startTime: new Date(`${baseDate}T${slot.startTime}`),
        endTime: new Date(`${baseDate}T${slot.endTime}`),
        daysOfWeek: slot.daysOfWeek || [],
      };
    });

    const res = await fetch(`${API}/tutor/set-availability`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Manually forwarding the user's session cookies
        "Cookie": cookieStore.toString(),
      },
      body: JSON.stringify({ slots: formattedSlots }),
      // Ensures redirects (like 307) are followed correctly on the server
      redirect: "follow", 
    });

    const data = await res.json();

    if (!res.ok) {
      return { 
        success: false, 
        message: data.message || `Error: ${res.statusText}` 
      };
    }

    // Refresh the dashboard or profile data
    revalidatePath("/tutor-dashboard");
    
    return { success: true, message: "Availability saved successfully" };
  } catch (err) {
    console.error("Availability Post Error:", err);
    return { success: false, message: "Network error. Please try again." };
  }
};