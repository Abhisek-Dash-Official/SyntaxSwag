"use client";

import { useEffect, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-5 left-5 sm:bottom-6 sm:right-6 size-11 z-20 p-3 flex justify-center items-center bg-gradient-to-r from-[#89F336] to-[#7DE332] text-black rounded-full shadow-lg hover:bg-gray-800 transition-all"
      aria-label="Scroll to top"
    >
      <IoIosArrowUp className="text-xl sm:text-2xl" />
    </button>
  );
}
