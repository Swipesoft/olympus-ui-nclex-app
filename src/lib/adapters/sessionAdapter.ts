// src/lib/adapters/sessionAdapter.ts
//1. user_sessions data structure interface from MongoDB ////////////////////////////////////////////////////////
import { ObjectId } from "mongodb";

interface LogAnswer {
    questionId: string;
    selectedAnswers: number [];
    correctAnswers: number [];
    isCorrect: boolean;
}

export interface DbSessionResult {
  _id?: ObjectId;
  userId: string;
  totalQuestions: number;
  answers: LogAnswer[];
  percentage: number;  
  score: number;
  createdAt: Date;
  completedAt: Date;
}    // MongoDB document structure from user_sessions collection 

export interface AllSessionsResult {
    sessions: DbSessionResult[];
}

interface DbUserDynamicsResult{
    _id?: ObjectId; 
    clerkId: string; 
    accuracy: number;
    createdAt: Date; 
    proficiency: number; 
    question_count: number; 
    sessions: string[];
    updatedAt: Date;
} // MongoDB document structure from user_dynamics collection


// 2. Types required by user-profile component //////////////////////////////////////////////////////////////
export interface QuizResult {
  id: string ;
  title: string;
  score: number;
  total: number;
  date: string;
}


export interface PerformanceSummary {
  averageScore: number;
  questionsAttempted: number;
  questionsRemaining: number;
}

// Mock data /////////////////////////////////////////////////////////////////////
const recentResults: QuizResult[] = [
  { id: "abc", title: "Practice 1", score: 18, total: 20, date: "2023-05-15" },
  { id: "def", title: "Practice 2", score: 15, total: 20, date: "2023-05-18" },
  { id: "cdb", title: "Practice 3", score: 17, total: 20, date: "2023-05-20" },
  { id: "xyz", title: "Practice 4", score: 19, total: 20, date: "2023-05-22" },
  { id: "yxz", title: "Practice 5", score: 16, total: 20, date: "2023-05-25" },
];

const scoreTrend= [
  { quiz: "Practice 1", score: 90 },
  { quiz: "Practice 2", score: 75 },
  { quiz: "Practice 3", score: 85 },
  { quiz: "Practice 4", score: 95},
  { quiz: "Practice 5", score: 80},
];


const performanceSummary: PerformanceSummary = {
  averageScore: 82,
  bestScore: 95,
  improvement: 18,
};

// 3. Adapter function to convert DbSessionResult to QuizResult for user-profile component ////////////////////////////////
//export function adaptSessionDataToProfileData( doc :  AllSessionsResult, dynamicsDoc: DbUserDynamicsResult | null ) {
export function adaptSessionDataToProfileData_old( doc :  AllSessionsResult) {
// Convert DbSessionResult to QuizResult
    const adaptedResults: QuizResult[] = doc.sessions.map((session, index) => ({
        id: session._id ? session._id.toString() : "",
        title: `NCLEX Practice Session ${index + 1}`,
        score: session.score,
        total: session.totalQuestions,
        date: session.completedAt.toLocaleDateString('en-GB') // e.g., "07/09/2025"
            //session.completedAt.toISOString().split('T')[0], // Format as YYYY-MM-DD
    }));

    // Sort by date descending
    adaptedResults.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Limit to 5 most recent results
    const recentResults = adaptedResults //.slice(0, 5);

    // Score trend for chart (last 5 sessions)
    const scoreTrend = adaptedResults.slice(0, 5).map((result) => ({
        quiz: result.title,
        score: (result.score / result.total) * 100, // Convert to percentage
    })).reverse(); // Reverse to have oldest first for chart

    // Performance summary
    let averageScore = 0;
    let bestScore = 0;
    let improvement = 0;

    //if (dynamicsDoc) {
        //averageScore = dynamicsDoc.accuracy * 100; // Convert to percentage
        //bestScore = Math.max(...adaptedResults.map(r => (r.score / r.total) * 100));
        //if (adaptedResults.length > 1) {
            //const firstScore = (adaptedResults[adaptedResults.length - 1].score / adaptedResults[adaptedResults.length - 1].total) * 100;
            //const lastScore = (adaptedResults[0].score / adaptedResults[0].total) * 100;
            //improvement = lastScore - firstScore;
        //}
    //}

    //const performanceSummary: PerformanceSummary = {
        //averageScore: parseFloat(averageScore.toFixed(1)),
        //bestScore: parseFloat(bestScore.toFixed(1)),
        //improvement: parseFloat(improvement.toFixed(1)),
    //};

    //return { recentResults, scoreTrend, performanceSummary };
    return recentResults; // only return recentResults for now
}



////////////////////////////////////////////////////////////////////////


const TOTAL_QBANK_QUESTIONS = 368;

export function adaptSessionDataToProfileData(
  doc: AllSessionsResult
): { recentResults: QuizResult[]; performanceSummary: PerformanceSummary } {
  // Map sessions to include both raw Date and formatted string
  const adaptedResults = doc.sessions.map((session, index) => {
    const completedAt = new Date(session.completedAt);
    return {
      id: session._id ? session._id.toString() : "",
      title: `Session on ${index + 1}`,
      score: session.score,
      total: session.totalQuestions,
      completedAt, // keep raw date for sorting
      date: completedAt.toLocaleDateString("en-GB"), // string for QuizResult
    };
  });

  // Sort by actual Date object (newest first)
  adaptedResults.sort((a, b) => b.completedAt.getTime() - a.completedAt.getTime());

  // Limit to 5 most recent results (or all if fewer than 5)
  const limitedResults =
    adaptedResults.length <= 5 ? adaptedResults : adaptedResults.slice(0, 5);

  // Strip out raw Date before returning
  const recentResults: QuizResult[] = limitedResults.map(({ completedAt, ...rest }) => rest);

  // --- Performance Summary ---
  const totalQuestionsAttempted = adaptedResults.reduce(
    (sum, r) => sum + r.total,
    0
  );

  const averageScore =
    adaptedResults.length > 0
      ? adaptedResults.reduce((sum, r) => sum + (r.score / r.total) * 100, 0) /
        adaptedResults.length
      : 0;

  const questionsRemaining = Math.max(
    TOTAL_QBANK_QUESTIONS - totalQuestionsAttempted,
    0
  );

  const performanceSummary: PerformanceSummary = {
    averageScore: parseFloat(averageScore.toFixed(1)),
    questionsAttempted: totalQuestionsAttempted,
    questionsRemaining,
  };

  return { recentResults, performanceSummary };
}

