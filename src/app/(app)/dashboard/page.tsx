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


export default function DashboardPage() {
  const t = useTranslations("dashboard");

  const kpiCards = [
    {
      title: t("totalStock"),
      value: 66,
      icon: Package,
      variant: "blue",
    },
    {
      title: t("inboundToday"),
      value: 78,
      icon: ArrowDownToLine,
      variant: "green",
    },
    {
      title: t("outboundToday"),
      value: 78,
      icon: ArrowUpFromLine,
      variant: "orange",
    },
    {
      title: t("pendingOrders"),
      value: 90,
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

    </div>
  );
}