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
  CalendarCheck,
  Loader2,
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

  const handleBooking = () => {
    if (!selectedSlot) return toast.error("Select a slot first");

    startTransition(async () => {
      const result = await bookSessionAction(tutor.id, selectedSlot);
      if (result.success) {
        toast.success("Session booked successfully!");
        setIsBookingOpen(false);
      } else {
        toast.error(result.message);
      }
    });
  };

  const formatTime = (dateStr: string) =>
    new Date(dateStr).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors">
      {/* Sticky Header */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="rounded-full"
          >
            <ChevronLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bookmark className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Profile Card */}
        <aside className="lg:col-span-1">
          <Card className="sticky top-24 border-zinc-200 dark:border-zinc-800 shadow-xl rounded-3xl overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-indigo-600 to-purple-600" />
            <CardContent className="pt-0 text-center -mt-12">
              <Avatar className="w-24 h-24 mx-auto border-4 border-white dark:border-zinc-900 shadow-lg">
                <AvatarImage src={tutor.user.avatar} />
                <AvatarFallback className="bg-zinc-200 dark:bg-zinc-800 text-xl font-bold">
                  {tutor.user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <h1 className="mt-4 text-2xl font-black text-zinc-900 dark:text-zinc-50">
                {tutor.user.name}
              </h1>
              <Badge
                variant="secondary"
                className="mt-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
              >
                {tutor.category?.name}
              </Badge>

              <div className="grid grid-cols-2 gap-4 my-6 py-4 border-y border-zinc-100 dark:border-zinc-800">
                <div>
                  <p className="text-[10px] font-bold uppercase text-zinc-400">
                    Rating
                  </p>
                  <p className="font-bold text-zinc-900 dark:text-zinc-50">
                    ★ {tutor.rating}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase text-zinc-400">
                    Experience
                  </p>
                  <p className="font-bold text-zinc-900 dark:text-zinc-50">
                    {tutor.experience} Years
                  </p>
                </div>
              </div>

              <div className="text-3xl font-black text-zinc-900 dark:text-zinc-50 mb-6">
                ৳{tutor.hourlyRate}
                <span className="text-sm font-normal text-zinc-500">/hr</span>
              </div>

              <Button
                onClick={() => setIsBookingOpen(true)}
                className="w-full h-12 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20"
              >
                <Calendar className="w-4 h-4 mr-2" /> Book a Session
              </Button>
            </CardContent>
          </Card>
        </aside>

        {/* Right Column: Content */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="w-full justify-start h-12 bg-transparent border-b border-zinc-200 dark:border-zinc-800 rounded-none p-0 gap-8">
              {["about", "availability", "reviews"].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="data-[state=active]:border-b-2 data-[state=active]:border-indigo-500 rounded-none bg-transparent px-0 text-sm font-bold uppercase tracking-wider"
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="about" className="py-6 space-y-8">
              <section>
                <h2 className="text-xl font-bold mb-4">Biography</h2>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {tutor.bio}
                </p>
              </section>
              <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                  <h3 className="font-bold flex items-center gap-2 mb-2">
                    <BookOpen className="w-4 h-4 text-indigo-500" /> Teaching
                    Style
                  </h3>
                  <p className="text-sm text-zinc-500">
                    {tutor.teachingStyle || "Adaptive and student-focused."}
                  </p>
                </div>
                <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                  <h3 className="font-bold flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-indigo-500" /> Location
                  </h3>
                  <p className="text-sm text-zinc-500">{tutor.location}</p>
                </div>
              </section>
            </TabsContent>

            <TabsContent value="availability" className="py-6">
              <div className="grid grid-cols-1 gap-4">
                {tutor.availability.map((slot: any) => (
                  <div
                    key={slot.id}
                    className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800">
                        <Clock className="w-4 h-4 text-indigo-500" />
                      </div>
                      <div>
                        <p className="font-bold text-sm uppercase">
                          {slot.daysOfWeek.join(", ")}
                        </p>
                        <p className="text-xs text-zinc-500">
                          {formatTime(slot.startTime)} -{" "}
                          {formatTime(slot.endTime)}
                        </p>
                      </div>
                    </div>
                    {slot.isBooked ? (
                      <Badge
                        variant="outline"
                        className="text-red-500 border-red-200"
                      >
                        Booked
                      </Badge>
                    ) : (
                      <Badge className="bg-emerald-500">Available</Badge>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="py-6 outline-none">
              <div className="space-y-6">
                {/* REVIEWS HEADER / SUMMARY */}
                {tutor.reviews.length > 0 && (
                  <div className="flex items-center justify-between p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
                    <div>
                      <h3 className="text-2xl font-bold">
                        {tutor.rating} ★
                      </h3>
                      <p className="text-sm text-zinc-500">
                        Average Student Rating
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">{tutor.reviews.length}</p>
                      <p className="text-sm text-zinc-500">Total Reviews</p>
                    </div>
                  </div>
                )}

                {/* REVIEWS LIST */}
                <div className="grid grid-cols-1 gap-4">
                  {tutor.reviews.length > 0 ? (
                    tutor.reviews.map((r: any) => (
                      <div
                        key={r.id}
                        className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-3">
                            {/* Avatar Placeholder */}
                            <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-xs">
                              {r.student.name.charAt(0)}
                            </div>
                            <div>
                              <h4 className="font-bold text-sm dark:text-zinc-200">
                                {r.student.name}
                              </h4>
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <svg
                                    key={i}
                                    className={cn(
                                      "w-3 h-3",
                                      i < r.rating
                                        ? "text-amber-400 fill-amber-400"
                                        : "text-zinc-300 dark:text-zinc-700",
                                    )}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                  </svg>
                                ))}
                              </div>
                            </div>
                          </div>
                          <span className="text-[10px] text-zinc-400 uppercase font-medium"> 
                            {r.createdAt
                              ? new Date(r.createdAt).toLocaleDateString()
                              : "Recent"}
                          </span>
                        </div>

                        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed italic">
                          {r.comment}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12 border-2 border-dashed border-zinc-100 dark:border-zinc-800 rounded-2xl">
                      <p className="text-zinc-500 text-sm">
                        No reviews yet for this tutor.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Modern Booking Modal */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm"
            onClick={() => setIsBookingOpen(false)}
          />
          <Card className="relative w-full max-w-md rounded-3xl border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden">
            <CardHeader className="bg-zinc-50 dark:bg-zinc-800/50">
              <CardTitle className="text-xl font-black">
                Select a Slot
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-3 max-h-[400px] overflow-y-auto">
              {tutor.availability.map((slot: any) => (
                <button
                  key={slot.id}
                  disabled={slot.isBooked}
                  onClick={() => setSelectedSlot(slot.id)}
                  className={cn(
                    "w-full p-4 rounded-2xl border text-left transition-all flex justify-between items-center",
                    slot.isBooked
                      ? "opacity-40 cursor-not-allowed bg-zinc-100 dark:bg-zinc-800"
                      : "hover:border-indigo-500",
                    selectedSlot === slot.id
                      ? "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-900/20 ring-1 ring-indigo-500"
                      : "border-zinc-200 dark:border-zinc-800",
                  )}
                >
                  <div>
                    <p className="font-bold text-sm uppercase">
                      {slot.daysOfWeek.join(", ")}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                    </p>
                  </div>
                  {selectedSlot === slot.id && (
                    <Check className="w-5 h-5 text-indigo-600" />
                  )}
                </button>
              ))}
            </CardContent>
            <div className="p-6 border-t border-zinc-100 dark:border-zinc-800 flex gap-3">
              <Button
                variant="ghost"
                onClick={() => setIsBookingOpen(false)}
                className="flex-1 rounded-xl"
              >
                Cancel
              </Button>
              <Button
                disabled={isPending || !selectedSlot}
                onClick={handleBooking}
                className="flex-[2] rounded-xl bg-indigo-600 text-white"
              >
                {isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
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
