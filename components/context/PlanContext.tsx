"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

export type Workout = {
  id: string | number;
  name: string;
  image: string;

  category?: string[];
  tags?: string[];

  muscleGroups?: string[];

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
};

type PlanContextType = {
  plan: Workout[];
  saved: Workout[];

  addToPlan: (workout: Workout) => boolean;
  addToSaved: (workout: Workout) => boolean;

  removeFromPlan: (id: string | number) => void;
  removeFromSaved: (id: string | number) => void;

  markAsDone: (id: string | number) => void;
};

const PlanContext = createContext<PlanContextType | undefined>(
  undefined
);

export function PlanProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Load data from localStorage
  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem("fitlog-plan");
      const storedSaved = localStorage.getItem("fitlog-saved");

      if (storedPlan) {
        setPlan(JSON.parse(storedPlan));
      }

      if (storedSaved) {
        setSaved(JSON.parse(storedSaved));
      }
    } catch (error) {
      console.error("Failed to load FitLog data:", error);
    } finally {
      setLoaded(true);
    }
  }, []);

  // Save data to localStorage
  useEffect(() => {
    if (!loaded) return;

    localStorage.setItem(
      "fitlog-plan",
      JSON.stringify(plan)
    );

    localStorage.setItem(
      "fitlog-saved",
      JSON.stringify(saved)
    );
  }, [plan, saved, loaded]);

  // Add to Today's Plan
  const addToPlan = (workout: Workout): boolean => {
    const alreadyExists = plan.some(
      (item) => String(item.id) === String(workout.id)
    );

    if (alreadyExists) {
      toast("Already added to today's plan");
      return false;
    }

    if (plan.length >= 5) {
      toast.error(
        "Today's plan can contain maximum 5 workouts"
      );
      return false;
    }

    setPlan((previous) => [...previous, workout]);

    toast.success("Added to today's plan");

    return true;
  };

  // Save for later
  const addToSaved = (workout: Workout): boolean => {
    const alreadyExists = saved.some(
      (item) => String(item.id) === String(workout.id)
    );

    if (alreadyExists) {
      toast("Already saved");
      return false;
    }

    setSaved((previous) => [...previous, workout]);

    toast.success("Saved for later");

    return true;
  };

  // Remove from Today's Plan
  const removeFromPlan = (id: string | number) => {
    setPlan((previous) =>
      previous.filter(
        (item) => String(item.id) !== String(id)
      )
    );

    toast.success("Workout removed");
  };

  // Remove from Saved
  const removeFromSaved = (id: string | number) => {
    setSaved((previous) =>
      previous.filter(
        (item) => String(item.id) !== String(id)
      )
    );

    toast.success("Removed from saved");
  };

  // Mark as Done
  const markAsDone = (id: string | number) => {
    setPlan((previous) =>
      previous.filter(
        (item) => String(item.id) !== String(id)
      )
    );

    toast.success("Workout marked as done");
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
        markAsDone,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);

  if (!context) {
    throw new Error(
      "usePlan must be used inside PlanProvider"
    );
  }

  return context;
}