"use client";

import { MetricCard } from "@/components/metrics/MetricCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useTranslations } from "next-intl";
import {
  Package,
  ArrowDownToLine,
  ArrowUpFromLine,
  TrendingUp,
} from "lucide-react";
import { DataTable } from "@/components/ui/DataTable";
import { Badge } from "@/components/ui/Badge";
import { mockKPIs, recentTransactions } from "@/data/mockData";

type Transaction = (typeof recentTransactions)[number];

function getStatusClass(status: Transaction["status"]) {
  if (status === "Completed") return "green";
  if (status === "In Transit") return "orange";
  return "blue";
}

function getTypeTone(type: Transaction["type"]) {
  if (type === "Inbound") return "green";
  return "orange";
}

export default function DashboardPage() {
  const t = useTranslations("dashboard");

  const kpiCards = [
    {
      title: t("totalStock"),
      value: mockKPIs.totalStock,
      icon: Package,
      variant: "blue",
    },
    {
      title: t("inboundToday"),
      value: mockKPIs.inboundToday,
      icon: ArrowDownToLine,
      variant: "green",
    },
    {
      title: t("outboundToday"),
      value: mockKPIs.outboundToday,
      icon: ArrowUpFromLine,
      variant: "orange",
    },
    {
      title: t("pendingOrders"),
      value: mockKPIs.pendingOrders,
      icon: TrendingUp,
      variant: "purple",
    },
  ] as const;

  return (
    <div className="p-8 space-y-6">
      <SectionHeader
        title={t("title")}
        description={t("description")}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi) => (
          <MetricCard key={kpi.title} {...kpi} />
        ))}
      </div>

      <DataTable
        data={recentTransactions}
        columns={[
          {
            key: "date",
            header: "Date",
          },
          {
            key: "type",
            header: "Type",
            render: (row: Transaction) => (
              <Badge tone={getTypeTone(row.type)} variant="outline">
                {row.type}
              </Badge>
            ),
          },
          {
            key: "customer",
            header: "Customer",
          },
          {
            key: "quantity",
            header: "Quantity",
            className: "text-gray-600",
          },
          {
            key: "status",
            header: "Status",
            render: (row: Transaction) => (
              <Badge tone={getStatusClass(row.status)}>
                {row.status}
              </Badge>
            ),
          },
          {
            key: "actions",
            header: "Actions",
            render: () => (
              <div className="flex justify-end">
                <button className="text-sm text-gray-600 hover:text-black">
                  View
                </button>
              </div>
            ),
            className: "text-right",
          },
        ]}
      />
    </div>
  );
}