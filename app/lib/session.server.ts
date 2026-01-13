import { createCookieSessionStorage, redirect } from "react-router";

// OTP Session Storage (temporary, for OTP verification flow)
const otpSessionStorage = createCookieSessionStorage({
  cookie: {
    name: "trm_otp_session",
    httpOnly: true,
    maxAge: 60 * 5, // 5 minutes
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET || "trm-ops-secret-key-change-in-production"],
    secure: process.env.NODE_ENV === "production",
  },
});

// User Session Storage (for authenticated users)
const userSessionStorage = createCookieSessionStorage({
  cookie: {
    name: "trm_session",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET || "trm-ops-secret-key-change-in-production"],
    secure: process.env.NODE_ENV === "production",
  },
});

// OTP Session helpers
export async function createOtpSession(phoneNumber: string, otp: string) {
  const session = await otpSessionStorage.getSession();
  session.set("phoneNumber", phoneNumber);
  session.set("otp", otp);
  session.set("createdAt", Date.now());
  return otpSessionStorage.commitSession(session);
}

export async function getOtpSession(request: Request) {
  return otpSessionStorage.getSession(request.headers.get("Cookie"));
}

export async function verifyOtp(request: Request, submittedOtp: string) {
  const session = await getOtpSession(request);
  const storedOtp = session.get("otp");
  const createdAt = session.get("createdAt");
  const phoneNumber = session.get("phoneNumber");
  
  // Check if OTP exists and hasn't expired (5 minutes)
  if (!storedOtp || !createdAt) {
    return { success: false, error: "No OTP session found. Please request a new code." };
  }
  
  const isExpired = Date.now() - createdAt > 5 * 60 * 1000;
  if (isExpired) {
    return { success: false, error: "OTP has expired. Please request a new code." };
  }
  
  if (storedOtp !== submittedOtp) {
    return { success: false, error: "Invalid OTP. Please try again." };
  }
  
  return { success: true, phoneNumber };
}

export async function destroyOtpSession(request: Request) {
  const session = await getOtpSession(request);
  return otpSessionStorage.destroySession(session);
}

// User Session helpers
export async function createUserSession(userId: string, role: string, redirectTo: string) {
  const session = await userSessionStorage.getSession();
  session.set("userId", userId);
  session.set("role", role);
  
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await userSessionStorage.commitSession(session),
    },
  });
}

export async function getUserSession(request: Request) {
  return userSessionStorage.getSession(request.headers.get("Cookie"));
}

export async function getUserId(request: Request) {
  const session = await getUserSession(request);
  return session.get("userId");
}

export async function getUserRole(request: Request) {
  const session = await getUserSession(request);
  return session.get("role");
}

export async function requireUserId(request: Request) {
  const userId = await getUserId(request);
  if (!userId) {
    throw redirect("/login");
  }
  return userId;
}

export async function logout(request: Request) {
  const session = await getUserSession(request);
  return redirect("/login", {
    headers: {
      "Set-Cookie": await userSessionStorage.destroySession(session),
    },
  });
}
