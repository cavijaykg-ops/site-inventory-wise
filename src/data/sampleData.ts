import { InventoryItem, StockReceiptEntry, StockConsumptionEntry, TransactionLog } from '../types/inventory';

export const sampleInventoryItems: InventoryItem[] = [
  {
    id: '1',
    itemName: 'Portland Cement',
    itemCode: 'CEM-001',
    currentStock: 45,
    unitOfMeasurement: 'Bags',
    lastRate: 420,
    totalValue: 18900
  },
  {
    id: '2',
    itemName: 'Steel Reinforcement Bars 12mm',
    itemCode: 'STL-012',
    currentStock: 120,
    unitOfMeasurement: 'Pieces',
    lastRate: 850,
    totalValue: 102000
  },
  {
    id: '3',
    itemName: 'Concrete Blocks',
    itemCode: 'BLK-001',
    currentStock: 280,
    unitOfMeasurement: 'Pieces',
    lastRate: 45,
    totalValue: 12600
  },
  {
    id: '4',
    itemName: 'Sand (River)',
    itemCode: 'SND-001',
    currentStock: 8.5,
    unitOfMeasurement: 'Cubic Meters',
    lastRate: 2800,
    totalValue: 23800
  },
  {
    id: '5',
    itemName: 'Gravel',
    itemCode: 'GRV-001',
    currentStock: 12,
    unitOfMeasurement: 'Cubic Meters',
    lastRate: 3200,
    totalValue: 38400
  }
];

export const sampleStockReceipts: StockReceiptEntry[] = [
  {
    id: '1',
    itemName: 'Portland Cement',
    itemCode: 'CEM-001',
    quantityReceived: 50,
    ratePerUnit: 420,
    unitOfMeasurement: 'Bags',
    totalValue: 21000,
    supplierName: 'ABC Building Materials',
    deliveryDate: '2024-01-08',
    receivedBy: 'John Smith',
    createdAt: '2024-01-08T09:30:00Z',
    createdBy: 'John Smith'
  },
  {
    id: '2',
    itemName: 'Steel Reinforcement Bars 12mm',
    itemCode: 'STL-012',
    quantityReceived: 150,
    ratePerUnit: 850,
    unitOfMeasurement: 'Pieces',
    totalValue: 127500,
    supplierName: 'Steel Corp Ltd',
    deliveryDate: '2024-01-07',
    receivedBy: 'Mike Johnson',
    createdAt: '2024-01-07T14:15:00Z',
    createdBy: 'Mike Johnson'
  }
];

export const sampleStockConsumption: StockConsumptionEntry[] = [
  {
    id: '1',
    itemName: 'Portland Cement',
    itemCode: 'CEM-001',
    quantityUsed: 5,
    purposeActivityCode: 'FND-001',
    usedBy: 'Construction Team A',
    date: '2024-01-09',
    remarks: 'Foundation work - Block A',
    createdAt: '2024-01-09T11:20:00Z',
    createdBy: 'David Wilson'
  },
  {
    id: '2',
    itemName: 'Steel Reinforcement Bars 12mm',
    itemCode: 'STL-012',
    quantityUsed: 30,
    purposeActivityCode: 'FND-001',
    usedBy: 'Construction Team A',
    date: '2024-01-09',
    remarks: 'Foundation reinforcement',
    createdAt: '2024-01-09T15:45:00Z',
    createdBy: 'David Wilson'
  }
];

export const sampleTransactionLogs: TransactionLog[] = [
  {
    id: '1',
    type: 'receipt',
    itemCode: 'CEM-001',
    itemName: 'Portland Cement',
    quantity: 50,
    timestamp: '2024-01-08T09:30:00Z',
    user: 'John Smith',
    action: 'created'
  },
  {
    id: '2',
    type: 'consumption',
    itemCode: 'CEM-001',
    itemName: 'Portland Cement',
    quantity: 5,
    timestamp: '2024-01-09T11:20:00Z',
    user: 'David Wilson',
    action: 'created'
  }
];

export const unitOptions = [
  'Pieces',
  'Bags',
  'Cubic Meters',
  'Square Meters',
  'Kilograms',
  'Tons',
  'Liters',
  'Meters'
];

export const activityCodes = [
  'FND-001 - Foundation Work',
  'STR-001 - Structural Work',
  'FIN-001 - Finishing Work',
  'PLB-001 - Plumbing Work',
  'ELC-001 - Electrical Work',
  'PNT-001 - Painting Work'
];