import { Link } from "react-router";
import { 
  Users, 
  ClipboardList, 
  Package, 
  DollarSign,
  ArrowUpRight,
  ArrowDownLeft,
  TrendingUp,
  TrendingDown,
  Building2,
  Clock,
  AlertTriangle,
  CheckCircle2
} from "lucide-react";
import { AdminLayout } from "~/components/layouts";
import { Card, CardHeader, Badge } from "~/components/ui";

export function meta() {
  return [{ title: "God View - Admin Dashboard | TRM Ops" }];
}

// Real-time data mock
const liveStats = {
  currentVisitors: 12,
  todayCheckIns: 47,
  todayCheckOuts: 35,
  activeJobs: 8,
  pendingApprovals: 4,
  lpoValueToday: 158000,
  lowStockItems: 5,
  assetsInMaintenance: 2,
};

const recentActivity = [
  { 
    id: "1", 
    type: "check_in" as const, 
    description: "CoolAir Systems checked in", 
    tenant: "Carrefour",
    time: "2 min ago" 
  },
  { 
    id: "2", 
    type: "approval" as const, 
    description: "Quote approved - Lift B Repair", 
    amount: 85000,
    time: "15 min ago" 
  },
  { 
    id: "3", 
    type: "check_out" as const, 
    description: "CleanTech Services departed", 
    tenant: "KFC",
    time: "32 min ago" 
  },
  { 
    id: "4", 
    type: "job_created" as const, 
    description: "New job: HVAC Unit 3 - Not Cooling", 
    priority: "high",
    time: "1 hour ago" 
  },
  { 
    id: "5", 
    type: "inventory" as const, 
    description: "LED Bulbs checked out (qty: 3)", 
    by: "John Kamau",
    time: "2 hours ago" 
  },
];

const topAssets = [
  { name: "Lift B", type: "Elevator", jobs: 5, cost: 245000 },
  { name: "HVAC Unit 3", type: "AC", jobs: 4, cost: 89000 },
  { name: "Generator 2", type: "Power", jobs: 7, cost: 320000 },
];

const tenantActivity = [
  { name: "Carrefour", visits: 15, active: 2 },
  { name: "KFC", visits: 8, active: 1 },
  { name: "Equity Bank", visits: 5, active: 0 },
  { name: "Java House", visits: 4, active: 1 },
];

