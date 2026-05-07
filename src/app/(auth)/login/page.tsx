"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.SyntheticEvent) => {
    e.preventDefault();
    sessionStorage.setItem("isLoggedIn", "true");
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex">
      {/* ── Left — image panel ── */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <Image
          src="/depo-koridor.jpg"
          alt="Warehouse corridor"
          fill
          className="object-cover"
          priority
        />

        {/* Lighter, brand-tinted overlay — image breathes more at top */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-brand-900/30 to-brand-900/60" />

        {/* Right-edge fade — transitions into form panel */}
        <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-r from-transparent to-brand-950/25" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-end p-12 w-full">
          <div>
            <p className="text-white/50 text-xs uppercase tracking-widest font-medium mb-3">
              Warehouse Intelligence
            </p>
            <h2 className="text-white text-4xl font-light leading-snug">
              Smart logistics,<br />
              <span className="font-semibold">effortless control.</span>
            </h2>
          </div>
        </div>
      </div>

      {/* ── Right — form panel ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gradient-to-br from-brand-50/50 via-slate-50 to-white px-8 py-12">
        <div className="w-full max-w-sm">

          {/* Logo */}
          <div className="mb-10">
            <img src="/branding/logo/logo.svg" alt="OraxAI" className="h-9" />
          </div>

          {/* Heading */}
          <div className="mb-10">
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              Customer Portal
            </h1>
            <p className="text-gray-500 text-sm">
              Sign in to access your account
            </p>
          </div>

          {/* Demo badge */}
          <div className="mb-8 px-4 py-3 rounded-lg border border-brand-100 bg-brand-50/60 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-success-500 shrink-0" />
            <p className="text-xs text-brand-700">
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
                className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
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
                className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                className="text-xs text-gray-400 hover:text-brand-500 transition-colors"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-brand-500 hover:bg-brand-600 active:bg-brand-700 text-white font-medium text-sm rounded-lg h-11 transition-colors shadow-sm"
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
