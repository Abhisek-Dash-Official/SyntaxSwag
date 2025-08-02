"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { AiFillStar } from "react-icons/ai";
import AddToCartButton from "../../components/addToCartButton";
import BuyButton from "../../components/buyButton";
import LoadingPage from "../../components/loadingPage";

export default function Product() {
  const params = useParams();
  const [data, setData] = useState(null);

  const loadData = async (_id, type) => {
    try {
      const res = await fetch(`/api/itemDetail?_id=${_id}&type=${type}`);
      if (res.ok) {
        const json = await res.json();
        setData(json);
      } else {
        console.error("Failed to fetch product data");
      }
    } catch (error) {
      console.error("error: ", error);
    }
  };

  useEffect(() => {
    if (!params.slug) return;
    const slugParts = params.slug.split("-");
    const [_id, type] = slugParts.slice(-2);
    loadData(_id, type);
  }, [params.slug]);

  if (!data) return <LoadingPage />;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="bg-gray-100 rounded-2xl overflow-hidden">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${data.img}`}
            alt={data.title}
            width={600}
            height={600}
            className="w-full h-auto object-cover"
          />
        </div>

        <div className="text-gray-900 space-y-4">
          <h1 className="text-3xl font-bold text-lime-500">{data.title}</h1>
          <p className="text-gray-600 ">{data.desc_}</p>

          <div className="flex items-center gap-2">
            <AiFillStar className="text-yellow-400" />
            <span>
              {data.rate} ({data.reviews} reviews)
            </span>
          </div>

          <div className="text-xl font-semibold text-lime-500">
            ₹{data.price}
          </div>

          <div className="text-sm text-gray-500">
            In Stock: {data.stock} units
          </div>

          {data.colors?.length > 0 && (
            <div className="flex gap-2 items-center">
              <span className="font-medium text-gray-700">Colors:</span>
              {data.colors.map((color, index) => (
                <span
                  key={index}
                  className="w-5 h-5 rounded-full border border-gray-300"
                  style={{ backgroundColor: color }}
                ></span>
              ))}
            </div>
          )}

          <div className="flex gap-4 mt-6">
            <AddToCartButton item={data} />
            <BuyButton item={data} />
          </div>

          <Link
            href={`/${data.type}`}
            className="text-sm text-lime-600 hover:underline"
          >
            ← Back to {data.type}
          </Link>
        </div>
      </div>
    </div>
  );
}
