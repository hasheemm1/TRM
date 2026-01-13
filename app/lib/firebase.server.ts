import { initializeApp, getApps, cert, type ServiceAccount } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

function getServiceAccount(): ServiceAccount {
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!serviceAccount) {
    throw new Error("FIREBASE_SERVICE_ACCOUNT environment variable is not set");
  }
  return JSON.parse(serviceAccount) as ServiceAccount;
}

// Initialize Firebase Admin only once
const app = getApps().length === 0 
  ? initializeApp({ credential: cert(getServiceAccount()) })
  : getApps()[0];

export const adminAuth = getAuth(app);
export const adminDb = getFirestore(app);

export default app;
