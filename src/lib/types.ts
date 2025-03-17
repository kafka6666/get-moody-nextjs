export type MoodType = 'happy' | 'sad' | 'neutral' | 'excited' | 'angry' | 'tired' | 'anxious';

export interface MoodEntry {
  date: string; // ISO string
  mood: MoodType;
  note?: string;
}

export interface MoodState {
  entries: MoodEntry[];
}

export type TimelineView = 'day' | 'week' | 'month';
