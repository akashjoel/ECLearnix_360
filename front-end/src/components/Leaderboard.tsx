import React, { useState } from 'react';
import { Crown, Trophy, Flame, Users, Clock } from 'lucide-react';

interface LeaderboardProps {
  userScore: number;
  userStreak: number;
  userName: string;
}

const Leaderboard: React.FC<LeaderboardProps> = ({
  userScore, 
  userStreak, 
  userName = "You" 
}) => {
  const [activeTab, setActiveTab] = useState<'weekly' | 'allTime' | 'teams'>('weekly');

  // Mock leaderboard data - you can move this to a separate data file
  const leaderboardData = [
    { id: 1, name: "Alex Chen", points: 12500, title: "Mastermind", streak: 15 },
    { id: 2, name: "Sarah Kim", points: 11800, title: "Knowledge Knight", streak: 12 },
    { id: 3, name: "Mike Johnson", points: 11200, title: "Wisdom Warrior", streak: 10 },
    { id: 4, name: "Emma Davis", points: 10500, title: "Scholar", streak: 8 },
    { id: 5, name: "David Wilson", points: 9800, title: "Learner", streak: 6 },
    { id: 6, name: "Lisa Brown", points: 9200, title: "Scholar", streak: 5 },
    { id: 7, name: "Tom Anderson", points: 8700, title: "Learner", streak: 4 },
    { id: 8, name: "Anna Garcia", points: 8200, title: "Learner", streak: 3 },
    { id: 9, name: "Chris Lee", points: 7800, title: "Learner", streak: 2 },
    { id: 10, name: "Maria Rodriguez", points: 7400, title: "Learner", streak: 1 }
  ];

  // Add current user to leaderboard if not already there
  const currentUserData = {
    id: 0,
    name: userName,
    points: userScore,
    title: "Current Player",
    streak: userStreak
  };

  const allData = [...leaderboardData, currentUserData]
    .sort((a, b) => b.points - a.points)
    .map((player, index) => ({ ...player, rank: index + 1 }));

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="text-yellow-400" size={20} />;
      case 2: return <Trophy className="text-gray-300" size={20} />;
      case 3: return <Trophy className="text-orange-400" size={20} />;
      default: return <span className="text-gray-400 font-bold">{rank}</span>;
    }
  };

  const getTitleColor = (title: string) => {
    switch (title) {
      case 'Mastermind': return 'text-red-400';
      case 'Knowledge Knight': return 'text-purple-400';
      case 'Wisdom Warrior': return 'text-orange-400';
      case 'Scholar': return 'text-blue-400';
      case 'Learner': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const teamData = [
    { id: 1, name: "Team Alpha", members: 5, totalPoints: 45200, avgPoints: 9040 },
    { id: 2, name: "Beta Squad", members: 4, totalPoints: 42800, avgPoints: 10700 },
    { id: 3, name: "Gamma Force", members: 6, totalPoints: 38900, avgPoints: 6483 },
    { id: 4, name: "Delta Warriors", members: 3, totalPoints: 35600, avgPoints: 11867 },
  ];

  const renderWeeklyLeaderboard = () => (
    <div className="space-y-3">
      {allData.slice(0, 10).map((player) => (
        <div
          key={player.id}
          className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 ${
            player.id === 0
              ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/40 transform scale-105'
              : player.rank <= 3
              ? 'bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-400/20'
              : 'bg-gray-800/40 border border-gray-600/20 hover:border-purple-400/40'
          }`}
        >
          <div className="flex items-center justify-center w-10 h-10">
            {getRankIcon(player.rank)}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <span className={`font-bold ${player.id === 0 ? 'text-blue-300' : 'text-white'}`}>
                {player.name}
              </span>
              {player.streak > 0 && (
                <div className="flex items-center space-x-1 text-orange-400">
                  <Flame size={14} />
                  <span className="text-xs">{player.streak}</span>
                </div>
              )}
            </div>
            <div className={`text-sm ${getTitleColor(player.title)}`}>
              {player.title}
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-lg font-bold text-yellow-400">
              {player.points.toLocaleString()}
            </div>
            <div className="text-xs text-gray-400">points</div>
          </div>
        </div>
      ))}
      </div>
  );

  const renderTeamLeaderboard = () => (
    <div className="space-y-3">
      {teamData.map((team, index) => (
        <div
          key={team.id}
          className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 ${
            index < 3
              ? 'bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-400/20'
              : 'bg-gray-800/40 border border-gray-600/20'
          }`}
        >
          <div className="flex items-center justify-center w-10 h-10">
            {getRankIcon(index + 1)}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-white">{team.name}</span>
              <div className="flex items-center space-x-1 text-blue-400">
                <Users size={14} />
                <span className="text-xs">{team.members}</span>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              Avg: {team.avgPoints.toLocaleString()} pts/member
                  </div>
                </div>
                
                <div className="text-right">
            <div className="text-lg font-bold text-purple-400">
              {team.totalPoints.toLocaleString()}
            </div>
            <div className="text-xs text-gray-400">total pts</div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 backdrop-blur-lg rounded-2xl p-6 border border-indigo-300/20 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-white flex items-center space-x-2">
          <Trophy className="text-yellow-400" size={28} />
          <span>Leaderboard</span>
        </h3>
        
        <div className="flex items-center space-x-1 text-xs text-gray-400">
          <Clock size={14} />
          <span>Resets weekly</span>
                </div>
              </div>

      {/* Tab navigation */}
      <div className="flex space-x-2 mb-6">
        {[
          { id: 'weekly', label: 'Weekly', icon: '🏆' },
          { id: 'allTime', label: 'All Time', icon: '👑' },
          { id: 'teams', label: 'Teams', icon: '👥' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-purple-500/20 text-purple-300 border border-purple-400/40'
                : 'bg-gray-800/40 text-gray-400 border border-gray-600/40 hover:border-purple-400/60'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
                </div>

      {/* Leaderboard content */}
      {activeTab === 'teams' ? renderTeamLeaderboard() : renderWeeklyLeaderboard()}

      {/* User's current position highlight */}
      {activeTab !== 'teams' && (
        <div className="mt-6 pt-4 border-t border-gray-700/30">
          <div className="text-center">
            <div className="text-sm text-gray-400 mb-2">Your Position</div>
            <div className="flex items-center justify-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">
                  #{allData.find(p => p.id === 0)?.rank || 'N/A'}
                </div>
                <div className="text-xs text-gray-400">Rank</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">
                  {userScore.toLocaleString()}
                </div>
                <div className="text-xs text-gray-400">Points</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400">
                  {userStreak}
                </div>
                <div className="text-xs text-gray-400">Streak</div>
              </div>
            </div>
      </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard; 