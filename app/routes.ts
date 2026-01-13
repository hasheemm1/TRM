import { type RouteConfig, index, route, prefix } from "@react-router/dev/routes";

export default [
  // Landing page
  index("routes/home.tsx"),
  
  // Auth routes
  route("login", "routes/auth/login.tsx"),
  route("login/verify", "routes/auth/verify.tsx"),
  
  // Tenant Portal routes
  ...prefix("tenant", [
    index("routes/tenant/index.tsx"),
    route("visitors", "routes/tenant/visitors.tsx"),
    route("visitors/new", "routes/tenant/visitors.new.tsx"),
    route("schedule", "routes/tenant/schedule.tsx"),
  ]),
  
  // Security Guard routes
  ...prefix("security", [
    index("routes/security/index.tsx"),
    route("onsite", "routes/security/onsite.tsx"),
    route("log", "routes/security/log.tsx"),
    route("alerts", "routes/security/alerts.tsx"),
  ]),
  
  // Operations routes (Facility Manager & Maintenance)
  ...prefix("ops", [
    index("routes/ops/index.tsx"),
    route("jobs", "routes/ops/jobs.tsx"),
    route("jobs/new", "routes/ops/jobs.new.tsx"),
    route("jobs/:id", "routes/ops/jobs.$id.tsx"),
    route("tasks", "routes/ops/tasks.tsx"),
    route("inventory", "routes/ops/inventory.tsx"),
    route("assets", "routes/ops/assets.tsx"),
  ]),
  
  // Admin Dashboard routes
  ...prefix("admin", [
    index("routes/admin/index.tsx"),
    route("visitors", "routes/admin/visitors.tsx"),
    route("jobs", "routes/admin/jobs.tsx"),
    route("inventory", "routes/admin/inventory.tsx"),
    route("tenants", "routes/admin/tenants.tsx"),
    route("reports", "routes/admin/reports.tsx"),
    route("settings", "routes/admin/settings.tsx"),
  ]),
] satisfies RouteConfig;
