import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import WorkoutActions from "@/components/WorkoutActions";

import {
  Clock3,
  Flame,
  Star,
  Dumbbell,
  BarChart3,
  Repeat,
} from "lucide-react";

interface IWorkout {
  id: string | number;
  name: string;
  image: string;

  muscleGroups?: string[];

  category?: string[];
  tags?: string[];

  equipment?: string;
  difficulty?: string;

  duration?: number;
  calories?: number;
  caloriesBurned?: number;

  sets?: number;
  reps?: string;

  rating?: number;

  description?: string;
  instructions?: string[];
}

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const API_URL = "https://api.api-store.workers.dev/api/fitlog";

async function getWorkout(
  id: string
): Promise<IWorkout | null> {
  try {
    const response = await fetch(
      `${API_URL}/${id}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    const workout = data?.data ?? data;

    return workout ?? null;
  } catch (error) {
    console.error(
      "Failed to fetch workout:",
      error
    );

    return null;
  }
}

export default async function WorkoutDetailsPage({
  params,
}: Props) {
  const { id } = await params;

  const workout = await getWorkout(id);

  if (!workout) {
    notFound();
  }

  const calories =
    workout.calories ??
    workout.caloriesBurned ??
    0;

  const tags =
    workout.muscleGroups ??
    workout.category ??
    workout.tags ??
    [];

  return (
    <main className="min-h-screen bg-[#0b0d11] px-4 py-10 text-white md:px-8 lg:px-12">

      <div className="mx-auto max-w-7xl">

        
        <Link
          href="/"
          className="mb-6 inline-block text-sm font-semibold text-gray-400 transition hover:text-lime-400"
        >
          ← Back to workouts
        </Link>

        
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

          
          <div className="relative h-[400px] overflow-hidden rounded-2xl border border-gray-800 bg-[#15171d] md:h-[550px]">

            <Image
              src={workout.image}
              alt={workout.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />

          </div>

          
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-extrabold uppercase leading-tight md:text-5xl">
              {workout.name}
            </h1>
            <p className="mt-4 max-w-2xl leading-7 text-gray-400">
              {workout.description ||
                "A focused workout designed to help you train with intent and build consistent strength."}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map((group) => (
                <span
                  key={group}
                  className="rounded-full bg-lime-400 px-3 py-1 text-xs font-bold uppercase text-black"
                >
                  {group}
                </span>
              ))}
            </div>
            <div className="mt-7 overflow-hidden rounded-2xl border border-gray-800 bg-[#15171d]">

              <Spec
                icon={<Dumbbell size={15} />}
                label="Equipment"
                value={
                  workout.equipment ||
                  "Bodyweight"
                }
              />

              <Spec
                icon={<BarChart3 size={15} />}
                label="Difficulty"
                value={
                  workout.difficulty ||
                  "Not specified"
                }
              />

              <Spec
                icon={<Repeat size={15} />}
                label="Sets"
                value={String(
                  workout.sets ?? 0
                )}
              />

              <Spec
                icon={<Repeat size={15} />}
                label="Reps"
                value={
                  workout.reps || "Not specified"
                }
              />

              <Spec
                icon={<Clock3 size={15} />}
                label="Duration"
                value={`${workout.duration ?? 0} min`}
              />

              <Spec
                icon={<Flame size={15} />}
                label="Calories"
                value={`${calories} kcal`}
              />

              <Spec
                icon={<Star size={15} />}
                label="Rating"
                value={String(
                  workout.rating ?? 0
                )}
              />

            </div>

           
            <div className="mt-7">
              <h2 className="mb-4 text-xl font-extrabold uppercase">
                Instructions
              </h2>

              {workout.instructions &&
              workout.instructions.length > 0 ? (
                <ol className="space-y-3">

                  {workout.instructions.map(
                    (instruction, index) => (
                      <li
                        key={index}
                        className="flex gap-3 text-sm leading-6 text-gray-400"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-lime-400 text-xs font-bold text-black">
                          {index + 1}
                        </span>

                        <span>
                          {instruction}
                        </span>
                      </li>
                    )
                  )}

                </ol>
              ) : (
                <p className="text-sm text-gray-500">
                  No instructions available.
                </p>
              )}

            </div>

          
            <div className="mt-8">
              <WorkoutActions
                workout={workout}
              />
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}

function Spec({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-gray-800 px-4 py-3 last:border-b-0">

      <div className="flex items-center gap-2 text-xs uppercase text-gray-500">
        {icon}
        <span>{label}</span>
      </div>

      <p className="text-right text-sm font-semibold text-white">
        {value}
      </p>

    </div>
  );
}