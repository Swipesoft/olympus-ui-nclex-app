'use client';
// src/components/Quiz/quiz-dashboard.tsx
import { Button } from '@/components/ui/button';
import { useState } from 'react'; 
import { useRouter } from 'next/navigation'; 
import {
  Card,
  CardContent,
  CardDescription,
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
  nclexQuestions: NclexQuestion[] | null;
  onRestart: () => void;
  onReview: () => void;
}) {
  const router = useRouter(); 
  // Add pagination state 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calculate pagination
const totalPages = Math.ceil((nclexQuestions?.length || 0) / itemsPerPage);
const startIndex = (currentPage - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;
const currentQuestions = (nclexQuestions ?? []).slice(startIndex, endIndex);

  /* ------------ helpers ------------ */
  const percentage = Math.round((result.score / result.totalQuestions) * 100);
  const passThreshold = 65;

  const formatTime = (s: number) =>
    `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  /* helper: turn array of indices → "A, C" or "B" */
  const pretty = (indices: number[]) =>
    indices.length
      ? indices.map((i) => String.fromCharCode(65 + i)).join(', ')
      : 'Not answered';

  return (
    <div className="min-h-screen bg-white md:bg-gray-50 px-0.5 py-4 md:p-4 font-serif">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-4 md:mb-8 pt-2 md:pt-8 px-2">
          <h1 className="text-xl md:text-3xl font-bold text-blue-900 mb-1 md:mb-2">Quiz Results</h1>
          <p className="text-base text-lg text-gray-600">
            Review your performance and learn from your answers
          </p>
        </header>

        {/* --- summary cards (unchanged) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 mb-4 md:mb-8 px-1 md:px-0">
          <Card className="border md:border shadow-sm md:shadow-sm">
            <CardHeader className="pb-1 md:pb-3 px-3 pt-3 md:px-6 md:pt-6">
              <CardTitle className="text-base md:text-lg flex items-center">
                <Award className="h-3 w-3 md:h-5 md:w-5 mr-1.5 md:mr-2" />
                Score
              </CardTitle>
            </CardHeader>
            <CardContent className="px-3 pb-3 md:px-6 md:pb-6">
              <div className="text-xl md:text-3xl font-bold">
                {result.score}/{result.totalQuestions}
              </div>
              <div className="text-sm text-gray-600">{percentage}%</div>
            </CardContent>
          </Card>

          <Card className="border md:border shadow-sm md:shadow-sm">
            <CardHeader className="pb-1 md:pb-3 px-3 pt-3 md:px-6 md:pt-6">
              <CardTitle className="text-sm md:text-lg flex items-center">
                <Clock className="h-3 w-3 md:h-5 md:w-5 mr-1.5 md:mr-2" />
                Time Taken
              </CardTitle>
            </CardHeader>
            <CardContent className="px-3 pb-3 md:px-6 md:pb-6">
              <div className="text-xl md:text-3xl font-bold">
                {formatTime(result.timeTaken)}
              </div>
              <div className="text-sm text-gray-600">minutes</div>
            </CardContent>
          </Card>

          <Card className="border md:border shadow-sm md:shadow-sm">
            <CardHeader className="pb-1 md:pb-3 px-3 pt-3 md:px-6 md:pt-6">
              <CardTitle className="text-sm md:text-lg flex items-center">
                <TrendingUp className="h-3 w-3 md:h-5 md:w-5 mr-1.5 md:mr-2" />
                Status
              </CardTitle>
            </CardHeader>
            <CardContent className="px-3 pb-3 md:px-6 md:pb-6">
              <div
                className={`text-xl md:text-2xl font-bold ${
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

        {/* --- question-by-question review  with mini-pagination--- */}
        {/* --- question-by-question review with pagination --- */}
        <Card className="mb-6 border-0 md:border shadow-none md:shadow-sm">
          <CardHeader className="px-2 pt-4 pb-2 md:px-6 md:pt-6">
            <CardTitle className="text-base md:text-lg">Question Review</CardTitle>
              <CardDescription className="text-xs md:text-sm">
                Review each question and see the correct answers
              </CardDescription>
          </CardHeader>
          <CardContent className="px-2 py-3 md:px-6 md:py-6">
            <div className="space-y-3 md:space-y-4">
              {currentQuestions.map((q, idx) => {
                const globalIndex = startIndex + idx;
                const userAnswers = result.answers[globalIndex]?.selectedAnswer || [];
                const correctAnswers = result.answers[globalIndex]?.correctAnswer || [];
                const isCorrect = result.answers[globalIndex]?.isCorrect || false;

                return (
                  <div key={q.id} className="border rounded-lg p-3 md:p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm md:text-base">
                        Question {globalIndex + 1}
                      </h4>
                      {isCorrect ? (
                        <Check className="h-4 w-4 md:h-5 md:w-5 text-green-600 flex-shrink-0" />
                      ) : (
                        <X className="h-4 w-4 md:h-5 md:w-5 text-red-600 flex-shrink-0" />
                      )}
                    </div>

                    <p className="text-xs md:text-sm text-gray-700 mb-2 leading-relaxed">
                      {q.question}
                    </p>

                    <div className="text-xs md:text-sm space-y-1">
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

              {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-6 flex flex-col items-center gap-4">
                {/* Page Info */}
                <div className="text-xs md:text-sm text-gray-600">
                  Page {currentPage} of {totalPages} ({startIndex + 1}-
                  {Math.min(endIndex, nclexQuestions?.length || 0)} of{' '}
                  {nclexQuestions?.length || 0} questions)
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="text-xs md:text-sm"
                  >
                    Previous
                  </Button>

                  {/* Page Numbers */}
                    <div className="flex gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                     <Button
                       key={page}
                       variant={currentPage === page ? 'default' : 'outline'}
                       size="sm"
                       onClick={() => setCurrentPage(page)}
                       className={`w-8 h-8 md:w-10 md:h-10 p-0 text-xs md:text-sm ${
                         currentPage === page ? 'bg-blue-600 text-white' : ''
                       }`}
                       >
                      {page}
                      </Button>
                    ))}
                 </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p:number) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="text-xs md:text-sm"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

        {/* --- action buttons (unchanged) --- */}
        <div className="max-w-4xl mx-auto pb-6 md:pb-8 px-2 md:px-0">
          <div className="flex flex-col gap-3 md:gap-4">
            <Button onClick={onRestart} size="lg" className="w-full text-sm md:text-base">
              Re-attempt Questions
            </Button>
            <Button onClick={onReview} size="lg" variant="outline" className="w-full text-sm md:text-base">
              Review Content Rationale
            </Button>
            <Button onClick={() => router.push('/profile')} size="lg" className="w-full text-sm md:text-base">
              Return to Profile 
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}