"use client";
import UserProfile from '@/components/Profile/user-profile'; 
import { useState } from 'react';
import MCQRationalePage from '@/components/Quiz/quiz-rationale';
import MCQReviewPage from '@/components/Quiz/quiz-review'; 
import QuizDashboardPage from '@/components/Quiz/quiz-dashboard';
import { QuizResult } from '@/constant/types'; 
import { useSession  } from '@/hooks/useSession'; 
import { useSyncUser } from '@/hooks/useSyncUser';


type View = 'profile' | 'dashboard' | 'review'; 

export default function ProfilePageContainer() {
    // fetch user profile data using custom hook 
    const { data: sessionData, isLoading: isSessionLoading, isError: isSessionError } = useSession();
    const { data: syncData, isLoading: isSyncLoading, isError: isSyncError } = useSyncUser();
    // Destructure recentResults and performanceSummary from sessionData if available
    const { recentResults = [], performanceSummary , scoreTrend} = sessionData ?? {};

    // Build full name from syncData API response loaded JSON object if available
    function capitalize(word: string) {
        return word ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : '';
    }
    const fullName =
        syncData?.success && syncData.user
            ? `${capitalize(syncData.user.firstName ?? '')} ${capitalize(syncData.user.lastName ?? '')}`.trim()
            : '';


    //manage state for view switching between profile and review of past quizzes/sessions 
    const [view, setView] = useState<View>('profile');
    const [result, setResult] = useState<QuizResult | null>(null); 

    // Destructure performance summary from recentResults if available

    // Tanstack early return handlers 
    if (isSessionLoading) return <div>Loading profile...</div>; 
    if (isSessionError) return <div>Error loading profile.</div>;
    if (!recentResults ) return <div>No profile data found.</div>; // || recentResults.length === 0
    if (!performanceSummary) return <div>No performance summary data found.</div>;
    if (!scoreTrend) return <div>No score trend data found.</div>;

    const switchToReview = () => setView('review'); // function to switch to review past quizzes/sessions
    const switchToProfile = () => setView('profile'); // function to switch back to profile view 

    //render based on current view state 
    if (view === 'profile') return <UserProfile
                        fullName={fullName} 
                        performanceSummary={performanceSummary} 
                        recentResults={recentResults}
                        scoreTrend={scoreTrend}
                    />;

                    
    // Not working yet - needs to pass nclexQuestions prop as null for now
    if (view === 'dashboard' && result)
        return (
            <QuizDashboardPage 
                result = {result} 
                onRestart = {switchToProfile} 
                onReview = {switchToReview}
                nclexQuestions={null}
            />
            );
    // Not working yet - needs to pass nclexQuestions prop as null for now
    if (view === 'review' && result) 
        return <MCQReviewPage nclexQuestions={null} result={result} onExit={() => setView('profile')} />; 

    return <div>fallback null</div> // fallback return
}