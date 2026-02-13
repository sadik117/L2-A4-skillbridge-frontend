import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { env } from "@/env";
import TutorAvailabilityClient from "./TutorAvailabilityClient";

async function getExistingAvailability() {
  const cookieStore = await cookies();
  const allCookies = cookieStore.toString();

  try {
    const res = await fetch(`${env.NEXT_PUBLIC_FRONTEND_API_URL}/tutor/my-availability`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cookie": allCookies,
      },
      cache: "no-store",
    });

    if (res.status === 401) return null;
    if (!res.ok) return [];

    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default async function AvailabilityPage() {
  const existingSlots = await getExistingAvailability();

  if (existingSlots === null) {
    redirect("/login");
  }

  return <TutorAvailabilityClient initialSlots={existingSlots} />;
}