-- Create inventory management tables

-- Create inventory_items table for current stock
CREATE TABLE public.inventory_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  item_name TEXT NOT NULL,
  item_code TEXT NOT NULL UNIQUE,
  current_stock DECIMAL(10,2) NOT NULL DEFAULT 0,
  unit_of_measurement TEXT NOT NULL,
  last_rate DECIMAL(10,2) NOT NULL DEFAULT 0,
  total_value DECIMAL(15,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id)
);

-- Create stock_receipts table for incoming stock
CREATE TABLE public.stock_receipts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  item_name TEXT NOT NULL,
  item_code TEXT NOT NULL,
  quantity_received DECIMAL(10,2) NOT NULL,
  rate_per_unit DECIMAL(10,2) NOT NULL,
  unit_of_measurement TEXT NOT NULL,
  total_value DECIMAL(15,2) NOT NULL,
  supplier_name TEXT NOT NULL,
  delivery_date DATE NOT NULL,
  received_by TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id),
  FOREIGN KEY (item_code) REFERENCES public.inventory_items(item_code)
);

-- Create stock_consumption table for outgoing stock
CREATE TABLE public.stock_consumption (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  item_name TEXT NOT NULL,
  item_code TEXT NOT NULL,
  quantity_used DECIMAL(10,2) NOT NULL,
  purpose_activity_code TEXT NOT NULL,
  used_by TEXT NOT NULL,
  date DATE NOT NULL,
  remarks TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id),
  FOREIGN KEY (item_code) REFERENCES public.inventory_items(item_code)
);

-- Create transaction_logs table for audit trail
CREATE TABLE public.transaction_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('receipt', 'consumption')),
  item_code TEXT NOT NULL,
  item_name TEXT NOT NULL,
  quantity DECIMAL(10,2) NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  user_name TEXT NOT NULL,
  action TEXT NOT NULL CHECK (action IN ('created', 'edited')),
  created_by UUID REFERENCES auth.users(id)
);

-- Enable Row Level Security
ALTER TABLE public.inventory_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stock_receipts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stock_consumption ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transaction_logs ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for inventory_items
CREATE POLICY "Anyone can view inventory items" 
ON public.inventory_items 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can create inventory items" 
ON public.inventory_items 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update inventory items" 
ON public.inventory_items 
FOR UPDATE 
USING (auth.uid() IS NOT NULL);

-- Create RLS policies for stock_receipts
CREATE POLICY "Anyone can view stock receipts" 
ON public.stock_receipts 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can create stock receipts" 
ON public.stock_receipts 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

-- Create RLS policies for stock_consumption
CREATE POLICY "Anyone can view stock consumption" 
ON public.stock_consumption 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can create stock consumption" 
ON public.stock_consumption 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

-- Create RLS policies for transaction_logs
CREATE POLICY "Anyone can view transaction logs" 
ON public.transaction_logs 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can create transaction logs" 
ON public.transaction_logs 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  NEW.updated_by = auth.uid();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_inventory_items_updated_at
BEFORE UPDATE ON public.inventory_items
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to update inventory stock on receipt
CREATE OR REPLACE FUNCTION public.handle_stock_receipt()
RETURNS TRIGGER AS $$
BEGIN
  -- Update or insert inventory item
  INSERT INTO public.inventory_items (
    item_name, 
    item_code, 
    current_stock, 
    unit_of_measurement, 
    last_rate, 
    total_value,
    created_by
  ) VALUES (
    NEW.item_name,
    NEW.item_code,
    NEW.quantity_received,
    NEW.unit_of_measurement,
    NEW.rate_per_unit,
    NEW.quantity_received * NEW.rate_per_unit,
    NEW.created_by
  )
  ON CONFLICT (item_code) 
  DO UPDATE SET
    current_stock = inventory_items.current_stock + NEW.quantity_received,
    last_rate = NEW.rate_per_unit,
    total_value = (inventory_items.current_stock + NEW.quantity_received) * NEW.rate_per_unit,
    updated_at = now(),
    updated_by = NEW.created_by;

  -- Create transaction log
  INSERT INTO public.transaction_logs (
    type, item_code, item_name, quantity, user_name, action, created_by
  ) VALUES (
    'receipt', NEW.item_code, NEW.item_name, NEW.quantity_received, NEW.received_by, 'created', NEW.created_by
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create function to update inventory stock on consumption
CREATE OR REPLACE FUNCTION public.handle_stock_consumption()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if enough stock is available
  IF NOT EXISTS (
    SELECT 1 FROM public.inventory_items 
    WHERE item_code = NEW.item_code AND current_stock >= NEW.quantity_used
  ) THEN
    RAISE EXCEPTION 'Insufficient stock for item %', NEW.item_code;
  END IF;

  -- Update inventory item
  UPDATE public.inventory_items 
  SET 
    current_stock = current_stock - NEW.quantity_used,
    total_value = (current_stock - NEW.quantity_used) * last_rate,
    updated_at = now(),
    updated_by = NEW.created_by
  WHERE item_code = NEW.item_code;

  -- Create transaction log
  INSERT INTO public.transaction_logs (
    type, item_code, item_name, quantity, user_name, action, created_by
  ) VALUES (
    'consumption', NEW.item_code, NEW.item_name, NEW.quantity_used, NEW.used_by, 'created', NEW.created_by
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for stock updates
CREATE TRIGGER handle_stock_receipt_trigger
AFTER INSERT ON public.stock_receipts
FOR EACH ROW
EXECUTE FUNCTION public.handle_stock_receipt();

CREATE TRIGGER handle_stock_consumption_trigger
AFTER INSERT ON public.stock_consumption
FOR EACH ROW
EXECUTE FUNCTION public.handle_stock_consumption();

-- Insert sample data
INSERT INTO public.inventory_items (item_name, item_code, current_stock, unit_of_measurement, last_rate, total_value) VALUES
('Portland Cement', 'CEM-001', 45, 'Bags', 420, 18900),
('Steel Reinforcement Bars 12mm', 'STL-012', 120, 'Pieces', 850, 102000),
('Concrete Blocks', 'BLK-001', 280, 'Pieces', 45, 12600),
('Sand (River)', 'SND-001', 8.5, 'Cubic Meters', 2800, 23800),
('Gravel', 'GRV-001', 12, 'Cubic Meters', 3200, 38400);