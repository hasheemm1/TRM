import { Link } from "react-router";
import { 
  Users, 
  Calendar, 
  Clock, 
  Plus,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { TenantLayout } from "~/components/layouts";
import { Card, CardHeader, Badge, Button } from "~/components/ui";

export function meta() {
  return [{ title: "Dashboard - Tenant Portal | TRM Ops" }];
}

// Mock data
const upcomingVisitors = [
  {
    id: "1",
    company: "CoolAir Systems",
    purpose: "Freezer Repair",
    scheduledDate: "2026-01-14",
    scheduledTime: "09:00",
    teamSize: 3,
    status: "expected" as const,
  },
  {
    id: "2",
    company: "ElectroPro Ltd",
    purpose: "Electrical Maintenance",
    scheduledDate: "2026-01-15",
    scheduledTime: "14:00",
    teamSize: 2,
    status: "expected" as const,
  },
];

const recentVisitors = [
  {
    id: "3",
    company: "CleanTech Services",
    purpose: "Deep Cleaning",
    checkInTime: "2026-01-13T08:30:00",
    checkOutTime: "2026-01-13T12:45:00",
    status: "checked_out" as const,
  },
  {
    id: "4",
    company: "HVAC Masters",
    purpose: "AC Servicing",
    checkInTime: "2026-01-12T10:00:00",
    checkOutTime: "2026-01-12T16:30:00",
    status: "checked_out" as const,
  },
];

const statusColors = {
  expected: "info",
  checked_in: "success",
  checked_out: "default",
  cancelled: "danger",
  denied: "danger",
} as const;

export default function TenantDashboard() {
  return (
    <TenantLayout tenantName="Carrefour">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-display">
            Dashboard
          </h1>
          <p className="text-gray-500 mt-1">Manage your contractor access requests</p>
        </div>
        <Link to="/tenant/visitors/new">
          <Button icon={<Plus className="w-5 h-5" />}>
            New Visitor Request
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { 
            label: "Upcoming Visits", 
            value: "5", 
            icon: Calendar, 
            color: "bg-blue-500",
            trend: "+2 this week"
          },
          { 
            label: "Currently On-Site", 
            value: "2", 
            icon: Users, 
            color: "bg-emerald-500",
            trend: "Active now"
          },
          { 
            label: "This Month", 
            value: "23", 
            icon: CheckCircle2, 
            color: "bg-purple-500",
            trend: "Completed visits"
          },
          { 
            label: "Pending Approval", 
            value: "1", 
            icon: AlertCircle, 
            color: "bg-amber-500",
            trend: "Awaiting review"
          },
        ].map((stat) => (
          <Card key={stat.label} variant="bordered" hover>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 font-display">{stat.value}</p>
                <p className="text-xs text-gray-400 mt-2">{stat.trend}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upcoming Visitors */}
        <Card variant="bordered">
          <CardHeader 
            title="Upcoming Visitors" 
            subtitle="Pre-authorized contractors"
            action={
              <Link to="/tenant/visitors" className="text-sm text-trm-red hover:underline flex items-center gap-1">
                View all <ArrowUpRight className="w-4 h-4" />
              </Link>
            }
          />
          <div className="space-y-4">
            {upcomingVisitors.map((visitor) => (
              <div
                key={visitor.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-trm-red/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-trm-red" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{visitor.company}</p>
                    <p className="text-sm text-gray-500">{visitor.purpose}</p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                      <Calendar className="w-3 h-3" />
                      <span>{visitor.scheduledDate}</span>
                      <Clock className="w-3 h-3 ml-2" />
                      <span>{visitor.scheduledTime}</span>
                      <span className="ml-2">• {visitor.teamSize} staff</span>
                    </div>
                  </div>
                </div>
                <Badge variant={statusColors[visitor.status]}>
                  {visitor.status.replace("_", " ")}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Activity */}
        <Card variant="bordered">
          <CardHeader 
            title="Recent Activity" 
            subtitle="Completed visits"
            action={
              <Link to="/tenant/visitors" className="text-sm text-trm-red hover:underline flex items-center gap-1">
                View all <ArrowUpRight className="w-4 h-4" />
              </Link>
            }
          />
          <div className="space-y-4">
            {recentVisitors.map((visitor) => (
              <div
                key={visitor.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-200 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-gray-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{visitor.company}</p>
                    <p className="text-sm text-gray-500">{visitor.purpose}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Completed on {new Date(visitor.checkOutTime!).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <Badge variant="default">Completed</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </TenantLayout>
  );
}
