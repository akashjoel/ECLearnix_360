import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Star, 
  Clock, 
  Users, 
  Trophy, 
  Target,
  Play,
  CheckCircle,
  Lock,
  Zap,
  Sparkles,
  TrendingUp,
  Award,
  Rocket,
  Lightbulb,
  Globe,
  Code,
  Heart,
  Eye,
  Share2,
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
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Plus,
  Infinity,
  Zap as Lightning,
  Smartphone
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const LearningPaths = () => {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('recommended');
  const [hoveredPath, setHoveredPath] = useState<number | null>(null);
  const [skillTreeVisible, setSkillTreeVisible] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const categories = [
    { id: 'recommended', name: 'Recommended for You', count: 12, icon: <Sparkles className="w-4 h-4" />, color: 'from-purple-500 to-pink-500' },
    { id: 'in-progress', name: 'In Progress', count: 3, icon: <Play className="w-4 h-4" />, color: 'from-blue-500 to-cyan-500' },
    { id: 'completed', name: 'Completed', count: 8, icon: <Trophy className="w-4 h-4" />, color: 'from-green-500 to-emerald-500' },
    { id: 'saved', name: 'Saved for Later', count: 5, icon: <Heart className="w-4 h-4" />, color: 'from-yellow-500 to-orange-500' }
  ];

  const learningPaths = [
    {
      id: 1,
      title: 'Complete Web Development',
      description: 'Master HTML, CSS, JavaScript, React, and backend development',
      level: 'Beginner to Advanced',
      duration: '120 hours',
      students: '15,234',
      rating: 4.8,
      progress: 35,
      modules: 12,
      completedModules: 4,
      category: 'recommended',
      skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'],
      thumbnail: 'https://t3.ftcdn.net/jpg/02/14/87/96/360_F_214879686_R3HFJlk6WLr1kcdvy6Q9rtNASKN0BZBS.jpg',
      difficulty: 'Intermediate',
      popularity: 95,
      completionRate: 78,
      badges: ['Hot', 'Trending', 'AI Recommended'],
      techStack: ['Frontend', 'Backend', 'Database'],
      estimatedSalary: '$85,000',
      timeToComplete: '6 months'
    },
    {
      id: 2,
      title: 'Data Science Fundamentals',
      description: 'Learn Python, statistics, machine learning, and data visualization',
      level: 'Intermediate',
      duration: '80 hours',
      students: '8,567',
      rating: 4.9,
      progress: 0,
      modules: 10,
      completedModules: 0,
      category: 'recommended',
      skills: ['Python', 'Pandas', 'NumPy', 'Machine Learning'],
      thumbnail: 'https://miro.medium.com/v2/resize:fit:1400/1*gmZ4AOC-BDU0hE9qUNQEkg.png',
      difficulty: 'Advanced',
      popularity: 88,
      completionRate: 65,
      badges: ['High Demand', 'Future-Proof'],
      techStack: ['Python', 'ML', 'Analytics'],
      estimatedSalary: '$95,000',
      timeToComplete: '4 months'
    },
    {
      id: 3,
      title: 'Digital Marketing Mastery',
      description: 'Complete guide to SEO, social media, content marketing, and analytics',
      level: 'Beginner',
      duration: '45 hours',
      students: '12,890',
      rating: 4.7,
      progress: 100,
      modules: 8,
      completedModules: 8,
      category: 'completed',
      skills: ['SEO', 'Social Media', 'Analytics', 'Content Marketing'],
      thumbnail: 'https://media.licdn.com/dms/image/v2/D4D12AQFhiu6LyJXBhQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1700542164188?e=2147483647&v=beta&t=VQlwNSONrJjY1QGQFPF80HZOUV5kYJc18qDi8FIt0i4',
      difficulty: 'Beginner',
      popularity: 92,
      completionRate: 85,
      badges: ['Completed', 'Certified'],
      techStack: ['Marketing', 'Analytics', 'Social'],
      estimatedSalary: '$65,000',
      timeToComplete: '3 months'
    },
    {
      id: 4,
      title: 'Mobile App Development',
      description: 'Build iOS and Android apps using React Native and Flutter',
      level: 'Intermediate',
      duration: '95 hours',
      students: '6,234',
      rating: 4.6,
      progress: 65,
      modules: 14,
      completedModules: 9,
      category: 'in-progress',
      skills: ['React Native', 'Flutter', 'Mobile UI/UX'],
      thumbnail: 'https://img.freepik.com/free-vector/app-development-banner_33099-1720.jpg?semt=ais_hybrid&w=740',
      difficulty: 'Intermediate',
      popularity: 76,
      completionRate: 72,
      badges: ['In Progress', 'Popular'],
      techStack: ['Mobile', 'Cross-Platform', 'UI/UX'],
      estimatedSalary: '$80,000',
      timeToComplete: '5 months'
    }
  ];

  const recommendedSkills = [
    { name: 'JavaScript', demand: 95, growth: '+23%', color: 'from-yellow-500 to-orange-500', icon: <Code className="w-4 h-4" />, level: 'Advanced', salary: '$90k', trend: 'up' },
    { name: 'Python', demand: 89, growth: '+18%', color: 'from-blue-500 to-cyan-500', icon: <Code className="w-4 h-4" />, level: 'Intermediate', salary: '$85k', trend: 'up' },
    { name: 'React', demand: 82, growth: '+31%', color: 'from-cyan-500 to-blue-500', icon: <Code className="w-4 h-4" />, level: 'Advanced', salary: '$88k', trend: 'up' },
    { name: 'Data Science', demand: 78, growth: '+45%', color: 'from-purple-500 to-pink-500', icon: <TrendingUp className="w-4 h-4" />, level: 'Expert', salary: '$95k', trend: 'up' },
    { name: 'Machine Learning', demand: 71, growth: '+52%', color: 'from-green-500 to-emerald-500', icon: <Zap className="w-4 h-4" />, level: 'Expert', salary: '$100k', trend: 'up' }
  ];

  const skillTree = {
    'Frontend': {
      children: ['HTML', 'CSS', 'JavaScript', 'React', 'Vue', 'Angular'],
      color: 'from-blue-500 to-cyan-500',
      icon: <Palette className="w-6 h-6" />
    },
    'Backend': {
      children: ['Node.js', 'Python', 'Java', 'C#', 'PHP', 'Go'],
      color: 'from-green-500 to-emerald-500',
      icon: <Database className="w-6 h-6" />
    },
    'Mobile': {
      children: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Xamarin'],
      color: 'from-purple-500 to-pink-500',
      icon: <Smartphone className="w-6 h-6" />
    },
    'AI/ML': {
      children: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenAI'],
      color: 'from-indigo-500 to-purple-500',
      icon: <Brain className="w-6 h-6" />
    }
  };

  const filteredPaths = learningPaths.filter(path => 
    selectedCategory === 'recommended' ? 
    (path.category === 'recommended' || path.progress > 0 && path.progress < 100) : 
    path.category === selectedCategory
  );

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'text-green-600 bg-green-50 border-green-200';
      case 'Intermediate': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Advanced': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header with Effects */}
        <div className={`bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl p-8 text-white mb-8 shadow-xl transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'} relative overflow-hidden`}>
          {/* Animated Background Pattern */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-indigo-500/20 animate-pulse"></div>
            <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full animate-ping"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/10 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="transform hover:scale-105 transition-all duration-300">
              <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent animate-pulse">
                Personalized Learning Paths
              </h1>
              <p className="text-blue-100 text-lg md:text-xl">
                AI-curated learning journeys tailored to your goals and skill level
              </p>
            </div>
            <div className="mt-6 md:mt-0 flex items-center space-x-6">
              <div className="text-center transform hover:scale-110 transition-all duration-300">
                <div className="relative">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 animate-pulse">
                    <span className="text-2xl font-bold text-white">12</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
                </div>
                <p className="text-blue-100 text-sm mt-2">Active Paths</p>
              </div>
              <div className="text-center transform hover:scale-110 transition-all duration-300">
                <div className="relative">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 animate-pulse" style={{ animationDelay: '0.5s' }}>
                    <span className="text-2xl font-bold text-white">67%</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                </div>
                <p className="text-blue-100 text-sm mt-2">Avg Progress</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Enhanced Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Enhanced Categories */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/50 transform hover:scale-[1.02] transition-all duration-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 animate-pulse"></div>
              
              <div className="relative z-10">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((category, index) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left p-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:translate-x-2 ${
                        selectedCategory === category.id 
                          ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-700 border border-blue-300 shadow-lg' 
                          : 'text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 border border-transparent'
                      }`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className={`p-1.5 rounded ${selectedCategory === category.id ? 'bg-blue-100' : 'bg-gray-100'} transform hover:rotate-12 transition-transform duration-300`}>
                            {category.icon}
                          </div>
                          <span className="font-medium">{category.name}</span>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          selectedCategory === category.id 
                            ? 'bg-blue-600 text-white' 
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

            {/* Enhanced Skill Demand */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/50 transform hover:scale-[1.02] transition-all duration-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 animate-pulse"></div>
              
              <div className="relative z-10">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  Trending Skills
                </h3>
                <div className="space-y-4">
                  {recommendedSkills.map((skill, index) => (
                    <div key={index} className="transform hover:scale-105 transition-all duration-300" style={{ transitionDelay: `${index * 100}ms` }}>
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`p-1.5 rounded bg-gradient-to-r ${skill.color} text-white transform hover:scale-110 transition-transform duration-300`}>
                            {skill.icon}
                          </div>
                          <span className="font-medium text-gray-800">{skill.name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-sm text-green-600 font-medium animate-pulse">{skill.growth}</span>
                          {skill.trend === 'up' ? (
                            <ArrowUpRight className="w-4 h-4 text-green-500" />
                          ) : (
                            <ArrowDownRight className="w-4 h-4 text-red-500" />
                          )}
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div 
                          className={`h-2 rounded-full bg-gradient-to-r ${skill.color} transition-all duration-1000 shadow-lg`}
                          style={{ 
                            width: `${skill.demand}%`,
                            transitionDelay: `${index * 200}ms`
                          }}
                        ></div>
                      </div>
                      <div className="flex justify-between items-center mt-1 text-xs text-gray-500">
                        <span>{skill.level}</span>
                        <span className="font-medium">{skill.salary}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Enhanced Quick Actions */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/50 transform hover:scale-[1.02] transition-all duration-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5 animate-pulse"></div>
              
              <div className="relative z-10">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-green-600" />
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  {[
                    { icon: <Target className="w-4 h-4" />, text: 'Set Learning Goals' },
                    { icon: <Zap className="w-4 h-4" />, text: 'Take Skill Assessment' },
                    { icon: <BookOpen className="w-4 h-4" />, text: 'Browse All Courses' }
                  ].map((action, index) => (
                    <button 
                      key={index}
                      className="w-full text-left p-3 text-gray-700 hover:text-gray-900 rounded-lg transition-all duration-300 flex items-center gap-3 hover:bg-gradient-to-r hover:from-gray-50 hover:to-white transform hover:scale-105 hover:translate-x-2 border border-transparent hover:border-gray-200"
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <div className="p-1.5 rounded bg-blue-100 text-blue-600 transform hover:scale-110 transition-transform duration-300">
                        {action.icon}
                      </div>
                      <span className="font-medium">{action.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Enhanced Learning Paths Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPaths.map((path, index) => (
                <div 
                  key={path.id} 
                  className={`bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.03] hover:-translate-y-2 relative group ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                  onMouseEnter={() => setHoveredPath(path.id)}
                  onMouseLeave={() => setHoveredPath(null)}
                >
                  {/* Card Background Animation */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${hoveredPath === path.id ? 'from-blue-500/10 to-purple-500/10' : 'from-transparent to-transparent'} transition-all duration-500`}></div>
                  
                  <div className="relative z-10">
                    <div className="relative overflow-hidden">
                      <img 
                        src={path.thumbnail} 
                        alt={path.title}
                        className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                      
                      {/* Enhanced Badges */}
                      <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getLevelColor(path.level)} transform hover:scale-110 transition-transform duration-300`}>
                          {path.level}
                        </span>
                        {path.badges.slice(0, 2).map((badge, badgeIndex) => (
                          <span 
                            key={badge}
                            className="px-2 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-white border border-yellow-200 transform hover:scale-110 transition-transform duration-300 animate-pulse"
                            style={{ animationDelay: `${badgeIndex * 0.5}s` }}
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                      
                      {/* Enhanced Progress Bar */}
                      {path.progress > 0 && (
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="bg-white/90 backdrop-blur-sm rounded-full h-2 border border-white/50">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000 shadow-lg"
                              style={{ width: `${path.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                      
                      {path.progress === 100 && (
                        <div className="absolute top-4 right-4">
                          <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg animate-pulse">
                            <Trophy className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                        {path.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {path.description}
                      </p>
                      
                      {/* Enhanced Stats */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-500 group-hover:text-blue-600 transition-colors duration-300">
                          <Clock className="w-4 h-4" />
                          <span>{path.duration}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500 group-hover:text-blue-600 transition-colors duration-300">
                          <Users className="w-4 h-4" />
                          <span>{path.students}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span>{path.rating}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Activity className="w-4 h-4" />
                          <span>{path.completionRate}%</span>
                        </div>
                      </div>
                      
                      {/* Enhanced Tech Stack */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {path.techStack.map((tech, techIndex) => (
                            <span 
                              key={tech}
                              className="px-2 py-1 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 text-xs font-medium rounded-full border border-blue-200 transform hover:scale-110 transition-all duration-300"
                              style={{ transitionDelay: `${techIndex * 100}ms` }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {/* Enhanced Salary and Time */}
                      <div className="flex justify-between items-center mb-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 transform hover:scale-105 transition-transform duration-300">
                        <div className="text-center">
                          <p className="text-xs text-gray-500">Est. Salary</p>
                          <p className="font-bold text-green-600">{path.estimatedSalary}</p>
                        </div>
                        <div className="w-px h-8 bg-green-200"></div>
                        <div className="text-center">
                          <p className="text-xs text-gray-500">Time to Complete</p>
                          <p className="font-bold text-blue-600">{path.timeToComplete}</p>
                        </div>
                      </div>
                      
                      {/* Enhanced Progress */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                          <span>Progress</span>
                          <span className="font-medium">{path.completedModules}/{path.modules} modules</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000 shadow-lg"
                            style={{ width: `${(path.completedModules / path.modules) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      {/* Enhanced Skills */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {path.skills.slice(0, 3).map((skill, skillIndex) => (
                            <span 
                              key={skill} 
                              className="px-2 py-1 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-600 text-xs font-medium rounded-full border border-purple-200 transform hover:scale-110 transition-all duration-300"
                              style={{ transitionDelay: `${skillIndex * 100}ms` }}
                            >
                              {skill}
                            </span>
                          ))}
                          {path.skills.length > 3 && (
                            <span className="px-2 py-1 bg-gray-50 text-gray-500 text-xs font-medium rounded-full border border-gray-200">
                              +{path.skills.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Enhanced Actions */}
                      <div className="flex items-center justify-between">
                        <button className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-xl transition-all duration-300 transform hover:scale-105 group-hover:from-purple-600 group-hover:to-pink-600">
                          {path.progress === 0 ? (
                            <>
                              <Play className="w-4 h-4" />
                              <span>Start Learning</span>
                            </>
                          ) : path.progress === 100 ? (
                            <>
                              <CheckCircle className="w-4 h-4" />
                              <span>Review</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4" />
                              <span>Continue</span>
                            </>
                          )}
                        </button>
                        
                        <div className="flex items-center space-x-1">
                          <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 transform hover:scale-110">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 transform hover:scale-110">
                            <Share2 className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300 transform hover:scale-110">
                            <Heart className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Enhanced AI Recommendations */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200 shadow-xl transform hover:scale-[1.02] transition-all duration-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 animate-pulse"></div>
              
              <div className="relative z-10 flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0 transform hover:scale-110 transition-all duration-300 shadow-lg animate-pulse">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                    AI Recommendation
                    <Sparkles className="w-4 h-4 text-purple-600 animate-pulse" />
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Based on your progress in Web Development and current industry trends, 
                    we recommend adding <span className="font-semibold text-purple-600">"Cloud Computing Fundamentals"</span> to your learning path. 
                    This will complement your existing skills and increase your job market value by <span className="font-semibold text-green-600">34%</span>.
                  </p>
                  <div className="flex items-center space-x-3">
                    <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                      View Course
                    </button>
                    <button className="text-purple-600 hover:text-purple-700 text-sm font-medium hover:underline transition-all duration-300">
                      Tell me more
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningPaths;