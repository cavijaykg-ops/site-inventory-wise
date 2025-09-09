import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { sampleInventoryItems } from "@/data/sampleData";
import { Package, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";

export function InventoryDashboard() {
  const totalItems = sampleInventoryItems.length;
  const totalValue = sampleInventoryItems.reduce((sum, item) => sum + item.totalValue, 0);
  const lowStockItems = sampleInventoryItems.filter(item => item.currentStock < 10);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Inventory Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalItems}</div>
            <p className="text-xs text-muted-foreground">
              Active items in stock
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Stock Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Current inventory valuation
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowStockItems.length}</div>
            <p className="text-xs text-muted-foreground">
              Items requiring attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Current Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle>Current Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2 font-medium">Item Code</th>
                  <th className="text-left py-3 px-2 font-medium">Item Name</th>
                  <th className="text-left py-3 px-2 font-medium">Stock</th>
                  <th className="text-left py-3 px-2 font-medium">Unit</th>
                  <th className="text-left py-3 px-2 font-medium">Rate</th>
                  <th className="text-left py-3 px-2 font-medium">Value</th>
                  <th className="text-left py-3 px-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {sampleInventoryItems.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-2">
                      <code className="text-sm font-mono bg-muted px-2 py-1 rounded">
                        {item.itemCode}
                      </code>
                    </td>
                    <td className="py-3 px-2 font-medium">{item.itemName}</td>
                    <td className="py-3 px-2">{item.currentStock}</td>
                    <td className="py-3 px-2">{item.unitOfMeasurement}</td>
                    <td className="py-3 px-2">₹{item.lastRate}</td>
                    <td className="py-3 px-2">₹{item.totalValue.toLocaleString()}</td>
                    <td className="py-3 px-2">
                      <Badge 
                        variant={item.currentStock < 10 ? "destructive" : "secondary"}
                      >
                        {item.currentStock < 10 ? "Low Stock" : "In Stock"}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}