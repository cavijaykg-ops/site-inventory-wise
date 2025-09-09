import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { sampleStockReceipts, sampleStockConsumption, sampleInventoryItems } from "@/data/sampleData";
import { Download, FileText, TrendingUp, TrendingDown, Package } from "lucide-react";

export function ReportsSection() {
  const exportToCSV = (data: any[], filename: string, headers: string[]) => {
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => {
        const value = row[header.toLowerCase().replace(/\s+/g, '')];
        return typeof value === 'string' && value.includes(',') ? `"${value}"` : value;
      }).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportReceiptReport = () => {
    const headers = ['Item Code', 'Item Name', 'Quantity Received', 'Rate Per Unit', 'Unit', 'Total Value', 'Supplier Name', 'Delivery Date', 'Received By'];
    const data = sampleStockReceipts.map(receipt => ({
      itemcode: receipt.itemCode,
      itemname: receipt.itemName,
      quantityreceived: receipt.quantityReceived,
      rateperunit: receipt.ratePerUnit,
      unit: receipt.unitOfMeasurement,
      totalvalue: receipt.totalValue,
      suppliername: receipt.supplierName,
      deliverydate: receipt.deliveryDate,
      receivedby: receipt.receivedBy
    }));
    exportToCSV(data, 'stock_receipt_report', headers);
  };

  const exportConsumptionReport = () => {
    const headers = ['Item Code', 'Item Name', 'Quantity Used', 'Purpose/Activity', 'Used By', 'Date', 'Remarks'];
    const data = sampleStockConsumption.map(consumption => ({
      itemcode: consumption.itemCode,
      itemname: consumption.itemName,
      quantityused: consumption.quantityUsed,
      purposeactivity: consumption.purposeActivityCode,
      usedby: consumption.usedBy,
      date: consumption.date,
      remarks: consumption.remarks
    }));
    exportToCSV(data, 'stock_consumption_report', headers);
  };

  const exportValuationReport = () => {
    const headers = ['Item Code', 'Item Name', 'Current Stock', 'Unit', 'Rate Per Unit', 'Total Value'];
    const data = sampleInventoryItems.map(item => ({
      itemcode: item.itemCode,
      itemname: item.itemName,
      currentstock: item.currentStock,
      unit: item.unitOfMeasurement,
      rateperunit: item.lastRate,
      totalvalue: item.totalValue
    }));
    exportToCSV(data, 'stock_valuation_report', headers);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary rounded-lg">
          <FileText className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Reports</h2>
          <p className="text-muted-foreground">Export and view inventory reports</p>
        </div>
      </div>

      {/* Export Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5 text-accent" />
              Receipt Report
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Export all stock receipt entries with supplier details and delivery information.
            </p>
            <Button onClick={exportReceiptReport} className="w-full" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export to CSV
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingDown className="h-5 w-5 text-warning" />
              Consumption Report
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Export all stock consumption entries with activity codes and usage details.
            </p>
            <Button onClick={exportConsumptionReport} className="w-full" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export to CSV
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Package className="h-5 w-5 text-primary" />
              Valuation Report
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Export current stock valuation with quantities and total values.
            </p>
            <Button onClick={exportValuationReport} className="w-full" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export to CSV
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Stock Receipts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-accent" />
              Recent Stock Receipts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sampleStockReceipts.slice(0, 5).map((receipt) => (
                <div key={receipt.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{receipt.itemName}</div>
                    <div className="text-sm text-muted-foreground">
                      {receipt.quantityReceived} {receipt.unitOfMeasurement} from {receipt.supplierName}
                    </div>
                    <div className="text-xs text-muted-foreground">{receipt.deliveryDate}</div>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary">₹{receipt.totalValue.toLocaleString()}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Stock Consumption */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-warning" />
              Recent Stock Consumption
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sampleStockConsumption.slice(0, 5).map((consumption) => (
                <div key={consumption.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{consumption.itemName}</div>
                    <div className="text-sm text-muted-foreground">
                      Used by {consumption.usedBy}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {consumption.purposeActivityCode.split(' - ')[0]} • {consumption.date}
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline">{consumption.quantityUsed} used</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Summary Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">{sampleStockReceipts.length}</div>
              <div className="text-sm text-muted-foreground">Total Receipts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">{sampleStockConsumption.length}</div>
              <div className="text-sm text-muted-foreground">Total Consumptions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                ₹{sampleStockReceipts.reduce((sum, r) => sum + r.totalValue, 0).toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total Received Value</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">
                ₹{sampleInventoryItems.reduce((sum, i) => sum + i.totalValue, 0).toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Current Stock Value</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}