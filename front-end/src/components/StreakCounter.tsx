import React, { useState, useEffect } from 'react';

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  totalDays: number;
  lastActivityDate: Date;
  weeklyProgress: boolean[];
  monthlyProgress: boolean[];
}

const StreakCounter: React.FC = () => {
  const [streakData, setStreakData] = useState<StreakData>({
    currentStreak: 7,
    longestStreak: 15,
    totalDays: 45,
    lastActivityDate: new Date(),
    weeklyProgress: [true, true, true, false, true, true, true],
    monthlyProgress: Array.from({ length: 30 }, (_, i) => i < 25)
  });

  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Check if streak milestone reached
    if (streakData.currentStreak % 7 === 0 && streakData.currentStreak > 0) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [streakData.currentStreak]);

  const getStreakEmoji = (streak: number) => {
    if (streak >= 30) return '🔥🔥🔥';
    if (streak >= 21) return '🔥🔥';
    if (streak >= 14) return '🔥';
    if (streak >= 7) return '⚡';
    if (streak >= 3) return '💪';
    return '🌱';
  };

  const getStreakTitle = (streak: number) => {
    if (streak >= 30) return 'Inferno Master';
    if (streak >= 21) return 'Flame Keeper';
    if (streak >= 14) return 'Streak Champion';
    if (streak >= 7) return 'Week Warrior';
    if (streak >= 3) return 'Getting Started';
    return 'New Learner';
  };

  const getStreakColor = (streak: number) => {
    if (streak >= 30) return 'text-red-600';
    if (streak >= 21) return 'text-orange-600';
    if (streak >= 14) return 'text-yellow-600';
    if (streak >= 7) return 'text-green-600';
    if (streak >= 3) return 'text-blue-600';
    return 'text-gray-600';
  };

  const getDayName = (index: number) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[index];
  };

  const getMonthName = (index: number) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[index];
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Enhanced Celebration Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {/* Animated Celebration Text */}
          <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2">
            <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 animate-pulse">
              CONGRATULATIONS!
            </div>
          </div>
          
          {/* Animated Celebration Text 2 */}
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2">
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-green-600 to-yellow-600 animate-bounce" style={{ animationDelay: '0.5s' }}>
              AMAZING STREAK!
            </div>
          </div>

          {/* Floating Particles */}
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'][Math.floor(Math.random() * 7)],
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            >
              <div className="w-full h-full rounded-full animate-ping opacity-75"></div>
            </div>
          ))}

          {/* Animated Rings */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`ring-${i}`}
              className="absolute border-2 border-purple-400 rounded-full animate-ping"
              style={{
                left: '50%',
                top: '50%',
                width: `${100 + i * 50}px`,
                height: `${100 + i * 50}px`,
                transform: 'translate(-50%, -50%)',
                animationDelay: `${i * 0.2}s`,
                animationDuration: '2s'
              }}
            />
          ))}

          {/* Sparkle Effects */}
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={`sparkle-${i}`}
              className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-pulse"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random() * 1}s`
              }}
            />
          ))}

          {/* Animated Stars */}
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={`star-${i}`}
              className="absolute text-yellow-400 animate-spin"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${12 + Math.random() * 20}px`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              ★
            </div>
          ))}

          {/* Celebration Border */}
          <div className="absolute inset-0 border-8 border-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-lg animate-pulse opacity-50">
            <div className="w-full h-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-lg animate-pulse opacity-25"></div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Learning Streak</h1>
        <p className="text-gray-600">Keep the momentum going! Every day counts towards your learning journey.</p>
      </div>

      {/* Main Streak Display with Enhanced Animations */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white text-center mb-8 shadow-lg">
        <div className="text-8xl mb-4">
          {(() => {
            const emoji = getStreakEmoji(streakData.currentStreak);
            if (streakData.currentStreak >= 30) {
              return (
                <div className="flex justify-center space-x-2">
                  <span className="animate-pulse">🔥</span>
                  <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>🔥</span>
                  <span className="animate-pulse" style={{ animationDelay: '0.4s' }}>🔥</span>
                </div>
              );
            } else if (streakData.currentStreak >= 21) {
              return (
                <div className="flex justify-center space-x-2">
                  <span className="animate-pulse">🔥</span>
                  <span className="animate-bounce" style={{ animationDelay: '0.3s' }}>🔥</span>
                </div>
              );
            } else if (streakData.currentStreak >= 14) {
              return <span className="animate-pulse">🔥</span>;
            } else if (streakData.currentStreak >= 7) {
              return <span className="animate-ping">⚡</span>;
            } else if (streakData.currentStreak >= 3) {
              return <span className="animate-bounce">💪</span>;
            } else {
              return <span className="animate-pulse">🌱</span>;
            }
          })()}
        </div>
        <h2 className="text-4xl font-bold mb-2">{streakData.currentStreak} Days</h2>
        <p className="text-xl opacity-90 mb-4">{getStreakTitle(streakData.currentStreak)}</p>
        
        <div className="flex justify-center space-x-8">
          <div className="text-center">
            <div className="text-2xl font-bold">{streakData.longestStreak}</div>
            <div className="text-sm opacity-80">Longest Streak</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{streakData.totalDays}</div>
            <div className="text-sm opacity-80">Total Days</div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-md text-center">
          <div className="text-3xl mb-2 animate-pulse">📅</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Current Streak</h3>
          <div className={`text-3xl font-bold ${getStreakColor(streakData.currentStreak)}`}>
            {streakData.currentStreak}
          </div>
          <p className="text-sm text-gray-600">days</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md text-center">
          <div className="text-3xl mb-2 animate-bounce">🏆</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Longest Streak</h3>
          <div className="text-3xl font-bold text-purple-600">
            {streakData.longestStreak}
          </div>
          <p className="text-sm text-gray-600">days</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md text-center">
          <div className="text-3xl mb-2 animate-pulse">📊</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Learning</h3>
          <div className="text-3xl font-bold text-green-600">
            {streakData.totalDays}
          </div>
          <p className="text-sm text-gray-600">days</p>
        </div>
      </div>

      {/* Weekly Progress */}
      <div className="bg-white rounded-lg p-6 shadow-md mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">This Week</h3>
        <div className="grid grid-cols-7 gap-2">
          {streakData.weeklyProgress.map((completed, index) => (
            <div key={index} className="text-center">
              <div className="text-xs text-gray-500 mb-1">{getDayName(index)}</div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                completed 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {completed ? '✓' : '○'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Progress */}
      <div className="bg-white rounded-lg p-6 shadow-md mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">This Month</h3>
        <div className="grid grid-cols-10 gap-1">
          {streakData.monthlyProgress.map((completed, index) => (
            <div
              key={index}
              className={`w-6 h-6 rounded-sm ${
                completed ? 'bg-green-500' : 'bg-gray-200'
              }`}
              title={`Day ${index + 1}: ${completed ? 'Completed' : 'Not completed'}`}
            />
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-2">
          {streakData.monthlyProgress.filter(Boolean).length} of {streakData.monthlyProgress.length} days completed
        </p>
      </div>

      {/* Enhanced Motivation Section */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border border-green-200">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-bounce">💪</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Keep Going!</h3>
          <p className="text-gray-600 mb-4">
            You're on a {streakData.currentStreak}-day streak! Don't break the chain.
          </p>
          <div className="text-sm text-gray-500">
            Next milestone: {Math.ceil(streakData.currentStreak / 7) * 7} days
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreakCounter; 