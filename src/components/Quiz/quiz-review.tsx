'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { NclexQuestion } from '@/constant/types';
import MarkdownRenderer from './markdown-renderer';
import { QuizResult } from '@/constant/types';

interface Props {
  nclexQuestions: NclexQuestion[]; // Pass the questions as a prop
  result: QuizResult;
  onExit: () => void;
}

export default function MCQReviewPage({ nclexQuestions, result, onExit }: Props) {
  /* ------------ state ------------ */
  const [current, setCurrent] = useState(0);

  /* ------------ derived ------------ */
  const question = nclexQuestions[current];
  const answer = result.answers[current];
  const progress = ((current + 1) / nclexQuestions.length) * 100;

  const selectedSet = new Set(answer?.selectedAnswer ?? []);
  const correctSet = new Set(question.correctAnswer);

  /* ------------ helpers ------------ */
  const next = () => {
    if (current < nclexQuestions.length - 1) setCurrent((c) => c + 1);
  };
  const prev = () => {
    if (current > 0) setCurrent((c) => c - 1);
  };

  /* ------------ render ------------ */
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <header className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">
              Review {current + 1} / {nclexQuestions.length}
            </h2>
            <Button variant="outline" onClick={onExit}>
              Exit Review
            </Button>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </header>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{question.question}</CardTitle>
          </CardHeader>

          <CardContent>
            {/* OPTIONS – read-only checkboxes */}
            <div className="space-y-3">
              {question.options.map((opt, i) => {
                const isSelected = selectedSet.has(i);
                const isCorrect = correctSet.has(i);

                let ring = '';
                if (isCorrect) ring = 'ring-2 ring-green-500';
                else if (isSelected && !isCorrect) ring = 'ring-2 ring-red-500';

                return (
                  <div
                    key={i}
                    className={`flex items-center space-x-2 p-2 rounded-md ${ring}`}
                  >
                    <Checkbox
                      id={`opt-${i}`}
                      checked={isSelected}
                      disabled
                      aria-readonly
                    />
                    <Label htmlFor={`opt-${i}`} className="cursor-default flex-1">
                      {opt}
                    </Label>
                  </div>
                );
              })}
            </div>

            {/* EXPLANATION */}
            <div className="mt-6 pt-4 border-t">
              <h4 className="font-semibold mb-1">Rationale</h4>
              <MarkdownRenderer content={question.explanation} />
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button onClick={prev} disabled={current === 0}>
              Previous
            </Button>
            {current === nclexQuestions.length - 1 ? (
              <Button onClick={onExit}>Finish Review</Button>
            ) : (
              <Button onClick={next}>Next</Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}