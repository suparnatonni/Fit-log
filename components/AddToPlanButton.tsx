// "use client";

// import { useContext } from "react";
// import { toast } from "react-toastify";
// import { PlanContext, Workout } from "@/components/PlanProvider";
// import { FiPlus } from "react-icons/fi";

// const AddToPlanButton = ({
//   workout,
// }: {
//   workout: Workout;
// }) => {
//   const { plan, addToPlan } = useContext(PlanContext);

//   const handleAddToPlan = () => {
//     const alreadyExists = plan.some(
//       (item) => String(item.id) === String(workout.id),
//     );

//     if (alreadyExists) {
//       toast.info("Workout is already in today's plan");
//       return;
//     }

//     if (plan.length >= 5) {
//       toast.error("You can add maximum 5 workouts");
//       return;
//     }

//     addToPlan(workout);

//     toast.success(
//       `"${workout.name}" added to today's plan`,
//     );
//   };

//   return (
//     <button
//       onClick={handleAddToPlan}
//       className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-lime-400 px-5 py-3 text-sm font-bold text-black transition hover:bg-lime-300"
//     >
//       <FiPlus />

//       Add to today's plan
//     </button>
//   );
// };

// export default AddToPlanButton;