"use client";

import dynamic from "next/dynamic";

// Use dynamic import with no SSR for client components
const MoodTracker = dynamic(() => import("./MoodTracker"), {
  ssr: false,
});

export default function ClientWrapper() {
  return <MoodTracker />;
}
