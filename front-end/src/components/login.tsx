import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  Sparkles, 
  Zap, 
  Brain, 
  Rocket,
  ArrowRight,
  Target,
  GraduationCap,
  UserPlus,
  Github
} from 'lucide-react';
import { 
  signInWithEmail, 
  signInWithGoogle, 
  signInWithMicrosoft, 
  signInWithGithub,
  signUpWithEmail,
  resetPassword
} from '../firebase/auth';
import RoleSetupForm from './RoleSetupForm';
import { userPreferencesService } from '../services/userPreferences';
import '../index.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showRoleSetup, setShowRoleSetup] = useState(false);
  const [signupEmail, setSignupEmail] = useState('');
  const particleRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      // Check if user has completed onboarding and redirect to dashboard
      if (userPreferencesService.hasCompletedOnboarding()) {
        navigate('/dashboard');
      } else {
        navigate('/');
      }
    }
  }, [user, navigate]);

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
    }, 300);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isSignUp) {
        if (!displayName.trim()) {
          throw new Error('Display name is required');
        }
        await signUpWithEmail(formData.email, formData.password, displayName);
        // Show role setup form after successful signup
        console.log('Signup successful, showing role setup form');
        setSignupEmail(formData.email);
        setShowRoleSetup(true);
      } else {
        await signInWithEmail(formData.email, formData.password);
        // Always redirect to dashboard after login
        navigate('/dashboard');
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'microsoft' | 'github') => {
    setError('');
    setIsLoading(true);

    try {
      switch (provider) {
        case 'google':
          await signInWithGoogle();
          break;
        case 'microsoft':
          await signInWithMicrosoft();
          break;
        case 'github':
          await signInWithGithub();
          break;
      }
      navigate('/');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!formData.email) {
      setError('Please enter your email address first');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      await resetPassword(formData.email);
      setError('Password reset email sent! Check your inbox.');
      setShowForgotPassword(false);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleSetupComplete = (userData: any) => {
    console.log('Role setup completed with data:', userData);
    
    // Create complete user profile
    const userProfile = {
      email: userData.email,
      displayName: displayName,
      role: userData.role,
      preferences: userData.preferences,
      careerInterests: userData.careerInterests,
      onboardingCompleted: true,
      createdAt: userData.completedAt,
      updatedAt: userData.completedAt
    };

    // Save user profile
    userPreferencesService.saveUserProfile(userProfile);
    userPreferencesService.completeOnboarding();
    console.log('User profile saved, redirecting to dashboard');

    // Reset form
    setShowRoleSetup(false);
    setError('');
    setIsSignUp(false);
    setFormData({ email: '', password: '' });
    setDisplayName('');
    
    // Directly redirect to dashboard since user is already authenticated
    navigate('/dashboard');
  };

  // Show role setup form if signup is successful
  if (showRoleSetup) {
    return (
      <RoleSetupForm 
        userEmail={signupEmail}
        onComplete={handleRoleSetupComplete}
      />
    );
  }

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
                  Welcome to Learno AI
                </h1>
                <p className="text-purple-200 text-lg">
                  {isSignUp ? 'Create your account to start learning' : 'Sign in to continue your learning journey'}
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-500/20 backdrop-blur-sm rounded-xl border border-red-400/30 text-red-200 text-center animate-pulse">
                  {error}
                </div>
              )}

              {/* Login/Signup Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Display Name Field (Sign Up Only) */}
                {isSignUp && (
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                    <div className="relative flex items-center bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-4 hover:bg-white/20 transition-all duration-300 transform hover:scale-[1.02]">
                      <UserPlus className="w-5 h-5 text-purple-300 mr-3" />
                      <input
                        type="text"
                        placeholder="Enter your full name"
                        required
                        className="flex-1 bg-transparent text-white placeholder-purple-300 outline-none"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                      />
                    </div>
                  </div>
                )}

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

                {/* Forgot Password Link */}
                {!isSignUp && (
                  <div className="text-right">
                    <button
                      type="button"
                      onClick={() => setShowForgotPassword(!showForgotPassword)}
                      className="text-sm text-purple-300 hover:text-white transition-colors"
                    >
                      Forgot your password?
                    </button>
                  </div>
                )}

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
                        {isSignUp ? 'Creating account...' : 'Signing in...'}
                      </>
                    ) : (
                      <>
                        {isSignUp ? 'Create Account' : 'Sign In'}
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                  </div>
                </button>
              </form>

              {/* Toggle Sign Up/Login */}
              <div className="mt-6 text-center">
                <span className="text-sm text-gray-400">
                  {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setError('');
                    setShowForgotPassword(false);
                  }}
                  className="text-sm text-purple-400 hover:text-purple-300 transition-colors font-medium"
                >
                  {isSignUp ? 'Sign in' : 'Sign up'}
                </button>
              </div>

              {/* Social Sign-In Options */}
              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/20"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-purple-200">Or continue with</span>
                  </div>
                </div>
                
                <div className="mt-6 space-y-3">
                  {/* Google Sign-In */}
                  <button
                    type="button"
                    onClick={() => handleSocialLogin('google')}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-white font-medium hover:bg-white/20 transition-all duration-300 transform hover:scale-105 group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center p-0.5">
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                    </div>
                    <span>Continue with Google</span>
                  </button>

                  {/* Microsoft Sign-In */}
                  <button
                    type="button"
                    onClick={() => handleSocialLogin('microsoft')}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-white font-medium hover:bg-white/20 transition-all duration-300 transform hover:scale-105 group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="w-6 h-6 bg-white rounded flex items-center justify-center p-0.5">
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path fill="#F25022" d="M1 1h10v10H1z"/>
                        <path fill="#7FBA00" d="M13 1h10v10H13z"/>
                        <path fill="#00A4EF" d="M1 13h10v10H1z"/>
                        <path fill="#FFB900" d="M13 13h10v10H13z"/>
                      </svg>
                    </div>
                    <span>Continue with Microsoft</span>
                  </button>

                  {/* GitHub Sign-In */}
                  <button
                    type="button"
                    onClick={() => handleSocialLogin('github')}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-white font-medium hover:bg-white/20 transition-all duration-300 transform hover:scale-105 group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Github className="w-6 h-6" />
                    <span>Continue with GitHub</span>
                  </button>
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