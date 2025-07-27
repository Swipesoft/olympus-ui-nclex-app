
'use client';
import { useState } from 'react';
import { QuizResult } from '@/constant/types';

import { useRouter } from 'next/navigation';
import QuizOnboardPage from '@/components/Quiz/quiz-onboard';
import MCQPage  from '@/components/Quiz/quiz-mcq';
import QuizDashboardPage from '@/components/Quiz/quiz-dashboard';
import { nclexQuestions } from '@/constant/constants';
import MCQRationalePage from '@/components/Quiz/quiz-rationale';
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

  const handleSubmit = (answers: number[], timeTaken: number) => {
    const processed = nclexQuestions.map((q, i) => ({
      questionId: q.id,
      selectedAnswer: answers[i] ?? -1,
      correctAnswer: q.correctAnswer,
      isCorrect: answers[i] === q.correctAnswer,
    }));

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

  if (view === 'home') return <QuizOnboardPage onStart={startQuiz} />;
  if (view === 'quiz')
    return (
      <MCQRationalePage
        onSubmit={handleSubmit}
        onExit={() => setView('home')}
      />
    );
  if (view === 'dashboard' && result)
    return <QuizDashboardPage result={result} onRestart={resetQuiz} onReview={reviewQuiz}/>;

  if (view === 'review' && result) 
    return <MCQReviewPage result={result} onExit={()=>setView('dashboard')} />; 
     
  return null;
}