"use client";

import { Star, MapPin, Clock, BookOpen, Award, MessageSquare, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

interface TutorCardProps {
  tutor: {
    id: string;
    user: {
      name: string;
      avatar?: string;
    };
    category: {
      name: string;
    };
    bio: string;
    hourlyRate: number;
    rating?: number;
    reviewCount?: number;
    subjects?: string[];
    location?: string;
    experience?: string;
    isOnline?: boolean;
    availability?: string[];
  };
  className?: string;
  compact?: boolean;
}

const TutorCard = ({ tutor, className, compact = false }: TutorCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/30",
        compact ? "p-4" : "p-6",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/tutor/profile/${tutor.id}`} className="absolute inset-0 z-10" />
      
      {/* Online Status Indicator */}
      {tutor.isOnline && (
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-medium text-emerald-600">Online</span>
        </div>
      )}

      {/* Background Gradient Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Header Section */}
      <div className="relative flex items-start gap-4 mb-4">
        {/* Avatar with Badge */}
        <div className="relative flex-shrink-0">
          <div className={cn(
            "relative overflow-hidden rounded-full border-2 border-background shadow-md",
            compact ? "h-14 w-14" : "h-16 w-16"
          )}>
            {tutor.user.avatar ? (
              <Image
                src={tutor.user.avatar}
                alt={tutor.user.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 64px, 96px"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary to-purple-600 text-white">
                <span className="font-bold text-lg">{tutor.user.name.charAt(0)}</span>
              </div>
            )}
          </div>
          
          {/* Verified Badge */}
          <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-background border border-border z-20">
            <div className="p-1 rounded-full bg-gradient-to-r from-primary to-purple-600">
              <CheckCircle className="h-3 w-3 text-white" />
            </div>
          </div>
        </div>

        {/* Tutor Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
            <div className="min-w-0">
              <h3 className="font-bold text-lg truncate hover:text-primary transition-colors">
                {tutor.user.name}
              </h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <BookOpen className="h-3 w-3" />
                {tutor.category.name}
              </p>
            </div>
            
            {/* Rating */}
            {tutor.rating && (
              <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/30 px-2 py-1 rounded-lg">
                <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                <span className="font-bold text-amber-600 dark:text-amber-400">
                  {tutor.rating.toFixed(1)}
                </span>
                {tutor.reviewCount && (
                  <span className="text-xs text-muted-foreground">
                    ({tutor.reviewCount})
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Experience Badge */}
          {tutor.experience && !compact && (
            <div className="mt-2 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 border border-primary/20">
              <Award className="h-3 w-3 text-primary" />
              <span className="text-xs font-medium text-primary">{tutor.experience}</span>
            </div>
          )}
        </div>
      </div>

      {/* Bio */}
      <p className={cn(
        "text-muted-foreground mb-4 line-clamp-3 leading-relaxed",
        compact ? "text-sm" : "text-base"
      )}>
        {tutor.bio || "Passionate educator dedicated to helping students achieve their academic goals."}
      </p>

      {/* Footer Section */}
      <div className="flex items-center justify-between pt-4 border-t border-border/50">
        {/* Price */}
        <div className="flex flex-col">
          <span className={cn(
            "font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent",
            compact ? "text-lg" : "text-xl"
          )}>
            ৳{tutor.hourlyRate}/hr
          </span>
          <span className="text-xs text-muted-foreground">Starting from</span>
        </div>
          
          <Link
            href={`/tutor/profile/${tutor.id}`}
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-purple-600 text-white hover:opacity-90 transition-opacity font-medium",
              compact ? "px-4 py-2 text-sm" : "px-6 py-2.5"
            )}
          >
            View Details
            <span className={`transition-transform ${isHovered ? 'translate-x-1' : ''}`}>→</span>
          </Link>
        </div>
      </div>
  );
};

export default TutorCard;