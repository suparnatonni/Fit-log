import Image from "next/image";
import Link from "next/link";
import {
  Clock3,
  Flame,
  Star,
  Dumbbell,
  BarChart3,
  Repeat,
  Bookmark,
  Plus,
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

    return Array.isArray(data) ? data : [];
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
    (item: IWorkout) => String(item.id) === String(id),
  );

  // Workout not found
  if (!workout) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-[#0b0d11] px-4 text-center">
        <h1 className="text-3xl font-extrabold text-white">
          Workout Not Found
        </h1>

        <p className="mt-2 text-sm text-gray-400">
          The workout you are looking for does not exist.
        </p>

        <Link
          href="/workouts"
          className="mt-6 rounded-lg bg-lime-400 px-6 py-3 text-sm font-bold text-black transition hover:bg-lime-300"
        >
          GO TO WORKOUTS
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b0d11] px-4 py-10 text-white md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">

        {/* Back Button */}
        <Link
          href="/workouts"
          className="mb-6 inline-block text-sm font-semibold text-gray-400 transition hover:text-lime-400"
        >
          ← Back to workouts
        </Link>

        {/* Main Details */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

          {/* LEFT - IMAGE */}
          <div className="relative h-[400px] overflow-hidden rounded-2xl border border-gray-800 bg-[#15171d] md:h-[500px]">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* RIGHT - DETAILS */}
          <div className="flex flex-col justify-center">

            {/* Tags */}
            <div className="mb-4 flex flex-wrap gap-2">
              {workout.muscleGroups.map((group) => (
                <span
                  key={group}
                  className="rounded-full bg-lime-400 px-3 py-1 text-xs font-bold uppercase text-black"
                >
                  {group}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl font-extrabold uppercase leading-tight md:text-5xl">
              {workout.name}
            </h1>

            {/* Description */}
            <p className="mt-4 max-w-2xl leading-7 text-gray-400">
              {workout.description}
            </p>

            {/* Workout Information */}
            <div className="mt-7 grid grid-cols-2 gap-3 rounded-2xl border border-gray-800 bg-[#15171d] p-5 sm:grid-cols-3">

              <Spec
                icon={<Dumbbell size={16} />}
                label="Equipment"
                value={workout.equipment}
              />

              <Spec
                icon={<BarChart3 size={16} />}
                label="Difficulty"
                value={workout.difficulty}
              />

              <Spec
                icon={<Repeat size={16} />}
                label="Sets"
                value={String(workout.sets)}
              />

              <Spec
                icon={<Repeat size={16} />}
                label="Reps"
                value={workout.reps}
              />

              <Spec
                icon={<Clock3 size={16} />}
                label="Duration"
                value={`${workout.duration} min`}
              />

              <Spec
                icon={<Flame size={16} />}
                label="Calories"
                value={`${workout.caloriesBurned} kcal`}
              />

              <Spec
                icon={<Star size={16} />}
                label="Rating"
                value={String(workout.rating)}
              />

            </div>

            {/* Instructions */}
            <div className="mt-7">
              <h2 className="mb-4 text-xl font-extrabold uppercase">
                Instructions
              </h2>

              <div className="space-y-3">
                {workout.instructions.map((instruction, index) => (
                  <div
                    key={index}
                    className="flex gap-3 text-sm leading-6 text-gray-400"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-lime-400 text-xs font-bold text-black">
                      {index + 1}
                    </span>

                    <p>{instruction}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-lime-400 px-5 py-3 text-sm font-bold text-black transition hover:bg-lime-300">
                <Plus size={18} />
                ADD TO TODAY'S PLAN
              </button>

              <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-700 bg-[#15171d] px-5 py-3 text-sm font-bold text-white transition hover:border-lime-400 hover:text-lime-400">
                <Bookmark size={18} />
                SAVE FOR LATER
              </button>

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
    <div>
      <div className="flex items-center gap-2 text-xs uppercase text-gray-500">
        {icon}
        <span>{label}</span>
      </div>

      <p className="mt-1 text-sm font-bold text-white">
        {value}
      </p>
    </div>
  );
};

export default WorkoutDetailsPage;