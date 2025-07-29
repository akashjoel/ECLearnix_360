import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, 
  Clock, 
  Award, 
  TrendingUp, 
  Play, 
  Video, 
  MapPin, 
  Users, 
  Zap, 
  UserCheck, 
  Calendar, 
  Target,
  Star,
  Sparkles,
  Brain,
  Rocket
} from 'lucide-react';

// Particle system for background effects
const Particle = ({ delay = 0 }: { delay?: number }) => {
  const [position, setPosition] = useState({ x: Math.random() * 100, y: Math.random() * 100 });
  
  useEffect(() => {
    const interval = setInterval(() => {
      setPosition({
        x: Math.random() * 100,
        y: Math.random() * 100
      });
    }, 3000 + Math.random() * 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="absolute w-1 h-1 bg-white bg-opacity-30 rounded-full transition-all duration-3000 ease-in-out"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        animationDelay: `${delay}ms`
      }}
    />
  );
};

// Morphing blob background
const MorphingBlob = ({ className = '', delay = 0 }: { className?: string; delay?: number }) => (
  <div 
    className={`absolute rounded-full opacity-20 animate-morph ${className}`}
    style={{ animationDelay: `${delay}ms` }}
  />
);

// Counter animation hook with more dynamic effects
const useCountAnimation = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const startCount = 0;
    
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      const easeOutElastic = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress) * Math.sin((progress * 10 - 0.75) * (2 * Math.PI) / 3);
      setCount(Math.floor(startCount + (end - startCount) * easeOutElastic));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [end, duration, isVisible]);

  return { count, ref };
};

// Enhanced Stats Card with more animations
const StatsCard = ({ icon: Icon, title, value, suffix = '', delay = 0, color = 'blue' }: {
  icon: any;
  title: string;
  value: number;
  suffix?: string;
  delay?: number;
  color?: string;
}) => {
  const { count, ref } = useCountAnimation(value, 2000 + delay);
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      ref={ref}
      className="relative bg-white p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 animate-slideInUp overflow-hidden group cursor-pointer"
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br from-${color}-50 to-${color}-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      {/* Sparkle effects */}
      {isHovered && (
        <>
          <Sparkles className="absolute top-2 right-2 w-4 h-4 text-yellow-400 animate-pulse" />
          <Star className="absolute bottom-2 left-2 w-3 h-3 text-yellow-300 animate-spin" />
        </>
      )}
      <div className="relative z-10 flex items-center space-x-4">
        <div className={`p-4 bg-gradient-to-br from-${color}-500 to-${color}-600 rounded-2xl transform transition-all duration-300 group-hover:rotate-12 group-hover:scale-110`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
        <div>
          <p className="text-gray-600 text-sm font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900 transition-all duration-300 group-hover:text-blue-600">
            <span className="inline-block animate-bounce-subtle">{count}</span>
            <span className="text-lg">{suffix}</span>
          </p>
        </div>
      </div>
      {/* Progress bar animation */}
      <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </div>
  );
};

