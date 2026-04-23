"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { DataTable } from "@/components/ui/DataTable";
import { SectionHeader } from "@/components/ui/SectionHeader";

type Material = {
  id: string;
  sku: string;
  materialName: string;
  itsTracking: boolean;
};

const mockMaterials: Material[] = [
  { id: "1", sku: "1405-009", materialName: "BT ENEMA 210ML", itsTracking: true },
  { id: "2", sku: "1405-010", materialName: "PAROL 500MG TABLET", itsTracking: true },
  { id: "3", sku: "1405-011", materialName: "ASPIRIN 100MG", itsTracking: false },
  { id: "4", sku: "1405-012", materialName: "VOLTAREN GEL 50G", itsTracking: true },
  { id: "5", sku: "1405-013", materialName: "CALPOL SURUP 150ML", itsTracking: false },
  { id: "6", sku: "1405-014", materialName: "MAJEZIK 500MG", itsTracking: true },
  { id: "7", sku: "1405-015", materialName: "AUGMENTIN 1000MG", itsTracking: true },
  { id: "8", sku: "1405-016", materialName: "CORASPIN 100MG", itsTracking: false },
];

export default function MaterialsPage() {
  const router = useRouter();
  const t = useTranslations("materials");
  const common = useTranslations("common");

  const [searchQuery, setSearchQuery] = useState("");
  const [itsTrackingFilter, setItsTrackingFilter] = useState("all");

  const filteredMaterials = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return mockMaterials.filter((material) => {
      const matchesSearch =
        query === "" ||
        material.sku.toLowerCase().includes(query) ||
        material.materialName.toLowerCase().includes(query);

      const matchesItsTracking =
        itsTrackingFilter === "all" ||
        (itsTrackingFilter === "yes" && material.itsTracking) ||
        (itsTrackingFilter === "no" && !material.itsTracking);

      return matchesSearch && matchesItsTracking;
    });
  }, [searchQuery, itsTrackingFilter]);

  return (
    <div className="p-8 space-y-6">
      <SectionHeader
        title={t("title")}
        description={t("reportName")}
        actions={
          <Button onClick={() => router.push("/materials/new")}>
            <Plus className="w-4 h-4 mr-2" />
            {t("newMaterial")}
          </Button>
        }
      />

      <Card className="p-5 bg-white border border-gray-200">
        <div className="flex items-end gap-4 flex-wrap">
          <div className="w-full max-w-md">
            <label className="block text-xs font-medium text-gray-600 mb-2">
              {t("filterSearch")}
            </label>
            <Input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder={t("filterSearchPlaceholder")}
              className="bg-gray-50 border-gray-200"
            />
          </div>

          <div className="w-64">
            <label className="block text-xs font-medium text-gray-600 mb-2">
              {t("filterStatus")}
            </label>
            <select
              value={itsTrackingFilter}
              onChange={(event) => setItsTrackingFilter(event.target.value)}
              className="w-full h-9 px-3 bg-gray-50 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">{t("filterStatusAll")}</option>
              <option value="yes">{t("filterItsTrackingYes")}</option>
              <option value="no">{t("filterItsTrackingNo")}</option>
            </select>
          </div>

          <Button variant="outline" size="sm" className="border-gray-200">
            {common("filter")}
          </Button>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <span className="text-sm text-gray-500">
            {filteredMaterials.length} {t("resultsFound")}
          </span>
        </div>
      </Card>

      <DataTable
        data={filteredMaterials}
        emptyMessage={t("noResults")}
        columns={[
          {
            key: "sku",
            header: t("sku"),
            render: (row) => <span className="font-mono">{row.sku}</span>,
          },
          {
            key: "materialName",
            header: t("materialName"),
          },
          {
            key: "itsTracking",
            header: t("itsTrackingQuestion"),
            render: (row) => (
              <Badge tone={row.itsTracking ? "green" : "gray"} variant="outline">
                {row.itsTracking ? t("yes") : t("no")}
              </Badge>
            ),
          },
          {
            key: "actions",
            header: common("actions"),
            render: () => (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  {common("view")}
                </Button>
                <Button variant="outline" size="sm">
                  {common("edit")}
                </Button>
                <Button variant="ghost" size="sm" className="text-red-600">
                  {common("delete")}
                </Button>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
