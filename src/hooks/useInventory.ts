import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { InventoryItem, StockReceiptEntry, StockConsumptionEntry, TransactionLog } from '@/types/inventory';

export const useInventoryItems = () => {
  return useQuery({
    queryKey: ['inventory-items'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('inventory_items')
        .select('*')
        .order('item_name');
      
      if (error) throw error;
      return data;
    }
  });
};

export const useStockReceipts = () => {
  return useQuery({
    queryKey: ['stock-receipts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('stock_receipts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });
};

export const useStockConsumption = () => {
  return useQuery({
    queryKey: ['stock-consumption'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('stock_consumption')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });
};

export const useTransactionLogs = () => {
  return useQuery({
    queryKey: ['transaction-logs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('transaction_logs')
        .select('*')
        .order('timestamp', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });
};

export const useCreateStockReceipt = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (receiptData: Omit<StockReceiptEntry, 'id' | 'created_at' | 'created_by'>) => {
      const { data, error } = await supabase
        .from('stock_receipts')
        .insert([receiptData])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stock-receipts'] });
      queryClient.invalidateQueries({ queryKey: ['inventory-items'] });
      queryClient.invalidateQueries({ queryKey: ['transaction-logs'] });
    }
  });
};

export const useCreateStockConsumption = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (consumptionData: Omit<StockConsumptionEntry, 'id' | 'created_at' | 'created_by'>) => {
      const { data, error } = await supabase
        .from('stock_consumption')
        .insert([consumptionData])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stock-consumption'] });
      queryClient.invalidateQueries({ queryKey: ['inventory-items'] });
      queryClient.invalidateQueries({ queryKey: ['transaction-logs'] });
    }
  });
};