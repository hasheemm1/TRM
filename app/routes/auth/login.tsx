import { useState } from "react";
import { Link, Form, useActionData, useNavigation } from "react-router";
import { Phone, ArrowRight, Shield } from "lucide-react";
import { Button, Input } from "~/components/ui";
import { sendOTP, generateOTP, isValidKenyanPhone } from "~/lib/africastalking.server";
import { createOtpSession } from "~/lib/session.server";
import { redirect } from "react-router";

export function meta() {
  return [{ title: "Login - TRM Ops" }];
}

// Server action to send OTP
export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const phoneNumber = formData.get("phoneNumber") as string;

  // Validate phone number
  if (!phoneNumber || !isValidKenyanPhone(phoneNumber)) {
    return { error: "Please enter a valid Kenyan phone number" };
  }

  // Generate OTP
  const otp = generateOTP();
  
  // Send OTP via Africa's Talking
  const result = await sendOTP(phoneNumber, otp);
  
  if (!result.success) {
    return { error: result.error || "Failed to send OTP. Please try again." };
  }

  // Store OTP in session and redirect to verify page
  const cookie = await createOtpSession(phoneNumber, otp);
  
  return redirect("/login/verify", {
    headers: {
      "Set-Cookie": cookie,
    },
  });
}

export default function Login() {
  const actionData = useActionData<{ error?: string }>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <a 
              href="/" 
              className="inline-flex items-center gap-2 text-trm-red hover:text-trm-red/80 mb-6 text-sm font-medium underline"
            >
              ← Back to Home
            </a>
            <div className="flex items-center gap-3 mb-6">
              <a href="/" className="hover:opacity-80 transition-opacity">
                <img src="/logo.png" alt="TRM" className="h-12 w-auto" />
              </a>
              <span className="text-xl font-bold text-trm-red font-display">TRM Ops</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 font-display mb-2">
              Welcome back
            </h1>
            <p className="text-gray-500">
              Enter your phone number to receive a verification code
            </p>
          </div>

          <Form method="post" className="space-y-6">
            {/* Phone Number Input */}
            <div>
              <Input
                label="Phone Number"
                name="phoneNumber"
                type="tel"
                placeholder="0712 345 678"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                icon={<Phone className="w-5 h-5" />}
                helperText="We'll send you a verification code via SMS"
                error={actionData?.error}
                required
              />
            </div>

            {/* Demo Numbers Info */}
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
              <p className="text-sm text-blue-700">
                <strong>Demo Mode:</strong> Use any valid Kenyan phone number format:
              </p>
              <ul className="text-sm text-blue-600 mt-2 space-y-1">
                <li>• 0712 345 678</li>
                <li>• +254 712 345 678</li>
                <li>• 254712345678</li>
              </ul>
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              loading={isSubmitting}
              icon={<ArrowRight className="w-5 h-5" />}
              disabled={!phoneNumber}
            >
              {isSubmitting ? "Sending Code..." : "Send Verification Code"}
            </Button>
          </Form>

          {/* Security note */}
          <div className="mt-8 pt-8 border-t border-gray-100">
            <div className="flex items-center gap-3 text-gray-500">
              <Shield className="w-5 h-5 text-trm-red" />
              <p className="text-sm">
                Your phone number is secured with OTP verification via Africa's Talking
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Branding */}
      <div className="hidden lg:flex flex-1 bg-gradient-trm items-center justify-center p-12 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* Red accent bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-trm-red" />

        <div className="relative z-10 text-center text-white">
          <a href="/" className="inline-block hover:opacity-80 transition-opacity cursor-pointer">
            <img 
              src="/logo.png" 
              alt="TRM" 
              className="h-24 w-auto mx-auto mb-8"
            />
          </a>
          <h2 className="text-4xl font-bold mb-4 font-display">TRM Ops</h2>
          <p className="text-xl text-white/80 mb-8">
            Centralized Facility Operations Platform
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Security", "Maintenance", "Inventory", "Analytics"].map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 bg-trm-red/80 backdrop-blur-sm rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
