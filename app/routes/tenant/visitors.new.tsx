import { Link, useNavigate } from "react-router";
import { ArrowLeft, Users, Calendar, Clock, FileText, Save } from "lucide-react";
import { TenantLayout } from "~/components/layouts";
import { Card, Button, Input, Select } from "~/components/ui";
import { useState } from "react";

export function meta() {
  return [{ title: "New Visitor Request - Tenant Portal | TRM Ops" }];
}

const purposeOptions = [
  { value: "", label: "Select purpose..." },
  { value: "repair", label: "Repair & Maintenance" },
  { value: "installation", label: "Installation" },
  { value: "inspection", label: "Inspection" },
  { value: "cleaning", label: "Cleaning Services" },
  { value: "delivery", label: "Delivery" },
  { value: "consultation", label: "Consultation" },
  { value: "other", label: "Other" },
];

export default function NewVisitorRequest() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    contactPhone: "",
    contactIdNumber: "",
    vehiclePlate: "",
    teamSize: "1",
    purpose: "",
    purposeDetails: "",
    scheduledDate: "",
    scheduledTime: "",
    notes: "",
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
    navigate("/tenant/visitors");
  };

  return (
    <TenantLayout tenantName="Carrefour">
      {/* Page Header */}
      <div className="mb-8">
        <Link
          to="/tenant/visitors"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Visitors
        </Link>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-display">
          New Visitor Request
        </h1>
        <p className="text-gray-500 mt-1">Pre-authorize a contractor or visitor</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Company Information */}
            <Card variant="bordered">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-trm-red/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-trm-red" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 font-display">
                    Contractor Information
                  </h2>
                  <p className="text-sm text-gray-500">Details about the visiting company</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  label="Company Name"
                  name="companyName"
                  placeholder="e.g., CoolAir Systems"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Contact Person"
                  name="contactName"
                  placeholder="e.g., John Mwangi"
                  value={formData.contactName}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Contact Phone"
                  name="contactPhone"
                  type="tel"
                  placeholder="e.g., 0712 345 678"
                  value={formData.contactPhone}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="ID Number (Optional)"
                  name="contactIdNumber"
                  placeholder="National ID or Passport"
                  value={formData.contactIdNumber}
                  onChange={handleChange}
                />
                <Input
                  label="Vehicle Plate (Optional)"
                  name="vehiclePlate"
                  placeholder="e.g., KBZ 123A"
                  value={formData.vehiclePlate}
                  onChange={handleChange}
                />
                <Input
                  label="Team Size"
                  name="teamSize"
                  type="number"
                  min="1"
                  max="20"
                  value={formData.teamSize}
                  onChange={handleChange}
                  required
                />
              </div>
            </Card>

            {/* Visit Details */}
            <Card variant="bordered">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-trm-accent/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-trm-accent" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 font-display">
                    Visit Details
                  </h2>
                  <p className="text-sm text-gray-500">Purpose and timing of the visit</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <Select
                  label="Purpose Category"
                  name="purpose"
                  options={purposeOptions}
                  value={formData.purpose}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Specific Details"
                  name="purposeDetails"
                  placeholder="e.g., Freezer compressor replacement"
                  value={formData.purposeDetails}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Scheduled Date"
                  name="scheduledDate"
                  type="date"
                  value={formData.scheduledDate}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Scheduled Time"
                  name="scheduledTime"
                  type="time"
                  value={formData.scheduledTime}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Additional Notes
                </label>
                <textarea
                  name="notes"
                  rows={3}
                  placeholder="Any special instructions or requirements..."
                  value={formData.notes}
                  onChange={handleChange}
                    className="block w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-trm-red/20 focus:border-trm-red"
                />
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Summary Card */}
            <Card variant="elevated" className="sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 font-display">
                Request Summary
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Company</span>
                  <span className="font-medium text-gray-900">
                    {formData.companyName || "—"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Team Size</span>
                  <span className="font-medium text-gray-900">
                    {formData.teamSize} person{parseInt(formData.teamSize) > 1 ? "s" : ""}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Date</span>
                  <span className="font-medium text-gray-900">
                    {formData.scheduledDate || "—"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Time</span>
                  <span className="font-medium text-gray-900">
                    {formData.scheduledTime || "—"}
                  </span>
                </div>
              </div>

              <hr className="my-4" />

              <div className="space-y-3">
                <Button
                  type="submit"
                  className="w-full"
                  loading={loading}
                  icon={<Save className="w-5 h-5" />}
                >
                  Submit Request
                </Button>
                <Link to="/tenant/visitors" className="block">
                  <Button type="button" variant="ghost" className="w-full">
                    Cancel
                  </Button>
                </Link>
              </div>

              <p className="text-xs text-gray-400 mt-4 text-center">
                The security team will be notified of this pre-authorization
              </p>
            </Card>
          </div>
        </div>
      </form>
    </TenantLayout>
  );
}
