// app/actions/build-items-actions.ts
'use server'

import { getUnansweredQuestions } from '@/lib/db/build-items';
import { adaptItemsToSchema } from '@/lib/adapters/questionAdapter';

export async function generateQuiz(clerkId: string, questionCount: number) {
  try {
    const questions = await getUnansweredQuestions(clerkId, questionCount);
    
    // Convert MongoDB documents to plain objects first, then adapt to your schema
    const serializedQuestions = questions.map(question => {
      // First convert ObjectIds to strings
      const plainQuestion = {
        ...question,
        _id: question._id.toString(),
      };
      
      // Then adapt to your app's schema
      return adaptItemsToSchema(plainQuestion);
    });

    return { success: true, questions: serializedQuestions };
  } catch (error) {
    console.error('Error generating quiz:', error);
    return { success: false, error: 'Failed to generate quiz' };
  }
}

// for guide on server actions, with claude: 
// https://claude.ai/public/artifacts/c4539169-43f6-48dc-83c0-26c2ba5141b7

// Embed code for claude: 
// <iframe src="https://claude.site/public/artifacts/c4539169-43f6-48dc-83c0-26c2ba5141b7/embed" title="Claude Artifact" width="100%" height="600" frameborder="0" allow="clipboard-write" allowfullscreen></iframe>