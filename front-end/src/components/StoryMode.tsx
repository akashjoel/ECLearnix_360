import React, { useState } from 'react';
import { MapPin, BookOpen, Lock, Star, Compass } from 'lucide-react';

interface StoryModeProps {
  currentStory: string;
  unlockedLocations: string[];
  storyProgress: number;
}

const StoryMode: React.FC<StoryModeProps> = ({ 
  currentStory, 
  unlockedLocations, 
  storyProgress 
}) => {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  // Mock story data - you can move this to a separate data file
  const storyLocations = [
    {
      id: 'forest',
      name: 'Mystical Forest',
      description: 'Ancient trees hold secrets of forgotten knowledge',
      difficulty: 1,
      requiredProgress: 0,
      icon: '🌲',
      color: 'from-green-500/20 to-emerald-500/20',
      borderColor: 'border-green-400/40'
    },
    {
      id: 'cave',
      name: 'Crystal Cave',
      description: 'Glowing crystals illuminate hidden wisdom',
      difficulty: 2,
      requiredProgress: 20,
      icon: '💎',
      color: 'from-blue-500/20 to-cyan-500/20',
      borderColor: 'border-blue-400/40'
    },
    {
      id: 'mountain',
      name: 'Peak of Knowledge',
      description: 'The highest point where masters gather',
      difficulty: 3,
      requiredProgress: 40,
      icon: '🏔️',
      color: 'from-purple-500/20 to-pink-500/20',
      borderColor: 'border-purple-400/40'
    },
    {
      id: 'castle',
      name: 'Wizard\'s Castle',
      description: 'Ancient spells and powerful magic await',
      difficulty: 4,
      requiredProgress: 60,
      icon: '🏰',
      color: 'from-yellow-500/20 to-orange-500/20',
      borderColor: 'border-yellow-400/40'
    },
    {
      id: 'space',
      name: 'Cosmic Academy',
      description: 'Learn from the stars themselves',
      difficulty: 5,
      requiredProgress: 80,
      icon: '🚀',
      color: 'from-indigo-500/20 to-purple-500/20',
      borderColor: 'border-indigo-400/40'
    }
  ];

  const isLocationUnlocked = (location: any) => {
    return unlockedLocations.includes(location.id) || storyProgress >= location.requiredProgress;
  };

  const getDifficultyColor = (difficulty: number) => {
    switch (difficulty) {
      case 1: return 'text-green-400';
      case 2: return 'text-blue-400';
      case 3: return 'text-yellow-400';
      case 4: return 'text-orange-400';
      case 5: return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getDifficultyLabel = (difficulty: number) => {
    switch (difficulty) {
      case 1: return 'Beginner';
      case 2: return 'Easy';
      case 3: return 'Medium';
      case 4: return 'Hard';
      case 5: return 'Expert';
      default: return 'Unknown';
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 backdrop-blur-lg rounded-2xl p-6 border border-indigo-300/20 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-white flex items-center space-x-2">
          <BookOpen className="text-indigo-400" size={28} />
          <span>Story Mode</span>
        </h3>
        
        <div className="text-right">
          <div className="text-lg font-bold text-indigo-400">
            {storyProgress}%
          </div>
          <div className="text-xs text-gray-400">Complete</div>
        </div>
      </div>

      {/* Current story progress */}
      <div className="mb-6 p-4 bg-indigo-500/10 rounded-xl border border-indigo-400/20">
        <div className="flex items-center space-x-3 mb-3">
          <Compass className="text-indigo-400" size={20} />
          <span className="text-indigo-300 font-medium">Current Story</span>
        </div>
        <div className="text-white">{currentStory}</div>
        
        {/* Progress bar */}
        <div className="mt-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gray-400">Story Progress</span>
            <span className="text-xs text-gray-400">{storyProgress}%</span>
          </div>
          <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-1000"
              style={{ width: `${storyProgress}%` }}
            />
            <div className="absolute inset-0 bg-white/10 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Story locations grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {storyLocations.map((location) => {
          const isUnlocked = isLocationUnlocked(location);
          const isSelected = selectedLocation === location.id;
          
          return (
            <div
              key={location.id}
              onClick={() => isUnlocked && setSelectedLocation(location.id)}
              className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                isUnlocked
                  ? isSelected
                    ? 'bg-gradient-to-r from-indigo-500/30 to-purple-500/30 border-indigo-400/60 shadow-indigo-500/20 shadow-lg'
                    : `bg-gradient-to-r ${location.color} ${location.borderColor} hover:border-indigo-400/60`
                  : 'bg-gray-800/40 border-gray-600/40 opacity-50 cursor-not-allowed'
              }`}
            >
              <div className="flex items-start space-x-3 mb-3">
                <div className={`p-3 rounded-lg ${
                  isUnlocked 
                    ? 'bg-indigo-500/20 text-indigo-400' 
                    : 'bg-gray-700/40 text-gray-500'
                }`}>
                  <span className="text-2xl">{location.icon}</span>
                </div>
                
                <div className="flex-1">
                  <div className={`font-bold ${
                    isUnlocked ? 'text-white' : 'text-gray-400'
                  }`}>
                    {location.name}
                  </div>
                  <div className="text-sm text-gray-400 mb-2">
                    {location.description}
                  </div>
                  
                  {/* Difficulty and progress */}
                  <div className="flex items-center justify-between">
                    <div className={`text-xs font-medium ${getDifficultyColor(location.difficulty)}`}>
                      {getDifficultyLabel(location.difficulty)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {location.requiredProgress}% required
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Status indicator */}
              <div className="flex items-center justify-between">
                {isUnlocked ? (
                  <div className="flex items-center space-x-2 text-green-400">
                    <Star size={16} />
                    <span className="text-xs">Unlocked</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 text-gray-500">
                    <Lock size={16} />
                    <span className="text-xs">Locked</span>
                  </div>
                )}
                
                {isUnlocked && (
                  <button className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs rounded-full border border-indigo-400/40 hover:bg-indigo-500/30 transition-colors">
                    Enter
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected location details */}
      {selectedLocation && (
        <div className="mt-6 pt-4 border-t border-gray-700/30">
          <div className="text-center">
            <div className="text-sm text-gray-400 mb-2">Selected Location</div>
            <div className="text-lg font-bold text-indigo-300">
              {storyLocations.find(l => l.id === selectedLocation)?.name}
            </div>
            <div className="text-sm text-gray-400 mt-1">
              Ready to begin your adventure?
            </div>
          </div>
        </div>
      )}

      {/* Story rewards info */}
      <div className="mt-6 pt-4 border-t border-gray-700/30">
        <div className="text-center">
          <div className="text-sm text-gray-400 mb-3">Story Mode Rewards</div>
          <div className="grid grid-cols-3 gap-4 text-xs">
            <div className="flex flex-col items-center space-y-1">
              <span className="text-lg">📚</span>
              <span className="text-blue-400">Story Points</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <span className="text-lg">🏆</span>
              <span className="text-purple-400">Unique Badges</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <span className="text-lg">⭐</span>
              <span className="text-yellow-400">Special Titles</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryMode; 