export interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'drag-drop' | 'fill-blank';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
  points: number;
  timeLimit?: number; // in seconds
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
}

export interface QuizSession {
  id: string;
  courseId: string;
  userId: string;
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  score: number;
  totalPoints: number;
  timeSpent: number;
  streak: number;
  level: number;
  completed: boolean;
  startTime: Date;
  endTime?: Date;
}

export interface QuizResult {
  sessionId: string;
  score: number;
  totalPoints: number;
  accuracy: number;
  timeSpent: number;
  streak: number;
  level: number;
  badges: string[];
  completedAt: Date;
}

export interface QuizBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  condition: string;
}

export interface QuizLevel {
  level: number;
  name: string;
  requiredPoints: number;
  rewards: string[];
  color: string;
} 