"use client";

import React, { useState, useMemo } from "react";
import { format, startOfDay, startOfWeek, startOfMonth, endOfDay, endOfWeek, endOfMonth, isWithinInterval, subDays } from "date-fns";
import { MoodEntry, TimelineView } from "@/lib/types";
import { getMoodEmoji, getMoodLabel } from "./MoodSelector";
import { cn } from "@/lib/utils";

interface MoodTimelineProps {
  entries: MoodEntry[];
  activeView: TimelineView;
  className?: string;
}

export default function MoodTimeline({ entries, activeView, className }: MoodTimelineProps) {
  const [baseDate, setBaseDate] = useState<Date>(new Date());

  const sortedEntries = useMemo(() => {
    return [...entries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [entries]);

  const filteredEntries = useMemo(() => {
    let start: Date;
    let end: Date;

    switch (activeView) {
      case 'day':
        start = startOfDay(baseDate);
        end = endOfDay(baseDate);
        break;
      case 'week':
        start = startOfWeek(baseDate, { weekStartsOn: 1 }); // Start on Monday
        end = endOfWeek(baseDate, { weekStartsOn: 1 });
        break;
      case 'month':
        start = startOfMonth(baseDate);
        end = endOfMonth(baseDate);
        break;
      default:
        start = startOfDay(subDays(baseDate, 30));
        end = endOfDay(baseDate);
    }

    return sortedEntries.filter(entry => {
      const entryDate = new Date(entry.date);
      return isWithinInterval(entryDate, { start, end });
    });
  }, [sortedEntries, activeView, baseDate]);

  const handlePrevious = () => {
    switch (activeView) {
      case 'day':
        setBaseDate(prevDate => new Date(prevDate.setDate(prevDate.getDate() - 1)));
        break;
      case 'week':
        setBaseDate(prevDate => new Date(prevDate.setDate(prevDate.getDate() - 7)));
        break;
      case 'month':
        setBaseDate(prevDate => new Date(prevDate.setMonth(prevDate.getMonth() - 1)));
        break;
    }
  };

  const handleNext = () => {
    const today = new Date();
    let newDate;
    
    switch (activeView) {
      case 'day':
        newDate = new Date(baseDate.setDate(baseDate.getDate() + 1));
        break;
      case 'week':
        newDate = new Date(baseDate.setDate(baseDate.getDate() + 7));
        break;
      case 'month':
        newDate = new Date(baseDate.setMonth(baseDate.getMonth() + 1));
        break;
      default:
        newDate = new Date(baseDate);
    }
    
    // Don't allow navigating into the future beyond today
    if (newDate <= today) {
      setBaseDate(newDate);
    }
  };

  const getPeriodLabel = () => {
    switch (activeView) {
      case 'day':
        return format(baseDate, 'MMMM d, yyyy');
      case 'week':
        const weekStart = startOfWeek(baseDate, { weekStartsOn: 1 });
        const weekEnd = endOfWeek(baseDate, { weekStartsOn: 1 });
        return `${format(weekStart, 'MMM d')} - ${format(weekEnd, 'MMM d, yyyy')}`;
      case 'month':
        return format(baseDate, 'MMMM yyyy');
      default:
        return '';
    }
  };

  if (filteredEntries.length === 0) {
    return (
      <div className={cn("flex flex-col space-y-4", className)}>
        <div className="flex items-center justify-between">
          <button 
            onClick={handlePrevious}
            className="rounded-md p-2 hover:bg-muted"
          >
            &#8592; Previous
          </button>
          <h3 className="text-lg font-medium">{getPeriodLabel()}</h3>
          <button 
            onClick={handleNext} 
            className="rounded-md p-2 hover:bg-muted"
            disabled={baseDate >= new Date()}
          >
            Next &#8594;
          </button>
        </div>
        <div className="flex flex-col items-center justify-center h-40 bg-muted/50 rounded-lg">
          <p className="text-muted-foreground">No mood entries for this period</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col space-y-4", className)}>
      <div className="flex items-center justify-between">
        <button 
          onClick={handlePrevious}
          className="rounded-md p-2 hover:bg-muted"
        >
          &#8592; Previous
        </button>
        <h3 className="text-lg font-medium">{getPeriodLabel()}</h3>
        <button 
          onClick={handleNext} 
          className="rounded-md p-2 hover:bg-muted"
          disabled={baseDate >= new Date()}
        >
          Next &#8594;
        </button>
      </div>
      <div className="space-y-3">
        {filteredEntries.map((entry) => (
          <div 
            key={entry.date} 
            className="bg-card p-4 rounded-lg shadow-sm border"
          >
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm text-muted-foreground">
                {format(new Date(entry.date), 'EEEE, MMMM d, yyyy')}
              </div>
              <div className="text-2xl">{getMoodEmoji(entry.mood)}</div>
            </div>
            <div className="font-medium">{getMoodLabel(entry.mood)}</div>
            {entry.note && (
              <p className="mt-2 text-sm text-muted-foreground">{entry.note}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
