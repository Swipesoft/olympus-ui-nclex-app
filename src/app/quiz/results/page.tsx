'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { nclexQuestions } from '@/constant/constants';
import { QuizResult } from '@/constant/types';
//import DashboardPage from '@/components/Quiz/quiz-dashboard';
import QuizDashboardPage from '@/components/Quiz/quiz-dashboard';


export default function ResultsRoute() {
  const router = useRouter();
  const [result, setResult] = useState<QuizResult | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem('quizResult');
    if (!raw) {
      router.replace('/quiz'); // no result → back to quiz
      return;
    }
    const { answers, timeTaken } = JSON.parse(raw);
    const processed = nclexQuestions.map((q, i) => ({
      questionId: q.id,
      selectedAnswer: answers[i] ?? -1,
      correctAnswer: q.correctAnswer,
      isCorrect: answers[i] === q.correctAnswer,
    }));
    // console log the cached results 
    alert(`Processed:\n${JSON.stringify(processed, null, 2)}`);
    setResult({
      score: processed.filter((a) => a.isCorrect).length,
      totalQuestions: nclexQuestions.length,
      timeTaken,
      answers: processed,
    });
  }, [router]);


  if (!result) return null;

  return (
    <QuizDashboardPage
      result={result}
      onRestart={() => {
        sessionStorage.removeItem('quizResult');
        router.push('/quiz');
      }}
    />
  );
}