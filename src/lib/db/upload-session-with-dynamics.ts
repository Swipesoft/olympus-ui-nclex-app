// src/lib/db/upload-session-with-dynamics.ts
import clientPromise from '@/lib/mongodb';
import { QuizResultDocument, UserDynamicsDocument } from '@/constant/types';
import { ObjectId, ClientSession } from 'mongodb';

const dbName = 'olympus_users_cloud';
const sessionsCollectionName = 'user_sessions';
const dynamicsCollectionName = 'user_dynamics';

// Helper function to calculate overall accuracy

async function calculateUserAccuracy(
  userId: string, 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  db: any,  
  session: ClientSession | undefined
): Promise<string> {
  const pipeline = [
    { $match: { userId } },
    {
      $group: {
        _id: null,
        totalScore: { $sum: '$score' },
        totalQuestions: { $sum: '$totalQuestions' }
      }
    }
  ];

  const result = await db.collection(sessionsCollectionName)
    .aggregate(pipeline, { session }) // Pass session in options object
    .toArray();
  
  if (result.length === 0 || result[0].totalQuestions === 0) {
    return "0.0%";
  }

  const accuracy = (result[0].totalScore / result[0].totalQuestions) * 100;
  return `${accuracy.toFixed(1)}%`;
}

export interface SessionUploadResult {
  success: boolean;
  sessionId: ObjectId;
  userDynamicsId?: ObjectId;
  message: string;
}

export async function postSessionWithDynamics(
  sessionLog: QuizResultDocument
): Promise<SessionUploadResult> {
  const client = await clientPromise;
  const db = client.db(dbName);
  let session: ClientSession | undefined; // null = null; # REFACTORED null to undefined

  try {
    // Start a session for transaction
    session = client.startSession();
    
    let sessionId: ObjectId;
    let userDynamicsId: ObjectId | undefined;

    await session.withTransaction(async () => {
      // 1. Save the quiz session
      const sessionResult = await db.collection<QuizResultDocument>(sessionsCollectionName)
        .insertOne(sessionLog, { session });
      
      sessionId = sessionResult.insertedId;
      console.log(`📝 Session logged with id: ${sessionId}`);

      // 2. Calculate new accuracy (including this session)
      const newAccuracy = await calculateUserAccuracy(sessionLog.userId, db, session);
      
      // 3. Get current user dynamics to update question count and sessions
      const existingDynamics = await db.collection<UserDynamicsDocument>(dynamicsCollectionName)
        .findOne({ clerkId: sessionLog.userId }, { session });

      const currentQuestionCount = existingDynamics?.question_count || 0;
      const currentSessions = existingDynamics?.sessions || [];

      // 4. Upsert user dynamics
      const userDynamicsUpdate: Partial<UserDynamicsDocument> = {
        clerkId: sessionLog.userId,
        accuracy: newAccuracy,
        proficiency: 0.5, // Constant as requested
        sessions: [...currentSessions, sessionId.toString()],
        question_count: currentQuestionCount + sessionLog.totalQuestions,
        updatedAt: new Date(),
      };

      // Add createdAt only if it's a new document
      if (!existingDynamics) {
        userDynamicsUpdate.createdAt = new Date();
      }

      const userDynamicsResult = await db.collection<UserDynamicsDocument>(dynamicsCollectionName)
        .updateOne(
          { clerkId: sessionLog.userId },
          { $set: userDynamicsUpdate },
          { upsert: true, session }
        );

      userDynamicsId = userDynamicsResult.upsertedId || existingDynamics?._id;
      console.log('📊 User dynamics updated:', userDynamicsId);
      
      console.log('✅ Transaction completed:', {
        sessionId: sessionId,
        accuracy: newAccuracy,
        totalQuestions: currentQuestionCount + sessionLog.totalQuestions,
        totalSessions: currentSessions.length + 1
      });
    });

    return {
      success: true,
      sessionId: sessionId!,
      userDynamicsId,
      message: "Session and user dynamics logged successfully"
    };

  } catch (error: unknown) {
    console.error('❌ Transaction failed:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown transaction error';
    throw new Error(`Failed to save session with dynamics: ${errorMessage}`);
  } finally {
    // Always end the session
    if (session) {
      await session.endSession();
    }
  }
}