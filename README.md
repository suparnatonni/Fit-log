# FitLog

FitLog is a responsive workout library web application built with Next.js.

Users can explore workouts, view detailed workout information, add exercises
to today's plan, save workouts for later, and track completed workouts.

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- DaisyUI
- React Icons
- Lucide React
- React Toastify
- REST API
- LocalStorage

## Key Features

1. Responsive workout library for mobile, tablet, and desktop.
2. Workout details page with equipment, difficulty, sets, reps, duration,
   calories, rating, and instructions.
3. Add workouts to Today's Plan with a maximum limit of five workouts.
4. Save workouts for later and manage saved workouts.
5. Sort workouts by Duration, Calories, and Rating.
6. Mark planned workouts as Done.
7. Remove workouts from Today's Plan or Saved list.
8. Toast notifications for workout actions.
9. Live Exercises, Minutes, and Calories metrics.
10. LocalStorage persistence after page reload.

## API

### All Workouts

https://api.api-store.workers.dev/api/fitlog

### Single Workout

https://api.api-store.workers.dev/api/fitlog/:id

## Main Pages

- `/` — Workout Library
- `/workouts/[id]` — Workout Details
- `/my-plan` — Today's Plan and Saved Workouts

## Project Structure

```text
app/
├── page.tsx
├── layout.tsx
├── not-found.tsx
├── my-plan/
│   └── page.tsx
└── workouts/
    └── [id]/
        └── page.tsx

components/
├── context/
│   └── PlanContext.tsx
├── layout/
│   ├── Navbar.tsx
│   └── Footer.tsx
├── Banner.tsx
├── WorkoutLibrary.tsx
└── WorkoutActions.tsx