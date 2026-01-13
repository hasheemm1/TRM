import { 
  Clock, 
  Search, 
  Filter,
  ArrowDownLeft,
  ArrowUpRight,
  XCircle,
  Calendar
} from "lucide-react";
import { SecurityLayout } from "~/components/layouts";
import { Card, Badge, Input, Select } from "~/components/ui";
import { useState } from "react";

export function meta() {
  return [{ title: "Activity Log - Security Gate | TRM Ops" }];
}

type LogType = "check_in" | "check_out" | "denied";

interface ActivityLog {
  id: string;
  type: LogType;
  visitorName: string;
  company: string;
  tenant: string;
  vehiclePlate?: string;
  timestamp: string;
  guardName: string;
  notes?: string;
}

// Mock activity log
const activityLog: ActivityLog[] = [
  {
    id: "1",
    type: "check_in",
    visitorName: "John Mwangi",
    company: "CoolAir Systems",
    tenant: "Carrefour",
    vehiclePlate: "KBZ 123A",
    timestamp: "2026-01-13T09:15:00",
    guardName: "James Otieno",
  },
  {
    id: "2",
    type: "check_in",
    visitorName: "Grace Akinyi",
    company: "HVAC Masters",
    tenant: "Food Court",
    vehiclePlate: "KCA 456B",
    timestamp: "2026-01-13T10:30:00",
    guardName: "James Otieno",
  },
  {
    id: "3",
    type: "check_out",
    visitorName: "Mary Wanjiku",
    company: "CleanTech Services",
    tenant: "KFC",
    vehiclePlate: "KDD 111D",
    timestamp: "2026-01-13T12:45:00",
    guardName: "Peter Kamau",
  },
  {
    id: "4",
    type: "denied",
    visitorName: "Unknown Person",
    company: "ABC Contractors",
    tenant: "-",
    timestamp: "2026-01-13T11:20:00",
    guardName: "James Otieno",
    notes: "No pre-authorization found",
  },
  {
    id: "5",
    type: "check_in",
    visitorName: "Peter Oduor",
    company: "ElectroPro Ltd",
    tenant: "TRM Management",
    vehiclePlate: "KDD 789C",
    timestamp: "2026-01-13T08:00:00",
    guardName: "Peter Kamau",
  },
  {
    id: "6",
    type: "check_out",
    visitorName: "Samuel Njoroge",
    company: "Lift Masters",
    tenant: "TRM Management",
    vehiclePlate: "KEE 222E",
    timestamp: "2026-01-13T14:00:00",
    guardName: "James Otieno",
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

export default function SecurityLog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const filteredLog = activityLog.filter((log) => {
    const matchesSearch = 
      log.visitorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.tenant.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !typeFilter || log.type === typeFilter;
    return matchesSearch && matchesType;
  });

  // Sort by timestamp (most recent first)
  const sortedLog = [...filteredLog].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <SecurityLayout guardName="James Otieno">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white font-display">
            Activity Log
          </h1>
          <p className="text-gray-400 mt-1">
            Complete record of all gate activities today
          </p>
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <Calendar className="w-5 h-5" />
          <span>January 13, 2026</span>
        </div>
      </div>

      {/* Filters */}
      <Card variant="glass" padding="sm" className="bg-security-surface border-security-border mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search by name, company, or tenant..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="w-5 h-5" />}
              className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
            />
          </div>
          <div className="w-full sm:w-48">
            <Select
              options={filterOptions}
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              icon={<Filter className="w-5 h-5" />}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>
        </div>
      </Card>

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card variant="glass" className="bg-emerald-500/10 border-emerald-500/30">
          <div className="flex items-center gap-3">
            <ArrowDownLeft className="w-8 h-8 text-emerald-400" />
            <div>
              <p className="text-2xl font-bold text-emerald-400 font-display">
                {activityLog.filter(l => l.type === "check_in").length}
              </p>
              <p className="text-sm text-emerald-300">Check Ins</p>
            </div>
          </div>
        </Card>
        <Card variant="glass" className="bg-cyan-500/10 border-cyan-500/30">
          <div className="flex items-center gap-3">
            <ArrowUpRight className="w-8 h-8 text-cyan-400" />
            <div>
              <p className="text-2xl font-bold text-cyan-400 font-display">
                {activityLog.filter(l => l.type === "check_out").length}
              </p>
              <p className="text-sm text-cyan-300">Check Outs</p>
            </div>
          </div>
        </Card>
        <Card variant="glass" className="bg-red-500/10 border-red-500/30">
          <div className="flex items-center gap-3">
            <XCircle className="w-8 h-8 text-red-400" />
            <div>
              <p className="text-2xl font-bold text-red-400 font-display">
                {activityLog.filter(l => l.type === "denied").length}
              </p>
              <p className="text-sm text-red-300">Denied</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Activity Timeline */}
      <div className="space-y-3">
        {sortedLog.map((log) => {
          const config = typeConfig[log.type];
          const Icon = config.icon;
          const time = new Date(log.timestamp).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          });

          return (
            <Card 
              key={log.id} 
              variant="glass" 
              padding="sm"
              className="bg-security-surface border-security-border"
            >
              <div className="flex items-center gap-4">
                {/* Time */}
                <div className="w-16 flex-shrink-0 text-center">
                  <p className="text-lg font-semibold text-white font-mono">{time}</p>
                </div>

                {/* Icon */}
                <div className={`w-10 h-10 rounded-xl ${config.bgColor} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-5 h-5 ${config.textColor}`} />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-white">{log.visitorName}</span>
                    <Badge variant={config.color} size="sm">{config.label}</Badge>
                  </div>
                  <p className="text-sm text-gray-400">
                    {log.company} • {log.tenant}
                    {log.vehiclePlate && ` • ${log.vehiclePlate}`}
                  </p>
                  {log.notes && (
                    <p className="text-sm text-red-400 mt-1">Note: {log.notes}</p>
                  )}
                </div>

                {/* Guard */}
                <div className="text-right text-sm text-gray-500 flex-shrink-0 hidden sm:block">
                  <p>by {log.guardName}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {sortedLog.length === 0 && (
        <Card variant="glass" className="bg-security-surface border-security-border text-center py-12">
          <Clock className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No activities found</h3>
          <p className="text-gray-400">Try adjusting your search or filter</p>
        </Card>
      )}
    </SecurityLayout>
  );
}
