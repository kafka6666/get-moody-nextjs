"use client";

import React from "react";
import { MoodType } from "@/lib/types";
import { cn } from "@/lib/utils";

const moodOptions: { type: MoodType; emoji: string; label: string }[] = [
  { type: "happy", emoji: "😊", label: "Happy" },
  { type: "sad", emoji: "😢", label: "Sad" },
  { type: "neutral", emoji: "😐", label: "Neutral" },
  { type: "excited", emoji: "🤩", label: "Excited" },
  { type: "angry", emoji: "😡", label: "Angry" },
  { type: "tired", emoji: "😴", label: "Tired" },
  { type: "anxious", emoji: "😰", label: "Anxious" },
];

export const getMoodEmoji = (mood: MoodType): string => {
  return moodOptions.find(option => option.type === mood)?.emoji || "❓";
};

export const getMoodLabel = (mood: MoodType): string => {
  return moodOptions.find(option => option.type === mood)?.label || "Unknown";
};

interface MoodSelectorProps {
  selectedMood?: MoodType;
  onSelect: (mood: MoodType) => void;
  className?: string;
}

export default function MoodSelector({
  selectedMood,
  onSelect,
  className,
}: MoodSelectorProps) {
  return (
    <div className={cn("flex flex-wrap gap-3 justify-center", className)}>
      {moodOptions.map((option) => (
        <button
          key={option.type}
          onClick={() => onSelect(option.type)}
          className={cn(
            "flex flex-col items-center p-3 rounded-lg transition-all transform hover:scale-110",
            selectedMood === option.type
              ? "bg-primary text-primary-foreground ring-2 ring-primary"
              : "bg-muted hover:bg-muted/80"
          )}
          aria-label={`Select mood: ${option.label}`}
        >
          <span className="text-2xl mb-1">{option.emoji}</span>
          <span className="text-xs font-medium">{option.label}</span>
        </button>
      ))}
    </div>
  );
}
