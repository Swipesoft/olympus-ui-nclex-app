'use client';
// src/components/Quiz/quiz-rationale.tsx 
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { NclexQuestion } from '@/constant/types';
import MarkdownRenderer from './markdown-renderer';

interface Props {
  nclexQuestions: NclexQuestion []; // Pass the questions as a prop
  onSubmit: (answers: number[][], timeTaken: number) => void;
  onExit: () => void;
}

export default function MCQRationalePage({ nclexQuestions, onSubmit, onExit }: Props) {
  /* ------------ data fetch ------------ */
  //const { data: nclexQuestions = [], isLoading, isError } = useItems();

  /* ------------ state ------------ */
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[][]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [startTime] = useState(Date.now());

  /* ------------ initialise answers when data arrives ------------ */
  useEffect(() => {
    if (nclexQuestions.length > 0) {
      setSelectedAnswers(nclexQuestions.map(() => []));
    }
  }, [nclexQuestions]);

  /* ------------ loading / error states ------------ */
  //if (isLoading) return <div>Loading questions...</div>;
  //if (isError || nclexQuestions.length === 0) {
    //return <div>Error loading questions.</div>;
  //}

  /* ------------ helpers ------------ */
  const question = nclexQuestions[currentQuestion];
  const isMulti =
    Array.isArray(question.correctAnswer) &&
    question.correctAnswer.length > 1;

  const handleToggle = (index: number) => {
    if (showExplanation) return; // freeze after submit

    const updated = [...selectedAnswers];
    const cur = updated[currentQuestion] || [];

    if (isMulti) {
      updated[currentQuestion] = cur.includes(index)
        ? cur.filter((i) => i !== index)
        : [...cur, index];
    } else {
      updated[currentQuestion] = [index];
    }
    setSelectedAnswers(updated);
  };

  const nextQuestion = () => {
    if (!showExplanation) {
      setShowExplanation(true);
      return;
    }
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
  const progress = ((currentQuestion + 1) / nclexQuestions.length) * 100;

  /* ------------ render ------------ */
  return (
    <div className="min-h-screen bg-white md:bg-gray-50 px-0.5 py-4 md:p-4 font-serif">
      <div className="max-w-2xl mx-auto pt-4 md:pt-8">
        <header className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg md:text-2xl font-bold">
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

        <Card className="border-0 md:border shadow-none md:shadow-sm">
          <CardHeader className="px-2 pt-4 pb-2 md:px-6 md:pt-6">
            <CardTitle className="text-sm md:text-lg leading-relaxed">{question.question}</CardTitle>
          </CardHeader>

          <CardContent className="px-2 py-3 md:px-6 md:py-6">
            {isMulti ? (
              <div className="space-y-3">
                {question.options.map((opt: string, i: number) => (
                  <div key={i} className="flex items-center space-x-2">
                    <Checkbox
                      id={`opt-${i}`}
                      checked={selectedAnswers[currentQuestion]?.includes(i)}
                      onCheckedChange={() => handleToggle(i)}
                      disabled={showExplanation}
                    />
                    <Label htmlFor={`opt-${i}`} className="cursor-pointer">
                      {opt}
                    </Label>
                  </div>
                ))}
              </div>
            ) : (
              <RadioGroup
                value={selectedAnswers[currentQuestion]?.[0]?.toString() || ''}
                onValueChange={(v) => handleToggle(Number(v))}
                disabled={showExplanation}
              >
                {question.options.map((opt: string, i: number) => (
                  <div key={i} className="flex items-center space-x-2 mb-3">
                    <RadioGroupItem value={i.toString()} id={`opt-${i}`} />
                    <Label htmlFor={`opt-${i}`} className="cursor-pointer">
                      {opt}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            {showExplanation && (
              <div className="mt-4 pt-4 border-t">
                <h4 className="font-semibold mb-1 text-sm md:text-base">Rationale</h4>
                <MarkdownRenderer content={question.explanation} />
              </div>
            )}
          </CardContent>

          <CardFooter className="flex justify-end px-2 pb-4 md:px-6 md:pb-6">
            <Button
              onClick={nextQuestion}
              disabled={!selectedAnswers[currentQuestion] || selectedAnswers[currentQuestion].length === 0}
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
