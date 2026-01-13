import { useState, useRef, useEffect } from "react";
import { Link, Form, useActionData, useNavigation, useLoaderData } from "react-router";
import { ArrowLeft, CheckCircle2, RefreshCw } from "lucide-react";
import { Button } from "~/components/ui";
import { 
  getOtpSession, 
  verifyOtp, 
  destroyOtpSession, 
  createUserSession 
} from "~/lib/session.server";
import { sendOTP, generateOTP } from "~/lib/africastalking.server";
import { createOtpSession } from "~/lib/session.server";
import { redirect } from "react-router";

export function meta() {
  return [{ title: "Verify OTP - TRM Ops" }];
}

// Loader to get phone number from session
export async function loader({ request }: { request: Request }) {
  const session = await getOtpSession(request);
  const phoneNumber = session.get("phoneNumber");
  
  if (!phoneNumber) {
    return redirect("/login");
  }
  
  // Mask phone number for display
  const maskedPhone = phoneNumber.replace(/(\+254)(\d{3})(\d{3})(\d{3})/, "$1 $2 *** $4");
  
  return { maskedPhone, phoneNumber };
}

// Server action to verify OTP
export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const intent = formData.get("intent");
  
  if (intent === "resend") {
    // Resend OTP
    const session = await getOtpSession(request);
    const phoneNumber = session.get("phoneNumber");
    
    if (!phoneNumber) {
      return redirect("/login");
    }
    
    const otp = generateOTP();
    const result = await sendOTP(phoneNumber, otp);
    
    if (!result.success) {
      return { error: "Failed to resend OTP. Please try again." };
    }
    
    const cookie = await createOtpSession(phoneNumber, otp);
    
    return { 
      success: true, 
      message: "New verification code sent!" 
    };
  }
  
  // Verify OTP
  const otp = formData.get("otp") as string;
  
  if (!otp || otp.length !== 6) {
    return { error: "Please enter the 6-digit code" };
  }
  
  const result = await verifyOtp(request, otp);
  
  if (!result.success) {
    return { error: result.error };
  }
  
  // OTP verified! Create user session
  // In production, you'd look up the user by phone number in your database
  // For now, we'll create a demo session
  
  // Destroy OTP session
  await destroyOtpSession(request);
  
  // Determine user role based on phone number (demo logic)
  // In production, this would come from your user database
  const role = "admin"; // Default to admin for demo
  const userId = result.phoneNumber || "demo-user";
  
  // Redirect based on role
  const roleRoutes: Record<string, string> = {
    admin: "/admin",
    facility_manager: "/ops",
    maintenance_operative: "/ops/tasks",
    security_guard: "/security",
    tenant_manager: "/tenant",
  };
  
  return createUserSession(userId, role, roleRoutes[role] || "/");
}

export default function VerifyOTP() {
  const { maskedPhone } = useLoaderData<{ maskedPhone: string }>();
  const actionData = useActionData<{ error?: string; success?: boolean; message?: string }>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [resendCooldown, setResendCooldown] = useState(0);

  // Focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  // Handle OTP input
  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits
    
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Only take last digit
    setOtp(newOtp);
    
    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);
    // Focus last filled input or last input
    const lastIndex = Math.min(pastedData.length, 5);
    inputRefs.current[lastIndex]?.focus();
  };

  const handleResend = () => {
    setResendCooldown(60); // 60 second cooldown
  };

  const otpValue = otp.join("");
  const isComplete = otpValue.length === 6;

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl p-8">
          {/* Back Link */}
          <Link 
            to="/login" 
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to login
          </Link>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-trm-red/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-trm-red" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 font-display mb-2">
              Verify Your Number
            </h1>
            <p className="text-gray-500">
              Enter the 6-digit code sent to
            </p>
            <p className="font-semibold text-gray-900 mt-1">
              {maskedPhone}
            </p>
          </div>

          {/* Success Message */}
          {actionData?.success && actionData?.message && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-center">
              {actionData.message}
            </div>
          )}

          {/* Error Message */}
          {actionData?.error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-center">
              {actionData.error}
            </div>
          )}

          {/* OTP Input */}
          <Form method="post">
            <input type="hidden" name="otp" value={otpValue} />
            
            <div className="flex justify-center gap-3 mb-8" onPaste={handlePaste}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => { inputRefs.current[index] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-200 rounded-xl focus:border-trm-red focus:ring-2 focus:ring-trm-red/20 focus:outline-none transition-all"
                />
              ))}
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              loading={isSubmitting && navigation.formData?.get("intent") !== "resend"}
              disabled={!isComplete}
            >
              Verify & Continue
            </Button>
          </Form>

          {/* Resend OTP */}
          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm mb-2">
              Didn't receive the code?
            </p>
            <Form method="post">
              <input type="hidden" name="intent" value="resend" />
              <Button
                type="submit"
                variant="ghost"
                size="sm"
                disabled={resendCooldown > 0}
                onClick={handleResend}
                icon={<RefreshCw className="w-4 h-4" />}
              >
                {resendCooldown > 0 
                  ? `Resend in ${resendCooldown}s` 
                  : "Resend Code"
                }
              </Button>
            </Form>
          </div>

          {/* Demo Hint */}
          <div className="mt-8 p-4 bg-amber-50 rounded-xl border border-amber-100">
            <p className="text-sm text-amber-700 text-center">
              <strong>Demo:</strong> Check your phone for the OTP, or use <code className="bg-amber-100 px-2 py-0.5 rounded">123456</code> for testing
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
