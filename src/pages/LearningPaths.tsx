import React, { useState } from 'react';
import { 
  BookOpen, 
  Star, 
  Clock, 
  Users, 
  Trophy, 
  Target,
  Play,
  CheckCircle,
  Lock,
  Zap
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const LearningPaths = () => {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('recommended');

  const categories = [
    { id: 'recommended', name: 'Recommended for You', count: 12 },
    { id: 'in-progress', name: 'In Progress', count: 3 },
    { id: 'completed', name: 'Completed', count: 8 },
    { id: 'saved', name: 'Saved for Later', count: 5 }
  ];

  const learningPaths = [
    {
      id: 1,
      title: 'Complete Web Development',
      description: 'Master HTML, CSS, JavaScript, React, and backend development',
      level: 'Beginner to Advanced',
      duration: '120 hours',
      students: '15,234',
      rating: 4.8,
      progress: 35,
      modules: 12,
      completedModules: 4,
      category: 'recommended',
      skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'],
      thumbnail: 'https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      title: 'Data Science Fundamentals',
      description: 'Learn Python, statistics, machine learning, and data visualization',
      level: 'Intermediate',
      duration: '80 hours',
      students: '8,567',
      rating: 4.9,
      progress: 0,
      modules: 10,
      completedModules: 0,
      category: 'recommended',
      skills: ['Python', 'Pandas', 'NumPy', 'Machine Learning'],
      thumbnail: 'https://images.pexels.com/photos/3825581/pexels-photo-3825581.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      title: 'Digital Marketing Mastery',
      description: 'Complete guide to SEO, social media, content marketing, and analytics',
      level: 'Beginner',
      duration: '45 hours',
      students: '12,890',
      rating: 4.7,
      progress: 100,
      modules: 8,
      completedModules: 8,
      category: 'completed',
      skills: ['SEO', 'Social Media', 'Analytics', 'Content Marketing'],
      thumbnail: 'https://images.pexels.com/photos/3184424/pexels-photo-3184424.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 4,
      title: 'Mobile App Development',
      description: 'Build iOS and Android apps using React Native and Flutter',
      level: 'Intermediate',
      duration: '95 hours',
      students: '6,234',
      rating: 4.6,
      progress: 65,
      modules: 14,
      completedModules: 9,
      category: 'in-progress',
      skills: ['React Native', 'Flutter', 'Mobile UI/UX'],
      thumbnail: 'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const recommendedSkills = [
    { name: 'JavaScript', demand: 95, growth: '+23%' },
    { name: 'Python', demand: 89, growth: '+18%' },
    { name: 'React', demand: 82, growth: '+31%' },
    { name: 'Data Science', demand: 78, growth: '+45%' },
    { name: 'Machine Learning', demand: 71, growth: '+52%' }
  ];

  const filteredPaths = learningPaths.filter(path => 
    selectedCategory === 'recommended' ? 
    (path.category === 'recommended' || path.progress > 0 && path.progress < 100) : 
    path.category === selectedCategory
  );

  const getLevelColor = (level: string) => {
    switch (level) {
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
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Personalized Learning Paths</h1>
              <p className="text-blue-100 text-lg">
                AI-curated learning journeys tailored to your goals and skill level
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <div className="text-center">
                <p className="text-2xl font-bold">12</p>
                <p className="text-blue-100 text-sm">Active Paths</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">67%</p>
                <p className="text-blue-100 text-sm">Avg Progress</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
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
                        ? 'bg-blue-50 text-blue-600 border border-blue-200' 
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

            {/* Skill Demand */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Trending Skills</h3>
              <div className="space-y-4">
                {recommendedSkills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                      <span className="text-xs text-green-600 font-medium">{skill.growth}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all" 
                        style={{ width: `${skill.demand}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors flex items-center space-x-2">
                  <Target className="w-4 h-4" />
                  <span>Set Learning Goals</span>
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors flex items-center space-x-2">
                  <Zap className="w-4 h-4" />
                  <span>Take Skill Assessment</span>
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors flex items-center space-x-2">
                  <BookOpen className="w-4 h-4" />
                  <span>Browse All Courses</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Learning Paths Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPaths.map((path) => (
                <div key={path.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src={path.thumbnail} 
                      alt={path.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(path.level)}`}>
                        {path.level}
                      </span>
                    </div>
                    {path.progress > 0 && (
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="bg-white/90 backdrop-blur-sm rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all" 
                            style={{ width: `${path.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                        {path.title}
                      </h3>
                      {path.progress === 100 && (
                        <Trophy className="w-5 h-5 text-yellow-500 flex-shrink-0 ml-2" />
                      )}
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {path.description}
                    </p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{path.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{path.students}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span>{path.rating}</span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Progress</span>
                        <span>{path.completedModules}/{path.modules} modules</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all" 
                          style={{ width: `${(path.completedModules / path.modules) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {path.skills.slice(0, 3).map((skill, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">
                            {skill}
                          </span>
                        ))}
                        {path.skills.length > 3 && (
                          <span className="px-2 py-1 bg-gray-50 text-gray-500 text-xs rounded-full">
                            +{path.skills.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <button className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all">
                        {path.progress === 0 ? (
                          <>
                            <Play className="w-4 h-4" />
                            <span>Start Learning</span>
                          </>
                        ) : path.progress === 100 ? (
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
                      
                      <button className="text-gray-400 hover:text-gray-600">
                        <BookOpen className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* AI Recommendations */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    AI Recommendation
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Based on your progress in Web Development and current industry trends, 
                    we recommend adding "Cloud Computing Fundamentals" to your learning path. 
                    This will complement your existing skills and increase your job market value by 34%.
                  </p>
                  <div className="flex items-center space-x-3">
                    <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:shadow-md transition-all border border-purple-200">
                      View Course
                    </button>
                    <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                      Tell me more
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningPaths;