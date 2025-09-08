
'use client';
import { useState , useEffect} from 'react';
import { QuizResult } from '@/constant/types';

import { useRouter } from 'next/navigation';
import QuizOnboardPage from '@/components/Quiz/quiz-onboard';
import MCQPage  from '@/components/Quiz/quiz-mcq';   //not used as it only displays questions without rationale 
import QuizDashboardPage from '@/components/Quiz/quiz-dashboard';
import { nclexQuestions } from '@/constant/constants';
import MCQRationalePage from '@/components/Quiz/quiz-rationale'; // used for displaying questions with rationale after submission
import MCQReviewPage from '@/components/Quiz/quiz-review';
import { useItems } from '@/hooks/useItems';
import { useUser  } from '@clerk/nextjs';   // authentication hook

type View = 'home' | 'quiz' | 'dashboard'|'review';

export default function NCLEXQuizApp() {
  /*---------- data fetch ------------ */
  const { data: nclexQuestions = [], isLoading, isError } = useItems();
  /* ------------ state ------------ */
  const [view, setView] = useState<View>('home');
  const [result, setResult] = useState<QuizResult | null>(null);
  const [isSaving, setIsSaving] = useState(false); // state to track if saving is in progress
  const { user , isLoaded } = useUser();   // Clerk user hook 
  
  console.log("📊 States:", { isLoading, isError, questionsLength: nclexQuestions.length });
  useEffect(() => {
    console.log("🔄 useEffect fired - isLoaded:", isLoaded, "user:", !!user);
    if (isLoaded && user) {
      console.log("👤 Clerk user object:", user);
    }
  }, [isLoaded, user]);
  
  /* ------------Early return handlers ------------ */
  if (isLoading) return <div>Loading questions...</div>;
  if (isError || nclexQuestions.length === 0) {
    return <div>Error loading questions.</div>;
  }

  const startQuiz = () => setView('quiz');

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
        credentials: 'include', // Include Clerk session cookies
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
      // You might want to show a toast notification here
      alert("Failed to save quiz result. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  
  /* -------------------------------------------------
     Now receives number[][] (array-of-arrays) because
     every question can have 0..N selected options.
  ------------------------------------------------- */
  const handleSubmit = async (answers: number[][], timeTaken: number) => {
    const processed = nclexQuestions.map((q, i) => {
      const userSet = new Set(answers[i] ?? []);
      const correctSet = new Set(q.correctAnswer);

      const isCorrect =
        userSet.size === correctSet.size &&
        [...userSet].every((idx) => correctSet.has(idx));

      return {
        questionId: q.id,
        selectedAnswers: answers[i] ?? [],   // <-- plural
        correctAnswers: q.correctAnswer,     // <-- plural
        isCorrect,
      };
    });

    // processed = [ { questionId, selectedAnswers: [], correctAnswers: [], isCorrect: Boolean } ]
    console.log("👤 Clerk user result:",processed)

    // Save to database 'log collections' via API
    const quizResult : QuizResult= {
      score: processed.filter((a: any) => a.isCorrect).length,
      totalQuestions: nclexQuestions.length,
      timeTaken,
      answers: processed,
    };
    // Update state to show dashboard view locally 
    setResult(quizResult);

    // Save to backend MongoDB Log collection
    if (quizResult){
      await saveQuizResult(quizResult);
    }
    // Switch to dashboard view
    setView('dashboard');
  };

  const reviewQuiz = () => setView('review');

  const resetQuiz = () => {
    setView('home');
    setResult(null);
  };

  
  /* ------------- render ------------- */
  if (view === 'home') return <QuizOnboardPage onStart={startQuiz} />;
  if (view === 'quiz')
    return (
      <MCQRationalePage nclexQuestions={nclexQuestions} onSubmit={handleSubmit} onExit={() => setView('home')} />
    );
  if (view === 'dashboard' && result)
    return (
      <QuizDashboardPage
        result={result}
        nclexQuestions={nclexQuestions}
        onRestart={resetQuiz}
        onReview={reviewQuiz}
      />
    );
  if (view === 'review' && result)
    return <MCQReviewPage nclexQuestions ={nclexQuestions} result={result} onExit={() => setView('dashboard')} />;

  return null;
}