import { 
  AlertTriangle, 
  Clock, 
  XCircle,
  CheckCircle2,
  Bell,
  User
} from "lucide-react";
import { SecurityLayout } from "~/components/layouts";
import { Card, Badge, Button } from "~/components/ui";

export function meta() {
  return [{ title: "Alerts - Security Gate | TRM Ops" }];
}

interface Alert {
  id: string;
  type: "overstay" | "denied_entry" | "unauthorized" | "resolved";
  title: string;
  description: string;
  timestamp: string;
  priority: "high" | "medium" | "low";
  resolved: boolean;
}

// Mock alerts
const alerts: Alert[] = [
  {
    id: "1",
    type: "overstay",
    title: "Extended Visit Duration",
    description: "CoolAir Systems team has been on-site for over 8 hours (expected: 4 hours)",
    timestamp: "2026-01-13T14:00:00",
    priority: "medium",
    resolved: false,
  },
  {
    id: "2",
    type: "denied_entry",
    title: "Unauthorized Entry Attempt",
    description: "ABC Contractors attempted entry without pre-authorization. Entry denied by James Otieno.",
    timestamp: "2026-01-13T11:20:00",
    priority: "high",
    resolved: true,
  },
  {
    id: "3",
    type: "overstay",
    title: "After Hours Presence",
    description: "ElectroPro Ltd still on-site past scheduled departure (17:00)",
    timestamp: "2026-01-12T18:30:00",
    priority: "high",
    resolved: true,
  },
];

const priorityConfig = {
  high: { color: "danger" as const, bgColor: "bg-red-500/20", borderColor: "border-red-500/50" },
  medium: { color: "warning" as const, bgColor: "bg-amber-500/20", borderColor: "border-amber-500/50" },
  low: { color: "info" as const, bgColor: "bg-cyan-500/20", borderColor: "border-cyan-500/50" },
};

const typeIcons = {
  overstay: Clock,
  denied_entry: XCircle,
  unauthorized: AlertTriangle,
  resolved: CheckCircle2,
};

export default function SecurityAlerts() {
  const activeAlerts = alerts.filter(a => !a.resolved);
  const resolvedAlerts = alerts.filter(a => a.resolved);

  const handleResolve = (alertId: string) => {
    alert(`Alert ${alertId} marked as resolved`);
  };

  return (
    <SecurityLayout guardName="James Otieno">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white font-display">
            Security Alerts
          </h1>
          <p className="text-gray-400 mt-1">
            Monitor and respond to security notifications
          </p>
        </div>
        <div className="flex items-center gap-4">
          {activeAlerts.length > 0 && (
            <div className="flex items-center gap-2 px-4 py-2 bg-red-500/20 rounded-full animate-pulse">
              <Bell className="w-5 h-5 text-red-400" />
              <span className="text-red-400 font-medium">
                {activeAlerts.length} Active Alert{activeAlerts.length > 1 ? "s" : ""}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Active Alerts */}
      {activeAlerts.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            Active Alerts
          </h2>
          <div className="space-y-4">
            {activeAlerts.map((alert) => {
              const config = priorityConfig[alert.priority];
              const Icon = typeIcons[alert.type];
              const time = new Date(alert.timestamp).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <Card 
                  key={alert.id} 
                  variant="glass" 
                  className={`bg-security-surface border-2 ${config.borderColor}`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-xl ${config.bgColor} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="text-lg font-semibold text-white">{alert.title}</h3>
                        <Badge variant={config.color} size="md" pulse>
                          {alert.priority.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-gray-400 mb-3">{alert.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {time}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 flex-shrink-0">
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => handleResolve(alert.id)}
                      >
                        Mark Resolved
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* No Active Alerts */}
      {activeAlerts.length === 0 && (
        <Card variant="glass" className="bg-emerald-500/10 border-emerald-500/30 mb-8">
          <div className="flex items-center gap-4 py-4">
            <div className="w-14 h-14 rounded-xl bg-emerald-500/20 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-emerald-400 font-display">
                All Clear
              </h3>
              <p className="text-emerald-300">No active security alerts at this time</p>
            </div>
          </div>
        </Card>
      )}

      {/* Resolved Alerts */}
      {resolvedAlerts.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-400 mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            Recently Resolved
          </h2>
          <div className="space-y-3">
            {resolvedAlerts.map((alert) => {
              const Icon = typeIcons[alert.type];
              const time = new Date(alert.timestamp).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <Card 
                  key={alert.id} 
                  variant="glass" 
                  padding="sm"
                  className="bg-security-surface border-security-border opacity-60"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gray-700 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-300">{alert.title}</p>
                      <p className="text-sm text-gray-500 truncate">{alert.description}</p>
                    </div>
                    <div className="text-sm text-gray-500 flex-shrink-0">
                      {time}
                    </div>
                    <Badge variant="default" size="sm">Resolved</Badge>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </SecurityLayout>
  );
}
