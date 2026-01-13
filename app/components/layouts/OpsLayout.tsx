import { Link, useLocation } from "react-router";
import { 
  Wrench, 
  ClipboardList, 
  Package, 
  BarChart3, 
  LogOut,
  Menu,
  X,
  Bell,
  User,
  Home
} from "lucide-react";
import { clsx } from "clsx";
import { useState, type ReactNode } from "react";

interface OpsLayoutProps {
  children: ReactNode;
  userName?: string;
  userRole?: "facility_manager" | "maintenance_operative";
}

const managerNavItems = [
  { href: "/ops", icon: BarChart3, label: "Dashboard" },
  { href: "/ops/jobs", icon: ClipboardList, label: "Jobs" },
  { href: "/ops/inventory", icon: Package, label: "Inventory" },
  { href: "/ops/assets", icon: Wrench, label: "Assets" },
];

const operativeNavItems = [
  { href: "/ops/tasks", icon: ClipboardList, label: "My Tasks" },
  { href: "/ops/inventory", icon: Package, label: "Inventory" },
];

export function OpsLayout({ 
  children, 
  userName = "John Doe",
  userRole = "facility_manager" 
}: OpsLayoutProps) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = userRole === "facility_manager" ? managerNavItems : operativeNavItems;
  const roleLabel = userRole === "facility_manager" ? "Facility Manager" : "Maintenance Operative";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30 lg:hidden">
        <div className="flex items-center justify-around h-16">
          <Link
            to="/"
            className={clsx(
              "flex flex-col items-center gap-1 px-4 py-2",
              location.pathname === "/" ? "text-trm-red" : "text-gray-400"
            )}
          >
            <Home className="w-6 h-6" />
            <span className="text-xs font-medium">Home</span>
          </Link>
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={clsx(
                  "flex flex-col items-center gap-1 px-4 py-2",
                  isActive ? "text-trm-red" : "text-gray-400"
                )}
              >
                <item.icon className="w-6 h-6" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:top-16 lg:left-0 lg:z-50 lg:h-[calc(100vh-4rem)] lg:w-72 lg:bg-white lg:shadow-xl lg:flex lg:flex-col">

        {/* User Info */}
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-trm-red/10 flex items-center justify-center">
              <User className="w-6 h-6 text-trm-red" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">{userName}</p>
              <p className="text-sm text-gray-500">{roleLabel}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1">
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
        <div className="p-4 border-t border-gray-100">
          <button className="flex items-center gap-3 px-4 py-3 w-full text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Top Bar */}
      <header className="h-16 bg-white border-b border-gray-100 flex items-center px-4 lg:px-6 sticky top-0 z-30">
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg mr-4"
        >
          <Menu className="w-6 h-6" />
        </button>

        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <img src="/logo.png" alt="TRM" className="h-10 w-auto" />
          <div>
            <h1 className="text-lg font-bold text-gray-900 font-display">TRM Operations</h1>
            <p className="text-xs text-gray-500">{roleLabel}</p>
          </div>
        </Link>

        <div className="flex-1" />

        {/* Status Indicator */}
        <div className="flex items-center gap-3 mr-6">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/20 rounded-full">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-sm text-emerald-400 font-medium">Online</span>
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
              <span className="text-trm-red font-semibold text-sm">
                {userName.split(" ").map(n => n[0]).join("")}
              </span>
            </div>
            <div className="hidden sm:block">
              <p className="font-medium text-gray-900">{userName}</p>
              <p className="text-xs text-gray-500">{roleLabel}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="lg:pl-72 pb-20 lg:pb-0">

        {/* Page Content */}
        <main className="p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
