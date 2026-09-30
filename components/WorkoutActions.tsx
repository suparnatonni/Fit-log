"use client";
import {FaPlus,FaBookmark,} from "react-icons/fa";
import { usePlan, Workout,} from "@/components/context/PlanContext";

const WorkoutActions = ({
  workout,
}: {
  workout: Workout;
}) => {
  const {
    addToPlan,
    addToSaved,
  } = usePlan();

  return (
    <div className="flex flex-wrap gap-3">

      <button
        onClick={() => addToPlan(workout)}
        className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-lime-400 px-5 py-3 text-sm font-bold text-black transition hover:bg-lime-300 sm:flex-none"
      >
        <FaPlus size={12} />
        Add to today's plan
      </button>

      <button
        onClick={() => addToSaved(workout)}
        className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-700 px-5 py-3 text-sm text-white transition hover:border-gray-500 hover:bg-gray-800 sm:flex-none"
      >
        <FaBookmark size={12} />
        Save for later
      </button>

    </div>
  );
};

export default WorkoutActions;