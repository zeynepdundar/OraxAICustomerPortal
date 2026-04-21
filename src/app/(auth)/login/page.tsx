"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <img
                src="/branding/logo/logo.svg"
                alt="OraxAI Logo"
                className="h-16"
              />
            </div>

            <h1 className="text-3xl font-bold text-blue-900 mb-2">
              Sign in
            </h1>
            <h2 className="text-xl text-gray-700 mb-1">
              Customer Portal
            </h2>
            <p className="text-sm text-gray-500">
              Access your warehouse dashboard
            </p>
          </div>

          {/* Demo Notice */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800 font-medium mb-1">
              Demo Access
            </p>
            <p className="text-sm text-blue-700">
              Use any email and password to continue
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />

            {/* Forgot */}
            <div className="text-right">
              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Forgot password?
              </button>
            </div>

            <Button type="submit" className="w-full h-11">
              Sign in
            </Button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          © {new Date().getFullYear()} OraxAI. Tüm hakları saklıdır.
        </p>
      </div>
    </div>
  );
}