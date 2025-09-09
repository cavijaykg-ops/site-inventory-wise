import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Package, TrendingUp, TrendingDown, BarChart3, Menu, X } from "lucide-react";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Package },
    { id: 'receipt', label: 'Stock Receipt', icon: TrendingUp },
    { id: 'consumption', label: 'Stock Consumption', icon: TrendingDown },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Mobile Navigation Overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setIsMenuOpen(false)} />
      )}

      {/* Navigation */}
      <nav className={`
        fixed md:static inset-y-0 left-0 z-50 w-72 md:w-full
        transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
        transition-transform duration-200 ease-in-out
        md:transform-none
      `}>
        <Card className="h-full md:h-auto bg-card border-r md:border md:shadow-sm">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-8">
              <Package className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold text-foreground">Inventory Pro</h1>
                <p className="text-sm text-muted-foreground">Site Management</p>
              </div>
            </div>

            <div className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={activeTab === item.id ? "default" : "ghost"}
                    className="w-full justify-start gap-3 h-12"
                    onClick={() => {
                      onTabChange(item.id);
                      setIsMenuOpen(false);
                    }}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </Button>
                );
              })}
            </div>
          </div>
        </Card>
      </nav>
    </>
  );
}