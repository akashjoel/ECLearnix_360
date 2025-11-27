import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  User, 
  FileText, 
  MessageSquare, 
  CreditCard, 
  Sparkles,
  CheckCircle,
  AlertCircle,
  Upload,
  Download,
  Star,
  MapPin,
  DollarSign,
  Zap,
  Brain,
  Target,
  BookOpen,
  Video,
  Mic,
  Send,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus
} from 'lucide-react';

interface SmartBookingPanelProps {
  isOpen: boolean;
  onClose: () => void;
  mentor: {
    name: string;
    specialization: string;
    hourlyRate: number;
    rating: number;
    students: number;
    location: string;
    avatar: string;
    skills: string[];
    bio: string;
  };
}

const SmartBookingPanel: React.FC<SmartBookingPanelProps> = ({ isOpen, onClose, mentor }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [sessionDuration, setSessionDuration] = useState(60);
  const [learningGoals, setLearningGoals] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [agendaGenerated, setAgendaGenerated] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [aiAgenda, setAiAgenda] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  
  const panelRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    if (isOpen) {
      document.addEventListener('mousemove', handleMouseMove);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && panelRef.current) {
      panelRef.current.focus();
    }
  }, [isOpen]);

  const availableSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'
  ];

  const availableDates = [
    '2024-01-15', '2024-01-16', '2024-01-17', '2024-01-18', '2024-01-19'
  ];

  const generateAIAgenda = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setAiAgenda(`
1. **Session Overview** (10 min)
   - Review learning goals and current progress
   - Discuss specific challenges and questions

2. **Deep Dive Topics** (35 min)
   - ${mentor.skills[0]} fundamentals and best practices
   - Practical examples and case studies
   - Hands-on problem solving

3. **Action Plan & Next Steps** (10 min)
   - Personalized learning roadmap
   - Recommended resources and exercises
   - Follow-up session planning

4. **Q&A Session** (5 min)
   - Address remaining questions
   - Clarify concepts and techniques
      `);
      setAgendaGenerated(true);
      setIsProcessing(false);
    }, 2000);
  };

  const calculateTotal = () => {
    const basePrice = (mentor.hourlyRate * sessionDuration) / 60;
    const discount = discountApplied ? basePrice * 0.1 : 0;
    return basePrice - discount;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFiles([...uploadedFiles, ...Array.from(e.target.files)]);
    }
  };

  const handleBooking = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setBookingConfirmed(true);
      setIsProcessing(false);
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with 3D effect */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        style={{
          transform: `perspective(1000px) rotateX(${(mousePosition.y - window.innerHeight / 2) * 0.01}deg) rotateY(${(mousePosition.x - window.innerWidth / 2) * 0.01}deg)`,
          transition: 'transform 0.1s ease-out'
        }}
      />

      {/* Main Panel with 3D Transform */}
      <div
        ref={panelRef}
        className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500"
        style={{
          transform: `perspective(1000px) rotateX(${(mousePosition.y - window.innerHeight / 2) * 0.005}deg) rotateY(${(mousePosition.x - window.innerWidth / 2) * 0.005}deg) scale(${isOpen ? 1 : 0.9})`,
          boxShadow: `
            0 25px 50px -12px rgba(0, 0, 0, 0.25),
            0 0 0 1px rgba(255, 255, 255, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.2)
          `
        }}
      >
        {/* Header with 3D gradient */}
        <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 p-6 text-white overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <h2 className="text-2xl font-bold">Book Session with {mentor.name}</h2>
                <p className="text-purple-100">{mentor.specialization}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-all duration-300 transform hover:scale-110"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
          {!bookingConfirmed ? (
            <div className="space-y-6">
              {/* Progress Steps */}
              <div className="flex items-center justify-between mb-8">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                      step <= currentStep 
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {step < currentStep ? <CheckCircle className="w-5 h-5" /> : step}
                    </div>
                    {step < 4 && (
                      <div className={`w-16 h-1 mx-2 transition-all duration-300 ${
                        step < currentStep ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gray-200'
                      }`}></div>
                    )}
                  </div>
                ))}
              </div>

              {/* Step 1: Date & Time Selection */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Session Time</h3>
                    <p className="text-gray-600">Select a date and time that works best for you</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Date Selection */}
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-blue-600" />
                        Select Date
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {availableDates.map((date) => (
                          <button
                            key={date}
                            onClick={() => setSelectedDate(date)}
                            className={`p-3 rounded-xl text-center transition-all duration-300 transform hover:scale-105 ${
                              selectedDate === date
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                                : 'bg-white border border-gray-200 hover:border-blue-300'
                            }`}
                          >
                            <div className="text-sm font-medium">
                              {new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
                            </div>
                            <div className="text-lg font-bold">
                              {new Date(date).getDate()}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Time Selection */}
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-green-600" />
                        Select Time
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {availableSlots.map((time) => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`p-3 rounded-xl text-center transition-all duration-300 transform hover:scale-105 ${
                              selectedTime === time
                                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
                                : 'bg-white border border-gray-200 hover:border-green-300'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Duration Selection */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-purple-600" />
                      Session Duration
                    </h4>
                    <div className="flex items-center justify-center space-x-4">
                      <button
                        onClick={() => setSessionDuration(Math.max(30, sessionDuration - 30))}
                        className="p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
                      >
                        <Minus className="w-4 h-4 text-gray-600" />
                      </button>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600">{sessionDuration}</div>
                        <div className="text-sm text-gray-600">minutes</div>
                      </div>
                      <button
                        onClick={() => setSessionDuration(Math.min(180, sessionDuration + 30))}
                        className="p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
                      >
                        <Plus className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Learning Goals */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Define Your Learning Goals</h3>
                    <p className="text-gray-600">Help us personalize your session experience</p>
                  </div>

                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Target className="w-5 h-5 text-yellow-600" />
                      What do you want to learn?
                    </h4>
                    <textarea
                      value={learningGoals}
                      onChange={(e) => setLearningGoals(e.target.value)}
                      placeholder="Describe your learning objectives, specific topics you want to cover, or challenges you're facing..."
                      className="w-full h-32 p-4 border border-yellow-300 rounded-xl resize-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                  </div>

                  {/* File Upload */}
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Upload className="w-5 h-5 text-blue-600" />
                      Upload Related Documents
                    </h4>
                    <div className="border-2 border-dashed border-blue-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors duration-300">
                      <input
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                      />
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <Upload className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                        <p className="text-gray-600">Click to upload files or drag and drop</p>
                        <p className="text-sm text-gray-500">PDF, DOC, images up to 10MB</p>
                      </label>
                    </div>
                    {uploadedFiles.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {uploadedFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-blue-200">
                            <span className="text-sm text-gray-700">{file.name}</span>
                            <button
                              onClick={() => setUploadedFiles(uploadedFiles.filter((_, i) => i !== index))}
                              className="text-red-500 hover:text-red-700"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: AI Agenda Generation */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">AI-Powered Session Agenda</h3>
                    <p className="text-gray-600">Let AI create a personalized meeting agenda for you</p>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <Brain className="w-5 h-5 text-purple-600" />
                        Suggested Agenda
                      </h4>
                      <button
                        onClick={generateAIAgenda}
                        disabled={isProcessing || agendaGenerated}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isProcessing ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Generating...
                          </>
                        ) : agendaGenerated ? (
                          <>
                            <CheckCircle className="w-4 h-4" />
                            Generated
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4" />
                            Generate Agenda
                          </>
                        )}
                      </button>
                    </div>

                    {agendaGenerated ? (
                      <div className="bg-white rounded-xl p-4 border border-purple-200">
                        <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">{aiAgenda}</pre>
                      </div>
                    ) : (
                      <div className="bg-white/50 rounded-xl p-8 text-center border border-purple-200">
                        <Sparkles className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                        <p className="text-gray-600">Click "Generate Agenda" to create a personalized session plan based on your learning goals</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 4: Payment & Confirmation */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Payment & Confirmation</h3>
                    <p className="text-gray-600">Review your session details and complete payment</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Session Summary */}
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        Session Summary
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Date:</span>
                          <span className="font-medium">{selectedDate && new Date(selectedDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Time:</span>
                          <span className="font-medium">{selectedTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Duration:</span>
                          <span className="font-medium">{sessionDuration} minutes</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Rate:</span>
                          <span className="font-medium">₹{mentor.hourlyRate}/hour</span>
                        </div>
                      </div>
                    </div>

                    {/* Payment Options */}
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-blue-600" />
                        Payment Method
                      </h4>
                      <div className="space-y-3">
                        {['card', 'upi', 'netbanking'].map((method) => (
                          <label key={method} className="flex items-center p-3 bg-white rounded-lg border border-blue-200 cursor-pointer hover:border-blue-400 transition-colors duration-300">
                            <input
                              type="radio"
                              name="payment"
                              value={method}
                              checked={paymentMethod === method}
                              onChange={(e) => setPaymentMethod(e.target.value)}
                              className="mr-3"
                            />
                            <span className="capitalize">{method}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-purple-600" />
                      Pricing Details
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Base Price:</span>
                        <span>₹{((mentor.hourlyRate * sessionDuration) / 60).toFixed(2)}</span>
                      </div>
                      {discountApplied && (
                        <div className="flex justify-between text-green-600">
                          <span>Discount (10%):</span>
                          <span>-₹{(((mentor.hourlyRate * sessionDuration) / 60) * 0.1).toFixed(2)}</span>
                        </div>
                      )}
                      <div className="border-t border-purple-200 pt-3">
                        <div className="flex justify-between font-bold text-lg">
                          <span>Total:</span>
                          <span className="text-purple-600">₹{calculateTotal().toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <button
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                
                {currentStep < 4 ? (
                  <button
                    onClick={() => setCurrentStep(currentStep + 1)}
                    disabled={
                      (currentStep === 1 && (!selectedDate || !selectedTime)) ||
                      (currentStep === 2 && !learningGoals.trim())
                    }
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={handleBooking}
                    disabled={isProcessing}
                    className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      'Confirm Booking'
                    )}
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Booking Confirmation */
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto animate-pulse">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h3>
                <p className="text-gray-600">Your session with {mentor.name} has been successfully scheduled</p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">What's Next?</h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">Pre-session chat access enabled</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <BookOpen className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-gray-700">Recommended resources shared</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <Video className="w-4 h-4 text-purple-600" />
                    </div>
                    <span className="text-gray-700">Meeting link will be sent 15 minutes before</span>
                  </div>
                </div>
              </div>

              <button
                onClick={onClose}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SmartBookingPanel; 