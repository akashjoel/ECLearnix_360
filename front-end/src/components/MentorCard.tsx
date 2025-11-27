import React, { useState } from 'react';
import { 
  Star, 
  Users, 
  MapPin, 
  Clock, 
  Heart,
  MessageSquare,
  Award,
  CheckCircle
} from 'lucide-react';
import SmartBookingPanel from './SmartBookingPanel';

interface MentorCardProps {
  mentor: {
    id: string;
    name: string;
    specialization: string;
    bio: string;
    skills: string[];
    rating: number;
    students: number;
    location: string;
    hourlyRate: number;
    avatar: string;
    isOnline?: boolean;
    badges?: string[];
  };
  onBookSession?: (mentor: any) => void;
}

const MentorCard: React.FC<MentorCardProps> = ({ mentor, onBookSession }) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const handleConnect = () => {
    if (onBookSession) {
      onBookSession(mentor);
    } else {
      setIsBookingOpen(true);
    }
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02] group cursor-pointer border border-gray-100 overflow-hidden">
        {/* Header with Profile Info */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {mentor.avatar ? (
                    <img 
                      src={mentor.avatar} 
                      alt={mentor.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    mentor.name.split(' ').map(n => n[0]).join('')
                  )}
                </div>
                {mentor.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                    {mentor.name}
                  </h3>
                  {mentor.badges?.includes('verified') && (
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                  )}
                </div>
                <p className="text-sm text-gray-600 font-medium">
                  {mentor.specialization}
                </p>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsFavorited(!isFavorited);
              }}
              className={`p-2 rounded-full border transition-all duration-300 transform hover:scale-110 ${
                isFavorited 
                  ? 'bg-red-50 border-red-200 text-red-500' 
                  : 'bg-gray-50 border-gray-200 text-gray-400 hover:border-red-200 hover:text-red-500'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Bio */}
          <p className="text-gray-700 text-sm leading-relaxed mb-4">
            {mentor.bio}
          </p>

          {/* Skills */}
          <div className="flex flex-wrap gap-2 mb-4">
            {mentor.skills.map((skill, index) => (
              <span
                key={skill}
                className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-full border border-purple-200 hover:bg-purple-100 transition-colors duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Stats Row 1 */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-1 text-gray-600">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium">{mentor.rating}</span>
              <span className="text-xs text-gray-500">({Math.floor(mentor.students * 0.1)})</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-600">
              <Users className="w-4 h-4" />
              <span className="text-sm font-medium">{mentor.students.toLocaleString()} students</span>
            </div>
          </div>

          {/* Stats Row 2 */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-1 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{mentor.location}</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-600">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">₹{mentor.hourlyRate.toLocaleString()}/hour</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={handleConnect}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-xl font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105 group-hover:from-purple-700 group-hover:to-pink-700"
            >
              Connect
            </button>
            <button className="p-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300 transform hover:scale-105">
              <MessageSquare className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Badges Section */}
        {mentor.badges && mentor.badges.length > 0 && (
          <div className="px-6 pb-4">
            <div className="flex flex-wrap gap-2">
              {mentor.badges.map((badge, index) => (
                <span
                  key={badge}
                  className="px-2 py-1 bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 text-xs font-medium rounded-full border border-yellow-200"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Smart Booking Panel */}
      <SmartBookingPanel
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        mentor={mentor}
      />
    </>
  );
};

export default MentorCard; 