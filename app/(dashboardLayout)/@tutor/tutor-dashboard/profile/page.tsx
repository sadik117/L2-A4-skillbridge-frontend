import { env } from "@/env";
import TutorSetupClient from "./TutorSetupClient";


async function getCategories() {
  try {
    const res = await fetch(`${env.NEXT_PUBLIC_FRONTEND_API_URL}/categories`, {
      next: { revalidate: 3600 }, // Cache categories for an hour
    });
    const json = await res.json();
    return json?.success && Array.isArray(json.data) ? json.data : [];
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
}

export default async function SetupProfilePage() {
  const categories = await getCategories();
  
  // Optional: Check if user already has a profile and redirect to dashboard
  // This prevents tutors from "re-creating" their base profile accidentally.

  return <TutorSetupClient initialCategories={categories} />;
}