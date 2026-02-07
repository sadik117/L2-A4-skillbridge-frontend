// components/booking/BookingModal.tsx
"use client";

import { useState } from "react";
import { X, Calendar, Clock, DollarSign, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { Separator } from "../ui/separator";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  tutor: any;
}

const BookingModal = ({ isOpen, onClose, tutor }: BookingModalProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [notes, setNotes] = useState("");
  const [duration, setDuration] = useState(60); // in minutes

  const availableTimes = [
    "09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", 
    "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM"
  ];

  const calculateTotal = () => {
    return (tutor.hourlyRate / 60) * duration;
  };

  const handleBooking = () => {
    // Handle booking logic here
    console.log("Booking session:", {
      tutorId: tutor.id,
      date: selectedDate,
      time: selectedTime,
      duration,
      notes,
      total: calculateTotal(),
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Book a Session with {tutor.user.name}
          </DialogTitle>
          <DialogDescription>
            Select your preferred date and time for the tutoring session.
          </DialogDescription>
          <DialogClose className="absolute right-4 top-4">
            <X className="h-4 w-4" />
          </DialogClose>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Tutor Info */}
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold">
              {tutor.user.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold">{tutor.user.name}</h4>
              <p className="text-sm text-muted-foreground">{tutor.category.name}</p>
            </div>
            <div className="text-right">
              <div className="font-bold text-lg">৳{tutor.hourlyRate}/hr</div>
              <div className="text-sm text-muted-foreground">Rate</div>
            </div>
          </div>

          {/* Date Selection */}
          <div className="space-y-3">
            <Label>Select Date</Label>
            <div className="grid grid-cols-7 gap-2">
              {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDate(new Date(Date.now() + day * 24 * 60 * 60 * 1000))}
                  className={`p-2 rounded-lg border ${
                    selectedDate.getDate() === new Date(Date.now() + day * 24 * 60 * 60 * 1000).getDate()
                      ? "border-primary bg-primary/10"
                      : "border-input hover:border-primary/50"
                  }`}
                >
                  <div className="text-sm font-medium">
                    {format(new Date(Date.now() + day * 24 * 60 * 60 * 1000), "EEE")}
                  </div>
                  <div className="text-lg font-bold">
                    {format(new Date(Date.now() + day * 24 * 60 * 60 * 1000), "d")}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Time Selection */}
          <div className="space-y-3">
            <Label>Select Time Slot</Label>
            <div className="grid grid-cols-3 gap-2">
              {availableTimes.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`p-3 rounded-lg border ${
                    selectedTime === time
                      ? "border-primary bg-primary/10"
                      : "border-input hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {time}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div className="space-y-3">
            <Label>Session Duration</Label>
            <div className="flex gap-2">
              {[30, 60, 90, 120].map((minutes) => (
                <button
                  key={minutes}
                  onClick={() => setDuration(minutes)}
                  className={`flex-1 py-2 rounded-lg border ${
                    duration === minutes
                      ? "border-primary bg-primary/10"
                      : "border-input hover:border-primary/50"
                  }`}
                >
                  {minutes} min
                </button>
              ))}
            </div>
          </div>

          {/* Additional Notes */}
          <div className="space-y-3">
            <Label>Additional Notes (Optional)</Label>
            <Textarea
              placeholder="Any specific topics or questions you'd like to cover?"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          {/* Summary */}
          <div className="rounded-lg border p-4 space-y-3">
            <h4 className="font-semibold">Booking Summary</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tutor</span>
                <span>{tutor.user.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date</span>
                <span>{format(selectedDate, "PPP")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Time</span>
                <span>{selectedTime || "Not selected"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration</span>
                <span>{duration} minutes</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-primary">৳{calculateTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={handleBooking}
              disabled={!selectedTime}
              className="flex-1 bg-gradient-to-r from-primary to-purple-600 hover:opacity-90"
            >
              <DollarSign className="mr-2 h-4 w-4" />
              Confirm Booking
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;