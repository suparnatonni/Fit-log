"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {Clock3,Flame,Star,Check,X,} from "lucide-react";
import { usePlan } from "@/components/context/PlanContext";

export default function MyPlanPage() {
  const { plan, saved, loaded, removeFromPlan, removeFromSaved, markAsDone, doneIds, } = usePlan();

  const [activeTab, setActiveTab] = useState<
    "plan" | "saved"
  >("plan");

  if (!loaded) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#0f1014] px-4 text-white">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-lime-400" />

          <p className="mt-3 text-sm text-gray-400">
            Loading workouts…
          </p>
        </div>
      </main>
    );
  }

  const todayPlan = Array.isArray(plan)
    ? plan
    : [];

  const savedWorkouts = Array.isArray(saved)
    ? saved
    : [];

  const currentWorkouts =
    activeTab === "plan"
      ? todayPlan
      : savedWorkouts;

  const minutes = todayPlan.reduce(
    (total, workout) =>
      total + (workout.duration ?? 0),
    0
  );

  const calories = todayPlan.reduce(
    (total, workout) =>
      total +
      (workout.calories ??
        workout.caloriesBurned ??
        0),
    0
  );

  return (
    <main className="min-h-screen bg-[#0f1014] px-4 py-10 text-white">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold md:text-4xl"> MY PLAN
          </h1>

          <p className="mt-1 text-sm text-gray-400"> Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

       
        <div className="mb-7 grid grid-cols-1 gap-3 rounded-xl border border-gray-800 bg-[#15171d] p-5 sm:grid-cols-3">
          <div>
            <p className="text-xs text-gray-500">Exercises
            </p>

            <p className="mt-1 text-3xl font-extrabold text-[#ccff00]"> {todayPlan.length}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500"> Minutes
            </p>

            <p className="mt-1 text-3xl font-extrabold">
              {minutes}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500">Calories
            </p>

            <p className="mt-1 text-3xl font-extrabold">
              {calories}
            </p>
          </div>

        </div>

        {/* Tabs */}
        <div className="mb-5 flex w-fit rounded-lg border border-gray-800 bg-[#15171d] p-1">

          <button
            onClick={() =>
              setActiveTab("plan")
            }
            className={`rounded-md px-5 py-2 text-sm transition ${
              activeTab === "plan"
                ? "bg-[#242831] text-white"
                : "text-gray-500 hover:text-white"
            }`}
          >
            Today's Plan
          </button>

          <button
            onClick={() =>
              setActiveTab("saved")
            }
            className={`rounded-md px-5 py-2 text-sm transition ${
              activeTab === "saved"
                ? "bg-[#242831] text-white"
                : "text-gray-500 hover:text-white"
            }`}
          >
            Saved
          </button>

        </div>

    
        {currentWorkouts.length === 0 ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-dashed border-gray-800 px-4 text-center">

            <h2 className="text-xl font-extrabold">
              NOTHING HERE YET
            </h2>

            <p className="mt-2 max-w-md text-sm text-gray-500">
              Browse the library and add a lift
              to get today moving.
            </p>

            <Link
              href="/"
              className="mt-5 rounded-lg bg-[#ccff00] px-5 py-3 text-sm font-bold text-black transition hover:bg-lime-300"
            >
              Go to workouts
            </Link>

          </div>
        ) : (

          <div className="space-y-3">

            {currentWorkouts.map((workout) => {
              const workoutCalories =
                workout.calories ??
                workout.caloriesBurned ??
                0;

              const isDone = doneIds.some(
                (id) =>
                  String(id) ===
                  String(workout.id)
              );

              return (
                <div
                  key={workout.id}
                  className={`flex flex-col gap-4 rounded-xl border bg-[#15171d] p-3 transition md:flex-row md:items-center ${
                    isDone
                      ? "border-lime-400/40 opacity-70"
                      : "border-gray-800"
                  }`}
                >

                 
                  <Image
                    src={workout.image}
                    alt={workout.name}
                    width={130}
                    height={80}
                    className="h-20 w-full rounded-lg object-cover md:w-32"
                  />

                  
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-extrabold uppercase">
                        {workout.name}
                      </h3>

                      {isDone && (
                        <span className="rounded-full bg-lime-400 px-2 py-0.5 text-[9px] font-bold uppercase text-black">
                          Done
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-gray-500">
                      {workout.equipment ||
                        "Bodyweight"}
                    </p>

                    <div className="mt-2 flex flex-wrap gap-4 text-xs text-gray-400">

                      <span className="flex items-center gap-1">
                        <Clock3 size={13} />
                        {workout.duration ?? 0} min
                      </span>

                      <span className="flex items-center gap-1">
                        <Flame size={13} />
                        {workoutCalories} kcal
                      </span>

                      <span className="flex items-center gap-1">
                        <Star size={13} />
                        {workout.rating ?? 0}
                      </span>

                    </div>

                  </div>

                
                  <div className="flex flex-wrap gap-2">

                    <Link
                      href={`/workouts/${workout.id}`}
                      className="rounded-lg border border-gray-700 px-4 py-2 text-xs transition hover:border-gray-500"
                    >
                      View Details
                    </Link>

                    {activeTab === "plan" ? (
                      <>
                        <button
                          onClick={() =>
                            markAsDone(
                              workout.id
                            )
                          }
                          disabled={isDone}
                          className={`rounded-lg px-4 py-2 text-xs font-bold transition ${
                            isDone
                              ? "cursor-not-allowed bg-gray-700 text-gray-400"
                              : "bg-[#ccff00] text-black hover:bg-lime-300"
                          }`}
                        >
                          <Check
                            size={13}
                            className="mr-1 inline"
                          />

                          {isDone
                            ? "Done"
                            : "Mark as Done"}
                        </button>

                        <button
                          onClick={() =>
                            removeFromPlan(
                              workout.id
                            )
                          }
                          aria-label="Remove workout"
                          className="rounded-lg px-3 py-2 text-gray-400 transition hover:bg-red-500/10 hover:text-red-400"
                        >
                          <X size={17} />
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() =>
                          removeFromSaved(
                            workout.id
                          )
                        }
                        aria-label="Remove saved workout"
                        className="rounded-lg px-3 py-2 text-gray-400 transition hover:bg-red-500/10 hover:text-red-400"
                      >
                        <X size={17} />
                      </button>
                    )}

                  </div>

                </div>
              );
            })}

          </div>
        )}

      </div>
    </main>
  );
}