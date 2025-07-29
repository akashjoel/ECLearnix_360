import React, { useState, useEffect, useRef } from 'react';
import { 
  User,
  Edit,
  Camera,
  Star,
  Trophy,
  Award,
  Target,
  Calendar,
  Clock,
  BookOpen,
  Zap,
  TrendingUp,
  Activity,
  ArrowRight,
  Heart,
  Share2,
  Download,
  Bell,
  Shield,
  Globe,
  Palette,
  Moon,
  Sun,
  LogOut,
  ChevronRight,
  CheckCircle,
  X,
  Plus,
  Minus,
  Sparkles,
  Brain,
  Cpu,
  Database,
  Wifi,
  Cloud,
  Layers,
  GitBranch,
  Music,
  Video,
  Mic,
  BarChart3,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Infinity,
  Zap as Lightning,
  Smartphone,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Twitter,
  Instagram,
  Facebook,
  Youtube,
  Twitch,
  Slack,
  Figma,
  Dribbble,
  Balancer,
  Synthetix,
  Ren,
  Thorchain,
  Terra,
  Near,
  Algorand,
  Tezos,
  Stellar,
  Ripple,
  Litecoin,
  BitcoinCash,
  Monero,
  Zcash,
  Dash,
  Nano,
  Iota,
  VeChain,
  Tron,
  EOS,
  Steem,
  Hive,
  HBD,
  SBD,
  STEEM,
  HIVE,
  HBD as HiveBackedDollar,
  SBD as SteemBackedDollar
} from 'lucide-react';

