'use client';
import { useState } from 'react';
import { QuizResult } from '@/constant/types';
//import { useRouter } from 'next/navigation';
import QuizOnboardPage from '@/components/Quiz/quiz-onboard';
//import MCQPage from '@/components/Quiz/quiz-mcq';
import QuizDashboardPage from '@/components/Quiz/quiz-dashboard';
import MCQRationalePage from '@/components/Quiz/quiz-rationale';
import MCQReviewPage from '@/components/Quiz/quiz-review';
import NCLEXQuizBuilder from '@/components/QuizBuilder/quiz-builder';
//import { useItems } from '@/hooks/useItems';
import { useUser } from '@clerk/nextjs';
import { generateQuiz } from '@/app/actions/build-items-actions';

// Add this type definition - adjust according to your actual QuizConfig
interface QuizConfig {
  questionTypes: string[];
  subjectAreas: string[];
  difficulty: string;
  numQuestions: number;
  quizMode: string;
  nclexCategories: string[];
  includeMissed: boolean;
  shuffleQuestions: boolean;
  includeImages: boolean;
  includeAudio: boolean;
}
// server action return type Interface
// NB: an alias type for nclexQuestion in  @src/constants/types.ts
interface Question {
  id: string;                // unique identifier for the question
  question: string;          // the question text
  options: string[];         // multiple choice options
  correctAnswer: number[];   // index(es) of the correct option(s)
  explanation: string;       // rationale or teaching point
}

// server action return type Interface
interface QuizData {
  questions: Question[];
  config: QuizConfig;
}

type View = 'build' | 'home' | 'quiz' | 'dashboard' | 'review';

export default function NCLEXQbankApp() {
  /* ------------ state ------------ */
  const [view, setView] = useState<View>('build');
  const [result, setResult] = useState<QuizResult | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isSaving, setIsSaving] = useState(false);
  const { user, isLoaded } = useUser();
  const [quizData, setQuizData] = useState<QuizData | null>(null);

  /* ------------ handlers ------------ */
  const reviewQuiz = () => setView('review');

  const resetQuiz = () => {
    setView('home');
    setResult(null);
  };

  const startQuiz = () => setView('quiz');

  // Handler to generate quiz using server action 
  const handleGenerateQuiz = async (config: QuizConfig) => {
    if (!user) {
      alert("You must be logged in to generate a quiz.");
      return;
    }

    try {
      const result = await generateQuiz(user.id, config.numQuestions);
      
      if (result.success) {
        console.log('Questions:', result.questions);
        setQuizData({
          questions: result.questions,
          config: config
        });
        setView('home'); // This should work now
      } else {
        console.error('Error:', result.error);
        alert('Failed to generate quiz. Please try again.');
      }
    } catch (error) {
      console.error('Error generating quiz:', error);
      alert('An error occurred while generating the quiz.');
    }
  };

  // Save quiz result to backend API
  const saveQuizResult = async (quizResult: QuizResult) => {
    try {
      setIsSaving(true);
      console.log("💾 Saving quiz result...", quizResult);

      const response = await fetch('/api/upload-session-with-dynamics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(quizResult),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save quiz result');
      }

      const data = await response.json();
      console.log("✅ Quiz result saved successfully:", data);
      return data;

    } catch (error) {
      console.error("❌ Error saving quiz result:", error);
      alert("Failed to save quiz result. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmit = async (answers: number[][], timeTaken: number) => {
    if (!quizData?.questions) {
      console.error('No quiz data available');
      return;
    }

    const processed = quizData.questions.map((q, i) => {
      const userSet = new Set(answers[i] ?? []);
      const correctSet = new Set(q.correctAnswer);

      const isCorrect =
        userSet.size === correctSet.size &&
        [...userSet].every((idx) => correctSet.has(idx));

      return {
        questionId: String(q.id),  // stringify all IDs // v1: number
        selectedAnswer: answers[i] ?? [],
        correctAnswer: q.correctAnswer,
        isCorrect,
      };
    });

    console.log("👤 Processed answers:", processed);

    const quizResult: QuizResult = {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      score: processed.filter((a: any) => a.isCorrect).length,
      totalQuestions: quizData.questions.length,
      timeTaken,
      answers: processed,
    };

    setResult(quizResult);

    if (quizResult) {
      await saveQuizResult(quizResult);
    }

    setView('dashboard');
  };

  /* ------------- render ------------- */
  
  // Loading state while user is being loaded
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  // Build view : -> onConfigReady -> home
  if (view === 'build') {
    return <NCLEXQuizBuilder onfinishBuild={handleGenerateQuiz} />;
  }

  // Home view - quiz selection/start page
  if (view === 'home') {
    return <QuizOnboardPage onStart={startQuiz} />;
  }

  // Quiz view - taking the quiz
  if (view === 'quiz' && quizData?.questions) {
    return (
      <MCQRationalePage 
        nclexQuestions={quizData.questions}
        onSubmit={handleSubmit} 
        onExit={() => setView('home')} 
      />
    );
  }

  // Dashboard view - results summary
  if (view === 'dashboard' && quizData?.questions && result) {
    return (
      <QuizDashboardPage
        result={result}
        nclexQuestions={quizData.questions}
        onRestart={resetQuiz}
        onReview={reviewQuiz}
      />
    );
  }

  // Review view - detailed review of questions
  if (view === 'review' && quizData?.questions && result) {
    return (
      <MCQReviewPage 
        nclexQuestions={quizData.questions}
        result={result} 
        onExit={() => setView('dashboard')} 
      />
    );
  }

  // Fallback - if no conditions match, show build view
  return <NCLEXQuizBuilder onfinishBuild={handleGenerateQuiz} />;
}