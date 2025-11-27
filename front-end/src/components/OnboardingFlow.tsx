import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  GraduationCap, 
  Briefcase, 
  Building2, 
  BookOpen,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Star,
  Target,
  Lightbulb,
  Code,
  Shield,
  Cloud,
  Palette,
  Wrench,
  Megaphone,
  Plus
} from 'lucide-react';

interface OnboardingData {
  userType: string;
  userTypeDetails: any;
  careerInterests: string[];
  customCareerInterest?: string;
  learningStyle: string;
  skillLevel: string;
  professionalGoals: string[];
  completedAt: string;
}

interface OnboardingFlowProps {
  userEmail: string;
  userName: string;
  onComplete: (data: OnboardingData) => void;
  onBack: () => void;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ 
  userEmail, 
  userName, 
  onComplete, 
  onBack 
}) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingData>({
    userType: '',
    userTypeDetails: {},
    careerInterests: [],
    learningStyle: '',
    skillLevel: '',
    professionalGoals: [],
    completedAt: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const totalSteps = 5;

  // User type options
  const userTypes = [
    {
      id: 'student',
      label: 'Student',
      icon: GraduationCap,
      description: 'Currently pursuing education',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'faculty',
      label: 'Faculty',
      icon: BookOpen,
      description: 'Teaching or academic professional',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'professional',
      label: 'Professional',
      icon: Briefcase,
      description: 'Working in industry',
      color: 'from-purple-500 to-violet-500'
    },
    {
      id: 'institute',
      label: 'Institute Member',
      icon: Building2,
      description: 'Representing an institution',
      color: 'from-orange-500 to-red-500'
    }
  ];

  // Career interest options
  const careerOptions = [
    { id: 'ai-ml', label: 'AI & Machine Learning', icon: Target },
    { id: 'data-science', label: 'Data Science', icon: Target },
    { id: 'web-development', label: 'Web Development', icon: Code },
    { id: 'cybersecurity', label: 'Cybersecurity', icon: Shield },
    { id: 'cloud-computing', label: 'Cloud Computing', icon: Cloud },
    { id: 'ui-ux', label: 'UI/UX Design', icon: Palette },
    { id: 'software-engineering', label: 'Software Engineering', icon: Wrench },
    { id: 'digital-marketing', label: 'Digital Marketing', icon: Megaphone }
  ];

  // Learning style options
  const learningStyles = [
    { id: 'visual', label: 'Visual Learning', description: 'Learn through diagrams, charts, and visual aids' },
    { id: 'auditory', label: 'Auditory Learning', description: 'Learn through listening and discussions' },
    { id: 'kinesthetic', label: 'Hands-on Learning', description: 'Learn through practice and experimentation' },
    { id: 'reading', label: 'Reading/Writing', description: 'Learn through text and written materials' }
  ];

  // Skill level options
  const skillLevels = [
    { id: 'beginner', label: 'Beginner', description: 'New to the field' },
    { id: 'intermediate', label: 'Intermediate', description: 'Some experience' },
    { id: 'advanced', label: 'Advanced', description: 'Experienced professional' },
    { id: 'expert', label: 'Expert', description: 'Industry expert' }
  ];

  // Professional goals
  const professionalGoals = [
    'Career advancement',
    'Skill development',
    'Industry transition',
    'Entrepreneurship',
    'Research & innovation',
    'Leadership development',
    'Networking',
    'Certification'
  ];

  // Get user type specific questions
  const getUserTypeQuestions = (userType: string) => {
    switch (userType) {
      case 'student':
        return [
          {
            id: 'educationLevel',
            label: 'Current Education Level',
            type: 'select',
            options: [
              'High School',
              'Undergraduate',
              'Graduate',
              'PhD',
              'Other'
            ]
          },
          {
            id: 'areaOfStudy',
            label: 'Area of Study',
            type: 'text',
            placeholder: 'e.g., Computer Science, Engineering, Business'
          },
          {
            id: 'careerPathInterest',
            label: 'Primary Career Interest',
            type: 'select',
            options: [
              'Technology',
              'Business',
              'Research',
              'Creative',
              'Healthcare',
              'Other'
            ]
          }
        ];
      case 'faculty':
        return [
          {
            id: 'subjectSpecialization',
            label: 'Subject Specialization',
            type: 'text',
            placeholder: 'e.g., Computer Science, Mathematics, Engineering'
          },
          {
            id: 'teachingLevel',
            label: 'Teaching Level',
            type: 'select',
            options: [
              'Undergraduate',
              'Graduate',
              'PhD',
              'Professional Development',
              'All Levels'
            ]
          },
          {
            id: 'researchInterest',
            label: 'Research/Mentorship Interest',
            type: 'select',
            options: [
              'Academic Research',
              'Industry Collaboration',
              'Student Mentorship',
              'Curriculum Development',
              'All of the above'
            ]
          }
        ];
      case 'professional':
        return [
          {
            id: 'currentRole',
            label: 'Current Role',
            type: 'text',
            placeholder: 'e.g., Software Developer, Data Analyst, Product Manager'
          },
          {
            id: 'industry',
            label: 'Industry',
            type: 'select',
            options: [
              'Technology',
              'Finance',
              'Healthcare',
              'Education',
              'Manufacturing',
              'Retail',
              'Other'
            ]
          },
          {
            id: 'experienceYears',
            label: 'Years of Experience',
            type: 'select',
            options: [
              '0-2 years',
              '3-5 years',
              '6-10 years',
              '11-15 years',
              '15+ years'
            ]
          }
        ];
      case 'institute':
        return [
          {
            id: 'institutionType',
            label: 'Institution Type',
            type: 'select',
            options: [
              'University',
              'College',
              'Training Institute',
              'Corporate Academy',
              'Online Platform',
              'Other'
            ]
          },
          {
            id: 'focusArea',
            label: 'Focus Area',
            type: 'text',
            placeholder: 'e.g., Technology Education, Professional Development'
          },
          {
            id: 'domainSpecialization',
            label: 'Domain Specialization',
            type: 'select',
            options: [
              'STEM Education',
              'Business Education',
              'Creative Arts',
              'Healthcare Training',
              'Technical Skills',
              'All Domains'
            ]
          }
        ];
      default:
        return [];
    }
  };

  // Validation functions
  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.userType) {
          newErrors.userType = 'Please select your user type';
        }
        break;
      case 2:
        const questions = getUserTypeQuestions(formData.userType);
        questions.forEach(question => {
          if (!formData.userTypeDetails[question.id]) {
            newErrors[question.id] = `${question.label} is required`;
          }
        });
        break;
      case 3:
        if (formData.careerInterests.length === 0) {
          newErrors.careerInterests = 'Please select at least one career interest';
        }
        break;
      case 4:
        if (!formData.learningStyle) {
          newErrors.learningStyle = 'Please select your preferred learning style';
        }
        if (!formData.skillLevel) {
          newErrors.skillLevel = 'Please select your skill level';
        }
        break;
      case 5:
        if (formData.professionalGoals.length === 0) {
          newErrors.professionalGoals = 'Please select at least one professional goal';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Navigation functions
  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const completedData = {
        ...formData,
        completedAt: new Date().toISOString()
      };
      
      // Save to localStorage
      localStorage.setItem('onboarding_data', JSON.stringify(completedData));
      
      // Call completion handler
      onComplete(completedData);
    } catch (error) {
      console.error('Error saving onboarding data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Update form data
  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const updateUserTypeDetails = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      userTypeDetails: {
        ...prev.userTypeDetails,
        [field]: value
      }
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const toggleCareerInterest = (interestId: string) => {
    setFormData(prev => ({
      ...prev,
      careerInterests: prev.careerInterests.includes(interestId)
        ? prev.careerInterests.filter(id => id !== interestId)
        : [...prev.careerInterests, interestId]
    }));
    
    if (errors.careerInterests) {
      setErrors(prev => ({
        ...prev,
        careerInterests: ''
      }));
    }
  };

  const toggleProfessionalGoal = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      professionalGoals: prev.professionalGoals.includes(goal)
        ? prev.professionalGoals.filter(g => g !== goal)
        : [...prev.professionalGoals, goal]
    }));
    
    if (errors.professionalGoals) {
      setErrors(prev => ({
        ...prev,
        professionalGoals: ''
      }));
    }
  };

  // Render step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Welcome, {userName}! 👋</h2>
              <p className="text-white/70 text-lg">Let's get to know you better. Who are you?</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => updateFormData('userType', type.id)}
                    className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                      formData.userType === type.id
                        ? 'border-white bg-white/10'
                        : 'border-white/20 bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${type.color} rounded-full flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{type.label}</h3>
                        <p className="text-white/70 text-sm">{type.description}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
            
            {errors.userType && (
              <p className="text-red-400 text-sm text-center">{errors.userType}</p>
            )}
          </div>
        );

      case 2:
        const questions = getUserTypeQuestions(formData.userType);
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Tell us more about yourself</h2>
              <p className="text-white/70 text-lg">Help us personalize your experience</p>
            </div>
            
            <div className="space-y-6">
              {questions.map((question) => (
                <div key={question.id}>
                  <label className="block text-white font-medium mb-2">
                    {question.label}
                  </label>
                  
                  {question.type === 'select' ? (
                    <select
                      value={formData.userTypeDetails[question.id] || ''}
                      onChange={(e) => updateUserTypeDetails(question.id, e.target.value)}
                      className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                    >
                      <option value="" className="bg-gray-800">Select an option</option>
                      {question.options?.map((option) => (
                        <option key={option} value={option} className="bg-gray-800">
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={formData.userTypeDetails[question.id] || ''}
                      onChange={(e) => updateUserTypeDetails(question.id, e.target.value)}
                      placeholder={question.placeholder}
                      className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                    />
                  )}
                  
                  {errors[question.id] && (
                    <p className="text-red-400 text-sm mt-1">{errors[question.id]}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Career Interests</h2>
              <p className="text-white/70 text-lg">Which career paths are you most interested in?</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {careerOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = formData.careerInterests.includes(option.id);
                return (
                  <button
                    key={option.id}
                    onClick={() => toggleCareerInterest(option.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                      isSelected
                        ? 'border-white bg-white/10'
                        : 'border-white/20 bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-white/70'}`} />
                      <span className={`font-medium ${isSelected ? 'text-white' : 'text-white/70'}`}>
                        {option.label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
            
            <div className="mt-6">
              <label className="block text-white font-medium mb-2">
                Other (please specify)
              </label>
              <input
                type="text"
                value={formData.customCareerInterest || ''}
                onChange={(e) => updateFormData('customCareerInterest', e.target.value)}
                placeholder="Enter other career interests..."
                className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
            </div>
            
            {errors.careerInterests && (
              <p className="text-red-400 text-sm text-center">{errors.careerInterests}</p>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Learning Preferences</h2>
              <p className="text-white/70 text-lg">Help us customize your learning experience</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-white font-medium mb-4">
                  Preferred Learning Style
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {learningStyles.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => updateFormData('learningStyle', style.id)}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                        formData.learningStyle === style.id
                          ? 'border-white bg-white/10'
                          : 'border-white/20 bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <h3 className="font-medium text-white mb-1">{style.label}</h3>
                      <p className="text-white/70 text-sm">{style.description}</p>
                    </button>
                  ))}
                </div>
                {errors.learningStyle && (
                  <p className="text-red-400 text-sm mt-2">{errors.learningStyle}</p>
                )}
              </div>
              
              <div>
                <label className="block text-white font-medium mb-4">
                  Current Skill Level
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {skillLevels.map((level) => (
                    <button
                      key={level.id}
                      onClick={() => updateFormData('skillLevel', level.id)}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                        formData.skillLevel === level.id
                          ? 'border-white bg-white/10'
                          : 'border-white/20 bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <h3 className="font-medium text-white mb-1">{level.label}</h3>
                      <p className="text-white/70 text-sm">{level.description}</p>
                    </button>
                  ))}
                </div>
                {errors.skillLevel && (
                  <p className="text-red-400 text-sm mt-2">{errors.skillLevel}</p>
                )}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Professional Goals</h2>
              <p className="text-white/70 text-lg">What are your main professional objectives?</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {professionalGoals.map((goal) => {
                const isSelected = formData.professionalGoals.includes(goal);
                return (
                  <button
                    key={goal}
                    onClick={() => toggleProfessionalGoal(goal)}
                    className={`p-3 rounded-lg border-2 transition-all duration-300 text-left ${
                      isSelected
                        ? 'border-white bg-white/10'
                        : 'border-white/20 bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {isSelected ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : (
                        <div className="w-5 h-5 border-2 border-white/30 rounded-full" />
                      )}
                      <span className={`font-medium ${isSelected ? 'text-white' : 'text-white/70'}`}>
                        {goal}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
            
            {errors.professionalGoals && (
              <p className="text-red-400 text-sm text-center">{errors.professionalGoals}</p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white/70 text-sm">Step {currentStep} of {totalSteps}</span>
            <span className="text-white/70 text-sm">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
          {renderStepContent()}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={handleBack}
            className="flex items-center space-x-2 px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{currentStep === 1 ? 'Back to Signup' : 'Back'}</span>
          </button>

          <button
            onClick={handleNext}
            disabled={isLoading}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>{currentStep === totalSteps ? 'Complete Setup' : 'Next'}</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;
