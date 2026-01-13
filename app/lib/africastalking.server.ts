import AfricasTalking from "africastalking";

// Check if Africa's Talking is configured
const isConfigured = !!(process.env.AFRICASTALKING_API_KEY && process.env.AFRICASTALKING_USERNAME);

// Initialize Africa's Talking only if configured
const africastalking = isConfigured 
  ? AfricasTalking({
      apiKey: process.env.AFRICASTALKING_API_KEY!,
      username: process.env.AFRICASTALKING_USERNAME!,
    })
  : null;

const sms = africastalking?.SMS;

// Generate a 6-digit OTP
export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send OTP via SMS
export async function sendOTP(phoneNumber: string, otp: string): Promise<{ success: boolean; error?: string }> {
  // If Africa's Talking is not configured, simulate success for demo
  if (!sms) {
    console.log(`[DEMO MODE] OTP ${otp} would be sent to ${phoneNumber}`);
    console.log(`[DEMO MODE] Use this OTP to verify: ${otp}`);
    return { success: true };
  }

  try {
    // Format phone number for Kenya (ensure +254 prefix)
    const formattedPhone = formatKenyanPhone(phoneNumber);
    
    const result = await sms.send({
      to: [formattedPhone],
      message: `Your TRM Ops verification code is: ${otp}. Valid for 5 minutes. Do not share this code.`,
      // from: "TRM_OPS" // Optional: Use a registered sender ID
    });

    console.log("SMS sent:", result);
    
    // Check if SMS was sent successfully
    const messageData = result.SMSMessageData;
    if (messageData && messageData.Recipients && messageData.Recipients.length > 0) {
      const recipient = messageData.Recipients[0];
      if (recipient.status === "Success" || recipient.statusCode === 101) {
        return { success: true };
      }
      return { success: false, error: recipient.status };
    }
    
    return { success: true }; // Assume success if no error
  } catch (error) {
    console.error("Failed to send SMS:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to send SMS" 
    };
  }
}

// Format Kenyan phone numbers
function formatKenyanPhone(phone: string): string {
  // Remove any spaces, dashes, or other characters
  let cleaned = phone.replace(/[\s\-\(\)]/g, "");
  
  // Handle different formats
  if (cleaned.startsWith("0")) {
    // Convert 07xx to +2547xx
    cleaned = "+254" + cleaned.substring(1);
  } else if (cleaned.startsWith("7")) {
    // Convert 7xx to +2547xx
    cleaned = "+254" + cleaned;
  } else if (cleaned.startsWith("254")) {
    // Add + prefix
    cleaned = "+" + cleaned;
  } else if (!cleaned.startsWith("+254")) {
    // Assume it's a local number without prefix
    cleaned = "+254" + cleaned;
  }
  
  return cleaned;
}

// Validate Kenyan phone number format
export function isValidKenyanPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-\(\)]/g, "");
  
  // Check various valid formats
  const patterns = [
    /^0[17]\d{8}$/,           // 07xxxxxxxx or 01xxxxxxxx
    /^[17]\d{8}$/,            // 7xxxxxxxx or 1xxxxxxxx
    /^254[17]\d{8}$/,         // 2547xxxxxxxx or 2541xxxxxxxx
    /^\+254[17]\d{8}$/,       // +2547xxxxxxxx or +2541xxxxxxxx
  ];
  
  return patterns.some(pattern => pattern.test(cleaned));
}
