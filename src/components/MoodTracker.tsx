"use client";

import React, { useState, useEffect } from "react";
import { getMoods } from "@/lib/mood-service";
import { MoodEntry, TimelineView } from "@/lib/types";
import MoodForm from "./MoodForm";
import MoodTimeline from "./MoodTimeline";
import MoodCalendar from "./MoodCalendar";
import { cn } from "@/lib/utils";

export default function MoodTracker() {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [activeView, setActiveView] = useState<TimelineView>("day");
  const [showForm, setShowForm] = useState(false);
  // const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [activeTab, setActiveTab] = useState<"timeline" | "calendar">("timeline");

  // Load mood entries from localStorage
  const loadMoodEntries = () => {
    const entries = getMoods();
    setMoodEntries(entries);
  };

  useEffect(() => {
    loadMoodEntries();
    // Add an event listener to refresh the entries if they change in another tab/window
    window.addEventListener("storage", loadMoodEntries);
    return () => window.removeEventListener("storage", loadMoodEntries);
  }, []);

  const handleViewChange = (view: TimelineView) => {
    setActiveView(view);
  };

  const handleDateSelect = () => {
    // setSelectedDate(date);
    setShowForm(true);
  };

  return (
    <div className="container max-w-5xl mx-auto py-8 px-4 sm:px-6">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Get Moody</h1>
        <p className="text-muted-foreground">Track and visualize your daily emotions</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8">
        <div className="space-y-6">
          {/* View Tabs */}
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab("timeline")}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md",
                  activeTab === "timeline"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                )}
              >
                Timeline
              </button>
              <button
                onClick={() => setActiveTab("calendar")}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md",
                  activeTab === "calendar"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                )}
              >
                Calendar
              </button>
            </div>

            {activeTab === "timeline" && (
              <div className="flex space-x-2">
                <button
                  onClick={() => handleViewChange("day")}
                  className={cn(
                    "px-3 py-1 text-sm rounded-md",
                    activeView === "day"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-muted/80"
                  )}
                >
                  Day
                </button>
                <button
                  onClick={() => handleViewChange("week")}
                  className={cn(
                    "px-3 py-1 text-sm rounded-md",
                    activeView === "week"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-muted/80"
                  )}
                >
                  Week
                </button>
                <button
                  onClick={() => handleViewChange("month")}
                  className={cn(
                    "px-3 py-1 text-sm rounded-md",
                    activeView === "month"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-muted/80"
                  )}
                >
                  Month
                </button>
              </div>
            )}
          </div>

          {/* Timeline or Calendar View */}
          {activeTab === "timeline" ? (
            <MoodTimeline
              entries={moodEntries}
              activeView={activeView}
              className="min-h-[400px]"
            />
          ) : (
            <MoodCalendar
              entries={moodEntries}
              onSelectDate={handleDateSelect}
              className="min-h-[400px]"
            />
          )}
        </div>

        {/* Form Section */}
        <div className="bg-card p-4 rounded-lg border max-h-[80vh] overflow-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Log Your Mood</h2>
            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="text-sm text-primary underline"
              >
                Add Today&apos;s Mood
              </button>
            )}
          </div>

          {showForm ? (
            <MoodForm
              onSave={() => {
                loadMoodEntries();
                setShowForm(false);
              }}
            />
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <p className="text-muted-foreground mb-4">
                Keep track of your emotional well-being by logging your mood each day.
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="rounded-md bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2"
              >
                Log Today&apos;s Mood
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
