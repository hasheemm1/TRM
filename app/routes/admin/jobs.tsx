import { Link } from "react-router";
import { 
  Search, 
  Filter,
  Download,
  Wrench,
  DollarSign,
  CheckCircle2,
  Clock
} from "lucide-react";
import { AdminLayout } from "~/components/layouts";
import { Card, Badge, Input, Select, Button } from "~/components/ui";
import { useState } from "react";

export function meta() {
  return [{ title: "Work Orders - Admin Dashboard | TRM Ops" }];
}

// Mock jobs data
const jobs = [
  {
    id: "1",
    title: "Lift B - Mechanical Failure",
    location: "Main Entrance",
    type: "external_contractor",
    status: "in_progress",
    priority: "critical",
    vendor: "Lift Master Ltd",
    quoteAmount: 85000,
    lpoNumber: "LPO-2026-0042",
    createdAt: "2026-01-12",
    createdBy: "Daniel Kipchoge",
  },
  {
    id: "2",
    title: "HVAC Unit 3 - Not Cooling",
    location: "Level 3 - Food Court",
    type: "external_contractor",
    status: "quote_received",
    priority: "high",
    vendor: "CoolAir Systems",
    quoteAmount: 45000,
    createdAt: "2026-01-11",
    createdBy: "Daniel Kipchoge",
  },
  {
    id: "3",
    title: "Parking Lot Lights - Section C",
    location: "Basement Level 2",
    type: "external_contractor",
    status: "pending_certification",
    priority: "medium",
    vendor: "ElectroPro Ltd",
    quoteAmount: 28000,
    lpoNumber: "LPO-2026-0039",
    createdAt: "2026-01-10",
    createdBy: "Daniel Kipchoge",
  },
  {
    id: "4",
    title: "Broken Door Handle",
    location: "Level 2 - Washroom",
    type: "internal",
    status: "completed",
    priority: "low",
    assignee: "John Kamau",
    inventoryCost: 1500,
    createdAt: "2026-01-13",
    createdBy: "Daniel Kipchoge",
  },
  {
    id: "5",
    title: "Water Leak - Ceiling",
    location: "Level 1 - Near Carrefour",
    type: "internal",
    status: "in_progress",
    priority: "high",
    assignee: "Peter Ochieng",
    createdAt: "2026-01-13",
    createdBy: "Daniel Kipchoge",
  },
];

const statusColors: Record<string, "default" | "info" | "success" | "warning" | "danger" | "purple"> = {
  open: "default",
  quote_requested: "info",
  quote_received: "purple",
  approved: "success",
  in_progress: "warning",
  pending_certification: "info",
  completed: "success",
  certified: "success",
  closed: "default",
};

const priorityColors: Record<string, "default" | "info" | "warning" | "danger"> = {
  low: "default",
  medium: "info",
  high: "warning",
  critical: "danger",
};

const statusOptions = [
  { value: "", label: "All Statuses" },
  { value: "open", label: "Open" },
  { value: "in_progress", label: "In Progress" },
  { value: "quote_received", label: "Quote Received" },
  { value: "pending_certification", label: "Pending Certification" },
  { value: "completed", label: "Completed" },
];

const typeOptions = [
  { value: "", label: "All Types" },
  { value: "internal", label: "Internal" },
  { value: "external_contractor", label: "External Contractor" },
];

export default function AdminJobs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || job.status === statusFilter;
    const matchesType = !typeFilter || job.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const totalLpoValue = jobs
    .filter(j => j.lpoNumber)
    .reduce((sum, j) => sum + (j.quoteAmount || 0), 0);

  return (
    <AdminLayout userName="Sarah Kimani">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white font-display">
            Work Orders
          </h1>
          <p className="text-gray-400 mt-1">
            All maintenance jobs and repairs
          </p>
        </div>
        <Button variant="secondary" icon={<Download className="w-5 h-5" />}>
          Export Report
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card variant="glass" className="bg-gray-800/50 border-gray-700 text-center py-4">
          <p className="text-2xl font-bold text-white font-display">{jobs.length}</p>
          <p className="text-sm text-gray-400">Total Jobs</p>
        </Card>
        <Card variant="glass" className="bg-amber-500/10 border-amber-500/30 text-center py-4">
          <p className="text-2xl font-bold text-amber-400 font-display">
            {jobs.filter(j => j.status === "in_progress").length}
          </p>
          <p className="text-sm text-gray-400">In Progress</p>
        </Card>
        <Card variant="glass" className="bg-purple-500/10 border-purple-500/30 text-center py-4">
          <p className="text-2xl font-bold text-purple-400 font-display">
            {jobs.filter(j => j.status === "quote_received").length}
          </p>
          <p className="text-sm text-gray-400">Pending Approval</p>
        </Card>
        <Card variant="glass" className="bg-emerald-500/10 border-emerald-500/30 text-center py-4">
          <p className="text-2xl font-bold text-emerald-400 font-display">
            KES {(totalLpoValue / 1000).toFixed(0)}K
          </p>
          <p className="text-sm text-gray-400">LPO Value (MTD)</p>
        </Card>
      </div>

      {/* Filters */}
      <Card variant="glass" padding="sm" className="bg-gray-800/50 border-gray-700 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="w-5 h-5" />}
              className="bg-gray-900 border-gray-700 text-white placeholder-gray-500"
            />
          </div>
          <div className="flex gap-4">
            <div className="w-full lg:w-44">
              <Select
                options={statusOptions}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>
            <div className="w-full lg:w-44">
              <Select
                options={typeOptions}
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Jobs List */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <Card 
            key={job.id} 
            variant="glass" 
            className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors cursor-pointer"
          >
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              {/* Priority indicator */}
              <div className={`hidden lg:block w-1 h-16 rounded-full flex-shrink-0 ${
                job.priority === "critical" ? "bg-red-500" :
                job.priority === "high" ? "bg-amber-500" :
                job.priority === "medium" ? "bg-blue-500" :
                "bg-gray-500"
              }`} />

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-trm-red/20 flex items-center justify-center flex-shrink-0">
                <Wrench className="w-6 h-6 text-trm-red" />
              </div>

              {/* Main Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="text-lg font-semibold text-white">{job.title}</h3>
                  <div className="flex gap-2 flex-shrink-0">
                    <Badge variant={priorityColors[job.priority]} size="sm">
                      {job.priority}
                    </Badge>
                    <Badge variant={statusColors[job.status]}>
                      {job.status.replace(/_/g, " ")}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                  <span>{job.location}</span>
                  <span>•</span>
                  <span>{job.type === "internal" ? job.assignee : job.vendor}</span>
                  <span>•</span>
                  <span>{job.createdAt}</span>
                  {job.lpoNumber && (
                    <>
                      <span>•</span>
                      <span className="text-trm-red font-mono">{job.lpoNumber}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Cost */}
              {(job.quoteAmount || job.inventoryCost) && (
                <div className="text-right flex-shrink-0">
                  <p className="text-lg font-bold text-white font-display">
                    KES {(job.quoteAmount || job.inventoryCost || 0).toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">
                    {job.type === "internal" ? "Inventory Cost" : "Quote Amount"}
                  </p>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </AdminLayout>
  );
}
