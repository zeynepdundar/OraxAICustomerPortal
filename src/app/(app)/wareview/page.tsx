"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { Construction } from "lucide-react";

export default function WareViewPage() {

  return (
    <div className="p-8 space-y-6">
      <SectionHeader
        title="WareView"
        description="3D warehouse visualization"
      />

      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-warning-50 flex items-center justify-center mb-5">
          <Construction className="w-8 h-8 text-warning-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Under Development
        </h3>
        <p className="text-sm text-gray-500 max-w-sm">
          WareView is currently being built. Real-time 3D warehouse visualization will be available here soon.
        </p>
        <span className="mt-5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-warning-50 text-warning-700 text-xs font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-warning-500 animate-pulse" />
          Coming soon
        </span>
      </div>
    </div>
  );
}
