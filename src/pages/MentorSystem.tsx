import React, { useState } from 'react';
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
  Award
} from 'lucide-react';

const MentorSystem = () => {
  const [activeTab, setActiveTab] = useState('find-mentors');
  const [searchQuery, setSearchQuery] = useState('');

  const mentors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      title: 'Senior Data Scientist at Google',
      expertise: ['Machine Learning', 'Python', 'Data Science'],
      rating: 4.9,
      students: 156,
      sessions: 89,
      location: 'San Francisco, CA',
      price: '$120/hour',
      image: 'https://images.pexels.com/photos/3184424/pexels-photo-3184424.jpeg?auto=compress&cs=tinysrgb&w=150',
      available: true,
      bio: 'Experienced data scientist with 8+ years at top tech companies. Specialized in ML algorithms and deep learning.'
    },
    {
      id: 2,
      name: 'Michael Chen',
      title: 'Full-Stack Developer & Tech Lead',
      expertise: ['React', 'Node.js', 'System Design'],
      rating: 4.8,
      students: 203,
      sessions: 142,
      location: 'New York, NY',
      price: '$90/hour',
      image: 'https://images.pexels.com/photos/3825581/pexels-photo-3825581.jpeg?auto=compress&cs=tinysrgb&w=150',
      available: true,
      bio: 'Tech lead with expertise in modern web development and scalable system architecture.'
    },
    {
      id: 3,
      name: 'Prof. Elena Rodriguez',
      title: 'Computer Science Professor',
      expertise: ['Algorithms', 'Computer Science', 'Academic Research'],
      rating: 5.0,
      students: 89,
      sessions: 67,
      location: 'Boston, MA',
      price: '$80/hour',
      image: 'https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg?auto=compress&cs=tinysrgb&w=150',
      available: false,
      bio: 'PhD in Computer Science, published researcher with 15+ years of teaching experience.'
    }
  ];

  const myMentors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      nextSession: '2024-01-15 2:00 PM',
      lastContact: '2 days ago',
      progress: 'Working on ML project',
      image: 'https://images.pexels.com/photos/3184424/pexels-photo-3184424.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: 2,
      name: 'Michael Chen',
      nextSession: '2024-01-18 4:00 PM',
      lastContact: '5 days ago',
      progress: 'Code review session',
      image: 'https://images.pexels.com/photos/3825581/pexels-photo-3825581.jpeg?auto=compress&cs=tinysrgb&w=150'
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
      mentor: 'Dr. Sarah Johnson'
    }
  ];

  const tabs = [
    { id: 'find-mentors', name: 'Find Mentors', count: mentors.length },
    { id: 'my-mentors', name: 'My Mentors', count: myMentors.length },
    { id: 'requests', name: 'My Requests', count: matchingRequests.length }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Smart Mentor-Mentee System</h1>
              <p className="text-purple-100 text-lg">
                Connect with industry experts and accelerate your learning journey
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-6">
              <div className="text-center">
                <p className="text-2xl font-bold">2</p>
                <p className="text-purple-100 text-sm">Active Mentors</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">24</p>
                <p className="text-purple-100 text-sm">Hours This Month</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
          <div className="flex border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-6 py-4 text-sm font-medium text-center border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <span>{tab.name}</span>
                  <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
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
            {/* Search and Filters */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by skills, name, or company..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div className="flex space-x-4">
                  <select className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option>All Skills</option>
                    <option>Machine Learning</option>
                    <option>Web Development</option>
                    <option>Data Science</option>
                  </select>
                  <select className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option>All Prices</option>
                    <option>$0-50/hour</option>
                    <option>$51-100/hour</option>
                    <option>$101-150/hour</option>
                  </select>
                  <button className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Filter className="w-4 h-4" />
                    <span>More Filters</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Mentors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mentors.map((mentor) => (
                <div key={mentor.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={mentor.image}
                          alt={mentor.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900">{mentor.name}</h3>
                          <p className="text-sm text-gray-600">{mentor.title}</p>
                        </div>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${mentor.available ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{mentor.bio}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {mentor.expertise.map((skill, index) => (
                        <span key={index} className="px-2 py-1 bg-purple-50 text-purple-600 text-xs rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span>{mentor.rating} ({mentor.sessions})</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{mentor.students} students</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span className="truncate">{mentor.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{mentor.price}</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-lg font-medium hover:shadow-lg transition-all">
                        Connect
                      </button>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        <Heart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* My Mentors Tab */}
        {activeTab === 'my-mentors' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {myMentors.map((mentor) => (
                <div key={mentor.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={mentor.image}
                        alt={mentor.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{mentor.name}</h3>
                        <p className="text-gray-600">Last contact: {mentor.lastContact}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>Next session: {mentor.nextSession}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Briefcase className="w-4 h-4" />
                      <span>Current focus: {mentor.progress}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span>Message</span>
                    </button>
                    <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors">
                      <Video className="w-4 h-4" />
                      <span>Video Call</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Requests Tab */}
        {activeTab === 'requests' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Create New Request</h3>
                <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all">
                  New Request
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {matchingRequests.map((request) => (
                <div key={request.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{request.title}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          request.status === 'matched' 
                            ? 'bg-green-50 text-green-600' 
                            : 'bg-yellow-50 text-yellow-600'
                        }`}>
                          {request.status === 'matched' ? 'Matched' : 'Pending'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">{request.type}</p>
                      <p className="text-gray-600 mb-4">{request.description}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {request.skills.map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      {request.status === 'matched' ? (
                        <span className="flex items-center space-x-1">
                          <Award className="w-4 h-4" />
                          <span>Matched with {request.mentor}</span>
                        </span>
                      ) : (
                        <span>{request.responses} mentor responses</span>
                      )}
                    </div>
                    <button className="text-purple-600 hover:text-purple-700 font-medium text-sm">
                      View Details
                    </button>
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