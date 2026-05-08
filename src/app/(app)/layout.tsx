"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import AppHeader from "@/components/layout/AppHeader";
import AppSidebar from "@/components/layout/AppSidebar";

import {
  LayoutDashboard,
  Boxes,
  Eye,
  ArrowDownToLine,
  ArrowUpFromLine,
  BarChart3,
  Package,
  Users,
  Settings,
} from "lucide-react";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const t = useTranslations("navigation");

  const [, setIsCommandBarOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("isLoggedIn") !== "true") {
      router.replace("/login");
    }
  }, [router]);

const menuItems = [
  { path: "/dashboard", label: t("dashboard"), icon: LayoutDashboard },
  { path: "/inventory", label: t("inventory"), icon: Boxes },
  { path: "/wareview", label: t("wareview"), icon: Eye },
  { path: "/inbound-orders", label: t("inboundOrders"), icon: ArrowDownToLine },
  { path: "/outbound-orders", label: t("outboundOrders"), icon: ArrowUpFromLine },
  { path: "/reports", label: t("reports"), icon: BarChart3 },
  { path: "/materials", label: t("materials"), icon: Package },
  { path: "/customers", label: t("customers"), icon: Users },
  //{ path: "/settings", label: t("settings"), icon: Settings },
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

  return (
    <div className="flex h-screen bg-gray-50">
      <AppSidebar menuItems={menuItems} isOpen={sidebarOpen} onToggle={() => setSidebarOpen((v) => !v)} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AppHeader onOpenCommandBar={() => setIsCommandBarOpen(true)} />

        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}