export interface InventoryItem {
  id: string;
  itemName: string;
  itemCode: string;
  currentStock: number;
  unitOfMeasurement: string;
  lastRate: number;
  totalValue: number;
}

export interface StockReceiptEntry {
  id: string;
  itemName: string;
  itemCode: string;
  quantityReceived: number;
  ratePerUnit: number;
  unitOfMeasurement: string;
  totalValue: number;
  supplierName: string;
  deliveryDate: string;
  receivedBy: string;
  createdAt: string;
  createdBy: string;
}

export interface StockConsumptionEntry {
  id: string;
  itemName: string;
  itemCode: string;
  quantityUsed: number;
  purposeActivityCode: string;
  usedBy: string;
  date: string;
  remarks: string;
  createdAt: string;
  createdBy: string;
}

export interface TransactionLog {
  id: string;
  type: 'receipt' | 'consumption';
  itemCode: string;
  itemName: string;
  quantity: number;
  timestamp: string;
  user: string;
  action: 'created' | 'edited';
}