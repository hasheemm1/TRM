import { 
  Search, 
  Filter,
  ArrowDownLeft,
  ArrowUpRight,
  XCircle,
  Download,
  Calendar
} from "lucide-react";
import { AdminLayout } from "~/components/layouts";
import { Card, Badge, Input, Select, Button } from "~/components/ui";
import { useState } from "react";

export function meta() {
  return [{ title: "Gate Log - Admin Dashboard | TRM Ops" }];
}

// Mock comprehensive gate log
const gateLog = [
  {
    id: "1",
    type: "check_in" as const,
    visitorName: "John Mwangi",
    company: "CoolAir Systems",
    tenant: "Carrefour",
    purpose: "Freezer Repair",
    vehiclePlate: "KBZ 123A",
    teamSize: 3,
    timestamp: "2026-01-13T09:15:00",
    guardName: "James Otieno",
    status: "on_site" as const,
  },
  {
    id: "2",
    type: "check_in" as const,
    visitorName: "Grace Akinyi",
    company: "HVAC Masters",
    tenant: "Food Court",
    purpose: "AC Maintenance",
    vehiclePlate: "KCA 456B",
    teamSize: 2,
    timestamp: "2026-01-13T10:30:00",
    guardName: "James Otieno",
    status: "on_site" as const,
  },
  {
    id: "3",
    type: "check_out" as const,
    visitorName: "Mary Wanjiku",
    company: "CleanTech Services",
    tenant: "KFC",
    purpose: "Deep Cleaning",
    vehiclePlate: "KDD 111D",
    teamSize: 5,
    timestamp: "2026-01-13T12:45:00",
    guardName: "Peter Kamau",
    duration: "4h 15m",
    status: "departed" as const,
  },
  {
    id: "4",
    type: "denied" as const,
    visitorName: "Unknown Person",
    company: "ABC Contractors",
    tenant: "-",
    purpose: "Claimed: Electrical Work",
    vehiclePlate: "KFF 999Z",
    teamSize: 1,
    timestamp: "2026-01-13T11:20:00",
    guardName: "James Otieno",
    reason: "No pre-authorization found",
    status: "denied" as const,
  },
  {
    id: "5",
    type: "check_out" as const,
    visitorName: "Samuel Njoroge",
    company: "Lift Masters",
    tenant: "TRM Management",
    purpose: "Lift Inspection",
    vehiclePlate: "KEE 222E",
    teamSize: 2,
    timestamp: "2026-01-13T14:00:00",
    guardName: "James Otieno",
    duration: "6h 30m",
    status: "departed" as const,
  },
];

const typeConfig = {
  check_in: { 
    icon: ArrowDownLeft, 
    label: "Check In", 
    color: "success" as const,
    bgColor: "bg-emerald-500/20",
    textColor: "text-emerald-400"
  },
  check_out: { 
    icon: ArrowUpRight, 
    label: "Check Out", 
    color: "info" as const,
    bgColor: "bg-cyan-500/20",
    textColor: "text-cyan-400"
  },
  denied: { 
    icon: XCircle, 
    label: "Denied", 
    color: "danger" as const,
    bgColor: "bg-red-500/20",
    textColor: "text-red-400"
  },
};

const filterOptions = [
  { value: "", label: "All Activities" },
  { value: "check_in", label: "Check Ins" },
  { value: "check_out", label: "Check Outs" },
  { value: "denied", label: "Denied" },
];

const tenantOptions = [
  { value: "", label: "All Tenants" },
  { value: "Carrefour", label: "Carrefour" },
  { value: "KFC", label: "KFC" },
  { value: "Food Court", label: "Food Court" },
  { value: "TRM Management", label: "TRM Management" },
];

export default function AdminVisitors() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [tenantFilter, setTenantFilter] = useState("");

  const filteredLog = gateLog.filter((log) => {
    const matchesSearch = 
      log.visitorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.vehiclePlate?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !typeFilter || log.type === typeFilter;
    const matchesTenant = !tenantFilter || log.tenant === tenantFilter;
    return matchesSearch && matchesType && matchesTenant;
  });

  return (
    <AdminLayout userName="Sarah Kimani">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white font-display">
            Gate Log
          </h1>
          <p className="text-gray-400 mt-1">
            Complete record of all site access
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="ghost" icon={<Calendar className="w-5 h-5" />}>
            Date Range
          </Button>
          <Button variant="primary" icon={<Download className="w-5 h-5" />}>
            Export
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card variant="glass" className="bg-emerald-500/10 border-emerald-500/30 text-center py-4">
          <p className="text-2xl font-bold text-emerald-400 font-display">
            {gateLog.filter(l => l.type === "check_in").length}
          </p>
          <p className="text-sm text-gray-400">Check Ins</p>
        </Card>
        <Card variant="glass" className="bg-cyan-500/10 border-cyan-500/30 text-center py-4">
          <p className="text-2xl font-bold text-cyan-400 font-display">
            {gateLog.filter(l => l.type === "check_out").length}
          </p>
          <p className="text-sm text-gray-400">Check Outs</p>
        </Card>
        <Card variant="glass" className="bg-red-500/10 border-red-500/30 text-center py-4">
          <p className="text-2xl font-bold text-red-400 font-display">
            {gateLog.filter(l => l.type === "denied").length}
          </p>
          <p className="text-sm text-gray-400">Denied</p>
        </Card>
        <Card variant="glass" className="bg-purple-500/10 border-purple-500/30 text-center py-4">
          <p className="text-2xl font-bold text-purple-400 font-display">
            {gateLog.filter(l => l.status === "on_site").length}
          </p>
          <p className="text-sm text-gray-400">Currently On-Site</p>
        </Card>
      </div>

      {/* Filters */}
      <Card variant="glass" padding="sm" className="bg-gray-800/50 border-gray-700 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search by name, company, or plate..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="w-5 h-5" />}
              className="bg-gray-900 border-gray-700 text-white placeholder-gray-500"
            />
          </div>
          <div className="flex gap-4">
            <div className="w-full lg:w-44">
              <Select
                options={filterOptions}
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>
            <div className="w-full lg:w-44">
              <Select
                options={tenantOptions}
                value={tenantFilter}
                onChange={(e) => setTenantFilter(e.target.value)}
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Log Table */}
      <Card variant="glass" padding="none" className="bg-gray-800/50 border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-900/50 border-b border-gray-700">
              <tr>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Time</th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Type</th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Visitor</th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Tenant</th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Purpose</th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Vehicle</th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Guard</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredLog.map((log) => {
                const config = typeConfig[log.type];
                const Icon = config.icon;
                const time = new Date(log.timestamp).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                });

                return (
                  <tr key={log.id} className="hover:bg-gray-900/30">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-white font-mono">{time}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-lg ${config.bgColor} flex items-center justify-center`}>
                          <Icon className={`w-4 h-4 ${config.textColor}`} />
                        </div>
                        <Badge variant={config.color} size="sm">{config.label}</Badge>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-white font-medium">{log.visitorName}</p>
                      <p className="text-sm text-gray-500">{log.company}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                      {log.tenant}
                    </td>
                    <td className="px-6 py-4 text-gray-300 max-w-[200px] truncate">
                      {log.purpose}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-gray-300 font-mono text-sm">{log.vehiclePlate}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-400">
                      {log.guardName}
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
