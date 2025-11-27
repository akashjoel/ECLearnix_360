import React from 'react';
import { Play, Star, Clock, Users } from 'lucide-react';

interface CourseCardProps {
  title: string;
  instructor: string;
  duration: string;
  rating: number;
  students: number;
  image: string;
  category: string;
  isNew?: boolean;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  title,
  instructor,
  duration,
  rating,
  students,
  image,
  category,
  isNew = false
}) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 group cursor-pointer animate-slideIn3d overflow-hidden">
      {/* Course Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {isNew && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse3d">
            NEW
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <Play className="w-5 h-5 text-gray-800 ml-1" />
        </div>
      </div>

      {/* Course Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            {category}
          </span>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-semibold text-gray-900">{rating}</span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
          {title}
        </h3>

        <p className="text-gray-600 text-sm mb-4">
          by <span className="font-semibold text-gray-800">{instructor}</span>
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{students.toLocaleString()} students</span>
          </div>
        </div>
      </div>
    </div>
  );
}; 