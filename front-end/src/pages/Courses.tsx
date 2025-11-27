import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Clock, 
  Users, 
  Star, 
  TrendingUp, 
  BookOpen, 
  Play,
  CheckCircle,
  Award,
  Target,
  DollarSign,
  Calendar,
  Code,
  Database,
  Globe,
  Smartphone,
  Zap,
  Brain,
  Rocket,
  Crown,
  Heart,
  Share2,
  Download,
  MessageSquare,
  Video,
  FileText,
  BarChart3,
  Settings,
  ChevronRight,
  ChevronDown,
  Plus,
  Minus,
  Sparkles,
  Layers,
  Cpu,
  Palette,
  Search,
  Filter,
  Shield
} from 'lucide-react';
import { getAllCourses, Course } from '../data/courses';

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setCourses(getAllCourses());
    setIsVisible(true);
  }, []);

  const categories = [
    { id: 'all', name: 'All Courses', icon: <BookOpen className="w-4 h-4" />, color: 'from-blue-500 to-cyan-500' },
    { id: 'web-dev', name: 'Web Development', icon: <Code className="w-4 h-4" />, color: 'from-purple-500 to-pink-500' },
    { id: 'data-science', name: 'Data Science', icon: <Database className="w-4 h-4" />, color: 'from-green-500 to-emerald-500' },
    { id: 'mobile', name: 'Mobile Development', icon: <Smartphone className="w-4 h-4" />, color: 'from-orange-500 to-red-500' },
    { id: 'cybersecurity', name: 'Cybersecurity', icon: <Shield className="w-4 h-4" />, color: 'from-indigo-500 to-purple-500' },
    { id: 'ai-ml', name: 'AI & Machine Learning', icon: <Brain className="w-4 h-4" />, color: 'from-yellow-500 to-orange-500' }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'all' || 
      course.skills.some(skill => 
        categories.find(cat => cat.id === selectedCategory)?.name.toLowerCase().includes(skill.toLowerCase())
      );
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const stats = [
    { label: 'Total Courses', value: courses.length.toString(), icon: <BookOpen className="w-5 h-5" />, color: 'from-blue-500 to-cyan-500' },
    { label: 'Total Students', value: '52,000+', icon: <Users className="w-5 h-5" />, color: 'from-green-500 to-emerald-500' },
    { label: 'Avg Rating', value: '4.8', icon: <Star className="w-5 h-5" />, color: 'from-yellow-500 to-orange-500' },
    { label: 'Success Rate', value: '94%', icon: <TrendingUp className="w-5 h-5" />, color: 'from-purple-500 to-pink-500' }
  ];

    return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Floating Circles */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full animate-bounce" style={{ animationDuration: '6s' }}></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full animate-bounce" style={{ animationDuration: '8s', animationDelay: '2s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-br from-green-400/20 to-yellow-400/20 rounded-full animate-bounce" style={{ animationDuration: '7s', animationDelay: '1s' }}></div>
        
        {/* Moving Lines */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent animate-pulse"></div>
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* Floating Particles */}
        <div className="absolute top-1/3 left-1/3 w-2 h-2 bg-purple-400/40 rounded-full animate-ping"></div>
        <div className="absolute top-2/3 right-1/4 w-3 h-3 bg-blue-400/40 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-pink-400/40 rounded-full animate-ping" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header */}
        <div className={`text-center mb-12 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>
                     <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
             Explore Our Courses
           </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Master in-demand skills with our comprehensive courses designed by industry experts
          </p>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/50 transform hover:scale-105 transition-all duration-500"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                                 <div className={`inline-flex p-3 bg-gradient-to-r ${stat.color} rounded-xl mb-3 animate-bounce`}>
                   {stat.icon}
                 </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/50 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search courses by title, description, or technologies..."
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

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, index) => (
            <Link 
              key={course.id} 
              to={`/course/${course.id}`}
              className={`transform transition-all duration-500 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 overflow-hidden transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl group">
                {/* Course Header */}
                <div className="relative bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 p-6 text-white">
                  <div className="flex items-center gap-3 mb-4">
                    {course.tags.map((tag, tagIndex) => (
                      <span
                        key={tag}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          tagIndex === 0 ? 'bg-blue-500/20 text-blue-200' :
                          tagIndex === 1 ? 'bg-orange-500/20 text-orange-200' :
                          'bg-yellow-500/20 text-yellow-200'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                  <p className="text-blue-100 text-sm line-clamp-2">{course.description}</p>
                </div>

                {/* Course Content */}
                <div className="p-6">
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="w-4 h-4 text-green-500" />
                      <span>{course.students} students</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span>{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <TrendingUp className="w-4 h-4 text-purple-500" />
                      <span>{course.completionRate}% completion</span>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {course.skills.map((skill) => (
                      <span key={skill} className="px-2 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {course.technologies.slice(0, 3).map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                        {tech}
                      </span>
                    ))}
                    {course.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-gray-50 text-gray-600 rounded-full text-xs font-medium">
                        +{course.technologies.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Pricing and Progress */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-gray-900">{course.price}</span>
                        <span className="text-sm text-gray-500 line-through ml-2">{course.originalPrice}</span>
                      </div>
                      <span className="text-green-600 font-medium text-sm">{course.discount}</span>
                    </div>

                    {/* Progress Bar */}
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{course.progress.completed}/{course.progress.total} modules</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(course.progress.completed / course.progress.total) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      {/* Main Action Button */}
                      <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105 group-hover:from-purple-700 group-hover:to-pink-700 animate-pulse relative overflow-hidden">
                        {/* Animated Background Elements */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-20 animate-pulse"></div>
                        
                        {/* Floating Particles Inside Button */}
                        <div className="absolute top-2 left-4 w-1 h-1 bg-white/60 rounded-full animate-ping"></div>
                        <div className="absolute top-3 right-6 w-1 h-1 bg-white/40 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                        <div className="absolute bottom-3 left-1/3 w-1 h-1 bg-white/50 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
                        
                        {/* Animated Border Lines */}
                        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right" style={{ transitionDelay: '0.2s' }}></div>
                        
                        {/* Button Content */}
                        <div className="relative z-10 flex flex-col items-center justify-center">
                          <span className="font-bold text-lg">
                            {course.id === "2" ? "Start Learning" : "View Course"}
                          </span>
                          {course.id === "2" && (
                            <div className="flex items-center gap-2 mt-1 text-xs opacity-90">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {course.duration}
                              </span>
                              <span className="flex items-center gap-1">
                                <Star className="w-3 h-3 fill-current" />
                                {course.rating}
                              </span>
                              <span className="flex items-center gap-1">
                                <TrendingUp className="w-3 h-3" />
                                {course.completionRate}%
                              </span>
                            </div>
                          )}
                          <ChevronRight className="w-4 h-4 mt-1 animate-bounce" />
                        </div>
                        
                        {/* Sparkle Effect */}
                        <div className="absolute top-1 right-2 w-2 h-2 bg-yellow-300 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute bottom-1 left-2 w-1.5 h-1.5 bg-cyan-300 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ animationDelay: '0.5s' }}></div>
                      </button>

                      {/* Quiz Button */}
                      <Link to={`/quiz/${course.id}`} className="block">
                        <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:from-orange-600 hover:to-red-600 relative overflow-hidden group">
                          {/* Animated Background */}
                          <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          
                          {/* Quiz Icon and Text */}
                          <div className="relative z-10 flex items-center justify-center space-x-2">
                            <Brain className="w-5 h-5" />
                            <span className="font-semibold">Take Quiz</span>
                            <span className="text-xs opacity-90">Test Your Knowledge</span>
                          </div>
                          
                          {/* Animated Border */}
                          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-yellow-400 to-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* No Results */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or browse all categories</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses; 