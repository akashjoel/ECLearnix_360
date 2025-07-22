import React, { useState } from 'react';
import { 
  Clock, 
  Star, 
  Play, 
  CheckCircle, 
  Trophy, 
  Zap,
  BookOpen,
  Target,
  Calendar,
  TrendingUp,
  Award,
  Filter
} from 'lucide-react';

const Microlearning = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDuration, setSelectedDuration] = useState('all');

  const categories = [
    { id: 'all', name: 'All Categories', count: 48 },
    { id: 'web-dev', name: 'Web Development', count: 15 },
    { id: 'data-science', name: 'Data Science', count: 12 },
    { id: 'design', name: 'Design', count: 8 },
    { id: 'business', name: 'Business', count: 9 },
    { id: 'marketing', name: 'Marketing', count: 6 }
  ];

  const microModules = [
    {
      id: 1,
      title: 'React Hooks Fundamentals',
      description: 'Master useState, useEffect, and custom hooks in React applications',
      duration: '5 min',
      difficulty: 'Beginner',
      category: 'web-dev',
      progress: 100,
      rating: 4.8,
      students: 1234,
      certificate: true,
      thumbnail: 'https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg?auto=compress&cs=tinysrgb&w=300',
      skills: ['React', 'JavaScript', 'Hooks']
    },
    {
      id: 2,
      title: 'Python Data Visualization',
      description: 'Create stunning charts and graphs using Matplotlib and Seaborn',
      duration: '8 min',
      difficulty: 'Intermediate',
      category: 'data-science',
      progress: 60,
      rating: 4.9,
      students: 856,
      certificate: true,
      thumbnail: 'https://images.pexels.com/photos/3825581/pexels-photo-3825581.jpeg?auto=compress&cs=tinysrgb&w=300',
      skills: ['Python', 'Data Visualization', 'Matplotlib']
    },
    {
      id: 3,
      title: 'CSS Grid Layout Mastery',
      description: 'Build responsive layouts with CSS Grid in minutes',
      duration: '7 min',
      difficulty: 'Intermediate',
      category: 'web-dev',
      progress: 0,
      rating: 4.7,
      students: 2341,
      certificate: true,
      thumbnail: 'https://images.pexels.com/photos/3184424/pexels-photo-3184424.jpeg?auto=compress&cs=tinysrgb&w=300',
      skills: ['CSS', 'Layout', 'Responsive Design']
    },
    {
      id: 4,
      title: 'Agile Project Management',
      description: 'Essential Agile principles for modern project management',
      duration: '6 min',
      difficulty: 'Beginner',
      category: 'business',
      progress: 30,
      rating: 4.6,
      students: 567,
      certificate: false,
      thumbnail: 'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=300',
      skills: ['Project Management', 'Agile', 'Scrum']
    },
    {
      id: 5,
      title: 'UX Research Basics',
      description: 'Learn user research methods to improve your designs',
      duration: '10 min',
      difficulty: 'Beginner',
      category: 'design',
      progress: 0,
      rating: 4.8,
      students: 432,
      certificate: true,
      thumbnail: 'https://images.pexels.com/photos/3184424/pexels-photo-3184424.jpeg?auto=compress&cs=tinysrgb&w=300',
      skills: ['UX Research', 'Design Thinking', 'User Testing']
    },
    {
      id: 6,
      title: 'Social Media Analytics',
      description: 'Track and analyze social media performance effectively',
      duration: '9 min',
      difficulty: 'Intermediate',
      category: 'marketing',
      progress: 80,
      rating: 4.5,
      students: 789,
      certificate: true,
      thumbnail: 'https://images.pexels.com/photos/3825581/pexels-photo-3825581.jpeg?auto=compress&cs=tinysrgb&w=300',
      skills: ['Social Media', 'Analytics', 'Marketing']
    }
  ];

  const streakData = {
    current: 15,
    best: 28,
    thisWeek: 5,
    thisMonth: 22
  };

  const completedCertificates = [
    { name: 'Web Development Fundamentals', date: '2024-01-10', skills: 8 },
    { name: 'Data Analysis Basics', date: '2024-01-05', skills: 6 },
    { name: 'Digital Marketing Essentials', date: '2023-12-28', skills: 5 }
  ];

  const filteredModules = microModules.filter(module => {
    const categoryMatch = selectedCategory === 'all' || module.category === selectedCategory;
    const durationMatch = selectedDuration === 'all' || 
      (selectedDuration === 'short' && parseInt(module.duration) <= 5) ||
      (selectedDuration === 'medium' && parseInt(module.duration) > 5 && parseInt(module.duration) <= 10) ||
      (selectedDuration === 'long' && parseInt(module.duration) > 10);
    
    return categoryMatch && durationMatch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-50';
      case 'Intermediate': return 'text-yellow-600 bg-yellow-50';
      case 'Advanced': return 'text-red-600 bg-red-50';
      default: return 'text-blue-600 bg-blue-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-8 text-white mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Microlearning Hub</h1>
              <p className="text-green-100 text-lg">
                Quick skill boosts in bite-sized modules perfect for busy professionals
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-6">
              <div className="text-center">
                <p className="text-2xl font-bold">{streakData.current}</p>
                <p className="text-green-100 text-sm">Day Streak</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">24</p>
                <p className="text-green-100 text-sm">Completed</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Learning Streak */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-yellow-500" />
                Learning Streak
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Current</span>
                  <span className="font-bold text-2xl text-green-600">{streakData.current} days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Best</span>
                  <span className="font-semibold text-gray-900">{streakData.best} days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">This week</span>
                  <span className="font-semibold text-gray-900">{streakData.thisWeek}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">This month</span>
                  <span className="font-semibold text-gray-900">{streakData.thisMonth}</span>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === category.id 
                        ? 'bg-green-50 text-green-600 border border-green-200' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{category.name}</span>
                      <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">
                        {category.count}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration
                  </label>
                  <select 
                    value={selectedDuration}
                    onChange={(e) => setSelectedDuration(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="all">All Durations</option>
                    <option value="short">≤ 5 minutes</option>
                    <option value="medium">6-10 minutes</option>
                    <option value="long">{'>'} 10 minutes</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Certificates */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2 text-yellow-500" />
                Certificates
              </h3>
              <div className="space-y-3">
                {completedCertificates.map((cert, index) => (
                  <div key={index} className="border-l-4 border-yellow-400 pl-3">
                    <p className="text-sm font-medium text-gray-900 line-clamp-1">
                      {cert.name}
                    </p>
                    <p className="text-xs text-gray-500">{cert.date}</p>
                    <p className="text-xs text-yellow-600">{cert.skills} skills mastered</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Modules Completed', value: '24', icon: <CheckCircle className="w-5 h-5" />, color: 'text-green-600' },
                { label: 'Skills Gained', value: '18', icon: <Target className="w-5 h-5" />, color: 'text-blue-600' },
                { label: 'Time Saved', value: '2.5h', icon: <Clock className="w-5 h-5" />, color: 'text-purple-600' },
                { label: 'Certificates', value: '3', icon: <Trophy className="w-5 h-5" />, color: 'text-yellow-600' }
              ].map((stat, index) => (
                <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <div className={stat.color}>{stat.icon}</div>
                    <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                  </div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Modules Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredModules.map((module) => (
                <div key={module.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src={module.thumbnail} 
                      alt={module.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(module.difficulty)}`}>
                        {module.difficulty}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <div className="bg-black/50 text-white px-2 py-1 rounded text-xs flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {module.duration}
                      </div>
                    </div>
                    {module.certificate && (
                      <div className="absolute bottom-3 right-3">
                        <Trophy className="w-5 h-5 text-yellow-400" />
                      </div>
                    )}
                    {module.progress > 0 && (
                      <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm h-2">
                        <div 
                          className="bg-green-600 h-2 transition-all" 
                          style={{ width: `${module.progress}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                        {module.title}
                      </h3>
                      {module.progress === 100 && (
                        <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 ml-2" />
                      )}
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {module.description}
                    </p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span>{module.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <BookOpen className="w-4 h-4" />
                        <span>{module.students}</span>
                      </div>
                    </div>
                    
                    {module.progress > 0 && module.progress < 100 && (
                      <div className="mb-4">
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>Progress</span>
                          <span>{module.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full transition-all" 
                            style={{ width: `${module.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                    
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {module.skills.slice(0, 2).map((skill, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">
                            {skill}
                          </span>
                        ))}
                        {module.skills.length > 2 && (
                          <span className="px-2 py-1 bg-gray-50 text-gray-500 text-xs rounded-full">
                            +{module.skills.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <button className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 px-4 rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center space-x-2">
                      {module.progress === 0 ? (
                        <>
                          <Play className="w-4 h-4" />
                          <span>Start Module</span>
                        </>
                      ) : module.progress === 100 ? (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          <span>Review</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4" />
                          <span>Continue</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Daily Goal Progress */}
            <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-6 border border-green-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-green-600" />
                  Daily Learning Goal
                </h3>
                <span className="text-sm text-green-600 font-medium">2/3 modules today</span>
              </div>
              <div className="w-full bg-green-200 rounded-full h-3 mb-3">
                <div className="bg-green-600 h-3 rounded-full transition-all" style={{ width: '67%' }}></div>
              </div>
              <p className="text-sm text-gray-600">
                Great progress! Complete 1 more module to reach your daily goal and maintain your streak.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Microlearning;