"use client";

import { useRouter, usePathname } from "next/navigation";

type MenuItem = {
  path: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export default function AppSidebar({
  menuItems,
}: {
  menuItems: MenuItem[];
}) {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => pathname.startsWith(path);


  return (
    <div className="w-64 bg-white flex flex-col shadow-[1px_0_0_0_#f0f2f5]">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-gray-100">
        <img
          src="/branding/logo/logo.svg"
          alt="OraxAI"
          className="h-8"
        />
      </div>

      {/* Menu */}
      <nav className="flex-1 p-3 space-y-0.5">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all ${isActive(item.path)
                  ? "bg-brand-50 text-brand-700 font-medium"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}