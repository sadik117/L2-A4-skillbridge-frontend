"use client";

import { useState, useEffect } from "react";
import {
  MapPin,
  Clock,
  BookOpen,
  Calendar,
  ChevronLeft,
  Share2,
  Bookmark,
  Check,
  CalendarCheck,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { env } from "@/env";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";

const formatTime = (dateStr: string) =>
  new Date(dateStr).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

interface TutorProfileProps {
  tutor: any;
}

const TutorProfile = ({ tutor }: TutorProfileProps) => {
  const API = env.NEXT_PUBLIC_FRONTEND_API_URL;
  const router = useRouter();

  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("about");
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [studentId, setStudentId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const session = await authClient.getSession();
        if (session.data?.user.id) {
          setStudentId(session.data?.user.id);
        }
        console.log(session);
      } catch (err) {
        console.error("Failed to get session:", err);
      }
    };

    fetchUser();
  }, []);

  // console.log("Student ID:", studentId);

  // detect theme
  useEffect(() => {
    const checkDarkMode = () =>
      setDarkMode(document.documentElement.classList.contains("dark"));

    checkDarkMode();

    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  if (!tutor || !tutor.user) {
    return (
      <div className="flex min-h-screen items-center justify-center text-muted-foreground">
        Tutor profile not available.
      </div>
    );
  }

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
    languages = [],
    teachingStyle = "",
    reviews = [],
  } = tutor;

  // Book session
  const handleConfirmBooking = async () => {
    if (!studentId) {
      toast.error("Please login first");
      router.push("/login");
      return;
    }

    if (!selectedSlot) {
      toast.error("Please select a slot");
      return;
    }

    const slot = availability.find((s: any) => s.id === selectedSlot);

    if (slot?.isBooked) {
      toast.error("This slot is already booked");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        `${API}/booking/book-session`,
        {
          studentId,
          tutorId: tutor.id,
          slotId: selectedSlot,
        },
        { withCredentials: true },
      );

      toast.success("Booking confirmed");
      setIsBookingOpen(false);
      router.refresh();
    } catch (err: any) {
      if (err.response?.status === 401) {
        toast.error("Session expired. Login again.");
        router.push("/login");
      } else {
        toast.error(err.response?.data?.message || "Booking failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Top */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between">
          <Button variant="ghost" onClick={() => router.back()}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <div className="flex gap-2">
            <Button variant="ghost" size="icon">
              <Bookmark className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Layout */}
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT */}
        <div className="space-y-6">
          <Card className="sticky top-24">
            <CardContent className="pt-6 text-center">
              <Avatar className="h-32 w-32 mb-4 ml-20 md:ml-16 border-4 border-background shadow-lg">
                <AvatarImage src={user.avatar} />{" "}
                <AvatarFallback className="bg-gradient-to-br from-primary to-purple-600 text-white text-3xl">
                  {" "}
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <h1 className="text-2xl font-bold">{user.name}</h1>

              <p className="text-muted-foreground flex items-center gap-1 justify-center">
                <BookOpen className="h-4 w-4" />
                {category?.name ?? "Uncategorized"}
              </p>

              {/* rating */}
              <div className="flex justify-center gap-2 my-3">
                <span className="font-bold">{rating.toFixed(1)}</span>
                <span className="text-muted-foreground">
                  ({reviewCount} reviews)
                </span>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex items-center justify-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {location}
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Clock className="h-4 w-4" />
                  {experience} years
                </div>
                <div className="flex gap-1 justify-center flex-wrap">
                  {languages.map((l: string, i: number) => (
                    <Badge key={i}>{l}</Badge>
                  ))}
                </div>
              </div>

              <div className="text-3xl font-bold mb-4">৳{hourlyRate}/hour</div>

              <Button onClick={() => setIsBookingOpen(true)} className="w-full">
                <Calendar className="mr-2 h-4 w-4" />
                Book a Session
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="subjects">Subjects</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({reviewCount})</TabsTrigger>
              <TabsTrigger value="availability">Schedule</TabsTrigger>
            </TabsList>

            <TabsContent value="about">
              <Card>
                <CardHeader>
                  <CardTitle>About Me</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>{bio}</p>
                  <div>
                    <h3 className="font-semibold">Teaching Style</h3>
                    <p className="text-muted-foreground">{teachingStyle}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="subjects">
              <Card>
                <CardHeader>
                  <CardTitle>Subjects</CardTitle>
                </CardHeader>
                <CardContent>{category?.slug}</CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews">
              <Card>
                <CardHeader>
                  <CardTitle>Student Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  {reviews.length
                    ? reviews.map((r: any) => (
                        <div key={r.id} className="mb-4">
                          <h4 className="font-semibold">{r.student.name}</h4>
                          <p className="text-muted-foreground">{r.comment}</p>
                        </div>
                      ))
                    : "No reviews yet."}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="availability">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  {availability.length
                    ? availability.map((slot: any) => (
                        <div
                          key={slot.id}
                          className="flex justify-between border p-2 rounded mb-2"
                        >
                          <span>{slot.daysOfWeek.join(", ")}</span>
                          <span>
                            {formatTime(slot.startTime)} -{" "}
                            {formatTime(slot.endTime)}
                          </span>
                        </div>
                      ))
                    : "No availability"}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* MODAL  */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setIsBookingOpen(false)}
          />

          <div className="relative bg-white dark:bg-gray-900 p-6 rounded-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Select Time Slot</h2>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {availability.map((slot: any) => {
                const disabled = slot.isBooked;

                return (
                  <div
                    key={slot.id}
                    onClick={() => {
                      if (disabled) return;
                      setSelectedSlot(slot.id);
                    }}
                    className={cn(
                      "p-3 rounded border flex justify-between items-center transition",
                      disabled
                        ? "opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-800"
                        : "cursor-pointer hover:border-purple-400",
                      selectedSlot === slot.id && "border-purple-500",
                    )}
                  >
                    <div>
                      <div className="font-medium">
                        {slot.daysOfWeek.join(", ")}
                      </div>

                      <div className="text-sm text-muted-foreground">
                        {formatTime(slot.startTime)} –{" "}
                        {formatTime(slot.endTime)}
                      </div>

                      {/* BOOKED MESSAGE */}
                      {disabled && (
                        <div className="text-xs text-red-600 dark:text-red-400 mt-1 font-semibold">
                          Slot already booked
                        </div>
                      )}
                    </div>

                    {/*  CHECK ICON */}
                    {!disabled && selectedSlot === slot.id && (
                      <Check className="h-4 w-4 text-purple-600" />
                    )}
                  </div>
                );
              })}
            </div>

            <Button
              onClick={handleConfirmBooking}
              disabled={loading || !selectedSlot}
              className="w-full mt-4"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Booking...
                </>
              ) : (
                <>
                  <CalendarCheck className="h-4 w-4 mr-2" />
                  Confirm Booking
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TutorProfile;
