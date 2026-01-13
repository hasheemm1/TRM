import { Link } from "react-router";
import { 
  Building2, 
  Shield, 
  Wrench, 
  LayoutDashboard,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

export function meta() {
  return [
    { title: "TRM Ops - Facility Operations Platform" },
    { name: "description", content: "Centralized facility operations platform for Thika Road Mall" },
  ];
}

const portals = [
  {
    title: "Tenant Portal",
    description: "Pre-authorize contractors and manage visitor requests",
    icon: Building2,
    href: "/tenant",
    color: "from-trm-red to-red-700",
    features: ["Pre-book contractors", "Track visitor status", "View schedule"],
  },
  {
    title: "Security Gate",
    description: "Verify and manage site access with instant lookup",
    icon: Shield,
    href: "/security",
    color: "from-gray-700 to-gray-900",
    features: ["ID/Plate scanning", "Real-time verification", "Activity logging"],
  },
  {
    title: "Operations",
    description: "Manage jobs, inventory, and maintenance tasks",
    icon: Wrench,
    href: "/ops",
    color: "from-trm-red to-rose-700",
    features: ["Job management", "Inventory control", "Photo documentation"],
  },
  {
    title: "Admin Dashboard",
    description: "Complete oversight with real-time analytics",
    icon: LayoutDashboard,
    href: "/admin",
    color: "from-gray-800 to-black",
    features: ["Live gate log", "Financial overview", "Asset history"],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="pt-12 pb-8 px-6 text-center">
          <div className="inline-flex items-center gap-3 mb-6">
            <img 
              src="/logo.png" 
              alt="TRM Logo" 
              className="h-16 w-auto"
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-display tracking-tight">
            TRM <span className="text-trm-red">Ops</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Centralized Facility Operations Platform for Thika Road Mall
          </p>
          <div className="flex items-center justify-center gap-2 mt-6 text-sm text-gray-500">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span>System Online</span>
          </div>
        </header>

        {/* Portal Cards */}
        <main className="max-w-7xl mx-auto px-6 pb-20">
          <div className="grid md:grid-cols-2 gap-6">
            {portals.map((portal, index) => (
              <Link
                key={portal.href}
                to={portal.href}
                className="group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 hover:bg-gray-800/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/20 animate-fade-in-up opacity-0"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Gradient accent */}
                <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-3xl bg-gradient-to-r ${portal.color}`} />
                
                <div className="flex items-start gap-5">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${portal.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                    <portal.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-2 font-display group-hover:text-trm-secondary transition-colors">
                      {portal.title}
                    </h2>
                    <p className="text-gray-400 mb-4">{portal.description}</p>
                    
                    <ul className="space-y-2 mb-6">
                      {portal.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-gray-500">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center gap-2 text-trm-secondary font-medium group-hover:gap-3 transition-all">
                      <span>Enter Portal</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Active Visitors", value: "12", color: "text-cyan-400" },
              { label: "Open Jobs", value: "8", color: "text-orange-400" },
              { label: "Today's Check-ins", value: "47", color: "text-emerald-400" },
              { label: "Inventory Items", value: "1,234", color: "text-purple-400" },
            ].map((stat) => (
              <div key={stat.label} className="bg-gray-800/30 border border-gray-700/30 rounded-2xl p-5 text-center">
                <p className={`text-3xl font-bold ${stat.color} font-display`}>{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </main>

        {/* Footer */}
        <footer className="py-8 text-center text-gray-600 text-sm">
          <p>© 2025 Thika Road Mall. TRM Ops Platform.</p>
        </footer>
      </div>
    </div>
  );
}
