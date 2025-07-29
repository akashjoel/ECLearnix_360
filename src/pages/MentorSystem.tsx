import React, { useState, useEffect } from 'react';
import { 
  Users, 
  MessageCircle, 
  Star, 
  Clock, 
  MapPin, 
  Briefcase,
  GraduationCap,
  Calendar,
  Video,
  Search,
  Filter,
  Heart,
  Award,
  Sparkles,
  Zap,
  TrendingUp,
  Activity,
  ArrowRight,
  CheckCircle,
  Play,
  Mic,
  BookOpen,
  Target,
  Lightbulb
} from 'lucide-react';

const MentorSystem = () => {
  const [activeTab, setActiveTab] = useState('find-mentors');
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('All');
  const [availabilityFilter, setAvailabilityFilter] = useState('All');
  const [ratingFilter, setRatingFilter] = useState('All');
  const [experienceFilter, setExperienceFilter] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredMentor, setHoveredMentor] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

  const mentors = [
    {
      id: 1,
      name: ' Prof. Sushmita Mitra',
      title: ': Cybersecurity & AI Professor',
      expertise: ['Machine Learning', 'Python', 'Data Science'],
      rating: 4.9,
      students: 1750,
      sessions: 89,
      location: 'Kolkata, IN',
      price: '₹2100/hour',
      image: 'https://r10.ieee.org/gujarat/wp-content/uploads/sites/179/2022/09/Sushmita-Mitra.jpg',
      available: true,
      bio: 'Senior ISI Kolkata professor, IEEE Fellow, 25+ years in AI, cybersecurity, and secure ML systems.'
    },
    {
      id: 2,
      name: 'Prof. Krishna Sivalingam',
      title: 'Networking & Mobile Systems Professor',
      expertise: ['Wireless Systems 5G Cyber-Physical '],
      rating: 4.8,
      students: 1600,
      sessions: 142,
      location: 'Chennai, IN',
      price: '₹2200/hour',
      image: 'https://icc2016.ieee-icc.org/sites/icc2016.ieee-icc.org/files/u44/ONS-Krishna_Sivalingam.jpg',
      available: true,
      bio: 'Institute Chair Professor at IIT Madras, IEEE Fellow, expert in 5G, networks, mobile computing.',
    },
    {
      id: 3,
      name: 'Prof.Debdeep Mukhopadhyay',
      title: 'Cloud & Network Security Professor',
      expertise: ['Algorithms', 'Computer Science', 'Academic Research'],
      rating: 4.9,
      students:960, 
      sessions: 67,
      location: ' Kharagpur, IN',
      price: '₹2300/hour',
      image: 'https://media.licdn.com/dms/image/sync/v2/D4D27AQHcDSxlm5703A/articleshare-shrink_800/articleshare-shrink_800/0/1718456257559?e=2147483647&v=beta&t=JRpgoXYRdf95WmBqbWsGyM-rxCgMVkep79UR56UTyrs',
      available: false,
      bio: 'IIT Kharagpur faculty,Shanti Swarup Bhatnagar awardee,researching cloud security,cryptography,IoT.'
    }
  ];

  const myMentors = [
    {
      id: 1,
      name: 'Prof. Sushmita Mitra',
      nextSession: '2025-08-15 2:00 PM',
      lastContact: '2 days ago',
      progress: 'Working on ML project',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Sushmita_Mitra_c._2020.jpg/960px-Sushmita_Mitra_c._2020.jpg'
    },
    {
      id: 2,
      name: 'Prof. Krishna Sivalingam ',
      nextSession: '2025-08-18 4:00 PM',
      lastContact: '5 days ago',
      progress: 'Code review session',
      image: 'https://www.cse.iitm.ac.in/images/KS.jpg'
    }
  ];

  const matchingRequests = [
    {
      id: 1,
      type: 'Project Collaboration',
      title: 'E-commerce Website Development',
      description: 'Looking for a mentor to guide me through building a full-stack e-commerce platform',
      skills: ['React', 'Node.js', 'MongoDB'],
      status: 'pending',
      responses: 3
    },
    {
      id: 2,
      type: 'Career Guidance',
      title: 'Transitioning to Data Science',
      description: 'Need guidance on career transition from software development to data science',
      skills: ['Python', 'Machine Learning', 'Statistics'],
      status: 'matched',
      mentor: 'Prof. Sushmita Mitra'
    }
  ];

  const tabs = [
    { id: 'find-mentors', name: 'Find Mentors', count: mentors.length, icon: <Users className="w-4 h-4" /> },
    { id: 'my-mentors', name: 'My Mentors', count: myMentors.length, icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'requests', name: 'My Requests', count: matchingRequests.length, icon: <Target className="w-4 h-4" /> }
  ];

  // Filtered mentors logic
  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch =
      mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.expertise.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesLocation = locationFilter === 'All' || mentor.location === locationFilter;
    const matchesAvailability = availabilityFilter === 'All' || (availabilityFilter === 'Available' ? mentor.available : !mentor.available);
    const matchesRating = ratingFilter === 'All' || mentor.rating >= parseFloat(ratingFilter);
    const matchesExperience =
      experienceFilter === 'All' ||
      (experienceFilter === 'Junior' && mentor.title.toLowerCase().includes('junior')) ||
      (experienceFilter === 'Mid' && mentor.title.toLowerCase().includes('developer')) ||
      (experienceFilter === 'Senior' && mentor.title.toLowerCase().includes('senior')) ||
      (experienceFilter === 'Professor' && mentor.title.toLowerCase().includes('professor'));
    return matchesSearch && matchesLocation && matchesAvailability && matchesRating && matchesExperience;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        
        {/* Floating Icons */}
        <div className="absolute top-20 left-20 w-8 h-8 text-blue-400/30 animate-float">
          <GraduationCap className="w-full h-full" />
        </div>
        <div className="absolute top-40 right-32 w-6 h-6 text-purple-400/30 animate-float" style={{ animationDelay: '1s' }}>
          <Star className="w-full h-full" />
        </div>
        <div className="absolute bottom-32 left-32 w-10 h-10 text-green-400/30 animate-float" style={{ animationDelay: '2s' }}>
          <Lightbulb className="w-full h-full" />
        </div>
        <div className="absolute bottom-20 right-20 w-8 h-8 text-indigo-400/30 animate-float" style={{ animationDelay: '3s' }}>
          <BookOpen className="w-full h-full" />
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
        className="fixed w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full pointer-events-none z-50 mix-blend-difference transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 6,
          top: mousePosition.y - 6,
          transform: `scale(${mousePosition.x > 0 ? 1 : 0})`,
          animationDelay: '0.1s'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Enhanced Header */}
        <div className={`bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 rounded-3xl p-8 text-white mb-8 shadow-2xl transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'} relative overflow-hidden`}>
          {/* Animated Background Pattern */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-indigo-500/20 animate-pulse"></div>
            <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full animate-ping"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/10 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-white/5 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="transform hover:scale-105 transition-all duration-300">
              <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent animate-pulse">
                Smart Mentor-Mentee System
              </h1>
              <p className="text-purple-100 text-lg md:text-xl">
                Connect with industry experts and accelerate your learning journey
              </p>
            </div>
            <div className="mt-6 md:mt-0 flex items-center space-x-6">
              <div className="text-center transform hover:scale-110 transition-all duration-300">
                <div className="relative">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 animate-pulse">
                    <span className="text-2xl font-bold text-white">2</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
                </div>
                <p className="text-purple-100 text-sm mt-2">Active Mentors</p>
              </div>
              <div className="text-center transform hover:scale-110 transition-all duration-300">
                <div className="relative">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 animate-pulse" style={{ animationDelay: '0.5s' }}>
                    <span className="text-2xl font-bold text-white">24</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                </div>
                <p className="text-purple-100 text-sm mt-2">Hours This Month</p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Tabs */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 mb-6 transform hover:scale-[1.01] transition-all duration-500">
          <div className="flex border-b border-gray-200">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-6 py-4 text-sm font-medium text-center border-b-2 transition-all duration-300 transform hover:scale-105 ${
                  activeTab === tab.id
                    ? 'border-purple-600 text-purple-600 bg-gradient-to-r from-purple-50 to-pink-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-center space-x-2">
                  <div className={`transform transition-transform duration-300 ${activeTab === tab.id ? 'scale-110' : ''}`}>
                    {tab.icon}
                  </div>
                  <span>{tab.name}</span>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium transition-all duration-300 ${
                    activeTab === tab.id 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Find Mentors Tab */}
        {activeTab === 'find-mentors' && (
          <div className="space-y-6">
            {/* Enhanced Search and Filters */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/50 transform hover:scale-[1.01] transition-all duration-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 animate-pulse"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by skills, name, or company..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:shadow-md"
                  />
                </div>
                <div className="relative">
                  <button
                    className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-300 transform hover:scale-105"
                    onClick={() => setShowFilters((prev) => !prev)}
                    type="button"
                  >
                    <Filter className="w-4 h-4" />
                    <span>More Filters</span>
                  </button>
                  {showFilters && (
                    <div className="absolute right-0 mt-2 w-64 bg-white/90 backdrop-blur-xl border border-gray-200 rounded-xl shadow-2xl z-10 p-4 flex flex-col gap-4 animate-slideDown">
                      {/* Skill Filter */}
                      <div className="transform hover:scale-105 transition-all duration-300">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Skill</label>
                        <select value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300">
                          <option>All Skills</option>
                          <option>Machine Learning</option>
                          <option>Web Development</option>
                          <option>Data Science</option>
                        </select>
                      </div>
                      {/* Location Filter */}
                      <div className="transform hover:scale-105 transition-all duration-300">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <select value={locationFilter} onChange={e => setLocationFilter(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300">
                          <option value="All">All Locations</option>
                          <option value="San Francisco, CA">San Francisco, CA</option>
                          <option value="New York, NY">New York, NY</option>
                          <option value="Boston, MA">Boston, MA</option>
                        </select>
                      </div>
                      {/* Availability Filter */}
                      <div className="transform hover:scale-105 transition-all duration-300">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
                        <select value={availabilityFilter} onChange={e => setAvailabilityFilter(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300">
                          <option value="All">All</option>
                          <option value="Available">Available Now</option>
                          <option value="Unavailable">Unavailable</option>
                        </select>
                      </div>
                      {/* Rating Filter */}
                      <div className="transform hover:scale-105 transition-all duration-300">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                        <select value={ratingFilter} onChange={e => setRatingFilter(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300">
                          <option value="All">All Ratings</option>
                          <option value="4.0">4.0+</option>
                          <option value="4.5">4.5+</option>
                          <option value="5.0">5.0</option>
                        </select>
                      </div>
                      {/* Experience Filter */}
                      <div className="transform hover:scale-105 transition-all duration-300">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                        <select value={experienceFilter} onChange={e => setExperienceFilter(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300">
                          <option value="All">All Experience</option>
                          <option value="Junior">Junior</option>
                          <option value="Mid">Mid</option>
                          <option value="Senior">Senior</option>
                          <option value="Professor">Professor</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Enhanced Mentors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMentors.map((mentor, index) => (
                <div 
                  key={mentor.id} 
                  className={`bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.03] hover:-translate-y-2 relative group ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                  onMouseEnter={() => setHoveredMentor(mentor.id)}
                  onMouseLeave={() => setHoveredMentor(null)}
                >
                  {/* Card Background Animation */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${hoveredMentor === mentor.id ? 'from-purple-500/10 to-pink-500/10' : 'from-transparent to-transparent'} transition-all duration-500`}></div>
                  
                  <div className="relative z-10 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <img
                            src={mentor.image}
                            alt={mentor.name}
                            className="w-12 h-12 rounded-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${mentor.available ? 'bg-green-500 animate-ping' : 'bg-gray-300'}`}></div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">{mentor.name}</h3>
                          <p className="text-sm text-gray-600">{mentor.title}</p>
                        </div>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${mentor.available ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{mentor.bio}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {mentor.expertise.map((skill, skillIndex) => (
                        <span 
                          key={skillIndex} 
                          className="px-2 py-1 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-600 text-xs rounded-full border border-purple-200 transform hover:scale-110 transition-all duration-300"
                          style={{ transitionDelay: `${skillIndex * 100}ms` }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center space-x-1 group-hover:text-purple-600 transition-colors duration-300">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span>{mentor.rating} ({mentor.sessions})</span>
                      </div>
                      <div className="flex items-center space-x-1 group-hover:text-purple-600 transition-colors duration-300">
                        <Users className="w-4 h-4" />
                        <span>{mentor.students} students</span>
                      </div>
                      <div className="flex items-center space-x-1 group-hover:text-purple-600 transition-colors duration-300">
                        <MapPin className="w-4 h-4" />
                        <span className="truncate">{mentor.location}</span>
                      </div>
                      <div className="flex items-center space-x-1 group-hover:text-purple-600 transition-colors duration-300">
                        <Clock className="w-4 h-4" />
                        <span>{mentor.price}</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-lg font-medium hover:shadow-xl transition-all duration-300 transform hover:scale-105 group-hover:from-pink-600 group-hover:to-purple-600">
                        Connect
                      </button>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 transition-all duration-300 transform hover:scale-110">
                        <Heart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Enhanced My Mentors Tab */}
        {activeTab === 'my-mentors' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {myMentors.map((mentor, index) => (
                <div 
                  key={mentor.id} 
                  className={`bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/50 transform hover:scale-[1.02] transition-all duration-500 relative overflow-hidden ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 animate-pulse"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <img
                            src={mentor.image}
                            alt={mentor.name}
                            className="w-16 h-16 rounded-full object-cover transform hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{mentor.name}</h3>
                          <p className="text-gray-600">Last contact: {mentor.lastContact}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600 hover:text-purple-600 transition-colors duration-300">
                        <Calendar className="w-4 h-4" />
                        <span>Next session: {mentor.nextSession}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600 hover:text-purple-600 transition-colors duration-300">
                        <Briefcase className="w-4 h-4" />
                        <span>Current focus: {mentor.progress}</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                        <MessageCircle className="w-4 h-4" />
                        <span>Message</span>
                      </button>
                      <button className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                        <Video className="w-4 h-4" />
                        <span>Video Call</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Enhanced Requests Tab */}
        {activeTab === 'requests' && (
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/50 transform hover:scale-[1.01] transition-all duration-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5 animate-pulse"></div>
              
              <div className="relative z-10 flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Create New Request</h3>
                <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  New Request
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {matchingRequests.map((request, index) => (
                <div 
                  key={request.id} 
                  className={`bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/50 transform hover:scale-[1.02] transition-all duration-500 relative overflow-hidden ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${request.status === 'matched' ? 'from-green-500/5 to-emerald-500/5' : 'from-yellow-500/5 to-orange-500/5'} animate-pulse`}></div>
                  
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{request.title}</h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full transform hover:scale-110 transition-transform duration-300 ${
                            request.status === 'matched' 
                              ? 'bg-green-50 text-green-600 border border-green-200' 
                              : 'bg-yellow-50 text-yellow-600 border border-yellow-200'
                          }`}>
                            {request.status === 'matched' ? 'Matched' : 'Pending'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mb-2">{request.type}</p>
                        <p className="text-gray-600 mb-4">{request.description}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {request.skills.map((skill, skillIndex) => (
                        <span 
                          key={skillIndex} 
                          className="px-2 py-1 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 text-xs rounded-full border border-blue-200 transform hover:scale-110 transition-all duration-300"
                          style={{ transitionDelay: `${skillIndex * 100}ms` }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-600">
                        {request.status === 'matched' ? (
                          <span className="flex items-center space-x-1">
                            <Award className="w-4 h-4 text-green-500" />
                            <span>Matched with {request.mentor}</span>
                          </span>
                        ) : (
                          <span>{request.responses} mentor responses</span>
                        )}
                      </div>
                      <button className="text-purple-600 hover:text-purple-700 font-medium text-sm hover:underline transition-all duration-300 transform hover:scale-105">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorSystem;