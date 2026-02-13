
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { env } from "@/env";
import TutorBookingsClient from "./TutorBookingsClient";

async function getBookingData() {
  const cookieStore = await cookies();
  const allCookies = cookieStore.toString();

  try {
    const res = await fetch(`${env.NEXT_PUBLIC_FRONTEND_API_URL}/booking/tutor-bookings`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cookie": allCookies,
      },
      next: { revalidate: 0 }, // Ensure fresh data on every visit
    });

    if (res.status === 401) return null;
    if (!res.ok) throw new Error("Failed to load dashboard data");

    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error("Dashboard SSR Error:", error);
    return [];
  }
}

export default async function DashboardPage() {
  const initialBookings = await getBookingData();

  if (initialBookings === null) {
    redirect("/login");
  }

  return <TutorBookingsClient initialBookings={initialBookings} />;
}