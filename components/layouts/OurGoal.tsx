"use client";

import {
    Target,
    Heart,
    Globe,
    Zap,
    Users,
    BookOpen,
    Award,
    TrendingUp,
    Shield,
    Sparkles,
    ArrowRight,
    CheckCircle
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function OurGoal() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        const element = document.getElementById("our-goal-section");
        if (element) observer.observe(element);

        return () => {
            if (element) observer.unobserve(element);
        };
    }, []);

    const goals = [
        {
            icon: <Globe className="h-6 w-6" />,
            title: "Global Access",
            description: "Democratize education by making quality tutoring accessible to students worldwide, regardless of their location or background.",
            color: "from-primary to-purple-600"
        },
        {
            icon: <Heart className="h-6 w-6" />,
            title: "Personalized Learning",
            description: "Create meaningful connections between students and tutors, enabling customized learning experiences that adapt to individual needs.",
            color: "from-rose-500 to-pink-500"
        },
        {
            icon: <Zap className="h-6 w-6" />,
            title: "Empower Educators",
            description: "Provide tutors with tools, resources, and opportunities to share their expertise and build successful teaching careers.",
            color: "from-amber-500 to-orange-500"
        },
        {
            icon: <Award className="h-6 w-6" />,
            title: "Quality Excellence",
            description: "Maintain the highest standards of education through rigorous tutor vetting and continuous quality improvement.",
            color: "from-emerald-500 to-green-500"
        }
    ];

    const milestones = [
        { value: "500+", label: "Expert Tutors", icon: <Users className="h-5 w-5" /> },
        { value: "10k+", label: "Students Helped", icon: <TrendingUp className="h-5 w-5" /> },
        { value: "50+", label: "Countries", icon: <Globe className="h-5 w-5" /> },
        { value: "98%", label: "Satisfaction Rate", icon: <Shield className="h-5 w-5" /> }
    ];

    return (
        <section
            id="our-goal-section"
            className="py-8 md:py-16 bg-[radial-gradient(50%_50%_at_50%_0%,rgba(124,58,237,0.06)_0%,transparent_100%)] overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-border/50 pb-5 md:pb-10 ">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-14">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 mb-6 animate-fade-in">
                        <Target className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium text-primary">Our Vision</span>
                    </div>

                    <h2 className="text-xl md:text-3xl font-extrabold mb-4 bg-gradient-to-r from-gray-900 via-primary to-purple-600 dark:from-white dark:via-primary dark:to-purple-400 bg-clip-text text-transparent">
                        Our Mission & Goal
                    </h2>
                    <p className="text-sm md:text-lg text-muted-foreground">
                        We're on a mission to transform education by connecting passionate learners with expert educators worldwide
                    </p>
                </div>

                {/* Main Goal Statement */}
                <div className="relative mb-10 lg:mb-14">
                    <div className="relative rounded-3xl bg-gradient-to-r from-primary/10 via-purple-600/10 to-blue-600/10 dark:from-primary/5 dark:via-purple-600/5 dark:to-blue-600/5 p-8 sm:p-12 overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/5 rounded-full blur-3xl" />

                        <div className="relative text-center">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 mb-6">
                                <Target className="h-10 w-10 text-primary" />
                            </div>
                            <h3 className="text-xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                                Making Quality Education Accessible to Everyone
                            </h3>
                            <p className="text-sm md:text-md text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                                At SkillBridge, we believe that everyone deserves access to quality education.
                                Our goal is to break down geographical and financial barriers, creating a global
                                learning community where knowledge flows freely and opportunities are endless.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Goals Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-10 lg:mb-16">
                    {goals.map((goal, index) => (
                        <div
                            key={index}
                            className={`group relative p-6 lg:p-8 rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-100 dark:border-gray-800 hover:border-primary/30 dark:hover:border-primary/40 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${isVisible ? "animate-fade-in-up" : "opacity-0"
                                }`}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${goal.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`} />

                            <div className="relative">
                                <div className={`w-14 h-14 mb-5 rounded-xl bg-gradient-to-br ${goal.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    <div className="text-white">
                                        {goal.icon}
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                                    {goal.title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {goal.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10 lg:mb-14">
                    {milestones.map((stat, index) => (
                        <div
                            key={index}
                            className={`p-4 sm:p-6 rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-100 dark:border-gray-800 text-center group hover:border-primary/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${isVisible ? "animate-scale-in" : "opacity-0"
                                }`}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <div className="text-primary">
                                    {stat.icon}
                                </div>
                            </div>
                            <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                                {stat.value}
                            </div>
                            <div className="text-xs sm:text-sm text-muted-foreground">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Core Values */}
                <div className="mb-12">
                    <div className="text-center mb-8">
                        <h3 className="text-xl sm:text-3xl font-bold mb-2 text-gray-900 dark:text-white">
                            Our Core Principles
                        </h3>
                        <p className="text-muted-foreground">
                            Guided by values that shape everything we do
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4">
                        {[
                            "Accessibility First",
                            "Quality Education",
                            "Global Community",
                            "Continuous Innovation",
                            "Student Success",
                            "Tutor Empowerment"
                        ].map((value, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/20 text-primary text-sm font-medium"
                            >
                                <CheckCircle className="h-4 w-4" />
                                <span>{value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center">
                    <Link href="/about-us">
                        <button className="px-3 py-2 md:px-4 md:py-3 rounded-full bg-gradient-to-r from-primary to-purple-600 text-white font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 inline-flex items-center gap-2 group">
                            Learn More About Us
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}