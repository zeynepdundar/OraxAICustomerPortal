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

export interface InventoryItem {
  id: string;
  palletNo: string;
  status: 'salable' | 'reserved' | 'quarantine' | 'damaged';
  sku: string;
  materialName: string;
  lot: string;
  originalQuantity: number;
  currentQuantity: number;
  location: string;
  expiryDate: string;
  customer: string;
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

export const mockInventory: InventoryItem[] = [
  {
    id: '1',
    palletNo: 'P00000740',
    status: 'salable',
    sku: '1201-11026',
    materialName: 'EVOLVIA NUTRIPIRO PLUS 3 800 GR',
    lot: '945000049',
    originalQuantity: 237,
    currentQuantity: 237,
    location: '10R03203',
    expiryDate: '2029-12-30',
    customer: 'Selcuk Ecza Deposu',
  },
  {
    id: '2',
    palletNo: 'P00000850',
    status: 'salable',
    sku: '1201-11027',
    materialName: 'PAROL 500MG TABLET',
    lot: '945000050',
    originalQuantity: 500,
    currentQuantity: 350,
    location: '10R03204',
    expiryDate: '2026-08-15',
    customer: 'Avixa A.Ş.',
  },
  {
    id: '3',
    palletNo: 'P00000951',
    status: 'quarantine',
    sku: '1201-11028',
    materialName: 'ASPIRIN 100MG',
    lot: '945000051',
    originalQuantity: 450,
    currentQuantity: 450,
    location: '10R03205',
    expiryDate: '2026-05-10',
    customer: 'Selcuk Ecza Deposu',
  },
  {
    id: '4',
    palletNo: 'P00001052',
    status: 'reserved',
    sku: '1201-11029',
    materialName: 'VOLTAREN GEL 50G',
    lot: '945000052',
    originalQuantity: 680,
    currentQuantity: 0,
    location: '10R03206',
    expiryDate: '2026-09-25',
    customer: 'Hedef Alliance',
  },
  {
    id: '5',
    palletNo: 'P00001153',
    status: 'salable',
    sku: '1201-11030',
    materialName: 'CALPOL ŞURUP 150ML',
    lot: '945000053',
    originalQuantity: 3200,
    currentQuantity: 2800,
    location: '10R03207',
    expiryDate: '2026-04-18',
    customer: 'Avixa A.Ş.',
  },
  {
    id: '6',
    palletNo: 'P00001254',
    status: 'damaged',
    sku: '1201-11031',
    materialName: 'ANTIBIYOTIK XL 500MG',
    lot: '945000054',
    originalQuantity: 680,
    currentQuantity: 580,
    location: '10R03208',
    expiryDate: '2026-05-02',
    customer: 'Selcuk Ecza Deposu',
  },
  {
    id: '7',
    palletNo: 'P00001355',
    status: 'salable',
    sku: '1201-11032',
    materialName: 'VITAMIN C 1000MG',
    lot: '945000055',
    originalQuantity: 15000,
    currentQuantity: 15000,
    location: '10R03209',
    expiryDate: '2027-01-30',
    customer: 'Hedef Alliance',
  },
  {
    id: '8',
    palletNo: 'P00001456',
    status: 'salable',
    sku: '1201-11033',
    materialName: 'MAJEZIK 500MG',
    lot: '945000056',
    originalQuantity: 8500,
    currentQuantity: 7200,
    location: '10R03210',
    expiryDate: '2026-11-20',
    customer: 'Avixa A.Ş.',
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

export const mockKPIInventory = {
  totalStock: 1950,
  salableStock: 12,
  reservedStock: 8,
  quarantineStock: 15,
  damagedStock: 15,
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
