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

// Define the interface for the quiz question
interface Props {
  onSubmit: (answers: number[], timeTaken: number) => void;
  onExit: () => void;
}

export default function QuizPage({ onSubmit, onExit }: Props) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [startTime] = useState(Date.now());

  const handleAnswerSelect = (answerIndex: number) => {
    const updated = [...selectedAnswers];
    updated[currentQuestion] = answerIndex;
    setSelectedAnswers(updated);
  };

  const nextQuestion = () => {
    if (currentQuestion < nclexQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const submit = () => {
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    onSubmit(selectedAnswers, timeTaken);
  };

  const question = nclexQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / nclexQuestions.length) * 100;

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
            <RadioGroup
              value={selectedAnswers[currentQuestion]?.toString() || ''}
              onValueChange={(v) => handleAnswerSelect(Number(v))}
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
          </CardContent>

          <CardFooter className="flex justify-between">
            {currentQuestion === nclexQuestions.length - 1 ? (
              <Button
                onClick={submit}
                disabled={selectedAnswers[currentQuestion] === undefined}
              >
                Submit Quiz
              </Button>
            ) : (
              <Button
                onClick={nextQuestion}
                disabled={selectedAnswers[currentQuestion] === undefined}
              >
                Next Question
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}