# CodeHub Deployment Guide

## 📋 **Prerequisites**
- GitHub account
- Netlify account  
- Railway account
- MongoDB Atlas account (free)

## 🗂️ **Repository Structure**
```
CodeHub/
├── src/                 # Frontend code
├── backend/            # Backend API
├── admin-panel/        # Admin panel (separate)
└── deployment files
```

## 🚀 **Step 1: GitHub Setup**

### 1.1 Create Repository
1. Go to GitHub.com
2. Click "New Repository"
3. Name: `codehub-learning-platform`
4. Make it Public
5. Don't initialize with README

### 1.2 Push Code
```bash
cd "C:\Users\Lenovo\Desktop\Code hub- Learning Platform"
git init
git add .
git commit -m "Initial commit: CodeHub Learning Platform"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/codehub-learning-platform.git
git push -u origin main
```

## 🗄️ **Step 2: MongoDB Atlas Setup**

### 2.1 Create Database
1. Go to https://mongodb.com/atlas
2. Sign up/Login
3. Create New Project: "CodeHub"
4. Build Database → Free Tier
5. Choose AWS, closest region
6. Create Cluster

### 2.2 Setup Access
1. Database Access → Add User
   - Username: `codehub-admin`
   - Password: Generate secure password
   - Role: Atlas Admin
2. Network Access → Add IP
   - Add: `0.0.0.0/0` (Allow from anywhere)
3. Connect → Connect Application
   - Copy connection string
   - Replace `<password>` with your password

## 🚂 **Step 3: Railway Backend Deployment**

### 3.1 Deploy Backend
1. Go to https://railway.app
2. Login with GitHub
3. "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Choose `backend` folder as root

### 3.2 Configure Environment
1. Go to Variables tab
2. Add these variables:
```
MONGODB_URI=mongodb+srv://codehub-admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/codehub
JWT_SECRET=your_super_secret_jwt_key_make_it_long_and_secure_123456789
NODE_ENV=production
PORT=3000
```

### 3.3 Get Backend URL
- Copy the Railway app URL (e.g., `https://your-app.railway.app`)

## 🌐 **Step 4: Netlify Frontend Deployment**

### 4.1 Deploy Frontend
1. Go to https://netlify.com
2. Login with GitHub
3. "New site from Git"
4. Choose GitHub → Select repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

### 4.2 Configure Environment
1. Site Settings → Environment Variables
2. Add:
```
REACT_APP_API_URL=https://your-railway-app.railway.app/api
```

### 4.3 Get Frontend URL
- Copy Netlify app URL (e.g., `https://your-app.netlify.app`)

## 👨‍💼 **Step 5: Admin Panel Deployment**

### 5.1 Create Separate Repository
```bash
cd "C:\Users\Lenovo\Desktop\Code hub- Learning Platform\admin-panel"
git init
git add .
git commit -m "CodeHub Admin Panel"
git remote add origin https://github.com/YOUR_USERNAME/codehub-admin-panel.git
git push -u origin main
```

### 5.2 Deploy to Netlify
1. New site from Git
2. Select admin panel repository
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Environment Variables:
```
REACT_APP_API_URL=https://your-railway-app.railway.app/api
```

## 🧪 **Step 6: Testing Deployment**

### 6.1 Test Backend
```bash
curl https://your-railway-app.railway.app/api/health
```

### 6.2 Test Frontend
1. Visit your Netlify URL
2. Register new account
3. Try course enrollment (should show server error)
4. Test all features

### 6.3 Test Admin Panel
1. Visit admin panel URL
2. Login with registered account
3. Check user management features

## 🔧 **Troubleshooting**

### Backend Issues
- Check Railway logs
- Verify MongoDB connection
- Ensure environment variables are set

### Frontend Issues
- Check Netlify deploy logs
- Verify API URL is correct
- Clear browser cache

### Common Fixes
```bash
# Force redeploy
git commit --allow-empty -m "Force redeploy"
git push
```

## 📱 **Final URLs**
- **Frontend**: https://your-app.netlify.app
- **Backend API**: https://your-railway-app.railway.app/api
- **Admin Panel**: https://admin-your-app.netlify.app

## 🎉 **Success Checklist**
- ✅ Backend deployed on Railway
- ✅ Frontend deployed on Netlify  
- ✅ Admin panel deployed separately
- ✅ MongoDB Atlas connected
- ✅ All features working
- ✅ Server error shows on course enrollment