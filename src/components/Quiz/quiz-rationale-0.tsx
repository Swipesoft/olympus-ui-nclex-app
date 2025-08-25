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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
//import { nclexQuestions } from '@/constant/constants';
import { useItems } from '@/hooks/useItems';            // custom hook to fetch questions from /api/items
import MarkdownRenderer from './markdown-renderer';
import { adaptItemsToSchema } from '@/lib/adapters/questionAdapter';

// fetches questions from /api/items and displays them one by one with options
//const res = await fetch('/api/items');
//if (!res.ok) {
  //throw new Error('Failed to fetch questions');
//}
//const data = await res.json();
//export const nclexQuestions = data.map(adaptItemsToSchema);


interface Props {
  onSubmit: (answers: number[][], timeTaken: number) => void;
  onExit: () => void;
}

export default function MCQRationalePage({ onSubmit, onExit }: Props) {

  /*--------------hooks--------------*/
  const { data: nclexQuestions, isLoading, isError } = useItems(); 
  
  /* ------------ state ------------ */
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[][]>(
    nclexQuestions.map(() => [])
  );
  const [showExplanation, setShowExplanation] = useState(false);
  const [startTime] = useState(Date.now());

  /* ------------ helpers ------------ */
  const question = nclexQuestions[currentQuestion];
  const isMulti = Array.isArray(question.correctAnswer) && question.correctAnswer.length > 1;

  /* ------------ Tanstack early return ------------ */
  if (isLoading) return <div>Loading questions...</div>;
  if (isError || !nclexQuestions) return <div>Error loading questions.</div>;

  const handleToggle = (index: number) => {
    if (showExplanation) return; // freeze after submit

    const updated = [...selectedAnswers];
    const cur = updated[currentQuestion];

    if (isMulti) {
      // multi-select behaviour: toggle
      updated[currentQuestion] = cur.includes(index)
        ? cur.filter((i) => i !== index)
        : [...cur, index];
    } else {
      // single-select behaviour: replace
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
            {/* OPTIONS */}
            {isMulti ? (
              // multi-select checkboxes
              <div className="space-y-3">
                {question.options.map((opt, i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={`opt-${i}`}
                      checked={selectedAnswers[currentQuestion].includes(i)}
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
              // single-select radio buttons
              <RadioGroup
                value={selectedAnswers[currentQuestion][0]?.toString() || ''}
                onValueChange={(v) => handleToggle(Number(v))}
                disabled={showExplanation}
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
            )}

            {/* EXPLANATION */}
            {showExplanation && (
              <div className="mt-4 pt-4 border-t">
                <h4 className="font-semibold mb-1">Rationale</h4>
                <MarkdownRenderer content={question.explanation} />
              </div>
            )}
          </CardContent>

          <CardFooter className="flex justify-end">
            <Button
              onClick={nextQuestion}
              disabled={selectedAnswers[currentQuestion].length === 0}
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