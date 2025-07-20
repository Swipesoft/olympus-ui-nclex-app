'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Award, Clock, TrendingUp, Check, X } from 'lucide-react';
import { nclexQuestions } from '@/constant/constants';
import { QuizResult } from '@/constant/types';

export default function QuizDashboardPage({
  result,
  onRestart,
}: {
  result: QuizResult;
  onRestart: () => void;
}) {
  const percentage = Math.round((result.score / result.totalQuestions) * 100);
  const passThreshold = 75;

  const formatTime = (s: number) =>
    `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8 pt-8">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">Quiz Results</h1>
          <p className="text-lg text-gray-600">
            Review your performance and learn from your answers
          </p>
        </header>

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
                const userAnswer = result.answers[i];
                const isCorrect = userAnswer?.isCorrect || false;

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
                    <div className="text-sm">
                      <p className="text-gray-600">
                        Your answer:{' '}
                        <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                          {userAnswer?.selectedAnswer !== -1
                            ? q.options[userAnswer?.selectedAnswer]
                            : 'Not answered'}
                        </span>
                      </p>
                      {!isCorrect && (
                        <p className="text-green-600">
                          Correct answer: {q.options[q.correctAnswer]}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="text-center pb-8">
          <Button onClick={onRestart} size="lg">
            Take Another Quiz
          </Button>
        </div>
      </div>
    </div>
  );
}