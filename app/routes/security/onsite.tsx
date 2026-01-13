import { 
  Users, 
  Search, 
  Clock, 
  Building2,
  LogOut,
  MoreVertical,
  MapPin
} from "lucide-react";
import { SecurityLayout } from "~/components/layouts";
import { Card, Badge, Input } from "~/components/ui";
import { useState } from "react";

export function meta() {
  return [{ title: "On-Site Visitors - Security Gate | TRM Ops" }];
}

// Mock on-site visitors
const onsiteVisitors = [
  {
    id: "1",
    name: "John Mwangi",
    company: "CoolAir Systems",
    tenant: "Carrefour",
    purpose: "Freezer Repair",
    checkInTime: "2026-01-13T09:15:00",
    vehiclePlate: "KBZ 123A",
    teamSize: 3,
    location: "Level B1 - Cold Storage",
  },
  {
    id: "2",
    name: "Grace Akinyi",
    company: "HVAC Masters",
    tenant: "Food Court",
    purpose: "AC Maintenance",
    checkInTime: "2026-01-13T10:30:00",
    vehiclePlate: "KCA 456B",
    teamSize: 2,
    location: "Level 3 - Plant Room",
  },
  {
    id: "3",
    name: "Peter Oduor",
    company: "ElectroPro Ltd",
    tenant: "TRM Management",
    purpose: "Generator Service",
    checkInTime: "2026-01-13T08:00:00",
    vehiclePlate: "KDD 789C",
    teamSize: 4,
    location: "Level B2 - Generator Room",
  },
];

function formatDuration(checkInTime: string): string {
  const checkIn = new Date(checkInTime);
  const now = new Date("2026-01-13T14:30:00"); // Mock current time
  const diffMs = now.getTime() - checkIn.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  
  if (diffHours > 0) {
    return `${diffHours}h ${diffMins}m`;
  }
  return `${diffMins}m`;
}

export default function SecurityOnsite() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredVisitors = onsiteVisitors.filter((visitor) =>
    visitor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    visitor.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    visitor.tenant.toLowerCase().includes(searchQuery.toLowerCase()) ||
    visitor.vehiclePlate.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCheckOut = (visitorId: string) => {
    alert(`Visitor ${visitorId} checked out successfully!`);
  };

  return (
    <SecurityLayout guardName="James Otieno">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white font-display">
            On-Site Visitors
          </h1>
          <p className="text-gray-400 mt-1">
            {onsiteVisitors.length} visitors currently inside the mall
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 rounded-full">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-emerald-400 font-medium">Live View</span>
        </div>
      </div>

      {/* Search */}
      <Card variant="glass" padding="sm" className="bg-security-surface border-security-border mb-6">
        <Input
          placeholder="Search by name, company, tenant, or vehicle..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          icon={<Search className="w-5 h-5" />}
          className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
        />
      </Card>

      {/* Visitors Grid */}
      <div className="grid gap-4">
        {filteredVisitors.map((visitor) => (
          <Card 
            key={visitor.id} 
            variant="glass" 
            className="bg-security-surface border-security-border"
          >
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              {/* Avatar & Basic Info */}
              <div className="flex items-center gap-4 flex-1">
                <div className="w-14 h-14 rounded-xl bg-security-accent/20 flex items-center justify-center flex-shrink-0">
                  <Users className="w-7 h-7 text-security-accent" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-white">{visitor.name}</h3>
                  <p className="text-gray-400">{visitor.company}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="info" size="sm">{visitor.tenant}</Badge>
                    <span className="text-sm text-gray-500">• {visitor.teamSize} people</span>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center gap-2 text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>In for {formatDuration(visitor.checkInTime)}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>{visitor.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Building2 className="w-4 h-4" />
                  <span>{visitor.vehiclePlate}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => handleCheckOut(visitor.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-amber-500/20 text-amber-400 rounded-xl hover:bg-amber-500/30 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="hidden sm:inline">Check Out</span>
                </button>
                <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                  <MoreVertical className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredVisitors.length === 0 && (
        <Card variant="glass" className="bg-security-surface border-security-border text-center py-12">
          <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No visitors found</h3>
          <p className="text-gray-400">
            {searchQuery ? "Try adjusting your search" : "No visitors currently on-site"}
          </p>
        </Card>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        <Card variant="glass" className="bg-security-surface border-security-border text-center">
          <p className="text-2xl font-bold text-white font-display">9</p>
          <p className="text-xs text-gray-400">Total People</p>
        </Card>
        <Card variant="glass" className="bg-security-surface border-security-border text-center">
          <p className="text-2xl font-bold text-white font-display">3</p>
          <p className="text-xs text-gray-400">Vehicles Inside</p>
        </Card>
        <Card variant="glass" className="bg-security-surface border-security-border text-center">
          <p className="text-2xl font-bold text-white font-display">5h 15m</p>
          <p className="text-xs text-gray-400">Longest Stay</p>
        </Card>
        <Card variant="glass" className="bg-security-surface border-security-border text-center">
          <p className="text-2xl font-bold text-white font-display">2</p>
          <p className="text-xs text-gray-400">Expected Soon</p>
        </Card>
      </div>
    </SecurityLayout>
  );
}
