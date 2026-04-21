export interface InboundOrder {
  id: string;
  orderNo: string;
  orderDate: string;
  customer: string;
  products: InboundOrderProduct[];
  status: "Draft" | "Submitted" | "Completed";
  notes?: string;
}

export interface InboundOrderProduct {
  id: string;
  productCode: string;
  productName: string;
  quantity: number;
  batchNumber: string;
  expiryDate: string;
  notes?: string;
}

export interface OutboundOrder {
  id: string;
  shipmentNo: string;
  shipmentDate: string;
  customer: string;
  deliveryAddress: string;
  transportType: "Truck" | "Air" | "Sea" | "Rail";
  products: OutboundOrderProduct[];
  status: "Draft" | "In Transit" | "Delivered";
}

export interface OutboundOrderProduct {
  id: string;
  productCode: string;
  productName: string;
  quantity: number;
}

export interface Material {
  id: string;
  productCode: string;
  productName: string;
  category: string;
  storageType: "Ambient" | "Cold Chain";
  expiryTracking: boolean;
  stockLevel: number;
}

export interface Customer {
  id: string;
  customerCode: string;
  customerName: string;
  gln: string;
  contactPerson: string;
  phone: string;
  email: string;
  status: "Active" | "Inactive";
  lastActivity: string;
}

export const mockInboundOrders: InboundOrder[] = [
  {
    id: "1",
    orderNo: "IN-2026-001",
    orderDate: "2026-04-01",
    customer: "Selcuk Ecza Deposu",
    status: "Completed",
    products: [
      {
        id: "1",
        productCode: "WGT-001",
        productName: "Widget A",
        quantity: 100,
        batchNumber: "B001",
        expiryDate: "2027-04-01",
      },
    ],
  },
  {
    id: "2",
    orderNo: "IN-2026-002",
    orderDate: "2026-04-02",
    customer: "TechCo Ltd",
    status: "Submitted",
    products: [
      {
        id: "1",
        productCode: "WGT-002",
        productName: "Widget B",
        quantity: 50,
        batchNumber: "B002",
        expiryDate: "2027-04-02",
      },
    ],
  },
];

export const mockOutboundOrders: OutboundOrder[] = [
  {
    id: "1",
    shipmentNo: "OUT-2026-001",
    shipmentDate: "2026-04-01",
    customer: "Selcuk Ecza Deposu",
    deliveryAddress: "Istanbul, Turkey",
    transportType: "Truck",
    status: "Delivered",
    products: [
      {
        id: "1",
        productCode: "WGT-001",
        productName: "Widget A",
        quantity: 75,
      },
    ],
  },
  {
    id: "2",
    shipmentNo: "OUT-2026-002",
    shipmentDate: "2026-04-03",
    customer: "TechCo Ltd",
    deliveryAddress: "Ankara, Turkey",
    transportType: "Air",
    status: "In Transit",
    products: [
      {
        id: "1",
        productCode: "WGT-002",
        productName: "Widget B",
        quantity: 30,
      },
    ],
  },
];

export const mockMaterials: Material[] = [
  {
    id: "1",
    productCode: "WGT-001",
    productName: "Widget A",
    category: "Electronics",
    storageType: "Ambient",
    expiryTracking: true,
    stockLevel: 500,
  },
  {
    id: "2",
    productCode: "WGT-002",
    productName: "Widget B",
    category: "Electronics",
    storageType: "Cold Chain",
    expiryTracking: true,
    stockLevel: 250,
  },
  {
    id: "3",
    productCode: "CMP-001",
    productName: "Component X",
    category: "Parts",
    storageType: "Ambient",
    expiryTracking: false,
    stockLevel: 1200,
  },
];

export const mockCustomers: Customer[] = [
  {
    id: "1",
    customerCode: "CUST-001",
    customerName: "Selcuk Ecza Deposu",
    gln: "5412345678900",
    contactPerson: "John Smith",
    phone: "+90 212 555 0001",
    email: "john@acmecorp.com",
    status: "Active",
    lastActivity: "2026-04-01",
  },
  {
    id: "2",
    customerCode: "CUST-002",
    customerName: "TechCo Ltd",
    gln: "5412345678901",
    contactPerson: "Jane Doe",
    phone: "+90 212 555 0002",
    email: "jane@techco.com",
    status: "Active",
    lastActivity: "2026-04-02",
  },
  {
    id: "3",
    customerCode: "CUST-003",
    customerName: "Global Industries",
    gln: "5412345678902",
    contactPerson: "Mike Johnson",
    phone: "+90 212 555 0003",
    email: "mike@globalind.com",
    status: "Inactive",
    lastActivity: "2026-03-15",
  },
];

export const mockKPIs = {
  totalStock: 1950,
  inboundToday: 12,
  outboundToday: 8,
  pendingOrders: 15,
};

export const mockChartData = {
  stockTrend: [
    { id: "jan", name: "Jan", stock: 1500 },
    { id: "feb", name: "Feb", stock: 1650 },
    { id: "mar", name: "Mar", stock: 1800 },
    { id: "apr", name: "Apr", stock: 1950 },
  ],
  orderVolume: [
    { id: "mon", name: "Mon", inbound: 12, outbound: 8 },
    { id: "tue", name: "Tue", inbound: 15, outbound: 10 },
    { id: "wed", name: "Wed", inbound: 10, outbound: 12 },
    { id: "thu", name: "Thu", inbound: 18, outbound: 15 },
    { id: "fri", name: "Fri", inbound: 14, outbound: 11 },
  ],
};

export const recentTransactions = [
  {
    id: "1",
    date: "2026-04-05",
    type: "Inbound",
    customer: "Acme Corp",
    quantity: 100,
    status: "Completed",
  },
  {
    id: "2",
    date: "2026-04-05",
    type: "Outbound",
    customer: "TechCo Ltd",
    quantity: 75,
    status: "In Transit",
  },
  {
    id: "3",
    date: "2026-04-04",
    type: "Inbound",
    customer: "Global Industries",
    quantity: 50,
    status: "Completed",
  },
  {
    id: "4",
    date: "2026-04-04",
    type: "Outbound",
    customer: "Acme Corp",
    quantity: 30,
    status: "Delivered",
  },
];
