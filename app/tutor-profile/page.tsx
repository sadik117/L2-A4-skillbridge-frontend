// components/tutor/TutorProfile.tsx
"use client";

import { useState } from "react";
import { 
  Star, MapPin, Clock, BookOpen, Award, Calendar, 
  MessageSquare, Globe, Users, GraduationCap, CheckCircle,
  ChevronLeft, Share2, Bookmark
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BookingModal from "@/components/layouts/BookingModal";

interface TutorProfileProps {
  tutor: {
    id: string;
    user: {
      name: string;
      email: string;
      avatar?: string;
    };
    category: {
      name: string;
    };
    bio: string;
    hourlyRate: number;
    rating: number;
    reviewCount: number;
    subjects: string[];
    location: string;
    experience: string;
    education: {
      degree: string;
      institution: string;
      year: string;
    }[];
    availability: {
      day: string;
      slots: string[];
    }[];
    languages: string[];
    teachingStyle: string;
    achievements: string[];
    reviews: {
      id: string;
      studentName: string;
      rating: number;
      comment: string;
      date: string;
    }[];
  };
}

const TutorProfile = ({ tutor }: TutorProfileProps) => {
  const router = useRouter();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("about");

  const handleGoBack = () => {
    router.back();
  };

  const handleBookSession = () => {
    setIsBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Back Navigation */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={handleGoBack}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Tutors
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
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Tutor Card */}
            <Card className="sticky top-24">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center mb-6">
                  <Avatar className="h-32 w-32 mb-4 border-4 border-background shadow-lg">
                    <AvatarImage src={tutor.user.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-purple-600 text-white text-3xl">
                      {tutor.user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <h1 className="text-2xl font-bold">{tutor.user.name}</h1>
                  <p className="text-muted-foreground flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    {tutor.category.name}
                  </p>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-2 my-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(tutor.rating)
                              ? "fill-amber-400 text-amber-400"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-bold">{tutor.rating.toFixed(1)}</span>
                    <span className="text-muted-foreground">
                      ({tutor.reviewCount} reviews)
                    </span>
                  </div>
                </div>

                {/* Quick Info */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <span>{tutor.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <span>{tutor.experience} of experience</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-muted-foreground" />
                    <div className="flex gap-1">
                      {tutor.languages.map((lang, i) => (
                        <Badge key={i} variant="secondary">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Price & Action Button */}
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                      ৳{tutor.hourlyRate}/hour
                    </div>
                    <p className="text-sm text-muted-foreground">Starting rate</p>
                  </div>
                  
                  <Button
                    onClick={handleBookSession}
                    className="w-full h-12 text-lg bg-gradient-to-r from-primary to-purple-600 hover:opacity-90"
                  >
                    <Calendar className="mr-2 h-5 w-5" />
                    Book a Session
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="w-full"
                  >
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Availability Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Availability
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tutor.availability.map((day, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="font-medium">{day.day}</span>
                      <div className="flex gap-1">
                        {day.slots.map((slot, j) => (
                          <Badge key={j} variant="outline">
                            {slot}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="subjects">Subjects</TabsTrigger>
                <TabsTrigger value="reviews">
                  Reviews ({tutor.reviewCount})
                </TabsTrigger>
                <TabsTrigger value="availability">Schedule</TabsTrigger>
              </TabsList>

              {/* About Tab */}
              <TabsContent value="about" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5" />
                      About Me
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {tutor.bio}
                    </p>
                    
                    <div className="mt-6">
                      <h3 className="font-semibold mb-4">Teaching Style</h3>
                      <p className="text-muted-foreground">{tutor.teachingStyle}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Education */}
                <Card>
                  <CardHeader>
                    <CardTitle>Education & Qualifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {tutor.education.map((edu, i) => (
                        <div key={i} className="flex items-start gap-4">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <Award className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{edu.degree}</h4>
                            <p className="text-muted-foreground">{edu.institution}</p>
                            <p className="text-sm text-muted-foreground">{edu.year}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Achievements */}
                <Card>
                  <CardHeader>
                    <CardTitle>Achievements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {tutor.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Subjects Tab */}
              <TabsContent value="subjects">
                <Card>
                  <CardHeader>
                    <CardTitle>Subjects I Teach</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {tutor.subjects.map((subject, i) => (
                        <div
                          key={i}
                          className="p-4 rounded-lg border border-border hover:border-primary/30 transition-colors"
                        >
                          <h4 className="font-semibold mb-2">{subject}</h4>
                          <p className="text-sm text-muted-foreground">
                            Expert level • Customized lessons available
                          </p>
                        </div>
                      ))}
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
                    <div className="space-y-6">
                      {tutor.reviews.map((review) => (
                        <div key={review.id} className="border-b pb-6 last:border-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-semibold">{review.studentName}</h4>
                              <p className="text-sm text-muted-foreground">{review.date}</p>
                            </div>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating
                                      ? "fill-amber-400 text-amber-400"
                                      : "text-muted-foreground"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-muted-foreground">{review.comment}</p>
                        </div>
                      ))}
                    </div>
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {tutor.availability.map((day, i) => (
                        <Card key={i}>
                          <CardHeader>
                            <CardTitle className="text-lg">{day.day}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              {day.slots.map((slot, j) => (
                                <Badge key={j} variant="secondary" className="w-full justify-center">
                                  {slot}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        tutor={tutor}
      />
    </div>
  );
};

export default TutorProfile;