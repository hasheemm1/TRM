import { Link, useLocation } from "react-router";
import { 
  Shield, 
  ScanLine, 
  Users, 
  Clock, 
  LogOut,
  AlertTriangle,
  Home
} from "lucide-react";
import { clsx } from "clsx";
import type { ReactNode } from "react";

interface SecurityLayoutProps {
  children: ReactNode;
  guardName?: string;
}

const navItems = [
  { href: "/security", icon: ScanLine, label: "Scan" },
  { href: "/security/onsite", icon: Users, label: "On-Site" },
  { href: "/security/log", icon: Clock, label: "Activity Log" },
  { href: "/security/alerts", icon: AlertTriangle, label: "Alerts" },
];

export function SecurityLayout({ children, guardName = "Guard" }: SecurityLayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-security-bg text-security-text">
      {/* Top Bar */}
      <header className="h-16 bg-security-surface border-b border-security-border flex items-center px-6">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <img src="/logo.png" alt="TRM" className="h-10 w-auto" />
          <div>
            <h1 className="text-lg font-bold text-white font-display">TRM Security</h1>
            <p className="text-xs text-gray-400">Gate Control</p>
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

        {/* Guard Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {guardName.split(" ").map(n => n[0]).join("")}
            </span>
          </div>
          <div className="hidden sm:block">
            <p className="font-medium text-white">{guardName}</p>
            <p className="text-xs text-gray-400">Main Gate</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-20 lg:w-64 bg-security-surface border-r border-security-border min-h-[calc(100vh-4rem)]">
          <nav className="p-2 lg:p-4 space-y-1">
            <Link
              to="/"
              className="flex items-center justify-center lg:justify-start gap-3 p-3 lg:px-4 lg:py-3 rounded-xl transition-all duration-200 text-gray-400 hover:bg-gray-800 hover:text-white mb-2"
            >
              <Home className="w-6 h-6" />
              <span className="hidden lg:block font-medium">Home</span>
            </Link>
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={clsx(
                    "flex items-center justify-center lg:justify-start gap-3 p-3 lg:px-4 lg:py-3 rounded-xl transition-all duration-200",
                    isActive
                      ? "bg-security-accent text-security-bg shadow-lg shadow-security-accent/25"
                      : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <item.icon className="w-6 h-6" />
                  <span className="hidden lg:block font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="absolute bottom-0 left-0 w-20 lg:w-64 p-2 lg:p-4 border-t border-security-border">
            <button className="flex items-center justify-center lg:justify-start gap-3 p-3 lg:px-4 lg:py-3 w-full text-gray-400 hover:bg-gray-800 hover:text-white rounded-xl transition-colors">
              <LogOut className="w-6 h-6" />
              <span className="hidden lg:block font-medium">Sign Out</span>
            </button>
          </div>
        </aside>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
