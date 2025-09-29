'use client';
// src/components/Quiz/quiz-dashboard.tsx
import { Button } from '@/components/ui/button';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter, // eslint-disable-next-line @typescript-eslint/no-unused-vars 
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Award, Clock, TrendingUp, Check, X } from 'lucide-react';
//import { nclexQuestions } from '@/constant/constants';
import { QuizResult } from '@/constant/types';
import { NclexQuestion } from '@/constant/types';

export default function QuizDashboardPage({
  result,
  nclexQuestions,
  onRestart,
  onReview,
}: {
  result: QuizResult;
  nclexQuestions: NclexQuestion[];
  onRestart: () => void;
  onReview: () => void;
}) {
  /* ------------ data fetch ------------ */
  //const { data: nclexQuestions = [], isLoading, isError } = useItems();
  //if (isLoading) return <div>Loading questions...</div>;
  //if (isError || nclexQuestions.length === 0) {
    //return <div>Error loading questions.</div>;
  //}
  const percentage = Math.round((result.score / result.totalQuestions) * 100);
  const passThreshold = 75;

  const formatTime = (s: number) =>
    `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  /* helper: turn array of indices → "A, C" or "B" */
  const pretty = (indices: number[]) =>
    indices.length
      ? indices.map((i) => String.fromCharCode(65 + i)).join(', ')
      : 'Not answered';

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8 pt-8">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">Quiz Results</h1>
          <p className="text-lg text-gray-600">
            Review your performance and learn from your answers
          </p>
        </header>

        {/* --- summary cards (unchanged) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Award className="h-5 w-5 mr-2" />
                Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {result.score}/{result.totalQuestions}
              </div>
              <div className="text-sm text-gray-600">{percentage}%</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Time Taken
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {formatTime(result.timeTaken)}
              </div>
              <div className="text-sm text-gray-600">minutes</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={`text-2xl font-bold ${
                  percentage >= passThreshold ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {percentage >= passThreshold ? 'Passed' : 'Failed'}
              </div>
              <div className="text-sm text-gray-600">
                {percentage >= passThreshold ? 'Great job!' : 'Keep practicing'}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* --- question-by-question review --- */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Question Review</CardTitle>
            <CardDescription>
              Review each question and see the correct answers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {nclexQuestions.map((q, i) => {
                const userAnswers = result.answers[i]?.selectedAnswers || [];
                const correctAnswers = result.answers[i]?.correctAnswers || [];
                const isCorrect = result.answers[i]?.isCorrect || false;

                return (
                  <div key={q.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium">Question {i + 1}</h4>
                      {isCorrect ? (
                        <Check className="h-5 w-5 text-green-600" />
                      ) : (
                        <X className="h-5 w-5 text-red-600" />
                      )}
                    </div>

                    <p className="text-sm text-gray-700 mb-2">{q.question}</p>

                    <div className="text-sm space-y-1">
                      <p>
                        Your answer:{' '}
                        <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                          {pretty(userAnswers)}
                        </span>
                      </p>

                      {!isCorrect && (
                        <p className="text-green-600">
                          Correct answer: {pretty(correctAnswers)}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* --- action buttons (unchanged) --- */}
        <div className="max-w-4xl mx-auto pb-8 px-0">
          <div className="flex flex-col gap-4">
            <Button onClick={onRestart} size="lg" className="w-full">
              Take Another Quiz
            </Button>
            <Button onClick={onReview} size="lg" variant="outline" className="w-full">
              Review My Answers
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}