"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import logo from "@/assets/logo.png";

import { usePlan } from "@/components/context/PlanContext";

const Navbar = () => {
  const { plan, saved } = usePlan();

  const pathname = usePathname();

  const workoutActive =
    pathname === "/" ||
    pathname.startsWith("/workouts");

  const planActive =
    pathname === "/my-plan";

  return (
    <nav className="border-t-2 border-[#ccff00] bg-[#101116] text-white">

      <div className="navbar container mx-auto min-h-16 px-4">

        {/* Left */}
        <div className="navbar-start">

          {/* Mobile menu */}
          <div className="dropdown">

            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>

            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content z-50 mt-3 w-52 rounded-box bg-[#18191f] p-2 shadow"
            >
              <li>
                <Link href="/">
                  Workouts
                </Link>
              </li>

              <li>
                <Link href="/my-plan">
                  My Plan
                </Link>
              </li>
            </ul>

          </div>

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2"
          >
            <Image
              src={logo}
              alt="FitLog Logo"
              width={30}
              height={30}
            />

            <span className="text-sm font-extrabold tracking-wider">
              FITLOG
            </span>
          </Link>

        </div>

        {/* Desktop Navigation */}
        <div className="navbar-center hidden lg:flex">

          <ul className="menu menu-horizontal gap-2 px-1">

            <li>
              <Link
                href="/"
                className={`rounded-full px-4 text-xs transition ${
                  workoutActive
                    ? "bg-[#ccff00] text-black"
                    : "text-white hover:bg-[#202a0c] hover:text-[#ccff00]"
                }`}
              >
                Workouts
              </Link>
            </li>

            <li>
              <Link
                href="/my-plan"
                className={`rounded-full px-4 text-xs transition ${
                  planActive
                    ? "bg-[#ccff00] text-black"
                    : "text-white hover:bg-[#202a0c] hover:text-[#ccff00]"
                }`}
              >
                My Plan
              </Link>
            </li>

          </ul>

        </div>

        {/* Counters */}
        <div className="navbar-end gap-2 sm:gap-4">

          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 text-xs text-gray-300 sm:gap-2"
          >
            <span>Plan</span>

            <span className="badge badge-sm border-0 bg-[#ccff00] text-black">
              {plan.length}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 text-xs text-gray-300 sm:gap-2"
          >
            <span>Saved</span>

            <span className="badge badge-sm border border-gray-600 bg-transparent text-white">
              {saved.length}
            </span>
          </Link>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;