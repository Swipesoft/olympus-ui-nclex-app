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