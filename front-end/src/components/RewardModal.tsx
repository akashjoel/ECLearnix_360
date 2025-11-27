import React, { useEffect, useState } from 'react';
import { X, Star, Zap, Gift, Trophy, Crown } from 'lucide-react';

interface RewardModalProps {
  isOpen: boolean;
  onClose: () => void;
  reward: {
    type: 'points' | 'powerup' | 'badge' | 'title' | 'mysterybox';
    title: string;
    description: string;
    value?: number;
    icon?: string;
    rarity?: 'common' | 'rare' | 'epic' | 'legendary';
  } | null;
}

const RewardModal: React.FC<RewardModalProps> = ({ isOpen, onClose, reward }) => {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    if (isOpen && reward) {
      setShowAnimation(true);
      const timer = setTimeout(() => {
        setShowAnimation(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, reward]);

  if (!isOpen || !reward) return null;

  const getRarityColor = (rarity: string = 'common') => {
    switch (rarity) {
      case 'common': return 'text-gray-400';
      case 'rare': return 'text-blue-400';
      case 'epic': return 'text-purple-400';
      case 'legendary': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  const getRarityBg = (rarity: string = 'common') => {
    switch (rarity) {
      case 'common': return 'bg-gray-500/20';
      case 'rare': return 'bg-blue-500/20';
      case 'epic': return 'bg-purple-500/20';
      case 'legendary': return 'bg-yellow-500/20';
      default: return 'bg-gray-500/20';
    }
  };

  const getRewardIcon = () => {
    switch (reward.type) {
      case 'points': return <Star className="text-yellow-400" size={48} />;
      case 'powerup': return <Zap className="text-blue-400" size={48} />;
      case 'badge': return <Trophy className="text-purple-400" size={48} />;
      case 'title': return <Crown className="text-yellow-400" size={48} />;
      case 'mysterybox': return <Gift className="text-pink-400" size={48} />;
      default: return <Star className="text-yellow-400" size={48} />;
    }
  };

  const getRewardColor = () => {
    switch (reward.type) {
      case 'points': return 'from-yellow-500/20 to-orange-500/20';
      case 'powerup': return 'from-blue-500/20 to-cyan-500/20';
      case 'badge': return 'from-purple-500/20 to-pink-500/20';
      case 'title': return 'from-yellow-500/20 to-amber-500/20';
      case 'mysterybox': return 'from-pink-500/20 to-purple-500/20';
      default: return 'from-gray-500/20 to-gray-600/20';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`relative bg-gradient-to-br ${getRewardColor()} backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl max-w-md w-full transform transition-all duration-500 ${
        showAnimation ? 'scale-110 rotate-3' : 'scale-100 rotate-0'
      }`}>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 transition-colors"
        >
          <X className="text-white" size={20} />
        </button>

        {/* Reward content */}
        <div className="text-center">
          {/* Icon */}
          <div className="mb-6 flex justify-center">
            <div className={`p-6 rounded-full ${getRarityBg(reward.rarity)}`}>
              {getRewardIcon()}
            </div>
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold text-white mb-3">
            {reward.title}
          </h2>

          {/* Description */}
          <p className="text-gray-300 mb-6 leading-relaxed">
            {reward.description}
          </p>

          {/* Value display */}
          {reward.value && (
            <div className="mb-6">
              <div className="text-4xl font-bold text-yellow-400 mb-2">
                +{reward.value}
              </div>
              <div className="text-sm text-gray-400">
                {reward.type === 'points' ? 'Points' : 
                 reward.type === 'powerup' ? 'Power-ups' : 'Value'}
              </div>
            </div>
          )}

          {/* Rarity badge */}
          {reward.rarity && (
            <div className={`inline-block px-4 py-2 rounded-full ${getRarityBg(reward.rarity)} border border-white/20 mb-6`}>
              <span className={`text-sm font-bold ${getRarityColor(reward.rarity)} capitalize`}>
                {reward.rarity}
              </span>
            </div>
          )}

          {/* Action button */}
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 text-white font-bold py-3 px-6 rounded-xl border border-white/20 transition-all duration-300 hover:scale-105"
          >
            Awesome!
          </button>
        </div>

        {/* Floating particles animation */}
        {showAnimation && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-ping"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random()}s`
                }}
              />
            ))}
            {[...Array(8)].map((_, i) => (
              <div
                key={i + 12}
                className="absolute w-1 h-1 bg-blue-400 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RewardModal; 