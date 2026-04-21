"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { InventoryItem, mockKPIInventory, mockInventory } from "@/data/mockData";
import { DataTable } from "@/components/ui/DataTable";
import { Badge } from "@/components/ui/Badge";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useTranslations } from "next-intl";
import { AlertTriangle, Box, Package, TrendingDown, TrendingUp } from "lucide-react";
import { MetricCard } from "@/components/ui/MetricCard";
import { AskAIButton } from "@/components/ui/AskAIButton";


type SortField =
  | "palletNo"
  | "materialName"
  | "currentQuantity"
  | "expiryDate";

type SortDirection = "asc" | "desc";

function getSortIndicator(
  activeField: SortField,
  sortField: SortField,
  direction: SortDirection
) {
  if (activeField !== sortField) return "";
  return direction === "asc" ? " ▲" : " ▼";
}
export type TransactionType = "Inbound" | "Outbound";
export type StatusType = "Completed" | "In Transit" | "Delivered";
export type InventoryStatusType = "Salable" | "Reserved" | "Quarantine" | "Damaged";

function getInventoryStatusTone(status: InventoryItem["status"]) {
  if (status === "salable") return "green";
  if (status === "reserved") return "blue";
  if (status === "quarantine") return "orange";
  return "red";
}


export default function InventoryPage() {
  const router = useRouter();
  const t = useTranslations("inventory");



  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortField, setSortField] = useState<SortField>("materialName");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  // Mock data (derived from shared material list)
  const inventoryData: InventoryItem[] = mockInventory.map((material, index) => {


    return {
      id: material.id,
      palletNo: `P${String(index + 740).padStart(8, "0")}`,
      status: material.status,
      sku: material.sku,
      materialName: material.materialName,
      lot: material.lot,
      originalQuantity: material.originalQuantity,
      currentQuantity: material.currentQuantity,
      location: `10R03${String(index + 203).padStart(3, "0")}`,
      expiryDate: material.expiryDate ? "2027-12-31" : "2035-12-31",
      customer: "Selcuk Ecza Deposu",
    };
  });

  // Filtering + Sorting
  const data = useMemo(() => {
    const filtered = inventoryData.filter((item) => {
      const matchSearch =
        item.materialName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.lot.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus =
        statusFilter === "all" || item.status === statusFilter;

      return matchSearch && matchStatus;
    });

    return filtered.sort((a, b) => {
      let aVal: any = a[sortField];
      let bVal: any = b[sortField];

      if (sortField === "expiryDate") {
        aVal = new Date(a.expiryDate).getTime();
        bVal = new Date(b.expiryDate).getTime();
      }

      if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [searchQuery, statusFilter, sortField, sortDirection]);

  // Handlers
  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const goToWareview = () => {
    router.push("/wareview");
  };

  const kpiInventoryCards = [
    {
      title: t("totalStock"),
      value: mockKPIInventory.totalStock,
      icon: Package,
      variant: "blue",
    },
    {
      title: t("totalPallets"),
      value: mockKPIInventory.salableStock,
      icon: Box,
      variant: "purple",
    },
    {
      title: t("salableStock"),
      value: mockKPIInventory.reservedStock,
      icon: TrendingUp,
      variant: "green",
    },
    {
      title: t("reservedStock"),
      value: mockKPIInventory.reservedStock,
      icon: TrendingDown,
      variant: "blue",
    },
    {
      title: t("expiringSoonStock"),
      value: mockKPIInventory.quarantineStock,
      icon: AlertTriangle,
      variant: "yellow",
    },
  ] as const;

  return (
    <div className="p-8 space-y-6">
      <SectionHeader
        title={t("title")}
        description={t("description")}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">        
        {kpiInventoryCards.map((kpi) => (
        <MetricCard
          key={kpi.title}
          {...kpi}
          action={<AskAIButton context={"fbdf"} />}
        />
      ))}
      </div>
      {/* Filters */}
      <div className="bg-white border rounded-xl p-4 space-y-4">
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search material or lot..."
          className="w-full px-4 py-2 border rounded-lg text-sm"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-3 py-2 rounded-lg text-sm"
        >
          <option value="all">All Status</option>
          <option value="salable">Salable</option>
          <option value="reserved">Reserved</option>
          <option value="quarantine">Quarantine</option>
          <option value="damaged">Damaged</option>
        </select>
      </div>

      <DataTable
        data={data}
        emptyMessage="No results found"
        columns={[
          {
            key: "palletNo",
            header: (
              <button
                onClick={() => handleSort("palletNo")}
                className="cursor-pointer"
              >
                {`Pallet${getSortIndicator("palletNo", sortField, sortDirection)}`}
              </button>
            ),
            render: (row) => <span className="font-mono">{row.palletNo}</span>,
          },
          {
            key: "status",
            header: "Status",
            render: (row) => (
              <Badge tone={getInventoryStatusTone(row.status)} className="capitalize">
                {row.status}
              </Badge>
            ),
          },
          {
            key: "sku",
            header: "Sku",
            render: (row) => <span className="capitalize">{row.sku}</span>,
          },
          {
            key: "materialName",
            header: (
              <button
                onClick={() => handleSort("materialName")}
                className="cursor-pointer"
              >
                {`Material${getSortIndicator("materialName", sortField, sortDirection)}`}
              </button>
            ),
          },
          {
            key: "lot",
            header: "Lot",
            render: (row) => <span >{row.lot}</span>,
          },
          {
            key: "originalQuantity",
            header: "Original",
            render: (row) => <span >{row.originalQuantity}</span>,
          },
          {
            key: "currentQuantity",
            header: (
              <button
                onClick={() => handleSort("currentQuantity")}
                className="cursor-pointer"
              >
                {`Quantity${getSortIndicator("currentQuantity", sortField, sortDirection)}`}
              </button>
            ),
            className: "text-right",
            render: (row) => (
              <span className="font-semibold">{row.currentQuantity}</span>
            ),
          },
          {
            key: "actions",
            header: <span className="w-full inline-block text-right">Actions</span>,
            className: "text-right",
            render: () => (
              <div className="flex justify-end gap-2">
                <button className="px-2 py-1 text-xs border rounded hover:bg-gray-100">
                  View
                </button>
                <button
                  onClick={goToWareview}
                  className="px-2 py-1 text-xs border rounded hover:bg-blue-100 text-blue-600"
                >
                  WareView
                </button>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}