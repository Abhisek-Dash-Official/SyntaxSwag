"use client";
import { FiSearch, FiX } from "react-icons/fi";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar({ close }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions] = useState([
    "Syntax Hoodies",
    "JavaScript Stickers",
    "Code Desk Mat",
    "Python T-Shirt",
    "React Mug",
  ]);
  const handelSearch = (term) => {
    if (term) {
      router.push(`/search?searchTerm=${term}`);
      close();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-green-900/20 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full max-w-2xl mx-4 border border-green-500/20 animate-slideUp">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-400 rounded-xl shadow-lg">
              <FiSearch className="text-white" size={20} />
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
              Search Products
            </h3>
          </div>
          <button
            onClick={close}
            className="p-2 hover:bg-gray-700/50 rounded-full transition-all duration-300 hover:rotate-90 group"
          >
            <FiX size={24} className="text-gray-400 group-hover:text-white" />
          </button>
        </div>

        <div className="relative mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handelSearch(e.target.value);
              }
            }}
            placeholder="Search for coding gear, stickers, apparel..."
            className="w-full p-4 pl-12 bg-gray-800/50 border-2 border-gray-700 rounded-xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all duration-300 text-lg text-white placeholder-gray-400"
            autoFocus
          />
          <FiSearch
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold text-gray-400 mb-3">
            Popular Searches
          </p>
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="p-3 hover:bg-gradient-to-r hover:from-green-900/30 hover:to-emerald-900/30 rounded-xl cursor-pointer transition-all duration-300 group border border-transparent hover:border-green-500/20"
            >
              <div className="flex items-center space-x-3">
                <FiSearch
                  className="text-gray-500 group-hover:text-green-400 transition-colors"
                  size={16}
                />
                <button
                  onClick={() => handelSearch(suggestion)}
                  className="text-gray-300 group-hover:text-green-300"
                >
                  {suggestion}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
