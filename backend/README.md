# CodeHub Backend API

## Setup

1. Install dependencies:
```bash
cd backend
npm install
```

2. Set up MongoDB and update `.env` file

3. Start server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users/profile` - Get user profile (Protected)
- `PUT /api/users/profile` - Update profile (Protected)
- `POST /api/users/enroll/:courseId` - Enroll in course (Protected)

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course by ID

### Admin (Admin Only)
- `GET /api/admin/users` - Get all users
- `GET /api/admin/users/:id` - Get user by ID
- `GET /api/admin/stats` - Get dashboard stats
- `GET /api/admin/users/search/:query` - Search users

## Environment Variables

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/codehub
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

## Deployment

Deploy to Heroku, Railway, or any Node.js hosting service.