export default function AdminDashboard() {
  return (
    <AdminLayout userName="Sarah Kimani">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-white font-display mb-2">
          God View Dashboard
        </h1>
        <p className="text-gray-400">
          Real-time overview of all facility operations • January 13, 2026
        </p>
      </div>

      {/* Live Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card variant="glass" className="bg-gray-800/50 border-gray-700">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">On-Site Now</p>
              <p className="text-3xl font-bold text-white font-display">
                {liveStats.currentVisitors}
              </p>
              <div className="flex items-center gap-2 mt-2 text-xs">
                <span className="text-emerald-400 flex items-center gap-1">
                  <ArrowDownLeft className="w-3 h-3" />
                  {liveStats.todayCheckIns} in
                </span>
                <span className="text-cyan-400 flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" />
                  {liveStats.todayCheckOuts} out
                </span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
              <Users className="w-6 h-6 text-emerald-400" />
            </div>
          </div>
        </Card>

        <Card variant="glass" className="bg-gray-800/50 border-gray-700">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Active Jobs</p>
              <p className="text-3xl font-bold text-white font-display">
                {liveStats.activeJobs}
              </p>
              <p className="text-xs text-amber-400 mt-2">
                {liveStats.pendingApprovals} pending approval
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
              <ClipboardList className="w-6 h-6 text-amber-400" />
            </div>
          </div>
        </Card>

        <Card variant="glass" className="bg-gray-800/50 border-gray-700">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">LPO Value Today</p>
              <p className="text-3xl font-bold text-white font-display">
                KES {(liveStats.lpoValueToday / 1000).toFixed(0)}K
              </p>
              <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +12% vs yesterday
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </Card>

        <Card variant="glass" className="bg-gray-800/50 border-gray-700">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Low Stock Items</p>
              <p className="text-3xl font-bold text-white font-display">
                {liveStats.lowStockItems}
              </p>
              <p className="text-xs text-red-400 mt-2">
                Needs restocking
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
              <Package className="w-6 h-6 text-red-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Activity Feed */}
        <div className="lg:col-span-2">
          <Card variant="glass" className="bg-gray-800/50 border-gray-700">
            <CardHeader 
              title="Live Activity Feed" 
              subtitle="Real-time updates"
              action={
                <Link to="/admin/visitors" className="text-sm text-trm-red hover:underline flex items-center gap-1">
                  View all <ArrowUpRight className="w-4 h-4" />
                </Link>
              }
            />
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div 
                  key={activity.id}
                  className="flex items-center gap-4 p-4 bg-gray-900/50 rounded-xl"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    activity.type === "check_in" ? "bg-emerald-500/20" :
                    activity.type === "check_out" ? "bg-cyan-500/20" :
                    activity.type === "approval" ? "bg-purple-500/20" :
                    activity.type === "job_created" ? "bg-amber-500/20" :
                    "bg-gray-700"
                  }`}>
                    {activity.type === "check_in" && <ArrowDownLeft className="w-5 h-5 text-emerald-400" />}
                    {activity.type === "check_out" && <ArrowUpRight className="w-5 h-5 text-cyan-400" />}
                    {activity.type === "approval" && <CheckCircle2 className="w-5 h-5 text-purple-400" />}
                    {activity.type === "job_created" && <ClipboardList className="w-5 h-5 text-amber-400" />}
                    {activity.type === "inventory" && <Package className="w-5 h-5 text-gray-400" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium">{activity.description}</p>
                    <p className="text-sm text-gray-500">
                      {activity.tenant && `${activity.tenant} • `}
                      {activity.amount && `KES ${activity.amount.toLocaleString()} • `}
                      {activity.priority && (
                        <Badge variant="warning" size="sm" className="mr-2">
                          {activity.priority}
                        </Badge>
                      )}
                      {activity.by && `${activity.by} • `}
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Top Assets by Cost */}
          <Card variant="glass" className="bg-gray-800/50 border-gray-700">
            <CardHeader 
              title="Top Assets by Spend" 
              subtitle="Last 12 months"
            />
            <div className="space-y-4">
              {topAssets.map((asset, index) => (
                <div key={asset.name} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-lg bg-gray-700 flex items-center justify-center text-sm font-bold text-gray-400">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">{asset.name}</p>
                    <p className="text-xs text-gray-500">{asset.type} • {asset.jobs} jobs</p>
                  </div>
                  <p className="text-sm font-medium text-trm-red">
                    KES {(asset.cost / 1000).toFixed(0)}K
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* Tenant Activity */}
          <Card variant="glass" className="bg-gray-800/50 border-gray-700">
            <CardHeader 
              title="Tenant Activity" 
              subtitle="This month"
            />
            <div className="space-y-3">
              {tenantActivity.map((tenant) => (
                <div key={tenant.name} className="flex items-center justify-between p-3 bg-gray-900/50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-trm-red/20 flex items-center justify-center">
                      <Building2 className="w-4 h-4 text-trm-red" />
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">{tenant.name}</p>
                      <p className="text-xs text-gray-500">{tenant.visits} visits</p>
                    </div>
                  </div>
                  {tenant.active > 0 && (
                    <Badge variant="success" size="sm" pulse>
                      {tenant.active} on-site
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Alerts */}
          <Card variant="glass" className="bg-red-500/10 border-red-500/30">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <h3 className="font-semibold text-red-400">Active Alerts</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Clock className="w-4 h-4 text-amber-400" />
                <span className="text-gray-300">1 visitor overstaying</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Package className="w-4 h-4 text-red-400" />
                <span className="text-gray-300">5 items below min stock</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span className="text-gray-300">1 asset out of service</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
