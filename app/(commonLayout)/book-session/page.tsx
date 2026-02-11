"use client";

import { useEffect, useState } from "react";
import { env } from "@/env";
import { 
  Calendar, 
  Clock, 
  User, 
  BookOpen, 
  MapPin, 
  Sparkles,
  ChevronRight,
  Filter,
  X,
  Search,
  Loader2
} from "lucide-react";
import Link from "next/link";
import { format, parseISO, isToday, isTomorrow, isThisWeek } from "date-fns";

const API = env.NEXT_PUBLIC_FRONTEND_API_URL;

type Slot = {
  id: string;
  startTime: string;
  endTime: string;
  daysOfWeek: string[];
  tutorProfile: {
    id: string;
    user: {
      name: string;
      image?: string;
    };
    category: {
      name: string;
    };
    hourlyRate?: number;
    location?: string;
    rating?: number;
  };
};

export default function AvailabilityPage() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [filteredSlots, setFilteredSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetch(`${API}/student/available-sessions`)
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          setSlots(json.data);
          setFilteredSlots(json.data);
        }
      })
      .catch(err => console.error("Failed to load sessions:", err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let filtered = slots;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        slot => slot.tutorProfile.category.name === selectedCategory
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        slot =>
          slot.tutorProfile.user.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          slot.tutorProfile.category.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      );
    }

    setFilteredSlots(filtered);
  }, [selectedCategory, searchQuery, slots]);

  const categories = Array.from(
    new Set(slots.map(slot => slot.tutorProfile.category.name))
  );

  const getDayLabel = (dateStr: string) => {
    const date = parseISO(dateStr);
    if (isToday(date)) return "Today";
    if (isTomorrow(date)) return "Tomorrow";
    if (isThisWeek(date)) return format(date, "EEEE");
    return format(date, "MMM d, yyyy");
  };

  const formatTime = (dateStr: string) => {
    return format(parseISO(dateStr), "h:mm a");
  };

  const getDuration = (start: string, end: string) => {
    const startDate = parseISO(start);
    const endDate = parseISO(end);
    const diff = (endDate.getTime() - startDate.getTime()) / (1000 * 60);
    return `${diff} min`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background via-primary/5 to-background dark:from-gray-950 dark:via-primary/5 dark:to-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
            <p className="text-lg text-muted-foreground">Loading available sessions...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  bg-[radial-gradient(50%_50%_at_50%_0%,rgba(124,58,237,0.06)_0%,transparent_100%)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 lg:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 mb-6">
            <Calendar className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Available Now</span>
          </div>
          
          <h1 className="text-xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-primary to-purple-600 dark:from-white dark:via-primary dark:to-purple-400 bg-clip-text text-transparent">
            Available Sessions
          </h1>
          <p className="text-base md:text-lg text-muted-foreground">
            Book a session with our expert tutors at your convenience
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8 lg:mb-12">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by tutor name or subject..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-12 pr-4 rounded-full border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-300"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2"
                >
                  <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                </button>
              )}
            </div>

            {/* Filter Button - Mobile */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-primary transition-all"
            >
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>

            {/* Category Filter - Desktop */}
            <div className="hidden lg:flex items-center gap-2">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="h-12 px-6 rounded-full border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-300"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Mobile Filter Panel */}
          {showFilters && (
            <div className="lg:hidden mt-4 p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Filter by Category</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full h-12 px-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{filteredSlots.length}</span> sessions available
          </p>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm text-primary font-medium">Book instantly</span>
          </div>
        </div>

        {/* Sessions Grid */}
        {filteredSlots.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
              <Calendar className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No sessions available
            </h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your filters or check back later
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-primary to-purple-600 text-white font-medium hover:opacity-90 transition-opacity"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredSlots.map((slot) => (
              <div
                key={slot.id}
                className="group relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-800 hover:border-primary/30 dark:hover:border-primary/40 hover:-translate-y-2"
              >
                {/* Background Gradient Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-600/5 dark:from-primary/10 dark:to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Day Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30">
                    <Calendar className="h-3 w-3 text-primary" />
                    <span className="text-xs font-medium text-primary">
                      {getDayLabel(slot.startTime)}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-7 lg:p-8">
                  {/* Tutor Info */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative flex-shrink-0">
                      <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-full overflow-hidden ring-4 ring-white dark:ring-gray-900 shadow-lg">
                        <div className="w-full h-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                          <span className="text-white font-bold text-xl">
                            {slot.tutorProfile.user.name.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white dark:border-gray-900" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg sm:text-xl text-gray-900 dark:text-white truncate group-hover:text-primary transition-colors">
                        {slot.tutorProfile.user.name}
                      </h3>
                      <div className="flex items-center gap-1.5 mt-1">
                        <BookOpen className="h-3.5 w-3.5 text-gray-400 dark:text-gray-500" />
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                          {slot.tutorProfile.category.name}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Session Details */}
                  <div className="space-y-3 mb-6">
                    {/* Time */}
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                      <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Duration: {getDuration(slot.startTime, slot.endTime)}
                        </p>
                      </div>
                    </div>

                    {/* Days */}
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Available on
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {slot.daysOfWeek.map((day) => (
                            <span
                              key={day}
                              className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                            >
                              {day.slice(0, 3)}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Location (if available) */}
                    {slot.tutorProfile.location && (
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {slot.tutorProfile.location}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Price & Booking */}
                  <div className="relative z-10 flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex flex-col">
                      <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                        ৳{slot.tutorProfile.hourlyRate || 500}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-500">per hour</span>
                    </div>
                    
                    <Link
                      href={`/tutor/profile/${slot.tutorProfile.id}`}
                      className="group/btn inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-primary to-purple-600 text-white font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                      <span>Book Now</span>
                      <ChevronRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More (if needed) */}
        {filteredSlots.length > 6 && (
          <div className="text-center mt-12">
            <button className="px-8 py-3 rounded-full bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 hover:border-primary dark:hover:border-primary text-gray-700 dark:text-gray-300 font-medium hover:text-primary transition-all duration-300">
              Load More Sessions
            </button>
          </div>
        )}
      </div>
    </div>
  );
}