import { 
  Package, 
  Search, 
  Filter,
  AlertTriangle,
  Barcode,
  Plus,
  Minus
} from "lucide-react";
import { OpsLayout } from "~/components/layouts";
import { Card, Badge, Button, Input, Select } from "~/components/ui";
import { useState } from "react";

export function meta() {
  return [{ title: "Inventory - Operations | TRM Ops" }];
}

interface InventoryItem {
  id: string;
  name: string;
  barcode: string;
  category: string;
  quantity: number;
  minQuantity: number;
  unitCost: number;
  location: string;
}

// Mock inventory
const inventory: InventoryItem[] = [
  {
    id: "1",
    name: "LED Bulb 60W",
    barcode: "TRM-LED-001",
    category: "Electrical",
    quantity: 5,
    minQuantity: 20,
    unitCost: 350,
    location: "Store A - Shelf 1",
  },
  {
    id: "2",
    name: "Chrome Door Handle",
    barcode: "TRM-HDL-002",
    category: "Hardware",
    quantity: 2,
    minQuantity: 10,
    unitCost: 1500,
    location: "Store A - Shelf 3",
  },
  {
    id: "3",
    name: "Water Filter Cartridge",
    barcode: "TRM-FLT-003",
    category: "Plumbing",
    quantity: 3,
    minQuantity: 8,
    unitCost: 2500,
    location: "Store B - Shelf 2",
  },
  {
    id: "4",
    name: "AC Filter 24x24",
    barcode: "TRM-ACF-004",
    category: "HVAC",
    quantity: 15,
    minQuantity: 10,
    unitCost: 800,
    location: "Store B - Shelf 4",
  },
  {
    id: "5",
    name: "Faucet Washer Kit",
    barcode: "TRM-PLM-005",
    category: "Plumbing",
    quantity: 25,
    minQuantity: 15,
    unitCost: 150,
    location: "Store A - Shelf 2",
  },
  {
    id: "6",
    name: "Electrical Tape",
    barcode: "TRM-ELC-006",
    category: "Electrical",
    quantity: 40,
    minQuantity: 20,
    unitCost: 120,
    location: "Store A - Shelf 1",
  },
];

const categoryOptions = [
  { value: "", label: "All Categories" },
  { value: "Electrical", label: "Electrical" },
  { value: "Hardware", label: "Hardware" },
  { value: "Plumbing", label: "Plumbing" },
  { value: "HVAC", label: "HVAC" },
];

export default function OpsInventory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [showLowStockOnly, setShowLowStockOnly] = useState(false);
  const [scanMode, setScanMode] = useState(false);

  const filteredInventory = inventory.filter((item) => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.barcode.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !categoryFilter || item.category === categoryFilter;
    const matchesLowStock = !showLowStockOnly || item.quantity <= item.minQuantity;
    return matchesSearch && matchesCategory && matchesLowStock;
  });

  const lowStockCount = inventory.filter(i => i.quantity <= i.minQuantity).length;

  const handleCheckout = (itemId: string) => {
    alert(`Item ${itemId} checked out. Quantity updated.`);
  };

  return (
    <OpsLayout userName="John Kamau" userRole="maintenance_operative">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-display">
            Inventory
          </h1>
          <p className="text-gray-500 mt-1">Manage and checkout stock items</p>
        </div>
        <Button
          variant={scanMode ? "primary" : "outline"}
          onClick={() => setScanMode(!scanMode)}
          icon={<Barcode className="w-5 h-5" />}
        >
          {scanMode ? "Scanning..." : "Scan Barcode"}
        </Button>
      </div>

      {/* Scan Mode */}
      {scanMode && (
        <Card variant="bordered" className="mb-6 border-trm-red bg-trm-red/5">
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-2xl bg-trm-red/20 flex items-center justify-center mx-auto mb-4">
              <Barcode className="w-10 h-10 text-trm-red" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Ready to Scan
            </h3>
            <p className="text-gray-500 mb-4">
              Point your device camera at a barcode to check out an item
            </p>
            <Input
              placeholder="Or enter barcode manually..."
              className="max-w-md mx-auto"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  alert(`Searching for barcode: ${(e.target as HTMLInputElement).value}`);
                }
              }}
            />
          </div>
        </Card>
      )}

      {/* Low Stock Alert */}
      {lowStockCount > 0 && (
        <Card variant="bordered" className="mb-6 border-red-200 bg-red-50/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-red-700">Low Stock Alert</h3>
              <p className="text-sm text-red-600">
                {lowStockCount} item{lowStockCount > 1 ? "s" : ""} below minimum stock level
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowLowStockOnly(!showLowStockOnly)}
            >
              {showLowStockOnly ? "Show All" : "Show Low Stock"}
            </Button>
          </div>
        </Card>
      )}

      {/* Filters */}
      <Card variant="bordered" padding="sm" className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search by name or barcode..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="w-5 h-5" />}
            />
          </div>
          <div className="w-full sm:w-48">
            <Select
              options={categoryOptions}
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              icon={<Filter className="w-5 h-5" />}
            />
          </div>
        </div>
      </Card>

      {/* Inventory Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredInventory.map((item) => {
          const isLowStock = item.quantity <= item.minQuantity;
          
          return (
            <Card 
              key={item.id} 
              variant="bordered"
              className={isLowStock ? "border-red-200 bg-red-50/30" : ""}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                  <Package className="w-6 h-6 text-gray-500" />
                </div>
                {isLowStock && (
                  <Badge variant="danger" size="sm">Low Stock</Badge>
                )}
              </div>

              <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{item.category}</p>
              <p className="text-xs text-gray-400 font-mono mb-4">{item.barcode}</p>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-2xl font-bold text-gray-900 font-display">
                    {item.quantity}
                  </p>
                  <p className="text-xs text-gray-500">
                    Min: {item.minQuantity}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    KES {item.unitCost}
                  </p>
                  <p className="text-xs text-gray-500">per unit</p>
                </div>
              </div>

              <p className="text-xs text-gray-400 mb-4">{item.location}</p>

              <div className="flex gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleCheckout(item.id)}
                  icon={<Minus className="w-4 h-4" />}
                >
                  Checkout
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredInventory.length === 0 && (
        <Card variant="bordered" className="text-center py-16">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No items found</h3>
          <p className="text-gray-500">Try adjusting your search or filter</p>
        </Card>
      )}
    </OpsLayout>
  );
}
