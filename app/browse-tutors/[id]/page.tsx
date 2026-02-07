// app/tutors/[id]/page.tsx
import { notFound } from "next/navigation";
import TutorProfile from "@/app/tutor-profile/page";
import { env } from "@/env";


// Local fallback for getTutorById to avoid missing-module compile errors.
// Replace this with the real implementation or restore the original import
// from "@/lib/actions/tutor.actions" once that module exists.
async function getTutorById(id: string) {
  // Example implementation: fetch from an API endpoint (adjust URL as needed)
  try {
    const API = env.BACKEND_API_URL || "";
    const res = await fetch(`${API}/tutor/profile/:${encodeURIComponent(id)}`);
    if (!res.ok) return null;
    return (await res.json()) as any;
  } catch {
    return null;
  }
}

interface TutorProfilePageProps {
  params: {
    id: string;
  };
}

export default async function TutorProfilePage({ params }: TutorProfilePageProps) {
  const tutor = await getTutorById(params.id);
  
  if (!tutor) {
    notFound();
  }
  
  return <TutorProfile tutor={tutor} />;
}