"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { MoodEntry } from "@/lib/types";
import { getMoodEmoji } from "./MoodSelector";
import { cn } from "@/lib/utils";

interface MoodCalendarProps {
  entries: MoodEntry[];
  onSelectDate: (date: Date) => void;
  className?: string;
}

interface DayProps {
  date: Date;
  displayMonth: Date;
  selected?: boolean;
}

export default function MoodCalendar({
  entries,
  onSelectDate,
  className,
}: MoodCalendarProps) {
  const [month, setMonth] = useState<Date>(new Date());

  // Create a map of dates to mood entries for quick lookup
  const moodMap = new Map(
    entries.map((entry) => [
      new Date(entry.date).toISOString().split("T")[0],
      entry,
    ])
  );

  return (
    <div className={cn("", className)}>
      <Calendar
        mode="single"
        month={month}
        onMonthChange={setMonth}
        onDayClick={onSelectDate}
        className="border rounded-md"
        components={{
          Day: ({ date, selected, ...props }: DayProps) => {
            const dateStr = date.toISOString().split("T")[0];
            const moodEntry = moodMap.get(dateStr);
            
            return (
              <div
                onClick={() => onSelectDate(date)}
                className={cn(
                  "w-full h-full flex items-center justify-center relative cursor-pointer",
                  selected && "bg-primary text-primary-foreground rounded-md"
                )}
                {...props}
              >
                <div
                  className={cn(
                    "flex flex-col items-center justify-center",
                    moodEntry && !selected && "bg-accent/70 rounded-md",
                    moodEntry && selected && "bg-primary rounded-md"
                  )}
                >
                  <div className="flex flex-col items-center py-1 px-2">
                    {moodEntry && (
                      <span className="absolute top-0 text-xs">
                        {getMoodEmoji(moodEntry.mood)}
                      </span>
                    )}
                    <span className={cn("mt-2 text-xs", selected && "text-primary-foreground")}>
                      {format(date, "d")}
                    </span>
                  </div>
                </div>
              </div>
            );
          },
        }}
      />
    </div>
  );
}
