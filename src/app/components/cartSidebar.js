"use client";

import { FiShoppingCart, FiX, FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function CartSidebar({ close }) {
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("carts") || "[]");
    setCarts(saved);
    console.log(saved);
  }, []);

  const updateQuantity = (title, change) => {
    const updated = carts
      .map((cart) => {
        if (cart.title === title) {
          const newQuantity = Math.max(0, cart.quantity + change);
          return newQuantity === 0 ? null : { ...cart, quantity: newQuantity };
        }
        return cart;
      })
      .filter(Boolean);

    setCarts(updated);
    localStorage.setItem("carts", JSON.stringify(updated));
  };

  const removeItem = (title) => {
    const updated = carts.filter((cart) => cart.title !== title);
    setCarts(updated);
    localStorage.setItem("carts", JSON.stringify(updated));
  };

  const clearAll = () => {
    setCarts([]);
    localStorage.setItem("carts", JSON.stringify([]));
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={close} />
      <div className="fixed right-0 top-0 bottom-0 w-full sm:w-[400px] bg-black text-white z-50 flex flex-col shadow-xl">
        <div className="p-4 bg-gradient-to-r from-[#89F336] to-[#7DE332] text-black flex justify-between items-center">
          <h2 className="text-xl font-bold">Shopping Cart</h2>
          <button
            onClick={close}
            className="p-2 hover:bg-white/20 rounded-full transition-all duration-300 hover:rotate-90"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {carts.length === 0 ? (
            <div className="text-center mt-16">
              <FiShoppingCart
                size={64}
                className="mx-auto text-gray-600 mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-300 mb-2">
                Your cart is empty
              </h3>
              <p className="text-gray-500 mb-6">
                Add some coding swag to get started!
              </p>
              <button
                onClick={close}
                className="px-6 py-3 bg-gradient-to-r from-[#89F336] to-[#7DE332] text-black rounded-xl hover:shadow-lg hover:shadow-green-500/25 transform hover:-translate-y-0.5 transition-all duration-300"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {carts.map((cart, index) => (
                <div
                  key={index}
                  className="bg-white/5 p-4 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <h4 className="font-semibold">{cart.title}</h4>
                    <p className="text-sm text-gray-400">
                      Quantity: {cart.quantity}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(cart.title, -1)}
                      className="p-1 text-gray-300 hover:text-white"
                    >
                      <FiMinus />
                    </button>
                    <span className="px-2">{cart.quantity}</span>
                    <button
                      onClick={() => updateQuantity(cart.title, 1)}
                      className="p-1 text-gray-300 hover:text-white"
                    >
                      <FiPlus />
                    </button>
                    <button
                      onClick={() => removeItem(cart.title)}
                      className="p-1 text-red-400 hover:text-red-600"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {carts.length > 0 && (
          <div className="p-4 border-t border-white/10">
            <div className="flex gap-2">
              <button
                onClick={clearAll}
                className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-md"
              >
                Clear All
              </button>
              <Link
                href={"/checkout"}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-[#89F336] to-[#7DE332] text-black rounded-md hover:shadow-lg hover:shadow-green-500/25"
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
