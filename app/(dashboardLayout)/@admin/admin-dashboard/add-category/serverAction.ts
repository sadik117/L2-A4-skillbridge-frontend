"use server";

import { env } from "@/env";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function createCategoryAction(formData: { name: string; slug: string }) {
  const API = env.NEXT_PUBLIC_FRONTEND_API_URL;
  const cookieStore = await cookies();

  try {
    const res = await fetch(`${API}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cookie": cookieStore.toString(),
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      return { 
        success: false, 
        message: data.message || "Failed to create category" 
      };
    }

    revalidatePath("/admin-dashboard/add-category");
    
    return { success: true };
  } catch (err) {
    return { 
      success: false, 
      message: "A network error occurred. Please try again." 
    };
  }
}