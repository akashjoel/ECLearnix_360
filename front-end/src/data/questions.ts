export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  points: number;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const questions: Question[] = [
  {
    id: '1',
    question: 'What is the correct way to declare a variable in JavaScript?',
    options: ['var x = 5;', 'variable x = 5;', 'v x = 5;', 'declare x = 5;'],
    correctAnswer: 'var x = 5;',
    explanation: 'The correct syntax is "var x = 5;" or "let x = 5;" or "const x = 5;"',
    points: 10,
    category: 'JavaScript',
    difficulty: 'easy'
  },
  {
    id: '2',
    question: 'Which method is used to add an element to the end of an array?',
    options: ['push()', 'pop()', 'shift()', 'unshift()'],
    correctAnswer: 'push()',
    explanation: 'The push() method adds one or more elements to the end of an array.',
    points: 10,
    category: 'JavaScript',
    difficulty: 'easy'
  },
  {
    id: '3',
    question: 'What does the "===" operator check for?',
    options: ['Value equality', 'Value and type equality', 'Type equality', 'Reference equality'],
    correctAnswer: 'Value and type equality',
    explanation: 'The "===" operator checks both value and type equality, while "==" only checks value equality.',
    points: 10,
    category: 'JavaScript',
    difficulty: 'medium'
  },
  {
    id: '4',
    question: 'What is a closure in JavaScript?',
    options: ['A function that has access to variables in its outer scope', 'A way to close browser tabs', 'A method to end loops', 'A type of variable'],
    correctAnswer: 'A function that has access to variables in its outer scope',
    explanation: 'A closure is a function that has access to variables in its outer (enclosing) scope even after the outer function has returned.',
    points: 15,
    category: 'JavaScript',
    difficulty: 'hard'
  },
  {
    id: '5',
    question: 'Which of the following is NOT a JavaScript framework?',
    options: ['React', 'Angular', 'Vue', 'Django'],
    correctAnswer: 'Django',
    explanation: 'Django is a Python web framework, not a JavaScript framework.',
    points: 10,
    category: 'JavaScript',
    difficulty: 'easy'
  }
];

export const getQuestionsByCategory = (category: string): Question[] => {
  return questions.filter(q => q.category === category);
};

export const getQuestionsByDifficulty = (difficulty: 'easy' | 'medium' | 'hard'): Question[] => {
  return questions.filter(q => q.difficulty === difficulty);
}; 