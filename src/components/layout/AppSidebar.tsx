"use client";

import { useRouter, usePathname } from "next/navigation";

type MenuItem = {
  path: string;
  label: string;
};

export default function AppSidebar({
  menuItems,
}: {
  menuItems: MenuItem[];
}) {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => pathname.startsWith(path);

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b">
        <img
          src="/branding/logo/logo.svg"
          alt="OraxAI"
          className="h-8"
        />
      </div>

      {/* Menu */}
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

      {/* Logout */}
      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
}