import { InventoryItem, StockReceiptEntry, StockConsumptionEntry, TransactionLog } from '../types/inventory';

export const sampleInventoryItems: InventoryItem[] = [
  {
    id: '1',
    item_name: 'Portland Cement',
    item_code: 'CEM-001',
    current_stock: 45,
    unit_of_measurement: 'Bags',
    last_rate: 420,
    total_value: 18900
  },
  {
    id: '2',
    item_name: 'Steel Reinforcement Bars 12mm',
    item_code: 'STL-012',
    current_stock: 120,
    unit_of_measurement: 'Pieces',
    last_rate: 850,
    total_value: 102000
  },
  {
    id: '3',
    item_name: 'Concrete Blocks',
    item_code: 'BLK-001',
    current_stock: 280,
    unit_of_measurement: 'Pieces',
    last_rate: 45,
    total_value: 12600
  },
  {
    id: '4',
    item_name: 'Sand (River)',
    item_code: 'SND-001',
    current_stock: 8.5,
    unit_of_measurement: 'Cubic Meters',
    last_rate: 2800,
    total_value: 23800
  },
  {
    id: '5',
    item_name: 'Gravel',
    item_code: 'GRV-001',
    current_stock: 12,
    unit_of_measurement: 'Cubic Meters',
    last_rate: 3200,
    total_value: 38400
  }
];

export const sampleStockReceipts: StockReceiptEntry[] = [
  {
    id: '1',
    item_name: 'Portland Cement',
    item_code: 'CEM-001',
    quantity_received: 50,
    rate_per_unit: 420,
    unit_of_measurement: 'Bags',
    total_value: 21000,
    supplier_name: 'ABC Building Materials',
    delivery_date: '2024-01-08',
    received_by: 'John Smith',
    created_at: '2024-01-08T09:30:00Z',
    created_by: 'John Smith'
  },
  {
    id: '2',
    item_name: 'Steel Reinforcement Bars 12mm',
    item_code: 'STL-012',
    quantity_received: 150,
    rate_per_unit: 850,
    unit_of_measurement: 'Pieces',
    total_value: 127500,
    supplier_name: 'Steel Corp Ltd',
    delivery_date: '2024-01-07',
    received_by: 'Mike Johnson',
    created_at: '2024-01-07T14:15:00Z',
    created_by: 'Mike Johnson'
  }
];

export const sampleStockConsumption: StockConsumptionEntry[] = [
  {
    id: '1',
    item_name: 'Portland Cement',
    item_code: 'CEM-001',
    quantity_used: 5,
    purpose_activity_code: 'FND-001',
    used_by: 'Construction Team A',
    date: '2024-01-09',
    remarks: 'Foundation work - Block A',
    created_at: '2024-01-09T11:20:00Z',
    created_by: 'David Wilson'
  },
  {
    id: '2',
    item_name: 'Steel Reinforcement Bars 12mm',
    item_code: 'STL-012',
    quantity_used: 30,
    purpose_activity_code: 'FND-001',
    used_by: 'Construction Team A',
    date: '2024-01-09',
    remarks: 'Foundation reinforcement',
    created_at: '2024-01-09T15:45:00Z',
    created_by: 'David Wilson'
  }
];

export const sampleTransactionLogs: TransactionLog[] = [
  {
    id: '1',
    type: 'receipt',
    item_code: 'CEM-001',
    item_name: 'Portland Cement',
    quantity: 50,
    timestamp: '2024-01-08T09:30:00Z',
    user_name: 'John Smith',
    action: 'created'
  },
  {
    id: '2',
    type: 'consumption',
    item_code: 'CEM-001',
    item_name: 'Portland Cement',
    quantity: 5,
    timestamp: '2024-01-09T11:20:00Z',
    user_name: 'David Wilson',
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