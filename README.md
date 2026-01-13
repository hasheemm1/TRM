# TRM Ops - Centralized Facility Operations Platform

A modern, comprehensive facility operations platform built for Thika Road Mall. This system manages security access control, maintenance operations, inventory, and provides real-time oversight through an intuitive dashboard.

![TRM Ops](https://img.shields.io/badge/TRM-Ops-blue)
![React Router](https://img.shields.io/badge/React%20Router-7.12-blue)
![Firebase](https://img.shields.io/badge/Firebase-Backend-orange)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8)

## 🏗️ System Architecture

The platform consists of four main portals:

### 1. Tenant Portal (`/tenant`)
- **Users**: Tenant Managers (e.g., Carrefour, Banks, Shops)
- **Function**: Pre-authorize contractors before arrival
- **Features**:
  - Create visitor requests with company, contact, and scheduling details
  - View upcoming and past visits
  - Calendar view of scheduled visits

### 2. Security Guard App (`/security`)
- **Users**: TRM Security Guards
- **Function**: Gate control and visitor verification
- **Features**:
  - Scan/search visitors by ID, name, or vehicle plate
  - Instant authorization status display
  - Check-in/check-out logging
  - Real-time on-site visitor list
  - Activity log and alerts

### 3. Operations App (`/ops`)
- **Users**: Facility Managers & Maintenance Operatives
- **Function**: Job management, inspections, and inventory control
- **Features**:
  - Create and manage work orders
  - Request quotes from external vendors (via email link)
  - Approve quotes and generate LPOs
  - Inventory checkout with barcode scanning
  - Asset tracking and maintenance history
  - Photo documentation for job completion

### 4. Admin Dashboard (`/admin`)
- **Users**: Senior Management & Accounts
- **Function**: "God View" - complete operational oversight
- **Features**:
  - Real-time gate log and visitor count
  - Live activity feed
  - LPO value tracking
  - Inventory alerts
  - Tenant activity monitoring
  - Comprehensive reports

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- Firebase Project (for authentication and Firestore database)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd TRM
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Copy the example and fill in your Firebase config
cp .env.example .env
```

Required environment variables:
```
# Firebase (for Firestore database)
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
FIREBASE_SERVICE_ACCOUNT={"type":"service_account",...}

# Africa's Talking (for SMS OTP)
AFRICASTALKING_API_KEY=your-at-api-key
AFRICASTALKING_USERNAME=your-at-username

# Session (auto-generated in production)
SESSION_SECRET=your-secret-key
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173)

## 🔧 Tech Stack

- **Framework**: React Router v7 (Remix)
- **Styling**: Tailwind CSS v4
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Storage**: Firebase Storage (for photos)
- **Icons**: Lucide React
- **Deployment**: Render.com

## 📁 Project Structure

```
app/
├── components/
│   ├── layouts/          # Portal-specific layouts
│   │   ├── TenantLayout.tsx
│   │   ├── SecurityLayout.tsx
│   │   ├── OpsLayout.tsx
│   │   └── AdminLayout.tsx
│   └── ui/               # Reusable UI components
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Badge.tsx
│       ├── Input.tsx
│       └── Select.tsx
├── lib/
│   ├── firebase.client.ts    # Client-side Firebase
│   └── firebase.server.ts    # Server-side Firebase Admin
├── routes/
│   ├── home.tsx              # Landing page
│   ├── auth/                 # Authentication
│   ├── tenant/               # Tenant Portal
│   ├── security/             # Security Guard App
│   ├── ops/                  # Operations App
│   └── admin/                # Admin Dashboard
├── types/
│   └── index.ts              # TypeScript types
├── app.css                   # Global styles
├── root.tsx                  # Root layout
└── routes.ts                 # Route definitions
```

## 🎨 Design Philosophy

- **Tenant Portal**: Clean, professional design with TRM branding (blue/gold)
- **Security App**: Dark mode for high contrast in various lighting, cyan accents
- **Operations App**: Warm orange accents, mobile-first design
- **Admin Dashboard**: Dark theme with gold accents, data-dense layouts

## 📱 Responsive Design

- **Tenant Portal**: Desktop-first (web application)
- **Security Guard App**: Tablet-optimized (iPad)
- **Operations App**: Mobile-first with bottom navigation
- **Admin Dashboard**: Desktop-first with responsive tables

## 🚢 Deployment to Render.com

1. Push your code to a Git repository (GitHub, GitLab, etc.)

2. Connect your repository to Render.com

3. Use the `render.yaml` blueprint or configure manually:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`

4. Add environment variables in Render dashboard

5. Deploy!

## 🔒 Security Features

- Pre-authorization required for all visitor entry
- Digital verification at gate (no manual entry)
- Complete audit trail of all access
- Role-based access control
- Firebase Authentication integration

## 📊 Key Benefits

1. **Security**: No entry without pre-booking
2. **Finance**: No LPO without digital approval
3. **Inventory**: No stock leaves without scanning
4. **Visibility**: Real-time oversight of all operations

## 🛠️ Development

```bash
# Run development server
npm run dev

# Type checking
npm run typecheck

# Build for production
npm run build

# Start production server
npm run start
```

## 📄 License

Proprietary - Thika Road Mall

---

Built with ❤️ for Thika Road Mall
