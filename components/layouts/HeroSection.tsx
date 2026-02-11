"use client";

import {
  Search,
  Sparkles,
  Star,
  Users,
  Shield,
  ArrowRight,
  BookOpen,
  GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface HeroSectionProps {
  className?: string;
}

const HeroSection = ({ className }: HeroSectionProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/tutor?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const popularSearches = [
    "English",
    "Programming",
    "Physics",
    "Chemistry",
    "Spanish",
    "Web Dev",
    "Statistics",
    "AI & Machine Learning",
  ];

  const subjects = [
    { name: "Math", icon: "∫", color: "from-primary to-purple-600" },
    { name: "Code", icon: "</>", color: "from-blue-500 to-cyan-500" },
    { name: "Science", icon: "⚛", color: "from-emerald-500 to-green-500" },
    { name: "Lang", icon: "🗣", color: "from-amber-500 to-orange-500" },
  ];

  return (
    <section
      className={cn("relative overflow-hidden py-6 md:py-10", className)}
    >
      {/* Background Gradients - Responsive */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-background" />
      <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-purple-500/10 rounded-full blur-2xl sm:blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-blue-500/10 rounded-full blur-2xl sm:blur-3xl" />

      <div className="container relative mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 lg:gap-16">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            {/* Badge - Responsive */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/10 border border-primary/20 mb-4 sm:mb-6 md:mb-8">
              <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
              <span className="text-xs sm:text-sm md:text-base font-medium text-primary">
                Trusted by Students Worldwide
              </span>
            </div>

            {/* Main Heading - Responsive Sizes */}
            <h1 className="text-2xl md:text-4xl font-bold tracking-tight mb-4 sm:mb-6 md:mb-8">
              <span className="block text-foreground">Connect with</span>
              <span className="block bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent bg-size-200 animate-gradient">
                Expert Tutors,
              </span>
              <span className="block text-foreground">Learn Anything</span>
            </h1>

            {/* Description - Responsive */}
            <p className="text-xs md:text-md  text-muted-foreground mb-6 md:mb-10 max-w-2xl mx-auto lg:mx-0">
              Find the perfect tutor for your learning journey. Personalized
              sessions at your pace with industry experts and top-rated
              educators.
            </p>

            {/* Search Form - Responsive */}
            <form onSubmit={handleSearch} className="mb-6 sm:mb-8 md:mb-12">
              <div className="relative max-w-xl mx-auto lg:mx-0">
                <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="What do you want to learn? (e.g. Mathematics, Programming, Spanish...)"
                  className="w-full h-12 sm:h-14 md:h-16 px-10 sm:px-12 md:px-14 pr-28 sm:pr-32 md:pr-36 text-sm md:text-md rounded-full border-2 border-input bg-background shadow-lg hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-300"
                />
                <Button
                  type="submit"
                  className="absolute right-1.5 sm:right-2 top-1.5 sm:top-2 bottom-1.5 sm:bottom-2 h-9 sm:h-10 md:h-12 px-4 sm:px-6 md:px-8 rounded-full bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 text-xs sm:text-sm md:text-base"
                >
                  <span className="font-semibold hidden sm:inline">Search</span>
                  <Search className="h-4 w-4 sm:hidden" />
                  <ArrowRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4 hidden sm:block" />
                </Button>
              </div>

              {/* Popular Searches - Responsive */}
              <div className="mt-4 sm:mt-6">
                <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">
                  Popular searches:
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-1.5 sm:gap-2">
                  {popularSearches.map((subject) => (
                    <button
                      key={subject}
                      type="button"
                      onClick={() =>
                        router.push(
                          `/tutor?search=${encodeURIComponent(subject)}`,
                        )
                      }
                      className="px-3 py-1.5 text-xs rounded-full border hover:bg-muted"
                    >
                      {subject}
                    </button>
                  ))}
                </div>
              </div>
            </form>
          </div>

          {/* Right Content - Hero Illustration */}
          <div className="w-full lg:w-1/2 relative -mt-8 md:mt-0">
            {/* Main Illustration Container */}
            <div className="relative w-full h-[280px] sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px]">
              {/* Floating Tutor Cards - Responsive Positioning */}
              <div className="absolute top-0 left-0 sm:top-4 sm:-left-4 md:-top-6 md:-left-6 w-32 h-24 sm:w-40 sm:h-32 md:w-48 md:h-36 bg-gradient-to-br from-primary/10 to-purple-600/10 rounded-xl sm:rounded-2xl border border-primary/20 backdrop-blur-sm p-3 sm:p-4 shadow-xl rotate-3 animate-float-slow">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-primary to-purple-600 flex items-center justify-center">
                    <span className="text-white font-bold text-xs sm:text-sm">
                      JD
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-xs sm:text-sm truncate">
                      John Doe
                    </p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground truncate">
                      Math Expert
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-2 w-2 sm:h-3 sm:w-3 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <span className="text-[10px] sm:text-xs font-medium ml-1">
                    4.9/5
                  </span>
                </div>
              </div>

              <div className="absolute bottom-0 right-0 sm:bottom-4 sm:-right-4 md:-bottom-6 md:-right-6 w-32 h-24 sm:w-40 sm:h-32 md:w-48 md:h-36 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl sm:rounded-2xl border border-blue-500/20 backdrop-blur-sm p-3 sm:p-4 shadow-xl -rotate-3 animate-float">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                    <span className="text-white font-bold text-xs sm:text-sm">
                      SJ
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-xs sm:text-sm truncate">
                      Sarah Jane
                    </p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground truncate">
                      Science Tutor
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-2 w-2 sm:h-3 sm:w-3 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <span className="text-[10px] sm:text-xs font-medium ml-1">
                    5.0/5
                  </span>
                </div>
              </div>

              {/* Main Learning Illustration */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                  {/* Central Knowledge Hub */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-purple-600/20 animate-pulse flex items-center justify-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-r from-primary to-purple-600 flex items-center justify-center">
                      <GraduationCap className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-white" />
                    </div>
                  </div>

                  {/* Orbiting Subjects */}
                  {subjects.map((subject, i) => (
                    <div
                      key={i}
                      className="absolute w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-background border-2 border-white shadow-lg flex items-center justify-center animate-orbit"
                      style={{
                        animationDelay: `${i * 0.5}s`,
                        animationDuration: "20s",
                      }}
                    >
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br ${subject.color} flex items-center justify-center`}
                      >
                        <span className="text-white font-bold text-xs sm:text-sm md:text-base">
                          {subject.icon}
                        </span>
                      </div>
                    </div>
                  ))}

                  {/* Connection Lines */}
                  <div className="absolute inset-0">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute top-1/2 left-1/2 w-0.5 h-24 sm:h-32 bg-gradient-to-b from-primary/30 to-transparent origin-center"
                        style={{
                          transform: `translate(-50%, -50%) rotate(${i * 90}deg)`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute top-4 left-4 sm:top-8 sm:left-8 animate-bounce">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary/20 to-purple-600/20 border border-primary/30 backdrop-blur-sm flex items-center justify-center">
                  <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-primary" />
                </div>
              </div>

              <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 animate-bounce-slow">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 backdrop-blur-sm flex items-center justify-center">
                  <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-blue-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section - Responsive */}
        <div>
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-4 md:gap-6 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-r from-background to-muted/30 border border-border shadow-lg w-full sm:w-auto mt-4 md:-mt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-primary to-purple-600 flex items-center justify-center flex-shrink-0">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className="text-left min-w-0">
                <p className="font-bold text-sm sm:text-base md:text-lg truncate">
                  Top-rated tutors are waiting for you
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground truncate">
                  Book your first session today
                </p>
              </div>
            </div>
            <Link href="/browse-tutors">
              <Button className="rounded-full bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 w-full sm:w-auto px-4 md:px-8 text-xs md:text-base">
                Get Started
                <ArrowRight className="ml-1 h-2 w-2 sm:h-3 sm:w-3" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export { HeroSection };
