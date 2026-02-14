
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { env } from "@/env";
import StudentDashboardClient from "./StudentDashboardClient";

export const metadata = {
  title: "Skill Bridge | Student Dashboard",
  description: "Welcome to dashboard dear student.",
};

async function getProfileData() {
  const cookieStore = await cookies();
  const allCookies = cookieStore.toString();

  try {
    const res = await fetch(`${env.NEXT_PUBLIC_FRONTEND_API_URL}/student/my-profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cookie": allCookies,
      },
      cache: "no-store",
    });

    if (res.status === 401) return null;
    if (!res.ok) throw new Error("Failed to fetch profile");

    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("Dashboard SSR Error:", error);
    return null;
  }
}

export default async function DashboardPage() {
  const profile = await getProfileData();

  if (!profile) {
    redirect("/login");
  }

  return <StudentDashboardClient initialProfile={profile} />;
}