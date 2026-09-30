
// "use client";

// import React, {
//   createContext,
//   ReactNode,
//   useContext,
//   useEffect,
//   useState,
// } from "react";

// export type Workout = {
//   id: string | number;
//   name: string;
//   image: string;
//   category?: string[];
//   tags?: string[];
//   equipment?: string;
//   duration: number;
//   caloriesBurned: number;
//   rating: number;
//   description?: string;
//   difficulty?: string;
//   sets?: number;
//   reps?: string;
//   instructions?: string[];
// };

// interface IPlanContext {
//   plan: Workout[];
//   saved: Workout[];
//   addToPlan: (workout: Workout) => boolean;
//   removeFromPlan: (id: string | number) => void;
//   addToSaved: (workout: Workout) => boolean;
//   removeFromSaved: (id: string | number) => void;
// }

// export const PlanContext = createContext<IPlanContext>({
//   plan: [],
//   saved: [],
//   addToPlan: () => false,
//   removeFromPlan: () => {},
//   addToSaved: () => false,
//   removeFromSaved: () => {},
// });

// const PlanProvider = ({ children }: { children: ReactNode }) => {
//   const [plan, setPlan] = useState<Workout[]>([]);
//   const [saved, setSaved] = useState<Workout[]>([]);
//   const [loaded, setLoaded] = useState(false);

//   useEffect(() => {
//     try {
//       const storedPlan = localStorage.getItem("fitlog-plan");
//       const storedSaved = localStorage.getItem("fitlog-saved");

//       if (storedPlan) setPlan(JSON.parse(storedPlan));
//       if (storedSaved) setSaved(JSON.parse(storedSaved));
//     } catch (error) {
//       console.error("Failed to load FitLog data:", error);
//     } finally {
//       setLoaded(true);
//     }
//   }, []);

//   useEffect(() => {
//     if (!loaded) return;

//     localStorage.setItem("fitlog-plan", JSON.stringify(plan));
//     localStorage.setItem("fitlog-saved", JSON.stringify(saved));
//   }, [plan, saved, loaded]);

//   const addToPlan = (workout: Workout): boolean => {
//     if (plan.some((item) => String(item.id) === String(workout.id))) {
//       return false;
//     }

//     if (plan.length >= 5) {
//       return false;
//     }

//     setPlan((previous) => [...previous, workout]);
//     return true;
//   };

//   const removeFromPlan = (id: string | number) => {
//     setPlan((previous) =>
//       previous.filter((item) => String(item.id) !== String(id))
//     );
//   };

//   const addToSaved = (workout: Workout): boolean => {
//     if (saved.some((item) => String(item.id) === String(workout.id))) {
//       return false;
//     }

//     setSaved((previous) => [...previous, workout]);
//     return true;
//   };

//   const removeFromSaved = (id: string | number) => {
//     setSaved((previous) =>
//       previous.filter((item) => String(item.id) !== String(id))
//     );
//   };

//   return (
//     <PlanContext.Provider
//       value={{
//         plan,
//         saved,
//         addToPlan,
//         removeFromPlan,
//         addToSaved,
//         removeFromSaved,
//       }}
//     >
//       {children}
//     </PlanContext.Provider>
//   );
// };

// export default PlanProvider;

// export const usePlan = () => useContext(PlanContext);