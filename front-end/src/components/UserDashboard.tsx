import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { userPreferencesService, UserProfile } from '../services/userPreferences';
import { mlPredictionService, CareerPrediction, StudentData } from '../services/mlPredictionService';
import { speechService } from '../services/speechService';
import LiveTranscript from './LiveTranscript';
import { 
  User, 
  GraduationCap, 
  Briefcase, 
  Building2, 
  BookOpen,
  Target,
  TrendingUp,
  Clock,
  Star,
  Brain,
  Code,
  Palette,
  Database,
  Globe,
  Shield,
  Zap,
  Lightbulb,
  CheckCircle,
  AlertCircle,
  Bookmark,
  Volume2,
  VolumeX,
  Play,
  Pause
} from 'lucide-react';

const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [careerPrediction, setCareerPrediction] = useState<CareerPrediction | null>(null);
  const [careerInsights, setCareerInsights] = useState<any>(null);
  const [mlLoading, setMlLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const [speechSupported, setSpeechSupported] = useState(false);

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        // Try to load from backend first, fallback to local storage
        let profile = await userPreferencesService.loadFromBackend(user?.email || '');
        
        if (!profile) {
          profile = userPreferencesService.getUserProfile();
        }

        // If no profile exists, create one from setup data
        if (!profile) {
          const setupData = userPreferencesService.getUserSetupData();
          if (setupData) {
            profile = {
              email: setupData.email,
              displayName: user?.displayName || 'User',
              role: setupData.role,
              preferences: setupData.preferences,
              careerInterests: setupData.careerInterests,
              onboardingCompleted: true,
              createdAt: setupData.completedAt,
              updatedAt: setupData.completedAt
            };
            userPreferencesService.saveUserProfile(profile);
          }
        }

        setUserProfile(profile);

        // Generate ML-based career prediction if profile exists
        if (profile) {
          await generateCareerPrediction(profile);
        }
      } catch (error) {
        console.error('Error loading user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    // Check speech synthesis support
    setSpeechSupported(speechService.isSpeechSupported());

    const generateCareerPrediction = async (profile: UserProfile) => {
      setMlLoading(true);
      try {
        // Convert user profile to student data format
        const studentData = mlPredictionService.convertUserProfileToStudentData(profile);
        
        // Get career prediction
        const prediction = await mlPredictionService.predictCareerPath(studentData);
        setCareerPrediction(prediction);
        
        // Get career insights
        const insights = await mlPredictionService.getCareerInsights(prediction.careerPath);
        setCareerInsights(insights);

        // Speak welcome message and career prediction if speech is enabled
        if (speechEnabled && speechSupported) {
          try {
            await speechService.speakWelcome(profile.displayName || 'User');
            // Small delay before speaking the full prediction
            setTimeout(async () => {
              await speechService.speakCareerPrediction({
                careerPath: prediction.careerPath,
                specialization: prediction.webDevSpecialization,
                wavelengthAnalysis: prediction.wavelengthAnalysis,
                recommendations: prediction.recommendations,
                learningPath: prediction.learningPath,
                confidence: prediction.confidence
              });
            }, 2000);
          } catch (error) {
            console.error('Error with speech synthesis:', error);
          }
        }
      } catch (error) {
        console.error('Error generating career prediction:', error);
      } finally {
        setMlLoading(false);
      }
    };

    if (user) {
      loadUserProfile();
    }
  }, [user]);

  // Speech control functions
  const handleSpeakPrediction = async () => {
    if (!careerPrediction || !speechSupported) return;
    
    setIsSpeaking(true);
    try {
      await speechService.speakCareerPrediction({
        careerPath: careerPrediction.careerPath,
        specialization: careerPrediction.webDevSpecialization,
        wavelengthAnalysis: careerPrediction.wavelengthAnalysis,
        recommendations: careerPrediction.recommendations,
        learningPath: careerPrediction.learningPath,
        confidence: careerPrediction.confidence
      });
    } catch (error) {
      console.error('Error speaking prediction:', error);
    } finally {
      setIsSpeaking(false);
    }
  };

  const handleSpeakWavelengths = async () => {
    if (!careerPrediction || !speechSupported) return;
    
    setIsSpeaking(true);
    try {
      await speechService.speakWavelengthAnalysis(careerPrediction.wavelengthAnalysis);
    } catch (error) {
      console.error('Error speaking wavelengths:', error);
    } finally {
      setIsSpeaking(false);
    }
  };

  const handleSpeakRecommendations = async () => {
    if (!careerPrediction || !speechSupported) return;
    
    setIsSpeaking(true);
    try {
      await speechService.speakRecommendations(careerPrediction.recommendations);
    } catch (error) {
      console.error('Error speaking recommendations:', error);
    } finally {
      setIsSpeaking(false);
    }
  };

  const handleStopSpeaking = () => {
    speechService.stopSpeaking();
    setIsSpeaking(false);
  };

  const toggleSpeech = () => {
    setSpeechEnabled(!speechEnabled);
    if (isSpeaking) {
      handleStopSpeaking();
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'student': return GraduationCap;
      case 'faculty': return BookOpen;
      case 'professional': return Briefcase;
      case 'institute': return Building2;
      default: return User;
    }
  };

  const getCareerIcon = (interest: string) => {
    switch (interest) {
      case 'ai-ml': return Brain;
      case 'web-dev': return Code;
      case 'data-science': return Database;
      case 'design': return Palette;
      case 'cybersecurity': return Shield;
      case 'mobile-dev': return Globe;
      case 'devops': return Zap;
      case 'game-dev': return Target;
      default: return Target;
    }
  };

  const getCareerName = (interest: string) => {
    const names: { [key: string]: string } = {
      'ai-ml': 'AI & Machine Learning',
      'web-dev': 'Web Development',
      'data-science': 'Data Science',
      'design': 'UI/UX Design',
      'cybersecurity': 'Cybersecurity',
      'mobile-dev': 'Mobile Development',
      'devops': 'DevOps & Cloud',
      'game-dev': 'Game Development'
    };
    return names[interest] || interest;
  };

  const getRecommendedCourses = () => {
    if (!userProfile) return [];

    const courseMap: { [key: string]: string[] } = {
      'ai-ml': ['Machine Learning Fundamentals', 'Deep Learning with Python', 'AI Ethics'],
      'web-dev': ['React Development', 'Full Stack Development', 'Web Design Principles'],
      'data-science': ['Data Analysis with Python', 'Statistics for Data Science', 'Data Visualization'],
      'design': ['UI/UX Design Fundamentals', 'Figma Masterclass', 'Design Systems'],
      'cybersecurity': ['Cybersecurity Fundamentals', 'Network Security', 'Ethical Hacking'],
      'mobile-dev': ['React Native Development', 'iOS Development', 'Android Development'],
      'devops': ['Docker & Kubernetes', 'AWS Cloud Services', 'CI/CD Pipelines'],
      'game-dev': ['Unity Game Development', 'Game Design Principles', '3D Modeling']
    };

    const courses: string[] = [];
    userProfile.careerInterests.forEach(interest => {
      if (courseMap[interest]) {
        courses.push(...courseMap[interest]);
      }
    });

    return courses.slice(0, 6); // Limit to 6 courses
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading your personalized dashboard...</p>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center">
        <div className="text-center bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
          <User className="w-16 h-16 text-white/50 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Profile Not Found</h2>
          <p className="text-purple-200">Please complete your profile setup.</p>
        </div>
      </div>
    );
  }

  const RoleIcon = getRoleIcon(userProfile.role);
  const recommendedCourses = getRecommendedCourses();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 p-6">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <RoleIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Welcome back, {userProfile.displayName}!</h1>
                <p className="text-purple-200 capitalize">As a {userProfile.role}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white/70 text-sm">Member since</p>
              <p className="text-white font-medium">
                {new Date(userProfile.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-sm">Courses Completed</p>
                <p className="text-3xl font-bold text-white">12</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-sm">Learning Hours</p>
                <p className="text-3xl font-bold text-white">47</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-sm">Current Streak</p>
                <p className="text-3xl font-bold text-white">7</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-sm">Achievements</p>
                <p className="text-3xl font-bold text-white">8</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* ML-Powered Career Prediction */}
        {careerPrediction && careerInsights && (
          <div className="mb-8 bg-gradient-to-r from-purple-900/20 to-pink-900/20 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">AI Career Prediction</h2>
                  <p className="text-purple-200">Based on your profile and ML analysis</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-white text-sm">Confidence</div>
                  <div className="text-2xl font-bold text-green-400">
                    {(careerPrediction.confidence * 100).toFixed(0)}%
                  </div>
                </div>
                
                {/* Speech Controls */}
                {speechSupported && (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={toggleSpeech}
                      className={`p-2 rounded-full transition-all duration-300 ${
                        speechEnabled 
                          ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' 
                          : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                      }`}
                      title={speechEnabled ? 'Speech enabled' : 'Speech disabled'}
                    >
                      {speechEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                    </button>
                    
                    {speechEnabled && (
                      <>
                        {isSpeaking ? (
                          <button
                            onClick={handleStopSpeaking}
                            className="p-2 bg-red-500/20 text-red-400 rounded-full hover:bg-red-500/30 transition-all duration-300"
                            title="Stop speaking"
                          >
                            <Pause className="w-5 h-5" />
                          </button>
                        ) : (
                          <button
                            onClick={handleSpeakPrediction}
                            className="p-2 bg-blue-500/20 text-blue-400 rounded-full hover:bg-blue-500/30 transition-all duration-300"
                            title="Listen to career prediction"
                          >
                            <Play className="w-5 h-5" />
                          </button>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Web Development Specialization */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2 text-purple-400" />
                Your Web Development Specialization
              </h3>
              <div className="text-3xl font-bold text-white mb-2">{careerPrediction.webDevSpecialization}</div>
              <div className="flex items-center space-x-4 text-purple-200">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>Overall Aptitude: {careerPrediction.wavelengthAnalysis.totalWavelength}%</span>
                </div>
              </div>
            </div>

            {/* Wavelength Analysis Visualization */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-blue-400" />
                  Web Development Wavelength Analysis
                </h3>
                
                {speechSupported && speechEnabled && (
                  <button
                    onClick={handleSpeakWavelengths}
                    disabled={isSpeaking}
                    className="p-2 bg-blue-500/20 text-blue-400 rounded-full hover:bg-blue-500/30 transition-all duration-300 disabled:opacity-50"
                    title="Listen to wavelength analysis"
                  >
                    <Play className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { key: 'frontendWavelength', label: 'Frontend', color: 'from-blue-500 to-cyan-500' },
                  { key: 'backendWavelength', label: 'Backend', color: 'from-green-500 to-emerald-500' },
                  { key: 'fullstackWavelength', label: 'Full-Stack', color: 'from-purple-500 to-violet-500' },
                  { key: 'devopsWavelength', label: 'DevOps', color: 'from-orange-500 to-red-500' },
                  { key: 'uiuxWavelength', label: 'UI/UX', color: 'from-pink-500 to-rose-500' },
                  { key: 'mobileWavelength', label: 'Mobile', color: 'from-indigo-500 to-purple-500' }
                ].map(({ key, label, color }) => {
                  const value = careerPrediction.wavelengthAnalysis[key as keyof typeof careerPrediction.wavelengthAnalysis];
                  return (
                    <div key={key} className="bg-white/5 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white text-sm font-medium">{label}</span>
                        <span className="text-white text-lg font-bold">{value}%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div 
                          className={`h-2 bg-gradient-to-r ${color} rounded-full transition-all duration-1000 ease-out`}
                          style={{ width: `${value}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Career Insights */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Lightbulb className="w-5 h-5 mr-2 text-yellow-400" />
                  Career Insights
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-purple-200">Market Growth</span>
                    <span className="text-green-400 font-semibold">{careerInsights.growth}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-purple-200">Market Demand</span>
                    <span className="text-blue-400 font-semibold">{careerInsights.demand}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-purple-200">Salary Range</span>
                    <span className="text-green-400 font-semibold">{careerInsights.salary}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-purple-200 text-sm mb-2">Top Skills Needed:</div>
                  <div className="flex flex-wrap gap-2">
                    {careerInsights.skills.slice(0, 4).map((skill: string, index: number) => (
                      <span key={index} className="px-2 py-1 bg-purple-500/30 text-white text-xs rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Specialization Details */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-400" />
                  Specialization Details
                </h3>
                {careerInsights.specializations && careerInsights.specializations[careerPrediction.webDevSpecialization] && (
                  <>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-purple-200">Specialization Demand</span>
                        <span className="text-blue-400 font-semibold">
                          {careerInsights.specializations[careerPrediction.webDevSpecialization].demand}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-purple-200">Salary Range</span>
                        <span className="text-green-400 font-semibold">
                          {careerInsights.specializations[careerPrediction.webDevSpecialization].salary}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="text-purple-200 text-sm mb-2">Key Skills:</div>
                      <div className="flex flex-wrap gap-2">
                        {careerInsights.specializations[careerPrediction.webDevSpecialization].skills.slice(0, 4).map((skill: string, index: number) => (
                          <span key={index} className="px-2 py-1 bg-blue-500/30 text-white text-xs rounded-full">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Recommendations and Learning Path */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              {/* Recommendations */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                    AI Recommendations
                  </h3>
                  
                  {speechSupported && speechEnabled && (
                    <button
                      onClick={handleSpeakRecommendations}
                      disabled={isSpeaking}
                      className="p-2 bg-green-500/20 text-green-400 rounded-full hover:bg-green-500/30 transition-all duration-300 disabled:opacity-50"
                      title="Listen to recommendations"
                    >
                      <Play className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="space-y-3">
                  {careerPrediction.recommendations.slice(0, 4).map((rec, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-purple-200 text-sm">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Learning Path */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Bookmark className="w-5 h-5 mr-2 text-blue-400" />
                  Recommended Learning Path
                </h3>
                <div className="space-y-3">
                  {careerPrediction.learningPath.slice(0, 4).map((step, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {index + 1}
                      </div>
                      <span className="text-purple-200 text-sm">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading state for ML prediction */}
        {mlLoading && (
          <div className="mb-8 bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span className="text-white text-lg">Analyzing your profile with AI...</span>
              {speechEnabled && speechSupported && (
                <div className="flex items-center space-x-2 ml-4">
                  <Volume2 className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 text-sm">AI will speak your results</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Live Transcript */}
        <div className="mb-8">
          <LiveTranscript />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Career Interests */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4">Your Career Interests</h3>
            <div className="grid grid-cols-2 gap-3">
              {userProfile.careerInterests.map((interest) => {
                const Icon = getCareerIcon(interest);
                return (
                  <div key={interest} className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                    <Icon className="w-5 h-5 text-purple-400" />
                    <span className="text-white text-sm">{getCareerName(interest)}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recommended Courses */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4">Recommended for You</h3>
            <div className="space-y-3">
              {recommendedCourses.map((course, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                  <span className="text-white">{course}</span>
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Role-specific Preferences */}
        {userProfile.preferences && Object.keys(userProfile.preferences).length > 0 && (
          <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4">Your Profile Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(userProfile.preferences).map(([key, value]) => (
                <div key={key} className="p-4 bg-white/5 rounded-lg">
                  <p className="text-purple-200 text-sm capitalize mb-1">
                    {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                  </p>
                  <p className="text-white font-medium">
                    {Array.isArray(value) ? value.join(', ') : value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
