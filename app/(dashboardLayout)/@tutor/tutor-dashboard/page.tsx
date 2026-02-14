
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { env } from "@/env";
import TutorDashboardClient from "./TutorDashboardClient";

export const metadata = {
  title: "Skill Bridge | Tutor Dashboard",
  description: "Welcome to dashboard tutor.",
};

async function getTutorProfile() {
  const cookieStore = await cookies();
  const allCookies = cookieStore.toString();

  try {
    const res = await fetch(`${env.NEXT_PUBLIC_FRONTEND_API_URL}/tutor/my-profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cookie": allCookies,
      },
      cache: "no-store",
    });

    if (res.status === 401) return null;
    if (!res.ok) throw new Error("Failed to load profile");

    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("Profile SSR Error:", error);
    return null;
  }
}

export default async function TutorProfilePage() {
  const profile = await getTutorProfile();

  if (!profile) {
    redirect("/login");
  }

  return <TutorDashboardClient initialProfile={profile} />;
}