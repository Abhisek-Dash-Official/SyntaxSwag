"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoIosLogIn, IoIosSearch } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import CartSidebar from "./cartSidebar";
import SearchBar from "./searchBar";

export default function Header() {
  const [isUserLogin, setIsUserLogin] = useState(false);
  const [isOpenSearchbar, setIsOpenSearchbar] = useState(false);
  const [isOpenCart, setIsOpenCart] = useState(false);

  const closeCart = () => setIsOpenCart(false);
  const closeSearchbar = () => setIsOpenSearchbar(false);

  useEffect(() => {
    if (localStorage.user) setIsUserLogin(true);
  }, []);

  return (
    <header className="bg-gradient-to-r from-[#89F336] to-[#7DE332] shadow-md sticky top-0 z-10">
      {/* Top section */}
      <div className="max-w-full px-2 sm:px-4 py-2 sm:py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center font-bold text-black hover:scale-105 transition-transform"
        >
          <Image
            src="/logo.png"
            width={40}
            height={40}
            alt="Logo"
            className="object-contain"
          />
          <span className="ml-1 sm:ml-2 text-base sm:text-xl truncate max-w-[100px] sm:max-w-none">
            SyntaxSwag
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-10">
          {["outfits", "deskwares", "stickers"].map((item) => (
            <Link
              key={item}
              href={`/${item}`}
              className="text-black text-sm sm:text-base font-medium relative group"
            >
              <span className="group-hover:text-gray-700 transition-colors">
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </span>
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}
        </nav>

        {/* Right Icons */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Cart */}
          <FaCartShopping
            className="text-lg sm:text-xl text-black cursor-pointer hover:text-gray-700 transition-colors"
            onClick={() => setIsOpenCart(!isOpenCart)}
          />

          {/* Search */}
          <IoIosSearch
            className="text-lg sm:text-xl text-black cursor-pointer hover:text-gray-700 transition-colors"
            onClick={() => setIsOpenSearchbar(true)}
          />

          {/* Login / Profile */}
          {isUserLogin ? (
            <FaUserCircle className="text-xl sm:text-2xl text-black cursor-pointer hover:text-gray-700" />
          ) : (
            <Link
              href={"/register/login"}
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-2 bg-black text-white rounded-full text-sm sm:text-base hover:bg-gray-800 transition-all"
            >
              <span className="hidden sm:inline">Login</span>
              <IoIosLogIn className="text-md sm:text-lg" />
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Nav */}
      <nav className="md:hidden flex justify-center gap-3 sm:gap-6 py-2 px-2 sm:px-4 text-sm sm:text-base">
        {["outfits", "deskwares", "stickers"].map((item) => (
          <Link
            key={item}
            href={`/${item}`}
            className="text-black font-medium hover:text-gray-700 transition-colors"
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </Link>
        ))}
      </nav>

      {/* Sidebars */}
      {isOpenCart && <CartSidebar close={closeCart} />}
      {isOpenSearchbar && <SearchBar close={closeSearchbar} />}
    </header>
  );
}
