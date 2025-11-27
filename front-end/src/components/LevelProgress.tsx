import React, { useEffect, useState } from 'react';
import { Crown, Star, Zap } from 'lucide-react';

interface LevelProgressProps {
  level: number;
  totalPoints: number;
  currentTitle: any;
  nextTitle: any;
  progress: number;
  onLevelUp?: () => void;
}

const LevelProgress: React.FC<LevelProgressProps> = ({
  level,
  totalPoints,
  currentTitle,
  nextTitle,
  progress,
  onLevelUp
}) => {
  const [showLevelUpAnimation, setShowLevelUpAnimation] = useState(false);
  const [previousLevel, setPreviousLevel] = useState(level);

  useEffect(() => {
    if (level > previousLevel) {
      setShowLevelUpAnimation(true);
      onLevelUp?.();
      
      setTimeout(() => {
        setShowLevelUpAnimation(false);
      }, 3000);
    }
    setPreviousLevel(level);
  }, [level, previousLevel, onLevelUp]);

  const pointsToNext = nextTitle ? nextTitle.minPoints - totalPoints : 0;

  return (
    <div className="relative">
      {/* Level up animation overlay */}
      {showLevelUpAnimation && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="text-center animate-bounce">
            <div className="text-8xl mb-4">🎉</div>
            <div className="text-6xl font-bold text-yellow-400 mb-2">LEVEL UP!</div>
            <div className="text-2xl text-white mb-4">You reached level {level}!</div>
            <div className={`text-xl ${currentTitle.color} font-medium`}>
              You are now a {currentTitle.name}!
            </div>
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-4 h-4 bg-yellow-400 rounded-full animate-ping"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main level progress card */}
      <div className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 backdrop-blur-lg rounded-2xl p-6 border border-purple-300/20 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Crown className="text-white" size={32} />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-black rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                {level}
              </div>
            </div>
            
            <div>
              <div className={`text-2xl font-bold ${currentTitle.color}`}>
                {currentTitle.name}
              </div>
              <div className="text-gray-300 text-sm">
                {totalPoints.toLocaleString()} points
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-3xl font-bold text-purple-400">
              {level}
            </div>
            <div className="text-sm text-gray-400">Level</div>
          </div>
        </div>

        {/* Progress to next title */}
        {nextTitle && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-300">
                Progress to {nextTitle.name}
              </span>
              <span className="text-sm text-gray-400">
                {pointsToNext.toLocaleString()} points to go
              </span>
            </div>
            
            <div className="relative h-3 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
              <div className="absolute inset-0 bg-white/10 animate-pulse" />
            </div>
          </div>
        )}

        {/* Level benefits */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-blue-500/10 rounded-lg">
            <Star className="text-blue-400 mx-auto mb-1" size={20} />
            <div className="text-xs text-blue-300 font-medium">XP Bonus</div>
            <div className="text-lg font-bold text-blue-400">{level * 10}%</div>
          </div>
          
          <div className="text-center p-3 bg-green-500/10 rounded-lg">
            <Zap className="text-green-400 mx-auto mb-1" size={20} />
            <div className="text-xs text-green-300 font-medium">Power-ups</div>
            <div className="text-lg font-bold text-green-400">{Math.floor(level / 2)}</div>
          </div>
          
          <div className="text-center p-3 bg-purple-500/10 rounded-lg">
            <Crown className="text-purple-400 mx-auto mb-1" size={20} />
            <div className="text-xs text-purple-300 font-medium">Prestige</div>
            <div className="text-lg font-bold text-purple-400">{Math.floor(level / 5)}</div>
          </div>
        </div>

        {/* Achievement showcase */}
        <div className="mt-4 pt-4 border-t border-gray-700/30">
          <div className="text-xs text-gray-400 mb-2">Recent Achievements</div>
          <div className="flex space-x-2 overflow-x-auto">
            {['🎯', '⚡', '🔥', '🏆', '💎'].map((emoji, index) => (
              <div 
                key={index}
                className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full flex items-center justify-center text-sm animate-pulse"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {emoji}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LevelProgress; 