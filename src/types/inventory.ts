export interface InventoryItem {
  id: string;
  item_name: string;
  item_code: string;
  current_stock: number;
  unit_of_measurement: string;
  last_rate: number;
  total_value: number;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  updated_by?: string;
}

export interface StockReceiptEntry {
  id: string;
  item_name: string;
  item_code: string;
  quantity_received: number;
  rate_per_unit: number;
  unit_of_measurement: string;
  total_value: number;
  supplier_name: string;
  delivery_date: string;
  received_by: string;
  created_at?: string;
  created_by?: string;
}

export interface StockConsumptionEntry {
  id: string;
  item_name: string;
  item_code: string;
  quantity_used: number;
  purpose_activity_code: string;
  used_by: string;
  date: string;
  remarks?: string;
  created_at?: string;
  created_by?: string;
}

export interface TransactionLog {
  id: string;
  type: 'receipt' | 'consumption';
  item_code: string;
  item_name: string;
  quantity: number;
  timestamp: string;
  user_name: string;
  action: 'created' | 'edited';
  created_by?: string;
}