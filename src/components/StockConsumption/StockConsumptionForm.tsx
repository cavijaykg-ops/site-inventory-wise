import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { sampleInventoryItems, activityCodes } from "@/data/sampleData";
import { Minus, Wrench } from "lucide-react";

export function StockConsumptionForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    itemCode: "",
    itemName: "",
    quantityUsed: "",
    purposeActivityCode: "",
    usedBy: "",
    date: "",
    remarks: "",
  });

  const selectedItem = sampleInventoryItems.find(item => item.itemCode === formData.itemCode);
  const availableStock = selectedItem?.currentStock || 0;
  const requestedQuantity = Number(formData.quantityUsed) || 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields = ['itemCode', 'quantityUsed', 'purposeActivityCode', 'usedBy', 'date'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Check stock availability
    if (requestedQuantity > availableStock) {
      toast({
        title: "Insufficient Stock",
        description: `Only ${availableStock} ${selectedItem?.unitOfMeasurement} available in stock.`,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Stock Consumption Recorded",
      description: `Successfully recorded consumption of ${formData.quantityUsed} ${selectedItem?.unitOfMeasurement} of ${formData.itemName}`,
    });

    // Reset form
    setFormData({
      itemCode: "",
      itemName: "",
      quantityUsed: "",
      purposeActivityCode: "",
      usedBy: "",
      date: "",
      remarks: "",
    });
  };

  const handleItemCodeSelect = (itemCode: string) => {
    const item = sampleInventoryItems.find(i => i.itemCode === itemCode);
    if (item) {
      setFormData(prev => ({
        ...prev,
        itemCode,
        itemName: item.itemName,
      }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-warning rounded-lg">
          <Minus className="h-6 w-6 text-warning-foreground" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Stock Consumption</h2>
          <p className="text-muted-foreground">Record materials used in construction activities</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wrench className="h-5 w-5" />
            New Consumption Entry
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
                    <SelectValue placeholder="Select item to consume" />
                  </SelectTrigger>
                  <SelectContent>
                    {sampleInventoryItems.map((item) => (
                      <SelectItem key={item.id} value={item.itemCode}>
                        {item.itemCode} - {item.itemName} (Stock: {item.currentStock})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="itemName">Item Name</Label>
                <Input
                  id="itemName"
                  value={formData.itemName}
                  disabled
                  className="bg-muted"
                />
              </div>

              {/* Stock Information */}
              {selectedItem && (
                <div className="md:col-span-2 p-4 bg-muted rounded-lg">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Available Stock:</span>
                      <div className="font-semibold">{availableStock} {selectedItem.unitOfMeasurement}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Unit:</span>
                      <div className="font-semibold">{selectedItem.unitOfMeasurement}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Last Rate:</span>
                      <div className="font-semibold">₹{selectedItem.lastRate}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Stock Value:</span>
                      <div className="font-semibold">₹{selectedItem.totalValue.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Quantity and Activity */}
              <div className="space-y-2">
                <Label htmlFor="quantityUsed">Quantity Used *</Label>
                <Input
                  id="quantityUsed"
                  type="number"
                  value={formData.quantityUsed}
                  onChange={(e) => setFormData(prev => ({ ...prev, quantityUsed: e.target.value }))}
                  placeholder="0"
                  min="0"
                  step="0.01"
                  max={availableStock}
                />
                {requestedQuantity > 0 && (
                  <p className={`text-xs ${requestedQuantity > availableStock ? 'text-destructive' : 'text-muted-foreground'}`}>
                    {requestedQuantity > availableStock 
                      ? `Exceeds available stock by ${requestedQuantity - availableStock}`
                      : `${availableStock - requestedQuantity} will remain in stock`
                    }
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="purposeActivityCode">Purpose/Activity Code *</Label>
                <Select value={formData.purposeActivityCode} onValueChange={(value) => setFormData(prev => ({ ...prev, purposeActivityCode: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select activity" />
                  </SelectTrigger>
                  <SelectContent>
                    {activityCodes.map((code) => (
                      <SelectItem key={code} value={code}>
                        {code}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="usedBy">Used By *</Label>
                <Input
                  id="usedBy"
                  value={formData.usedBy}
                  onChange={(e) => setFormData(prev => ({ ...prev, usedBy: e.target.value }))}
                  placeholder="Enter team/person name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="remarks">Remarks</Label>
                <Textarea
                  id="remarks"
                  value={formData.remarks}
                  onChange={(e) => setFormData(prev => ({ ...prev, remarks: e.target.value }))}
                  placeholder="Additional notes about the consumption..."
                  rows={3}
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button 
                type="submit" 
                className="flex-1 md:flex-none"
                disabled={!selectedItem || requestedQuantity > availableStock}
              >
                Record Consumption
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setFormData({
                  itemCode: "",
                  itemName: "",
                  quantityUsed: "",
                  purposeActivityCode: "",
                  usedBy: "",
                  date: "",
                  remarks: "",
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