"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { mockCustomers } from "@/data/mockData";
import { DataTable } from "@/components/ui/DataTable";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SearchInput } from "@/components/ui/SearchInput";
import { Download, Plus } from "lucide-react";
//import * as XLSX from 'xlsx';

export default function CustomerPage() {
  const router = useRouter();
  const t = useTranslations("customers");
  const common = useTranslations("common");

  const [searchQuery, setSearchQuery] = useState("");

  const data = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return mockCustomers;
    }

    return mockCustomers.filter((customer) => {
      return (
        customer.customerCode.toLowerCase().includes(query) ||
        customer.customerName.toLowerCase().includes(query)
      );
    });
  }, [searchQuery]);

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
            label: common("export"),
            variant: "secondary",
            icon: <Download className="w-4 h-4 mr-2" />,
            onClick: exportToExcel,
          },
          {
            label: t("newCustomer"),
            icon: <Plus className="w-4 h-4 mr-2" />,
            onClick: () => router.push("/customers/new"),
          },
        ]}
      />

      <Card className="p-5">
        <SearchInput
          label={common("search")}
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder={t("searchPlaceholder")}
        />
      </Card>

      <DataTable
        data={data}
        emptyMessage={t("noResults")}
        columns={[
          {
            key: "customerCode",
            header: t("customerCode"),
            render: (row) => <span className="font-mono">{row.customerCode}</span>,
          },
          {
            key: "customerName",
            header: t("customerName"),
          },
          {
            key: "actions",
            header: common("actions"),
            className: "text-right",
            render: (row) => (
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="sm">
                  {common("view")}
                </Button>
                <Button variant="outline" size="sm">
                  {common("edit")}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-blue-600"
                  onClick={() => router.push(`/customers/${row.id}`)}
                >
                  {t("wareview")}
                </Button>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
