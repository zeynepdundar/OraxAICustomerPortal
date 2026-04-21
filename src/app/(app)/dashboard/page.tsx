"use client";

import { MetricCard } from "@/components/metrics/MetricCard";
import { SectionHeader } from "@/components/ui/SectionHeader";


export default function DashboardPage() {
  const kpiCards = [
    {
      title: 'dashboard.totalStock',
      value: 5,

      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      aiContext: 'total_stock_overview',
    },
    {
      title: 'dashboard.inboundToday',
      value: 5,

      color: 'text-green-600',
      bgColor: 'bg-green-50',
      aiContext: 'todays_inbound_orders',
    },
    {
      title: 'dashboard.outboundToday',
      value: 5,

      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      aiContext: 'todays_outbound_orders',
    },
    {
      title: 'dashboard.pendingOrders',
      value: 4,

      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      aiContext: 'pending_orders_status',
    },
  ];


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