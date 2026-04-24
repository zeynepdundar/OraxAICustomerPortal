"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { InventoryItem, mockKPIInventory, mockInventory } from "@/data/mockData";
import { DataTable } from "@/components/ui/DataTable";
import { Badge } from "@/components/ui/Badge";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useTranslations } from "next-intl";
import { AlertTriangle, Box, Download, Package, Search, TrendingDown, TrendingUp } from "lucide-react";
import { MetricCard } from "@/components/ui/MetricCard";
import { AskAIButton } from "@/components/ui/AskAIButton";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";


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
  const commonT = useTranslations("common");



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

  const exportToExcel = () => {
    // const worksheet = XLSX.utils.json_to_sheet(mockCustomers);
     //const workbook = XLSX.utils.book_new();
     //XLSX.utils.book_append_sheet(workbook, worksheet, 'Outbound');
     //XLSX.writeFile(workbook, 'outbound.xlsx');
   };

  return (
    <div className="p-8 space-y-6">
      <SectionHeader
        title={t("title")}
        description={t("description")}
        actions={[
          {
            label: commonT("export"),
            variant: "secondary",
            icon: <Download className="w-4 h-4 mr-2" />,
            onClick: exportToExcel,
          }]}
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
      <Card className="p-5">
        <div className="space-y-5">
          {/* SEARCH */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              {commonT("search")}
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("search")}
                className="pl-10"
              />
            </div>
          </div>

          {/* FILTERS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">

            {/* Pallet */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                {t("filterPalletNo")}
              </label>
              <Input
                value={""}
                onChange={(e) => { }}
                placeholder={t("enterPalletNo")}
              />
            </div>

            {/* SKU */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                {t("filterSku")}
              </label>
              <Input
                value={""}
                onChange={(e) => { }}
                placeholder={t("enterSku")}
              />
            </div>

            {/* Lot */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                {t("filterLot")}
              </label>
              <Input
                value={"lotFilter"}
                onChange={(e) => { }}
                placeholder={t("enterLot")}
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                {t("filterStatus")}
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full h-10 px-3 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">{t("allStatus")}</option>
                <option value="salable">{t("salable")}</option>
                <option value="reserved">{t("reserved")}</option>
                <option value="quarantine">{t("quarantine")}</option>
                <option value="damaged">{t("damaged")}</option>
              </select>
            </div>

            {/* BUTTON */}
            <div className="flex items-end">
              <Button className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white">
                {commonT("filter")}
              </Button>
            </div>

          </div>
        </div>
      </Card>


      <DataTable
        data={data}
        emptyMessage={t("noResults")}
        columns={[
          {
            key: "palletNo",
            header: (
              <button
                onClick={() => handleSort("palletNo")}
                className="cursor-pointer"
              >
                {`${t("columns.pallet")}${getSortIndicator("palletNo", sortField, sortDirection)}`}
              </button>
            ),
            render: (row) => <span className="font-mono">{row.palletNo}</span>,
          },
          {
            key: "status",
            header: t("columns.status"),
            render: (row) => (
              <Badge tone={getInventoryStatusTone(row.status)} className="capitalize">
                {t(`status.${row.status}`)}
              </Badge>
            ),
          },
          {
            key: "sku",
            header: t("columns.sku"),
            render: (row) => <span className="capitalize">{row.sku}</span>,
          },
          {
            key: "materialName",
            header: (
              <button
                onClick={() => handleSort("materialName")}
                className="cursor-pointer"
              >
                {`${t("columns.material")}${getSortIndicator("materialName", sortField, sortDirection)}`}
              </button>
            ),
          },
          {
            key: "lot",
            header: t("columns.lot"),
            render: (row) => <span >{row.lot}</span>,
          },
          {
            key: "originalQuantity",
            header: t("columns.original"),
            render: (row) => <span >{row.originalQuantity}</span>,
          },
          {
            key: "currentQuantity",
            header: (
              <button
                onClick={() => handleSort("currentQuantity")}
                className="cursor-pointer"
              >
                {`${t("columns.quantity")}${getSortIndicator("currentQuantity", sortField, sortDirection)}`}
              </button>
            ),
            className: "text-right",
            render: (row) => (
              <span className="font-semibold">{row.currentQuantity}</span>
            ),
          },
          {
            key: "actions",
            header: <span className="w-full inline-block text-right">{commonT("actions")}</span>,
            className: "text-right",
            render: () => (
              <div className="flex justify-end gap-2">
                <button className="px-2 py-1 text-xs border rounded hover:bg-gray-100">
                  {commonT("view")}
                </button>
                <button
                  onClick={goToWareview}
                  className="px-2 py-1 text-xs border rounded hover:bg-blue-100 text-blue-600"
                >
                  {t("wareview")}
                </button>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}