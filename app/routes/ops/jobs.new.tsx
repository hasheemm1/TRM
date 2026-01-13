import { Link, useNavigate } from "react-router";
import { 
  ArrowLeft, 
  Wrench, 
  MapPin, 
  AlertTriangle,
  Building2,
  Save,
  Send
} from "lucide-react";
import { OpsLayout } from "~/components/layouts";
import { Card, Button, Input, Select } from "~/components/ui";
import { useState } from "react";

export function meta() {
  return [{ title: "New Job - Operations | TRM Ops" }];
}

const priorityOptions = [
  { value: "", label: "Select priority..." },
  { value: "low", label: "Low - Can wait" },
  { value: "medium", label: "Medium - Should address soon" },
  { value: "high", label: "High - Urgent" },
  { value: "critical", label: "Critical - Emergency" },
];

const typeOptions = [
  { value: "", label: "Select type..." },
  { value: "internal", label: "Internal - TRM Staff" },
  { value: "external_contractor", label: "External Contractor" },
];

const assetOptions = [
  { value: "", label: "Select asset (optional)..." },
  { value: "lift-a", label: "Lift A - Main Entrance" },
  { value: "lift-b", label: "Lift B - Main Entrance" },
  { value: "hvac-1", label: "HVAC Unit 1 - Level 1" },
  { value: "hvac-2", label: "HVAC Unit 2 - Level 2" },
  { value: "hvac-3", label: "HVAC Unit 3 - Level 3" },
  { value: "generator-1", label: "Generator 1 - Main" },
  { value: "generator-2", label: "Generator 2 - Backup" },
];

const vendorOptions = [
  { value: "", label: "Select vendor..." },
  { value: "lift-master", label: "Lift Master Ltd" },
  { value: "coolair", label: "CoolAir Systems" },
  { value: "electropro", label: "ElectroPro Ltd" },
  { value: "hvac-masters", label: "HVAC Masters" },
  { value: "other", label: "Other (New Vendor)" },
];

const operativeOptions = [
  { value: "", label: "Select operative..." },
  { value: "john", label: "John Kamau - General" },
  { value: "peter", label: "Peter Ochieng - Electrical" },
  { value: "grace", label: "Grace Muthoni - Plumbing" },
  { value: "david", label: "David Mwangi - HVAC" },
];

export default function NewJob() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    priority: "",
    type: "",
    asset: "",
    vendor: "",
    vendorEmail: "",
    operative: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // TODO: Submit to Firebase
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setLoading(false);
    navigate("/ops/jobs");
  };

  const isExternal = formData.type === "external_contractor";

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
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-display">
          Create New Job
        </h1>
        <p className="text-gray-500 mt-1">Open a new work order for maintenance or repair</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Details */}
            <Card variant="bordered">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-trm-red/10 flex items-center justify-center">
                  <Wrench className="w-5 h-5 text-trm-red" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 font-display">
                    Job Details
                  </h2>
                  <p className="text-sm text-gray-500">Describe the issue or work needed</p>
                </div>
              </div>

              <div className="space-y-4">
                <Input
                  label="Job Title"
                  name="title"
                  placeholder="e.g., Lift B - Mechanical Failure"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Description
                  </label>
                  <textarea
                    name="description"
                    rows={4}
                    placeholder="Describe the issue in detail..."
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-trm-red/20 focus:border-trm-red"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    label="Location"
                    name="location"
                    placeholder="e.g., Level 3 - Food Court"
                    value={formData.location}
                    onChange={handleChange}
                    icon={<MapPin className="w-5 h-5" />}
                    required
                  />
                  <Select
                    label="Related Asset"
                    name="asset"
                    options={assetOptions}
                    value={formData.asset}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Select
                    label="Priority"
                    name="priority"
                    options={priorityOptions}
                    value={formData.priority}
                    onChange={handleChange}
                    icon={<AlertTriangle className="w-5 h-5" />}
                    required
                  />
                  <Select
                    label="Job Type"
                    name="type"
                    options={typeOptions}
                    value={formData.type}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </Card>

            {/* Assignment */}
            <Card variant="bordered">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 font-display">
                    Assignment
                  </h2>
                  <p className="text-sm text-gray-500">
                    {isExternal ? "Select vendor for quotation" : "Assign to internal staff"}
                  </p>
                </div>
              </div>

              {isExternal ? (
                <div className="space-y-4">
                  <Select
                    label="Vendor"
                    name="vendor"
                    options={vendorOptions}
                    value={formData.vendor}
                    onChange={handleChange}
                    required={isExternal}
                  />
                  {formData.vendor === "other" && (
                    <Input
                      label="Vendor Email"
                      name="vendorEmail"
                      type="email"
                      placeholder="vendor@company.com"
                      value={formData.vendorEmail}
                      onChange={handleChange}
                      helperText="A quote request link will be sent to this email"
                      required
                    />
                  )}
                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <p className="text-sm text-blue-700">
                      <strong>Quote Request:</strong> The vendor will receive an email with a secure link to submit their quotation. No app installation required.
                    </p>
                  </div>
                </div>
              ) : formData.type === "internal" ? (
                <Select
                  label="Assign to Operative"
                  name="operative"
                  options={operativeOptions}
                  value={formData.operative}
                  onChange={handleChange}
                  required={!isExternal && formData.type === "internal"}
                />
              ) : (
                <p className="text-gray-500 text-center py-4">
                  Select a job type above to configure assignment
                </p>
              )}
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card variant="elevated" className="sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 font-display">
                Job Summary
              </h3>

              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-500">Title</span>
                  <span className="font-medium text-gray-900 text-right max-w-[60%] truncate">
                    {formData.title || "—"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Location</span>
                  <span className="font-medium text-gray-900">
                    {formData.location || "—"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Priority</span>
                  <span className={`font-medium capitalize ${
                    formData.priority === "critical" ? "text-red-600" :
                    formData.priority === "high" ? "text-amber-600" :
                    formData.priority === "medium" ? "text-blue-600" :
                    "text-gray-600"
                  }`}>
                    {formData.priority || "—"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Type</span>
                  <span className="font-medium text-gray-900 capitalize">
                    {formData.type?.replace(/_/g, " ") || "—"}
                  </span>
                </div>
              </div>

              <hr className="my-4" />

              <div className="space-y-3">
                <Button
                  type="submit"
                  className="w-full"
                  loading={loading}
                  icon={isExternal ? <Send className="w-5 h-5" /> : <Save className="w-5 h-5" />}
                >
                  {isExternal ? "Create & Request Quote" : "Create Job"}
                </Button>
                <Link to="/ops/jobs" className="block">
                  <Button type="button" variant="ghost" className="w-full">
                    Cancel
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </form>
    </OpsLayout>
  );
}
