"use client";

import { Search, Calendar, Video, Star, Sparkles, Users, Clock, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HowItWorksSection() {
  const steps = [
    {
      icon: <Search className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />,
      title: "Find Your Tutor",
      description: "Browse through hundreds of expert tutors by subject, rating, and price. Use smart filters to find your perfect match.",
      color: "from-primary to-purple-600",
      bgColor: "bg-primary/10",
      stats: "500+ Tutors",
    },
    {
      icon: <Calendar className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />,
      title: "Book a Session",
      description: "Choose a time that works for you. View real-time availability and book instantly with no waiting.",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
      stats: "24/7 Booking",
    },
    {
      icon: <Video className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />,
      title: "Learn & Grow",
      description: "Connect with your tutor via HD video chat. Get personalized attention and track your progress.",
      color: "from-emerald-500 to-green-500",
      bgColor: "bg-emerald-500/10",
      stats: "1-to-1 Sessions",
    }
  ];

  const benefits = [
    { icon: <Star className="h-4 w-4 text-primary" />, text: "Verified tutors" },
    { icon: <Clock className="h-4 w-4 text-primary" />, text: "Flexible scheduling" },
    { icon: <Users className="h-4 w-4 text-primary" />, text: "Personalized learning" },
    { icon: <Award className="h-4 w-4 text-primary" />, text: "Satisfaction guaranteed" }
  ];

  return (
    <section className="relative overflow-hidden py-12 md:py-24 bg-background transition-colors duration-300">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[radial-gradient(50%_50%_at_50%_0%,rgba(124,58,237,0.06)_0%,transparent_100%)] pointer-events-none" />
      
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary uppercase tracking-wider">Simple Process</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 tracking-tight text-foreground">
            How It <span className="text-primary">Works</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            Start learning in three simple steps. Join thousands of students who found their perfect tutor.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 mb-20 relative">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Connection Line (Desktop Only) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[65%] w-full h-[2px] bg-gradient-to-r from-primary/30 to-transparent z-0" />
              )}
              
              <div className="relative z-10 text-center">
                {/* Step Number Icon */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:-top-4 md:-left-4 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shadow-xl z-20">
                  {index + 1}
                </div>
                
                {/* Icon Container */}
                <div className={`w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 rounded-2xl ${step.bgColor} flex items-center justify-center group-hover:rotate-3 transition-all duration-300 shadow-sm`}>
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg text-white group-hover:scale-105 transition-transform`}>
                    {step.icon}
                  </div>
                </div>
                
                {/* Content */}
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-6 max-w-[280px] mx-auto">
                  {step.description}
                </p>
                
                {/* Stats Badge */}
                <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-muted border border-border">
                  <Users className="h-3.5 w-3.5 text-primary" />
                  <span className="text-xs font-bold uppercase tracking-wide text-foreground">{step.stats}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Bar - Fully responsive flex-to-grid layout */}
        <div className="p-1 sm:p-2 rounded-3xl bg-gradient-to-r from-primary/5 via-transparent to-primary/5 border border-border">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-row items-center justify-center gap-y-6 gap-x-4 lg:gap-x-12 p-6 sm:p-8 bg-card/50 backdrop-blur-md rounded-[22px]">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center justify-center gap-3 group">
                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  {benefit.icon}
                </div>
                <span className="text-sm sm:text-base text-foreground font-semibold">
                  {benefit.text}
                </span>
                {/* Divider (Desktop Only) */}
                {index < benefits.length - 1 && (
                  <div className="hidden lg:block w-[1px] h-6 bg-border ml-8" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}