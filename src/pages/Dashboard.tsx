import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Brain, 
  Video, 
  BookOpen, 
  Users, 
  Award, 
  Zap,
  TrendingUp,
  Clock,
  Target,
  Star,
  PlayCircle,
  Calendar
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  const quickActions = [
    {
      title: 'Start Live Session',
      description: 'Begin a new live session with AI visualization',
      icon: <Brain className="w-6 h-6" />,
      href: '/live-visualizer',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Generate Video',
      description: 'Convert your recordings to animated content',
      icon: <Video className="w-6 h-6" />,
      href: '/video-generator',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Learning Path',
      description: 'Continue your personalized learning journey',
      icon: <BookOpen className="w-6 h-6" />,
      href: '/learning-paths',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Find Mentor',
      description: 'Connect with mentors in your field',
      icon: <Users className="w-6 h-6" />,
      href: '/mentor-system',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const stats = [
    { label: 'Courses Completed', value: user?.role === 'student' ? '12' : '24', icon: <Award className="w-5 h-5" /> },
    { label: 'Hours Learned', value: user?.role === 'student' ? '145' : '320', icon: <Clock className="w-5 h-5" /> },
    { label: 'Certificates Earned', value: user?.role === 'student' ? '3' : '8', icon: <Star className="w-5 h-5" /> },
    { label: 'Current Streak', value: '15 days', icon: <TrendingUp className="w-5 h-5" /> }
  ];

  const recentActivities = [
    { title: 'Completed: Advanced JavaScript Concepts', time: '2 hours ago', type: 'completion' },
    { title: 'New mentor match: Dr. Sarah Johnson', time: '1 day ago', type: 'mentor' },
    { title: 'Generated video: Physics - Wave Properties', time: '3 days ago', type: 'video' },
    { title: 'Live session: Mathematics Q&A', time: '1 week ago', type: 'live' }
  ];

  const recommendedCourses = [
    { title: 'Machine Learning Fundamentals', progress: 0, difficulty: 'Intermediate' },
    { title: 'Data Structures & Algorithms', progress: 25, difficulty: 'Advanced' },
    { title: 'Web Development Bootcamp', progress: 0, difficulty: 'Beginner' }
  ];

  const getRoleSpecificContent = () => {
    switch (user?.role) {
      case 'student':
        return {
          welcome: `Welcome back, ${user.name}! Ready for today's lessons?`,
          primaryAction: 'Continue Learning',
          focus: 'Your next quiz is due tomorrow'
        };
      case 'faculty':
        return {
          welcome: `Good day, Professor ${user.name}! Your students are waiting.`,
          primaryAction: 'Start Teaching',
          focus: 'You have 3 live sessions scheduled today'
        };
      case 'professional':
        return {
          welcome: `Hello ${user.name}! Time to upskill today.`,
          primaryAction: 'Quick Skill Boost',
          focus: 'Complete your certification path: 75% done'
        };
      default:
        return {
          welcome: `Welcome ${user?.name}! Ready to learn something new?`,
          primaryAction: 'Explore Content',
          focus: 'Discover new topics that interest you'
        };
    }
  };

  const roleContent = getRoleSpecificContent();

  return (
    <div className="min-h-screen bg-gray-50 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">{roleContent.welcome}</h1>
              <p className="text-blue-100 text-lg mb-4">{roleContent.focus}</p>
              <div className="flex items-center space-x-4">
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm capitalize">
                  {user?.role?.replace('-', ' ')}
                </span>
                {user?.grade && (
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                    {user.grade}
                  </span>
                )}
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
                {roleContent.primaryAction}
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <div className="text-blue-600">{stat.icon}</div>
                <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
              </div>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  to={action.href}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all group"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${action.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                    {action.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h3>
                  <p className="text-gray-600 text-sm">{action.description}</p>
                </Link>
              ))}
            </div>

            {/* Recommended Courses */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended for You</h2>
            <div className="space-y-4">
              {recommendedCourses.map((course, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
                      <span className="text-sm text-gray-500">{course.difficulty}</span>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700">
                      <PlayCircle className="w-6 h-6" />
                    </button>
                  </div>
                  {course.progress > 0 && (
                    <div className="mb-2">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all" 
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Recent Activity */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Access</h3>
              <div className="space-y-3">
                <Link to="/microlearning" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors">
                  <Zap className="w-4 h-4" />
                  <span className="text-sm">Microlearning Modules</span>
                </Link>
                <Link to="/mentor-system" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">My Mentors</span>
                </Link>
                <button className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Schedule Session</span>
                </button>
                <button className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors">
                  <Target className="w-4 h-4" />
                  <span className="text-sm">Learning Goals</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;