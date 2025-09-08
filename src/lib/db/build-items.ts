import clientPromise from "@/lib/mongodb";
import { ObjectId } from 'mongodb';

export async function getUnansweredQuestions(clerkId: string, questionCount: number) {
  try {
    const client = await clientPromise;
    
    // Step 1: Get all answered question IDs for this user
    const userSessionsDb = client.db('olympus_users_cloud');
    const sessionsCollection = userSessionsDb.collection('user_sessions');
    
    const sessions = await sessionsCollection.find({ userId: clerkId }).toArray();
    
    // Extract all questionIds from all sessions' answers arrays
    const answeredQuestionIds: string[] = [];
    sessions.forEach(session => {
      if (session.answers && Array.isArray(session.answers)) {
        session.answers.forEach((answer: any) => {
          if (answer.questionId) {
            answeredQuestionIds.push(answer.questionId);
          }
        });
      }
    });

    // Convert string IDs to ObjectIds for MongoDB query
    const answeredObjectIds = answeredQuestionIds.map(id => {
      try {
        return new ObjectId(id);
      } catch {
        return null; // Handle invalid ObjectId strings
      }
    }).filter(id => id !== null);

    // Step 2: Query standalone collection
    const qbankDb = client.db('olympus_qbank_cloud');
    const standaloneCollection = qbankDb.collection('standalone');

    // First try to get unanswered questions
    const unansweredQuestions = await standaloneCollection
      .aggregate([
        { $match: { _id: { $nin: answeredObjectIds } } },
        { $sample: { size: questionCount } }
      ])
      .toArray();

    // Step 3: If we don't have enough unanswered questions, fill the gap
    if (unansweredQuestions.length < questionCount) {
      const remaining = questionCount - unansweredQuestions.length;
      
      // Get additional questions (can include previously answered ones)
      const additionalQuestions = await standaloneCollection
        .aggregate([
          { $match: { _id: { $nin: unansweredQuestions.map(q => q._id) } } },
          { $sample: { size: remaining } }
        ])
        .toArray();

      // Combine both arrays
      return [...unansweredQuestions, ...additionalQuestions];
    }

    return unansweredQuestions;

  } catch (error) {
    console.error('Error fetching unanswered questions:', error);
    throw new Error('Failed to fetch questions');
  }
}