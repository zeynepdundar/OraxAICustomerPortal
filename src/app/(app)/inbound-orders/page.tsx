"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Filter, Download, ChevronDown, ChevronUp, X } from 'lucide-react';
import { useTranslations } from "next-intl";
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { DataTable } from '@/components/ui/DataTable';
import { mockOutboundOrders, OutboundOrderItem } from '@/data/mockData';
import { Badge, BadgeTone } from '@/components/ui/Badge';


export default function InboundOrders() {
  const router = useRouter();
  const t = useTranslations("dashboard");

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
    not_started: "Not Started",
    picking_started: "Picking",
    picking_completed: "Picked",
    packing_started: "Packing",
    packing_completed: "Completed",
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


  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Outbound Orders</h1>

        <div className="flex gap-3">
          <Button onClick={()=>{}}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>

          <Button onClick={() => router.push('/outbound-orders/new')}>
            <Plus className="w-4 h-4 mr-2" />
            New Order
          </Button>
        </div>
      </div>

      <Card className="p-4">
        <button
          onClick={() => setIsFilterExpanded(!isFilterExpanded)}
          className="flex items-center justify-between w-full"
        >
          <span>Filters</span>
          {isFilterExpanded ? <ChevronUp /> : <ChevronDown />}
        </button>

        {isFilterExpanded && (
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
            <Input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
            <Input placeholder="Order No" value={orderNoFilter} onChange={(e) => setOrderNoFilter(e.target.value)} />
            <Input placeholder="AVI" value={aviFilter} onChange={(e) => setAviFilter(e.target.value)} />
          </div>
        )}
      </Card>

      <DataTable
        data={filteredData}
        columns={[
          {
            key: "orderDate",
            header: "Order Date",
          },
          {
            key: "completionDate",
            header: "Completion Date",
            render: (row: OutboundOrderItem) => row.completionDate || "-",
          },
          {
            key: "customer",
            header: "Customer",
          },
          {
            key: "orderNo",
            header: "Order No",
            className: "font-mono",
          },
          {
            key: "avi",
            header: "AVI",
            className: "font-mono text-gray-600",
          },
          {
            key: "warehouse",
            header: "Warehouse",
          },
          {
            key: "sku",
            header: "SKU",
            className: "font-mono text-gray-600",
          },
          {
            key: "productName",
            header: "Product",
          },
          {
            key: "lot",
            header: "Lot",
            className: "font-mono text-gray-600",
          },
          {
            key: "quantity",
            header: "Quantity",
            className: "text-right text-gray-600",
            render: (row: OutboundOrderItem) =>
              row.quantity.toLocaleString(),
          },
          {
            key: "totalBoxes",
            header: "Boxes",
            className: "text-right font-semibold",
            render: (row: OutboundOrderItem) =>
              row.totalBoxes.toLocaleString(),
          },
          {
            key: "itsTransferId",
            header: "ITS Transfer",
            className: "font-mono text-gray-600",
          },
          {
            key: "status",
            header: "Status",
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