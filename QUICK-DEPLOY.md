# 🚀 Quick Deploy Commands

## 1. GitHub Setup
```bash
cd "C:\Users\Lenovo\Desktop\Code hub- Learning Platform"
git init
git add .
git commit -m "Initial commit: CodeHub Learning Platform"
git branch -M main
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/codehub-learning-platform.git
git push -u origin main
```

## 2. MongoDB Atlas
1. Go to https://mongodb.com/atlas
2. Create account → New Project → Build Database (Free)
3. Create user and get connection string
4. Copy connection string for Railway

## 3. Railway Backend
1. Go to https://railway.app
2. New Project → Deploy from GitHub → Select repo → Choose `backend` folder
3. Add Environment Variables:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key_123456789
NODE_ENV=production
```
4. Copy Railway URL

## 4. Netlify Frontend
1. Go to https://netlify.com
2. New site from Git → Select repo
3. Build: `npm run build`, Publish: `dist`
4. Add Environment Variable:
```
REACT_APP_API_URL=https://your-railway-url.railway.app/api
```

## 5. Admin Panel (Separate Netlify)
```bash
cd admin-panel
git init
git add .
git commit -m "Admin Panel"
git remote add origin https://github.com/YOUR_USERNAME/codehub-admin.git
git push -u origin main
```
Deploy to Netlify with same API URL.

## ✅ Done!
- Frontend: https://your-app.netlify.app
- Backend: https://your-app.railway.app
- Admin: https://admin.netlify.app