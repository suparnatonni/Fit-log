import Image from "next/image";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-gray-800 bg-[#0d0f12]">
      <div className="container mx-auto flex min-h-20 items-center justify-between px-5 py-5">
        
        {/* Left - Logo */}
        <div className="flex items-center gap-2">
          <Image
            src={logo}
            alt="FitLog"
            width={22}
            height={22}
            className="object-contain"
          />

          <span className="text-sm font-extrabold tracking-wide text-white">
            FITLOG
          </span>
        </div>

        {/* Right - Copyright */}
        <p className="text-right text-[10px] text-gray-500 sm:text-xs">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
};

export default Footer;