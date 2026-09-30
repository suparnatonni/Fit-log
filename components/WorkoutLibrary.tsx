"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiChevronDown, FiClock, FiStar,} from "react-icons/fi";

import { FaFire } from "react-icons/fa";

type Workout = {
  id: string | number;
  name: string;
  image: string;

  category?: string[];
  tags?: string[];

  equipment?: string;

  duration?: number;
  calories?: number;
  caloriesBurned?: number;

  rating?: number;
};

const API_URL =
  "https://api.api-store.workers.dev/api/fitlog";

type SortOption =
  | "duration"
  | "calories"
  | "rating";

const WorkoutLibrary = () => {
  const [workouts, setWorkouts] =
    useState<Workout[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [sortBy, setSortBy] =
    useState<SortOption>("duration");

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await fetch(API_URL);

        if (!response.ok) {
          throw new Error(
            "Failed to fetch workouts"
          );
        }

        const data =
          await response.json();

        const workoutData =
          Array.isArray(data)
            ? data
            : data?.data;

        if (!Array.isArray(workoutData)) {
          throw new Error(
            "Invalid workout data"
          );
        }

        setWorkouts(workoutData);
      } catch (error) {
        console.error(error);
        setError(
          "Failed to load workouts."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  const sortedWorkouts =
    [...workouts].sort((a, b) => {
      if (sortBy === "duration") {
        return (
          (a.duration ?? 0) -
          (b.duration ?? 0)
        );
      }

      if (sortBy === "calories") {
        return (
          (a.calories ??
            a.caloriesBurned ??
            0) -
          (b.calories ??
            b.caloriesBurned ??
            0)
        );
      }

      return (
        (b.rating ?? 0) -
        (a.rating ?? 0)
      );
    });


  if (loading) {
    return (
      <section
        id="library"
        className="px-4 py-12"
      >
        <div className="mx-auto max-w-7xl">

          <h2 className="text-3xl font-extrabold text-white">
            THE LIBRARY
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            Twelve lifts covering every major muscle group.
          </p>

          <div className="flex min-h-60 items-center justify-center">
            <span className="loading loading-spinner loading-lg text-lime-400" />
          </div>

        </div>
      </section>
    );
  }

 
  if (error) {
    return (
      <section
        id="library"
        className="px-4 py-12"
      >
        <div className="mx-auto max-w-7xl">

          <p className="text-center text-red-400">
            {error}
          </p>

        </div>
      </section>
    );
  }

  return (
    <section
      id="library"
      className="px-4 py-10 md:py-14"
    >
      <div className="mx-auto max-w-7xl">

     
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              THE LIBRARY
            </h2>

            <p className="mt-1 text-xs text-gray-400">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

         
          <div className="flex items-center gap-2">

            <span className="text-xs font-semibold text-gray-500">
              Sort By
            </span>

            <div className="relative w-44">

              <select
                value={sortBy}
                onChange={(event) =>
                  setSortBy(
                    event.target
                      .value as SortOption
                  )
                }
                className="w-full appearance-none rounded-lg border border-gray-700 bg-[#15171d] px-4 py-2.5 pr-10 text-xs font-semibold text-white outline-none transition focus:border-lime-400"
              >
                <option value="duration">
                  Duration
                </option>

                <option value="calories">
                  Calories
                </option>

                <option value="rating">
                  Rating
                </option>
              </select>

              <FiChevronDown
                size={15}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-lime-400"
              />

            </div>
          </div>

        </div>

       
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">

          {sortedWorkouts.map((workout) => {

            const categories =
              workout.category ??
              workout.tags ??
              [];

            const calories =
              workout.calories ??
              workout.caloriesBurned ??
              0;

            return (
              <Link
                key={workout.id}
                href={`/workouts/${workout.id}`}
                className="group overflow-hidden rounded-xl border border-gray-800 bg-[#15171d] transition hover:-translate-y-1 hover:border-lime-400/50"
              >

                
                <div className="relative h-40 w-full overflow-hidden">
                  <Image
                    src={workout.image}
                    alt={workout.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-300 group-hover:scale-105"
                  />

                </div>

               
                <div className="p-3">
                  <div className="mb-2 flex flex-wrap gap-1">

                    {categories
                      .slice(0, 3)
                      .map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-lime-400 px-2 py-0.5 text-[8px] font-bold uppercase text-black"
                        >
                          {tag}
                        </span>
                      ))}

                  </div>

                  <h3 className="text-sm font-extrabold uppercase text-white">
                    {workout.name}
                  </h3>

                  <p className="mt-1 text-[10px] text-gray-500">
                    {workout.equipment ||
                      "Bodyweight"}
                  </p>

                  <div className="my-3 border-t border-gray-800" />

                  <div className="flex items-center gap-3 text-[9px] text-gray-400">

                    <span className="flex items-center gap-1">
                      <FiClock
                        className="text-lime-400"
                        size={11}
                      />
                      {workout.duration ?? 0} min
                    </span>

                    <span className="flex items-center gap-1">
                      <FaFire
                        className="text-lime-400"
                        size={10}
                      />
                      {calories} kcal
                    </span>

                    <span className="flex items-center gap-1">
                      <FiStar
                        className="text-lime-400"
                        size={11}
                      />
                      {workout.rating ?? 0}
                    </span>

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