"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import AppHeader from "@/components/layout/AppHeader";
import AppSidebar from "@/components/layout/AppSidebar";

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
      <AppSidebar menuItems={menuItems} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AppHeader onOpenCommandBar={() => setIsCommandBarOpen(true)} />

        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}