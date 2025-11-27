# 🚀 Learno AI Backend Setup Guide

## ✅ Current Status
- ✅ Backend server running on port 5000
- ✅ All dependencies installed
- ✅ API routes configured
- ✅ Socket.IO setup complete

## 📋 Next Steps

### 1. MongoDB Setup

#### Option A: MongoDB Atlas (Recommended)
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster (M0 Free tier)
4. Set up database access (username/password)
5. Set up network access (IP whitelist: 0.0.0.0/0 for development)
6. Get your connection string

#### Option B: Local MongoDB
```bash
# Windows (using Chocolatey)
choco install mongodb

# Or download from https://www.mongodb.com/try/download/community
# Start MongoDB service
net start MongoDB
```

#### Option C: Docker MongoDB
```bash
# Pull and run MongoDB container
docker run -d --name mongodb -p 27017:27017 mongo:latest
```

### 2. Redis Setup

#### Option A: Redis Cloud (Recommended)
1. Go to [Redis Cloud](https://redis.com/try-free/)
2. Create free account
3. Create database
4. Get connection string

#### Option B: Local Redis
```bash
# Windows (using Chocolatey)
choco install redis-64

# Start Redis service
redis-server
```

#### Option C: Docker Redis
```bash
# Pull and run Redis container
docker run -d --name redis -p 6379:6379 redis:alpine
```

### 3. Environment Variables

Create a `.env` file in the Back-end directory:

```env
# Server Configuration
NODE_ENV=development
PORT=5000
BASE_URL=http://localhost:5000

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/learno_ai
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/learno_ai?retryWrites=true&w=majority

REDIS_URL=redis://localhost:6379
# OR for Redis Cloud:
# REDIS_URL=redis://username:password@host:port

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=your-refresh-secret-key
JWT_REFRESH_EXPIRE=30d

# Email Configuration (Optional for development)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=Learno AI <noreply@learnoai.com>

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Security
BCRYPT_ROUNDS=12
SESSION_SECRET=your-session-secret

# Feature Flags
ENABLE_AI_FEATURES=false
ENABLE_VIDEO_PROCESSING=false
ENABLE_PAYMENT_PROCESSING=false
ENABLE_EMAIL_NOTIFICATIONS=false
ENABLE_SMS_NOTIFICATIONS=false
```

### 4. Test API Endpoints

Once MongoDB and Redis are set up, test the endpoints:

```bash
# Health check
curl http://localhost:5000/health

# API documentation
curl http://localhost:5000/api/docs

# Test authentication (register)
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "akashjoel08@gmail.com",
    "password": "akashgoki05",
    "displayName": "Akash Joel"
  }'

# Test authentication (login)
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "akashjoel08@gmail.com",
    "password": "akashgoki05"
  }'
```

### 5. Frontend Integration

Update your frontend to connect to the backend:

```javascript
// In your frontend API configuration
const API_BASE_URL = 'http://localhost:5000/api';

// Example API call
const response = await fetch(`${API_BASE_URL}/auth/login`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'akashjoel08@gmail.com',
    password: 'akashgoki05'
  })
});
```

### 6. Production Deployment

When ready for production:

1. **Environment Variables**: Update all API keys and secrets
2. **Database**: Use production MongoDB Atlas cluster
3. **Redis**: Use production Redis Cloud instance
4. **Domain**: Update CORS origins in server.js
5. **SSL**: Set up HTTPS certificates
6. **Process Manager**: Use PM2 or similar
7. **Reverse Proxy**: Use Nginx or Apache

## 🔧 Quick Start Commands

```bash
# Start development server
npm run dev

# Start production server
npm start

# Run tests
npm test

# Lint code
npm run lint

# Format code
npm run format
```

## 📊 API Endpoints Available

- `GET /health` - Health check
- `GET /api/docs` - API documentation
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/courses` - Get all courses
- `GET /api/mentors` - Get all mentors
- `POST /api/internships` - Apply for internship
- `POST /api/payments/create-checkout` - Create payment session
- `POST /api/ai/chat` - AI chatbot
- `GET /api/analytics/dashboard` - User analytics

## 🎯 Next Steps

1. Set up MongoDB (Atlas recommended)
2. Set up Redis (Cloud recommended)
3. Create .env file with your configuration
4. Test API endpoints
5. Integrate with your frontend
6. Deploy to production when ready 