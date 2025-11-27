import React from 'react';
import { X, User } from 'lucide-react';
import { Expert } from '../types/booking';

interface ExpertHeaderProps {
  expert: Expert;
  onClose: () => void;
}

export const ExpertHeader: React.FC<ExpertHeaderProps> = ({ expert, onClose }) => {
  return (
    <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-t-2xl relative">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-purple-100 transition-colors"
      >
        <X size={24} />
      </button>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <div className="w-16 h-16 bg-purple-400 rounded-full flex items-center justify-center">
            <User size={32} className="text-purple-100" />
          </div>
          {expert.isOnline && (
            <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
          )}
        </div>
        
        <div>
          <h1 className="text-2xl font-bold">Book Session with {expert.name}</h1>
          <p className="text-purple-100 text-lg">{expert.title}</p>
        </div>
      </div>
    </div>
  );
}; 