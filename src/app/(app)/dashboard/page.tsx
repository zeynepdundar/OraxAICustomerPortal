"use client";

import { MetricCard } from "@/components/metrics/MetricCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  Package,
  ArrowDownToLine,
  ArrowUpFromLine,
  TrendingUp,
} from "lucide-react";


export default function DashboardPage() {
  const kpiCards = [
    {
      title: 'dashboard.totalStock',
      value: 66,
      icon: Package,
      variant: "blue",
    },
    {
      title:'dashboard.inboundToday',
      value: 78,
      icon: ArrowDownToLine,
      variant: "green",
    },
    {
      title: 'dashboard.outboundToday',
      value:78,
      icon: ArrowUpFromLine,
      variant: "orange",
    },
    {
      title: 'dashboard.pendingOrders',
      value: 90,
      icon: TrendingUp,
      variant: "purple",
    },
  ] as const;


  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "In Transit":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };


  return (
    <div className="p-8 space-y-6">
      <SectionHeader
        title="Dashboard"
        description="Overview of your warehouse operations"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi) => (
          <MetricCard key={kpi.title} {...kpi} />
        ))}
      </div>

    </div>
  );
}