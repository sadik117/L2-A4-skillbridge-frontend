"use client";

import { useState } from "react";
import {
  Star,
  MapPin,
  Clock,
  BookOpen,
  Award,
  Calendar,
  MessageSquare,
  Globe,
  GraduationCap,
  CheckCircle,
  ChevronLeft,
  Share2,
  Bookmark,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import BookingModal from "@/components/layouts/BookingModal";

// Helper to format time nicely
const formatTime = (dateStr: string) =>
  new Date(dateStr).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

interface TutorProfileProps {
  tutor: {
    id: string;
    user: {
      name: string;
      email: string;
      avatar?: string | null;
    } | null;
    category: {
      name: string;
      slug: string;
    } | null;
    bio?: string;
    hourlyRate?: number;
    rating?: number;
    reviewCount?: number;
    subjects?: string[];
    location?: string;
    experience?: number;
    education?: {
      degree: string;
      institution: string;
      year: string;
    }[];
    availability?: {
      id: string;
      daysOfWeek: string[];
      startTime: string;
      endTime: string;
    }[];
    languages?: string[];
    teachingStyle?: string;
    achievements?: string[];
    reviews?: {
      id: string;
      student: { name: string };
      rating: number;
      comment: string;
      createdAt: string;
    }[];
  } | null;
}

const TutorProfile = ({ tutor }: TutorProfileProps) => {
  const router = useRouter();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("about");

  if (!tutor || !tutor.user) {
    return (
      <div className="flex min-h-screen items-center justify-center text-muted-foreground">
        Tutor profile not available.
      </div>
    );
  }

  const handleGoBack = () => router.back();
  const handleBookSession = () => setIsBookingModalOpen(true);

  const {
    user,
    category,
    bio = "",
    hourlyRate = 0,
    rating = 0,
    reviewCount = 0,
    location = "Location not specified",
    experience = 0,
    education = [],
    availability = [],
    languages = ["Language not specified"],
    teachingStyle = "Practical and Engaging",
    achievements = [],
    reviews = [],
  } = tutor;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Back Navigation */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Button
            variant="ghost"
            onClick={handleGoBack}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" /> Back to Tutors
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Bookmark className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="sticky top-24">
            <CardContent className="pt-6 text-center">
              <Avatar className="h-32 w-32 mb-4 ml-20 md:ml-0 border-4 border-background shadow-lg">
                <AvatarImage src={user.avatar ?? "/avatar.png"} />
                <AvatarFallback className="bg-gradient-to-br from-primary to-purple-600 text-white text-3xl">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-muted-foreground flex items-center gap-1 justify-center">
                <BookOpen className="h-4 w-4" />
                {category?.name ?? "Uncategorized"}
              </p>

              {/* Rating */}
              <div className="flex items-center justify-center gap-2 my-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < Math.floor(rating) ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`}
                    />
                  ))}
                </div>
                <span className="font-bold">{rating.toFixed(1)}</span>
                <span className="text-muted-foreground">
                  ({reviewCount} reviews)
                </span>
              </div>

              {/* Quick Info */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 justify-center">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <span>{location}</span>
                </div>
                <div className="flex items-center gap-3 justify-center">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <span>{experience} years experience</span>
                </div>
                <div className="flex items-center gap-1 justify-center">
                  <Globe className="h-5 w-5 text-muted-foreground" />
                  {languages.map((lang, i) => (
                    <Badge key={i} variant="secondary">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Price & Action Buttons */}
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    ৳{hourlyRate}/hour
                  </div>
                  <p className="text-sm text-muted-foreground">Starting rate</p>
                </div>
                <Button
                  onClick={handleBookSession}
                  className="w-full h-12 text-lg bg-gradient-to-r from-primary to-purple-600 hover:opacity-90"
                >
                  <Calendar className="mr-2 h-5 w-5" /> Book a Session
                </Button>
                <Button variant="outline" className="w-full">
                  <MessageSquare className="mr-2 h-5 w-5" /> Send Message
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Availability Card */}
          {availability.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" /> Availability
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {availability.map((slot) => (
                    <div
                      key={slot.id}
                      className="flex justify-between items-center border p-2 rounded"
                    >
                      <span>{slot.daysOfWeek.join(", ")}</span>
                      <span>
                        {formatTime(slot.startTime)} -{" "}
                        {formatTime(slot.endTime)}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Main Content Tabs */}
        <div className="lg:col-span-2">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="subjects">Subjects</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({reviewCount})</TabsTrigger>
              <TabsTrigger value="availability">Schedule</TabsTrigger>
            </TabsList>

            {/* About Tab */}
            <TabsContent value="about" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" /> About Me
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{bio}</p>
                  <div className="mt-6">
                    <h3 className="font-semibold mb-4">Teaching Style</h3>
                    <p className="text-muted-foreground">{teachingStyle}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Education */}
              {education.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Education & Qualifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {education.map((edu, i) => (
                      <div key={i} className="flex items-start gap-4 mb-2">
                        <Award className="h-5 w-5 text-primary mt-1" />
                        <div>
                          <h4 className="font-semibold">{edu.degree}</h4>
                          <p className="text-muted-foreground">
                            {edu.institution}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {edu.year}
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Achievements */}
              {achievements.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Achievements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {achievements.map((ach, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Subjects Tab */}
            <TabsContent value="subjects">
              <Card>
                <CardHeader>
                  <CardTitle>Subjects I Teach</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg border border-border hover:border-primary/30 transition-colors">
                      <h4 className="font-semibold mb-2">{category?.slug}</h4>
                      <p className="text-sm text-muted-foreground">
                        Expert level • Customized lessons available
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews">
              <Card>
                <CardHeader>
                  <CardTitle>Student Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  {reviews.length > 0 ? (
                    reviews.map((review) => (
                      <div
                        key={review.id}
                        className="border-b pb-4 last:border-0"
                      >
                        <div className="flex justify-between items-center mb-1">
                          <div>
                            <h4 className="font-semibold">
                              {review.student.name}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-muted-foreground">
                          {review.comment}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground">No reviews yet.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Availability Tab */}
            <TabsContent value="availability">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  {availability.length > 0 ? (
                    <div className="space-y-2">
                      {availability.map((slot) => (
                        <div
                          key={slot.id}
                          className="flex justify-between items-center border p-2 rounded"
                        >
                          <span>{slot.daysOfWeek.join(", ")}</span>
                          <span>
                            {formatTime(slot.startTime)} -{" "}
                            {formatTime(slot.endTime)}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">
                      No availability set.
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        tutor={tutor}
      />
    </div>
  );
};

export default TutorProfile;
