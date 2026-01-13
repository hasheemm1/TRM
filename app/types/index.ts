// User Roles
export type UserRole = 
  | "admin" 
  | "facility_manager" 
  | "security_guard" 
  | "maintenance_operative" 
  | "tenant_manager";

// User
export interface User {
  id: string;
  email: string;
  displayName: string;
  role: UserRole;
  tenantId?: string; // For tenant managers
  createdAt: Date;
  updatedAt: Date;
}

// Tenant (e.g., Carrefour, Banks, Shops)
export interface Tenant {
  id: string;
  name: string;
  location: string;
  contactEmail: string;
  contactPhone: string;
  createdAt: Date;
}

// Visitor/Contractor Request
export type VisitorStatus = 
  | "expected" 
  | "checked_in" 
  | "checked_out" 
  | "cancelled" 
  | "denied";

export interface VisitorRequest {
  id: string;
  visitorName: string;
  visitorCompany?: string;
  visitorIdNumber?: string;
  vehiclePlate?: string;
  teamSize: number;
  purpose: string;
  scheduledDate: Date;
  scheduledTime: string;
  status: VisitorStatus;
  // Relationships
  tenantId?: string;
  tenantName?: string;
  createdById: string;
  createdByName: string;
  // Timestamps
  checkInTime?: Date;
  checkOutTime?: Date;
  checkInGuardId?: string;
  checkOutGuardId?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Job/Work Order
export type JobStatus = 
  | "open" 
  | "quote_requested" 
  | "quote_received" 
  | "approved" 
  | "in_progress" 
  | "pending_certification" 
  | "certified" 
  | "closed";

export type JobType = 
  | "internal" 
  | "external_contractor" 
  | "tenant_contractor";

export interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  type: JobType;
  status: JobStatus;
  priority: "low" | "medium" | "high" | "critical";
  // Assignment
  assignedToId?: string;
  assignedToName?: string;
  vendorId?: string;
  vendorName?: string;
  vendorEmail?: string;
  // Quote & LPO
  quoteAmount?: number;
  quoteDocument?: string;
  lpoNumber?: string;
  approvedById?: string;
  approvedByName?: string;
  approvedAt?: Date;
  // Certification
  beforePhotos?: string[];
  afterPhotos?: string[];
  certifiedById?: string;
  certifiedByName?: string;
  certifiedAt?: Date;
  // Inventory used
  inventoryItems?: JobInventoryItem[];
  // Timestamps
  createdById: string;
  createdByName: string;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

export interface JobInventoryItem {
  inventoryId: string;
  itemName: string;
  quantity: number;
  unitCost: number;
}

// Inventory
export interface InventoryItem {
  id: string;
  name: string;
  barcode: string;
  category: string;
  quantity: number;
  minQuantity: number;
  unitCost: number;
  location: string;
  lastRestocked?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Inventory Transaction
export type TransactionType = "checkout" | "restock" | "adjustment";

export interface InventoryTransaction {
  id: string;
  inventoryId: string;
  itemName: string;
  type: TransactionType;
  quantity: number;
  previousQuantity: number;
  newQuantity: number;
  jobId?: string;
  performedById: string;
  performedByName: string;
  notes?: string;
  createdAt: Date;
}

// Asset
export interface Asset {
  id: string;
  name: string;
  type: string; // e.g., "Lift", "HVAC", "Generator"
  location: string;
  serialNumber?: string;
  installDate?: Date;
  lastServiceDate?: Date;
  nextServiceDate?: Date;
  status: "operational" | "maintenance" | "out_of_service";
  jobHistory?: string[]; // Job IDs
  createdAt: Date;
  updatedAt: Date;
}

// Dashboard Stats
export interface DashboardStats {
  currentVisitors: number;
  totalCheckInsToday: number;
  activeJobs: number;
  pendingApprovals: number;
  lpoValueToday: number;
  lowStockItems: number;
}

// Activity Log
export interface ActivityLog {
  id: string;
  type: "visitor" | "job" | "inventory" | "system";
  action: string;
  description: string;
  entityId?: string;
  performedById: string;
  performedByName: string;
  createdAt: Date;
}
