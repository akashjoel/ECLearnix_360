import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Brain, 
  Video, 
  Users, 
  Award, 
  Zap, 
  BookOpen,
  ArrowRight,
  Play,
  CheckCircle,
  Star,
  Sparkles,
  Rocket,
  Globe
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'Live AI Visualizer',
      description: 'Convert mentor speech into real-time educational diagrams during live classes',
      color: 'from-blue-500 to-blue-600',
      delay: '0s'
    },
    {
      icon: <Video className="w-8 h-8" />,
      title: 'AI Video Generator',
      description: 'Transform recorded sessions into animated explainer videos automatically',
      color: 'from-purple-500 to-purple-600',
      delay: '0.1s'
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Personalized Learning',
      description: 'AI-powered content recommendations based on your learning style and goals',
      color: 'from-green-500 to-green-600',
      delay: '0.2s'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Smart Mentoring',
      description: 'Intelligent mentor-mentee matching for projects and career guidance',
      color: 'from-orange-500 to-orange-600',
      delay: '0.3s'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Microlearning',
      description: 'Bite-sized skill modules perfect for busy professionals',
      color: 'from-teal-500 to-teal-600',
      delay: '0.4s'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Certifications',
      description: 'Track progress and earn recognized certificates for completed courses',
      color: 'from-indigo-500 to-indigo-600',
      delay: '0.5s'
    }
  ];

  const userTypes = [
    { name: 'Class 1-12 Students', count: '50K+', icon: '🎒', color: 'from-pink-400 to-rose-400' },
    { name: 'College Students', count: '25K+', icon: '🎓', color: 'from-blue-400 to-indigo-400' },
    { name: 'Faculty Members', count: '5K+', icon: '👨‍🏫', color: 'from-green-400 to-emerald-400' },
    { name: 'Professionals', count: '30K+', icon: '💼', color: 'from-purple-400 to-violet-400' },
  ];

  React.useEffect(() => {
    // Add floating animation keyframes
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        33% { transform: translateY(-10px) rotate(1deg); }
        66% { transform: translateY(5px) rotate(-1deg); }
      }
      @keyframes glow {
        0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
        50% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.5); }
      }
      @keyframes sparkle {
        0%, 100% { opacity: 0; transform: scale(0); }
        50% { opacity: 1; transform: scale(1); }
      }
      .float-animation { animation: float 6s ease-in-out infinite; }
      .glow-animation { animation: glow 3s ease-in-out infinite; }
      .sparkle-animation { animation: sparkle 2s ease-in-out infinite; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section with 3D Anime Spline Viewer */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl float-animation"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl float-animation" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl float-animation" style={{ animationDelay: '4s' }}></div>
        </div>

        {/* 3D Spline Viewer Background */}
        <div className="absolute inset-0 z-0">
          <div 
            dangerouslySetInnerHTML={{
              __html: `
                <script type="module" src="https://unpkg.com/@splinetool/viewer@1.10.33/build/spline-viewer.js"></script>
                <spline-viewer 
                  url="https://prod.spline.design/HSnL8rhRJTdwkcia/scene.splinecode"
                  style="width: 100%; height: 100%; background: transparent; opacity: 0.8;"
                ></spline-viewer>
              `
            }}
          />
        </div>
        
        {/* Floating Sparkles */}
        <div className="absolute inset-0 z-5">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full sparkle-animation"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        
        {/* Enhanced Overlay Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 md:p-12 border border-white/10 glow-animation shadow-2xl">
            {/* Animated Title */}
            <div className="mb-8">
              <div className="flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-yellow-400 mr-3 sparkle-animation" />
                <span className="text-yellow-400 font-medium text-lg">Welcome to the Future of Learning</span>
                <Sparkles className="w-8 h-8 text-yellow-400 ml-3 sparkle-animation" style={{ animationDelay: '1s' }} />
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
                <span className="inline-block float-animation">ECLearnix</span>
                <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent float-animation" style={{ animationDelay: '0.5s' }}>
                  360°
                </span>
              </h1>
            </div>
            
            <div className="mb-8">
              <p className="text-2xl md:text-3xl text-transparent bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text mb-6 leading-relaxed font-semibold">
                AI-Powered Learning Ecosystem for Every Learner
              </p>
              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
                From Class 1-12 students to lifelong learners, experience education like never before with 
                <span className="text-cyan-400 font-semibold"> real-time AI visualization</span>, 
                <span className="text-purple-400 font-semibold"> personalized learning paths</span>, and 
                <span className="text-pink-400 font-semibold"> smart mentoring systems</span>.
              </p>
            </div>
            
            {/* Enhanced Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="group bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center glow-animation"
                >
                  <Rocket className="mr-3 w-6 h-6 group-hover:animate-bounce" />
                  Go to Dashboard
                  <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="group bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center glow-animation"
                >
                  <Rocket className="mr-3 w-6 h-6 group-hover:animate-bounce" />
                  Start Learning Journey
                  <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </Link>
              )}
              <button className="group bg-white/10 backdrop-blur-md text-white px-10 py-5 rounded-2xl font-bold text-xl border-2 border-white/20 hover:bg-white/20 hover:border-white/40 hover:scale-105 transition-all duration-300 flex items-center justify-center">
                <Play className="mr-3 w-6 h-6 group-hover:scale-125 transition-transform" />
                Watch Demo
                <Globe className="ml-3 w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
              </button>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center justify-center space-x-2 text-cyan-300">
                <Brain className="w-5 h-5" />
                <span>Real-time AI Visualization</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-purple-300">
                <Video className="w-5 h-5" />
                <span>Animated Video Generation</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-pink-300">
                <Users className="w-5 h-5" />
                <span>Smart Mentor Matching</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-slate-50 via-blue-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by Learners Worldwide
            </h2>
            <p className="text-xl text-gray-600">
              Join our growing community of students, educators, and professionals
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {userTypes.map((type, index) => (
              <div key={index} className="text-center group">
                <div className={`mx-auto w-20 h-20 rounded-2xl bg-gradient-to-r ${type.color} flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  {type.icon}
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{type.count}</div>
                <div className="text-sm font-medium text-gray-600">{type.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-purple-500 mr-3" />
              <h2 className="text-5xl font-bold text-gray-900">
                Powered by Advanced AI Technology
              </h2>
              <Sparkles className="w-8 h-8 text-purple-500 ml-3" />
            </div>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
              Experience the future of education with our cutting-edge features designed for every type of learner
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-gray-100 relative overflow-hidden"
                style={{ animationDelay: feature.delay }}
              >
                {/* Animated background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {feature.description}
                </p>
                
                {/* Hover effect arrow */}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight className="w-6 h-6 text-purple-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Integration Section */}
      <section className="py-24 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl float-animation"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl float-animation" style={{ animationDelay: '3s' }}></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">
              Seamlessly Integrated
            </h2>
            <p className="text-2xl text-gray-300">
              Works with your favorite tools and platforms
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {['Firebase', 'GitHub', 'LinkedIn', 'Canva API', 'OpenAI', 'Whisper', 'Canvas LMS', 'Moodle'].map((tool, index) => (
              <div key={index} className="group text-center p-8 bg-white/5 backdrop-blur-sm rounded-2xl hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20">
                <div className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {tool}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        {/* Floating elements */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-4 h-4 bg-white/20 rounded-full float-animation"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${4 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold text-white mb-12">
            Why Choose ECLearnix 360°?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
            {[
              {
                icon: <CheckCircle className="w-8 h-8" />,
                title: 'Cost-Effective',
                description: 'Built with open-source tools to keep costs low while maintaining quality',
                color: 'from-green-400 to-emerald-400'
              },
              {
                icon: <Star className="w-8 h-8" />,
                title: 'Scalable Architecture',
                description: 'Cloud-based infrastructure that grows with your learning needs',
                color: 'from-yellow-400 to-orange-400'
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: 'Real-Time AI',
                description: 'Instant feedback and visualization powered by advanced AI models',
                color: 'from-cyan-400 to-blue-400'
              }
            ].map((benefit, index) => (
              <div key={index} className="group text-white text-center">
                <div className={`mx-auto w-20 h-20 rounded-2xl bg-gradient-to-r ${benefit.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-2xl`}>
                  {benefit.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{benefit.title}</h3>
                <p className="text-blue-100 text-lg leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl float-animation"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl float-animation" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-6xl font-bold text-white mb-8">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-2xl text-gray-300 mb-12 leading-relaxed">
            Join thousands of learners already experiencing the future of education
          </p>
          
          {!isAuthenticated && (
            <div className="space-y-6">
              <Link
                to="/login"
                className="group bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-12 py-6 rounded-2xl font-bold text-2xl hover:shadow-2xl hover:scale-110 transition-all duration-300 inline-flex items-center glow-animation"
              >
                <Rocket className="mr-4 w-8 h-8 group-hover:animate-bounce" />
                Get Started Free
                <ArrowRight className="ml-4 w-8 h-8 group-hover:translate-x-2 transition-transform" />
              </Link>
              <p className="text-gray-400 text-lg">No credit card required • Free forever plan available</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;