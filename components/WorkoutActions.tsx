"use client";

import { usePlan } from "@/components/context/PlanContext";
import { toast } from "react-toastify";
import { FaPlus, FaBookmark } from "react-icons/fa";

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

const WorkoutActions = ({
  workout,
}: {
  workout: Workout;
}) => {
  const { addToPlan, saveForLater } = usePlan();

  const handleAddToPlan = () => {
    addToPlan(workout);

    toast.success("Added to today's plan");
  };

  const handleSaveForLater = () => {
    saveForLater(workout);

    toast.success("Saved for later");
  };

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={handleAddToPlan}
        className="flex items-center gap-2 rounded-lg bg-lime-400 px-5 py-3 text-sm font-bold text-black transition hover:bg-lime-300"
      >
        <FaPlus size={12} />
        Add to today's plan
      </button>

      <button
        onClick={handleSaveForLater}
        className="flex items-center gap-2 rounded-lg border border-gray-700 px-5 py-3 text-sm text-white transition hover:bg-gray-800"
      >
        <FaBookmark size={12} />
        Save for later
      </button>
    </div>
  );
};

export default WorkoutActions;