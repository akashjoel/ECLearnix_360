import { QuizQuestion, QuizBadge, QuizLevel } from '../types/quiz';

// Sample quiz questions for different courses
export const quizQuestions: Record<string, QuizQuestion[]> = {
  "1": [ // Complete Web Development
    {
      id: "web-1",
      type: "multiple-choice",
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "High Tech Modern Language",
        "Home Tool Markup Language",
        "Hyperlink and Text Markup Language"
      ],
      correctAnswer: "Hyper Text Markup Language",
      explanation: "HTML stands for Hyper Text Markup Language, which is the standard markup language for creating web pages.",
      points: 10,
      timeLimit: 30,
      difficulty: "easy",
      category: "HTML Fundamentals"
    },
    {
      id: "web-2",
      type: "multiple-choice",
      question: "Which CSS property controls the text size?",
      options: ["font-style", "text-size", "font-size", "text-style"],
      correctAnswer: "font-size",
      explanation: "The font-size property in CSS is used to control the size of text.",
      points: 10,
      timeLimit: 30,
      difficulty: "easy",
      category: "CSS Styling"
    },
    {
      id: "web-3",
      type: "true-false",
      question: "JavaScript is a programming language that runs in the browser.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation: "JavaScript is indeed a programming language that runs in web browsers.",
      points: 15,
      timeLimit: 20,
      difficulty: "easy",
      category: "JavaScript Basics"
    },
    {
      id: "web-4",
      type: "multiple-choice",
      question: "What is React?",
      options: [
        "A programming language",
        "A JavaScript library for building user interfaces",
        "A database management system",
        "An operating system"
      ],
      correctAnswer: "A JavaScript library for building user interfaces",
      explanation: "React is a JavaScript library developed by Facebook for building user interfaces.",
      points: 20,
      timeLimit: 45,
      difficulty: "medium",
      category: "React Framework"
    },
    {
      id: "web-5",
      type: "multiple-choice",
      question: "Which method is used to add elements to the end of an array in JavaScript?",
      options: ["push()", "pop()", "shift()", "unshift()"],
      correctAnswer: "push()",
      explanation: "The push() method adds one or more elements to the end of an array.",
      points: 15,
      timeLimit: 30,
      difficulty: "medium",
      category: "JavaScript Arrays"
    }
  ],
  "2": [ // AI & Machine Learning
    {
      id: "ai-1",
      type: "multiple-choice",
      question: "What is Machine Learning?",
      options: [
        "A type of computer hardware",
        "A subset of artificial intelligence that enables systems to learn from data",
        "A programming language",
        "A database system"
      ],
      correctAnswer: "A subset of artificial intelligence that enables systems to learn from data",
      explanation: "Machine Learning is a subset of AI that allows systems to learn and improve from experience without being explicitly programmed.",
      points: 20,
      timeLimit: 45,
      difficulty: "medium",
      category: "ML Fundamentals"
    },
    {
      id: "ai-2",
      type: "true-false",
      question: "Supervised learning uses labeled training data.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation: "Supervised learning algorithms learn from labeled training data to make predictions on new, unseen data.",
      points: 15,
      timeLimit: 25,
      difficulty: "medium",
      category: "Supervised Learning"
    },
    {
      id: "ai-3",
      type: "multiple-choice",
      question: "Which Python library is most commonly used for machine learning?",
      options: ["NumPy", "Pandas", "Scikit-learn", "Matplotlib"],
      correctAnswer: "Scikit-learn",
      explanation: "Scikit-learn is the most popular Python library for machine learning, providing simple and efficient tools for data mining and analysis.",
      points: 20,
      timeLimit: 40,
      difficulty: "medium",
      category: "Python ML Libraries"
    }
  ],
  "3": [ // Data Science
    {
      id: "ds-1",
      type: "multiple-choice",
      question: "What is the primary purpose of data visualization?",
      options: [
        "To make data look pretty",
        "To communicate insights and patterns in data effectively",
        "To store data securely",
        "To delete unnecessary data"
      ],
      correctAnswer: "To communicate insights and patterns in data effectively",
      explanation: "Data visualization helps communicate complex data insights in a clear and understandable way.",
      points: 15,
      timeLimit: 35,
      difficulty: "easy",
      category: "Data Visualization"
    },
    {
      id: "ds-2",
      type: "multiple-choice",
      question: "Which of the following is NOT a data type in Python?",
      options: ["List", "Dictionary", "Array", "Tuple"],
      correctAnswer: "Array",
      explanation: "Python doesn't have a built-in 'Array' type, but it has lists, dictionaries, and tuples.",
      points: 15,
      timeLimit: 30,
      difficulty: "easy",
      category: "Python Basics"
    }
  ]
};

// Badges for achievements
export const quizBadges: QuizBadge[] = [
  {
    id: "first-quiz",
    name: "First Steps",
    description: "Complete your first quiz",
    icon: "🎯",
    color: "from-blue-500 to-cyan-500",
    condition: "Complete 1 quiz"
  },
  {
    id: "streak-5",
    name: "Hot Streak",
    description: "Answer 5 questions correctly in a row",
    icon: "🔥",
    color: "from-orange-500 to-red-500",
    condition: "5 correct answers in a row"
  },
  {
    id: "speed-demon",
    name: "Speed Demon",
    description: "Complete a quiz in under 2 minutes",
    icon: "⚡",
    color: "from-yellow-500 to-orange-500",
    condition: "Quiz completion time < 2 minutes"
  },
  {
    id: "perfect-score",
    name: "Perfect Score",
    description: "Get 100% on any quiz",
    icon: "🏆",
    color: "from-purple-500 to-pink-500",
    condition: "100% accuracy on any quiz"
  },
  {
    id: "level-5",
    name: "Quiz Master",
    description: "Reach level 5",
    icon: "👑",
    color: "from-indigo-500 to-purple-500",
    condition: "Reach level 5"
  }
];

// Levels and progression
export const quizLevels: QuizLevel[] = [
  {
    level: 1,
    name: "Beginner",
    requiredPoints: 0,
    rewards: ["Basic Quiz Access"],
    color: "from-green-500 to-emerald-500"
  },
  {
    level: 2,
    name: "Apprentice",
    requiredPoints: 100,
    rewards: ["Advanced Questions", "Time Bonuses"],
    color: "from-blue-500 to-cyan-500"
  },
  {
    level: 3,
    name: "Scholar",
    requiredPoints: 250,
    rewards: ["Expert Questions", "Streak Multipliers"],
    color: "from-purple-500 to-pink-500"
  },
  {
    level: 4,
    name: "Expert",
    requiredPoints: 500,
    rewards: ["All Question Types", "Bonus Points"],
    color: "from-orange-500 to-red-500"
  },
  {
    level: 5,
    name: "Master",
    requiredPoints: 1000,
    rewards: ["Custom Quizzes", "Leaderboard Access"],
    color: "from-indigo-500 to-purple-500"
  }
];

// Get questions for a specific course
export const getQuizQuestionsForCourse = (courseId: string): QuizQuestion[] => {
  return quizQuestions[courseId] || [];
};

// Get badge by ID
export const getBadgeById = (badgeId: string): QuizBadge | undefined => {
  return quizBadges.find(badge => badge.id === badgeId);
};

// Get level by points
export const getLevelByPoints = (points: number): QuizLevel => {
  for (let i = quizLevels.length - 1; i >= 0; i--) {
    if (points >= quizLevels[i].requiredPoints) {
      return quizLevels[i];
    }
  }
  return quizLevels[0];
}; 