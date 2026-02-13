
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import StudentProfileClient from "./StudentProfileClient";
import { env } from "@/env";

async function getStudentProfile() {
  const cookieStore = await cookies();
  const allCookies = cookieStore.toString();

  const API = env.NEXT_PUBLIC_FRONTEND_API_URL;

  try {
    const res = await fetch(`${API}/student/my-profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Forwarding the browser cookies to the backend
        "Cookie": allCookies,
      },
      // SSR requirement: do not cache this so it's always fresh per user
      cache: "no-store",
    });

    if (res.status === 401) {
      return null;
    }

    if (!res.ok) {
      throw new Error("Failed to fetch profile data");
    }

    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("SSR Fetch Error:", error);
    return null;
  }
}

export default async function StudentProfilePage() {
  const profileData = await getStudentProfile();

  // If unauthorized, redirect to login page immediately
  if (!profileData) {
    redirect("/login");
  }

  return <StudentProfileClient initialData={profileData} />;
}