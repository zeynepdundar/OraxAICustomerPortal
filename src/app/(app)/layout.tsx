"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import AppHeader from "@/components/layout/AppHeader";
import AppSidebar from "@/components/layout/AppSidebar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations("navigation");

  const [, setIsCommandBarOpen] = useState(false);

  const menuItems = [
    { path: "/dashboard", label: t("dashboard") },
    { path: "/inventory", label: t("inventory") },
    { path: "/wareview", label: t("wareview") },
    { path: "/inbound-orders", label: t("inboundOrders") },
    { path: "/outbound-orders", label: t("outboundOrders") },
    { path: "/reports", label: t("reports") },
    { path: "/materials", label: t("materials") },
    { path: "/customers", label: t("customers") },
    { path: "/settings", label: t("settings") },
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