import Image from "next/image";
import Link from "next/link";
import React from "react";
import bannerImg from "@/assets/banner.png";

const Banner = () => {
  return (
    <section className="px-4 py-6 md:py-8">
      <div className="container mx-auto overflow-hidden rounded-2xl border border-[#292c34] bg-[#15171d]">
        <div className="grid items-center gap-6 px-6 py-10 md:grid-cols-2 md:px-10 md:py-12 lg:px-12">

          {/* Left Content */}
          <div className="text-left">

            {/* Eyebrow */}
            <p className="mb-5 text-[10px] font-bold tracking-widest text-[#ccff00]">
              WORKOUT LIBRARY
            </p>

            {/* Heading */}
            <h1 className="max-w-xl text-4xl font-black uppercase leading-[0.95] tracking-tight text-white md:text-5xl lg:text-6xl">
              TRAIN WITH INTENT. LOG EVERY SET.
            </h1>

            {/* Description */}
            <p className="mt-5 max-w-lg text-sm leading-6 text-gray-400 md:text-base">
              FitLog is a dark, no-nonsense gym companion: pick a lift,
              lock it into today&apos;s plan, and watch the week&apos;s work
              add up.
            </p>

            {/* Button */}
            <div className="mt-6">
              <Link
                href="#library"
                className="btn h-10 min-h-10 rounded-md border-0 bg-[#ccff00] px-5 text-xs font-bold uppercase text-black hover:bg-[#b8e600]"
              >
                Browse Workouts
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative flex items-center justify-center md:justify-end">
            <Image
              src={bannerImg}
              alt="Workout"
              priority
              className="h-64 w-auto object-contain md:h-72 lg:h-80"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Banner;