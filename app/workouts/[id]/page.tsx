import Image from "next/image";
import Link from "next/link";
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
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
}

interface IWorkoutDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const API_URL = "https://api.api-store.workers.dev/api/fitlog";

const getWorkouts = async (): Promise<IWorkout[]> => {
  try {
    const response = await fetch(API_URL, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch workouts");
    }

    const data = await response.json();

    // API response array অথবা { data: [] } হলে দুটোই handle করবে
    const workoutData = Array.isArray(data) ? data : data.data;

    return Array.isArray(workoutData) ? workoutData : [];
  } catch (error) {
    console.error("Error fetching workout data:", error);
    return [];
  }
};

const WorkoutDetailsPage = async ({
  params,
}: IWorkoutDetailsPageProps) => {
  const { id } = await params;

  const workoutsData = await getWorkouts();

  const workout = workoutsData.find(
    (item) => String(item.id) === String(id)
  );

  if (!workout) {
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center bg-[#0b0d11] px-4 text-center">
        <h1 className="text-3xl font-extrabold text-white">
          Workout not found
        </h1>

        <p className="mt-2 text-sm text-gray-400">
          The workout you are looking for does not exist.
        </p>

        <Link
          href="/"
          className="mt-6 rounded-lg bg-lime-400 px-6 py-3 text-sm font-bold text-black hover:bg-lime-300"
        >
          Go to workouts
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b0d11] px-4 py-10 text-white md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">

        {/* Back */}
        <Link
          href="/"
          className="mb-6 inline-block text-sm font-semibold text-gray-400 hover:text-lime-400"
        >
          ← Back to workouts
        </Link>

        {/* Main */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

          {/* LEFT IMAGE */}
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

          {/* RIGHT DETAILS */}
          <div className="flex flex-col justify-center">

            {/* Title */}
            <h1 className="text-3xl font-extrabold uppercase leading-tight md:text-5xl">
              {workout.name}
            </h1>

            {/* Description */}
            <p className="mt-4 max-w-2xl leading-7 text-gray-400">
              {workout.description}
            </p>

            {/* Tags */}
            <div className="mt-4 flex flex-wrap gap-2">
              {workout.muscleGroups?.map((group) => (
                <span
                  key={group}
                  className="rounded-full bg-lime-400 px-3 py-1 text-xs font-bold uppercase text-black"
                >
                  {group}
                </span>
              ))}
            </div>

            {/* Specs */}
            <div className="mt-7 overflow-hidden rounded-2xl border border-gray-800 bg-[#15171d]">

              <Spec
                icon={<Dumbbell size={15} />}
                label="Equipment"
                value={workout.equipment}
              />

              <Spec
                icon={<BarChart3 size={15} />}
                label="Difficulty"
                value={workout.difficulty}
              />

              <Spec
                icon={<Repeat size={15} />}
                label="Sets"
                value={String(workout.sets)}
              />

              <Spec
                icon={<Repeat size={15} />}
                label="Reps"
                value={workout.reps}
              />

              <Spec
                icon={<Clock3 size={15} />}
                label="Duration"
                value={`${workout.duration} min`}
              />

              <Spec
                icon={<Flame size={15} />}
                label="Calories"
                value={`${workout.caloriesBurned} kcal`}
              />

              <Spec
                icon={<Star size={15} />}
                label="Rating"
                value={String(workout.rating)}
              />

            </div>

            {/* Instructions */}
            <div className="mt-7">
              <h2 className="mb-4 text-xl font-extrabold uppercase">
                Instructions
              </h2>

              <ol className="space-y-3">
                {workout.instructions?.map((instruction, index) => (
                  <li
                    key={index}
                    className="flex gap-3 text-sm leading-6 text-gray-400"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-lime-400 text-xs font-bold text-black">
                      {index + 1}
                    </span>

                    <span>{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* BUTTONS */}
            <div className="mt-8">
              <WorkoutActions workout={workout} />
            </div>

          </div>
        </div>
      </div>
    </main>
  );
};

const Spec = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => {
  return (
    <div className="flex items-center justify-between border-b border-gray-800 px-4 py-3 last:border-b-0">
      <div className="flex items-center gap-2 text-xs uppercase text-gray-500">
        {icon}
        <span>{label}</span>
      </div>

      <p className="text-sm font-semibold text-white">
        {value}
      </p>
    </div>
  );
};

export default WorkoutDetailsPage;