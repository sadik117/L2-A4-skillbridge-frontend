"use client";

import { 
  Search, 
  Calendar, 
  Video, 
  Sparkles, 
  ArrowRight, 
  Users, 
  Clock, 
  Star,
  Shield,
  CheckCircle,
  BookOpen,
  Award,
  TrendingUp,
  PlayCircle,
  MessageCircle,
  CreditCard,
  UserPlus
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function HowItWorksPage() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: "01",
      title: "Find Your Perfect Tutor",
      description: "Browse through hundreds of expert tutors by subject, rating, price, and availability. Use our smart filters to narrow down your options and find the perfect match for your learning style.",
      icon: <Search className="h-8 w-8" />,
      color: "from-primary to-purple-600",
      bgColor: "bg-primary/10",
      features: [
        "Search by subject, topic, or keywords",
        "Filter by price range and ratings",
        "View tutor profiles and reviews",
        "Check real-time availability"
      ],
      image: "🎯"
    },
    {
      number: "02",
      title: "Book a Session",
      description: "Select a convenient time from your tutor's availability calendar. Choose your preferred session duration, add any specific topics you'd like to cover, and secure your spot with secure payment.",
      icon: <Calendar className="h-8 w-8" />,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
      features: [
        "Choose from available time slots",
        "Select session duration (30-120 min)",
        "Add special requests or topics",
        "Secure payment with SSL encryption"
      ],
      image: "📅"
    },
    {
      number: "03",
      title: "Start Learning",
      description: "Connect with your tutor through our integrated HD video platform with screen sharing, interactive whiteboard, and real-time chat. Track your progress and continue your learning journey.",
      icon: <Video className="h-8 w-8" />,
      color: "from-emerald-500 to-green-500",
      bgColor: "bg-emerald-500/10",
      features: [
        "HD video conferencing",
        "Interactive whiteboard",
        "Screen sharing capability",
        "Real-time chat & file sharing"
      ],
      image: "🚀"
    }
  ];

  const benefits = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Verified Tutors",
      description: "All tutors go through rigorous background checks"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Flexible Schedule",
      description: "Book sessions 24/7 at your convenience"
    },
    {
      icon: <CreditCard className="h-6 w-6" />,
      title: "Secure Payments",
      description: "Encrypted transactions with multiple payment options"
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Free Chat",
      description: "Communicate with tutors before booking"
    }
  ];

  const stats = [
    { value: "500+", label: "Expert Tutors", icon: <Users className="h-5 w-5" /> },
    { value: "10k+", label: "Students Helped", icon: <TrendingUp className="h-5 w-5" /> },
    { value: "4.9", label: "Average Rating", icon: <Star className="h-5 w-5" /> },
    { value: "98%", label: "Satisfaction Rate", icon: <CheckCircle className="h-5 w-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-primary/5 to-background dark:from-gray-950 dark:via-primary/5 dark:to-gray-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden py-10 md:py-14 bg-gradient-to-b from-primary/5 via-transparent to-transparent">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 mb-6">
            <PlayCircle className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Simple Process</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-primary to-purple-600 dark:from-white dark:via-primary dark:to-purple-400 bg-clip-text text-transparent">
            How It Works
          </h1>
          
          <p className="text-md sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Three simple steps to start your learning journey
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        
        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-4 sm:p-6 rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-100 dark:border-gray-800 text-center group hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Steps Section */}
        <div className="space-y-16 lg:space-y-24 mb-20">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } items-center gap-8 lg:gap-16 group`}
            >
              {/* Content */}
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                    <span className="text-white font-bold text-lg">{step.number}</span>
                  </div>
                  <div className="text-6xl font-bold text-primary/10">{step.image}</div>
                </div>
                
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                  {step.title}
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground mb-6 leading-relaxed">
                  {step.description}
                </p>
                
                <ul className="space-y-3">
                  {step.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm sm:text-base text-muted-foreground">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Visual/Icon */}
              <div className="flex-1 flex justify-center relative">
                <div className={`w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-gradient-to-br ${step.color} opacity-10 absolute`} />
                <div className={`w-32 h-32 sm:w-48 sm:h-48 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-2xl relative z-10 group-hover:scale-110 transition-transform duration-500`}>
                  {step.icon}
                </div>
                
                {/* Decorative dots */}
                <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-primary/20 animate-pulse" />
                <div className="absolute -bottom-4 -left-4 w-8 h-8 rounded-full bg-purple-600/20 animate-pulse" />
                
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute left-1/2 bottom-0 w-px h-16 bg-gradient-to-b from-primary/50 to-transparent" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Grid */}
        <div className="mb-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 mb-6">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Why Choose Us</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              Platform Benefits
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need for a great learning experience
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-100 dark:border-gray-800 text-center group hover:border-primary/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <div className="text-primary">
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial/CTA Section */}
        <div className="relative rounded-3xl bg-gradient-to-r from-primary/10 via-purple-600/10 to-blue-600/10 dark:from-primary/5 dark:via-purple-600/5 dark:to-blue-600/5 p-8 sm:p-12 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/5 rounded-full blur-3xl" />
          
          <div className="relative text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-6">
              <UserPlus className="h-8 w-8 text-primary" />
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-8">
              Join thousands of students who have found their perfect tutor on SkillBridge
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/browse-tutors">
                <button className="px-8 py-3 rounded-full bg-gradient-to-r from-primary to-purple-600 text-white font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 w-full sm:w-auto flex items-center justify-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Browse Tutors
                  <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
              <Link href="/become-tutor">
                <button className="px-8 py-3 rounded-full border-2 border-gray-200 dark:border-gray-800 hover:border-primary dark:hover:border-primary text-gray-700 dark:text-gray-300 font-medium hover:text-primary transition-all duration-300 w-full sm:w-auto flex items-center justify-center gap-2">
                  Become a Tutor
                  <UserPlus className="h-4 w-4" />
                </button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4 text-emerald-500" />
                <span>Secure Payments</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Award className="h-4 w-4 text-amber-500" />
                <span>Verified Tutors</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 text-blue-500" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Link */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            Have more questions? Check out our{" "}
            <Link href="/faq" className="text-primary hover:underline font-medium">
              Frequently Asked Questions
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}