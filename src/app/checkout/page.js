"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MdDeleteForever } from "react-icons/md";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import LoadingPage from "../components/loadingPage";

export default function Checkout() {
  const router = useRouter();
  const [product_details, setProduct_details] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadCartDetails = async () => {
      setUser(JSON.parse(localStorage.getItem("user")));
      const carts = JSON.parse(localStorage.getItem("carts") || "[]");
      const products = [];

      for (const cart of carts) {
        try {
          const res = await fetch(
            `/api/itemDetail?_id=${cart._id}&type=${cart.type}`
          );
          if (res.ok) {
            const data = await res.json();
            // Add quantity from cart to product data
            products.push({
              ...data,
              quantity: cart.quantity || 1,
              cartId: cart._id,
            });
          } else {
            console.error("Failed to fetch item:", cart._id);
          }
        } catch (err) {
          console.error("Error fetching item:", cart._id, err);
        }
      }

      setProduct_details(products);
      setLoading(false);
    };

    loadCartDetails();
  }, []);

  const updateCartQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    // Update local state
    setProduct_details((prev) =>
      prev.map((product) =>
        product.id === productId
          ? { ...product, quantity: newQuantity }
          : product
      )
    );

    // Update localStorage
    const carts = JSON.parse(localStorage.getItem("carts") || "[]");
    const updatedCarts = carts.map((cart) =>
      cart._id === productId ? { ...cart, quantity: newQuantity } : cart
    );
    localStorage.setItem("carts", JSON.stringify(updatedCarts));
  };

  const removeFromCart = (productId) => {
    // Update local state
    setProduct_details((prev) =>
      prev.filter((product) => product.id !== productId)
    );

    // Update localStorage
    const carts = JSON.parse(localStorage.getItem("carts") || "[]");
    const updatedCarts = carts.filter((cart) => cart._id !== productId);
    localStorage.setItem("carts", JSON.stringify(updatedCarts));
  };

  // Calculate totals
  const totalItems = product_details.reduce(
    (sum, product) => sum + product.quantity,
    0
  );
  const totalPrice = product_details.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  // Handel user purchase
  const handelPurchase = async () => {
    if (!user) {
      toast.error("Signup before purchase");
      router.push("/register/signup");
    }

    const res = await fetch("/api/userPurchase", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_details,
        totalItems,
        totalPrice,
        user,
      }),
    });
    if (res.ok) {
      toast.success(
        "Purchased sucessfully, You wil get your item soon! Thanks for purchasing"
      );
    } else {
      toast.error("Purchased Failed! Something went wrong.");
    }
  };

  if (loading) {
    return <LoadingPage />;
  }

  if (product_details.length === 0) {
    return (
      <main className="bg-gray-900 text-white min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base">
              Add some products to get started
            </p>
            <Link href="/">
              <button className="bg-lime-400 hover:bg-lime-500 px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-black text-sm sm:text-base transition-colors">
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 px-4 py-6">
      {/* Header */}
      <div className="text-center mx-auto mb-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-lime-500 to-lime-300 bg-clip-text text-transparent">
          Checkout
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-xl sm:max-w-2xl mx-auto">
          Review your items and complete your purchase
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
        {/* Cart Items */}
        <div className="flex-1 bg-gray-800 rounded-xl p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-white">
            Your Items
          </h2>

          <div className="space-y-4 sm:space-y-6">
            {product_details.map((product) => (
              <div
                key={product.id * Math.random()}
                className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-gray-700 rounded-lg"
              >
                {/* Image and Product Info */}
                <div className="flex flex-row items-center gap-4">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gray-600 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${product.img}`}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-white">
                      {product.title}
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm">
                      {product.category}
                    </p>
                    <p className="text-white font-semibold mt-1 text-sm sm:text-base">
                      ₹{product.price}
                    </p>
                  </div>
                </div>

                {/* Quantity Controls, Price, and Remove Button */}
                <div className="flex items-center justify-between gap-2 sm:gap-4">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <button
                      onClick={() =>
                        updateCartQuantity(product.id, product.quantity - 1)
                      }
                      className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-600 hover:bg-gray-500 rounded-full flex items-center justify-center transition-colors text-white"
                      aria-label="Decrease quantity"
                    >
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20 12H4"
                        />
                      </svg>
                    </button>

                    <span className="w-8 sm:w-10 text-center font-semibold text-xs sm:text-sm text-white">
                      {product.quantity}
                    </span>

                    <button
                      onClick={() =>
                        updateCartQuantity(product.id, product.quantity + 1)
                      }
                      className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-600 hover:bg-gray-500 rounded-full flex items-center justify-center transition-colors text-white"
                      aria-label="Increase quantity"
                    >
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-4">
                    <p className="text-sm sm:text-base font-semibold min-w-[60px] sm:min-w-[80px] text-right text-white">
                      ₹{(product.price * product.quantity).toLocaleString()}
                    </p>

                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="text-red-400 text-xl hover:text-red-300 transition-colors"
                      title="Remove item"
                      aria-label="Remove item"
                    >
                      <MdDeleteForever />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary & Buy Button */}
        <div className="w-full lg:w-80 bg-white rounded-xl p-4 sm:p-6 shadow-md h-fit lg:sticky lg:top-4">
          <h2 className="text-xl font-bold mb-4 text-gray-900">
            Order Summary
          </h2>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-gray-700">
              <span>Total Items:</span>
              <span className="font-semibold">{totalItems}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Subtotal:</span>
              <span className="font-semibold">
                ₹{totalPrice.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Shipping:</span>
              <span className="font-semibold">Free</span>
            </div>
            <hr className="border-gray-300" />
            <div className="flex justify-between text-lg font-bold text-gray-900">
              <span>Total:</span>
              <span>₹{totalPrice.toLocaleString()}</span>
            </div>
          </div>

          <button
            onClick={handelPurchase}
            className="w-full bg-lime-500 text-white py-3 rounded-lg hover:bg-lime-600 transition-colors font-semibold"
          >
            Purchase
          </button>

          <Link href="/" className="block mt-3">
            <button className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
