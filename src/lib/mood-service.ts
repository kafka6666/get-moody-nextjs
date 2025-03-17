"use client";

import { MoodEntry, MoodType } from "./types";

const STORAGE_KEY = 'get-moody-data';

export const saveMood = (date: Date, mood: MoodType, note?: string): void => {
  const entry: MoodEntry = {
    date: date.toISOString(),
    mood,
    note
  };
  
  const existingData = getMoods();
  
  // Check if an entry for this date already exists
  const dateStr = date.toISOString().split('T')[0]; // Get just the date part
  const existingIndex = existingData.findIndex(item => 
    item.date.split('T')[0] === dateStr
  );
  
  if (existingIndex >= 0) {
    // Update existing entry
    existingData[existingIndex] = entry;
  } else {
    // Add new entry
    existingData.push(entry);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existingData));
};

export const getMoods = (): MoodEntry[] => {
  if (typeof window === 'undefined') return [];
  
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  
  try {
    return JSON.parse(data) as MoodEntry[];
  } catch (e) {
    console.error('Error parsing mood data', e);
    return [];
  }
};

export const getMoodForDate = (date: Date): MoodEntry | undefined => {
  const moods = getMoods();
  const dateStr = date.toISOString().split('T')[0];
  
  return moods.find(entry => entry.date.split('T')[0] === dateStr);
};

export const deleteMood = (date: Date): void => {
  const moods = getMoods();
  const dateStr = date.toISOString().split('T')[0];
  const filteredMoods = moods.filter(entry => entry.date.split('T')[0] !== dateStr);
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredMoods));
};
