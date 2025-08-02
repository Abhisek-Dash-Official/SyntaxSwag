import Link from "next/link";
import Image from "next/image";
import { FaStar } from "react-icons/fa6";
import AddToCartButton from "./addToCartButton";
import BuyButton from "./buyButton";

export default function Card({ product }) {
  const productLink = `/product/${product.title.replace(/\s+/g, "-")}-${
    product._id
  }-${product.type}`;

  return (
    <div className="w-[260px] bg-white rounded-md shadow hover:shadow-lg transition-transform hover:scale-[1.03] overflow-hidden text-sm">
      <Link href={productLink}>
        <div className="relative h-36 w-full">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${product.img}`}
            alt={product.title}
            fill
            className="rounded-t-md object-cover"
          />
        </div>

        <div className="p-3 space-y-1.5">
          <h3 className="font-semibold text-gray-800 truncate">
            {product.title}
          </h3>

          <p className="text-gray-500 text-xs line-clamp-2">{product.desc_}</p>

          <div className="flex justify-between items-center">
            <span className="text-base font-bold text-gray-900">
              ₹{product.price}
            </span>
            <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
              {product.category}
            </span>
          </div>

          <div className="flex items-center gap-1 text-yellow-500">
            <span className="flex items-center gap-0.5 text-xs">
              {product.rate} <FaStar size={12} />
            </span>
            <span className="text-gray-400 text-[10px]">
              ({product.reviews})
            </span>
          </div>

          {/* Colors */}
          {product.colors?.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-gray-600 text-xs">Colors:</span>
              <div className="flex gap-1">
                {product.colors.map((color, i) => (
                  <span
                    key={i}
                    className="h-3 w-3 rounded-full border"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </Link>

      {/* Buttons section hidden for now */}
      <div className="p-2 border-t flex justify-end space-x-1">
        <AddToCartButton item={product} />
        <BuyButton item={product} />
      </div>
    </div>
  );
}
