"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export type Workout = {
  id: string | number;
  name: string;
  image: string;

  category?: string[];
  tags?: string[];

  equipment?: string;

  duration: number;
  caloriesBurned: number;
  rating: number;

  description?: string;
  difficulty?: string;
  sets?: number;
  reps?: string;

  instructions?: string[];
};

interface IPlanContext {
  plan: Workout[];
  saved: Workout[];

  addToPlan: (workout: Workout) => void;
  removeFromPlan: (id: string | number) => void;

  addToSaved: (workout: Workout) => void;
  removeFromSaved: (id: string | number) => void;
}

export const PlanContext = createContext<IPlanContext>({
  plan: [],
  saved: [],

  addToPlan: () => {},
  removeFromPlan: () => {},

  addToSaved: () => {},
  removeFromSaved: () => {},
});

const PlanProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);

  /*
   * Load data after browser loads
   */
  useEffect(() => {
    const storedPlan = localStorage.getItem("fitlog-plan");
    const storedSaved = localStorage.getItem("fitlog-saved");

    if (storedPlan) {
      setPlan(JSON.parse(storedPlan));
    }

    if (storedSaved) {
      setSaved(JSON.parse(storedSaved));
    }
  }, []);

  /*
   * Save Plan
   */
  useEffect(() => {
    localStorage.setItem(
      "fitlog-plan",
      JSON.stringify(plan),
    );
  }, [plan]);

  /*
   * Save Saved
   */
  useEffect(() => {
    localStorage.setItem(
      "fitlog-saved",
      JSON.stringify(saved),
    );
  }, [saved]);

  /*
   * Add to Today's Plan
   */
  const addToPlan = (workout: Workout) => {
    setPlan((previous) => {
      const alreadyExists = previous.some(
        (item) => String(item.id) === String(workout.id),
      );

      if (alreadyExists) {
        return previous;
      }

      /*
       * Maximum 5 exercises
       */
      if (previous.length >= 5) {
        return previous;
      }

      return [...previous, workout];
    });
  };

  /*
   * Remove from Today's Plan
   */
  const removeFromPlan = (id: string | number) => {
    setPlan((previous) =>
      previous.filter(
        (item) => String(item.id) !== String(id),
      ),
    );
  };

  /*
   * Add to Saved
   */
  const addToSaved = (workout: Workout) => {
    setSaved((previous) => {
      const alreadyExists = previous.some(
        (item) => String(item.id) === String(workout.id),
      );

      if (alreadyExists) {
        return previous;
      }

      return [...previous, workout];
    });
  };

  /*
   * Remove from Saved
   */
  const removeFromSaved = (id: string | number) => {
    setSaved((previous) =>
      previous.filter(
        (item) => String(item.id) !== String(id),
      ),
    );
  };

  const sharedData = {
    plan,
    saved,

    addToPlan,
    removeFromPlan,

    addToSaved,
    removeFromSaved,
  };

  return (
    <PlanContext.Provider value={sharedData}>
      {children}
    </PlanContext.Provider>
  );
};

export default PlanProvider;


/*
 * Optional custom hook
 */
export const usePlan = () => {
  return useContext(PlanContext);
};