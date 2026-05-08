"use client";

import { useState } from "react";
import { Search, User, Settings, LogOut } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function AppHeader({
  onOpenCommandBar,
}: {
  onOpenCommandBar: () => void;
}) {
  const t = useTranslations("header");
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem("isLoggedIn");
    router.push("/login");
  };

  return (
    <div className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 relative">
      
      {/* Search */}
      <button
        onClick={onOpenCommandBar}
        className="flex items-center gap-2 h-9 px-4 text-sm text-gray-400 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <Search className="w-4 h-4" />
        <span>{t("searchCommand")}</span>
        <kbd className="ml-1 text-xs bg-white border border-gray-200 rounded px-1.5 py-0.5 font-mono text-gray-400">
          ⌘K
        </kbd>
      </button>

      {/* User */}
      <div className="relative">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-3 hover:bg-gray-50 px-2 py-1 rounded-lg transition"
        >
          <div className="text-sm text-right">
            <p className="font-medium text-gray-900">Ahmet Yılmaz</p>
            <p className="text-xs text-gray-400">Avixa</p>
          </div>

          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm font-semibold select-none">
            A
          </div>
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-lg shadow-lg overflow-hidden z-50">
            
            <button
              onClick={() => {
                setOpen(false);
                router.push("/profile");
              }}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              <User className="w-4 h-4" />
              Profile
            </button>

            <button
              onClick={() => {
                setOpen(false);
                router.push("/settings");
              }}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              <Settings className="w-4 h-4" />
              Settings
            </button>

            <div className="border-t border-gray-100" />

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}