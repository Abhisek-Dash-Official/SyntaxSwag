"use client";
import { useEffect, useState } from "react";
import { FaShippingFast } from "react-icons/fa";

export default function LoadingPage({ title = "Setting up your shop" }) {
  const [dotCount, setDotCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prev) => (prev + 1) % 4); // 0 to 3 dots
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#2c2c2c_1px,transparent_1px)] bg-[length:20px_20px] opacity-10" />

      {/* Animated Shipping Truck */}
      <div className="bg-lime-400 text-black p-6 rounded-full shadow-xl z-10">
        <FaShippingFast size={40} />
      </div>

      <p className="text-2xl sm:text-3xl font-bold tracking-wide mt-6 z-10">
        {title}
        {".".repeat(dotCount)}
      </p>
    </div>
  );
}
