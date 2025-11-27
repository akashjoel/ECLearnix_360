import React, { useState } from 'react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'quiz' | 'streak' | 'learning' | 'social';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  unlockedAt?: Date;
}

const Achievement: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'First Steps',
      description: 'Complete your first quiz',
      icon: '🎯',
      category: 'quiz',
      rarity: 'common',
      progress: 1,
      maxProgress: 1,
      unlocked: true,
      unlockedAt: new Date('2024-01-15')
    },
    {
      id: '2',
      title: 'Quiz Master',
      description: 'Complete 10 quizzes with 90%+ accuracy',
      icon: '🏆',
      category: 'quiz',
      rarity: 'rare',
      progress: 7,
      maxProgress: 10,
      unlocked: false
    },
    {
      id: '3',
      title: 'Streak Champion',
      description: 'Maintain a 7-day learning streak',
      icon: '🔥',
      category: 'streak',
      rarity: 'epic',
      progress: 5,
      maxProgress: 7,
      unlocked: false
    },
    {
      id: '4',
      title: 'Knowledge Seeker',
      description: 'Study for 100 hours total',
      icon: '📚',
      category: 'learning',
      rarity: 'legendary',
      progress: 67,
      maxProgress: 100,
      unlocked: false
    },
    {
      id: '5',
      title: 'Social Butterfly',
      description: 'Connect with 5 other learners',
      icon: '🦋',
      category: 'social',
      rarity: 'common',
      progress: 3,
      maxProgress: 5,
      unlocked: false
    }
  ];

  const categories = [
    { id: 'all', name: 'All', icon: '🌟' },
    { id: 'quiz', name: 'Quiz', icon: '📝' },
    { id: 'streak', name: 'Streak', icon: '🔥' },
    { id: 'learning', name: 'Learning', icon: '📚' },
    { id: 'social', name: 'Social', icon: '👥' }
  ];

  const filteredAchievements = selectedCategory === 'all' 
    ? achievements 
    : achievements.filter(a => a.category === selectedCategory);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-600 bg-gray-100';
      case 'rare': return 'text-blue-600 bg-blue-100';
      case 'epic': return 'text-purple-600 bg-purple-100';
      case 'legendary': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getProgressColor = (progress: number, max: number) => {
    const percentage = (progress / max) * 100;
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-yellow-500';
    if (percentage >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Achievements</h1>
        <p className="text-gray-600">Track your learning progress and unlock rewards</p>
        
        {/* Stats */}
        <div className="flex justify-center space-x-8 mt-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{unlockedCount}</div>
            <div className="text-sm text-gray-500">Unlocked</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-600">{totalCount}</div>
            <div className="text-sm text-gray-500">Total</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {Math.round((unlockedCount / totalCount) * 100)}%
            </div>
            <div className="text-sm text-gray-500">Completion</div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex justify-center space-x-2 mb-8">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
              selectedCategory === category.id
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <span>{category.icon}</span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAchievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`bg-white rounded-lg shadow-md p-6 border-2 transition-all duration-300 hover:shadow-lg ${
              achievement.unlocked 
                ? 'border-green-200 hover:border-green-300' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            {/* Achievement Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="text-4xl">{achievement.icon}</div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(achievement.rarity)}`}>
                {achievement.rarity}
              </span>
            </div>

            {/* Achievement Content */}
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {achievement.title}
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              {achievement.description}
            </p>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-500 mb-1">
                <span>Progress</span>
                <span>{achievement.progress} / {achievement.maxProgress}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(achievement.progress, achievement.maxProgress)}`}
                  style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Status */}
            {achievement.unlocked ? (
              <div className="flex items-center justify-between">
                <span className="text-green-600 text-sm font-medium flex items-center">
                  <span className="mr-1">✓</span> Unlocked
                </span>
                {achievement.unlockedAt && (
                  <span className="text-xs text-gray-400">
                    {achievement.unlockedAt.toLocaleDateString()}
                  </span>
                )}
              </div>
            ) : (
              <div className="text-center">
                <span className="text-gray-500 text-sm">
                  {achievement.maxProgress - achievement.progress} more to go
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredAchievements.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎯</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No achievements found</h3>
          <p className="text-gray-600">Try selecting a different category or keep learning to unlock more achievements!</p>
        </div>
      )}
    </div>
  );
};

export default Achievement; 