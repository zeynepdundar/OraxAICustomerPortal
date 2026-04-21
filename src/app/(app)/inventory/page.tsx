"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

// Types
interface InventoryItem {
  id: string;
  palletNo: string;
  status: "salable" | "reserved" | "quarantine" | "damaged";
  sku: string;
  materialName: string;
  lot: string;
  originalQuantity: number;
  currentQuantity: number;
  location: string;
  expiryDate: string;
  customer: string;
}

type SortField =
  | "palletNo"
  | "materialName"
  | "currentQuantity"
  | "expiryDate";

type SortDirection = "asc" | "desc";

export default function InventoryPage() {
  const router = useRouter();

  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortField, setSortField] = useState<SortField>("materialName");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  // Mock data
  const inventoryData: InventoryItem[] = [
    {
      id: "1",
      palletNo: "P00000740",
      status: "salable",
      sku: "1201-11026",
      materialName: "EVOLVIA NUTRIPIRO PLUS 3 800 GR",
      lot: "945000049",
      originalQuantity: 237,
      currentQuantity: 237,
      location: "10R03203",
      expiryDate: "2029-12-30",
      customer: "Selcuk Ecza Deposu",
    },
    {
      id: "2",
      palletNo: "P00000850",
      status: "reserved",
      sku: "1201-11027",
      materialName: "PAROL 500MG TABLET",
      lot: "945000050",
      originalQuantity: 500,
      currentQuantity: 350,
      location: "10R03204",
      expiryDate: "2026-08-15",
      customer: "Avixa A.Ş.",
    },
  ];

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

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Inventory
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage warehouse stock and pallets
        </p>
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

      {/* Table */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th
                onClick={() => handleSort("palletNo")}
                className="px-4 py-3 text-left cursor-pointer"
              >
                Pallet
              </th>
              <th className="px-4 py-3 text-left">Status</th>
              <th
                onClick={() => handleSort("materialName")}
                className="px-4 py-3 text-left cursor-pointer"
              >
                Material
              </th>
              <th
                onClick={() => handleSort("currentQuantity")}
                className="px-4 py-3 text-right cursor-pointer"
              >
                Quantity
              </th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-mono">
                  {item.palletNo}
                </td>

                <td className="px-4 py-3 capitalize">
                  {item.status}
                </td>

                <td className="px-4 py-3">
                  {item.materialName}
                </td>

                <td className="px-4 py-3 text-right font-semibold">
                  {item.currentQuantity}
                </td>

                <td className="px-4 py-3 text-right">
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
                </td>
              </tr>
            ))}

            {data.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-10 text-gray-500"
                >
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}