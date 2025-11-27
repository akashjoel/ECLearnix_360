# 🎓 Learno AI Learning Platform

A comprehensive learning platform with AI-powered features, 3D visualizations, and real-time collaboration.

## 🚀 Features

- **AI-Powered Learning**: Generate videos, quizzes, and personalized content
- **3D Visualizations**: Interactive 3D models and visualizations using Three.js
- **Real-time Collaboration**: Live sessions and chat functionality
- **Mentor System**: Connect with industry professionals
- **Internship Platform**: Find and apply for internships
- **Dashboard**: Bite-sized learning modules
- **Analytics Dashboard**: Track learning progress and performance
- **Payment Integration**: Stripe payment processing
- **Multi-platform**: Web, mobile-responsive design

## 🏗️ Architecture

### Backend (Node.js/Express)
- **Framework**: Express.js with TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Cache**: Redis for session management
- **Authentication**: JWT + Firebase Auth
- **Real-time**: Socket.IO
- **File Storage**: AWS S3 + Cloudinary
- **AI Integration**: OpenAI API
- **Payment**: Stripe

### Frontend (React/TypeScript)
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **3D Graphics**: Three.js + React Three Fiber
- **State Management**: React Context + Hooks
- **Authentication**: Firebase Auth
- **UI Components**: Custom components + Framer Motion

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- MongoDB (local or Atlas)
- Redis (optional for development)
- Firebase project
- OpenAI API key (optional)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd learning-platform
```

### 2. Backend Setup
```bash
cd Back-end
npm install
cp env.example .env
# Edit .env with your configuration
npm run dev
```

### 3. Frontend Setup
```bash
cd front-end
npm install
npm run dev
```

### 4. Environment Configuration

#### Backend (.env)
```env
# Server Configuration
NODE_ENV=development
PORT=5000
BASE_URL=http://localhost:5000

# Database
MONGODB_URI=mongodb://localhost:27017/learno_ai
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d

# Firebase (for frontend integration)
FIREBASE_PROJECT_ID=your-project-id
# ... other Firebase config

# OpenAI (for AI features)
OPENAI_API_KEY=sk-your-openai-api-key

# Stripe (for payments)
STRIPE_SECRET_KEY=sk_test_your_stripe_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key
```

#### Frontend (Firebase Config)
Update `front-end/src/firebase/config.ts` with your Firebase project details.

## 🚀 Running the Application

### Development Mode
```bash
# Terminal 1 - Backend
cd Back-end
npm run dev

# Terminal 2 - Frontend  
cd front-end
npm run dev
```

### Production Build
```bash
# Backend
cd Back-end
npm run build
npm start

# Frontend
cd front-end
npm run build
npm run preview
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/verify` - Verify email

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course details
- `POST /api/courses/:id/enroll` - Enroll in course
- `POST /api/courses` - Create course (admin)

### Mentors
- `GET /api/mentors` - Get all mentors
- `GET /api/mentors/:id` - Get mentor details
- `POST /api/mentors/:id/book` - Book session

### AI Features
- `POST /api/ai/generate` - Generate content
- `POST /api/ai/video` - Generate video
- `POST /api/ai/quiz` - Generate quiz

### Analytics
- `GET /api/analytics` - Get user analytics
- `GET /api/analytics/progress` - Learning progress

## 🎨 Key Components

### Frontend Pages
- **HomePage**: Landing page with hero section
- **Dashboard**: User dashboard with progress
- **CourseOverview**: Detailed course view
- **MentorSystem**: Mentor discovery and booking
- **Internship**: Internship listings and applications
- **VideoGenerator**: AI-powered video creation
- **LiveVisualizer**: Real-time 3D visualizations
- **Dashboard**: Bite-sized learning modules

### Backend Routes
- **auth.js**: Authentication and user management
- **courses.js**: Course CRUD operations
- **mentors.js**: Mentor management
- **ai.js**: AI content generation
- **analytics.js**: Learning analytics
- **payments.js**: Payment processing
- **notifications.js**: Notification system

## 🔧 Development

### Code Structure
```
├── Back-end/
│   ├── config/          # Database, Redis, Socket config
│   ├── middleware/      # Auth, error handling
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   ├── utils/           # Helper functions
│   └── server.js        # Main server file
├── front-end/
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── contexts/    # React contexts
│   │   ├── firebase/    # Firebase configuration
│   │   ├── pages/       # Page components
│   │   └── services/    # API services
│   └── public/          # Static assets
```

### Adding New Features
1. Create backend route in `Back-end/routes/`
2. Add frontend service method in `front-end/src/services/api.ts`
3. Create React component/page
4. Update navigation and routing

## 🧪 Testing

```bash
# Backend tests
cd Back-end
npm test

# Frontend tests
cd front-end
npm test
```

## 📊 Monitoring & Analytics

- **Health Check**: `GET /health`
- **API Documentation**: `GET /api/docs`
- **Error Logging**: Morgan + custom error handler
- **Performance**: Compression + rate limiting

## 🔒 Security Features

- **Authentication**: JWT + Firebase Auth
- **Authorization**: Role-based access control
- **Rate Limiting**: Express rate limit
- **CORS**: Configured for production
- **Helmet**: Security headers
- **Input Validation**: Express validator
- **Password Hashing**: bcryptjs

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB Atlas
2. Configure environment variables
3. Deploy to Heroku/Vercel/AWS

### Frontend Deployment
1. Build the application
2. Deploy to Vercel/Netlify/AWS S3

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Contact the development team

## 🎯 Roadmap

- [ ] Mobile app development
- [ ] Advanced AI features
- [ ] VR/AR integration
- [ ] Blockchain certificates
- [ ] Multi-language support
- [ ] Advanced analytics
- [ ] Social learning features 