"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Workout = {
  id: string | number;
  name: string;
  image: string;
  category?: string[];
  tags?: string[];
  equipment?: string;
  duration?: number;
  calories?: number;
  rating?: number;
};

const API_URL = "https://api.api-store.workers.dev/api/fitlog";

const WorkoutLibrary = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        setLoading(true);

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch workouts");
        }

        const data = await response.json();

        // API may return data directly or inside a data property
        const workoutData = Array.isArray(data) ? data : data.data;

        setWorkouts(workoutData || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load workouts.");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) {
    return (
      <section id="library" className="px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6">
            <h2 className="text-3xl font-extrabold text-white">
              THE LIBRARY
            </h2>

            <p className="text-sm text-gray-400">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          <div className="flex min-h-60 items-center justify-center">
            <span className="loading loading-spinner loading-lg text-lime-400"></span>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="library" className="px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-center text-red-400">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="library" className="px-4 py-10 md:py-14">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-5">
          <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            THE LIBRARY
          </h2>

          <p className="mt-1 text-xs text-gray-400">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {/* Workout Grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {workouts.map((workout) => {
            const categories =
              workout.category || workout.tags || [];

            return (
              <Link
                key={workout.id}
                href={`/workouts/${workout.id}`}
                className="group overflow-hidden rounded-xl border border-gray-800 bg-[#15171d] transition hover:-translate-y-1 hover:border-lime-400/50"
              >
                {/* Image */}
                <div className="relative h-40 w-full overflow-hidden">
                  <Image
                    src={workout.image}
                    alt={workout.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="p-3">
                  {/* Category Tags */}
                  <div className="mb-2 flex flex-wrap gap-1">
                    {categories.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-lime-400 px-2 py-0.5 text-[8px] font-bold uppercase text-black"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Workout Name */}
                  <h3 className="text-sm font-extrabold uppercase text-white">
                    {workout.name}
                  </h3>

                  {/* Equipment */}
                  <p className="mt-1 text-[10px] text-gray-500">
                    {workout.equipment || "Bodyweight"}
                  </p>

                  {/* Divider */}
                  <div className="my-3 border-t border-gray-800" />

                  {/* Stats */}
                  <div className="flex items-center gap-3 text-[9px] text-gray-400">
                    <span>◷ {workout.duration ?? 0} min</span>

                    <span>🔥 {workout.calories ?? 0} kcal</span>

                    <span>☆ {workout.rating ?? 0}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WorkoutLibrary;