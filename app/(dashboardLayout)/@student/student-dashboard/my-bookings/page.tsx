
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { env } from "@/env";
import { isPast, parseISO } from "date-fns";
import StudentBookingsClient from "./StudentBookingsClient";


/* Fetch Bookings (SSR) */
export async function getMyBookings() {
  const cookieStore = await cookies();
  const allCookies = cookieStore.toString();

  try {
    const res = await fetch(`${env.NEXT_PUBLIC_FRONTEND_API_URL}/student/my-bookings`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: allCookies,
      },
      cache: "no-store",
    });

    if (res.status === 401) return null;
    if (!res.ok) throw new Error("Failed to fetch bookings");

    const json = await res.json();

    return json.data.map((b: any) => ({
      ...b,
      status: b.status === "CONFIRMED" && isPast(parseISO(b.endTime))
        ? "COMPLETED"
        : b.status,
    }));
  } catch (err) {
    console.error("SSR Fetch Error:", err);
    return [];
  }
}


/* Page Component */
export default async function BookingsPage() {
  const initialData = await getMyBookings();

  if (initialData === null) redirect("/login");

  return <StudentBookingsClient initialBookings={initialData} />;
}
