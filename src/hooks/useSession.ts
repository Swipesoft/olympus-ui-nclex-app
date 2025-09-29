//src/hooks/useSession.ts 
'use client'; 

import { useQuery } from '@tanstack/react-query'; 
// eslint-disable-next-line @typescript-eslint/no-unused-vars 
import { QuizResultDocument } from '@/constant/types'; 
import { adaptSessionDataToProfileData } from '@/lib/adapters/sessionAdapter'; 
import { AllSessionsResult } from '@/lib/adapters/sessionAdapter';

export const useSession = () => { 
    return useQuery({
        queryKey: ['sessions'], 
        queryFn: async () => { 
            const res = await fetch('/api/sessions', { 
                method: 'GET', 
                cache: 'no-store', // avoid stale SSR cache
                credentials: 'include', // send Clerk session cookies
                headers: { 
                    'Content-Type': 'application/json', 
                }, 
            }); 

            if (!res.ok) { 
                if (res.status === 401) { 
                    throw new Error('Unauthorized — please sign in'); 
                } 
                throw new Error('Failed to fetch sessions'); 
            } 

            const data: AllSessionsResult = await res.json(); 
            console.log("Fetched Tanstack sessions data:", data);
            
            return adaptSessionDataToProfileData(data);
        }, 
        staleTime: 1000 * 60 * 10, // 10 minutes
        refetchOnWindowFocus: false, 
        gcTime: 1000 * 60 * 10, // 10 minutes garbage collection time 
    }); 
}