const Profile = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particleCount, setParticleCount] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
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

  const userProfile = {
    name: 'G.Akash Joel',
    email: 'akashjoel08@gmail.com',
    avatar: 'https://sdmntpreastus.oaiusercontent.com/files/9219f9fd8e817a9_00000000-66f0-61f9-a832-32dd8d09eb06/drvs/thumbnail/raw?se=2025-07-28T21%3A28%3A38Z&sp=r&sv=2024-08-04&sr=b&scid=dde40450-b9ec-5a42-8b90-db4a57e54d08&skoid=04233560-0ad7-493e-8bf0-1347c317d021&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-07-28T19%3A42%3A40Z&ske=2025-07-29T19%3A42%3A40Z&sks=b&skv=2024-08-04&sig=%2BQ%2BolFdNQekp%2BmW%2BnfMMhw8k9dUkAddzu%2Btb7yjGKPA%3D',
    coverImage: 'https://sdmntpreastus.oaiusercontent.com/files/00000000-0cc0-61f9-9c84-4cf7801fa857/raw?se=2025-07-28T21%3A07%3A15Z&sp=r&sv=2024-08-04&sr=b&scid=6ed859e9-348d-5f42-8e14-f74662cb945f&skoid=04233560-0ad7-493e-8bf0-1347c317d021&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-07-28T19%3A07%3A52Z&ske=2025-07-29T19%3A07%3A52Z&sks=b&skv=2024-08-04&sig=xFt%2BEowoTkhAkM1S4Vhv%2BIo3TvSXKlk%2BdxZ88GsR8J8%3D  ',
    title: 'Full Stack Developer & ML Engineer',
    location: 'Tirunelveli,Tamil Nadu',
    bio: 'Passionate developer with 5+ years of experience in web development, machine learning, and cloud technologies. Always eager to learn new technologies and contribute to innovative projects.',
    joinedDate: 'March 2022',
    website: 'https://alexjohnson.dev',
    social: {
      github: 'alexjohnson',
      linkedin: 'alexjohnson',
      twitter: '@alexjohnson',
      instagram: '@alexjohnson'
    }
  };

  const stats = {
    coursesCompleted: 24,
    certificatesEarned: 8,
    learningStreak: 45,
    totalHours: 156,
    skillsMastered: 18,
    projectsCompleted: 12,
    averageRating: 4.8,
    mentorSessions: 6
  };

  const achievements = [
    {
      id: 1,
      title: 'Learning Champion',
      description: 'Completed 20+ courses',
      icon: <Trophy className="w-6 h-6" />,
      color: 'from-yellow-400 to-orange-500',
      earned: '2024-01-15'
    },
    {
      id: 2,
      title: 'Streak Master',
      description: 'Maintained 30+ day learning streak',
      icon: <Zap className="w-6 h-6" />,
      color: 'from-purple-400 to-pink-500',
      earned: '2024-01-10'
    },
    {
      id: 3,
      title: 'Skill Builder',
      description: 'Mastered 15+ skills',
      icon: <Target className="w-6 h-6" />,
      color: 'from-blue-400 to-cyan-500',
      earned: '2024-01-05'
    },
    {
      id: 4,
      title: 'Mentor',
      description: 'Helped 5+ other learners',
      icon: <Heart className="w-6 h-6" />,
      color: 'from-green-400 to-emerald-500',
      earned: '2023-12-28'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'course_completed',
      title: 'Completed React Advanced Patterns',
      description: 'Finished the advanced React course with 95% score',
      time: '2 hours ago',
      icon: <CheckCircle className="w-5 h-5 text-green-500" />
    },
    {
      id: 2,
      type: 'certificate_earned',
      title: 'Earned AWS Solutions Architect Certificate',
      description: 'Successfully passed the AWS certification exam',
      time: '1 day ago',
      icon: <Award className="w-5 h-5 text-yellow-500" />
    },
    {
      id: 3,
      type: 'mentor_session',
      title: 'Mentor Session with Sarah Chen',
      description: 'Had a productive session about career development',
      time: '2 days ago',
      icon: <User className="w-5 h-5 text-purple-500" />
    },
    {
      id: 4,
      type: 'skill_mastered',
      title: 'Mastered TypeScript',
      description: 'Completed all TypeScript challenges and projects',
      time: '3 days ago',
      icon: <Target className="w-5 h-5 text-blue-500" />
    }
  ];

  const skills = [
    { name: 'React', level: 95, category: 'Frontend' },
    { name: 'TypeScript', level: 90, category: 'Frontend' },
    { name: 'Node.js', level: 85, category: 'Backend' },
    { name: 'Python', level: 80, category: 'Backend' },
    { name: 'AWS', level: 75, category: 'Cloud' },
    { name: 'Docker', level: 70, category: 'DevOps' },
    { name: 'Machine Learning', level: 65, category: 'AI/ML' },
    { name: 'GraphQL', level: 60, category: 'API' }
  ];

  const tabs = [
    { id: 'overview', name: 'Overview', icon: <User className="w-4 h-4" /> },
    { id: 'achievements', name: 'Achievements', icon: <Trophy className="w-4 h-4" /> },
    { id: 'activity', name: 'Activity', icon: <Activity className="w-4 h-4" /> },
    { id: 'skills', name: 'Skills', icon: <Target className="w-4 h-4" /> }
  ];

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
          <User className="w-full h-full" />
        </div>
        <div className="absolute top-40 right-32 w-6 h-6 text-pink-400/30 animate-float hover:scale-150 hover:text-pink-400 cursor-pointer" style={{ animationDelay: '1s' }}>
          <Trophy className="w-full h-full" />
        </div>
        <div className="absolute bottom-32 left-32 w-10 h-10 text-indigo-400/30 animate-float hover:scale-150 hover:text-indigo-400 cursor-pointer" style={{ animationDelay: '2s' }}>
          <Target className="w-full h-full" />
        </div>
        <div className="absolute bottom-20 right-20 w-8 h-8 text-purple-400/30 animate-float hover:scale-150 hover:text-purple-400 cursor-pointer" style={{ animationDelay: '3s' }}>
          <Star className="w-full h-full" />
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
                Profile Dashboard
              </h1>
              <p className="text-purple-100 text-lg md:text-xl">
                Manage your learning journey and achievements
              </p>
            </div>
            <div className="mt-6 md:mt-0 flex items-center space-x-4">
              <button className="p-3 text-white/70 hover:text-white transition-all duration-300 bg-white/10 rounded-full backdrop-blur-sm hover:bg-white/20 transform hover:scale-110 hover:rotate-12 shadow-lg">
                <Bell className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className={`bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 transform hover:scale-[1.02] transition-all duration-500 relative overflow-hidden ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
            }`}>
              {/* Card Background Animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 animate-pulse"></div>
              
              <div className="relative z-10">
                {/* Cover Image */}
                <div className="relative h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-t-2xl overflow-hidden">
                  <img 
                    src={userProfile.coverImage} 
                    alt="Cover" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20"></div>
                  <button className="absolute top-3 right-3 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 transform hover:scale-110">
                    <Camera className="w-4 h-4 text-white" />
                  </button>
                </div>

                {/* Avatar and Info */}
                <div className="relative px-6 pb-6">
                  <div className="flex justify-center -mt-12 mb-4">
                    <div className="relative">
                      <img 
                        src={userProfile.avatar} 
                        alt={userProfile.name}
                        className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
                      />
                      <button className="absolute bottom-0 right-0 p-2 bg-purple-500 rounded-full hover:bg-purple-600 transition-all duration-300 transform hover:scale-110 shadow-lg">
                        <Edit className="w-3 h-3 text-white" />
                      </button>
                    </div>
                  </div>

                  <div className="text-center">
                    <h2 className="text-xl font-bold text-gray-900 mb-1">{userProfile.name}</h2>
                    <p className="text-gray-600 text-sm mb-2">{userProfile.title}</p>
                    <div className="flex items-center justify-center space-x-2 text-gray-500 text-sm mb-4">
                      <MapPin className="w-4 h-4" />
                      <span>{userProfile.location}</span>
                    </div>
                    
                    <div className="flex justify-center space-x-3 mb-4">
                      <button className="p-2 text-gray-400 hover:text-purple-600 transition-all duration-300 bg-gray-100 rounded-full hover:bg-purple-50 transform hover:scale-110">
                        <Github className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-purple-600 transition-all duration-300 bg-gray-100 rounded-full hover:bg-purple-50 transform hover:scale-110">
                        <Linkedin className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-purple-600 transition-all duration-300 bg-gray-100 rounded-full hover:bg-purple-50 transform hover:scale-110">
                        <Twitter className="w-4 h-4" />
                      </button>
                    </div>

                    <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-lg font-medium hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className={`bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/50 transform hover:scale-[1.02] transition-all duration-500 relative overflow-hidden ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
            }`} style={{ transitionDelay: '200ms' }}>
              {/* Card Background Animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-indigo-500/5 animate-pulse"></div>
              
              <div className="relative z-10">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-purple-600 animate-pulse" />
                  Quick Stats
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center transform hover:scale-105 transition-all duration-300">
                    <span className="text-gray-600">Courses</span>
                    <span className="font-bold text-2xl text-purple-600 animate-pulse">{stats.coursesCompleted}</span>
                  </div>
                  <div className="flex justify-between items-center transform hover:scale-105 transition-all duration-300">
                    <span className="text-gray-600">Certificates</span>
                    <span className="font-bold text-2xl text-pink-600">{stats.certificatesEarned}</span>
                  </div>
                  <div className="flex justify-between items-center transform hover:scale-105 transition-all duration-300">
                    <span className="text-gray-600">Streak</span>
                    <span className="font-bold text-2xl text-indigo-600">{stats.learningStreak} days</span>
                  </div>
                  <div className="flex justify-between items-center transform hover:scale-105 transition-all duration-300">
                    <span className="text-gray-600">Hours</span>
                    <span className="font-bold text-2xl text-purple-600">{stats.totalHours}h</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className={`bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 transform hover:scale-[1.02] transition-all duration-500 relative overflow-hidden ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
            }`} style={{ transitionDelay: '400ms' }}>
              {/* Card Background Animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 animate-pulse"></div>
              
              <div className="relative z-10 p-4">
                <div className="space-y-2">
                  {tabs.map((tab, index) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:translate-x-2 ${
                        activeTab === tab.id 
                          ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-600 border border-purple-300 shadow-lg' 
                          : 'text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-purple-50 border border-transparent'
                      }`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      {tab.icon}
                      <span className="font-medium">{tab.name}</span>
                      <ChevronRight className={`w-4 h-4 ml-auto transition-transform duration-300 ${activeTab === tab.id ? 'rotate-90' : ''}`} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Skills Mastered', value: stats.skillsMastered, icon: <Target className="w-5 h-5 animate-pulse" />, color: 'text-purple-600' },
                    { label: 'Projects', value: stats.projectsCompleted, icon: <BookOpen className="w-5 h-5 animate-pulse" />, color: 'text-pink-600' },
                    { label: 'Rating', value: stats.averageRating, icon: <Star className="w-5 h-5 animate-pulse" />, color: 'text-indigo-600' },
                    { label: 'Mentor Sessions', value: stats.mentorSessions, icon: <User className="w-5 h-5 animate-pulse" />, color: 'text-yellow-600' }
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

                {/* Recent Activity */}
                <div className={`bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 transform hover:scale-[1.02] transition-all duration-500 relative overflow-hidden ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
                }`} style={{ transitionDelay: '600ms' }}>
                  {/* Card Background Animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 animate-pulse"></div>
                  
                  <div className="relative z-10 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                      <Activity className="w-5 h-5 mr-2 text-purple-600 animate-pulse" />
                      Recent Activity
                    </h3>
                    <div className="space-y-4">
                      {recentActivity.map((activity, index) => (
                        <div key={activity.id} className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 transform hover:scale-105" style={{ transitionDelay: `${index * 100}ms` }}>
                          <div className="flex-shrink-0">
                            {activity.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                            <p className="text-sm text-gray-500">{activity.description}</p>
                            <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Achievements Tab */}
            {activeTab === 'achievements' && (
              <div className={`bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 transform hover:scale-[1.02] transition-all duration-500 relative overflow-hidden ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
              }`}>
                {/* Card Background Animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 animate-pulse"></div>
                
                <div className="relative z-10 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                    <Trophy className="w-5 h-5 mr-2 text-yellow-500 animate-pulse" />
                    Achievements
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {achievements.map((achievement, index) => (
                      <div key={achievement.id} className="p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105" style={{ transitionDelay: `${index * 100}ms` }}>
                        <div className="flex items-center space-x-4">
                          <div className={`p-3 rounded-full bg-gradient-to-r ${achievement.color} text-white transform hover:scale-110 transition-transform duration-300`}>
                            {achievement.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                            <p className="text-sm text-gray-600">{achievement.description}</p>
                            <p className="text-xs text-gray-400 mt-1">Earned {achievement.earned}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Skills Tab */}
            {activeTab === 'skills' && (
              <div className={`bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 transform hover:scale-[1.02] transition-all duration-500 relative overflow-hidden ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
              }`}>
                {/* Card Background Animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 animate-pulse"></div>
                
                <div className="relative z-10 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-purple-600 animate-pulse" />
                    Skills & Expertise
                  </h3>
                  <div className="space-y-6">
                    {skills.map((skill, index) => (
                      <div key={skill.name} className="transform hover:scale-105 transition-all duration-300" style={{ transitionDelay: `${index * 100}ms` }}>
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center space-x-3">
                            <span className="text-sm font-medium text-gray-900">{skill.name}</span>
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{skill.category}</span>
                          </div>
                          <span className="text-sm font-semibold text-purple-600">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-1000 shadow-lg" 
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}


          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 