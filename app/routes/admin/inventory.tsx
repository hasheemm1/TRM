import { 
  Package, 
  Search, 
  Download,
  AlertTriangle,
  TrendingUp,
  TrendingDown
} from "lucide-react";
import { AdminLayout } from "~/components/layouts";
import { Card, Badge, Input, Button } from "~/components/ui";
import { useState } from "react";

export function meta() {
  return [{ title: "Inventory - Admin Dashboard | TRM Ops" }];
}

const inventory = [
  { id: "1", name: "LED Bulb 60W", category: "Electrical", quantity: 5, minQuantity: 20, unitCost: 350, monthlyUsage: 45 },
  { id: "2", name: "Chrome Door Handle", category: "Hardware", quantity: 2, minQuantity: 10, unitCost: 1500, monthlyUsage: 8 },
  { id: "3", name: "Water Filter Cartridge", category: "Plumbing", quantity: 3, minQuantity: 8, unitCost: 2500, monthlyUsage: 6 },
  { id: "4", name: "AC Filter 24x24", category: "HVAC", quantity: 15, minQuantity: 10, unitCost: 800, monthlyUsage: 12 },
  { id: "5", name: "Faucet Washer Kit", category: "Plumbing", quantity: 25, minQuantity: 15, unitCost: 150, monthlyUsage: 20 },
  { id: "6", name: "Electrical Tape", category: "Electrical", quantity: 40, minQuantity: 20, unitCost: 120, monthlyUsage: 35 },
  { id: "7", name: "PVC Pipe 2\"", category: "Plumbing", quantity: 30, minQuantity: 15, unitCost: 450, monthlyUsage: 10 },
  { id: "8", name: "Circuit Breaker 20A", category: "Electrical", quantity: 8, minQuantity: 5, unitCost: 850, monthlyUsage: 3 },
];

export default function AdminInventory() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredInventory = inventory.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const lowStockItems = inventory.filter(i => i.quantity <= i.minQuantity);
  const totalValue = inventory.reduce((sum, i) => sum + (i.quantity * i.unitCost), 0);
  const monthlyUsageValue = inventory.reduce((sum, i) => sum + (i.monthlyUsage * i.unitCost), 0);

  return (
    <AdminLayout userName="Sarah Kimani">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white font-display">
            Inventory Overview
          </h1>
          <p className="text-gray-400 mt-1">Stock levels and usage analytics</p>
        </div>
        <Button variant="secondary" icon={<Download className="w-5 h-5" />}>
          Export Report
        </Button>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card variant="glass" className="bg-gray-800/50 border-gray-700">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Total Items</p>
              <p className="text-3xl font-bold text-white font-display">{inventory.length}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <Package className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </Card>

        <Card variant="glass" className="bg-red-500/10 border-red-500/30">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Low Stock</p>
              <p className="text-3xl font-bold text-red-400 font-display">{lowStockItems.length}</p>
              <p className="text-xs text-red-400 mt-1">Needs restocking</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>
          </div>
        </Card>

        <Card variant="glass" className="bg-gray-800/50 border-gray-700">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Stock Value</p>
              <p className="text-3xl font-bold text-white font-display">
                KES {(totalValue / 1000).toFixed(0)}K
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-emerald-400" />
            </div>
          </div>
        </Card>

        <Card variant="glass" className="bg-gray-800/50 border-gray-700">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Monthly Usage</p>
              <p className="text-3xl font-bold text-white font-display">
                KES {(monthlyUsageValue / 1000).toFixed(0)}K
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Search */}
      <Card variant="glass" padding="sm" className="bg-gray-800/50 border-gray-700 mb-6">
        <Input
          placeholder="Search inventory..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          icon={<Search className="w-5 h-5" />}
          className="bg-gray-900 border-gray-700 text-white placeholder-gray-500"
        />
      </Card>

      {/* Inventory Table */}
      <Card variant="glass" padding="none" className="bg-gray-800/50 border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-900/50 border-b border-gray-700">
              <tr>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Item</th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Category</th>
                <th className="text-right text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Quantity</th>
                <th className="text-right text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Min Level</th>
                <th className="text-right text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Unit Cost</th>
                <th className="text-right text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Monthly Usage</th>
                <th className="text-right text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredInventory.map((item) => {
                const isLowStock = item.quantity <= item.minQuantity;
                
                return (
                  <tr key={item.id} className="hover:bg-gray-900/30">
                    <td className="px-6 py-4">
                      <span className="text-white font-medium">{item.name}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-400">{item.category}</td>
                    <td className="px-6 py-4 text-right">
                      <span className={`font-bold ${isLowStock ? "text-red-400" : "text-white"}`}>
                        {item.quantity}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-gray-400">{item.minQuantity}</td>
                    <td className="px-6 py-4 text-right text-gray-300">
                      KES {item.unitCost.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right text-gray-400">{item.monthlyUsage}</td>
                    <td className="px-6 py-4 text-right">
                      {isLowStock ? (
                        <Badge variant="danger">Low Stock</Badge>
                      ) : (
                        <Badge variant="success">OK</Badge>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </AdminLayout>
  );
}
