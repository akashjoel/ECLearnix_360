import React, { useState, useEffect, useRef } from 'react';
import { 
  Clock, 
  Star, 
  Play, 
  CheckCircle, 
  Trophy, 
  Zap,
  BookOpen,
  Target,
  Calendar,
  TrendingUp,
  Award,
  Filter,
  Sparkles,
  Activity,
  ArrowRight,
  Brain,
  Cpu,
  Database,
  Shield,
  Wifi,
  Cloud,
  Layers,
  GitBranch,
  Palette,
  Music,
  Camera,
  Video,
  Mic,
  BarChart3,
  PieChart,
  Heart,
  Eye,
  Share2,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Plus,
  Infinity,
  Zap as Lightning,
  Smartphone
} from 'lucide-react';

const Microlearning = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDuration, setSelectedDuration] = useState('all');
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particleCount, setParticleCount] = useState(0);
  const particleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Dynamic particle system
  useEffect(() => {
    const createParticle = () => {
      if (particleRef.current) {
        const particle = document.createElement('div');
        particle.className = 'absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full pointer-events-none animate-float-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        particleRef.current.appendChild(particle);
        
        setTimeout(() => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        }, 5000);
      }
    };

    const interval = setInterval(() => {
      createParticle();
      setParticleCount(prev => prev + 1);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  const categories = [
    { id: 'all', name: 'All Categories', count: 48 },
    { id: 'web-dev', name: 'Web Development', count: 15 },
    { id: 'data-science', name: 'Data Science', count: 12 },
    { id: 'design', name: 'Design', count: 8 },
    { id: 'business', name: 'Business', count: 9 },
    { id: 'marketing', name: 'Marketing', count: 6 }
  ];

  const microModules = [
    {
      id: 1,
      title: 'React Hooks Fundamentals',
      description: 'Master useState, useEffect, and custom hooks in React applications',
      duration: '5 min',
      difficulty: 'Beginner',
      category: 'web-dev',
      progress: 100,
      rating: 4.8,
      students: 1234,
      certificate: true,
      thumbnail: 'https://futurevisioncomputers.com/wp-content/uploads/2024/02/react-hooks-best-practices-lead_.jpg',
      skills: ['React', 'JavaScript', 'Hooks']
    },
    {
      id: 2,
      title: 'Python Data Visualization',
      description: 'Create stunning charts and graphs using Matplotlib and Seaborn',
      duration: '8 min',
      difficulty: 'Intermediate',
      category: 'data-science',
      progress: 60,
      rating: 4.9,
      students: 856,
      certificate: true,
      thumbnail: 'https://www.datasciencecentral.com/wp-content/uploads/2022/11/AdobeStock_423137808.jpg',
      skills: ['Python', 'Data Visualization', 'Matplotlib']
    },
    {
      id: 3,
      title: 'CSS Grid Layout Mastery',
      description: 'Build responsive layouts with CSS Grid in minutes',
      duration: '7 min',
      difficulty: 'Intermediate',
      category: 'web-dev',
      progress: 0,
      rating: 4.7,
      students: 2341,
      certificate: true,
      thumbnail: 'https://img-c.udemycdn.com/course/750x422/3304778_ed4b_2.jpg',
      skills: ['CSS', 'Layout', 'Responsive Design']
    },
    {
      id: 4,
      title: 'Agile Project Management',
      description: 'Essential Agile principles for modern project management',
      duration: '6 min',
      difficulty: 'Beginner',
      category: 'business',
      progress: 30,
      rating: 4.6,
      students: 567,
      certificate: false,
      thumbnail: 'https://www.techfunnel.com/wp-content/uploads/2020/01/Agile-Project-Management.jpg',
      skills: ['Project Management', 'Agile', 'Scrum']
    },
    {
      id: 5,
      title: 'UX Research Basics',
      description: 'Learn user research methods to improve your designs',
      duration: '10 min',
      difficulty: 'Beginner',
      category: 'design',
      progress: 0,
      rating: 4.8,
      students: 432,
      certificate: true,
      thumbnail: 'https://cdn.prod.website-files.com/666aa4fbe0e580742d2d8407/66f2c0673dab88c100b36124_uxresearch-hero-720x420.webp',
      skills: ['UX Research', 'Design Thinking', 'User Testing']
    },
    {
      id: 6,
      title: 'Social Media Analytics',
      description: 'Track and analyze social media performance effectively',
      duration: '9 min',
      difficulty: 'Intermediate',
      category: 'marketing',
      progress: 80,
      rating: 4.5,
      students: 789,
      certificate: true,
      thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvVEFiQbT1tj0ghuB-AdWd574sOYxO0wUhNQ&s',
      skills: ['Social Media', 'Analytics', 'Marketing']
    }
  ];

  const streakData = {
    current: 15,
    best: 28,
    thisWeek: 5,
    thisMonth: 22
  };

  const completedCertificates = [
    { name: 'Web Development Fundamentals', date: '2024-01-10', skills: 8 },
    { name: 'Data Analysis Basics', date: '2024-01-05', skills: 6 },
    { name: 'Digital Marketing Essentials', date: '2023-12-28', skills: 5 }
  ];

  const filteredModules = microModules.filter(module => {
    const categoryMatch = selectedCategory === 'all' || module.category === selectedCategory;
    const durationMatch = selectedDuration === 'all' || 
      (selectedDuration === 'short' && parseInt(module.duration) <= 5) ||
      (selectedDuration === 'medium' && parseInt(module.duration) > 5 && parseInt(module.duration) <= 10) ||
      (selectedDuration === 'long' && parseInt(module.duration) > 10);
    
    return categoryMatch && durationMatch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-50';
      case 'Intermediate': return 'text-yellow-600 bg-yellow-50';
      case 'Advanced': return 'text-red-600 bg-red-50';
      default: return 'text-blue-600 bg-blue-50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        
        {/* Morphing Shapes */}
        <div className="absolute top-1/3 left-1/3 w-32 h-32 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-gradient-to-r from-pink-400/30 to-indigo-400/30 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/4 right-1/4 w-20 h-20 bg-gradient-to-r from-indigo-400/30 to-purple-400/30 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Dynamic Particle System */}
      <div ref={particleRef} className="fixed inset-0 pointer-events-none z-10"></div>

      {/* Floating Icons */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-8 h-8 text-purple-400/30 animate-float hover:scale-150 hover:text-purple-400 cursor-pointer">
          <BookOpen className="w-full h-full" />
        </div>
        <div className="absolute top-40 right-32 w-6 h-6 text-pink-400/30 animate-float hover:scale-150 hover:text-pink-400 cursor-pointer" style={{ animationDelay: '1s' }}>
          <Target className="w-full h-full" />
        </div>
        <div className="absolute bottom-32 left-32 w-10 h-10 text-indigo-400/30 animate-float hover:scale-150 hover:text-indigo-400 cursor-pointer" style={{ animationDelay: '2s' }}>
          <Zap className="w-full h-full" />
        </div>
        <div className="absolute bottom-20 right-20 w-8 h-8 text-purple-400/30 animate-float hover:scale-150 hover:text-purple-400 cursor-pointer" style={{ animationDelay: '3s' }}>
          <Trophy className="w-full h-full" />
        </div>
        <div className="absolute top-1/2 left-10 w-6 h-6 text-pink-400/30 animate-float hover:scale-150 hover:text-pink-400 cursor-pointer" style={{ animationDelay: '0.5s' }}>
          <Brain className="w-full h-full" />
        </div>
        <div className="absolute top-1/2 right-10 w-8 h-8 text-indigo-400/30 animate-float hover:scale-150 hover:text-indigo-400 cursor-pointer" style={{ animationDelay: '1.5s' }}>
          <Sparkles className="w-full h-full" />
        </div>
      </div>

      {/* Interactive Cursor Trail */}
      <div 
        className="fixed w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full pointer-events-none z-50 mix-blend-difference transition-all duration-150 ease-out"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: `scale(${mousePosition.x > 0 ? 1 : 0})`
        }}
      />
      <div 
        className="fixed w-3 h-3 bg-gradient-to-r from-pink-400 to-indigo-400 rounded-full pointer-events-none z-50 mix-blend-difference transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 6,
          top: mousePosition.y - 6,
          transform: `scale(${mousePosition.x > 0 ? 1 : 0})`,
          animationDelay: '0.1s'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Enhanced Header */}
        <div className={`bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 rounded-3xl p-8 text-white mb-8 shadow-2xl transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'} relative overflow-hidden`}>
          {/* Animated Background Pattern */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-indigo-500/20 animate-pulse"></div>
            <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full animate-ping"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/10 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-white/5 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="transform hover:scale-105 transition-all duration-300">
              <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent animate-pulse">
                Microlearning Hub
              </h1>
              <p className="text-purple-100 text-lg md:text-xl">
                Quick skill boosts in bite-sized modules perfect for busy professionals
              </p>
            </div>
            <div className="mt-6 md:mt-0 flex items-center space-x-6">
              <div className="text-center transform hover:scale-110 transition-all duration-300">
                <div className="relative">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 animate-pulse">
                    <span className="text-2xl font-bold text-white">{streakData.current}</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-purple-400 rounded-full animate-ping"></div>
                </div>
                <p className="text-purple-100 text-sm mt-2">Day Streak</p>
              </div>
              <div className="text-center transform hover:scale-110 transition-all duration-300">
                <div className="relative">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 animate-pulse" style={{ animationDelay: '0.5s' }}>
                    <span className="text-2xl font-bold text-white">24</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                </div>
                <p className="text-purple-100 text-sm mt-2">Completed</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Enhanced Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Enhanced Learning Streak */}
            <div className={`bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/50 transform hover:scale-[1.02] transition-all duration-500 relative overflow-hidden ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
            }`}>
              {/* Card Background Animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 animate-pulse"></div>
              
              <div className="relative z-10">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-yellow-500 animate-pulse" />
                  Learning Streak
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center transform hover:scale-105 transition-all duration-300">
                    <span className="text-gray-600">Current</span>
                    <span className="font-bold text-2xl text-purple-600 animate-pulse">{streakData.current} days</span>
                  </div>
                  <div className="flex justify-between items-center transform hover:scale-105 transition-all duration-300">
                    <span className="text-gray-600">Best</span>
                    <span className="font-semibold text-gray-900">{streakData.best} days</span>
                  </div>
                  <div className="flex justify-between items-center transform hover:scale-105 transition-all duration-300">
                    <span className="text-gray-600">This week</span>
                    <span className="font-semibold text-gray-900">{streakData.thisWeek}</span>
                  </div>
                  <div className="flex justify-between items-center transform hover:scale-105 transition-all duration-300">
                    <span className="text-gray-600">This month</span>
                    <span className="font-semibold text-gray-900">{streakData.thisMonth}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Categories */}
            <div className={`bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/50 transform hover:scale-[1.02] transition-all duration-500 relative overflow-hidden ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
            }`} style={{ transitionDelay: '200ms' }}>
              {/* Card Background Animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-indigo-500/5 animate-pulse"></div>
              
              <div className="relative z-10">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category, index) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 hover:translate-x-2 ${
                        selectedCategory === category.id 
                          ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-600 border border-purple-300 shadow-lg' 
                          : 'text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-purple-50 border border-transparent'
                      }`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{category.name}</span>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          selectedCategory === category.id 
                            ? 'bg-purple-600 text-white' 
                            : 'bg-gray-200 text-gray-600'
                        }`}>
                          {category.count}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Enhanced Filters */}
            <div className={`bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/50 transform hover:scale-[1.02] transition-all duration-500 relative overflow-hidden ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
            }`} style={{ transitionDelay: '400ms' }}>
              {/* Card Background Animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 animate-pulse"></div>
              
              <div className="relative z-10">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Filter className="w-5 h-5 mr-2 animate-pulse" />
                  Filters
                </h3>
                <div className="space-y-4">
                  <div className="transform hover:scale-105 transition-all duration-300">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration
                    </label>
                    <select 
                      value={selectedDuration}
                      onChange={(e) => setSelectedDuration(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 hover:bg-gray-50"
                    >
                      <option value="all">All Durations</option>
                      <option value="short">≤ 5 minutes</option>
                      <option value="medium">6-10 minutes</option>
                      <option value="long">{'>'} 10 minutes</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Certificates */}
            <div className={`bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/50 transform hover:scale-[1.02] transition-all duration-500 relative overflow-hidden ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
            }`} style={{ transitionDelay: '600ms' }}>
              {/* Card Background Animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-orange-500/5 animate-pulse"></div>
              
              <div className="relative z-10">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-yellow-500 animate-pulse" />
                  Certificates
                </h3>
                <div className="space-y-3">
                  {completedCertificates.map((cert, index) => (
                    <div key={index} className="border-l-4 border-yellow-400 pl-3 transform hover:scale-105 transition-all duration-300" style={{ transitionDelay: `${index * 100}ms` }}>
                      <p className="text-sm font-medium text-gray-900 line-clamp-1">
                        {cert.name}
                      </p>
                      <p className="text-xs text-gray-500">{cert.date}</p>
                      <p className="text-xs text-yellow-600">{cert.skills} skills mastered</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Enhanced Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Modules Completed', value: '24', icon: <CheckCircle className="w-5 h-5 animate-pulse" />, color: 'text-purple-600' },
                { label: 'Skills Gained', value: '18', icon: <Target className="w-5 h-5 animate-pulse" />, color: 'text-pink-600' },
                { label: 'Time Saved', value: '2.5h', icon: <Clock className="w-5 h-5 animate-pulse" />, color: 'text-indigo-600' },
                { label: 'Certificates', value: '3', icon: <Trophy className="w-5 h-5 animate-pulse" />, color: 'text-yellow-600' }
              ].map((stat, index) => (
                <div key={index} className={`bg-white/80 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-white/50 transform hover:scale-[1.02] transition-all duration-500 relative overflow-hidden ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
                }`} style={{ transitionDelay: `${index * 100}ms` }}>
                  {/* Card Background Animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 animate-pulse"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-2">
                      <div className={`${stat.color} transform hover:scale-110 transition-transform duration-300`}>{stat.icon}</div>
                      <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                    </div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Enhanced Modules Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredModules.map((module, idx) => (
                <div 
                  key={module.id} 
                  className={`bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.03] hover:-translate-y-2 relative group ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
                  }`} 
                  style={{ transitionDelay: `${idx * 200}ms` }}
                  onMouseEnter={() => setHoveredCard(module.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Card Background Animation */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${hoveredCard === module.id ? 'from-purple-500/10 to-pink-500/10' : 'from-transparent to-transparent'} transition-all duration-500`}></div>
                  
                  <div className="relative z-10">
                    <div className="relative">
                      <img 
                        src={module.thumbnail} 
                        alt={module.title}
                        className="w-full h-40 object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-3 left-3">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(module.difficulty)} transform hover:scale-110 transition-transform duration-300`}>
                          {module.difficulty}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3">
                        <div className="bg-black/50 text-white px-2 py-1 rounded text-xs flex items-center backdrop-blur-sm">
                          <Clock className="w-3 h-3 mr-1" />
                          {module.duration}
                        </div>
                      </div>
                      {module.certificate && (
                        <div className="absolute bottom-3 right-3">
                          <Trophy className="w-5 h-5 text-yellow-400 animate-pulse" />
                        </div>
                      )}
                                             {module.progress > 0 && (
                         <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm h-2">
                           <div 
                             className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 transition-all duration-1000 shadow-lg" 
                             style={{ width: `${module.progress}%` }}
                           ></div>
                         </div>
                       )}
                    </div>
                    
                    <div className="p-5">
                                             <div className="flex items-start justify-between mb-3">
                         <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-purple-600 transition-colors duration-300">
                           {module.title}
                         </h3>
                         {module.progress === 100 && (
                           <CheckCircle className="w-6 h-6 text-purple-500 flex-shrink-0 ml-2 animate-pulse" />
                         )}
                       </div>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {module.description}
                      </p>
                      
                                             <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                         <div className="flex items-center space-x-1 group-hover:text-purple-600 transition-colors duration-300">
                           <Star className="w-4 h-4 text-yellow-400 animate-pulse" />
                           <span>{module.rating}</span>
                         </div>
                         <div className="flex items-center space-x-1 group-hover:text-purple-600 transition-colors duration-300">
                           <BookOpen className="w-4 h-4 animate-pulse" />
                           <span>{module.students}</span>
                         </div>
                       </div>
                      
                      {module.progress > 0 && module.progress < 100 && (
                        <div className="mb-4">
                          <div className="flex justify-between text-xs text-gray-600 mb-1">
                            <span>Progress</span>
                            <span>{module.progress}%</span>
                          </div>
                                                     <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                             <div 
                               className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-1000 shadow-lg" 
                               style={{ width: `${module.progress}%` }}
                             ></div>
                           </div>
                        </div>
                      )}
                      
                      <div className="mb-4">
                                                 <div className="flex flex-wrap gap-2">
                           {module.skills.slice(0, 2).map((skill, index) => (
                             <span key={index} className="px-2 py-1 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-600 text-xs rounded-full border border-purple-200 transform hover:scale-110 transition-all duration-300" style={{ transitionDelay: `${index * 100}ms` }}>
                               {skill}
                             </span>
                           ))}
                           {module.skills.length > 2 && (
                             <span className="px-2 py-1 bg-gray-50 text-gray-500 text-xs rounded-full border border-gray-200">
                               +{module.skills.length - 2} more
                             </span>
                           )}
                         </div>
                      </div>
                      
                                             <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-lg font-medium hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 group-hover:from-pink-600 group-hover:to-indigo-600">
                        {module.progress === 0 ? (
                          <>
                            <Play className="w-4 h-4 animate-pulse" />
                            <span>Start Module</span>
                          </>
                        ) : module.progress === 100 ? (
                          <>
                            <CheckCircle className="w-4 h-4 animate-pulse" />
                            <span>Review</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 animate-pulse" />
                            <span>Continue</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Enhanced Daily Goal Progress */}
            <div className={`bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200 shadow-xl transform hover:scale-[1.02] transition-all duration-500 relative overflow-hidden ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
            }`} style={{ transitionDelay: '800ms' }}>
              {/* Card Background Animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 animate-pulse"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-purple-600 animate-pulse" />
                    Daily Learning Goal
                  </h3>
                  <span className="text-sm text-purple-600 font-medium">2/3 modules today</span>
                </div>
                <div className="w-full bg-purple-200 rounded-full h-3 mb-3 overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full transition-all duration-1000 shadow-lg" style={{ width: '67%' }}></div>
                </div>
                <p className="text-sm text-gray-600">
                  Great progress! Complete 1 more module to reach your daily goal and maintain your streak.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Microlearning;