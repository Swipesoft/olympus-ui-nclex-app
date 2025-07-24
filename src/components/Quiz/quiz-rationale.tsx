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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { nclexQuestions } from '@/constant/constants';
import MarkdownRenderer from './markdown-renderer'; 

interface Props {
  onSubmit: (answers: number[], timeTaken: number) => void;
  onExit: () => void;
}

export default function MCQRationalePage({ onSubmit, onExit }: Props) {
  /* ------------ state ------------ */
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showExplanation, setShowExplanation] = useState(false); // NEW
  const [startTime] = useState(Date.now());

  /* ------------ helpers ------------ */
  const handleAnswerSelect = (answerIndex: number) => {
    const updated = [...selectedAnswers];
    updated[currentQuestion] = answerIndex;
    setSelectedAnswers(updated);
  };

  const nextQuestion = () => {
    if (!showExplanation) {
      // first click → reveal explanation
      setShowExplanation(true);
      return;
    }

    // second click → move on / finish
    setShowExplanation(false);
    if (currentQuestion < nclexQuestions.length - 1) {
      setCurrentQuestion((c) => c + 1);
    } else {
      submit();
    }
  };

  const submit = () => {
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    onSubmit(selectedAnswers, timeTaken);
  };

  /* ------------ derived ------------ */
  const question = nclexQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / nclexQuestions.length) * 100;

  /* ------------ render ------------ */
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <header className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">
              Question {currentQuestion + 1} of {nclexQuestions.length}
            </h2>
            <Button variant="outline" onClick={onExit}>
              Exit Quiz
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
            {/* OPTIONS – always visible */}
            <RadioGroup
              value={selectedAnswers[currentQuestion]?.toString() || ''}
              onValueChange={(v) => handleAnswerSelect(Number(v))}
              disabled={showExplanation} // optionally freeze the radio group after submit
            >
              {question.options.map((opt, i) => (
                <div key={i} className="flex items-center space-x-2 mb-3">
                  <RadioGroupItem value={i.toString()} id={`opt-${i}`} />
                  <Label htmlFor={`opt-${i}`} className="cursor-pointer">
                    {opt}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            {/* EXPLANATION – appears only after submit */}
            {showExplanation && (
              <div className="mt-4 pt-4 border-t">
                <h4 className="font-semibold mb-1">Rationale</h4>
                {/*If displaying HTML as rationale directly instead of Markdown */}
                {/* <p className="text-sm text-gray-700">{question.explanation}</p> */} 
                <MarkdownRenderer content={question.explanation} />
              </div>
            )}
          </CardContent>

          <CardFooter className="flex justify-end">
            <Button
              onClick={nextQuestion}
              disabled={selectedAnswers[currentQuestion] === undefined}
            >
              {!showExplanation
                ? 'Check Answer'
                : currentQuestion === nclexQuestions.length - 1
                ? 'Finish Quiz'
                : 'Next Question'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}