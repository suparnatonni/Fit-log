"use client";

import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export type Workout = {
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
};

type PlanContextType = {
  plan: Workout[];
  saved: Workout[];
  addToPlan: (workout: Workout) => void;
  addToSaved: (workout: Workout) => void;
  removeFromPlan: (id: string | number) => void;
  removeFromSaved: (id: string | number) => void;
};

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const savedPlan = localStorage.getItem("fitlog-plan");
    const savedWorkouts = localStorage.getItem("fitlog-saved");

    if (savedPlan) {
      setPlan(JSON.parse(savedPlan));
    }

    if (savedWorkouts) {
      setSaved(JSON.parse(savedWorkouts));
    }

    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    localStorage.setItem("fitlog-plan", JSON.stringify(plan));
    localStorage.setItem("fitlog-saved", JSON.stringify(saved));
  }, [plan, saved, hydrated]);

  const addToPlan = (workout: Workout) => {
    const alreadyExists = plan.some(
      (item) => String(item.id) === String(workout.id)
    );

    if (alreadyExists) {
      toast("Already added to today's plan");
      return;
    }

    if (plan.length >= 5) {
      toast.error("Today's plan can contain maximum 5 workouts");
      return;
    }

    setPlan([...plan, workout]);
    toast.success("Added to today's plan");
  };

  const addToSaved = (workout: Workout) => {
    const alreadyExists = saved.some(
      (item) => String(item.id) === String(workout.id)
    );

    if (alreadyExists) {
      toast("Already saved");
      return;
    }

    setSaved([...saved, workout]);
    toast.success("Saved for later");
  };

  const removeFromPlan = (id: string | number) => {
    setPlan((current) =>
      current.filter((item) => String(item.id) !== String(id))
    );

    toast.success("Removed from today's plan");
  };

  const removeFromSaved = (id: string | number) => {
    setSaved((current) =>
      current.filter((item) => String(item.id) !== String(id))
    );

    toast.success("Removed from saved");
  };

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        addToPlan,
        addToSaved,
        removeFromPlan,
        removeFromSaved,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);

  if (!context) {
    throw new Error("usePlan must be used inside PlanProvider");
  }

  return context;
}