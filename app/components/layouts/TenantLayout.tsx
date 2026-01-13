import { Link, useLocation } from "react-router";
import { 
  Building2, 
  Users, 
  Calendar, 
  LogOut, 
  Menu,
  X,
  Bell,
  Home
} from "lucide-react";
import { clsx } from "clsx";
import { useState, type ReactNode } from "react";

interface TenantLayoutProps {
  children: ReactNode;
  tenantName?: string;
}

const navItems = [
  { href: "/tenant", icon: Building2, label: "Dashboard" },
  { href: "/tenant/visitors", icon: Users, label: "Visitor Requests" },
  { href: "/tenant/schedule", icon: Calendar, label: "Schedule" },
];

export function TenantLayout({ children, tenantName = "Carrefour" }: TenantLayoutProps) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed top-16 left-0 z-50 h-[calc(100vh-4rem)] w-72 bg-white shadow-xl transform transition-transform duration-300 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >

        {/* Tenant Info */}
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-trm-red/20 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-trm-red" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">{tenantName}</p>
              <p className="text-sm text-gray-500">Tenant Manager</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-4 py-6 space-y-1">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-gray-600 hover:bg-gray-100 mb-2"
          >
            <Home className="w-5 h-5" />
            <span className="font-medium">Home</span>
          </Link>
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={clsx(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                  isActive
                    ? "bg-trm-red text-white shadow-lg shadow-trm-red/25"
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
          <button className="flex items-center gap-3 px-4 py-3 w-full text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Top Bar */}
      <header className="h-16 bg-white border-b border-gray-100 flex items-center px-6 sticky top-0 z-30">
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg mr-4"
        >
          <Menu className="w-6 h-6" />
        </button>

        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <img src="/logo.png" alt="TRM" className="h-10 w-auto" />
          <div>
            <h1 className="text-lg font-bold text-gray-900 font-display">TRM Tenant Portal</h1>
            <p className="text-xs text-gray-500">Contractor Management</p>
          </div>
        </Link>

        <div className="flex-1" />

        {/* Status Indicator */}
        <div className="flex items-center gap-3 mr-6">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/20 rounded-full">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-sm text-emerald-400 font-medium">Active</span>
          </div>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-4">
          <button className="relative p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-trm-red rounded-full" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-trm-red/10 flex items-center justify-center">
              <span className="text-trm-red font-semibold text-sm">CM</span>
            </div>
            <div className="hidden sm:block">
              <p className="font-medium text-gray-900">{tenantName}</p>
              <p className="text-xs text-gray-500">Tenant Manager</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="lg:pl-72">

        {/* Page Content */}
        <main className="p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
