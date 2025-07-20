"use client"; 

import { Button } from "@/components/ui/button"; 
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { BookOpen, Clock, TrendingUp } from 'lucide-react';

import { nclexQuestions } from '@/constant/constants'


export default function QuizOnboardPage({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8 pt-8">
          <h1 className="text-4xl font-bold text-blue-900 mb-2">
            NCLEX Practice Quiz
          </h1>
          <p className="text-lg text-gray-600">
            Test your nursing knowledge with our comprehensive quiz
          </p>
        </header>

        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Ready to Start?</CardTitle>
            <CardDescription>
              This quiz contains {nclexQuestions.length} questions covering key
              NCLEX topics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                <span className="text-sm">Multiple choice questions</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-blue-600" />
                <span className="text-sm">Track your time</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <span className="text-sm">View detailed analytics</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={onStart} className="w-full">
              Start Quiz
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}