"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Download, ChevronDown, ChevronUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { DataTable } from '@/components/ui/DataTable';
import { mockOutboundOrders, OutboundOrderItem } from '@/data/mockData';
import { Badge, BadgeTone } from '@/components/ui/Badge';
import { SectionHeader } from '@/components/ui/SectionHeader';


export default function InboundOrders() {
  const router = useRouter();
  const t = useTranslations("inboundOrders");
  const commonT = useTranslations("common");

  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [orderNoFilter, setOrderNoFilter] = useState('');
  const [aviFilter, setAviFilter] = useState('');
  const [skuFilter, setSkuFilter] = useState('');
  const [lotFilter, setLotFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isFilterExpanded, setIsFilterExpanded] = useState(true);


  const filteredData = mockOutboundOrders;

  const statusLabels: Record<OutboundOrderItem["status"], string> = {
    not_started: t("status.notStarted"),
    picking_started: t("status.picking"),
    picking_completed: t("status.picked"),
    packing_started: t("status.packing"),
    packing_completed: t("status.completed"),
  };

  const getStatusTone = (status: OutboundOrderItem["status"]): BadgeTone => {
    switch (status) {
      case "packing_completed":
        return "green";     // done ✅
      case "packing_started":
        return "blue";      // active
      case "picking_started":
        return "orange";    // in progress
      case "not_started":
        return "red";       // attention
      case "picking_completed":
        return "gray";      // intermediate done
      default:
        return "gray";
    }
  };
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
          },
          {
            label: t("newOrder"),
            icon: <Plus className="w-4 h-4 mr-2" />,
            onClick: () => router.push("/inbound-orders/new"),
          },
        ]}
      />

      <Card className="p-4">
        <button
          onClick={() => setIsFilterExpanded(!isFilterExpanded)}
          className="flex items-center justify-between w-full"
        >
          <span>{t("filters")}</span>
          {isFilterExpanded ? <ChevronUp /> : <ChevronDown />}
        </button>

        {isFilterExpanded && (
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
            <Input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
            <Input placeholder={t("orderNo")} value={orderNoFilter} onChange={(e) => setOrderNoFilter(e.target.value)} />
            <Input placeholder={t("avi")} value={aviFilter} onChange={(e) => setAviFilter(e.target.value)} />
          </div>
        )}
      </Card>

      <DataTable
        data={filteredData}
        columns={[
          {
            key: "orderDate",
            header: t("columns.orderDate"),
          },
          {
            key: "completionDate",
            header: t("columns.completionDate"),
            render: (row: OutboundOrderItem) => row.completionDate || "-",
          },
          {
            key: "customer",
            header: t("columns.customer"),
          },
          {
            key: "orderNo",
            header: t("columns.orderNo"),
            className: "font-mono",
          },
          {
            key: "avi",
            header: t("columns.avi"),
            className: "font-mono text-gray-600",
          },
          {
            key: "warehouse",
            header: t("columns.warehouse"),
          },
          {
            key: "sku",
            header: t("columns.sku"),
            className: "font-mono text-gray-600",
          },
          {
            key: "productName",
            header: t("columns.product"),
          },
          {
            key: "lot",
            header: t("columns.lot"),
            className: "font-mono text-gray-600",
          },
          {
            key: "quantity",
            header: t("columns.quantity"),
            className: "text-right text-gray-600",
            render: (row: OutboundOrderItem) =>
              row.quantity.toLocaleString(),
          },
          {
            key: "totalBoxes",
            header: t("columns.boxes"),
            className: "text-right font-semibold",
            render: (row: OutboundOrderItem) =>
              row.totalBoxes.toLocaleString(),
          },
          {
            key: "itsTransferId",
            header: t("columns.itsTransfer"),
            className: "font-mono text-gray-600",
          },
          {
            key: "status",
            header: t("columns.status"),
            render: (row: OutboundOrderItem) => (
              <Badge tone={getStatusTone(row.status)} variant="outline">
                {statusLabels[row.status]}
              </Badge>
            ),
          },
        ]}
      />
    </div>
  );
}