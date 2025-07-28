# ECLearnix 360° - AI-Powered Learning Ecosystem

## 🚀 Project Overview

ECLearnix 360° is a comprehensive AI-powered learning platform designed for students, educators, and professionals. The platform features real-time AI visualization, personalized learning paths, smart mentoring, and microlearning modules.

## ✨ Key Features

- **Live AI Visualizer** - Real-time speech-to-diagram conversion
- **AI Video Generator** - Transform recordings into animated content
- **Personalized Learning Paths** - AI-driven content recommendations
- **Smart Mentor System** - Intelligent mentor-mentee matching
- **Microlearning Modules** - Bite-sized skill development
- **Role-based Dashboards** - Different experiences for various user types

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **State Management**: React Context
- **Package Manager**: npm

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)
- Git

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd ECLearnix_360
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Open in Browser
Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
ECLearnix_360/
├── src/
│   ├── components/          # Reusable UI components
│   │   └── Header.tsx      # Navigation header
│   ├── contexts/           # React contexts
│   │   └── AuthContext.tsx # Authentication state
│   ├── pages/              # Page components
│   │   ├── HomePage.tsx    # Landing page
│   │   ├── Dashboard.tsx   # User dashboard
│   │   ├── LiveVisualizer.tsx
│   │   ├── VideoGenerator.tsx
│   │   ├── LearningPaths.tsx
│   │   ├── MentorSystem.tsx
│   │   ├── Microlearning.tsx
│   │   └── Login.tsx
│   ├── App.tsx             # Main app component
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles
├── public/                 # Static assets
├── package.json           # Dependencies and scripts
└── README.md             # This file
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 👥 Team Collaboration

### Git Workflow

1. **Always work on feature branches**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes and commit**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

3. **Push your branch**
   ```bash
   git push origin feature/your-feature-name
   ```

4. **Create a Pull Request**
   - Go to GitHub repository
   - Click "Compare & pull request"
   - Add description of your changes
   - Request review from team members

### Branch Naming Convention

- `feature/` - New features
- `fix/` - Bug fixes
- `refactor/` - Code refactoring
- `docs/` - Documentation updates
- `style/` - UI/UX improvements

### Commit Message Convention

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Formatting, missing semicolons, etc.
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

## 🔐 Environment Setup

Create a `.env.local` file in the root directory:

```env
# API Keys (Add your actual keys)
VITE_OPENAI_API_KEY=your_openai_key
VITE_FIREBASE_API_KEY=your_firebase_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id

# Feature Flags
VITE_ENABLE_LIVE_VISUALIZER=true
VITE_ENABLE_VIDEO_GENERATOR=true
VITE_ENABLE_AI_FEATURES=true
```

## 🎨 UI/UX Guidelines

### Color Palette
- Primary: Blue (#3B82F6)
- Secondary: Purple (#8B5CF6)
- Success: Green (#10B981)
- Warning: Yellow (#F59E0B)
- Error: Red (#EF4444)

### Typography
- Headings: Inter, sans-serif
- Body: Inter, sans-serif
- Monospace: JetBrains Mono

### Spacing
- Use Tailwind's spacing scale
- Consistent padding: 4, 6, 8, 12, 16, 24
- Responsive design for mobile-first approach

## 🧪 Testing

### Running Tests
```bash
npm test
```

### Test Structure
- Unit tests for components
- Integration tests for features
- E2E tests for critical user flows

## 📦 Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

### Deployment Platforms
- Vercel (Recommended)
- Netlify
- GitHub Pages

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Make your changes
4. Add tests if applicable
5. Commit your changes with proper messages
6. Push to your branch
7. Create a Pull Request

## 📞 Team Communication

- **Slack/Discord**: For real-time communication
- **GitHub Issues**: For bug reports and feature requests
- **GitHub Discussions**: For general questions and ideas
- **Code Reviews**: Required for all PRs

## 🔄 Current Development Status

### ✅ Completed
- [x] Project structure setup
- [x] Basic routing and navigation
- [x] Authentication context
- [x] Dashboard components
- [x] Live Visualizer UI
- [x] Video Generator UI
- [x] Learning Paths UI
- [x] Mentor System UI
- [x] Microlearning UI
- [x] Responsive design
- [x] Beautiful animations

### 🚧 In Progress
- [ ] Backend integration
- [ ] AI API integration
- [ ] Real-time features
- [ ] Database setup

### 📋 Planned
- [ ] User authentication
- [ ] Real-time collaboration
- [ ] Video processing
- [ ] AI diagram generation
- [ ] Mobile app
- [ ] Advanced analytics

## 🐛 Known Issues

- Mock data is currently used for all features
- No real backend integration yet
- Authentication is simulated
- AI features are placeholder implementations

## 📚 Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/guide/)
- [Lucide Icons](https://lucide.dev/)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Happy Coding! 🚀**

For questions or support, reach out to the team lead or create an issue on GitHub. 