"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AiOutlineEye as Eye,
  AiOutlineEyeInvisible as EyeOff,
  AiOutlineUser as User,
  AiOutlineMail as Mail,
  AiOutlineLock as Lock,
  AiOutlinePhone as Phone,
  AiOutlineArrowRight as ArrowRight,
  AiOutlineCheckCircle as CheckCircle,
} from "react-icons/ai";

export default function SignUpPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validForm = () => {
    const { firstName, lastName, email, phone, password, confirmPassword } =
      formData;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !password ||
      !confirmPassword
    ) {
      toast.error("All fields are required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Email is invalid");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validForm()) return;

    setIsSubmitting(true);
    localStorage.setItem("user", JSON.stringify(formData));
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Account created successfully!");
      router.push("/register/login");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'url("reg-form-BG.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20"
          style={{ backgroundColor: "#89F336" }}
        ></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-10"
          style={{ backgroundColor: "#89F336" }}
        ></div>
        <div
          className="absolute top-1/4 -left-20 w-40 h-40 rounded-full opacity-15"
          style={{ backgroundColor: "#89F336" }}
        ></div>
      </div>

      <div className="relative  flex items-center justify-center min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md sm:max-w-lg">
          <div className="backdrop-blur-xl bg-white/95 rounded-3xl shadow-2xl border border-white/20 p-8 sm:p-10 transform transition-all duration-500 hover:scale-[1.02]">
            <div className="text-center mb-8">
              <div
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 transform transition-transform hover:rotate-12"
                style={{ backgroundColor: "#89F336" }}
              >
                <User className="w-8 h-8 text-black" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-black mb-2">
                Join Us Today
              </h1>
              <p className="text-gray-600 text-base sm:text-lg">
                Create your account and get started
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-4 focus:ring-black focus:ring-opacity-30"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-4 focus:ring-black focus:ring-opacity-30"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Email Address
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
                  Phone Number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pl-12 rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-4 focus:ring-black focus:ring-opacity-30"
                    placeholder="Enter your phone number"
                  />
                  <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
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
                    placeholder="Create a password"
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

              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pl-12 pr-12 rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-4 focus:ring-black focus:ring-opacity-30"
                    placeholder="Confirm your password"
                  />
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
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
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/register/login"
                  className="font-semibold text-black hover:underline"
                >
                  Sign in here
                </Link>
              </p>
            </div>

            <div className="mt-8 text-center">
              <div className="flex items-center justify-center space-x-6 text-black">
                <div className="flex items-center space-x-2">
                  <CheckCircle
                    className="w-5 h-5 text-bold"
                    style={{ color: "#008000" }}
                  />
                  <span className="text-sm">Secure Registration</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle
                    className="w-5 h-5 text-bold"
                    style={{ color: "#008000" }}
                  />
                  <span className="text-sm">Instant Access</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
