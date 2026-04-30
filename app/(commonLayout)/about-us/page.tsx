"use client";

import { 
  Target, 
  Heart, 
  Globe, 
  Users, 
  Award, 
  BookOpen, 
  Sparkles,
  Quote,
  ChevronRight,
  TrendingUp,
  Shield,
  Clock,
  Star
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AboutUsPage() {
  const stats = [
    { value: "500+", label: "Expert Tutors", icon: <Users className="h-6 w-6" /> },
    { value: "10k+", label: "Students Helped", icon: <TrendingUp className="h-6 w-6" /> },
    { value: "50+", label: "Subjects", icon: <BookOpen className="h-6 w-6" /> },
    { value: "4.9", label: "Average Rating", icon: <Star className="h-6 w-6" /> },
  ];

  const values = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Passion for Learning",
      description: "We believe learning should be an exciting journey of discovery, not a chore."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Quality First",
      description: "Every tutor is thoroughly vetted to ensure the highest standard of education."
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Global Community",
      description: "Connecting learners and educators from around the world."
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Flexible Learning",
      description: "Learn at your own pace, on your own schedule, from anywhere."
    },
  ];

  const milestones = [
    { year: "2023", title: "Platform Launch", description: "SkillBridge launched with 50 expert tutors" },
    { year: "2024", title: "10K Students", description: "Reached 10,000+ students globally" },
    { year: "2025", title: "50+ Subjects", description: "Expanded to over 50 subjects and categories" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-primary/5 to-background dark:from-gray-950 dark:via-primary/5 dark:to-gray-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden py-10 md:py-14">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 mb-6">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Our Story</span>
          </div>
          
          <h1 className="sm:text-xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-primary to-purple-600 dark:from-white dark:via-primary dark:to-purple-400 bg-clip-text text-transparent">
            About SkillBridge
          </h1>
          
          <p className="text-md md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Empowering learners worldwide through accessible, high-quality education.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14lg:py-20">
        
        {/* Mission Section */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20 lg:mb-32">
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 mb-6">
              <Target className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Our Purpose</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              Our Mission
            </h2>
            
            <div className="space-y-4 text-base sm:text-lg text-muted-foreground">
              <p>
                SkillBridge was founded with a simple yet powerful mission: <span className="font-semibold text-foreground">to make quality education accessible to everyone, everywhere.</span> 
                We believe that the right guidance can unlock incredible potential in every learner.
              </p>
              <p>
                Our platform connects passionate students with expert tutors, facilitating meaningful learning experiences 
                that transcend geographical boundaries. Whether you're a student aiming for academic excellence, 
                a professional looking to upskill, or a lifelong learner pursuing a new passion, we're here to help you succeed.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mt-8">
              {stats.map((stat, index) => (
                <div key={index} className="p-4 rounded-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-100 dark:border-gray-800 text-center">
                  <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-primary/10 flex items-center justify-center">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="order-1 lg:order-2 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-600/20" />
              <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-800">
                <Quote className="h-12 w-12 text-primary/30 mb-4" />
                <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 leading-relaxed italic mb-6">
                  "Education is not just about learning facts, it's about opening doors to new possibilities. At SkillBridge, we're committed to helping every learner find their path to success."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                    <span className="text-white font-bold">SB</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">SkillBridge Team</h4>
                    <p className="text-sm text-muted-foreground">Founded 2023</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl -z-10" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-purple-600/10 rounded-full blur-2xl -z-10" />
          </div>
        </div>

        {/* Our Values Section */}
        <div className="mb-10 lg:mb-14">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 mb-6">
              <Heart className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">What We Believe</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Our Core Values
            </h2>
            <p className="text-lg text-muted-foreground">
              The principles that guide everything we do at SkillBridge
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="group relative p-6 rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-100 dark:border-gray-800 hover:border-primary/30 dark:hover:border-primary/40 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary/10 to-purple-600/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <div className="text-primary">
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Milestones Section */}
        <div className="mb-20 lg:mb-32">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 mb-6">
              <Award className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Our Journey</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Company Milestones
            </h2>
            <p className="text-lg text-muted-foreground">
              Key achievements in our journey to transform education
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 lg:gap-8">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className="relative p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 border border-gray-100 dark:border-gray-800 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">{milestone.year}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {milestone.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {milestone.description}
                </p>
                
                {/* Connector line */}
                {index < milestones.length - 1 && (
                  <div className="hidden sm:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary/30 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}