//app/api/sessions/route.ts 
import { NextResponse } from "next/server";
//import clientPromise  from "@/lib/mongodb"; 
import {auth} from '@clerk/nextjs/server'; 
// Specific util functions for fetching sessions from DB  // getUserSessions(clerkId: string)
import { getUserSessions } from "@/lib/db/sessions"; 
import { AllSessionsResult } from "@/lib/adapters/sessionAdapter";
//import {get} from 'http'; 


export async function GET() { 
    const { userId }  = await auth();
    console.log("Authenticated userId:", userId);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const sessionsArray = await getUserSessions(userId); // Fetch sessions for the authenticated user
        const sessions: AllSessionsResult = { sessions: sessionsArray };
        console.log("Fetched user sessions:", sessions);
        return NextResponse.json(sessions);
        
    } catch (error) {
        console.error("Error fetching user sessions:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
} 