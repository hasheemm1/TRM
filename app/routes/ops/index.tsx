import { Link } from "react-router";
import { 
  ClipboardList, 
  Package, 
  Wrench, 
  Clock,
  Plus,
  ArrowUpRight,
  AlertTriangle,
  CheckCircle2,
  TrendingUp
} from "lucide-react";
import { OpsLayout } from "~/components/layouts";
import { Card, CardHeader, Badge, Button } from "~/components/ui";

export function meta() {
  return [{ title: "Dashboard - Operations | TRM Ops" }];
}

// Mock data
const recentJobs = [
  {
    id: "1",
    title: "Lift B - Mechanical Failure",
    location: "Main Entrance",
    status: "in_progress" as const,
    priority: "critical" as const,
    assignedTo: "Lift Master Ltd",
    createdAt: "2026-01-12",
  },
  {
    id: "2",
    title: "HVAC Unit 3 - Not Cooling",
    location: "Level 3 - Food Court",
    status: "quote_received" as const,
    priority: "high" as const,
    assignedTo: "CoolAir Systems",
    createdAt: "2026-01-11",
  },
  {
    id: "3",
    title: "Parking Lot Lights - Section C",
    location: "Basement Level 2",
    status: "pending_certification" as const,
    priority: "medium" as const,
    assignedTo: "ElectroPro Ltd",
    createdAt: "2026-01-10",
  },
];

const lowStockItems = [
  { id: "1", name: "LED Bulbs (60W)", current: 5, minimum: 20 },
  { id: "2", name: "Chrome Door Handles", current: 2, minimum: 10 },
  { id: "3", name: "Water Filters", current: 3, minimum: 8 },
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

export default function OpsDashboard() {
  return (
    <OpsLayout userName="Daniel Kipchoge" userRole="facility_manager">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-display">
            Operations Dashboard
          </h1>
          <p className="text-gray-500 mt-1">Overview of maintenance and facility operations</p>
        </div>
        <Link to="/ops/jobs/new">
          <Button icon={<Plus className="w-5 h-5" />}>
            New Job
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { 
            label: "Active Jobs", 
            value: "12", 
            icon: ClipboardList, 
            color: "bg-trm-accent",
            trend: "+3 this week",
            trendUp: true
          },
          { 
            label: "Pending Approval", 
            value: "4", 
            icon: Clock, 
            color: "bg-amber-500",
            trend: "Quotes received",
            trendUp: false
          },
          { 
            label: "Completed MTD", 
            value: "38", 
            icon: CheckCircle2, 
            color: "bg-emerald-500",
            trend: "+15% vs last month",
            trendUp: true
          },
          { 
            label: "Low Stock Items", 
            value: "5", 
            icon: AlertTriangle, 
            color: "bg-red-500",
            trend: "Needs attention",
            trendUp: false
          },
        ].map((stat) => (
          <Card key={stat.label} variant="bordered" hover>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 font-display">{stat.value}</p>
                <p className={`text-xs mt-2 flex items-center gap-1 ${stat.trendUp ? "text-emerald-600" : "text-gray-400"}`}>
                  {stat.trendUp && <TrendingUp className="w-3 h-3" />}
                  {stat.trend}
                </p>
              </div>
              <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Jobs */}
        <div className="lg:col-span-2">
          <Card variant="bordered">
            <CardHeader 
              title="Recent Jobs" 
              subtitle="Active work orders"
              action={
                <Link to="/ops/jobs" className="text-sm text-trm-red hover:underline flex items-center gap-1">
                  View all <ArrowUpRight className="w-4 h-4" />
                </Link>
              }
            />
            <div className="space-y-4">
              {recentJobs.map((job) => (
                <Link
                  key={job.id}
                  to={`/ops/jobs/${job.id}`}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-trm-red/10 flex items-center justify-center">
                      <Wrench className="w-6 h-6 text-trm-red" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{job.title}</p>
                      <p className="text-sm text-gray-500">{job.location}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        Assigned to: {job.assignedTo}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge variant={statusColors[job.status]}>
                      {job.status.replace(/_/g, " ")}
                    </Badge>
                    <Badge variant={priorityColors[job.priority]} size="sm">
                      {job.priority}
                    </Badge>
                  </div>
                </Link>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Low Stock Alert */}
          <Card variant="bordered" className="border-red-200 bg-red-50/50">
            <CardHeader 
              title="Low Stock Alert" 
              subtitle="Items below minimum level"
              icon={<AlertTriangle className="w-5 h-5 text-red-500" />}
            />
            <div className="space-y-3">
              {lowStockItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      Min: {item.minimum} units
                    </p>
                  </div>
                  <Badge variant="danger">{item.current} left</Badge>
                </div>
              ))}
            </div>
            <Link to="/ops/inventory" className="block mt-4">
              <Button variant="outline" size="sm" className="w-full">
                View Inventory
              </Button>
            </Link>
          </Card>

          {/* Quick Actions */}
          <Card variant="bordered">
            <CardHeader title="Quick Actions" />
            <div className="space-y-2">
              <Link to="/ops/jobs/new" className="block">
                <Button variant="ghost" className="w-full justify-start" icon={<Plus className="w-5 h-5" />}>
                  Create New Job
                </Button>
              </Link>
              <Link to="/ops/inventory" className="block">
                <Button variant="ghost" className="w-full justify-start" icon={<Package className="w-5 h-5" />}>
                  Check Inventory
                </Button>
              </Link>
              <Link to="/ops/assets" className="block">
                <Button variant="ghost" className="w-full justify-start" icon={<Wrench className="w-5 h-5" />}>
                  View Assets
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </OpsLayout>
  );
}
