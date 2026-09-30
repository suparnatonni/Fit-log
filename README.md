# FitLog

FitLog is a responsive workout library web application built with Next.js.
Users can explore workouts, view workout details, add exercises to today's
plan, and save workouts for later.

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- DaisyUI
- React Icons
- React Toastify
- REST API
- LocalStorage

## Key Features

1. Responsive workout library with workout cards.
2. Workout details page with equipment, difficulty, sets, reps and instructions.
3. Add workouts to Today's Plan with a maximum of five workouts.
4. Save workouts for later and manage saved workouts.
5. Sort workouts by Duration, Calories and Rating.
6. Toast notifications for workout actions.
7. My Plan page with exercise, minutes and calories summary.
8. LocalStorage support to keep plan and saved workouts after reload.

## API

FitLog uses the following REST API:

https://api.api-store.workers.dev/api/fitlog

## Project Structure

The project uses the Next.js App Router.

- `app/` — Application pages and routes
- `components/` — Reusable UI components
- `components/context/` — Plan and saved workout state management
- `public/` — Public assets

## Main Pages

- `/` — Workout Library
- `/workouts/[id]` — Workout Details
- `/my-plan` — Today's Plan and Saved Workouts

## Project Highlights

FitLog helps users browse workouts, check workout details, organize
their daily workout plan, save exercises for later, and manage their
workout progress in a simple interface.

## Development

This project was built as a Next.js App Router project using TypeScript,
Tailwind CSS and DaisyUI.