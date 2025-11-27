import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Building2,
  Globe,
  Star,
  ArrowRight,
  ChevronDown,
  Sparkles,
  Zap,
  Target,
  Users,
  Award,
  Clock,
  Briefcase,
  GraduationCap,
  Rocket,
  TrendingUp,
  Upload,
  FileText,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import Achievement from '../components/Achievement';
import Leaderboard from '../components/Leaderboard';
import LevelProgress from '../components/LevelProgress';
import MysteryBox from '../components/MysteryBox';
import QuestionCard from '../components/QuestionCard';
import RewardModal from '../components/RewardModal';
import StoryMode from '../components/StoryMode';
import StreakCounter from '../components/StreakCounter';
import { questions } from '../data/questions';

interface QuizData {
  id: string;
  title: string;
  description: string;
  questions: any[];
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timeLimit: number;
  points: number;
}

const Quiz: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [activeTab, setActiveTab] = useState<'quiz' | 'achievements' | 'leaderboard' | 'progress' | 'story' | 'streak'>('quiz');
  const [currentQuiz, setCurrentQuiz] = useState<QuizData | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showReward, setShowReward] = useState(false);
  const [earnedReward, setEarnedReward] = useState<any>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Mock quiz data
  const mockQuizData: QuizData = {
    id: courseId || 'default',
    title: 'JavaScript Fundamentals',
    description: 'Test your knowledge of JavaScript basics including variables, functions, and control flow.',
    category: 'Programming',
    difficulty: 'medium',
    timeLimit: 30,
    points: 100,
    questions: questions.slice(0, 5) // Use first 5 questions from our data
  };

  useEffect(() => {
    setCurrentQuiz(mockQuizData);
    setIsVisible(true);
  }, [courseId]);

  const handleAnswerSubmit = (isCorrect: boolean, timeBonus: boolean) => {
    if (isCorrect) {
      setScore(prev => prev + 10);
    }

    if (currentQuestionIndex < (currentQuiz?.questions.length || 0) - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Quiz completed
      setQuizCompleted(true);
      const reward = {
        type: 'quiz_completion',
        title: 'Quiz Master!',
        description: `Congratulations! You've completed the ${currentQuiz?.title} quiz with ${score} points!`,
        rarity: score > 80 ? 'epic' : score > 60 ? 'rare' : 'common',
        points: score,
        icon: '🎯'
      };
      setEarnedReward(reward);
      setShowReward(true);
    }
  };

  const handleRewardClose = () => {
    setShowReward(false);
    setEarnedReward(null);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizCompleted(false);
  };

  if (!currentQuiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading quiz...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{currentQuiz.title}</h1>
              <p className="text-gray-600">{currentQuiz.description}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Current Score</p>
                <p className="text-2xl font-bold text-blue-600">{score}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Questions</p>
                <p className="text-lg font-semibold text-gray-700">
                  {currentQuestionIndex + 1} / {currentQuiz.questions.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
                
      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'quiz', label: 'Quiz', icon: '📝' },
              { id: 'achievements', label: 'Achievements', icon: '🏆' },
              { id: 'leaderboard', label: 'Leaderboard', icon: '📊' },
              { id: 'progress', label: 'Progress', icon: '📈' },
              { id: 'story', label: 'Story Mode', icon: '🗺️' },
              { id: 'streak', label: 'Streak', icon: '🔥' }
            ].map((tab) => (
                <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
                </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'quiz' && (
          <div className="space-y-6">
            {!quizCompleted ? (
              <QuestionCard
                question={currentQuiz.questions[currentQuestionIndex]}
                onAnswer={handleAnswerSubmit}
                timeLeft={30}
                onTimeUp={() => {}}
                powerUps={[]}
                onUsePowerUp={() => {}}
                difficulty={2}
              />
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-8 text-center border border-gray-200">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Quiz Completed!</h2>
                <p className="text-xl text-gray-700 mb-6">
                  You scored <span className="font-bold text-blue-600">{score}</span> out of{' '}
                  <span className="font-bold text-gray-700">{currentQuiz.questions.reduce((acc, q) => acc + q.points, 0)}</span> points!
                </p>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={resetQuiz}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                  >
                    Retake Quiz
                  </button>
                  <button
                    onClick={() => setActiveTab('achievements')}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg"
                  >
                    View Achievements
                  </button>
                </div>
              </div>
            )}
            
            {/* Mystery Box */}
            <MysteryBox 
              available={true}
              onOpen={() => console.log('Mystery box opened!')}
              questionsCompleted={currentQuestionIndex + 1}
            />
          </div>
        )}

        {activeTab === 'achievements' && (
          <Achievement />
        )}

        {activeTab === 'leaderboard' && (
          <Leaderboard 
            userScore={score}
            userStreak={7}
            userName="User"
          />
        )}

        {activeTab === 'progress' && (
          <LevelProgress 
            level={5}
            totalPoints={score}
            currentTitle="Learner"
            nextTitle="Scholar"
            progress={75}
          />
        )}

        {activeTab === 'story' && (
          <StoryMode 
            currentStory="JavaScript Journey"
            unlockedLocations={['Variables Valley', 'Functions Forest']}
            storyProgress={60}
          />
        )}

        {activeTab === 'streak' && (
          <StreakCounter />
        )}
      </div>

      {/* Reward Modal */}
      {showReward && earnedReward && (
        <RewardModal
          reward={earnedReward}
          onClose={handleRewardClose}
          isOpen={showReward}
        />
      )}
    </div>
  );
};

export default Quiz; 