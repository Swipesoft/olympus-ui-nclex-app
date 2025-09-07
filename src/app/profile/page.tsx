"use client";
import UserProfile from '@/components/Profile/user-profile'; 
import { useState } from 'react';
import MCQRationalePage from '@/components/Quiz/quiz-rationale';
import MCQReviewPage from '@/components/Quiz/quiz-review'; 
import QuizDashboardPage from '@/components/Quiz/quiz-dashboard';
import { QuizResult } from '@/constant/types'; 
import { useSession  } from '@/hooks/useSession'; 


type View = 'profile' | 'dashboard' | 'review'; 

export default function ProfilePageContainer() {
    // fetch user profile data using custom hook 
    const { data: recentResults= [], isLoading, isError } = useSession(); 
    //manage state for view switching between profile and review of past quizzes/sessions 
    const [view, setView] = useState<View>('profile');
    const [result, setResult] = useState<QuizResult | null>(null); 

    // Tanstack early return handlers 
    if (isLoading) return <div>Loading profile...</div>; 
    if (isError) return <div>Error loading profile.</div>;
    if (!recentResults || recentResults.length === 0) return <div>No profile data found.</div>;

    const switchToReview = () => setView('review'); // function to switch to review past quizzes/sessions
    const switchToProfile = () => setView('profile'); // function to switch back to profile view 

    //render based on current view state 
    if (view === 'profile') return <UserProfile recentResults={recentResults} />;
    if (view === 'dashboard' && result)
        return (
            <QuizDashboardPage 
                result = {result} 
                onRestart = {switchToProfile} 
                onReview = {switchToReview}
                nclexQuestions={null}
            
            />
            );

    if (view === 'review' && result) 
        return <MCQReviewPage nclexQuestions={null} result={result} onExit={() => setView('profile')} />; 

    return <div>fallback null</div> // fallback return
}