import NotFound from "@/app/not-found";
import TutorProfile from "@/components/pages/TutorProfile";


interface TutorProfilePageProps {
  params: {
    id: string;
  };
}

async function getTutorById(id: string) {
  try {
    const API =
      process.env.BACKEND_API_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      "http://localhost:5000/api/v1";

    const res = await fetch(`${API}/tutor/profile/${id}`, {
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
  // `params` can be a Promise in some Next.js setups — await to unwrap it safely
  const resolvedParams = await params as { id: string };
  const tutor = await getTutorById(resolvedParams.id);
  
  if (!tutor) {
    return <NotFound />;
  }
  
  return <TutorProfile tutor={tutor} />;
}