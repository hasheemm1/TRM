import { Link, useLocation } from "react-router";
import { 
  LayoutDashboard, 
  Users, 
  ClipboardList, 
  Package,
  Building2,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  Home
} from "lucide-react";
import { clsx } from "clsx";
import { useState, type ReactNode } from "react";

interface AdminLayoutProps {
  children: ReactNode;
  userName?: string;
}

const navItems = [
  { href: "/admin", icon: LayoutDashboard, label: "God View" },
  { href: "/admin/visitors", icon: Users, label: "Gate Log" },
  { href: "/admin/jobs", icon: ClipboardList, label: "Work Orders" },
  { href: "/admin/inventory", icon: Package, label: "Inventory" },
  { href: "/admin/tenants", icon: Building2, label: "Tenants" },
  { href: "/admin/reports", icon: BarChart3, label: "Reports" },
  { href: "/admin/settings", icon: Settings, label: "Settings" },
];

export function AdminLayout({ children, userName = "Admin" }: AdminLayoutProps) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
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
          "fixed top-16 left-0 z-50 h-[calc(100vh-4rem)] w-72 bg-gray-950 shadow-xl transform transition-transform duration-300 lg:translate-x-0 flex flex-col",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-gray-400 hover:bg-gray-800 hover:text-white mb-2"
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
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t border-gray-800">
          <button className="flex items-center gap-3 px-4 py-3 w-full text-gray-400 hover:bg-gray-800 hover:text-white rounded-xl transition-colors">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Top Bar */}
      <header className="h-16 bg-gray-950 border-b border-gray-800 flex items-center px-6 sticky top-0 z-30">
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-2 hover:bg-gray-800 rounded-lg mr-4"
        >
          <Menu className="w-6 h-6" />
        </button>

        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <img src="/logo.png" alt="TRM" className="h-10 w-auto" />
          <div>
            <h1 className="text-lg font-bold text-white font-display">TRM Admin</h1>
            <p className="text-xs text-gray-400">God View Dashboard</p>
          </div>
        </Link>

        <div className="flex-1" />

        {/* Search */}
        <div className="hidden md:flex items-center flex-1 max-w-xl mr-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search visitors, jobs, assets..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-trm-red/50 focus:border-trm-red"
            />
          </div>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center gap-3 mr-6">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/20 rounded-full">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-sm text-emerald-400 font-medium">Live</span>
          </div>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-4">
          <button className="relative p-2 hover:bg-gray-800 rounded-xl transition-colors">
            <Bell className="w-6 h-6 text-gray-400" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-trm-red rounded-full" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-trm-red flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {userName.split(" ").map(n => n[0]).join("")}
              </span>
            </div>
            <div className="hidden sm:block">
              <p className="font-medium text-white">{userName}</p>
              <p className="text-xs text-gray-400">Administrator</p>
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
