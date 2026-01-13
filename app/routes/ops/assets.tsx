import { Link } from "react-router";
import { 
  Wrench, 
  Search, 
  Filter,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Calendar,
  History
} from "lucide-react";
import { OpsLayout } from "~/components/layouts";
import { Card, Badge, Input, Select } from "~/components/ui";
import { useState } from "react";

export function meta() {
  return [{ title: "Assets - Operations | TRM Ops" }];
}

interface Asset {
  id: string;
  name: string;
  type: string;
  location: string;
  serialNumber: string;
  status: "operational" | "maintenance" | "out_of_service";
  lastServiceDate: string;
  nextServiceDate: string;
  jobCount: number;
}

// Mock assets
const assets: Asset[] = [
  {
    id: "lift-a",
    name: "Lift A",
    type: "Elevator",
    location: "Main Entrance - East",
    serialNumber: "OTIS-2020-001",
    status: "operational",
    lastServiceDate: "2026-01-05",
    nextServiceDate: "2026-04-05",
    jobCount: 3,
  },
  {
    id: "lift-b",
    name: "Lift B",
    type: "Elevator",
    location: "Main Entrance - West",
    serialNumber: "OTIS-2020-002",
    status: "maintenance",
    lastServiceDate: "2025-12-15",
    nextServiceDate: "2026-01-20",
    jobCount: 5,
  },
  {
    id: "hvac-1",
    name: "HVAC Unit 1",
    type: "Air Conditioning",
    location: "Level 1 - Plant Room",
    serialNumber: "DAIKIN-AC-001",
    status: "operational",
    lastServiceDate: "2026-01-10",
    nextServiceDate: "2026-04-10",
    jobCount: 2,
  },
  {
    id: "hvac-2",
    name: "HVAC Unit 2",
    type: "Air Conditioning",
    location: "Level 2 - Plant Room",
    serialNumber: "DAIKIN-AC-002",
    status: "operational",
    lastServiceDate: "2026-01-10",
    nextServiceDate: "2026-04-10",
    jobCount: 1,
  },
  {
    id: "hvac-3",
    name: "HVAC Unit 3",
    type: "Air Conditioning",
    location: "Level 3 - Plant Room",
    serialNumber: "DAIKIN-AC-003",
    status: "maintenance",
    lastServiceDate: "2025-11-20",
    nextServiceDate: "2026-01-15",
    jobCount: 4,
  },
  {
    id: "generator-1",
    name: "Generator 1",
    type: "Power Backup",
    location: "Basement Level 2",
    serialNumber: "CAT-GEN-001",
    status: "operational",
    lastServiceDate: "2025-12-01",
    nextServiceDate: "2026-03-01",
    jobCount: 2,
  },
  {
    id: "generator-2",
    name: "Generator 2",
    type: "Power Backup",
    location: "Basement Level 2",
    serialNumber: "CAT-GEN-002",
    status: "out_of_service",
    lastServiceDate: "2025-10-15",
    nextServiceDate: "Pending Repair",
    jobCount: 7,
  },
];

const statusConfig = {
  operational: { 
    label: "Operational", 
    color: "success" as const,
    icon: CheckCircle2,
    bgColor: "bg-emerald-100",
    textColor: "text-emerald-600"
  },
  maintenance: { 
    label: "Maintenance", 
    color: "warning" as const,
    icon: Wrench,
    bgColor: "bg-amber-100",
    textColor: "text-amber-600"
  },
  out_of_service: { 
    label: "Out of Service", 
    color: "danger" as const,
    icon: XCircle,
    bgColor: "bg-red-100",
    textColor: "text-red-600"
  },
};

const typeOptions = [
  { value: "", label: "All Types" },
  { value: "Elevator", label: "Elevator" },
  { value: "Air Conditioning", label: "Air Conditioning" },
  { value: "Power Backup", label: "Power Backup" },
];

const statusOptions = [
  { value: "", label: "All Statuses" },
  { value: "operational", label: "Operational" },
  { value: "maintenance", label: "Maintenance" },
  { value: "out_of_service", label: "Out of Service" },
];

export default function OpsAssets() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch = 
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.serialNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !typeFilter || asset.type === typeFilter;
    const matchesStatus = !statusFilter || asset.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  // Summary stats
  const operationalCount = assets.filter(a => a.status === "operational").length;
  const maintenanceCount = assets.filter(a => a.status === "maintenance").length;
  const outOfServiceCount = assets.filter(a => a.status === "out_of_service").length;

  return (
    <OpsLayout userName="Daniel Kipchoge" userRole="facility_manager">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-display">
          Asset Register
        </h1>
        <p className="text-gray-500 mt-1">Track and manage facility assets</p>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <Card variant="bordered" className="border-emerald-200 bg-emerald-50/50">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-8 h-8 text-emerald-500" />
            <div>
              <p className="text-2xl font-bold text-emerald-600 font-display">{operationalCount}</p>
              <p className="text-sm text-gray-500">Operational</p>
            </div>
          </div>
        </Card>
        <Card variant="bordered" className="border-amber-200 bg-amber-50/50">
          <div className="flex items-center gap-3">
            <Wrench className="w-8 h-8 text-amber-500" />
            <div>
              <p className="text-2xl font-bold text-amber-600 font-display">{maintenanceCount}</p>
              <p className="text-sm text-gray-500">Maintenance</p>
            </div>
          </div>
        </Card>
        <Card variant="bordered" className="border-red-200 bg-red-50/50">
          <div className="flex items-center gap-3">
            <XCircle className="w-8 h-8 text-red-500" />
            <div>
              <p className="text-2xl font-bold text-red-600 font-display">{outOfServiceCount}</p>
              <p className="text-sm text-gray-500">Out of Service</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card variant="bordered" padding="sm" className="mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search assets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="w-5 h-5" />}
            />
          </div>
          <div className="flex gap-4">
            <div className="w-full lg:w-44">
              <Select
                options={typeOptions}
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              />
            </div>
            <div className="w-full lg:w-44">
              <Select
                options={statusOptions}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Assets Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAssets.map((asset) => {
          const config = statusConfig[asset.status];
          const StatusIcon = config.icon;
          
          return (
            <Card 
              key={asset.id} 
              variant="bordered"
              hover
              className="cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl ${config.bgColor} flex items-center justify-center`}>
                  <StatusIcon className={`w-6 h-6 ${config.textColor}`} />
                </div>
                <Badge variant={config.color}>{config.label}</Badge>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-1">{asset.name}</h3>
              <p className="text-sm text-gray-500 mb-1">{asset.type}</p>
              <p className="text-sm text-gray-400 mb-4">{asset.location}</p>

              <div className="text-xs text-gray-400 font-mono mb-4">
                S/N: {asset.serialNumber}
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Last Service
                  </span>
                  <span className="font-medium text-gray-700">{asset.lastServiceDate}</span>
                </div>
                <div className="flex items-center justify-between text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Next Service
                  </span>
                  <span className={`font-medium ${
                    asset.status === "out_of_service" ? "text-red-600" : "text-gray-700"
                  }`}>
                    {asset.nextServiceDate}
                  </span>
                </div>
                <div className="flex items-center justify-between text-gray-500">
                  <span className="flex items-center gap-1">
                    <History className="w-4 h-4" />
                    Job History
                  </span>
                  <span className="font-medium text-gray-700">{asset.jobCount} jobs</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredAssets.length === 0 && (
        <Card variant="bordered" className="text-center py-16">
          <Wrench className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No assets found</h3>
          <p className="text-gray-500">Try adjusting your search or filter</p>
        </Card>
      )}
    </OpsLayout>
  );
}
