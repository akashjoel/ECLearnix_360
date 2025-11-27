# Learno AI Backend API

A comprehensive Node.js/Express backend for the Learno AI Learning Platform with advanced features including AI integration, real-time communication, and scalable architecture.

## 🚀 Features

### Core Features
- **Authentication & Authorization** - JWT-based auth with role-based access control
- **User Management** - Complete user profiles with learning preferences
- **Course Management** - Full CRUD operations with advanced filtering
- **Mentor System** - Booking and session management
- **Internship Applications** - Application processing and tracking
- **Payment Processing** - Stripe integration for subscriptions
- **AI Integration** - OpenAI-powered features
- **Real-time Communication** - Socket.IO for live sessions
- **File Upload** - Cloudinary integration for media
- **Email Notifications** - Automated email system
- **Analytics** - Learning progress tracking
- **Caching** - Redis-based caching for performance

### Advanced Features
- **Rate Limiting** - API protection
- **Security** - Helmet, CORS, input validation
- **Error Handling** - Comprehensive error management
- **Logging** - Request logging and monitoring
- **Database** - MongoDB with Mongoose ODM
- **Testing** - Jest testing framework
- **Documentation** - API documentation

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (v5 or higher)
- Redis (v6 or higher)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   cd Back-end
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env
   ```
   
   Fill in your environment variables in `.env` file.

4. **Start the server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## 🔧 Environment Variables

Create a `.env` file with the following variables:

```env
# Server Configuration
NODE_ENV=development
PORT=5000
BASE_URL=http://localhost:5000

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/learno_ai
REDIS_URL=redis://localhost:6379

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d

# Firebase Configuration (for frontend integration)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-client-email

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# OpenAI Configuration
OPENAI_API_KEY=sk-your-openai-api-key

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=Learno AI <noreply@learnoai.com>

# Feature Flags
ENABLE_AI_FEATURES=true
ENABLE_VIDEO_PROCESSING=true
ENABLE_PAYMENT_PROCESSING=true
ENABLE_EMAIL_NOTIFICATIONS=true
```

## 📁 Project Structure

```
Back-end/
├── config/                 # Configuration files
│   ├── database.js        # MongoDB connection
│   ├── redis.js           # Redis connection
│   └── socket.js          # Socket.IO setup
├── middleware/            # Custom middleware
│   ├── auth.js           # Authentication middleware
│   └── errorHandler.js   # Error handling
├── models/               # Database models
│   ├── User.js          # User model
│   ├── Course.js        # Course model
│   └── ...              # Other models
├── routes/               # API routes
│   ├── auth.js          # Authentication routes
│   ├── courses.js       # Course routes
│   ├── mentors.js       # Mentor routes
│   ├── internships.js   # Internship routes
│   ├── payments.js      # Payment routes
│   ├── ai.js            # AI routes
│   ├── videos.js        # Video routes
│   ├── analytics.js     # Analytics routes
│   └── notifications.js # Notification routes
├── utils/               # Utility functions
│   ├── email.js         # Email utilities
│   ├── upload.js        # File upload utilities
│   └── ai.js            # AI utilities
├── uploads/             # File uploads directory
├── tests/               # Test files
├── server.js            # Main server file
├── package.json         # Dependencies
└── README.md           # This file
```

## 🚀 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password
- `POST /api/auth/verify-email` - Verify email
- `GET /api/auth/me` - Get current user

### Courses
- `GET /api/courses` - Get all courses (with filtering)
- `GET /api/courses/featured` - Get featured courses
- `GET /api/courses/categories` - Get course categories
- `GET /api/courses/:id` - Get course by ID
- `POST /api/courses` - Create new course
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course
- `POST /api/courses/:id/enroll` - Enroll in course
- `POST /api/courses/:id/review` - Add course review

### Mentors
- `GET /api/mentors` - Get all mentors
- `GET /api/mentors/:id` - Get mentor by ID
- `POST /api/mentors/:id/book` - Book mentor session
- `GET /api/mentors/:id/availability` - Get mentor availability

### Internships
- `GET /api/internships` - Get internship opportunities
- `POST /api/internships/apply` - Submit internship application
- `GET /api/internships/applications` - Get user applications

### Payments
- `POST /api/payments/create-checkout` - Create Stripe checkout
- `POST /api/payments/webhook` - Stripe webhook
- `GET /api/payments/subscriptions` - Get user subscriptions

### AI Features
- `POST /api/ai/chat` - AI chatbot
- `POST /api/ai/generate-content` - Generate content
- `POST /api/ai/analyze-progress` - Analyze learning progress

### Analytics
- `GET /api/analytics/dashboard` - Get user dashboard
- `GET /api/analytics/progress` - Get learning progress
- `GET /api/analytics/recommendations` - Get course recommendations

## 🔐 Authentication

The API uses JWT tokens for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## 📊 Database Models

### User Model
- Basic info (name, email, password)
- Role-based access (student, mentor, admin)
- Learning preferences
- Progress tracking
- Subscription info

### Course Model
- Course details (title, description, category)
- Lessons and content
- Pricing and enrollment
- Ratings and reviews
- Analytics data

### Additional Models
- Mentor profiles and availability
- Internship applications
- Payment records
- Learning progress
- Notifications

## 🧪 Testing

Run tests with Jest:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 📈 Performance

- **Caching**: Redis-based caching for frequently accessed data
- **Rate Limiting**: API protection against abuse
- **Compression**: Response compression for faster loading
- **Database Indexing**: Optimized queries with proper indexing
- **Connection Pooling**: Efficient database connections

## 🔒 Security

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for password security
- **Input Validation**: Comprehensive request validation
- **CORS Protection**: Cross-origin request protection
- **Rate Limiting**: Protection against brute force attacks
- **Helmet**: Security headers
- **SQL Injection Protection**: Mongoose ODM protection

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

### Docker (Optional)
```bash
# Build image
docker build -t learno-ai-backend .

# Run container
docker run -p 5000:5000 learno-ai-backend
```

## 📝 API Documentation

Visit `/api/docs` for interactive API documentation.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email support@learnoai.com or create an issue in the repository.

## 🔄 Updates

- **v1.0.0** - Initial release with core features
- **v1.1.0** - Added AI integration
- **v1.2.0** - Added real-time features
- **v1.3.0** - Added payment processing

---

**Built with ❤️ by the Learno AI Team** 