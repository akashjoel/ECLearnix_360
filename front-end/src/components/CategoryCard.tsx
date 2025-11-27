import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  courseCount: number;
  color: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  description,
  icon: Icon,
  courseCount,
  color
}) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 group cursor-pointer animate-slideIn3d overflow-hidden">
      <div className="p-8">
        {/* Icon */}
        <div className={`w-16 h-16 ${color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
          <Icon className="w-8 h-8 text-white" />
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-gray-600 text-sm leading-relaxed mb-6">
          {description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-500">
            {courseCount} courses
          </span>
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300">
            <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
          </div>
        </div>
      </div>
    </div>
  );
}; 