import { 
  Settings, 
  Users,
  Building2,
  Bell,
  Shield,
  Database,
  Mail
} from "lucide-react";
import { AdminLayout } from "~/components/layouts";
import { Card, Button, Input } from "~/components/ui";
import { useState } from "react";

export function meta() {
  return [{ title: "Settings - Admin Dashboard | TRM Ops" }];
}

const settingsSections = [
  {
    id: "users",
    title: "User Management",
    description: "Manage staff accounts and permissions",
    icon: Users,
    color: "bg-blue-500/20",
    iconColor: "text-blue-400",
  },
  {
    id: "tenants",
    title: "Tenant Configuration",
    description: "Set up tenant access and portals",
    icon: Building2,
    color: "bg-purple-500/20",
    iconColor: "text-purple-400",
  },
  {
    id: "notifications",
    title: "Notifications",
    description: "Configure alerts and email settings",
    icon: Bell,
    color: "bg-amber-500/20",
    iconColor: "text-amber-400",
  },
  {
    id: "security",
    title: "Security Settings",
    description: "Access control and authentication",
    icon: Shield,
    color: "bg-red-500/20",
    iconColor: "text-red-400",
  },
  {
    id: "integrations",
    title: "Integrations",
    description: "QuickBooks, eTIMS, and API settings",
    icon: Database,
    color: "bg-emerald-500/20",
    iconColor: "text-emerald-400",
  },
  {
    id: "email",
    title: "Email Templates",
    description: "Customize notification emails",
    icon: Mail,
    color: "bg-cyan-500/20",
    iconColor: "text-cyan-400",
  },
];

export default function AdminSettings() {
  const [companyName, setCompanyName] = useState("Thika Road Mall");
  const [timezone, setTimezone] = useState("Africa/Nairobi");

  return (
    <AdminLayout userName="Sarah Kimani">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-white font-display">
          System Settings
        </h1>
        <p className="text-gray-400 mt-1">Configure your TRM Ops platform</p>
      </div>

      {/* General Settings */}
      <Card variant="glass" className="bg-gray-800/50 border-gray-700 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-trm-red/20 flex items-center justify-center">
            <Settings className="w-5 h-5 text-trm-red" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white font-display">General Settings</h2>
            <p className="text-sm text-gray-400">Basic platform configuration</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Company Name
            </label>
            <Input
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Timezone
            </label>
            <Input
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-700">
          <Button variant="primary">Save Changes</Button>
        </div>
      </Card>

      {/* Settings Sections Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {settingsSections.map((section) => (
          <Card 
            key={section.id} 
            variant="glass" 
            hover
            className="bg-gray-800/50 border-gray-700 cursor-pointer"
          >
            <div className={`w-12 h-12 rounded-xl ${section.color} flex items-center justify-center mb-4`}>
              <section.icon className={`w-6 h-6 ${section.iconColor}`} />
            </div>
            
            <h3 className="text-lg font-semibold text-white mb-1">{section.title}</h3>
            <p className="text-gray-400 text-sm">{section.description}</p>
          </Card>
        ))}
      </div>

      {/* Danger Zone */}
      <Card variant="glass" className="bg-red-500/10 border-red-500/30 mt-8">
        <h2 className="text-lg font-semibold text-red-400 mb-4">Danger Zone</h2>
        <p className="text-gray-400 text-sm mb-4">
          These actions are irreversible. Please proceed with caution.
        </p>
        <div className="flex gap-4">
          <Button variant="ghost" size="sm">
            Clear Activity Logs
          </Button>
          <Button variant="danger" size="sm">
            Reset System
          </Button>
        </div>
      </Card>
    </AdminLayout>
  );
}
