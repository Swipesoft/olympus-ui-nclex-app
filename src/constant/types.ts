export interface QuizResult {
  score: number;
  totalQuestions: number;
  timeTaken: number;
  answers: Array<{
    questionId: number;
    selectedAnswer: number;
    correctAnswer: number;
    isCorrect: boolean;
  }>;
}


export interface NclexQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string; // Added for rationale 
}