# Deployment Guide - TRM Ops to Render.com

This guide will help you deploy the TRM Ops platform to Render.com.

## Prerequisites

1. **GitHub/GitLab Account** - Your code needs to be in a Git repository
2. **Render.com Account** - Sign up at [render.com](https://render.com) (free tier available)
3. **Firebase Project** (optional) - For database and storage
4. **Africa's Talking Account** (optional) - For SMS OTP authentication

## Step 1: Push Code to Git

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - TRM Ops platform"

# Create a repository on GitHub/GitLab and push
git remote add origin https://github.com/yourusername/trm-ops.git
git push -u origin main
```

## Step 2: Deploy via Render Blueprint

### Option A: Using Blueprint (Recommended)

1. **Go to Render Dashboard**
   - Visit [dashboard.render.com](https://dashboard.render.com)
   - Sign in or create an account

2. **Create New Blueprint**
   - Click **"New"** → **"Blueprint"**
   - Connect your GitHub/GitLab account if not already connected
   - Select your repository (`trm-ops`)

3. **Render Auto-Detection**
   - Render will automatically detect the `render.yaml` file
   - Review the service configuration
   - Click **"Apply"**

4. **Configure Environment Variables**
   - Render will open the service settings
   - Go to **"Environment"** tab
   - Add the following variables (click "Add Environment Variable"):

#### Required (for full functionality):
```
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
FIREBASE_SERVICE_ACCOUNT={"type":"service_account","project_id":"..."}
AFRICASTALKING_API_KEY=your-at-api-key
AFRICASTALKING_USERNAME=sandbox
```

#### Optional (for demo mode):
- Leave all variables empty - the app will work in demo mode
- OTP codes will be logged to server console instead of sent via SMS

5. **Deploy**
   - Render will automatically start building
   - Monitor the build logs
   - Once deployed, you'll get a URL like: `https://trm-ops.onrender.com`

### Option B: Manual Service Creation

If you prefer to create the service manually:

1. **New Web Service**
   - Click **"New"** → **"Web Service"**
   - Connect your repository

2. **Configure Service**
   - **Name**: `trm-ops`
   - **Region**: Choose closest to your users (e.g., Frankfurt, Oregon)
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: Leave empty (or `.` if needed)
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`

3. **Environment Variables**
   - Add all variables from Step 4 above

4. **Create Service**
   - Click **"Create Web Service"**
   - Render will start building and deploying

## Step 3: Post-Deployment

### Verify Deployment

1. Visit your Render URL (e.g., `https://trm-ops.onrender.com`)
2. You should see the TRM Ops home page
3. Test navigation to different portals:
   - `/tenant` - Tenant Portal
   - `/security` - Security Gate
   - `/ops` - Operations
   - `/admin` - Admin Dashboard

### Custom Domain (Optional)

1. Go to your service settings
2. Click **"Custom Domains"**
3. Add your domain (e.g., `trmops.yourdomain.com`)
4. Follow DNS configuration instructions

### Monitoring

- **Logs**: View real-time logs in Render dashboard
- **Metrics**: Monitor CPU, memory, and request metrics
- **Alerts**: Set up email alerts for service issues

## Environment Variables Reference

### Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project or use existing
3. Get your config from **Project Settings** → **General** → **Your apps**
4. For `FIREBASE_SERVICE_ACCOUNT`:
   - Go to **Project Settings** → **Service Accounts**
   - Click **"Generate New Private Key"**
   - Copy the entire JSON and paste as the value (as a string)

### Africa's Talking Setup

1. Sign up at [africastalking.com](https://africastalking.com)
2. Get your API credentials from the dashboard
3. Use `sandbox` as username for testing
4. For production, use your registered username

## Troubleshooting

### Build Fails

- **Check logs**: View build logs in Render dashboard
- **Node version**: Ensure Node 20+ is specified (already in `package.json`)
- **Dependencies**: Check if all npm packages install correctly

### App Crashes on Start

- **Check start command**: Should be `npm run start`
- **Check logs**: Look for runtime errors
- **Environment variables**: Ensure all required vars are set

### OTP Not Sending

- **Demo mode**: If Africa's Talking vars not set, check server logs for OTP
- **API credentials**: Verify `AFRICASTALKING_API_KEY` and `USERNAME` are correct
- **Phone format**: Ensure phone numbers are in correct format (+254...)

### Firebase Errors

- **Service account**: Ensure `FIREBASE_SERVICE_ACCOUNT` is valid JSON string
- **Permissions**: Check Firebase project permissions
- **Firestore rules**: Set up appropriate security rules

## Cost Estimation

### Free Tier
- **Web Service**: 750 hours/month (enough for light usage)
- **Limitations**: Spins down after 15 min inactivity
- **Best for**: Development, demos, low-traffic

### Starter Plan ($7/month)
- **Always on**: No spin-down
- **512 MB RAM**: Suitable for small-medium traffic
- **Best for**: Production use

### Standard Plan ($25/month)
- **1 GB RAM**: Better performance
- **Better for**: Higher traffic, multiple users

## Support

- **Render Docs**: [render.com/docs](https://render.com/docs)
- **Render Support**: [render.com/support](https://render.com/support)
- **TRM Ops Issues**: Check repository issues

---

**Happy Deploying! 🚀**
