"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  AiOutlineEye as Eye,
  AiOutlineEyeInvisible as EyeOff,
  AiOutlineMail as Mail,
  AiOutlineLock as Lock,
  AiOutlineLogin as LoginIcon,
} from "react-icons/ai";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (
      !storedUser ||
      formData.email !== storedUser.email ||
      formData.password !== storedUser.password
    ) {
      toast.error("Invalid email or password");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      toast.success("Login successful!");
      router.push("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'url("/reg-form-BG.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="relative flex items-center justify-center min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md sm:max-w-lg">
          <div className="backdrop-blur-xl bg-white/95 rounded-3xl shadow-2xl border border-white/20 p-8 sm:p-10 transform transition-all duration-500 hover:scale-[1.02]">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 bg-lime-400">
                <LoginIcon className="w-8 h-8 text-black" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-black mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-600 text-base sm:text-lg">
                Login to your account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pl-12 rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-4 focus:ring-black focus:ring-opacity-30"
                    placeholder="Enter your email"
                  />
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pl-12 pr-12 rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-4 focus:ring-black focus:ring-opacity-30"
                    placeholder="Enter your password"
                  />
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-xl font-bold text-lg text-black bg-lime-400 hover:scale-105 transition-transform duration-300 flex items-center justify-center space-x-2 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    <span>Logging in...</span>
                  </>
                ) : (
                  <>
                    <span>Login</span>
                    <LoginIcon className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center text-gray-600">
              Don’t have an account?{" "}
              <Link
                href="/register/signup"
                className="font-semibold text-black hover:underline"
              >
                Sign up here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
