import { useState } from "react";
import { 
  ScanLine, 
  Search, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  User,
  Building2,
  Car,
  Clock,
  ArrowRight
} from "lucide-react";
import { SecurityLayout } from "~/components/layouts";
import { Card, Button, Input, Badge } from "~/components/ui";

export function meta() {
  return [{ title: "Scan - Security Gate | TRM Ops" }];
}

type ScanResult = {
  status: "authorized" | "unauthorized" | "not_found";
  visitorName?: string;
  company?: string;
  tenant?: string;
  purpose?: string;
  teamSize?: number;
  vehiclePlate?: string;
  scheduledTime?: string;
} | null;

export default function SecurityScan() {
  const [searchQuery, setSearchQuery] = useState("");
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult>(null);

  const handleScan = async () => {
    if (!searchQuery.trim()) return;
    
    setScanning(true);
    setScanResult(null);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Mock results based on query
    if (searchQuery.toLowerCase().includes("cool") || searchQuery.includes("KBZ")) {
      setScanResult({
        status: "authorized",
        visitorName: "John Mwangi",
        company: "CoolAir Systems",
        tenant: "Carrefour",
        purpose: "Freezer Repair",
        teamSize: 3,
        vehiclePlate: "KBZ 123A",
        scheduledTime: "09:00",
      });
    } else if (searchQuery.toLowerCase().includes("denied")) {
      setScanResult({
        status: "unauthorized",
        visitorName: "Unknown Contractor",
        company: "ABC Services",
      });
    } else {
      setScanResult({ status: "not_found" });
    }
    
    setScanning(false);
  };

  const handleCheckIn = () => {
    // TODO: Implement check-in logic
    alert("Visitor checked in successfully!");
    setScanResult(null);
    setSearchQuery("");
  };

  const handleDeny = () => {
    // TODO: Implement deny logic
    alert("Entry denied and logged.");
    setScanResult(null);
    setSearchQuery("");
  };

  return (
    <SecurityLayout guardName="James Otieno">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white font-display mb-2">
            Visitor Verification
          </h1>
          <p className="text-gray-400">
            Scan ID or enter vehicle plate number to verify authorization
          </p>
        </div>

        {/* Scan Input */}
        <Card variant="glass" className="mb-8 bg-security-surface border-security-border">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Enter ID number, name, or vehicle plate..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleScan()}
                icon={<Search className="w-5 h-5" />}
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
              />
            </div>
            <Button
              onClick={handleScan}
              loading={scanning}
              icon={<ScanLine className="w-5 h-5" />}
              className="bg-security-accent text-security-bg hover:bg-security-accent/90"
            >
              Verify
            </Button>
          </div>

          {/* Quick scan hint */}
          <p className="text-sm text-gray-500 mt-3">
            💡 Try searching: "CoolAir", "KBZ 123A", or "denied" for demo
          </p>
        </Card>

        {/* Scanning Animation */}
        {scanning && (
          <Card variant="glass" className="bg-security-surface border-security-border mb-8">
            <div className="relative h-48 flex items-center justify-center overflow-hidden rounded-xl bg-gray-900">
              {/* Scan line animation */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute left-0 right-0 h-1 bg-security-accent opacity-50 scan-line" />
              </div>
              <div className="text-center z-10">
                <ScanLine className="w-16 h-16 text-security-accent mx-auto mb-4 animate-pulse" />
                <p className="text-lg text-white font-medium">Verifying...</p>
              </div>
            </div>
          </Card>
        )}

        {/* Scan Result */}
        {scanResult && !scanning && (
          <Card 
            variant="glass" 
            className={`bg-security-surface border-2 ${
              scanResult.status === "authorized" 
                ? "border-emerald-500" 
                : scanResult.status === "unauthorized"
                ? "border-red-500"
                : "border-amber-500"
            }`}
          >
            {/* Status Header */}
            <div className={`flex items-center gap-4 p-6 -m-6 mb-6 rounded-t-2xl ${
              scanResult.status === "authorized"
                ? "bg-emerald-500/20"
                : scanResult.status === "unauthorized"
                ? "bg-red-500/20"
                : "bg-amber-500/20"
            }`}>
              {scanResult.status === "authorized" ? (
                <>
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500 flex items-center justify-center animate-pulse-success">
                    <CheckCircle2 className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-emerald-400 font-display">
                      AUTHORIZED
                    </h2>
                    <p className="text-emerald-300">Pre-booked visitor confirmed</p>
                  </div>
                </>
              ) : scanResult.status === "unauthorized" ? (
                <>
                  <div className="w-16 h-16 rounded-2xl bg-red-500 flex items-center justify-center animate-pulse-danger">
                    <XCircle className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-red-400 font-display">
                      NOT AUTHORIZED
                    </h2>
                    <p className="text-red-300">No pre-booking found</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-2xl bg-amber-500 flex items-center justify-center animate-pulse-warning">
                    <AlertTriangle className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-amber-400 font-display">
                      NOT FOUND
                    </h2>
                    <p className="text-amber-300">No matching records</p>
                  </div>
                </>
              )}
            </div>

            {/* Visitor Details */}
            {scanResult.status === "authorized" && (
              <>
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-xl">
                    <User className="w-6 h-6 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-400">Visitor</p>
                      <p className="text-lg font-semibold text-white">{scanResult.visitorName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-xl">
                    <Building2 className="w-6 h-6 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-400">Company</p>
                      <p className="text-lg font-semibold text-white">{scanResult.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-xl">
                    <Car className="w-6 h-6 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-400">Vehicle</p>
                      <p className="text-lg font-semibold text-white">{scanResult.vehiclePlate || "N/A"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-xl">
                    <Clock className="w-6 h-6 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-400">Scheduled</p>
                      <p className="text-lg font-semibold text-white">{scanResult.scheduledTime}</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl mb-6">
                  <p className="text-emerald-400">
                    <strong>Expected by:</strong> {scanResult.tenant}
                  </p>
                  <p className="text-emerald-400">
                    <strong>Purpose:</strong> {scanResult.purpose}
                  </p>
                  <p className="text-emerald-400">
                    <strong>Team Size:</strong> {scanResult.teamSize} people
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <Button
                    onClick={handleCheckIn}
                    variant="success"
                    size="lg"
                    className="flex-1"
                    icon={<ArrowRight className="w-5 h-5" />}
                  >
                    Check In Visitor
                  </Button>
                </div>
              </>
            )}

            {scanResult.status === "unauthorized" && (
              <>
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl mb-6">
                  <p className="text-red-400">
                    This visitor has not been pre-authorized by any tenant.
                    They must contact their host to be added to the system.
                  </p>
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={handleDeny}
                    variant="danger"
                    size="lg"
                    className="flex-1"
                  >
                    Log & Deny Entry
                  </Button>
                </div>
              </>
            )}

            {scanResult.status === "not_found" && (
              <div className="text-center py-4">
                <p className="text-gray-400 mb-4">
                  No records found for this search. Please check the ID or plate number.
                </p>
                <Button variant="outline" onClick={() => setScanResult(null)}>
                  Try Again
                </Button>
              </div>
            )}
          </Card>
        )}

        {/* Quick Stats */}
        {!scanResult && !scanning && (
          <div className="grid grid-cols-3 gap-4 mt-8">
            <Card variant="glass" className="bg-security-surface border-security-border text-center">
              <p className="text-3xl font-bold text-security-accent font-display">12</p>
              <p className="text-sm text-gray-400">Currently On-Site</p>
            </Card>
            <Card variant="glass" className="bg-security-surface border-security-border text-center">
              <p className="text-3xl font-bold text-emerald-400 font-display">47</p>
              <p className="text-sm text-gray-400">Check-ins Today</p>
            </Card>
            <Card variant="glass" className="bg-security-surface border-security-border text-center">
              <p className="text-3xl font-bold text-amber-400 font-display">3</p>
              <p className="text-sm text-gray-400">Expected Soon</p>
            </Card>
          </div>
        )}
      </div>
    </SecurityLayout>
  );
}
