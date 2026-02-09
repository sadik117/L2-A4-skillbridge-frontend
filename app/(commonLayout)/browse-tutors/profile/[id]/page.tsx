import NotFound from "@/app/not-found";
import TutorProfile from "@/components/pages/TutorProfile";
import { userService } from "@/components/services/user.service";


interface TutorProfilePageProps {
  params: {
    tutorId: string;
  };
}

async function getTutorById(tutorId: string) {
  try {
    const API =
      process.env.BACKEND_API_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      "http://localhost:5000/api/v1";

    const res = await fetch(`${API}/tutor/profile/${tutorId}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    const json = await res.json();
    return json.data; 
  } catch {
    return null;
  }
}

export default async function TutorProfilePage({ params }: TutorProfilePageProps) {
  // fetch tutor
  const tutor = await getTutorById(params.tutorId);
  if (!tutor) return <NotFound />;


  return <TutorProfile tutor={tutor} />;
}