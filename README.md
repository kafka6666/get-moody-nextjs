# Get Moody - Daily Mood Tracker

A Next.js application to track and visualize your daily moods. Fully responsive and designed to work seamlessly on both mobile and desktop devices.

## Features

- **Daily Mood Logging**: Log your mood each day with emoji selections and optional notes.
- **Multiple View Options**: View your mood history in daily, weekly, or monthly timeline.
- **Calendar View**: Visualize your moods on a calendar for a bird's-eye view of your emotional trends.
- **Responsive Design**: Fully mobile responsive with a user interface that adapts perfectly to smartphones, tablets, and desktop devices.
- **LocalStorage Integration**: Your mood data is stored locally in your browser.

## Screenshots

### Main Dashboard
![Get Moody Dashboard](./public/Get%20Moody%20-%20Daily%20Mood%20Tracker%20-%20%5Blocalhost%5D_%20000.png)

### Mood Entry Form
![Mood Entry Form](./public/Get%20Moody%20-%20Daily%20Mood%20Tracker%20-%20%5Blocalhost%5D_%20001.png)

### Calendar View
![Calendar View](./public/Get%20Moody%20-%20Daily%20Mood%20Tracker%20-%20%5Blocalhost%5D_%20002.png)

## Tech Stack

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **TailwindCSS** for styling
- **shadcn/ui** components
- **date-fns** for date manipulation
- **LocalStorage** for client-side data persistence

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

The app can be deployed to Vercel or any other hosting platform that supports Next.js applications.

[https://get-moody-nextjs.vercel.app/](https://get-moody-nextjs.vercel.app/)

## How to Use

1. Click on "Log Today's Mood" to open the mood logging form
2. Select a date (defaults to today)
3. Choose a mood emoji that represents how you're feeling
4. Add optional notes about your day
5. Click "Save Mood" to record your entry
6. Toggle between Timeline and Calendar views to see your mood history
7. In Timeline view, switch between Day, Week, and Month views
8. In Calendar view, click on any date to log or update your mood for that day