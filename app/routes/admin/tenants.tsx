import { 
  Building2, 
  Search,
  Users,
  Mail,
  Phone,
  MapPin
} from "lucide-react";
import { AdminLayout } from "~/components/layouts";
import { Card, Badge, Input, Button } from "~/components/ui";
import { useState } from "react";

export function meta() {
  return [{ title: "Tenants - Admin Dashboard | TRM Ops" }];
}

const tenants = [
  {
    id: "1",
    name: "Carrefour",
    location: "Ground Floor - West Wing",
    contactName: "John Kiptoo",
    contactEmail: "john.kiptoo@carrefour.ke",
    contactPhone: "+254 712 345 678",
    activeVisits: 2,
    monthlyVisits: 15,
    status: "active" as const,
  },
  {
    id: "2",
    name: "KFC",
    location: "Level 1 - Food Court",
    contactName: "Mary Njeri",
    contactEmail: "mary.njeri@kfc.co.ke",
    contactPhone: "+254 723 456 789",
    activeVisits: 1,
    monthlyVisits: 8,
    status: "active" as const,
  },
  {
    id: "3",
    name: "Equity Bank",
    location: "Ground Floor - East Wing",
    contactName: "Peter Kamau",
    contactEmail: "peter.kamau@equitybank.co.ke",
    contactPhone: "+254 734 567 890",
    activeVisits: 0,
    monthlyVisits: 5,
    status: "active" as const,
  },
  {
    id: "4",
    name: "Java House",
    location: "Level 1 - Near Entrance",
    contactName: "Grace Wanjiku",
    contactEmail: "grace.w@javahouse.co.ke",
    contactPhone: "+254 745 678 901",
    activeVisits: 1,
    monthlyVisits: 4,
    status: "active" as const,
  },
  {
    id: "5",
    name: "Naivas",
    location: "Ground Floor - South Wing",
    contactName: "David Ochieng",
    contactEmail: "david.o@naivas.co.ke",
    contactPhone: "+254 756 789 012",
    activeVisits: 0,
    monthlyVisits: 12,
    status: "active" as const,
  },
];

export default function AdminTenants() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTenants = tenants.filter((tenant) =>
    tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tenant.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tenant.contactName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalActiveVisits = tenants.reduce((sum, t) => sum + t.activeVisits, 0);
  const totalMonthlyVisits = tenants.reduce((sum, t) => sum + t.monthlyVisits, 0);

  return (
    <AdminLayout userName="Sarah Kimani">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-white font-display">
          Tenant Management
        </h1>
        <p className="text-gray-400 mt-1">Manage tenant accounts and access</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <Card variant="glass" className="bg-gray-800/50 border-gray-700 text-center py-4">
          <p className="text-3xl font-bold text-white font-display">{tenants.length}</p>
          <p className="text-sm text-gray-400">Total Tenants</p>
        </Card>
        <Card variant="glass" className="bg-emerald-500/10 border-emerald-500/30 text-center py-4">
          <p className="text-3xl font-bold text-emerald-400 font-display">{totalActiveVisits}</p>
          <p className="text-sm text-gray-400">Active Visits Now</p>
        </Card>
        <Card variant="glass" className="bg-purple-500/10 border-purple-500/30 text-center py-4">
          <p className="text-3xl font-bold text-purple-400 font-display">{totalMonthlyVisits}</p>
          <p className="text-sm text-gray-400">Visits This Month</p>
        </Card>
      </div>

      {/* Search */}
      <Card variant="glass" padding="sm" className="bg-gray-800/50 border-gray-700 mb-6">
        <Input
          placeholder="Search tenants..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          icon={<Search className="w-5 h-5" />}
          className="bg-gray-900 border-gray-700 text-white placeholder-gray-500"
        />
      </Card>

      {/* Tenants Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTenants.map((tenant) => (
          <Card 
            key={tenant.id} 
            variant="glass" 
            className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 rounded-xl bg-trm-red/20 flex items-center justify-center">
                <Building2 className="w-7 h-7 text-trm-red" />
              </div>
              {tenant.activeVisits > 0 && (
                <Badge variant="success" pulse>
                  {tenant.activeVisits} on-site
                </Badge>
              )}
            </div>

            <h3 className="text-xl font-bold text-white mb-1">{tenant.name}</h3>
            <p className="text-sm text-gray-400 flex items-center gap-1 mb-4">
              <MapPin className="w-4 h-4" />
              {tenant.location}
            </p>

            <div className="space-y-2 text-sm mb-4">
              <p className="text-gray-300">
                <span className="text-gray-500">Contact:</span> {tenant.contactName}
              </p>
              <p className="text-gray-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {tenant.contactEmail}
              </p>
              <p className="text-gray-400 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                {tenant.contactPhone}
              </p>
            </div>

            <div className="pt-4 border-t border-gray-700 flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-400">
                <Users className="w-4 h-4" />
                <span className="text-sm">{tenant.monthlyVisits} visits/mo</span>
              </div>
              <Button variant="ghost" size="sm">
                View Details
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </AdminLayout>
  );
}
