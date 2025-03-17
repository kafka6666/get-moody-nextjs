"use client";

import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import MoodSelector from "./MoodSelector";
import { MoodType } from "@/lib/types";
import { saveMood, getMoodForDate } from "@/lib/mood-service";
import { cn } from "@/lib/utils";

interface MoodFormProps {
  onSave: () => void;
  className?: string;
}

export default function MoodForm({ onSave, className }: MoodFormProps) {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedMood, setSelectedMood] = useState<MoodType | undefined>(undefined);
  const [note, setNote] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  // Load existing mood for the selected date
  useEffect(() => {
    const existingMood = getMoodForDate(date);
    if (existingMood) {
      setSelectedMood(existingMood.mood);
      setNote(existingMood.note || "");
    } else {
      setSelectedMood(undefined);
      setNote("");
    }
  }, [date]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedMood) {
      saveMood(date, selectedMood, note);
      onSave();
      
      // Reset form if it's today's entry
      const today = new Date();
      if (date.toDateString() !== today.toDateString()) {
        setDate(today);
      }
      
      setIsOpen(false);
    }
  };

  return (
    <div className={cn("w-full max-w-md mx-auto", className)}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium">Date</label>
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <button
                type="button"
                className={cn(
                  "flex items-center justify-between rounded-md border border-input bg-background px-3 py-2",
                  "text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none",
                  "focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                )}
              >
                {format(date, "PPP")}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(newDate) => {
                  if (newDate) {
                    setDate(newDate);
                    setIsOpen(false);
                  }
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium">How are you feeling today?</label>
          <MoodSelector 
            selectedMood={selectedMood} 
            onSelect={setSelectedMood} 
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="note" className="text-sm font-medium">
            Notes (optional)
          </label>
          <textarea
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="min-h-[100px] rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Add any thoughts about your day..."
          />
        </div>

        <button
          type="submit"
          disabled={!selectedMood}
          className={cn(
            "w-full flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium",
            "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2",
            "focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          )}
        >
          Save Mood
        </button>
      </form>
    </div>
  );
}
