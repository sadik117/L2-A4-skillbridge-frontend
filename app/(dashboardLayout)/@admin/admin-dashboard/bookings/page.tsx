import { env } from "@/env";
import { cookies } from "next/headers";
import AdminBookingsClient from "./AdminBookingsClient";


async function getAllBookings() {
  const API = env.NEXT_PUBLIC_FRONTEND_API_URL;
  const cookieStore = await cookies();

  try {
    const res = await fetch(`${API}/booking/all-bookings`, {
      headers: {
        "Cookie": cookieStore.toString(),
      },
      next: { revalidate: 0 }, // Ensure admin always sees live data
    });

    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    return [];
  }
}

export default async function AdminBookingsPage() {
  const initialBookings = await getAllBookings();

  return (
    <div className="p-4 md:p-8 bg-zinc-50 dark:bg-zinc-950 min-h-screen">
      <AdminBookingsClient initialBookings={initialBookings} />
    </div>
  );
}