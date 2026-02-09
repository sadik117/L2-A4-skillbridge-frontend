"use client";

import { useState } from "react";
import axios from "axios";
import { env } from "@/env";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus } from "lucide-react";

const DAYS = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

export default function TutorAvailabilityPage() {
  const API = env.NEXT_PUBLIC_FRONTEND_API_URL;

  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [slots, setSlots] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // toggle day
  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  // add slot locally
  const handleAddSlot = () => {
    if (!startTime || !endTime || selectedDays.length === 0) {
      toast.error("Select days and time");
      return;
    }

    if (new Date(startTime) >= new Date(endTime)) {
      toast.error("End time must be after start time");
      return;
    }

    setSlots((prev) => [
      ...prev,
      { startTime, endTime, daysOfWeek: selectedDays },
    ]);

    // reset
    setSelectedDays([]);
    setStartTime("");
    setEndTime("");
  };

  // remove slot
  const handleRemove = (index: number) => {
    setSlots((prev) => prev.filter((_, i) => i !== index));
  };

  // submit to backend
  const handleSubmit = async () => {
    if (slots.length === 0) {
      toast.error("Add at least one slot");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        `${API}/tutor/set-availability`,
        { slots },
        { withCredentials: true }
      );

      toast.success("Availability saved");
      setSlots([]);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to save");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 space-y-6">
      {/* ADD SLOT */}
      <Card>
        <CardHeader>
          <CardTitle>Set Availability</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* DAYS */}
          <div>
            <p className="font-medium mb-2">Days</p>
            <div className="flex flex-wrap gap-2">
              {DAYS.map((day) => (
                <Badge
                  key={day}
                  onClick={() => toggleDay(day)}
                  className={`cursor-pointer ${
                    selectedDays.includes(day)
                      ? "bg-purple-600 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {day}
                </Badge>
              ))}
            </div>
          </div>

          {/* TIME */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium mb-2">Start</p>
              <input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="border rounded px-3 py-2 w-full"
              />
            </div>

            <div>
              <p className="font-medium mb-2">End</p>
              <input
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="border rounded px-3 py-2 w-full"
              />
            </div>
          </div>

          <Button onClick={handleAddSlot} variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Slot
          </Button>
        </CardContent>
      </Card>

      {/* PREVIEW */}
      {slots.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Slots to Save</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {slots.map((slot, index) => (
              <div
                key={index}
                className="flex justify-between items-center border p-3 rounded"
              >
                <div>
                  <div className="font-medium">
                    {slot.daysOfWeek.join(", ")}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(slot.startTime).toLocaleString()} -{" "}
                    {new Date(slot.endTime).toLocaleString()}
                  </div>
                </div>

                <Trash2
                  onClick={() => handleRemove(index)}
                  className="h-4 w-4 text-red-500 cursor-pointer"
                />
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* SAVE */}
      <Button onClick={handleSubmit} disabled={loading} className="w-full h-12">
        {loading ? "Saving..." : "Save Availability"}
      </Button>
    </div>
  );
}
