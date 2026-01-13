import { 
  BarChart3, 
  Download,
  Calendar,
  TrendingUp,
  Users,
  DollarSign,
  Package
} from "lucide-react";
import { AdminLayout } from "~/components/layouts";
import { Card, Button } from "~/components/ui";

export function meta() {
  return [{ title: "Reports - Admin Dashboard | TRM Ops" }];
}

const reportTypes = [
  {
    id: "gate-log",
    title: "Gate Log Report",
    description: "Comprehensive visitor and contractor access log",
    icon: Users,
    color: "bg-emerald-500/20",
    iconColor: "text-emerald-400",
  },
  {
    id: "lpo-summary",
    title: "LPO Summary",
    description: "All approved quotes and purchase orders",
    icon: DollarSign,
    color: "bg-purple-500/20",
    iconColor: "text-purple-400",
  },
  {
    id: "job-analysis",
    title: "Job Analysis",
    description: "Work order trends, completion rates, and costs",
    icon: BarChart3,
    color: "bg-amber-500/20",
    iconColor: "text-amber-400",
  },
  {
    id: "inventory-usage",
    title: "Inventory Usage",
    description: "Stock consumption patterns and reorder points",
    icon: Package,
    color: "bg-cyan-500/20",
    iconColor: "text-cyan-400",
  },
  {
    id: "tenant-activity",
    title: "Tenant Activity",
    description: "Contractor visits by tenant with compliance stats",
    icon: TrendingUp,
    color: "bg-pink-500/20",
    iconColor: "text-pink-400",
  },
  {
    id: "asset-maintenance",
    title: "Asset Maintenance",
    description: "Service history and maintenance costs by asset",
    icon: Calendar,
    color: "bg-blue-500/20",
    iconColor: "text-blue-400",
  },
];

const recentReports = [
  { name: "Gate Log - Jan 2026.xlsx", date: "2026-01-12", size: "245 KB" },
  { name: "LPO Summary - Dec 2025.pdf", date: "2026-01-05", size: "128 KB" },
  { name: "Inventory Report - Q4 2025.xlsx", date: "2026-01-02", size: "312 KB" },
];

export default function AdminReports() {
  const handleGenerateReport = (reportId: string) => {
    alert(`Generating ${reportId} report...`);
  };

  return (
    <AdminLayout userName="Sarah Kimani">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-white font-display">
          Reports & Analytics
        </h1>
        <p className="text-gray-400 mt-1">Generate and download operational reports</p>
      </div>

      {/* Report Types Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {reportTypes.map((report) => (
          <Card 
            key={report.id} 
            variant="glass" 
            hover
            className="bg-gray-800/50 border-gray-700"
          >
            <div className={`w-14 h-14 rounded-xl ${report.color} flex items-center justify-center mb-4`}>
              <report.icon className={`w-7 h-7 ${report.iconColor}`} />
            </div>
            
            <h3 className="text-lg font-bold text-white mb-2">{report.title}</h3>
            <p className="text-gray-400 text-sm mb-4">{report.description}</p>
            
            <div className="flex gap-2">
              <Button 
                variant="primary" 
                size="sm" 
                className="flex-1"
                onClick={() => handleGenerateReport(report.id)}
                icon={<Download className="w-4 h-4" />}
              >
                Generate
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Reports */}
      <Card variant="glass" className="bg-gray-800/50 border-gray-700">
        <h2 className="text-xl font-bold text-white mb-6 font-display">Recent Reports</h2>
        <div className="space-y-3">
          {recentReports.map((report) => (
            <div 
              key={report.name}
              className="flex items-center justify-between p-4 bg-gray-900/50 rounded-xl hover:bg-gray-900/70 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <p className="text-white font-medium">{report.name}</p>
                  <p className="text-sm text-gray-500">
                    {report.date} • {report.size}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm" icon={<Download className="w-4 h-4" />}>
                Download
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </AdminLayout>
  );
}