// Enhanced Quick Action Card with more effects
const QuickActionCard = ({ icon: Icon, title, description, color, delay = 0 }: {
  icon: any;
  title: string;
  description: string;
  color: string;
  delay?: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="relative bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:rotate-1 cursor-pointer group animate-slideInLeft overflow-hidden"
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background waves */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full animate-pulse" />
        <div className="absolute -bottom-5 -left-5 w-15 h-15 bg-gradient-to-br from-pink-200 to-yellow-200 rounded-full animate-bounce" />
      </div>
      <div className="relative z-10">
        <div className={`w-16 h-16 ${color} rounded-3xl flex items-center justify-center mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
        {/* Animated arrow */}
        <div className="mt-4 flex items-center text-blue-600 font-medium opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all duration-300">
          <span className="mr-2">Get Started</span>
          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
            <Play className="w-3 h-3 ml-0.5" />
          </div>
        </div>
      </div>
      {/* Ripple effect */}
      {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-10 animate-ping rounded-3xl" />
      )}
    </div>
  );
};

// Enhanced Activity Item with more animations
const ActivityItem = ({ title, time, delay = 0, type = 'completed' }: {
  title: string;
  time: string;
  delay?: number;
  type?: string;
}) => {
  const getTypeColor = () => {
    switch (type) {
      case 'completed': return 'bg-green-500';
      case 'mentor': return 'bg-blue-500';
      case 'video': return 'bg-purple-500';
      case 'session': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div 
      className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 cursor-pointer group animate-slideInRight transform hover:scale-105"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`w-3 h-3 ${getTypeColor()} rounded-full animate-pulse group-hover:scale-150 transition-transform duration-300`}></div>
      <div className="flex-1">
        <p className="text-gray-900 font-medium text-sm group-hover:text-blue-600 transition-colors duration-300">{title}</p>
        <p className="text-gray-500 text-xs">{time}</p>
      </div>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          <Play className="w-4 h-4 text-blue-600" />
        </div>
      </div>
    </div>
  );
};

// Dashboard Page Component
const Dashboard = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Animated cursor follower */}
      <div 
        className="fixed w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full pointer-events-none z-50 opacity-20 transition-all duration-100 ease-out"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: 'scale(1)',
        }}
      />
      {/* Background particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <Particle key={i} delay={i * 200} />
        ))}
      </div>
      {/* Enhanced Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-3xl p-10 mb-10 overflow-hidden animate-gradient">
        {/* Morphing background blobs */}
        <MorphingBlob className="w-64 h-64 bg-white -top-32 -right-32" delay={0} />
        <MorphingBlob className="w-48 h-48 bg-blue-300 -bottom-24 -left-24" delay={2000} />
        <MorphingBlob className="w-32 h-32 bg-purple-300 top-1/2 right-1/4" delay={4000} />
        {/* Floating elements with enhanced animations */}
        <div className="absolute top-8 right-12 w-24 h-24 bg-white bg-opacity-10 rounded-full animate-float"></div>
        <div className="absolute bottom-12 left-12 w-16 h-16 bg-white bg-opacity-10 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 right-1/3 w-8 h-8 bg-white bg-opacity-20 rounded-full animate-float" style={{animationDelay: '4s'}}></div>
        <Rocket className="absolute top-6 left-1/3 w-8 h-8 text-white opacity-30 animate-float" style={{animationDelay: '1s'}} />
        <Star className="absolute bottom-8 right-1/3 w-6 h-6 text-yellow-300 animate-spin" />
        <div className="relative z-10">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 animate-slideInUp">
            Welcome back! Ready to learn something 
            <span className="inline-block animate-wiggle ml-2">🚀</span>
            <br />
            <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
              amazing today?
            </span>
          </h1>
          <p className="text-blue-100 text-xl mb-8 animate-slideInUp" style={{animationDelay: '200ms'}}>
            Discover new topics that will blow your mind
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold hover:bg-blue-50 transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 shadow-lg hover:shadow-2xl animate-slideInUp animate-pulse-glow" style={{animationDelay: '400ms'}}>
            <span className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5" />
              <span>Explore Content</span>
            </span>
          </button>
        </div>
      </div>
      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <StatsCard
          icon={BookOpen}
          title="Courses Completed"
          value={24}
          delay={100}
          color="blue"
        />
        <StatsCard
          icon={Clock}
          title="Hours Learned"
          value={320}
          delay={200}
          color="green"
        />
        <StatsCard
          icon={Award}
          title="Certificates Earned"
          value={8}
          delay={300}
          color="purple"
        />
        <StatsCard
          icon={TrendingUp}
          title="Current Streak"
          value={15}
          suffix=" days"
          delay={400}
          color="orange"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Enhanced Quick Actions */}
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 animate-slideInLeft">
            Quick Actions
            <Zap className="inline-block w-8 h-8 text-yellow-500 ml-2 animate-bounce" />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <QuickActionCard
              icon={Play}
              title="Start Live Session"
              description="Begin a new live session with AI visualization and real-time feedback"
              color="bg-gradient-to-r from-blue-500 to-blue-600"
              delay={500}
            />
            <QuickActionCard
              icon={Video}
              title="Generate Video"
              description="Convert your recordings to animated content with AI magic"
              color="bg-gradient-to-r from-purple-500 to-purple-600"
              delay={600}
            />
            <QuickActionCard
              icon={MapPin}
              title="Learning Path"
              description="Continue your personalized learning journey with smart recommendations"
              color="bg-gradient-to-r from-green-500 to-green-600"
              delay={700}
            />
            <QuickActionCard
              icon={Users}
              title="Find Mentor"
              description="Connect with expert mentors in your field for personalized guidance"
              color="bg-gradient-to-r from-orange-500 to-orange-600"
              delay={800}
            />
          </div>
        </div>
        {/* Enhanced Recent Activity */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 border border-white/20">
          <h3 className="text-xl font-bold text-gray-900 mb-6 animate-slideInRight">
            Recent Activity
            <div className="inline-block w-3 h-3 bg-green-500 rounded-full ml-2 animate-pulse"></div>
          </h3>
          <div className="space-y-2">
            <ActivityItem
              title="Completed: Advanced JavaScript Concepts"
              time="2 hours ago"
              delay={900}
              type="completed"
            />
            <ActivityItem
              title="New mentor match: Prof. Sushmita Mitra"
              time="1 day ago"
              delay={1000}
              type="mentor"
            />
            <ActivityItem
              title="Generated video: Physics - Wave Properties"
              time="3 days ago"
              delay={1100}
              type="video"
            />
            <ActivityItem
              title="Live session: Mathematics Q&A"
              time="1 week ago"
              delay={1200}
              type="session"
            />
          </div>
        </div>
      </div>
      {/* Only Recommended for You is in a reduced-width container */}
      <div className="max-w-screen-md mx-auto px-2 sm:px-4 mt-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 animate-slideInLeft">
          Recommended for You
          <Star className="inline-block w-8 h-8 text-yellow-500 ml-2 animate-spin" />
        </h2>
        <div className="space-y-6">
          {[
            { title: 'Machine Learning Fundamentals', level: 'Intermediate', progress: 0, color: 'from-blue-500 to-purple-500' },
            { title: 'Data Structures & Algorithms', level: 'Advanced', progress: 25, color: 'from-green-500 to-blue-500' },
            { title: 'Web Development Bootcamp', level: 'Beginner', progress: 0, color: 'from-orange-500 to-red-500' }
          ].map((course, index) => (
            <div 
              key={course.title}
              className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 animate-slideInLeft transform hover:scale-105 hover:-translate-y-2 border border-white/20 group cursor-pointer"
              style={{ animationDelay: `${1300 + index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">{course.title}</h3>
                  <p className="text-gray-600 text-sm font-medium">{course.level}</p>
                </div>
                <button className={`w-14 h-14 bg-gradient-to-r ${course.color} rounded-2xl flex items-center justify-center hover:scale-110 hover:rotate-12 transition-all duration-300 shadow-lg`}>
                  <Play className="w-6 h-6 text-white ml-1" />
                </button>
              </div>
              {course.progress > 0 && (
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-gray-600 font-medium">Progress</span>
                    <span className="text-sm font-bold text-gray-900">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`bg-gradient-to-r ${course.color} h-3 rounded-full transition-all duration-2000 ease-out transform origin-left`}
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
