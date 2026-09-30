import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center bg-[#0f1014] px-4 text-center text-white">

      <p className="text-sm font-bold uppercase tracking-widest text-lime-400">
        404
      </p>

      <h1 className="mt-3 text-4xl font-extrabold">
        PAGE NOT FOUND
      </h1>

      <p className="mt-3 max-w-md text-sm text-gray-400">
        The page you are looking for does not exist
        or has been moved.
      </p>

      <Link
        href="/"
        className="mt-6 rounded-lg bg-[#ccff00] px-6 py-3 text-sm font-bold text-black transition hover:bg-lime-300"
      >
        Go to workouts
      </Link>

    </main>
  );
}