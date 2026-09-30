"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";

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

interface IPlanContext {
  plan: Workout[];
  saved: Workout[];

  addToPlan: (workout: Workout) => boolean;
  removeFromPlan: (id: string | number) => void;

  addToSaved: (workout: Workout) => boolean;
  removeFromSaved: (id: string | number) => void;
}

export const PlanContext = createContext<IPlanContext>({
  plan: [],
  saved: [],

  addToPlan: () => false,
  removeFromPlan: () => {},

  addToSaved: () => false,
  removeFromSaved: () => {},
});

export const PlanProvider = ({ children }: { children: ReactNode }) => {
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

    localStorage.setItem("fitlog-plan", JSON.stringify(plan));
    localStorage.setItem("fitlog-saved", JSON.stringify(saved));
  }, [plan, saved, loaded]);

  // Add to Today's Plan
  const addToPlan = (workout: Workout) => {
    if (plan.some((item) => String(item.id) === String(workout.id))) {
      toast.info("Already added to today's plan");
      return false;
    }

    if (plan.length >= 5) {
      toast.error("Today's plan can contain maximum 5 workouts");
      return false;
    }

    setPlan((previous) => [...previous, workout]);

    toast.success("Added to today's plan");

    return true;
  };

  // Remove from Today's Plan
  const removeFromPlan = (id: string | number) => {
    setPlan((previous) =>
      previous.filter((item) => String(item.id) !== String(id))
    );

    toast.success("Removed from today's plan");
  };

  // Add to Saved
  const addToSaved = (workout: Workout) => {
    if (saved.some((item) => String(item.id) === String(workout.id))) {
      toast.info("Already saved");
      return false;
    }

    setSaved((previous) => [...previous, workout]);

    toast.success("Saved for later");

    return true;
  };

  // Remove from Saved
  const removeFromSaved = (id: string | number) => {
    setSaved((previous) =>
      previous.filter((item) => String(item.id) !== String(id))
    );

    toast.success("Removed from saved");
  };

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        addToPlan,
        removeFromPlan,
        addToSaved,
        removeFromSaved,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = () => {
  return useContext(PlanContext);
};

export default PlanProvider;