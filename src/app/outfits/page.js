"use client";
import { useEffect, useRef, useState } from "react";
import Card from "../components/card";
import { FaFilter } from "react-icons/fa6";
import Filter from "../components/filterBar";
import { toast } from "react-toastify";

export default function Outfits() {
  const pageRef = useRef(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [colors, setColors] = useState(null);
  const [price, setPrice] = useState(null);
  const [category, setCategory] = useState(null);
  const [popular, setPopular] = useState(false);

  // Load data
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const url = new URL(`/api/products`, window.location.origin);
        url.searchParams.append("type", "outfits");
        url.searchParams.append("page", "1");
        url.searchParams.append("limit", "10");

        if (colors) url.searchParams.append("colors", colors);
        if (price) url.searchParams.append("price", price);
        if (category) url.searchParams.append("category", category);
        if (popular !== null) url.searchParams.append("popular", popular);
        const res = await fetch(url);
        const result = await res.json();
        console.log(result);
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [colors, price, category, popular]);

  // Load More Handler
  const loadMore = async () => {
    setLoadingMore(true);
    pageRef.current += 1;

    try {
      const url = new URL(`/api/products`, window.location.origin);
      url.searchParams.append("type", "outfits");
      url.searchParams.append("page", pageRef.current);
      url.searchParams.append("limit", "10");

      if (colors) url.searchParams.append("colors", colors);
      if (price) url.searchParams.append("price", price);
      if (category) url.searchParams.append("category", category);
      if (popular !== null) url.searchParams.append("popular", popular);
      const res = await fetch(url);
      const moreData = await res.json();
      if (!moreData.length) {
        toast.error("Product not found for these filters!");
        return;
      }

      setData((prev) => [...prev, ...moreData]);
    } catch (err) {
      console.error("Error loading more:", err);
    }
    setLoadingMore(false);
  };

  const closeFilter = () => setIsOpenFilter(false);

  const ProductSection = ({ data }) => (
    <section className="mb-12">
      <div className="relative">
        <div className="flex justify-center items-center flex-wrap gap-6 pb-4">
          {!data.length && !loading && (
            <p className="text-center text-lg md:text-xl text-gray-600 border border-dashed border-gray-300 px-4 py-6 rounded-xl mx-auto w-fit animate-fade-in">
              😕 No products found or nothing left to show.
            </p>
          )}
          {loading
            ? [...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="min-w-[280px] bg-gray-200 rounded-2xl animate-pulse"
                >
                  <div className="h-48 bg-gray-300 rounded-t-2xl"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                  </div>
                </div>
              ))
            : data.map((product) => (
                <Card key={product._id} product={product} />
              ))}
        </div>

        <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-gray-50 to-transparent pointer-events-none"></div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero */}
        <div className="text-center mb-12 flex flex-wrap justify-between items-center">
          <div className="">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-lime-600 via-lime-500 to-lime-400 bg-clip-text text-transparent mb-4">
              Outfits
            </h1>
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
              Step into style with our handpicked range of premium outfits
            </p>
          </div>
          <button
            onClick={() => setIsOpenFilter(!isOpenFilter)}
            className="flex justify-center items-center gap-2 text-xl bg-lime-400 p-2 rounded"
          >
            <span>Filter</span>
            <span>
              <FaFilter />
            </span>
          </button>
        </div>

        {/* Product Cards */}
        <ProductSection data={data} />

        {/* View More */}
        <div className="flex justify-center items-center underline ">
          <button
            onClick={loadMore}
            disabled={loadingMore}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors group cursor-pointer"
          >
            {loadingMore ? "Loading..." : "View More"}
          </button>
        </div>
      </div>
      {isOpenFilter ? (
        <Filter
          close={closeFilter}
          colors={{
            colorsArr: ["red", "green", "blue", "yellow"],
            colorsFunc: (colors) => {
              setColors(colors);
            },
          }}
          priceFunc={(price) => {
            setPrice(price);
          }}
          category={{
            categoryArr: ["tshirt", "cap", "hoodie", "bag"],
            categoryFunc: (category) => {
              setCategory(category);
            },
          }}
          popularityFunc={(popular) => {
            setPopular(popular);
          }}
        />
      ) : (
        ""
      )}
    </div>
  );
}
