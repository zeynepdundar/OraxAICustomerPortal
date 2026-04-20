"use client";

export default function AppHeader({
  onOpenCommandBar,
}: {
  onOpenCommandBar: () => void;
}) {
  return (
    <div className="h-16 bg-white border-b flex items-center justify-between px-8">
      {/* Search */}
      <button
        onClick={onOpenCommandBar}
        className="text-sm text-gray-500"
      >
        Search (⌘K)
      </button>

      {/* User */}
      <div className="flex items-center gap-4">
        <div className="text-sm">
          <p className="font-medium text-gray-900">Ahmet Yılmaz</p>
          <p className="text-xs text-gray-500">Avixa</p>
        </div>
      </div>
    </div>
  );
}