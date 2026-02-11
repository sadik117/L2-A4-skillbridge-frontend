import Link from "next/link";
import Image from "next/image";
import {
  Star,
  MapPin,
  Award,
  Users,
  Clock,
  BookOpen,
  ChevronRight,
} from "lucide-react";
import { env } from "@/env";

type Tutor = {
  id: string;
  bio: string;
  hourlyRate: number;
  avgRating: number;
  totalReviews: number;
  experience?: string;
  location?: string;
  subjects?: string[];
  user: {
    name: string;
    image?: string;
  };
  category: {
    name: string;
  };
};

const API = env.NEXT_PUBLIC_FRONTEND_API_URL;

// Optional fallback if API fails
const mockTutors: Tutor[] = [
  {
    id: "1",
    user: {
      name: "Dr. Sarah Johnson",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    category: { name: "Mathematics & Physics" },
    bio: "PhD in Physics with 10+ years experience. Specializing in calculus, algebra, and quantum mechanics.",
    hourlyRate: 45,
    avgRating: 4.9,
    totalReviews: 128,
    experience: "10+ years",
    location: "New York, NY",
    subjects: ["Calculus", "Physics", "Algebra"],
  },
  {
    id: "2",
    user: {
      name: "Michael Chen",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    },
    category: { name: "Programming & Web Dev" },
    bio: "Full-stack developer with 8+ years experience. Expert in React, Node.js, and Python.",
    hourlyRate: 60,
    avgRating: 4.8,
    totalReviews: 96,
    experience: "8+ years",
    location: "San Francisco, CA",
    subjects: ["React", "Node.js", "Python"],
  },
  {
    id: "3",
    user: {
      name: "Maria Gonzalez",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
    },
    category: { name: "Spanish & ESL" },
    bio: "Native Spanish speaker with 7+ years teaching experience. Specializes in conversational Spanish and exam prep.",
    hourlyRate: 35,
    avgRating: 5.0,
    totalReviews: 84,
    experience: "7+ years",
    location: "Miami, FL",
    subjects: ["Spanish", "ESL", "Conversation"],
  },
];

// ISR Fetch Function
async function getFeaturedTutors(): Promise<Tutor[]> {
  try {
    const res = await fetch(`${API}/tutor/featured`, {
      next: { revalidate: 60 }, // Regenerate every 60 seconds
    });
    const json = await res.json();
    if (json?.success) return json.data;
    return mockTutors; // fallback
  } catch (err) {
    console.error("Failed to fetch tutors:", err);
    return mockTutors; // fallback
  }
}

export default async function FeaturedTutors() {
  const tutors = await getFeaturedTutors();

  return (
    <section className="relative overflow-hidden py-10 md:py-16 bg-background transition-colors duration-300">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[radial-gradient(50%_50%_at_50%_0%,rgba(124,58,237,0.06)_0%,transparent_100%)] pointer-events-none" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Award className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Top Rated Instructors</span>
          </div>

          <h2 className="text-xl md:text-3xl font-bold mb-4 tracking-tight text-foreground">
            Featured Tutors
          </h2>
          <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn from our hand-picked selection of expert instructors with proven track records
          </p>
        </div>

        {/* Tutors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {tutors.map((tutor) => (
            <div
              key={tutor.id}
              className="group relative bg-card rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-border hover:border-primary/30 hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden ring-4 ring-background shadow-xl group-hover:ring-primary/20 transition-all duration-300">
                    {tutor.user.image ? (
                      <Image src={tutor.user.image} alt={tutor.user.name} fill className="object-cover" sizes="64px" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                        <span className="text-white font-bold text-xl">{tutor.user.name.charAt(0)}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg text-foreground truncate group-hover:text-primary transition-colors">
                      {tutor.user.name}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <BookOpen className="h-3.5 w-3.5 text-muted-foreground" />
                      <p className="text-xs font-medium text-muted-foreground truncate">{tutor.category.name}</p>
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-6 min-h-[60px]">{tutor.bio}</p>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3.5 w-3.5 ${i < Math.floor(tutor.avgRating) ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-bold text-foreground">{tutor.avgRating}</span>
                    </div>
                    <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-tight">{tutor.totalReviews} reviews</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-5 border-t border-border/50 relative z-30">
                  <div className="flex flex-col">
                    <span className="text-xl font-bold">৳{tutor.hourlyRate}</span>
                  </div>
                  <Link
                    href={`/tutor/profile/${tutor.id}`}
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary text-primary-foreground text-sm font-bold transition-all hover:scale-105 active:scale-95"
                  >
                    Profile
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/browse-tutors"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-border bg-card hover:bg-muted text-sm font-bold transition-all group"
          >
            <Users className="h-4 w-4" />
            <span>Discover All Tutors</span>
            <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform text-primary" />
          </Link>
        </div>
      </div>
    </section>
  );
}
