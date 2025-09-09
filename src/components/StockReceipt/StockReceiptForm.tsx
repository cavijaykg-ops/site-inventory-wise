import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { sampleInventoryItems, unitOptions } from "@/data/sampleData";
import { Plus, Package } from "lucide-react";

export function StockReceiptForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    itemName: "",
    itemCode: "",
    quantityReceived: "",
    ratePerUnit: "",
    unitOfMeasurement: "",
    supplierName: "",
    deliveryDate: "",
    receivedBy: "",
  });

  const totalValue = Number(formData.quantityReceived) * Number(formData.ratePerUnit) || 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields = ['itemName', 'itemCode', 'quantityReceived', 'ratePerUnit', 'unitOfMeasurement', 'supplierName', 'deliveryDate', 'receivedBy'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Stock Receipt Recorded",
      description: `Successfully recorded receipt of ${formData.quantityReceived} ${formData.unitOfMeasurement} of ${formData.itemName}`,
    });

    // Reset form
    setFormData({
      itemName: "",
      itemCode: "",
      quantityReceived: "",
      ratePerUnit: "",
      unitOfMeasurement: "",
      supplierName: "",
      deliveryDate: "",
      receivedBy: "",
    });
  };

  const handleItemCodeSelect = (itemCode: string) => {
    const item = sampleInventoryItems.find(i => i.itemCode === itemCode);
    if (item) {
      setFormData(prev => ({
        ...prev,
        itemCode,
        itemName: item.itemName,
        unitOfMeasurement: item.unitOfMeasurement,
        ratePerUnit: item.lastRate.toString(),
      }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-accent rounded-lg">
          <Plus className="h-6 w-6 text-accent-foreground" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Stock Receipt</h2>
          <p className="text-muted-foreground">Record incoming inventory items</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            New Stock Receipt Entry
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Item Selection */}
              <div className="space-y-2">
                <Label htmlFor="itemCode">Item Code *</Label>
                <Select value={formData.itemCode} onValueChange={handleItemCodeSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select or enter item code" />
                  </SelectTrigger>
                  <SelectContent>
                    {sampleInventoryItems.map((item) => (
                      <SelectItem key={item.id} value={item.itemCode}>
                        {item.itemCode} - {item.itemName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="itemName">Item Name *</Label>
                <Input
                  id="itemName"
                  value={formData.itemName}
                  onChange={(e) => setFormData(prev => ({ ...prev, itemName: e.target.value }))}
                  placeholder="Enter item name"
                />
              </div>

              {/* Quantity and Rate */}
              <div className="space-y-2">
                <Label htmlFor="quantityReceived">Quantity Received *</Label>
                <Input
                  id="quantityReceived"
                  type="number"
                  value={formData.quantityReceived}
                  onChange={(e) => setFormData(prev => ({ ...prev, quantityReceived: e.target.value }))}
                  placeholder="0"
                  min="0"
                  step="0.01"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ratePerUnit">Rate per Unit *</Label>
                <Input
                  id="ratePerUnit"
                  type="number"
                  value={formData.ratePerUnit}
                  onChange={(e) => setFormData(prev => ({ ...prev, ratePerUnit: e.target.value }))}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="unitOfMeasurement">Unit of Measurement *</Label>
                <Select value={formData.unitOfMeasurement} onValueChange={(value) => setFormData(prev => ({ ...prev, unitOfMeasurement: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {unitOptions.map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Total Value</Label>
                <div className="p-3 bg-muted rounded-md">
                  <span className="text-lg font-semibold">₹{totalValue.toLocaleString()}</span>
                </div>
              </div>

              {/* Supplier Information */}
              <div className="space-y-2">
                <Label htmlFor="supplierName">Supplier Name *</Label>
                <Input
                  id="supplierName"
                  value={formData.supplierName}
                  onChange={(e) => setFormData(prev => ({ ...prev, supplierName: e.target.value }))}
                  placeholder="Enter supplier name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="deliveryDate">Delivery Date *</Label>
                <Input
                  id="deliveryDate"
                  type="date"
                  value={formData.deliveryDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, deliveryDate: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="receivedBy">Received By *</Label>
                <Input
                  id="receivedBy"
                  value={formData.receivedBy}
                  onChange={(e) => setFormData(prev => ({ ...prev, receivedBy: e.target.value }))}
                  placeholder="Enter receiver name"
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1 md:flex-none">
                Record Receipt
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setFormData({
                  itemName: "",
                  itemCode: "",
                  quantityReceived: "",
                  ratePerUnit: "",
                  unitOfMeasurement: "",
                  supplierName: "",
                  deliveryDate: "",
                  receivedBy: "",
                })}
              >
                Clear Form
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}