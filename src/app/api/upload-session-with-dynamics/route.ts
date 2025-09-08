// app/api/upload-session-with dynamics/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { QuizResult, QuizResultDocument, QuizApiResponse, QuizApiError } from '@/constant/types';
import { postSessionWithDynamics } from '@/lib/db/upload-session-with-dynamics';

export async function POST(req: NextRequest): Promise<NextResponse<QuizApiResponse | QuizApiError>> {
  try {
    // Get user from Clerk server-side
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json<QuizApiError>(
        { error: 'Unauthorized' }, 
        { status: 401 }
      );
    }

    // Parse quiz session from request body
    const quizSession: QuizResult = await req.json();
    
    // Validate the data
    if (typeof quizSession.score !== 'number' || quizSession.score < 0) {
      return NextResponse.json<QuizApiError>(
        { error: 'Invalid quiz result data - score must be a valid number' }, 
        { status: 400 }
      );
    }

    if (!Array.isArray(quizSession.answers) || quizSession.answers.length === 0) {
      return NextResponse.json<QuizApiError>(
        { error: 'Invalid quiz result data - answers array is required' }, 
        { status: 400 }
      );
    }

    if (typeof quizSession.totalQuestions !== 'number' || quizSession.totalQuestions <= 0) {
      return NextResponse.json<QuizApiError>(
        { error: 'Invalid quiz result data - totalQuestions must be a positive number' }, 
        { status: 400 }
      );
    }

    // Create document to insert as session log in MongoDB
    const sessionLog: QuizResultDocument = {
      userId,
      score: quizSession.score,
      totalQuestions: quizSession.totalQuestions,
      answers: quizSession.answers,
      timeTaken: quizSession.timeTaken,
      percentage: (quizSession.score / quizSession.totalQuestions) * 100,
      completedAt: new Date(),
      createdAt: new Date(),
    };

    console.log("📥 Received quiz session:", sessionLog);

    // Save session and update user dynamics with transaction
    const result = await postSessionWithDynamics(sessionLog);

    return NextResponse.json<QuizApiResponse>({
      success: true,
      sessionId: result.sessionId,
      userDynamicsId: result.userDynamicsId,
      message: result.message
    }, { status: 201 });

  } catch (error: unknown) {
    console.error('❌ API route error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return NextResponse.json<QuizApiError>(
      { error: errorMessage }, 
      { status: 500 }
    );
  }
}