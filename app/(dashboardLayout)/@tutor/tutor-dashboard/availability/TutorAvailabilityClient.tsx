"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, Calendar, Clock, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { postAvailability } from "./setAvailabilityAction";

const DAYS = ["MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY","SUNDAY"];

type Slot = {
  startTime: string; 
  endTime: string;   
  daysOfWeek?: string[];
  date?: string | null; 
};


interface TutorAvailabilityClientProps {
  initialSlots: Slot[];
}

export default function TutorAvailabilityClient({ initialSlots }: TutorAvailabilityClientProps) {
  const [slots, setSlots] = useState<Slot[]>(initialSlots || []);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [specificDate, setSpecificDate] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleDay = (day: string) => {
    setSelectedDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const handleAddSlot = () => {
    // Validation: Must have time and at least one day OR a date
    if (!startTime || !endTime || (selectedDays.length === 0 && !specificDate)) {
      toast.error("Please select days (or a date) and set the time range");
      return;
    }
    if (startTime >= endTime) {
      toast.error("End time must be after start time");
      return;
    }
    
    const newSlot: Slot = {
      startTime,
      endTime,
      daysOfWeek: selectedDays.length > 0 ? [...selectedDays] : [],
      date: specificDate || null,
    };

    setSlots(prev => [...prev, newSlot]);
    
    // Reset Form
    setSelectedDays([]);
    setStartTime("");
    setEndTime("");
    setSpecificDate("");
  };

  const handleRemove = (index: number) => setSlots(prev => prev.filter((_, i) => i !== index));

  const handleSubmit = async () => {
  if (slots.length === 0) {
    toast.error("Add at least one slot before saving");
    return;
  }

  try {
    setLoading(true);
    const result = await postAvailability(slots);

    if (result.success) {
      toast.success("Availability saved successfully");
      setSlots([]);
    } else {
      toast.error(result.message);
    }
  } catch {
    toast.error("An unexpected error occurred");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="max-w-3xl mx-auto py-10 px-4 space-y-6 text-zinc-900 dark:text-gray-800 transition-colors">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-700 dark:text-gray-800">Manage Availability</h1>
        <p className="text-muted-foreground dark:text-zinc-400">Set recurring weekly hours or specific available dates.</p>
      </div>

      <Card className="dark:bg-zinc-900 dark:border-zinc-800">
        <CardHeader>
          <CardTitle className="text-lg dark:text-zinc-200">Add Availability Block</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* DAY SELECTOR */}
          <div>
            <label className="text-sm font-medium flex items-center gap-2 mb-3 dark:text-zinc-300">
              <RotateCcw className="h-4 w-4" /> Recurring Days
            </label>
            <div className="flex flex-wrap gap-2">
              {DAYS.map((day) => {
                const isSelected = selectedDays.includes(day);
                return (
                  <Badge
                    key={day}
                    onClick={() => toggleDay(day)}
                    className={cn(
                      "cursor-pointer px-3 py-1.5 transition-all border-none",
                      isSelected 
                        ? "bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600" 
                        : "bg-secondary text-secondary-foreground hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
                    )}
                  >
                    {day.slice(0, 3)}
                  </Badge>
                );
              })}
            </div>
          </div>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t dark:border-zinc-800" /></div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-zinc-900 px-2 text-muted-foreground dark:text-zinc-500 font-bold">And</span>
            </div>
          </div>

          {/* SPECIFIC DATE */}
          <div>
            <label className="text-sm font-medium flex items-center gap-2 mb-2 dark:text-zinc-300">
              <Calendar className="h-4 w-4" /> Specific Date
            </label>
            <input
              type="date"
              value={specificDate}
              onChange={(e) => setSpecificDate(e.target.value)}
              className="w-full border rounded-md px-3 py-2 bg-background dark:bg-zinc-950 dark:border-zinc-800 focus:ring-2 focus:ring-purple-500 outline-none transition-colors"
            />
          </div>

          {/* TIME RANGE */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium flex items-center gap-2 mb-2 dark:text-zinc-300">
                <Clock className="h-4 w-4" /> Start Time
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full border rounded-md px-3 py-2 bg-background dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-200 transition-colors"
              />
            </div>
            <div>
              <label className="text-sm font-medium flex items-center gap-2 mb-2 dark:text-zinc-300">
                <Clock className="h-4 w-4" /> End Time
              </label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full border rounded-md px-3 py-2 bg-background dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-200 transition-colors"
              />
            </div>
          </div>

          <Button 
            onClick={handleAddSlot} 
            variant="outline" 
            className="w-full border-dashed dark:border-zinc-700 dark:hover:bg-zinc-800 dark:text-zinc-300"
          >
            <Plus className="h-4 w-4 mr-2" /> Add to List
          </Button>
        </CardContent>
      </Card>

      {/* PREVIEW LIST */}
      {slots.length > 0 && (
        <Card className="border-purple-100 bg-purple-50/30 dark:bg-purple-900/10 dark:border-purple-900/30">
          <CardHeader>
            <CardTitle className="text-base dark:text-gray-700">Pending Changes</CardTitle>
            <CardDescription className="dark:text-zinc-600">The following slots will be updated on the server.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {slots.map((slot, index) => (
              <div key={index} className="flex justify-between items-center bg-white dark:bg-zinc-950 border dark:border-zinc-800 p-3 rounded-lg shadow-sm">
                <div>
                  <div className="font-semibold text-purple-700 dark:text-purple-400">
                    {slot.daysOfWeek && slot.daysOfWeek.length > 0 && (
                      <span className="mr-2">{slot.daysOfWeek.join(", ")}</span>
                    )}
                    {slot.date && (
                      <span className={cn(slot.daysOfWeek?.length ? "border-l pl-2 border-zinc-300 dark:border-zinc-700" : "")}>
                        {slot.date}
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground dark:text-zinc-400">
                    {slot.startTime} — {slot.endTime}
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleRemove(index)} 
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <Button 
        onClick={handleSubmit} 
        disabled={loading || slots.length === 0} 
        className="w-full h-12 text-lg bg-purple-700 hover:bg-purple-800 dark:bg-purple-600 dark:hover:bg-purple-500 text-white transition-colors"
      >
        {loading ? "Saving to Server..." : "Save All Availability"}
      </Button>
    </div>
  );
}