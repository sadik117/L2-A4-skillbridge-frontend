"use client";

import { 
  Calculator, 
  Code, 
  Globe, 
  FlaskConical, 
  BookOpen, 
  Palette, 
  Music, 
  Brain,
  TrendingUp,
  ArrowRight,
  Users,
  Star
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PopularSubjectsSection() {
  const categories = [
    {
      name: "Mathematics",
      icon: <Calculator className="h-6 w-6 sm:h-7 sm:w-7" />,
      tutors: 128,
      color: "from-primary to-purple-600",
      bgColor: "bg-primary/10",
      href: "/tutor?search=mathematics"
    },
    {
      name: "Programming",
      icon: <Code className="h-6 w-6 sm:h-7 sm:w-7" />,
      tutors: 96,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
      href: "/tutor?search=programming"
    },
    {
      name: "Languages",
      icon: <Globe className="h-6 w-6 sm:h-7 sm:w-7" />,
      tutors: 84,
      color: "from-emerald-500 to-green-500",
      bgColor: "bg-emerald-500/10",
      href: "/tutor?search=languages"
    },
    {
      name: "Science",
      icon: <FlaskConical className="h-6 w-6 sm:h-7 sm:w-7" />,
      tutors: 72,
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-500/10",
      href: "/tutor?search=science"
    },
    {
      name: "English",
      icon: <BookOpen className="h-6 w-6 sm:h-7 sm:w-7" />,
      tutors: 65,
      color: "from-red-500 to-pink-500",
      bgColor: "bg-red-500/10",
      href: "/tutor?search=english"
    },
    {
      name: "Art & Design",
      icon: <Palette className="h-6 w-6 sm:h-7 sm:w-7" />,
      tutors: 48,
      color: "from-purple-500 to-indigo-500",
      bgColor: "bg-purple-500/10",
      href: "/tutor?search=art"
    },
    {
      name: "Music",
      icon: <Music className="h-6 w-6 sm:h-7 sm:w-7" />,
      tutors: 52,
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-500/10",
      href: "/tutor?search=music"
    },
    {
      name: "Test Prep",
      icon: <Brain className="h-6 w-6 sm:h-7 sm:w-7" />,
      tutors: 93,
      color: "from-indigo-500 to-blue-500",
      bgColor: "bg-indigo-500/10",
      href: "/tutor?search=test-prep"
    }
  ];

  return (
    <section className="relative overflow-hidden py-10 md:py-16 bg-background transition-colors duration-300">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[radial-gradient(50%_50%_at_50%_0%,rgba(124,58,237,0.06)_0%,transparent_100%)] pointer-events-none" />
      
      {/* Main Container */}
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <BookOpen className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary uppercase tracking-wider">Explore Subjects</span>
          </div>
          
          <h2 className="text-xl md:text-3xl font-extrabold mb-4 tracking-tight text-foreground">
            Popular <span className="text-primary">Subjects</span>
          </h2>
          <p className="text-sm md:text-lg text-muted-foreground">
            Browse our most in-demand subjects with expert tutors ready to help you succeed
          </p>
        </div>

        {/* Categories Grid - Responsive layout from 1 to 4 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {categories.map((category, index) => (
            <Link
              key={index}
              href={category.href}
              className="group relative h-full"
            >
              <div className="h-full p-6 sm:p-8 bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between">
                <div>
                  {/* Icon Container */}
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 mb-6 rounded-xl ${category.bgColor} flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg text-white`}>
                      {category.icon}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  
                  {/* Stats Labels */}
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      <span>{category.tutors} Tutors</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      <span>4.9</span>
                    </div>
                  </div>
                </div>
                
                {/* Visual Arrow */}
                <div className="flex justify-end pt-2">
                  <div className="p-2 rounded-full bg-primary/5 text-primary opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Stats Bar - Optimized for wrapping on small devices */}
        <div className="mt-16 lg:mt-24 p-6 sm:p-10 rounded-3xl bg-muted/30 border border-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            <div className="text-center md:border-r border-border last:border-0">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-1">50+</div>
              <div className="text-[10px] sm:text-xs uppercase font-bold text-muted-foreground tracking-widest">Subjects</div>
            </div>
            <div className="text-center md:border-r border-border last:border-0">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-1">500+</div>
              <div className="text-[10px] sm:text-xs uppercase font-bold text-muted-foreground tracking-widest">Tutors</div>
            </div>
            <div className="text-center md:border-r border-border last:border-0">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-1">10k+</div>
              <div className="text-[10px] sm:text-xs uppercase font-bold text-muted-foreground tracking-widest">Students</div>
            </div>
            <div className="text-center last:border-0">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-1">4.9</div>
              <div className="text-[10px] sm:text-xs uppercase font-bold text-muted-foreground tracking-widest">Rating</div>
            </div>
          </div>
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <Link href="/browse-tutors" className="inline-block w-full sm:w-auto">
            <Button 
              variant="outline" 
              className="w-full sm:w-auto h-12 px-10 rounded-full border-border hover:border-primary hover:text-primary font-bold group"
            >
              View All Subjects
              <TrendingUp className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}