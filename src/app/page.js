"use client";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import Card from "./components/card";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await fetch("/api/products?type=outfits");
        const res2 = await fetch("/api/products?type=deskwares");
        const res3 = await fetch("/api/products?type=stickers");
        const data1 = await res1.json();
        const data2 = await res2.json();
        const data3 = await res3.json();
        setData1(data1);
        setData2(data2);
        setData3(data3);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const ProductSection = ({ title, data, link, gradient }) => (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <h2
            className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
          >
            {title}
          </h2>
        </div>
        <Link
          href={link}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors group"
        >
          View All
          <FaArrowRight
            size={16}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </div>

      <div className="relative">
        <div className="overflow-x-auto">
          <div className="flex gap-6 pb-4" style={{ width: "max-content" }}>
            {loading
              ? // Loading skeletons
                [...Array(4)].map((_, i) => (
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
        </div>

        {/* Fade gradient on the right */}
        <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-gray-50 to-transparent pointer-events-none"></div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <div className="mt-5 mx-auto w-[600px] max-w-full px-4">
        <Image
          src="/herobanner.png"
          alt="Hero Banner"
          width={1024}
          height={1024}
          className="w-full h-auto object-contain rounded-xl shadow-md"
          priority
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-lime-600 via-lime-500 to-blue-400 bg-clip-text text-transparent mb-4">
            Discover Amazing Products
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
            Explore our curated collection of premium outfits, desk accessories,
            and unique stickers
          </p>
        </div>

        {/* Product Sections */}
        <ProductSection
          title="Outfits"
          data={data1}
          link="/outfits"
          gradient="from-pink-500 to-violet-600"
        />

        <ProductSection
          title="Deskwares"
          data={data2}
          link="/deskwares"
          gradient="from-blue-500 to-cyan-600"
        />

        <ProductSection
          title="Stickers"
          data={data3}
          link="/stickers"
          gradient="from-green-500 to-emerald-600"
        />
      </div>
    </div>
  );
}
