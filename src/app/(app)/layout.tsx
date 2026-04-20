"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [isAIPanelOpen, setIsAIPanelOpen] = useState(false);
  const [isCommandBarOpen, setIsCommandBarOpen] = useState(false);

  const menuItems = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/inventory", label: "Inventory" },
    { path: "/wareview", label: "WareView" },
    { path: "/inbound-orders", label: "Inbound Orders" },
    { path: "/outbound-orders", label: "Outbound Orders" },
    { path: "/reports", label: "Reports" },
    { path: "/materials", label: "Materials" },
    { path: "/customers", label: "Customers" },
    { path: "/settings", label: "Settings" },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsCommandBarOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const isActive = (path: string) => pathname.startsWith(path);

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b">
          <img src="/branding/logo/logo.svg" alt="OraxAI" className="h-8" />
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm ${
                isActive(item.path)
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <div className="h-16 bg-white border-b flex items-center justify-between px-8">
          <button
            onClick={() => setIsCommandBarOpen(true)}
            className="text-sm text-gray-500"
          >
            Search (⌘K)
          </button>

          <div className="flex items-center gap-4">
            <div className="text-sm">
              <p className="font-medium text-gray-900">Ahmet Yılmaz</p>
              <p className="text-xs text-gray-500">Avixa</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto bg-gray-50">
          {children}
        </div>
      </div>

      {/* (Optional) Panels later */}
      {/* AI Panel / Command Bar can be added back here */}
    </div>
  );
}