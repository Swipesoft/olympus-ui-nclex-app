import { ObjectId } from 'mongodb';

export interface QuizResult {
  score: number;
  totalQuestions: number;
  timeTaken: number;
  answers: Array<{
    questionId: number;
    selectedAnswer: number[]; //modified for SATA
    correctAnswer: number[];  //modified for SATA
    isCorrect: boolean;
  }>;
}


export interface NclexQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number[];  // <-- changed to array for multi-select in SATA
  explanation: string; // Added for rationale 
}

// API Response Types For MongoDB writes 
export interface QuizApiResponse {
  success: boolean;
  id?: ObjectId;
  sessionId?: ObjectId;
  userDynamicsId?: ObjectId;
  message: string;
}

export interface QuizApiError {
  error: string;
}

// Database Document Types
export interface QuizResultDocument extends Omit<QuizResult, 'answers'> {
  _id?: ObjectId;
  userId: string;
  answers: QuizAnswerDocument[]; //array of student logs
  percentage: number;
  completedAt: Date;
  createdAt: Date;
  updatedAt?: Date;
}

export interface QuizAnswerDocument {
  questionId: string;
  selectedAnswers: number[];
  correctAnswers: number[];
  isCorrect: boolean;
}

export interface UserDynamicsDocument {
  _id?: ObjectId;
  clerkId: string;
  accuracy: string; // e.g., "85.2%"
  proficiency: number; // constant 0.5 for now
  sessions: string[]; // array of quiz_result ObjectIds as strings
  question_count: number; // total questions attempted across all sessions
  createdAt: Date;
  updatedAt: Date;
}