'use client';

import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { nclexQuestions } from '@/constant/constants';
import MarkdownRenderer from './markdown-renderer';
import { QuizResult } from '@/constant/types';
import { useState } from 'react';

interface Props {
  result: QuizResult;
  onExit: () => void;
}

export default function MCQReviewPage({ result, onExit }: Props) {
  /* ------------ state ------------ */
  const [current, setCurrent] = useState(0);

  /* ------------ derived ------------ */
  const question = nclexQuestions[current];
  const answer = result.answers[current];
  const progress = ((current + 1) / nclexQuestions.length) * 100;

  /* ------------ helpers ------------ */
  const next = () => {
    if (current < nclexQuestions.length - 1) {
      setCurrent((c) => c + 1);
    }
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
            {/* OPTIONS – disabled, always show user’s choice & correct */}
            <RadioGroup value={answer.selectedAnswer.toString()}>
              {question.options.map((opt, i) => {
                const isUserChoice = i === answer.selectedAnswer;
                const isCorrect = i === question.correctAnswer;
                let ring = '';
                if (isCorrect) ring = 'ring-2 ring-green-500';
                else if (isUserChoice && !isCorrect) ring = 'ring-2 ring-red-500';

                return (
                  <div
                    key={i}
                    className={`flex items-center space-x-2 mb-3 p-2 rounded-md ${ring}`}
                  >
                    <RadioGroupItem
                      value={i.toString()}
                      id={`opt-${i}`}
                      disabled
                    />
                    <Label
                      htmlFor={`opt-${i}`}
                      className="cursor-default flex-1"
                    >
                      {opt}
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>

            {/* EXPLANATION – always visible */}
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