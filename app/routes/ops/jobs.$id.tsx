import { Link, useParams } from "react-router";
import { 
  ArrowLeft, 
  Wrench, 
  MapPin, 
  User,
  Clock,
  FileText,
  Camera,
  CheckCircle2,
  XCircle,
  DollarSign,
  Building2
} from "lucide-react";
import { OpsLayout } from "~/components/layouts";
import { Card, CardHeader, Badge, Button } from "~/components/ui";
import { useState } from "react";

export function meta() {
  return [{ title: "Job Details - Operations | TRM Ops" }];
}

// Mock job data
const mockJob = {
  id: "1",
  title: "Lift B - Mechanical Failure",
  description: "Main passenger lift not responding to floor calls. Motor appears to be making unusual sounds. Requires immediate attention as this is a primary access point.",
  location: "Main Entrance",
  type: "external_contractor" as const,
  status: "quote_received" as const,
  priority: "critical" as const,
  asset: {
    id: "lift-b",
    name: "Lift B",
    type: "Elevator",
  },
  vendor: {
    name: "Lift Master Ltd",
    email: "quotes@liftmaster.co.ke",
    phone: "+254 712 345 678",
  },
  quote: {
    amount: 85000,
    document: "quote-lift-b-jan2026.pdf",
    submittedAt: "2026-01-12T14:30:00",
    validUntil: "2026-01-19",
    breakdown: [
      { item: "Motor Replacement", cost: 65000 },
      { item: "Labor (2 technicians, 2 days)", cost: 15000 },
      { item: "Testing & Certification", cost: 5000 },
    ],
  },
  createdBy: {
    name: "Daniel Kipchoge",
    role: "Facility Manager",
  },
  createdAt: "2026-01-12T09:00:00",
  timeline: [
    { action: "Job Created", by: "Daniel Kipchoge", at: "2026-01-12T09:00:00" },
    { action: "Quote Requested", by: "System", at: "2026-01-12T09:05:00" },
    { action: "Quote Received", by: "Lift Master Ltd", at: "2026-01-12T14:30:00" },
  ],
};

const statusColors = {
  open: "default",
  quote_requested: "info",
  quote_received: "purple",
  approved: "success",
  in_progress: "warning",
  pending_certification: "info",
  certified: "success",
  closed: "default",
} as const;

const priorityColors = {
  low: "default",
  medium: "info",
  high: "warning",
  critical: "danger",
} as const;

export default function JobDetail() {
  const { id } = useParams();
  const [approving, setApproving] = useState(false);
  
  const job = mockJob; // In reality, fetch based on id

  const handleApprove = async () => {
    setApproving(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    alert("Quote approved! LPO generated and vendor notified.");
    setApproving(false);
  };

  const handleReject = () => {
    alert("Quote rejected. Vendor will be notified.");
  };

  return (
    <OpsLayout userName="Daniel Kipchoge" userRole="facility_manager">
      {/* Page Header */}
      <div className="mb-8">
        <Link
          to="/ops/jobs"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Jobs
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-display">
                {job.title}
              </h1>
              <Badge variant={priorityColors[job.priority]} size="md">
                {job.priority}
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-gray-500">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                {job.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                Created {new Date(job.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
          <Badge variant={statusColors[job.status]} size="md">
            {job.status.replace(/_/g, " ")}
          </Badge>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <Card variant="bordered">
            <CardHeader 
              title="Job Description" 
              icon={<Wrench className="w-5 h-5" />}
            />
            <p className="text-gray-600 leading-relaxed">{job.description}</p>
            
            {job.asset && (
              <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-500 mb-1">Related Asset</p>
                <p className="font-medium text-gray-900">{job.asset.name} ({job.asset.type})</p>
              </div>
            )}
          </Card>

          {/* Quote Details */}
          {job.quote && (
            <Card variant="bordered" className="border-purple-200 bg-purple-50/30">
              <CardHeader 
                title="Quotation Received" 
                subtitle={`From ${job.vendor.name}`}
                icon={<FileText className="w-5 h-5 text-purple-600" />}
              />

              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-white rounded-xl border border-purple-100">
                  <p className="text-sm text-gray-500 mb-1">Quote Amount</p>
                  <p className="text-2xl font-bold text-gray-900 font-display">
                    KES {job.quote.amount.toLocaleString()}
                  </p>
                </div>
                <div className="p-4 bg-white rounded-xl border border-purple-100">
                  <p className="text-sm text-gray-500 mb-1">Valid Until</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {job.quote.validUntil}
                  </p>
                </div>
              </div>

              {/* Cost Breakdown */}
              <div className="bg-white rounded-xl border border-purple-100 overflow-hidden mb-6">
                <div className="p-4 border-b border-purple-100">
                  <h4 className="font-medium text-gray-900">Cost Breakdown</h4>
                </div>
                <div className="divide-y divide-purple-50">
                  {job.quote.breakdown.map((item, index) => (
                    <div key={index} className="flex justify-between p-4">
                      <span className="text-gray-600">{item.item}</span>
                      <span className="font-medium text-gray-900">
                        KES {item.cost.toLocaleString()}
                      </span>
                    </div>
                  ))}
                  <div className="flex justify-between p-4 bg-purple-50">
                    <span className="font-semibold text-gray-900">Total</span>
                    <span className="font-bold text-gray-900">
                      KES {job.quote.amount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Approval Actions */}
              {job.status === "quote_received" && (
                <div className="flex gap-4">
                  <Button
                    variant="success"
                    size="lg"
                    className="flex-1"
                    onClick={handleApprove}
                    loading={approving}
                    icon={<CheckCircle2 className="w-5 h-5" />}
                  >
                    Approve & Generate LPO
                  </Button>
                  <Button
                    variant="danger"
                    size="lg"
                    onClick={handleReject}
                    icon={<XCircle className="w-5 h-5" />}
                  >
                    Reject
                  </Button>
                </div>
              )}
            </Card>
          )}

          {/* Timeline */}
          <Card variant="bordered">
            <CardHeader title="Activity Timeline" />
            <div className="space-y-4">
              {job.timeline.map((event, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-trm-red" />
                    {index < job.timeline.length - 1 && (
                      <div className="w-0.5 flex-1 bg-gray-200 mt-2" />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="font-medium text-gray-900">{event.action}</p>
                    <p className="text-sm text-gray-500">
                      {event.by} • {new Date(event.at).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Vendor Info */}
          <Card variant="bordered">
            <CardHeader 
              title="Vendor" 
              icon={<Building2 className="w-5 h-5" />}
            />
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Company</p>
                <p className="font-medium text-gray-900">{job.vendor.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-900">{job.vendor.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium text-gray-900">{job.vendor.phone}</p>
              </div>
            </div>
          </Card>

          {/* Created By */}
          <Card variant="bordered">
            <CardHeader 
              title="Created By" 
              icon={<User className="w-5 h-5" />}
            />
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-trm-red/10 flex items-center justify-center">
                <span className="font-semibold text-trm-red">
                  {job.createdBy.name.split(" ").map(n => n[0]).join("")}
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-900">{job.createdBy.name}</p>
                <p className="text-sm text-gray-500">{job.createdBy.role}</p>
              </div>
            </div>
          </Card>

          {/* Actions */}
          <Card variant="bordered">
            <CardHeader title="Actions" />
            <div className="space-y-2">
              <Button variant="outline" className="w-full" icon={<Camera className="w-5 h-5" />}>
                Add Photo
              </Button>
              <Button variant="ghost" className="w-full" icon={<FileText className="w-5 h-5" />}>
                View Documents
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </OpsLayout>
  );
}
