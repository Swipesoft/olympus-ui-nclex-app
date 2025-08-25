
'use client';
import { useState } from 'react';
import { QuizResult } from '@/constant/types';

import { useRouter } from 'next/navigation';
import QuizOnboardPage from '@/components/Quiz/quiz-onboard';
import MCQPage  from '@/components/Quiz/quiz-mcq';   //not used as it only displays questions without rationale 
import QuizDashboardPage from '@/components/Quiz/quiz-dashboard';
import { nclexQuestions } from '@/constant/constants';
import MCQRationalePage from '@/components/Quiz/quiz-rationale'; // used for displaying questions with rationale after submission
import MCQReviewPage from '@/components/Quiz/quiz-review';

// my turn 

//import { useState } from 'react';
//import { QuizResult } from './types/quiz';
//import HomePage from './components/HomePage';
//import QuizPage from './components/QuizPage';
//import DashboardPage from './components/DashboardPage';


type View = 'home' | 'quiz' | 'dashboard'|'review';

export default function NCLEXQuizApp() {
  const [view, setView] = useState<View>('home');
  const [result, setResult] = useState<QuizResult | null>(null);

  const startQuiz = () => setView('quiz');

  /* -------------------------------------------------
     Now receives number[][] (array-of-arrays) because
     every question can have 0..N selected options.
  ------------------------------------------------- */
  const handleSubmit = (answers: number[][], timeTaken: number) => {
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

    setResult({
      score: processed.filter((a) => a.isCorrect).length,
      totalQuestions: nclexQuestions.length,
      timeTaken,
      answers: processed,
    });
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
      <MCQRationalePage onSubmit={handleSubmit} onExit={() => setView('home')} />
    );
  if (view === 'dashboard' && result)
    return (
      <QuizDashboardPage
        result={result}
        onRestart={resetQuiz}
        onReview={reviewQuiz}
      />
    );
  if (view === 'review' && result)
    return <MCQReviewPage result={result} onExit={() => setView('dashboard')} />;

  return null;
}