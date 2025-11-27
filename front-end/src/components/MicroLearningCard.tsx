import React from 'react';
import { Play, CheckCircle, Clock } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  duration: string;
  topic: string;
  completed?: boolean;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  duration,
  topic,
  completed = false
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 group cursor-pointer animate-slideIn3d overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
            {topic}
          </span>
          {completed ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : (
            <div className="w-5 h-5 bg-gray-200 rounded-full group-hover:bg-blue-200 transition-colors duration-300" />
          )}
        </div>

        {/* Title */}
        <h3 className="text-sm font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
          {title}
        </h3>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <Clock className="w-3 h-3" />
            <span>{duration}</span>
          </div>
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
            <Play className="w-3 h-3 text-blue-600 ml-0.5" />
          </div>
        </div>
      </div>
    </div>
  );
}; 