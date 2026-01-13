import { Link } from "react-router";
import { 
  Plus, 
  Search, 
  Filter, 
  Wrench,
  Clock,
  User,
  MapPin
} from "lucide-react";
import { OpsLayout } from "~/components/layouts";
import { Card, Badge, Button, Input, Select } from "~/components/ui";
import { useState } from "react";

export function meta() {
  return [{ title: "Jobs - Operations | TRM Ops" }];
}

// Mock data
const jobs = [
  {
    id: "1",
    title: "Lift B - Mechanical Failure",
    description: "Main passenger lift not responding to floor calls",
    location: "Main Entrance",
    type: "external_contractor" as const,
    status: "in_progress" as const,
    priority: "critical" as const,
    assignedTo: "Lift Master Ltd",
    quoteAmount: 85000,
    createdAt: "2026-01-12",
  },
  {
    id: "2",
    title: "HVAC Unit 3 - Not Cooling",
    description: "Food court area not reaching desired temperature",
    location: "Level 3 - Food Court",
    type: "external_contractor" as const,
    status: "quote_received" as const,
    priority: "high" as const,
    assignedTo: "CoolAir Systems",
    quoteAmount: 45000,
    createdAt: "2026-01-11",
  },
  {
    id: "3",
    title: "Parking Lot Lights - Section C",
    description: "Multiple light fixtures not working",
    location: "Basement Level 2",
    type: "external_contractor" as const,
    status: "pending_certification" as const,
    priority: "medium" as const,
    assignedTo: "ElectroPro Ltd",
    quoteAmount: 28000,
    createdAt: "2026-01-10",
  },
  {
    id: "4",
    title: "Broken Door Handle - 2nd Floor WC",
    description: "Handle loose and needs replacement",
    location: "Level 2 - Washroom",
    type: "internal" as const,
    status: "open" as const,
    priority: "low" as const,
    assignedTo: "John Operative",
    createdAt: "2026-01-13",
  },
  {
    id: "5",
    title: "Water Leak - Ceiling Tiles",
    description: "Suspected pipe leak causing water damage",
    location: "Level 1 - Near Carrefour",
    type: "internal" as const,
    status: "in_progress" as const,
    priority: "high" as const,
    assignedTo: "Peter Operative",
    createdAt: "2026-01-13",
  },
];

const statusColors = {
  open: "default",
  quote_requested: "info",
  quote_received: "purple",
  approved: "success",
  in_progress: "warning",
  pending_certification: "info",
  certified: "success",
  closed: "default",
} as const;

const priorityColors = {
  low: "default",
  medium: "info",
  high: "warning",
  critical: "danger",
} as const;

const statusOptions = [
  { value: "", label: "All Statuses" },
  { value: "open", label: "Open" },
  { value: "in_progress", label: "In Progress" },
  { value: "quote_received", label: "Quote Received" },
  { value: "pending_certification", label: "Pending Certification" },
  { value: "closed", label: "Closed" },
];

const priorityOptions = [
  { value: "", label: "All Priorities" },
  { value: "critical", label: "Critical" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

export default function OpsJobs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.assignedTo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || job.status === statusFilter;
    const matchesPriority = !priorityFilter || job.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <OpsLayout userName="Daniel Kipchoge" userRole="facility_manager">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-display">
            Work Orders
          </h1>
          <p className="text-gray-500 mt-1">Manage all maintenance jobs and repairs</p>
        </div>
        <Link to="/ops/jobs/new">
          <Button icon={<Plus className="w-5 h-5" />}>
            New Job
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card variant="bordered" padding="sm" className="mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="w-5 h-5" />}
            />
          </div>
          <div className="flex gap-4">
            <div className="w-full lg:w-44">
              <Select
                options={statusOptions}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              />
            </div>
            <div className="w-full lg:w-40">
              <Select
                options={priorityOptions}
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Results count */}
      <p className="text-sm text-gray-500 mb-4">
        Showing {filteredJobs.length} of {jobs.length} jobs
      </p>

      {/* Jobs List */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <Link key={job.id} to={`/ops/jobs/${job.id}`}>
            <Card 
              variant="bordered" 
              hover
              className="overflow-hidden"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                {/* Priority indicator */}
                <div className={`w-full lg:w-1 lg:h-20 lg:rounded-full ${
                  job.priority === "critical" ? "bg-red-500" :
                  job.priority === "high" ? "bg-amber-500" :
                  job.priority === "medium" ? "bg-blue-500" :
                  "bg-gray-300"
                } lg:flex-shrink-0`} />

              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-trm-red/10 flex items-center justify-center flex-shrink-0">
                <Wrench className="w-7 h-7 text-trm-red" />
              </div>

                {/* Main Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                    <div className="flex gap-2 flex-shrink-0">
                      <Badge variant={priorityColors[job.priority]} size="sm">
                        {job.priority}
                      </Badge>
                      <Badge variant={statusColors[job.status]}>
                        {job.status.replace(/_/g, " ")}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm mb-3 line-clamp-1">{job.description}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <User className="w-4 h-4" />
                      {job.assignedTo}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      {job.createdAt}
                    </span>
                    {job.quoteAmount && (
                      <span className="font-medium text-gray-700">
                        KES {job.quoteAmount.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <Card variant="bordered" className="text-center py-16">
          <Wrench className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs found</h3>
          <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
          <Link to="/ops/jobs/new">
            <Button icon={<Plus className="w-5 h-5" />}>
              Create New Job
            </Button>
          </Link>
        </Card>
      )}
    </OpsLayout>
  );
}
