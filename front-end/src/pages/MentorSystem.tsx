import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Star, 
  Users, 
  Clock,
  Sparkles,
  Target,
  Video,
  Brain,
  Code,
  Database,
  Shield,
  Palette,
  TrendingUp,
  Award,
  CheckCircle,
  X,
  Calendar,
  User,
  ChevronLeft,
  ChevronRight,
  Check
} from 'lucide-react';
import MentorCard from '../components/MentorCard';
import VideoCall from '../components/VideoCall';

interface Mentor {
  id: string;
  name: string;
  specialization: string;
  bio: string;
  skills: string[];
  rating: number;
  students: number;
  location: string;
  hourlyRate: number;
  avatar: string;
  isOnline: boolean;
  badges: string[];
}

interface TimeSlot {
  time: string;
  available: boolean;
  booked: boolean;
}

const MentorSystem = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [bookingModal, setBookingModal] = useState<{ isOpen: boolean; mentor: Mentor | null }>({ isOpen: false, mentor: null });
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [showVideoCall, setShowVideoCall] = useState(false);
  
  // Date and Time Picker States
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [availableDates, setAvailableDates] = useState<Set<string>>(new Set());
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Generate available dates for the next 30 days
  useEffect(() => {
    const dates = new Set<string>();
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      // Exclude weekends and add some random availability
      if (date.getDay() !== 0 && date.getDay() !== 6 && Math.random() > 0.3) {
        dates.add(date.toISOString().split('T')[0]);
      }
    }
    setAvailableDates(dates);
  }, []);

  // Generate time slots when date is selected
  useEffect(() => {
    if (selectedDate) {
      const slots: TimeSlot[] = [];
      const startHour = 9; // 9 AM
      const endHour = 18; // 6 PM
      
      for (let hour = startHour; hour < endHour; hour++) {
        // 30-minute slots
        for (let minute = 0; minute < 60; minute += 30) {
          const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
          const available = Math.random() > 0.4; // 60% availability
          const booked = Math.random() > 0.8; // 20% booked
          
          slots.push({
            time,
            available: available && !booked,
            booked
          });
        }
      }
      setTimeSlots(slots);
    }
  }, [selectedDate]);

  // Calendar helpers
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    return { daysInMonth, startingDay };
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const isDateAvailable = (date: Date) => {
    return availableDates.has(formatDate(date));
  };

  const isDateSelected = (date: Date) => {
    return selectedDate && formatDate(date) === formatDate(selectedDate);
  };

  const isDateToday = (date: Date) => {
    const today = new Date();
    return formatDate(date) === formatDate(today);
  };

  const isDatePast = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const getMonthName = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      if (direction === 'prev') {
        newMonth.setMonth(prev.getMonth() - 1);
      } else {
        newMonth.setMonth(prev.getMonth() + 1);
      }
      return newMonth;
    });
  };

  const categories = [
    { id: 'all', name: 'All Mentors', icon: <Users className="w-4 h-4" />, color: 'from-blue-500 to-cyan-500' },
    { id: 'ai-ml', name: 'AI & Machine Learning', icon: <Brain className="w-4 h-4" />, color: 'from-purple-500 to-pink-500' },
    { id: 'web-dev', name: 'Web Development', icon: <Code className="w-4 h-4" />, color: 'from-green-500 to-emerald-500' },
    { id: 'data-science', name: 'Data Science', icon: <Database className="w-4 h-4" />, color: 'from-orange-500 to-red-500' },
    { id: 'cybersecurity', name: 'Cybersecurity', icon: <Shield className="w-4 h-4" />, color: 'from-indigo-500 to-purple-500' },
    { id: 'design', name: 'UI/UX Design', icon: <Palette className="w-4 h-4" />, color: 'from-pink-500 to-rose-500' }
  ];

  const mentors = [
    {
      id: '1',
      name: 'Prof. Sushmita Mitra',
      specialization: 'Cybersecurity & AI Professor',
      bio: 'Senior ISI Kolkata professor, IEEE Fellow, 25+ years in AI, cybersecurity, and secure ML systems.',
      skills: ['Machine Learning', 'Python', 'Data Science'],
      rating: 4.9,
      students: 1750,
      location: 'Kolkata, IN',
      hourlyRate: 2100,
      avatar: '',
      isOnline: true,
      badges: ['Verified', 'IEEE Fellow', 'Top Mentor']
    },
    {
      id: '2',
      name: 'Dr. Rajesh Kumar',
      specialization: 'Full Stack Development Expert',
      bio: 'Senior software architect with 15+ years experience in React, Node.js, and cloud technologies.',
      skills: ['React', 'Node.js', 'AWS', 'TypeScript'],
      rating: 4.8,
      students: 1240,
      location: 'Bangalore, IN',
      hourlyRate: 1800,
      avatar: '',
      isOnline: true,
      badges: ['Verified', 'Senior Developer']
    },
    {
      id: '3',
      name: 'Sarah Johnson',
      specialization: 'Data Science & Analytics Lead',
      bio: 'Former Google data scientist, expert in Python, R, and advanced analytics with 12+ years experience.',
      skills: ['Python', 'R', 'SQL', 'Machine Learning'],
      rating: 4.9,
      students: 2100,
      location: 'Mumbai, IN',
      hourlyRate: 2200,
      avatar: '',
      isOnline: false,
      badges: ['Verified', 'Ex-Google', 'PhD']
    },
    {
      id: '4',
      name: 'Amit Patel',
      specialization: 'Mobile App Development Specialist',
      bio: 'Mobile development expert with 10+ years building iOS and Android apps using React Native and Flutter.',
      skills: ['React Native', 'Flutter', 'iOS', 'Android'],
      rating: 4.7,
      students: 890,
      location: 'Delhi, IN',
      hourlyRate: 1600,
      avatar: '',
      isOnline: true,
      badges: ['Verified', 'App Store Featured']
    },
    {
      id: '5',
      name: 'Priya Sharma',
      specialization: 'UI/UX Design & Product Strategy',
      bio: 'Senior product designer with experience at top tech companies, specializing in user-centered design.',
      skills: ['Figma', 'Adobe Creative Suite', 'User Research', 'Prototyping'],
      rating: 4.8,
      students: 1560,
      location: 'Hyderabad, IN',
      hourlyRate: 1900,
      avatar: '',
      isOnline: true,
      badges: ['Verified', 'Design Lead']
    },
    {
      id: '6',
      name: 'Dr. Michael Chen',
      specialization: 'Cybersecurity & Ethical Hacking',
      bio: 'Certified ethical hacker and cybersecurity consultant with expertise in penetration testing and security audits.',
      skills: ['Penetration Testing', 'Network Security', 'Cryptography', 'Incident Response'],
      rating: 4.9,
      students: 980,
      location: 'Chennai, IN',
      hourlyRate: 2400,
      avatar: '',
      isOnline: false,
      badges: ['Verified', 'CEH Certified', 'CISSP']
    }
  ];

  const filteredMentors = mentors.filter(mentor => {
    const matchesCategory = selectedCategory === 'all' || mentor.skills.some(skill => 
      categories.find(cat => cat.id === selectedCategory)?.name.toLowerCase().includes(skill.toLowerCase())
    );
    const matchesSearch = mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mentor.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mentor.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleBookSession = (mentor: Mentor) => {
    setBookingModal({ isOpen: true, mentor });
    setBookingStep(1);
    setBookingConfirmed(false);
  };

  const handleBookingConfirm = () => {
    setTimeout(() => {
      setBookingConfirmed(true);
      // Start video call after confirmation
      setTimeout(() => {
        setShowVideoCall(true);
        setBookingModal({ isOpen: false, mentor: null });
      }, 1500);
    }, 2000);
  };

  const closeBookingModal = () => {
    setBookingModal({ isOpen: false, mentor: null });
    setSelectedDate(null);
    setSelectedTime(null);
    setCurrentMonth(new Date());
  };



  // Show video call if active
  if (showVideoCall && bookingModal.mentor) {
    return (
      <VideoCall 
        mentorName={bookingModal.mentor.name}
        onEndCall={() => {
          setShowVideoCall(false);
          setBookingModal({ isOpen: false, mentor: null });
          setSelectedDate(null);
          setSelectedTime(null);
          setCurrentMonth(new Date());
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header */}
        <div className={`text-center mb-12 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
            Expert Mentorship Network
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Connect with industry experts, professors, and professionals for personalized learning experiences
          </p>
          

        </div>

        {/* Search and Filter Section */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/50 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search mentors by name, skills, or specialization..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.icon}
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map((mentor, index) => (
            <div 
              key={mentor.id} 
              className={`transform transition-all duration-500 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <MentorCard mentor={mentor} onBookSession={() => handleBookSession(mentor)} />
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredMentors.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No mentors found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or browse all categories</p>
          </div>
        )}

        {/* Features Section */}
        <div className="mt-16 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Choose Our Mentors?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Award className="w-8 h-8" />,
                title: 'Verified Experts',
                description: 'All mentors are verified professionals with proven track records and industry experience.'
              },
              {
                icon: <Target className="w-8 h-8" />,
                title: 'Personalized Learning',
                description: 'Get customized learning plans and one-on-one guidance tailored to your goals.'
              },
              {
                icon: <Sparkles className="w-8 h-8" />,
                title: 'AI-Powered Matching',
                description: 'Our AI system matches you with the perfect mentor based on your skills and objectives.'
              }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl mb-4 text-white">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 3D Booking Modal */}
        {bookingModal.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeBookingModal} />
            
            {/* 3D Animated Background */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 blur-xl animate-pulse" />
              <div className="absolute w-24 h-24 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-20 blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            {/* Main Modal */}
            <div className="relative w-full max-w-lg mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105">
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
                <button onClick={closeBookingModal} className="absolute top-4 right-4 text-white/80 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
                
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Book Session with {bookingModal.mentor?.name}</h2>
                    <p className="text-white/80">{bookingModal.mentor?.specialization}</p>
                  </div>
                </div>
              </div>

              {/* Progress Steps */}
              <div className="p-6">
                <div className="flex items-center justify-center gap-4 mb-6">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        step === bookingStep 
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {step}
                      </div>
                      {step < 3 && (
                        <div className={`w-8 h-0.5 mx-2 ${
                          step < bookingStep ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gray-200'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>

                {/* Step Content */}
                {bookingStep === 1 && (
                  <div className="space-y-6">
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Choose Your Session Time</h3>
                      <p className="text-gray-600">Select a date and time that works best for you</p>
                    </div>

                    {/* Date Picker */}
                    <div className="bg-gray-50 rounded-2xl p-4 w-full mx-auto">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-5 h-5 text-purple-600" />
                          <span className="font-semibold text-gray-900">Select Date</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => navigateMonth('prev')}
                            className="p-1 hover:bg-white rounded-lg transition-colors"
                          >
                            <ChevronLeft className="w-4 h-4 text-gray-600" />
                          </button>
                          <span className="text-sm font-medium text-gray-700 min-w-[120px] text-center">
                            {getMonthName(currentMonth)}
                          </span>
                          <button
                            onClick={() => navigateMonth('next')}
                            className="p-1 hover:bg-white rounded-lg transition-colors"
                          >
                            <ChevronRight className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </div>

                      {/* Calendar Grid */}
                      <div className="grid grid-cols-7 gap-1 mb-3">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                          <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                            {day}
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-7 gap-1">
                        {(() => {
                          const { daysInMonth, startingDay } = getDaysInMonth(currentMonth);
                          const days = [];
                          
                          // Add empty cells for days before the first day of the month
                          for (let i = 0; i < startingDay; i++) {
                            days.push(<div key={`empty-${i}`} className="h-8" />);
                          }
                          
                          // Add days of the month
                          for (let day = 1; day <= daysInMonth; day++) {
                            const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                            const isAvailable = isDateAvailable(date);
                            const isSelected = isDateSelected(date);
                            const isToday = isDateToday(date);
                            const isPast = isDatePast(date);
                            
                            days.push(
                              <button
                                key={day}
                                onClick={() => isAvailable && !isPast && setSelectedDate(date)}
                                disabled={!isAvailable || isPast}
                                className={`h-8 w-8 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center relative
                                  ${isSelected 
                                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg transform scale-110' 
                                    : isToday 
                                    ? 'bg-purple-100 text-purple-700 border-2 border-purple-300' 
                                    : isAvailable && !isPast 
                                    ? 'hover:bg-purple-50 text-gray-700 hover:scale-105' 
                                    : 'text-gray-300 cursor-not-allowed'
                                  }`}
                              >
                                {day}
                                {isSelected && (
                                  <Check className="w-3 h-3 absolute -top-1 -right-1 bg-white rounded-full p-0.5" />
                                )}
                              </button>
                            );
                          }
                          
                          return days;
                        })()}
                      </div>
                    </div>

                    {/* Time Slots */}
                    {selectedDate && (
                      <div className="bg-white rounded-2xl p-4 shadow border border-gray-100 w-full mx-auto">
                        <div className="flex items-center gap-2 mb-4">
                          <Clock className="w-5 h-5 text-green-600" />
                          <span className="font-semibold text-gray-900">
                            Available Times for {selectedDate.toLocaleDateString('en-US', { 
                              weekday: 'long', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-3 max-h-56 overflow-y-auto">
                          {timeSlots.map((slot, index) => (
                            <button
                              key={index}
                              onClick={() => slot.available && setSelectedTime(slot.time)}
                              disabled={!slot.available}
                              className={`relative p-3 rounded-xl text-base font-semibold transition-all duration-200 flex items-center justify-center
                                ${selectedTime === slot.time 
                                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105 border-2 border-blue-400' 
                                  : slot.available 
                                  ? 'bg-gray-50 hover:bg-blue-50 text-gray-700 hover:scale-105 border border-gray-200' 
                                  : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-100'
                                }`}
                            >
                              {slot.time}
                              {slot.booked && (
                                <span className="absolute top-1 right-2 text-xs text-red-500 font-bold">
                                  Booked
                                </span>
                              )}
                            </button>
                          ))}
                        </div>
                        {/* Legend */}
                        <div className="flex gap-4 mt-4 text-sm text-gray-500">
                          <div className="flex items-center gap-2">
                            <span className="inline-block w-4 h-4 rounded bg-gradient-to-r from-blue-500 to-purple-500"></span>
                            Selected
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="inline-block w-4 h-4 rounded bg-gray-50 border border-gray-200"></span>
                            Available
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="inline-block w-4 h-4 rounded bg-gray-100 border border-gray-100"></span>
                            Unavailable
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-red-500 font-bold">Booked</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Continue Button */}
                    <button 
                      onClick={() => setBookingStep(2)}
                      disabled={!selectedDate || !selectedTime}
                      className={`w-full py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105
                        ${selectedDate && selectedTime 
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg' 
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                    >
                      Continue
                    </button>
                  </div>
                )}

                {bookingStep === 2 && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900">Session Details</h3>
                    
                    <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-purple-600" />
                        <div>
                          <span className="text-gray-600 text-sm">Date</span>
                          <p className="font-medium text-gray-900">
                            {selectedDate?.toLocaleDateString('en-US', { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-green-600" />
                        <div>
                          <span className="text-gray-600 text-sm">Time</span>
                          <p className="font-medium text-gray-900">{selectedTime}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-blue-600" />
                        <div>
                          <span className="text-gray-600 text-sm">Mentor</span>
                          <p className="font-medium text-gray-900">{bookingModal.mentor?.name}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Duration</span>
                        <span className="font-medium">1 Hour</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Rate</span>
                        <span className="font-medium">₹{bookingModal.mentor?.hourlyRate}/hour</span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-purple-200">
                        <span className="text-gray-600 font-semibold">Total</span>
                        <span className="text-xl font-bold text-purple-600">₹{bookingModal.mentor?.hourlyRate}</span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button 
                        onClick={() => setBookingStep(1)}
                        className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                      >
                        Back
                      </button>
                      <button 
                        onClick={() => setShowQR(true)}
                        className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                      >
                        Pay & Confirm
                      </button>
                    </div>
                  </div>
                )}

                {bookingStep === 3 && (
                  <div className="text-center">
                    {!bookingConfirmed ? (
                      <div>
                        <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Sparkles className="w-8 h-8 text-white animate-pulse" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Processing Booking...</h3>
                        <p className="text-gray-600">Please wait while we confirm your session</p>
                      </div>
                    ) : (
                      <div>
                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <CheckCircle className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Booking Confirmed!</h3>
                        <p className="text-gray-600">Your session has been successfully scheduled</p>
                        <button 
                          onClick={() => {
                            setShowVideoCall(true);
                            setBookingModal({ isOpen: false, mentor: null });
                          }}
                          className="mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                        >
                          Start Video Call
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Professional QR Code Payment Modal */}
        {showQR && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => setShowQR(false)} />
            
            {/* Professional Payment Modal */}
            <div className="relative bg-gray-900 rounded-3xl shadow-2xl p-8 flex flex-col items-center max-w-sm mx-auto transform transition-all duration-500 hover:scale-105">
              {/* Close Button */}
              <button
                onClick={() => setShowQR(false)}
                className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* QR Code Container */}
              <div className="relative mb-6">
                {/* QR Code Background */}
                <div className="w-72 h-72 bg-white rounded-2xl p-4 shadow-2xl border-2 border-white/20">
                  {/* QR Code Pattern - Professional Black and White */}
                  <div className="w-full h-full relative bg-white">
                    {/* QR Code Grid Pattern - More realistic */}
                    <div className="absolute inset-0 grid grid-cols-29 gap-px">
                      {/* Generate more authentic QR-like pattern */}
                      {Array.from({ length: 841 }).map((_, i) => {
                        const row = Math.floor(i / 29);
                        const col = i % 29;
                        
                        // Corner markers (3x3 squares with inner 1x1 white)
                        const isCornerMarker = (
                          (row >= 0 && row < 9 && col >= 0 && col < 9) ||
                          (row >= 0 && row < 9 && col >= 20 && col < 29) ||
                          (row >= 20 && row < 29 && col >= 0 && col < 9)
                        );
                        
                        // Inner corner markers (1x1 white in center of 3x3)
                        const isInnerCorner = (
                          (row >= 3 && row < 6 && col >= 3 && col < 6) ||
                          (row >= 3 && row < 6 && col >= 23 && col < 26) ||
                          (row >= 23 && row < 26 && col >= 3 && col < 6)
                        );
                        
                        // Center area for logo (clear out center 9x9 area)
                        const isCenterArea = row >= 10 && row < 19 && col >= 10 && col < 19;
                        
                        // Random pattern for data areas
                        const isDataPattern = !isCenterArea && !isInnerCorner && Math.random() > 0.45;
                        
                        const shouldShow = isCornerMarker && !isInnerCorner || isDataPattern;
                        
                        return (
                          <div
                            key={i}
                            className={`w-full h-full ${shouldShow ? 'bg-black' : 'bg-white'} rounded-none`}
                          />
                        );
                      })}
                    </div>
                    
                    {/* Google Pay Logo in Center */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-gray-100">
                        {/* Google Pay Logo - More accurate representation */}
                        <div className="relative w-14 h-14 flex items-center justify-center">
                          {/* Blue curved shape */}
                          <div className="absolute w-5 h-8 bg-blue-500 rounded-full transform rotate-12 -translate-x-3"></div>
                          {/* Green curved shape */}
                          <div className="absolute w-5 h-8 bg-green-500 rounded-full transform rotate-12"></div>
                          {/* Red/Orange curved shape */}
                          <div className="absolute w-5 h-8 bg-orange-500 rounded-full transform rotate-12 translate-x-3"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Animated Ring */}
                <div className="absolute inset-0 w-72 h-72 rounded-2xl border-4 border-green-400/30 animate-ping"></div>
                <div className="absolute inset-0 w-72 h-72 rounded-2xl border-2 border-green-400/50 animate-pulse"></div>
              </div>

              {/* Payment Text */}
              <div className="text-center mb-6">
                <p className="text-white text-lg font-medium mb-4">Scan to pay with any UPI app</p>
                <div className="flex items-center justify-center gap-2 text-white/70 text-sm">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Secure Payment • Instant Confirmation</span>
                </div>
              </div>

              {/* Payment Amount */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-6 w-full">
                <div className="flex justify-between items-center">
                  <span className="text-white/80 text-sm">Session Fee</span>
                  <span className="text-white text-xl font-bold">₹{bookingModal.mentor?.hourlyRate}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-white/80 text-sm">Mentor</span>
                  <span className="text-white font-medium">{bookingModal.mentor?.name}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 w-full">
              <button
                onClick={() => setShowQR(false)}
                  className="flex-1 bg-white/20 text-white py-3 px-4 rounded-xl font-medium hover:bg-white/30 transition-all duration-300 backdrop-blur-sm border border-white/20"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Simulate payment success
                    setShowQR(false);
                    setBookingStep(3);
                    handleBookingConfirm();
                  }}
                  className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 px-4 rounded-xl font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  Pay Now
              </button>
              </div>

              {/* Security Badge */}
              <div className="flex items-center gap-2 mt-4 text-white/60 text-xs">
                <Shield className="w-4 h-4" />
                <span>256-bit SSL encrypted • PCI DSS compliant</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorSystem;