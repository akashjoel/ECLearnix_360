import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  Sparkles, 
  Zap, 
  Brain, 
  Rocket,
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  Target,
  BookOpen,
  GraduationCap,
  Shield,
  Globe,
  Palette,
  Moon,
  Sun,
  Wifi,
  Cloud,
  Database,
  Cpu,
  Layers,
  GitBranch,
  Music,
  Video,
  Mic,
  BarChart3,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Plus,
  Infinity,
  Smartphone
} from 'lucide-react';
import '../index.css';

const exampleUsers = [
  {
    email: 'akashjoel08@gmail.com',
    password: 'akashgoki05',
    user: {
      name: 'Akash Joel',
      email: 'akashjoel08@gmail.com',
      role: 'student',
      grade: '10th',
    },
  },
  {
    email: 'bob@mentor.com',
    password: 'mentor123',
    user: {
      name: 'Bob Mentor',
      email: 'bob@mentor.com',
      role: 'mentor',
      expertise: ['AI', 'Math'],
    },
  },
  {
    email: 'carol@pro.com',
    password: 'pro123',
    user: {
      name: 'Carol Professional',
      email: 'carol@pro.com',
      role: 'professional',
      company: 'TechCorp',
    },
  },
];

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particleCount, setParticleCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const particleRef = useRef<HTMLDivElement>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate loading delay
    setTimeout(() => {
      const found = exampleUsers.find(
        (u) => u.email === formData.email && u.password === formData.password
      );
      if (found) {
        login(found.user);
        navigate('/');
      } else {
        setError('Invalid login credentials');
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        
        {/* Morphing Shapes */}
        <div className="absolute top-1/3 left-1/3 w-32 h-32 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-gradient-to-r from-violet-400/30 to-purple-400/30 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/4 right-1/4 w-20 h-20 bg-gradient-to-r from-pink-400/30 to-violet-400/30 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Dynamic Particle System */}
      <div ref={particleRef} className="fixed inset-0 pointer-events-none z-10"></div>

      {/* Floating Icons */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-8 h-8 text-purple-400/30 animate-float hover:scale-150 hover:text-purple-400 cursor-pointer">
          <Brain className="w-full h-full" />
        </div>
        <div className="absolute top-40 right-32 w-6 h-6 text-pink-400/30 animate-float hover:scale-150 hover:text-pink-400 cursor-pointer" style={{ animationDelay: '1s' }}>
          <Rocket className="w-full h-full" />
        </div>
        <div className="absolute bottom-32 left-32 w-10 h-10 text-violet-400/30 animate-float hover:scale-150 hover:text-violet-400 cursor-pointer" style={{ animationDelay: '2s' }}>
          <GraduationCap className="w-full h-full" />
        </div>
        <div className="absolute bottom-20 right-20 w-8 h-8 text-indigo-400/30 animate-float hover:scale-150 hover:text-indigo-400 cursor-pointer" style={{ animationDelay: '3s' }}>
          <Sparkles className="w-full h-full" />
        </div>
        <div className="absolute top-1/2 left-10 w-6 h-6 text-purple-400/30 animate-float hover:scale-150 hover:text-purple-400 cursor-pointer" style={{ animationDelay: '0.5s' }}>
          <Zap className="w-full h-full" />
        </div>
        <div className="absolute top-1/2 right-10 w-8 h-8 text-pink-400/30 animate-float hover:scale-150 hover:text-pink-400 cursor-pointer" style={{ animationDelay: '1.5s' }}>
          <Target className="w-full h-full" />
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
        className="fixed w-3 h-3 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full pointer-events-none z-50 mix-blend-difference transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 6,
          top: mousePosition.y - 6,
          transform: `scale(${mousePosition.x > 0 ? 1 : 0})`,
          animationDelay: '0.1s'
        }}
      />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className={`max-w-md w-full transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
        }`}>
          {/* Enhanced 3D Login Card */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 transform hover:scale-[1.02] transition-all duration-500 hover:shadow-3xl hover:shadow-purple-500/20 relative overflow-hidden">
            {/* Card Background Animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-violet-500/10 animate-pulse"></div>
            
            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl transform hover:scale-110 transition-all duration-300">
                    <GraduationCap className="w-12 h-12 text-white" />
                  </div>
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent mb-2">
                  Welcome to LearnoAI
                </h1>
                <p className="text-purple-200 text-lg">Sign in to continue your learning journey</p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-500/20 backdrop-blur-sm rounded-xl border border-red-400/30 text-red-200 text-center animate-pulse">
                  {error}
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  <div className="relative flex items-center bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-4 hover:bg-white/20 transition-all duration-300 transform hover:scale-[1.02]">
                    <Mail className="w-5 h-5 text-purple-300 mr-3" />
                    <input
                      type="email"
                      placeholder="Enter your email"
                      required
                      className="flex-1 bg-transparent text-white placeholder-purple-300 outline-none"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  <div className="relative flex items-center bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-4 hover:bg-white/20 transition-all duration-300 transform hover:scale-[1.02]">
                    <Lock className="w-5 h-5 text-purple-300 mr-3" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      required
                      className="flex-1 bg-transparent text-white placeholder-purple-300 outline-none"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-purple-300 hover:text-white transition-colors duration-300"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
                    isLoading 
                      ? 'bg-purple-500/50 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl'
                  } text-white relative overflow-hidden group`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center">
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign In
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                  </div>
                </button>
              </form>

              {/* Demo Credentials */}
              <div className="mt-8 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                <h3 className="text-white font-semibold mb-3 flex items-center">
                  <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
                  Demo Credentials
                </h3>
                <div className="space-y-2 text-sm text-purple-200">
                  <div className="flex justify-between">
                    <span>Student:</span>
                    <span className="text-purple-300">akashjoel08@gmail.com / akashgoki05</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Mentor:</span>
                    <span className="text-purple-300">bob@mentor.com / mentor123</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Professional:</span>
                    <span className="text-purple-300">carol@pro.com / pro123</span>
                  </div>
                </div>
              </div>

              {/* Features Preview */}
              <div className="mt-8 grid grid-cols-3 gap-4">
                {[
                  { icon: Brain, label: 'AI Learning', color: 'from-purple-400 to-pink-400' },
                  { icon: Rocket, label: 'Fast Track', color: 'from-blue-400 to-cyan-400' },
                  { icon: Target, label: 'Personalized', color: 'from-green-400 to-emerald-400' }
                ].map((feature, index) => (
                  <div 
                    key={index}
                    className="text-center p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className={`inline-flex p-2 bg-gradient-to-r ${feature.color} rounded-lg mb-2`}>
                      <feature.icon className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-xs text-purple-200">{feature.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;