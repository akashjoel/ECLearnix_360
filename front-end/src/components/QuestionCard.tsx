import React, { useState, useEffect } from 'react';
import { Clock, Target, Zap, Lightbulb, Shield } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  difficulty: number;
  category: string;
  story: string;
  mapLocation: string;
}

interface QuestionCardProps {
  question: Question;
  onAnswer: (isCorrect: boolean, timeBonus: boolean) => void;
  timeLeft: number;
  onTimeUp: () => void;
  powerUps: any[];
  onUsePowerUp: (powerUpId: number) => void;
  difficulty: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onAnswer,
  timeLeft,
  onTimeUp,
  powerUps,
  onUsePowerUp,
  difficulty
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [timeBonus, setTimeBonus] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
    }
  }, [timeLeft, onTimeUp]);

  useEffect(() => {
    if (timeLeft > 10) {
      setTimeBonus(true);
    } else {
      setTimeBonus(false);
    }
  }, [timeLeft]);

  const handleAnswerSelect = (index: number) => {
    if (isAnswered) return;
    
    setSelectedOption(index);
    setIsAnswered(true);
    
    const isCorrect = index === question.correct;
    setTimeout(() => {
      onAnswer(isCorrect, timeBonus);
    }, 1000);
  };

  const handlePowerUpUse = (powerUpId: number) => {
    if (isAnswered) return;
    onUsePowerUp(powerUpId);
  };

  const getDifficultyColor = () => {
    switch (difficulty) {
      case 1: return 'text-green-400';
      case 2: return 'text-yellow-400';
      case 3: return 'text-orange-400';
      case 4: return 'text-red-400';
      case 5: return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  const getHint = () => {
    const hints = [
      "Think about the context carefully",
      "Consider the opposite of what seems obvious",
      "Look for keywords in the question",
      "Eliminate obviously wrong answers first",
      "Remember the basic principles"
    ];
    return hints[Math.floor(Math.random() * hints.length)];
  };

  return (
    <div className="bg-gradient-to-br from-gray-900/40 to-gray-800/40 backdrop-blur-lg rounded-2xl p-6 border border-gray-600/20 shadow-xl max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Target className="text-blue-400" size={20} />
            <span className="text-sm text-gray-400">{question.category}</span>
          </div>
          <div className={`flex items-center space-x-1 ${getDifficultyColor()}`}>
            <span className="text-sm font-medium">Difficulty:</span>
            <span className="text-lg font-bold">{difficulty}/5</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Timer */}
          <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
            timeLeft <= 10 ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'
          }`}>
            <Clock size={16} />
            <span className="font-mono font-bold">{timeLeft}s</span>
          </div>
          
          {/* Power-ups */}
          <div className="flex space-x-2">
            {powerUps.map((powerUp) => (
              <button
                key={powerUp.id}
                onClick={() => handlePowerUpUse(powerUp.id)}
                disabled={isAnswered || !powerUp.available}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  powerUp.available && !isAnswered
                    ? 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30'
                    : 'bg-gray-700/40 text-gray-500 cursor-not-allowed'
                }`}
                title={powerUp.description}
              >
                {powerUp.icon === 'hint' && <Lightbulb size={16} />}
                {powerUp.icon === 'shield' && <Shield size={16} />}
                {powerUp.icon === 'zap' && <Zap size={16} />}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Story context */}
      {question.story && (
        <div className="mb-6 p-4 bg-blue-500/10 rounded-xl border border-blue-400/20">
          <div className="text-sm text-blue-300 mb-2">📖 Story Context</div>
          <div className="text-gray-300">{question.story}</div>
        </div>
      )}

      {/* Question */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white mb-4 leading-relaxed">
          {question.question}
        </h3>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(index)}
            disabled={isAnswered}
            className={`w-full p-4 text-left rounded-xl border transition-all duration-300 ${
              isAnswered
                ? index === question.correct
                  ? 'bg-green-500/20 border-green-400/40 text-green-300'
                  : index === selectedOption
                  ? 'bg-red-500/20 border-red-400/40 text-red-300'
                  : 'bg-gray-700/40 border-gray-600/40 text-gray-400'
                : selectedOption === index
                ? 'bg-blue-500/20 border-blue-400/40 text-blue-300'
                : 'bg-gray-700/40 border-gray-600/40 text-gray-300 hover:border-blue-400/60 hover:bg-gray-600/40'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                isAnswered
                  ? index === question.correct
                    ? 'bg-green-500 text-white'
                    : index === selectedOption
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-600 text-gray-400'
                  : selectedOption === index
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-600 text-gray-400'
              }`}>
                {String.fromCharCode(65 + index)}
              </div>
              <span className="flex-1">{option}</span>
              {isAnswered && index === question.correct && (
                <span className="text-green-400 text-xl">✓</span>
              )}
              {isAnswered && index === selectedOption && index !== question.correct && (
                <span className="text-red-400 text-xl">✗</span>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Hint */}
      {showHint && (
        <div className="mb-6 p-4 bg-yellow-500/10 rounded-xl border border-yellow-400/20">
          <div className="text-sm text-yellow-300 mb-2">💡 Hint</div>
          <div className="text-gray-300">{getHint()}</div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between text-sm text-gray-400">
        <div className="flex items-center space-x-4">
          <span>Question #{question.id}</span>
          {question.mapLocation && (
            <span>📍 {question.mapLocation}</span>
          )}
        </div>
        
        {timeBonus && (
          <div className="flex items-center space-x-2 text-green-400">
            <Zap size={16} />
            <span>Time Bonus Available!</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionCard; 