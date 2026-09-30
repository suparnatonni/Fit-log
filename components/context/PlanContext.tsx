"use client";
import { createContext, useContext, useEffect, useState,} from "react";
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

type PlanContextType = {
  plan: Workout[];
  saved: Workout[];
  doneIds: (string | number)[];
  loaded: boolean;

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
  const [doneIds, setDoneIds] = useState<(string | number)[]>([]);
  const [loaded, setLoaded] = useState(false);

  
  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem("fitlog-plan");
      const storedSaved = localStorage.getItem("fitlog-saved");
      const storedDone = localStorage.getItem("fitlog-done");

      if (storedPlan) {
        const parsedPlan = JSON.parse(storedPlan);

        if (Array.isArray(parsedPlan)) {
          setPlan(parsedPlan);
        }
      }

      if (storedSaved) {
        const parsedSaved = JSON.parse(storedSaved);

        if (Array.isArray(parsedSaved)) {
          setSaved(parsedSaved);
        }
      }

      if (storedDone) {
        const parsedDone = JSON.parse(storedDone);

        if (Array.isArray(parsedDone)) {
          setDoneIds(parsedDone);
        }
      }
    } catch (error) {
      console.error(
        "Failed to load FitLog data:",
        error
      );
    } finally {
      setLoaded(true);
    }
  }, []);

 
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

    localStorage.setItem(
      "fitlog-done",
      JSON.stringify(doneIds)
    );
  }, [plan, saved, doneIds, loaded]);

  
  const addToPlan = (workout: Workout): boolean => {
    const alreadyExists = plan.some(
      (item) =>
        String(item.id) === String(workout.id)
    );

    if (alreadyExists) {
      toast.info(
        "Workout is already in today's plan"
      );
      return false;
    }

    if (plan.length >= 5) {
      toast.error(
        "Today's plan can contain maximum 5 workouts"
      );
      return false;
    }

    setPlan((previous) => [
      ...previous,
      workout,
    ]);

    toast.success(
      `"${workout.name}" added to today's plan`
    );

    return true;
  };


  const addToSaved = (workout: Workout): boolean => {
    const alreadyExists = saved.some(
      (item) =>
        String(item.id) === String(workout.id)
    );

    if (alreadyExists) {
      toast.info("Workout is already saved");
      return false;
    }

    setSaved((previous) => [
      ...previous,
      workout,
    ]);

    toast.success(
      `"${workout.name}" saved for later`
    );

    return true;
  };

 
  const removeFromPlan = (
    id: string | number
  ) => {
    setPlan((previous) =>
      previous.filter(
        (item) =>
          String(item.id) !== String(id)
      )
    );

    setDoneIds((previous) =>
      previous.filter(
        (item) =>
          String(item) !== String(id)
      )
    );

    toast.success("Workout removed");
  };

  
  const removeFromSaved = (
    id: string | number
  ) => {
    setSaved((previous) =>
      previous.filter(
        (item) =>
          String(item.id) !== String(id)
      )
    );

    toast.success("Removed from saved");
  };

  
  const markAsDone = (
    id: string | number
  ) => {
    setDoneIds((previous) => {
      const alreadyDone = previous.some(
        (item) =>
          String(item) === String(id)
      );

      if (alreadyDone) {
        return previous;
      }

      return [...previous, id];
    });

    toast.success("Workout marked as done");
  };

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        doneIds,
        loaded,
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