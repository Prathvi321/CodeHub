# CodeHub Setup & Testing Guide

## Quick Start (Frontend Only - No Backend)

1. **Install Dependencies**
```bash
npm install
```

2. **Start Frontend**
```bash
npm run dev
```

3. **Open Browser**
- Go to `http://localhost:3000`
- Use demo login: `demo@codehub.com` / `demo123`

## Full Setup (With Backend API)

### 1. Install All Dependencies
```bash
npm run install-all
```

### 2. Setup MongoDB (Choose One)

**Option A: MongoDB Atlas (Cloud)**
1. Go to https://mongodb.com/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Update `backend/.env` with your MongoDB URI

**Option B: Local MongoDB**
1. Install MongoDB locally
2. Start MongoDB service
3. Use default URI in `backend/.env`

### 3. Configure Backend
```bash
cd backend
cp .env.example .env
# Edit .env file with your settings
```

### 4. Start Backend
```bash
cd backend
npm run dev
```
Backend runs on `http://localhost:5000`

### 5. Start Frontend
```bash
# In new terminal
npm run dev
```
Frontend runs on `http://localhost:3000`

## Testing Features

### 1. User Registration & Login
- Register new account at `/register`
- Login with created account
- Test cross-device login (same credentials work everywhere)

### 2. Course Browsing
- Browse courses at `/courses`
- Search and filter courses
- View course details
- Try to enroll (should show server error)

### 3. Dashboard
- View learning progress
- Check statistics and charts
- Navigate between sections

### 4. Admin Panel
- Login as admin user
- Go to `/admin`
- View all registered users
- Search users by name/email
- View user enrollment details

### 5. Topics & Profile
- Explore topics at `/topics`
- Update profile at `/profile`
- Test theme toggle (dark/light mode)

## API Testing

### Test API Endpoints
```bash
# Health check
curl http://localhost:5000/api/health

# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com","password":"123456"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"123456"}'
```

## Troubleshooting

### Frontend Issues
- Clear browser cache
- Check console for errors
- Ensure all dependencies installed

### Backend Issues
- Check MongoDB connection
- Verify environment variables
- Check server logs for errors

### Common Fixes
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Reset backend
cd backend
rm -rf node_modules package-lock.json
npm install
```

## Production Deployment

### Frontend (Netlify)
1. Build: `npm run build`
2. Deploy `dist/` folder to Netlify
3. Set environment variables

### Backend (Netlify Functions)
1. Deploy `backend/` folder to Netlify
2. Set environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`

### Admin Panel (Separate Netlify)
1. Deploy `admin-panel/` to separate Netlify site
2. Set `REACT_APP_API_URL` to backend URL