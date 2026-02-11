"use client";

import { useEffect, useState } from "react";
import { env } from "@/env";
import { PageLoadingSpinner } from "@/components/layouts/LoadingSpinner";
import TutorCard from "@/components/layouts/TutorCard";


interface Tutor {
  id: string;
  bio: string;
  hourlyRate: number;
  user: {
    name: string;
    email: string;
  };
  category: {
    name: string;
  };
  reviews: unknown[];
}

const API_URL = env.NEXT_PUBLIC_FRONTEND_API_URL

export default function BrowseTutors() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await fetch(`${API_URL}/tutor/browse-tutors`);
        const json = await response.json();
        if (json.success) setTutors(json.data);
      } catch (error) {
        console.error("Failed to fetch tutors", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, []);

  if (loading) return <PageLoadingSpinner></PageLoadingSpinner>;

  return (
    <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {tutors.map((tutor: Tutor) => (
        <TutorCard key={tutor.id} tutor={tutor} />
      ))}
    </div>
  );
}