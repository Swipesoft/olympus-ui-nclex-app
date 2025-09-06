import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb"; 
import { auth } from "@clerk/nextjs/server"; 
//import {  QuizResult  } from "@/constant/types";
import { postSession } from "@/lib/db/upload-session";
import { QuizApiError, QuizApiResponse, QuizResult, QuizResultDocument} from "@/constant/types";
// app/api/items/route.ts
import { getItems } from '@/lib/db/items';

const dbName = 'olympus_users_cloud'; 
const collectionName = 'user_sessions'; 
const uri = process.env.MONGODB_URI!;

//export async function POST(req: NextRequest): Promise<NextResponse<ApiResponse | ErrorResponse>> {
  
export async function POST(req: NextRequest): Promise<NextResponse<QuizApiResponse| QuizApiError>>{
  const { userId }  = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const client = await clientPromise;
  const db = client.db(dbName);
  const quizSession : QuizResult = await req.json(); //parse session from req body
  // Create document to insert as session log in monogodb
  const sessionLog: QuizResultDocument = {
    userId,
    score: quizSession.score,
    totalQuestions: quizSession.totalQuestions,
    answers: quizSession.answers,
    percentage: (quizSession.score / quizSession.totalQuestions) * 100,
    completedAt: new Date(),
    createdAt: new Date(),
  };
  console.log("📥 Received quiz session:", sessionLog);
  
  const result= await postSession(sessionLog);
  return NextResponse.json<QuizApiResponse>({ 
    success: true, 
    id: result.id, 
    message: "Session logged successfully"} , {status:201} );
}



// fetching this route from client-side
//const res = await fetch('/api/items');
//const data = await res.json();
