"use client";

import { useState, useTransition } from "react";
import {
  MapPin,
  Clock,
  BookOpen,
  Calendar,
  ChevronLeft,
  Share2,
  Bookmark,
  Check,
  Loader2,
  Star,
  Award,
  Users,
  GraduationCap,
  MessageCircle,
  Verified,
  Sparkles,
  TrendingUp,
  CalendarDays,
  Quote,
  Globe,
  Mail,
  Phone
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { bookSessionAction } from "@/app/(commonLayout)/browse-tutors/profile/[id]/serverAction";


export default function TutorProfile({ tutor }: { tutor: any }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("about");

  // Calculate average rating
  const averageRating = tutor.reviews?.length > 0
    ? (tutor.reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / tutor.reviews.length).toFixed(1)
    : "4.9";

  const formatTime = (dateStr: string) =>
    new Date(dateStr).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const handleBooking = () => {
    if (!selectedSlot) return toast.error("Select a slot first");

    startTransition(async () => {
      const result = await bookSessionAction(tutor.id, selectedSlot);
      if (result.success) {
        toast.success("Session booked successfully!");
        setIsBookingOpen(false);
        setSelectedSlot(null);
      } else {
        toast.error(result.message);
      }
    });
  };

  // Get available slots
  const availableSlots = tutor.availability?.filter((slot: any) => !slot.isBooked) || [];
  const bookedSlots = tutor.availability?.filter((slot: any) => slot.isBooked) || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 via-white to-zinc-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column: Profile Card */}
          <aside className="lg:col-span-1">
            <Card className="sticky top-24 border-0 shadow-xl rounded-3xl overflow-hidden bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950">
              <div className="relative h-32 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                  <Avatar className="w-28 h-28 border-4 border-white dark:border-zinc-900 shadow-2xl">
                    <AvatarImage src={tutor.user.image || undefined} />
                    <AvatarFallback className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white text-2xl font-bold">
                      {tutor.user.name?.charAt(0) || "T"}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>
              
              <CardContent className="pt-16 pb-8 text-center">
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
                  {tutor.user.name}
                </h1>
                
                <div className="flex items-center justify-center gap-2 mt-2">
                  <Badge className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 hover:bg-indigo-100">
                    {tutor.category?.name}
                  </Badge>
                  {tutor.experience && (
                    <Badge variant="outline" className="border-emerald-200 text-emerald-700 dark:border-emerald-800 dark:text-emerald-400">
                      {tutor.experience}+ Years
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-center gap-1 mt-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-4 h-4",
                        i < Math.floor(parseFloat(averageRating))
                          ? "fill-amber-400 text-amber-400"
                          : "text-zinc-300 dark:text-zinc-700"
                      )}
                    />
                  ))}
                  <span className="ml-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                    {averageRating}
                  </span>
                  <span className="text-sm text-zinc-500">
                    ({tutor.reviews?.length || 0} reviews)
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 my-6 py-4 border-y border-zinc-100 dark:border-zinc-800">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Users className="w-4 h-4 text-indigo-500" />
                      <p className="text-xs font-medium text-zinc-500">Students</p>
                    </div>
                    <p className="font-bold text-lg text-zinc-900 dark:text-white">
                      {tutor.totalStudents || 45}+
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <CalendarDays className="w-4 h-4 text-indigo-500" />
                      <p className="text-xs font-medium text-zinc-500">Sessions</p>
                    </div>
                    <p className="font-bold text-lg text-zinc-900 dark:text-white">
                      {tutor.totalSessions || 120}+
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="text-3xl font-bold text-zinc-900 dark:text-white">
                    ৳{tutor.hourlyRate}
                    <span className="text-sm font-normal text-zinc-500">/hour</span>
                  </div>
                  <p className="text-xs text-zinc-500 mt-1">Starting rate</p>
                </div>

                <Button
                  onClick={() => setIsBookingOpen(true)}
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/20 transition-all duration-300"
                >
                  <Calendar className="w-4 h-4 mr-2" /> Book a Session
                </Button>

              </CardContent>
            </Card>
          </aside>

          {/* Right Column: Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border border-indigo-100 dark:border-indigo-900">
                <Award className="w-5 h-5 text-indigo-600 mb-2" />
                <p className="text-2xl font-bold text-indigo-700 dark:text-indigo-400">
                  #{tutor.rank || 1}
                </p>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">Top Rated</p>
              </div>
              <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border border-emerald-100 dark:border-emerald-900">
                <TrendingUp className="w-5 h-5 text-emerald-600 mb-2" />
                <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">
                  {tutor.bookingRate || 95}%
                </p>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">Booking Rate</p>
              </div>
              <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border border-amber-100 dark:border-amber-900">
                <Sparkles className="w-5 h-5 text-amber-600 mb-2" />
                <p className="text-2xl font-bold text-amber-700 dark:text-amber-400">
                  {tutor.responseTime || "< 1"}h
                </p>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">Response Time</p>
              </div>
            </div>

            {/* Main Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full justify-start h-auto bg-transparent border-b border-zinc-200 dark:border-zinc-800 rounded-none p-0 gap-8">
                <TabsTrigger
                  value="about"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-indigo-500 rounded-none bg-transparent px-0 pb-3 text-sm font-semibold uppercase tracking-wider"
                >
                  About
                </TabsTrigger>
                <TabsTrigger
                  value="availability"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-indigo-500 rounded-none bg-transparent px-0 pb-3 text-sm font-semibold uppercase tracking-wider"
                >
                  Availability ({availableSlots.length})
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-indigo-500 rounded-none bg-transparent px-0 pb-3 text-sm font-semibold uppercase tracking-wider"
                >
                  Reviews ({tutor.reviews?.length || 0})
                </TabsTrigger>
              </TabsList>

              {/* About Tab */}
              <TabsContent value="about" className="py-6 space-y-6">
                <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30">
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-indigo-600" />
                      Biography
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {tutor.bio || "No bio provided yet."}
                    </p>
                  </CardContent>
                </Card>

                {/* Teaching Style & Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-0 shadow-lg rounded-2xl">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-900/30">
                          <GraduationCap className="w-5 h-5 text-indigo-600" />
                        </div>
                        <h3 className="font-bold text-zinc-900 dark:text-white">Teaching Style</h3>
                      </div>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        {tutor.teachingStyle || "Interactive and student-centered approach with real-world examples."}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg rounded-2xl">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-900/30">
                          <MapPin className="w-5 h-5 text-emerald-600" />
                        </div>
                        <h3 className="font-bold text-zinc-900 dark:text-white">Location</h3>
                      </div>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        {tutor.location || "Online / Remote"}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Contact Info */}
                <Card className="border-0 shadow-lg rounded-2xl">
                  <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30">
                    <CardTitle className="flex items-center gap-2">
                      <MessageCircle className="w-5 h-5 text-indigo-600" />
                      Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-zinc-400" />
                        <span className="text-sm text-zinc-600 dark:text-zinc-400">{tutor.user?.email || "Not provided"}</span>
                      </div>
                      {tutor.user?.phone && (
                        <div className="flex items-center gap-3">
                          <Phone className="w-4 h-4 text-zinc-400" />
                          <span className="text-sm text-zinc-600 dark:text-zinc-400">{tutor.user.phone}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-3">
                        <Globe className="w-4 h-4 text-zinc-400" />
                        <span className="text-sm text-zinc-600 dark:text-zinc-400">Available for online sessions</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Availability Tab */}
              <TabsContent value="availability" className="py-6">
                {availableSlots.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                      <Calendar className="w-10 h-10 text-zinc-400" />
                    </div>
                    <p className="text-zinc-500">No available slots at the moment</p>
                    <p className="text-sm text-zinc-400 mt-1">Check back later for new slots</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {availableSlots.map((slot: any) => (
                      <div
                        key={slot.id}
                        className="group p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-lg transition-all duration-300"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-900/50 transition-colors">
                              <Clock className="w-5 h-5 text-indigo-600" />
                            </div>
                            <div>
                              <div className="flex flex-wrap gap-2 mb-1">
                                {slot.daysOfWeek.map((day: string) => (
                                  <Badge key={day} variant="secondary" className="text-xs">
                                    {day.slice(0, 3)}
                                  </Badge>
                                ))}
                              </div>
                              <p className="font-medium text-zinc-900 dark:text-white">
                                {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                              </p>
                              <p className="text-xs text-zinc-500 mt-1">
                                {formatDate(slot.startTime)}
                              </p>
                            </div>
                          </div>
                          <Badge className="bg-emerald-500 hover:bg-emerald-600">
                            Available
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {bookedSlots.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-sm font-semibold text-zinc-500 mb-4">Booked Slots</h3>
                    <div className="grid grid-cols-1 gap-3">
                      {bookedSlots.map((slot: any) => (
                        <div key={slot.id} className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 opacity-60">
                          <div className="flex items-center gap-3">
                            <Clock className="w-4 h-4 text-zinc-400" />
                            <div>
                              <p className="text-sm text-zinc-500">{slot.daysOfWeek.join(", ")}</p>
                              <p className="text-xs text-zinc-400">{formatTime(slot.startTime)} - {formatTime(slot.endTime)}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>

              {/* Reviews Tab */}
              <TabsContent value="reviews" className="py-6">
                {tutor.reviews?.length > 0 ? (
                  <>
                    {/* Rating Summary */}
                    <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30">
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="text-center">
                          <div className="text-4xl font-bold text-indigo-700 dark:text-indigo-400">
                            {averageRating}
                          </div>
                          <div className="flex items-center justify-center gap-1 mt-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={cn(
                                  "w-4 h-4",
                                  i < Math.floor(parseFloat(averageRating))
                                    ? "fill-amber-400 text-amber-400"
                                    : "text-zinc-300 dark:text-zinc-700"
                                )}
                              />
                            ))}
                          </div>
                          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">Average Rating</p>
                        </div>
                        <div className="text-center">
                          <div className="text-4xl font-bold text-indigo-700 dark:text-indigo-400">
                            {tutor.reviews.length}
                          </div>
                          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">Total Reviews</p>
                        </div>
                        <div className="text-center">
                          <div className="text-4xl font-bold text-indigo-700 dark:text-indigo-400">
                            98%
                          </div>
                          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">Would Recommend</p>
                        </div>
                      </div>
                    </div>

                    {/* Reviews List */}
                    <div className="space-y-4">
                      {tutor.reviews.map((review: any) => (
                        <div
                          key={review.id}
                          className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-all duration-300"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <Avatar className="w-10 h-10">
                                <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white">
                                  {review.student?.name?.charAt(0) || "S"}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-semibold text-zinc-900 dark:text-white">
                                  {review.student?.name || "Anonymous"}
                                </h4>
                                <div className="flex items-center gap-1 mt-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={cn(
                                        "w-3 h-3",
                                        i < review.rating
                                          ? "fill-amber-400 text-amber-400"
                                          : "text-zinc-300 dark:text-zinc-700"
                                      )}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                            <span className="text-xs text-zinc-500">
                              {formatDate(review.createdAt)}
                            </span>
                          </div>
                          <div className="relative">
                            <Quote className="absolute -top-2 -left-2 w-8 h-8 text-zinc-200 dark:text-zinc-800" />
                            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed pl-6">
                              {review.comment}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                      <Star className="w-10 h-10 text-zinc-400" />
                    </div>
                    <p className="text-zinc-500">No reviews yet</p>
                    <p className="text-sm text-zinc-400 mt-1">Be the first to leave a review!</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      {/* Booking Modal */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsBookingOpen(false)}
          />
          <Card className="relative w-full max-w-md rounded-2xl border-0 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600" />
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30">
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-600" />
                Book a Session
              </CardTitle>
              <p className="text-sm text-zinc-500 mt-1">Select your preferred time slot</p>
            </CardHeader>
            <CardContent className="p-6 space-y-3 max-h-[400px] overflow-y-auto">
              {availableSlots.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-zinc-500">No available slots</p>
                </div>
              ) : (
                availableSlots.map((slot: any) => (
                  <button
                    key={slot.id}
                    onClick={() => setSelectedSlot(slot.id)}
                    className={cn(
                      "w-full p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between group",
                      selectedSlot === slot.id
                        ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30 shadow-lg"
                        : "border-zinc-200 dark:border-zinc-800 hover:border-indigo-300 dark:hover:border-indigo-700"
                    )}
                  >
                    <div>
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {slot.daysOfWeek.map((day: string) => (
                          <Badge key={day} variant="secondary" className="text-xs">
                            {day.slice(0, 3)}
                          </Badge>
                        ))}
                      </div>
                      <p className="font-semibold text-zinc-900 dark:text-white">
                        {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                      </p>
                      <p className="text-xs text-zinc-500 mt-1">
                        {formatDate(slot.startTime)}
                      </p>
                    </div>
                    {selectedSlot === slot.id && (
                      <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </button>
                ))
              )}
            </CardContent>
            <div className="p-6 border-t border-zinc-100 dark:border-zinc-800 flex gap-3 bg-white dark:bg-zinc-900">
              <Button
                variant="outline"
                onClick={() => setIsBookingOpen(false)}
                className="flex-1 rounded-xl border-zinc-200 dark:border-zinc-800"
              >
                Cancel
              </Button>
              <Button
                disabled={isPending || !selectedSlot || availableSlots.length === 0}
                onClick={handleBooking}
                className="flex-[2] rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
              >
                {isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                ) : (
                  "Confirm Booking"
                )}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}