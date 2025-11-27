import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Mic, 
  Brain, 
  Eye, 
  Zap, 
  Target, 
  Users, 
  BarChart3, 
  Sparkles,
  X,
  CheckCircle,
  Loader2,
  Video,
  MessageSquare,
  Lightbulb,
  TrendingUp
} from 'lucide-react';

interface LiveSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LiveSessionModal: React.FC<LiveSessionModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isInitializing, setIsInitializing] = useState(false);
  const [aiStatus, setAiStatus] = useState({
    transcription: false,
    visualization: false,
    engagement: false,
    analytics: false
  });
  const [sessionData, setSessionData] = useState({
    title: '',
    subject: '',
    duration: 60,
    maxStudents: 50
  });

  const steps = [
    {
      title: "Welcome to AI-Enhanced Live Learning",
      description: "Let's set up your intelligent teaching session",
      icon: Sparkles
    },
    {
      title: "Session Configuration",
      description: "Configure your AI-powered learning environment",
      icon: Target
    },
    {
      title: "AI Systems Initialization",
      description: "Powering up intelligent learning assistants",
      icon: Brain
    },
    {
      title: "Ready to Launch",
      description: "Your AI-enhanced session is ready to begin",
      icon: Zap
    }
  ];

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      setIsInitializing(false);
      setAiStatus({
        transcription: false,
        visualization: false,
        engagement: false,
        analytics: false
      });
    }
  }, [isOpen]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const initializeAISystems = async () => {
    setIsInitializing(true);
    
    // Simulate AI system initialization
    const systems = ['transcription', 'visualization', 'engagement', 'analytics'];
    
    for (let i = 0; i < systems.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setAiStatus(prev => ({
        ...prev,
        [systems[i]]: true
      }));
    }
    
    setIsInitializing(false);
    setCurrentStep(3);
  };

  const startSession = () => {
    // Here you would integrate with your actual live session system
    console.log('Starting AI-enhanced live session:', sessionData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 perspective-1000">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden transform-gpu hover:rotate-y-2 hover:rotate-x-1 transition-all duration-700 hover:scale-105">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 p-6 text-white relative overflow-hidden">
          {/* 3D Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-400/20 rounded-full blur-lg animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-cyan-400/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-all duration-300 hover:scale-110 z-10"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="flex items-center space-x-4 relative z-10">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm hover:scale-110 transition-all duration-300 hover:bg-white/30">
              <Play className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold transform hover:scale-105 transition-transform duration-300">AI-Enhanced Live Session</h2>
              <p className="text-blue-100">Transform your teaching with intelligent assistance</p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 relative overflow-hidden">
          {/* 3D Progress Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
          
          <div className="flex items-center justify-between mb-2 relative z-10">
            <span className="text-sm font-medium text-gray-700">Setup Progress</span>
            <span className="text-sm text-gray-500">{currentStep + 1} of {steps.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 relative overflow-hidden shadow-inner">
            <div 
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 h-3 rounded-full transition-all duration-700 transform-gpu shadow-lg"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
            {/* 3D Shine Effect */}
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full transition-all duration-700"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto max-h-[60vh]">
          {currentStep === 0 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto transform hover:scale-110 hover:rotate-12 transition-all duration-500 shadow-2xl shadow-blue-500/30">
                    <Sparkles className="w-10 h-10 text-white animate-pulse" />
                  </div>
                  {/* 3D Orbital Rings */}
                  <div className="absolute inset-0 w-20 h-20 border-2 border-blue-400/30 rounded-full animate-spin mx-auto" style={{ animationDuration: '8s' }}></div>
                  <div className="absolute inset-0 w-20 h-20 border-2 border-purple-400/30 rounded-full animate-spin mx-auto" style={{ animationDuration: '12s', animationDirection: 'reverse' }}></div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 transform hover:scale-105 transition-transform duration-300">Welcome to the Future of Teaching</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Start your session with powerful AI-driven enhancements that make learning more interactive, 
                  visual, and intelligent. As you teach, the system automatically generates real-time 
                  visualizations and provides intelligent feedback.
                </p>
              </div>

              {/* AI Features Preview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200 transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 shadow-lg hover:shadow-2xl cursor-pointer group">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                      <Brain className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">Real-time Visualizations</h4>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Automatic generation of mind maps, flowcharts, and concept diagrams to help students 
                    grasp complex ideas more easily.
                  </p>
                  {/* 3D Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border border-purple-200 transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 shadow-lg hover:shadow-2xl cursor-pointer group relative">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                      <Mic className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">Voice Transcription</h4>
                  </div>
                  <p className="text-gray-600 text-sm">
                    AI tools transcribe your voice, highlight key terms, and create searchable session notes 
                    for students.
                  </p>
                  {/* 3D Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border border-green-200 transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 shadow-lg hover:shadow-2xl cursor-pointer group relative">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                      <Eye className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors duration-300">Engagement Monitoring</h4>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Monitor learner engagement, detect confusion, and adapt to the pace of the class in real-time.
                  </p>
                  {/* 3D Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl border border-orange-200 transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 shadow-lg hover:shadow-2xl cursor-pointer group relative">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                      <BarChart3 className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">Instant Analytics</h4>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Generate quizzes, track progress, and provide personalized insights for each student.
                  </p>
                  {/* 3D Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 to-red-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Configure Your Session</h3>
                <p className="text-gray-600">Set up your AI-enhanced learning environment</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Session Title</label>
                  <input
                    type="text"
                    value={sessionData.title}
                    onChange={(e) => setSessionData({...sessionData, title: e.target.value})}
                    placeholder="Enter session title"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <select
                    value={sessionData.subject}
                    onChange={(e) => setSessionData({...sessionData, subject: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select subject</option>
                    <option value="mathematics">Mathematics</option>
                    <option value="science">Science</option>
                    <option value="programming">Programming</option>
                    <option value="language">Language</option>
                    <option value="history">History</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
                  <input
                    type="number"
                    value={sessionData.duration}
                    onChange={(e) => setSessionData({...sessionData, duration: parseInt(e.target.value)})}
                    min="15"
                    max="180"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Students</label>
                  <input
                    type="number"
                    value={sessionData.maxStudents}
                    onChange={(e) => setSessionData({...sessionData, maxStudents: parseInt(e.target.value)})}
                    min="1"
                    max="100"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* AI Enhancement Options */}
              <div className="mt-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">AI Enhancement Features</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { icon: Brain, label: 'Real-time Visualizations', enabled: true },
                    { icon: Mic, label: 'Voice Transcription', enabled: true },
                    { icon: Eye, label: 'Engagement Monitoring', enabled: true },
                    { icon: BarChart3, label: 'Instant Analytics', enabled: true },
                    { icon: MessageSquare, label: 'AI Chat Assistant', enabled: true },
                    { icon: Lightbulb, label: 'Smart Suggestions', enabled: true }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{feature.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Initializing AI Systems</h3>
                <p className="text-gray-600">Powering up intelligent learning assistants</p>
              </div>

                             <div className="space-y-4">
                 {[
                   { key: 'transcription', label: 'Voice Transcription System', icon: Mic },
                   { key: 'visualization', label: 'Real-time Visualization Engine', icon: Eye },
                   { key: 'engagement', label: 'Engagement Monitoring AI', icon: Users },
                   { key: 'analytics', label: 'Analytics & Insights Engine', icon: BarChart3 }
                 ].map((system) => (
                   <div key={system.key} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 border border-gray-200/50">
                     <div className="flex items-center space-x-3">
                       <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                         <system.icon className="w-5 h-5 text-white" />
                       </div>
                       <span className="font-medium text-gray-700">{system.label}</span>
                     </div>
                     <div className="flex items-center space-x-2">
                       {aiStatus[system.key as keyof typeof aiStatus] ? (
                         <div className="flex items-center space-x-2">
                           <CheckCircle className="w-5 h-5 text-green-500 animate-pulse" />
                           <span className="text-xs text-green-600 font-medium">Ready</span>
                         </div>
                       ) : (
                         <div className="flex items-center space-x-2">
                           <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
                           <span className="text-xs text-blue-600 font-medium">Initializing...</span>
                         </div>
                       )}
                     </div>
                   </div>
                 ))}
               </div>

              {isInitializing && (
                <div className="text-center mt-6">
                  <div className="inline-flex items-center space-x-2 text-blue-600">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Initializing AI systems...</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto transform hover:scale-110 hover:rotate-12 transition-all duration-500 shadow-2xl shadow-green-500/30 animate-pulse">
                    <Zap className="w-10 h-10 text-white" />
                  </div>
                  {/* 3D Success Rings */}
                  <div className="absolute inset-0 w-20 h-20 border-2 border-green-400/50 rounded-full animate-ping mx-auto"></div>
                  <div className="absolute inset-0 w-20 h-20 border-2 border-blue-400/30 rounded-full animate-ping mx-auto" style={{ animationDelay: '0.5s' }}></div>
                  <div className="absolute inset-0 w-20 h-20 border-2 border-purple-400/20 rounded-full animate-ping mx-auto" style={{ animationDelay: '1s' }}></div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 transform hover:scale-105 transition-transform duration-300">Ready to Launch!</h3>
                <p className="text-gray-600 text-lg">
                  Your AI-enhanced session is ready to begin. All systems are online and ready to provide 
                  intelligent assistance throughout your teaching session.
                </p>
              </div>

              {/* Session Summary */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-200">
                <h4 className="font-semibold text-gray-900 mb-4">Session Summary</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Title:</span>
                    <p className="font-medium">{sessionData.title || 'Untitled Session'}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Subject:</span>
                    <p className="font-medium">{sessionData.subject || 'Not specified'}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Duration:</span>
                    <p className="font-medium">{sessionData.duration} minutes</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Max Students:</span>
                    <p className="font-medium">{sessionData.maxStudents}</p>
                  </div>
                </div>
              </div>

              {/* AI Features Status */}
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(aiStatus).map(([key, status]) => (
                  <div key={key} className="flex items-center space-x-2 p-3 bg-green-50 rounded-xl">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm font-medium text-gray-700 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()} Ready
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 flex items-center justify-between relative overflow-hidden">
          {/* 3D Footer Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
          
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="px-6 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 relative z-10"
          >
            Previous
          </button>

          <div className="flex items-center space-x-4 relative z-10">
            {currentStep === 2 && !isInitializing && (
              <button
                onClick={initializeAISystems}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Initialize AI Systems
              </button>
            )}
            
            {currentStep === 3 && (
              <button
                onClick={startSession}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-110 font-semibold shadow-2xl hover:shadow-3xl relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10">Start Session</span>
              </button>
            )}
            
            {currentStep < 2 && (
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveSessionModal; 