"use client";

import { Search } from "lucide-react";
import { useTranslations } from "next-intl";

export default function AppHeader({
  onOpenCommandBar,
}: {
  onOpenCommandBar: () => void;
}) {
  const t = useTranslations("header");

  return (
    <div className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8">
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
      <div className="flex items-center gap-3">
        <div className="text-sm text-right">
          <p className="font-medium text-gray-900">Ahmet Yılmaz</p>
          <p className="text-xs text-gray-400">Avixa</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm font-semibold select-none">
          A
        </div>
      </div>
    </div>
  );
}