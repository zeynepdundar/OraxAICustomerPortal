"use client";

import { useRouter, usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight, PanelLeftClose, PanelLeftIcon, PanelLeftOpen, PanelRightIcon } from "lucide-react";

type MenuItem = {
  path: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export default function AppSidebar({
  menuItems,
  isOpen,
  onToggle,
}: {
  menuItems: MenuItem[];
  isOpen: boolean;
  onToggle: () => void;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => pathname.startsWith(path);

  return (
    <div
      className={`${isOpen ? "w-64" : "w-16"} bg-white flex flex-col shadow-[1px_0_0_0_#f0f2f5] transition-all duration-300 ease-in-out shrink-0`}
    >
      {/* Logo + Toggle */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100">
        {isOpen && (
          <img
            src="/branding/logo/logo.svg"
            alt="OraxAI"
            className="h-6"
          />
        )}
        <button
          onClick={onToggle}
          className={`${isOpen ? "" : "mx-auto"} w-8 h-8 flex items-center justify-center rounded-lg text-gray-900 hover:bg-gray-100 hover:text-gray-700 transition-colors`}
        >
          {isOpen ? (
            <PanelLeftIcon className="w-4 h-4" />
          ) : (
            <PanelRightIcon className="w-4 h-4" />
          )}        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-3 space-y-0.5 text-gray-900">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              title={!isOpen ? item.label : undefined}
              className={`w-full flex items-center gap-3 px-2.5 py-2.5 rounded-lg text-sm transition-all ${isOpen ? "justify-start" : "justify-center"
                } ${active
                  ? "bg-brand-50 text-brand-700 font-medium"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {isOpen && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
