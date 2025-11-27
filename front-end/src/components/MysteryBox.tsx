import React, { useState } from 'react';
import { Gift, Sparkles, Zap } from 'lucide-react';

interface MysteryBoxProps {
  available: boolean;
  onOpen: () => void;
  questionsCompleted: number;
}

const MysteryBox: React.FC<MysteryBoxProps> = ({ 
  available, 
  onOpen, 
  questionsCompleted 
}) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (!available) return;
    
    setIsOpening(true);
    setTimeout(() => {
      onOpen();
      setIsOpening(false);
    }, 2000);
  };

  const progressToNext = ((questionsCompleted % 10) / 10) * 100;
  const questionsUntilNext = 10 - (questionsCompleted % 10);

  return (
    <div className="bg-gradient-to-br from-pink-900/20 to-purple-900/20 backdrop-blur-lg rounded-2xl p-6 border border-pink-300/20 shadow-xl">
      <div className="text-center">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center justify-center space-x-2">
          <Gift className="text-pink-400" size={24} />
          <span>Mystery Box</span>
        </h3>

        {/* Mystery box animation */}
        <div className="relative mb-6">
          <div 
            className={`w-24 h-24 mx-auto rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center cursor-pointer transition-all duration-300 ${
              available 
                ? 'hover:scale-110 animate-pulse shadow-pink-500/40 shadow-lg' 
                : 'opacity-50 cursor-not-allowed'
            } ${isOpening ? 'animate-spin' : ''}`}
            onClick={handleOpen}
          >
            <Gift 
              className={`text-white transition-all duration-300 ${isOpening ? 'animate-bounce' : ''}`} 
              size={40} 
            />
          </div>

          {/* Sparkle effects */}
          {available && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <Sparkles
                  key={i}
                  className="absolute text-yellow-400 animate-ping"
                  size={16}
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: `${20 + Math.random() * 60}%`,
                    animationDelay: `${i * 0.5}s`
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Status */}
        {available ? (
          <div className="mb-4">
            <div className="text-2xl font-bold text-pink-400 mb-1">Ready to Open!</div>
            <div className="text-sm text-gray-300">Click the box to reveal your reward</div>
          </div>
        ) : (
          <div className="mb-4">
            <div className="text-lg font-medium text-gray-300 mb-2">
              {questionsUntilNext} questions to go
            </div>
            <div className="text-sm text-gray-400">
              Complete 10 questions to unlock a mystery box
            </div>
          </div>
        )}

        {/* Progress bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gray-400">Progress</span>
            <span className="text-xs text-gray-400">{questionsCompleted % 10}/10</span>
          </div>
          
          <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-pink-500 to-purple-600 rounded-full transition-all duration-1000"
              style={{ width: `${progressToNext}%` }}
            />
            <div className="absolute inset-0 bg-white/10 animate-pulse" />
          </div>
        </div>

        {/* Possible rewards */}
        <div className="bg-black/20 backdrop-blur rounded-xl p-4">
          <div className="text-sm text-gray-300 mb-2">Possible Rewards:</div>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="flex flex-col items-center space-y-1">
              <span className="text-lg">💰</span>
              <span className="text-yellow-400">Bonus Points</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <span className="text-lg">⚡</span>
              <span className="text-blue-400">Power-ups</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <span className="text-lg">🏆</span>
              <span className="text-purple-400">Rare Badges</span>
            </div>
          </div>
        </div>

        {/* Opening animation overlay */}
        {isOpening && (
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-600/20 rounded-2xl flex items-center justify-center">
            <div className="text-center">
              <Zap className="text-yellow-400 animate-spin mb-2 mx-auto" size={32} />
              <div className="text-white font-bold">Opening...</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MysteryBox; 