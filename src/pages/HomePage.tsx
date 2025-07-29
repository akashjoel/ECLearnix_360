import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Custom3DModel from '../components/Custom3DModel';
import Custom3DLaptop from '../components/Custom3DLaptop';
import { 
  Sparkles, 
  Rocket, 
  ArrowRight, 
  CheckCircle, 
  Star, 
  Zap,
  Users,
  Globe,
  Target,
  Code,
  Brain,
  Video,
  BookOpen,
  Award
} from 'lucide-react';

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applySubmitted, setApplySubmitted] = useState(false);
  const [applyForm, setApplyForm] = useState({ name: '', email: '', reason: '' });

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApplySubmitted(true);
    setTimeout(() => {
      setShowApplyModal(false);
      setApplySubmitted(false);
      setApplyForm({ name: '', email: '', reason: '' });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Apply Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl transform transition-all duration-500 scale-100">
            {!applySubmitted ? (
              <>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Apply for Internship</h3>
                <form onSubmit={handleApplySubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      value={applyForm.name}
                      onChange={(e) => setApplyForm({ ...applyForm, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      value={applyForm.email}
                      onChange={(e) => setApplyForm({ ...applyForm, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Why do you want to join?</label>
                    <textarea
                      required
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      value={applyForm.reason}
                      onChange={(e) => setApplyForm({ ...applyForm, reason: e.target.value })}
                    />
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                    >
                      Submit Application
                    </button>
                    <button
                      type="button"
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                      onClick={() => { setShowApplyModal(false); setApplyForm({ name: '', email: '', reason: '' }); }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Application Submitted!</h3>
                <p className="text-gray-600">We'll get back to you within 24 hours.</p>
              </div>
            )}
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              onClick={() => { setShowApplyModal(false); setApplySubmitted(false); setApplyForm({ name: '', email: '', reason: '' }); }}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {/* Enhanced Hero Section with Custom 3D Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Custom 3D Background */}
        <div className="absolute inset-0 opacity-40">
          <Custom3DModel />
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl float-animation"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl float-animation" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl float-animation" style={{ animationDelay: '4s' }}></div>
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
                <span className="inline-block float-animation">LearnoAI</span>
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
                  Go To Dashboard
                  <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </Link>
              ) : (
                <Link
                  to="/login"
                  onClick={() => console.log('Login button clicked, navigating to /login')}
                  className="group bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center glow-animation"
                >
                  <Rocket className="mr-3 w-6 h-6 group-hover:animate-bounce" />
                  Go To Login Page
                  <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </Link>
              )}
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {[
                { number: '10K+', label: 'Active Students', icon: <Users className="w-6 h-6" /> },
                { number: '95%', label: 'Success Rate', icon: <Star className="w-6 h-6" /> },
                { number: '50+', label: 'Learning Paths', icon: <Target className="w-6 h-6" /> },
                { number: '24/7', label: 'AI Support', icon: <Zap className="w-6 h-6" /> }
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="inline-flex p-3 bg-white/10 rounded-xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Custom 3D Laptop */}
        <div className="absolute bottom-10 right-10 w-80 h-60 opacity-80 hidden lg:block">
          <Custom3DLaptop />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-br from-slate-800 via-purple-900 to-slate-800 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold text-white mb-12">
            Why Choose LearnoAI?
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