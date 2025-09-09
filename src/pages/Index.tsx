import { useState } from "react";
import { Navigation } from "@/components/Layout/Navigation";
import { InventoryDashboard } from "@/components/Dashboard/InventoryDashboard";
import { StockReceiptForm } from "@/components/StockReceipt/StockReceiptForm";
import { StockConsumptionForm } from "@/components/StockConsumption/StockConsumptionForm";
import { ReportsSection } from "@/components/Reports/ReportsSection";

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <InventoryDashboard />;
      case 'receipt':
        return <StockReceiptForm />;
      case 'consumption':
        return <StockConsumptionForm />;
      case 'reports':
        return <ReportsSection />;
      default:
        return <InventoryDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col md:flex-row">
        {/* Navigation */}
        <div className="md:w-72 md:shrink-0">
          <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
        
        {/* Main Content */}
        <div className="flex-1 p-6 md:p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Index;
