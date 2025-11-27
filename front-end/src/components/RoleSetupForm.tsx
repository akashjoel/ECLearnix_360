import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  GraduationCap, 
  Briefcase, 
  Building2, 
  ArrowRight, 
  CheckCircle,
  Sparkles,
  Target,
  BookOpen,
  Code,
  Palette,
  Database,
  Brain,
  Globe,
  Shield,
  Zap
} from 'lucide-react';
import { userPreferencesService, UserSetupData } from '../services/userPreferences';

interface RoleSetupFormProps {
  userEmail: string;
  onComplete: (userData: UserSetupData) => void;
}

interface UserSetupData {
  role: string;
  preferences: any;
  careerInterests: string[];
}

const RoleSetupForm: React.FC<RoleSetupFormProps> = ({ userEmail, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [role, setRole] = useState('');
  const [rolePreferences, setRolePreferences] = useState<any>({});
  const [careerInterests, setCareerInterests] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const roles = [
    {
      id: 'student',
      name: 'Student',
      icon: GraduationCap,
      description: 'Currently pursuing education',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'faculty',
      name: 'Faculty',
      icon: BookOpen,
      description: 'Teaching professional',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'professional',
      name: 'Professional',
      icon: Briefcase,
      description: 'Working in industry',
      color: 'from-purple-500 to-violet-500'
    },
    {
      id: 'institute',
      name: 'Institute Member',
      icon: Building2,
      description: 'Educational institution',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const careerPaths = [
    { id: 'ai-ml', name: 'AI & Machine Learning', icon: Brain, color: 'from-purple-500 to-pink-500' },
    { id: 'web-dev', name: 'Web Development', icon: Code, color: 'from-blue-500 to-cyan-500' },
    { id: 'data-science', name: 'Data Science', icon: Database, color: 'from-green-500 to-emerald-500' },
    { id: 'design', name: 'UI/UX Design', icon: Palette, color: 'from-pink-500 to-rose-500' },
    { id: 'cybersecurity', name: 'Cybersecurity', icon: Shield, color: 'from-red-500 to-orange-500' },
    { id: 'mobile-dev', name: 'Mobile Development', icon: Globe, color: 'from-indigo-500 to-purple-500' },
    { id: 'devops', name: 'DevOps & Cloud', icon: Zap, color: 'from-yellow-500 to-orange-500' },
    { id: 'game-dev', name: 'Game Development', icon: Target, color: 'from-violet-500 to-purple-500' }
  ];

  const getRoleQuestions = (selectedRole: string) => {
    switch (selectedRole) {
      case 'student':
        return {
          educationLevel: { question: 'What is your current education level?', type: 'select', options: ['High School', 'Undergraduate', 'Graduate', 'PhD', 'Other'] },
          interests: { question: 'What are your main interests?', type: 'multiselect', options: ['Technology', 'Science', 'Business', 'Arts', 'Mathematics', 'Languages', 'History', 'Other'] },
          careerPath: { question: 'What career path interests you most?', type: 'text' }
        };
      case 'faculty':
        return {
          subjectExpertise: { question: 'What subjects do you teach?', type: 'multiselect', options: ['Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Engineering', 'Business', 'Other'] },
          teachingLevel: { question: 'What level do you teach?', type: 'select', options: ['Primary', 'Secondary', 'Undergraduate', 'Graduate', 'Professional Development'] },
          experience: { question: 'Years of teaching experience?', type: 'select', options: ['0-2 years', '3-5 years', '6-10 years', '10+ years'] }
        };
      case 'professional':
        return {
          jobRole: { question: 'What is your current job role?', type: 'text' },
          industry: { question: 'Which industry do you work in?', type: 'select', options: ['Technology', 'Healthcare', 'Finance', 'Education', 'Manufacturing', 'Retail', 'Government', 'Other'] },
          experience: { question: 'Years of professional experience?', type: 'select', options: ['0-2 years', '3-5 years', '6-10 years', '10+ years'] }
        };
      case 'institute':
        return {
          institutionType: { question: 'What type of institution?', type: 'select', options: ['University', 'College', 'School', 'Training Center', 'Research Institute', 'Other'] },
          domainFocus: { question: 'What is your domain focus?', type: 'multiselect', options: ['STEM', 'Business', 'Arts', 'Medicine', 'Law', 'Engineering', 'Other'] },
          studentCount: { question: 'Approximate number of students?', type: 'select', options: ['<100', '100-500', '500-1000', '1000-5000', '5000+'] }
        };
      default:
        return {};
    }
  };

  const handleRoleSelection = (selectedRole: string) => {
    setRole(selectedRole);
    setCurrentStep(2);
  };

  const handleRolePreferences = (key: string, value: any) => {
    setRolePreferences(prev => ({ ...prev, [key]: value }));
  };

  const handleCareerInterestToggle = (interestId: string) => {
    setCareerInterests(prev => 
      prev.includes(interestId) 
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    );
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    try {
      const userData: UserSetupData = {
        role,
        preferences: rolePreferences,
        careerInterests,
        email: userEmail,
        completedAt: new Date().toISOString()
      };

      // Save to user preferences service
      userPreferencesService.saveUserSetupData(userData);
      
      // Try to save to backend (optional)
      await userPreferencesService.saveToBackend(userData);
      
      onComplete(userData);
    } catch (error) {
      console.error('Error saving user setup data:', error);
      // Still complete the flow even if backend save fails
      onComplete({
        role,
        preferences: rolePreferences,
        careerInterests,
        email: userEmail,
        completedAt: new Date().toISOString()
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-8">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Let's get to know you!</h2>
        <p className="text-purple-200">Choose your role to personalize your learning experience</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {roles.map((roleItem) => {
          const Icon = roleItem.icon;
          return (
            <button
              key={roleItem.id}
              onClick={() => handleRoleSelection(roleItem.id)}
              className="group p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20"
            >
              <div className={`inline-flex p-3 bg-gradient-to-r ${roleItem.color} rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{roleItem.name}</h3>
              <p className="text-purple-200 text-sm">{roleItem.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderStep2 = () => {
    const questions = getRoleQuestions(role);
    
    return (
      <div className="space-y-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Tell us more about yourself</h2>
          <p className="text-purple-200">Help us customize your learning journey</p>
        </div>

        <div className="space-y-6">
          {Object.entries(questions).map(([key, question]: [string, any]) => (
            <div key={key} className="space-y-3">
              <label className="block text-white font-medium">{question.question}</label>
              
              {question.type === 'select' && (
                <select
                  value={rolePreferences[key] || ''}
                  onChange={(e) => handleRolePreferences(key, e.target.value)}
                  className="w-full p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-white focus:outline-none focus:border-purple-400"
                >
                  <option value="">Select an option</option>
                  {question.options.map((option: string) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              )}

              {question.type === 'multiselect' && (
                <div className="grid grid-cols-2 gap-2">
                  {question.options.map((option: string) => (
                    <label key={option} className="flex items-center space-x-2 p-2 bg-white/5 rounded-lg hover:bg-white/10 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rolePreferences[key]?.includes(option) || false}
                        onChange={(e) => {
                          const current = rolePreferences[key] || [];
                          const updated = e.target.checked 
                            ? [...current, option]
                            : current.filter((item: string) => item !== option);
                          handleRolePreferences(key, updated);
                        }}
                        className="text-purple-500 focus:ring-purple-400"
                      />
                      <span className="text-white text-sm">{option}</span>
                    </label>
                  ))}
                </div>
              )}

              {question.type === 'text' && (
                <input
                  type="text"
                  value={rolePreferences[key] || ''}
                  onChange={(e) => handleRolePreferences(key, e.target.value)}
                  placeholder="Enter your answer"
                  className="w-full p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-white placeholder-purple-300 focus:outline-none focus:border-purple-400"
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setCurrentStep(1)}
            className="flex-1 py-3 px-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-white font-medium hover:bg-white/20 transition-all duration-300"
          >
            Back
          </button>
          <button
            onClick={() => setCurrentStep(3)}
            disabled={Object.values(rolePreferences).some(value => !value || (Array.isArray(value) && value.length === 0))}
            className="flex-1 py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </div>
      </div>
    );
  };

  const renderStep3 = () => (
    <div className="space-y-8">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Target className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Choose your interests</h2>
        <p className="text-purple-200">Select career paths you're most interested in</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {careerPaths.map((path) => {
          const Icon = path.icon;
          const isSelected = careerInterests.includes(path.id);
          
          return (
            <button
              key={path.id}
              onClick={() => handleCareerInterestToggle(path.id)}
              className={`group p-4 rounded-2xl border transition-all duration-300 transform hover:scale-105 ${
                isSelected
                  ? 'bg-white/20 border-white/40 shadow-lg shadow-purple-500/20'
                  : 'bg-white/10 border-white/20 hover:border-white/40'
              }`}
            >
              <div className={`inline-flex p-2 bg-gradient-to-r ${path.color} rounded-lg mb-3 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-white text-sm font-medium text-center">{path.name}</p>
              {isSelected && (
                <CheckCircle className="w-4 h-4 text-green-400 mx-auto mt-2" />
              )}
            </button>
          );
        })}
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => setCurrentStep(2)}
          className="flex-1 py-3 px-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-white font-medium hover:bg-white/20 transition-all duration-300"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={careerInterests.length === 0 || isLoading}
          className="flex-1 py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
              Setting up...
            </>
          ) : (
            <>
              Complete Setup
              <ArrowRight className="ml-2 w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center p-4">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        {/* Progress Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-2">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step <= currentStep
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'bg-white/20 text-white/50'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-8 h-0.5 mx-2 ${
                    step < currentStep ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-white/20'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
        </div>
      </div>
    </div>
  );
};

export default RoleSetupForm;
