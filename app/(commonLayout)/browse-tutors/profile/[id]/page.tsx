import { notFound } from "next/navigation";
import { env } from "@/env";
import TutorProfile from "@/components/pages/TutorProfile";

async function getTutor(id: string) {
  const API = env.NEXT_PUBLIC_FRONTEND_API_URL;
  const res = await fetch(`${API}/tutor/profile/${id}`, { cache: "no-store" });
  if (!res.ok) return null;
  const json = await res.json();
  return json.data;
}

export default async function TutorProfilePage({ params }: { params: { tutorId: string } }) {
  const tutor = await getTutor(params.tutorId);
  if (!tutor) notFound();

  return <TutorProfile tutor={tutor} />;
}