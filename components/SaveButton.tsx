// "use client";

// import { useContext } from "react";
// import { toast } from "react-toastify";
// import { PlanContext, Workout } from "@/components/PlanProvider";
// import { FiBookmark } from "react-icons/fi";

// const SaveButton = ({
//   workout,
// }: {
//   workout: Workout;
// }) => {
//   const { saved, addToSaved } =
//     useContext(PlanContext);

//   const handleSave = () => {
//     const alreadySaved = saved.some(
//       (item) => String(item.id) === String(workout.id),
//     );

//     if (alreadySaved) {
//       toast.info("Workout is already saved");
//       return;
//     }

//     addToSaved(workout);

//     toast.success(
//       `"${workout.name}" saved for later`,
//     );
//   };

//   return (
//     <button
//       onClick={handleSave}
//       className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-700 px-5 py-3 text-sm text-gray-300 transition hover:border-white hover:text-white"
//     >
//       <FiBookmark />

//       Save for later
//     </button>
//   );
// };

// export default SaveButton;