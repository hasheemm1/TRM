import { Link } from "react-router";
import { 
  Plus, 
  Search, 
  Filter, 
  Users, 
  Calendar, 
  Clock,
  MoreVertical,
  Eye,
  Edit,
  XCircle
} from "lucide-react";
import { TenantLayout } from "~/components/layouts";
import { Card, Badge, Button, Input, Select } from "~/components/ui";
import { useState } from "react";

export function meta() {
  return [{ title: "Visitor Requests - Tenant Portal | TRM Ops" }];
}

// Mock data
const visitors = [
  {
    id: "1",
    company: "CoolAir Systems",
    contactName: "John Mwangi",
    purpose: "Freezer Repair",
    scheduledDate: "2026-01-14",
    scheduledTime: "09:00",
    teamSize: 3,
    status: "expected" as const,
    createdAt: "2026-01-10",
  },
  {
    id: "2",
    company: "ElectroPro Ltd",
    contactName: "Mary Wanjiku",
    purpose: "Electrical Maintenance",
    scheduledDate: "2026-01-15",
    scheduledTime: "14:00",
    teamSize: 2,
    status: "expected" as const,
    createdAt: "2026-01-11",
  },
  {
    id: "3",
    company: "CleanTech Services",
    contactName: "Peter Oduor",
    purpose: "Deep Cleaning",
    scheduledDate: "2026-01-13",
    scheduledTime: "08:30",
    teamSize: 5,
    status: "checked_out" as const,
    createdAt: "2026-01-09",
  },
  {
    id: "4",
    company: "HVAC Masters",
    contactName: "Grace Akinyi",
    purpose: "AC Servicing",
    scheduledDate: "2026-01-12",
    scheduledTime: "10:00",
    teamSize: 2,
    status: "checked_out" as const,
    createdAt: "2026-01-08",
  },
  {
    id: "5",
    company: "SecureGuard Ltd",
    contactName: "James Kamau",
    purpose: "Security System Check",
    scheduledDate: "2026-01-16",
    scheduledTime: "11:00",
    teamSize: 1,
    status: "expected" as const,
    createdAt: "2026-01-12",
  },
];

const statusColors = {
  expected: "info",
  checked_in: "success",
  checked_out: "default",
  cancelled: "danger",
  denied: "danger",
} as const;

const statusOptions = [
  { value: "", label: "All Statuses" },
  { value: "expected", label: "Expected" },
  { value: "checked_in", label: "Checked In" },
  { value: "checked_out", label: "Checked Out" },
  { value: "cancelled", label: "Cancelled" },
];

export default function TenantVisitors() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const filteredVisitors = visitors.filter((visitor) => {
    const matchesSearch = 
      visitor.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visitor.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visitor.purpose.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || visitor.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <TenantLayout tenantName="Carrefour">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-display">
            Visitor Requests
          </h1>
          <p className="text-gray-500 mt-1">Manage all contractor and visitor authorizations</p>
        </div>
        <Link to="/tenant/visitors/new">
          <Button icon={<Plus className="w-5 h-5" />}>
            New Request
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card variant="bordered" padding="sm" className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search by company, contact, or purpose..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="w-5 h-5" />}
            />
          </div>
          <div className="w-full sm:w-48">
            <Select
              options={statusOptions}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              icon={<Filter className="w-5 h-5" />}
            />
          </div>
        </div>
      </Card>

      {/* Results count */}
      <p className="text-sm text-gray-500 mb-4">
        Showing {filteredVisitors.length} of {visitors.length} requests
      </p>

      {/* Visitors List */}
      <div className="space-y-4">
        {filteredVisitors.map((visitor) => (
          <Card 
            key={visitor.id} 
            variant="bordered" 
            padding="none"
            className="overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-6">
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-trm-red/10 flex items-center justify-center flex-shrink-0">
                <Users className="w-7 h-7 text-trm-red" />
              </div>

              {/* Main Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{visitor.company}</h3>
                    <p className="text-gray-500">{visitor.purpose}</p>
                  </div>
                  <Badge variant={statusColors[visitor.status]} size="md">
                    {visitor.status.replace("_", " ")}
                  </Badge>
                </div>

                <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {visitor.scheduledDate}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {visitor.scheduledTime}
                  </span>
                  <span>Contact: {visitor.contactName}</span>
                  <span>{visitor.teamSize} team member{visitor.teamSize > 1 ? "s" : ""}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="relative flex-shrink-0">
                <button
                  onClick={() => setOpenMenu(openMenu === visitor.id ? null : visitor.id)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <MoreVertical className="w-5 h-5 text-gray-400" />
                </button>

                {openMenu === visitor.id && (
                  <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-10">
                    <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      View Details
                    </button>
                    {visitor.status === "expected" && (
                      <>
                        <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                          <Edit className="w-4 h-4" />
                          Edit Request
                        </button>
                        <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                          <XCircle className="w-4 h-4" />
                          Cancel Request
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredVisitors.length === 0 && (
        <div className="text-center py-16">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No visitors found</h3>
          <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
          <Link to="/tenant/visitors/new">
            <Button icon={<Plus className="w-5 h-5" />}>
              Create New Request
            </Button>
          </Link>
        </div>
      )}
    </TenantLayout>
  );
}
