"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sessionStorage.setItem("isLoggedIn", "true");
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left — image panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <Image
          src="/depo-koridor.jpg"
          alt="Warehouse corridor"
          fill
          className="object-cover"
          priority
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/20" />

        {/* Brand overlay */}
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <div>
            <img
              src="/branding/logo/logo.svg"
              alt="OraxAI"
              className="h-10 brightness-0 invert"
            />
          </div>
          <div>
            <p className="text-white/60 text-sm uppercase tracking-widest font-medium mb-3">
              Warehouse Intelligence
            </p>
            <h2 className="text-white text-4xl font-light leading-snug">
              Smart logistics,<br />
              <span className="font-semibold">effortless control.</span>
            </h2>
          </div>
        </div>
      </div>

      {/* Right — form panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white px-8 py-12">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="flex justify-center mb-10 lg:hidden">
            <img
              src="/branding/logo/logo.svg"
              alt="OraxAI"
              className="h-10"
            />
          </div>

          {/* Heading */}
          <div className="mb-10">
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              Welcome back
            </h1>
            <p className="text-gray-500 text-sm">
              Sign in to your customer portal
            </p>
          </div>

          {/* Demo badge */}
          <div className="mb-8 px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
            <p className="text-xs text-gray-500">
              Demo mode — use any email and password
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-[#458bc9] focus:ring-1 focus:ring-[#458bc9] transition"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-[#458bc9] focus:ring-1 focus:ring-[#458bc9] transition"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                className="text-xs text-gray-400 transition"
                onMouseEnter={(e) => (e.currentTarget.style.color = "#458bc9")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "")}
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full text-white font-medium text-sm rounded-lg h-11 transition-colors"
              style={{ backgroundColor: "#458bc9" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#3a7ab5")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#458bc9")}
            >
              Sign in
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-xs text-gray-400 mt-10">
            © {new Date().getFullYear()} OraxAI. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
