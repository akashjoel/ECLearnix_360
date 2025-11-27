import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import CreateAccountPage from './CreateAccountPage';
import OnboardingFlow from './OnboardingFlow';
import { userPreferencesService } from '../services/userPreferences';
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Loader2,
  LogIn,
  UserPlus,
  ArrowLeft,
  Sparkles,
  Zap,
  Brain,
  Rocket,
  Target,
  GraduationCap,
  Github
} from 'lucide-react';

type PageState = 'login' | 'signup' | 'onboarding';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, signIn, signUp } = useAuth();
  
  // Page state management
  const [currentPage, setCurrentPage] = useState<PageState>('login');
  const [onboardingData, setOnboardingData] = useState<{
    email: string;
    name: string;
  } | null>(null);

  // Login form state
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      console.log('User authenticated:', user.email);
      console.log('Has completed onboarding:', userPreferencesService.hasCompletedOnboarding());
      
      // For new users, always start onboarding
      if (userPreferencesService.hasCompletedOnboarding()) {
        console.log('Redirecting to dashboard');
        navigate('/dashboard');
      } else {
        console.log('User needs onboarding - starting automatically');
        // Always start onboarding for authenticated users who haven't completed it
        setCurrentPage('onboarding');
        setOnboardingData({
          email: user.email || '',
          name: user.displayName || 'User'
        });
      }
    }
  }, [user, navigate]);

  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoginLoading(true);
    setLoginError('');

    try {
      await signIn(loginForm.email, loginForm.password);
      // Navigation will be handled by useEffect
    } catch (error: any) {
      console.error('Login error:', error);
      setLoginError(error.message || 'Login failed. Please try again.');
    } finally {
      setIsLoginLoading(false);
    }
  };

  // Handle signup completion
  const handleSignupComplete = (email: string, name: string) => {
    console.log('Signup completed, starting onboarding for:', email, name);
    setOnboardingData({ email, name });
    setCurrentPage('onboarding');
  };

  // Handle onboarding completion
  const handleOnboardingComplete = (data: any) => {
    console.log('Onboarding completed:', data);
    
    // Save onboarding data
    userPreferencesService.saveUserSetupData(data);
    userPreferencesService.completeOnboarding();
    
    // Navigate to dashboard
    navigate('/dashboard');
  };

  // Handle back navigation
  const handleBack = () => {
    if (currentPage === 'onboarding') {
      setCurrentPage('signup');
      setOnboardingData(null);
    } else if (currentPage === 'signup') {
      setCurrentPage('login');
    }
  };

  // Render different pages
  if (currentPage === 'signup') {
    return (
      <CreateAccountPage
        onStartOnboarding={handleSignupComplete}
        onBack={handleBack}
      />
    );
  }

  if (currentPage === 'onboarding' && onboardingData) {
    return (
      <OnboardingFlow
        userEmail={onboardingData.email}
        userName={onboardingData.name}
        onComplete={handleOnboardingComplete}
        onBack={handleBack}
      />
    );
  }

  // Default login page
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <LogIn className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-white/70">Sign in to continue your learning journey</p>
          </div>

          {/* Features */}
          <div className="mb-8 space-y-3">
            <div className="flex items-center space-x-3 text-white/70">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span className="text-sm">AI-Powered Career Guidance</span>
            </div>
            <div className="flex items-center space-x-3 text-white/70">
              <Brain className="w-5 h-5 text-blue-400" />
              <span className="text-sm">Personalized Learning Paths</span>
            </div>
            <div className="flex items-center space-x-3 text-white/70">
              <Target className="w-5 h-5 text-green-400" />
              <span className="text-sm">Wavelength Analysis</span>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-white font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-white font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={loginForm.password}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/70"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {loginError && (
              <div className="flex items-center space-x-2 p-4 bg-red-500/20 border border-red-500/30 rounded-xl">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <p className="text-red-400 text-sm">{loginError}</p>
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoginLoading}
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              {isLoginLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-white/20"></div>
            <span className="px-4 text-white/50 text-sm">or</span>
            <div className="flex-1 border-t border-white/20"></div>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3">
            <button className="w-full py-3 bg-white/10 border border-white/20 text-white rounded-xl font-medium hover:bg-white/20 transition-all duration-300 flex items-center justify-center space-x-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Continue with Google</span>
            </button>

            <button className="w-full py-3 bg-white/10 border border-white/20 text-white rounded-xl font-medium hover:bg-white/20 transition-all duration-300 flex items-center justify-center space-x-2">
              <Github className="w-5 h-5" />
              <span>Continue with GitHub</span>
            </button>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-white/70 text-sm mb-4">
              Don't have an account?{' '}
              <button
                onClick={() => setCurrentPage('signup')}
                className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
              >
                Create Account
              </button>
            </p>
            
            {/* Debug: Manual onboarding trigger for authenticated users */}
            {user && !userPreferencesService.hasCompletedOnboarding() && (
              <div className="mt-4 p-3 bg-yellow-500/20 border border-yellow-500/30 rounded-xl">
                <p className="text-yellow-400 text-sm mb-2">
                  Account created! Complete your profile setup:
                </p>
                <button
                  onClick={() => {
                    setCurrentPage('onboarding');
                    setOnboardingData({
                      email: user.email || '',
                      name: user.displayName || 'User'
                    });
                  }}
                  className="px-4 py-2 bg-yellow-500/20 text-yellow-400 rounded-lg hover:bg-yellow-500/30 transition-colors text-sm"
                >
                  Start Onboarding
                </button>
              </div>
            )}
            
            <button className="text-white/50 hover:text-white/70 text-sm transition-colors">
              Forgot your password?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
