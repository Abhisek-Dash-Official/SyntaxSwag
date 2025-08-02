"use client";
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";

export default function Filter({
  close,
  colors = { colorsArr: [], colorsFunc: () => {} },
  priceFunc = () => {},
  category = { categoryArr: [], categoryFunc: () => {} },
  popularityFunc = () => {},
}) {
  const [activeColor, setActiveColor] = useState(null);
  const [activePrice, setActivePrice] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isPopularityActive, setIsPopularityActive] = useState(false);

  const priceRanges = ["<100", "<500", "<1000", ">1000"];

  const handleColorClick = (color) => {
    setActiveColor(color);
    colors.colorsFunc(color);
  };

  const handlePriceClick = (price) => {
    setActivePrice(price);
    priceFunc(price);
  };

  const handleCategoryClick = (cat) => {
    setActiveCategory(cat);
    category.categoryFunc(cat);
  };

  const handlePopularityClick = () => {
    setIsPopularityActive(!isPopularityActive);
    popularityFunc(isPopularityActive);
  };

  return (
    <div className="bg-lime-50 p-6 rounded-lg border-2 border-lime-200 max-w-md mx-auto z-20 absolute top-3 right-3">
      <IoMdClose onClick={close} className="absolute top-3 right-3 text-2xl" />
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Filters
      </h2>

      {/* Colors Filter */}
      {colors.colorsArr && colors.colorsArr.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Colors</h3>
          <div className="flex flex-wrap gap-2">
            {colors.colorsArr.map((color, index) => (
              <button
                key={index}
                onClick={() => handleColorClick(color)}
                className={`px-4 py-2 rounded-full border-2 transition-all duration-200 font-medium ${
                  activeColor === color
                    ? "bg-lime-400 border-lime-600 text-gray-800 shadow-md"
                    : "bg-white border-lime-300 text-gray-700 hover:bg-lime-100 hover:border-lime-400"
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Price Filter */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">
          Price Range
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {priceRanges.map((price, index) => (
            <button
              key={index}
              onClick={() => handlePriceClick(price)}
              className={`px-4 py-2 rounded-lg border-2 transition-all duration-200 font-medium ${
                activePrice === price
                  ? "bg-lime-400 border-lime-600 text-gray-800 shadow-md"
                  : "bg-white border-lime-300 text-gray-700 hover:bg-lime-100 hover:border-lime-400"
              }`}
            >
              ₹{price}
            </button>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      {category.categoryArr && category.categoryArr.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Category</h3>
          <div className="flex flex-wrap gap-2">
            {category.categoryArr.map((cat, index) => (
              <button
                key={index}
                onClick={() => handleCategoryClick(cat)}
                className={`px-4 py-2 rounded-full border-2 transition-all duration-200 font-medium ${
                  activeCategory === cat
                    ? "bg-lime-400 border-lime-600 text-gray-800 shadow-md"
                    : "bg-white border-lime-300 text-gray-700 hover:bg-lime-100 hover:border-lime-400"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Popularity Filter */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">
          Sort by Popularity
        </h3>
        <button
          onClick={handlePopularityClick}
          className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 font-medium ${
            isPopularityActive
              ? "bg-lime-400 border-lime-600 text-gray-800 shadow-md"
              : "bg-white border-lime-300 text-gray-700 hover:bg-lime-100 hover:border-lime-400"
          }`}
        >
          {isPopularityActive ? "Popular Items ✓" : "Sort by Popular"}
        </button>
      </div>
    </div>
  );
}

// Example usage with demo data
const App = () => {
  const handleColorFilter = (color) => {
    console.log("Color selected:", color);
  };

  const handlePriceFilter = (price) => {
    console.log("Price range selected:", price);
  };

  const handleCategoryFilter = (category) => {
    console.log("Category selected:", category);
  };

  const handlePopularityFilter = () => {
    console.log("Popularity filter toggled");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <FilterComponent
        colors={{
          colorsArr: ["Red", "Blue", "Green", "Black", "White", "Yellow"],
          colorsFunc: handleColorFilter,
        }}
        priceFunc={handlePriceFilter}
        category={{
          categoryArr: ["Electronics", "Clothing", "Books", "Home & Garden"],
          categoryFunc: handleCategoryFilter,
        }}
        popularityFunc={handlePopularityFilter}
      />
    </div>
  );
};
