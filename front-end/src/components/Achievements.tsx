import React, { useState } from 'react';
import { Trophy, Target, Zap, Calendar, Star, BookOpen } from 'lucide-react';

interface AchievementsProps {
  earnedAchievements: number[];
  totalPoints: number;
  currentStreak: number;
  questionsCompleted: number;
}

const Achievements: React.FC<AchievementsProps> = ({
  earnedAchievements,
  totalPoints,
  currentStreak,
  questionsCompleted
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock achievements data - you can move this to a separate data file
  const achievements = [
    {
      id: 1,
      name: "First Steps",
      description: "Complete your first question",
      type: "milestone",
      points: 50,
      icon: "🎯"
    },
    {
      id: 2,
      name: "Speed Demon",
      description: "Answer 10 questions quickly",
      type: "speed",
      points: 100,
      icon: "⚡"
    },
    {
      id: 3,
      name: "Perfect Score",
      description: "Get 5 questions correct in a row",
      type: "accuracy",
      points: 150,
      icon: "🎪"
    },
    {
      id: 4,
      name: "Streak Master",
      description: "Maintain a 7-day streak",
      type: "streak",
      points: 200,
      icon: "🔥"
    },
    {
      id: 5,
      name: "Knowledge Hoarder",
      description: "Earn 10 achievements",
      type: "collection",
      points: 300,
      icon: "⭐"
    },
    {
      id: 6,
      name: "Story Seeker",
      description: "Complete 5 story mode questions",
      type: "story",
      points: 250,
      icon: "📚"
    }
  ];

  const getAchievementIcon = (type: string) => {
    switch (type) {
      case 'milestone': return Trophy;
      case 'speed': return Zap;
      case 'accuracy': return Target;
      case 'streak': return Calendar;
      case 'collection': return Star;
      case 'story': return BookOpen;
      default: return Trophy;
    }
  };

  const getProgressForAchievement = (achievement: any) => {
    switch (achievement.id) {
      case 1: // First Steps
        return questionsCompleted > 0 ? 100 : 0;
      case 2: // Speed Demon - mock progress
        return Math.min((questionsCompleted * 10), 100);
      case 3: // Perfect Score - mock progress
        return Math.min((questionsCompleted * 5), 100);
      case 4: // Streak Master
        return Math.min((currentStreak / 7) * 100, 100);
      case 5: // Knowledge Hoarder - mock progress
        return Math.min((earnedAchievements.length / 10) * 100, 100);
      case 6: // Story Seeker - mock progress
        return Math.min((questionsCompleted / 5) * 100, 100);
      default:
        return 0;
    }
  };

  const filteredAchievements = achievements.filter(achievement => 
    selectedCategory === 'all' || achievement.type === selectedCategory
  );

  const categories = [
    { id: 'all', name: 'All', icon: '🏆' },
    { id: 'milestone', name: 'Milestones', icon: '🎯' },
    { id: 'speed', name: 'Speed', icon: '⚡' },
    { id: 'accuracy', name: 'Accuracy', icon: '🎪' },
    { id: 'streak', name: 'Streaks', icon: '🔥' },
    { id: 'collection', name: 'Collection', icon: '⭐' },
    { id: 'story', name: 'Story', icon: '📚' }
  ];

  return (
    <div className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 backdrop-blur-lg rounded-2xl p-6 border border-yellow-300/20 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-white flex items-center space-x-2">
          <Trophy className="text-yellow-400" size={28} />
          <span>Achievements</span>
        </h3>
        
        <div className="text-right">
          <div className="text-lg font-bold text-yellow-400">
            {earnedAchievements.length}/{achievements.length}
          </div>
          <div className="text-xs text-gray-400">Unlocked</div>
        </div>
      </div>

      {/* Category filters */}
      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
              selectedCategory === category.id
                ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-400/40'
                : 'bg-gray-800/40 text-gray-400 border border-gray-600/40 hover:border-yellow-400/60'
            }`}
          >
            <span>{category.icon}</span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      {/* Achievements grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAchievements.map(achievement => {
          const IconComponent = getAchievementIcon(achievement.type);
          const isEarned = earnedAchievements.includes(achievement.id);
          const progress = getProgressForAchievement(achievement);
          
          return (
            <div
              key={achievement.id}
              className={`p-4 rounded-xl border transition-all duration-300 transform hover:scale-105 ${
                isEarned
                  ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-400/60 shadow-yellow-500/20 shadow-lg'
                  : 'bg-gray-800/40 border-gray-600/40'
              }`}
            >
              <div className="flex items-start space-x-3 mb-3">
                <div className={`p-2 rounded-lg ${
                  isEarned 
                    ? 'bg-yellow-500/20 text-yellow-400' 
                    : 'bg-gray-700/40 text-gray-500'
                }`}>
                  <span className="text-2xl">{achievement.icon}</span>
                </div>
                
                <div className="flex-1">
                  <div className={`font-bold ${
                    isEarned ? 'text-yellow-300' : 'text-gray-400'
                  }`}>
                    {achievement.name}
                  </div>
                  <div className="text-sm text-gray-400 mb-2">
                    {achievement.description}
                  </div>
                  
                  {/* Progress bar */}
                  <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className={`absolute left-0 top-0 h-full rounded-full transition-all duration-1000 ${
                        isEarned 
                          ? 'bg-gradient-to-r from-yellow-400 to-orange-500' 
                          : 'bg-gradient-to-r from-gray-600 to-gray-500'
                      }`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-500">
                      {Math.round(progress)}% complete
                    </span>
                    <span className={`text-sm font-bold ${
                      isEarned ? 'text-yellow-400' : 'text-gray-500'
                    }`}>
                      +{achievement.points} pts
                    </span>
                  </div>
                </div>
              </div>
              
              {isEarned && (
                <div className="absolute top-2 right-2">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Achievement stats */}
      <div className="mt-6 pt-4 border-t border-gray-700/30">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-yellow-400">
              {earnedAchievements.length}
            </div>
            <div className="text-xs text-gray-400">Earned</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-400">
              {achievements.reduce((sum, a) => earnedAchievements.includes(a.id) ? sum + a.points : sum, 0)}
            </div>
            <div className="text-xs text-gray-400">Bonus Points</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-400">
              {Math.round((earnedAchievements.length / achievements.length) * 100)}%
            </div>
            <div className="text-xs text-gray-400">Completion</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-400">
              {achievements.length - earnedAchievements.length}
            </div>
            <div className="text-xs text-gray-400">Remaining</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements; 