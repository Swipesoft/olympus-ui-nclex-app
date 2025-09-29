// app/api/session-questions/route.ts 
import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import {auth} from '@clerk/nextjs/server';
//import { getItems } from '@/lib/db/items';
import { getQuestionsForSession } from '@/lib/db/sessionQuestions';
//import { get } from 'http';
import { DbSessionResult } from '@/lib/adapters/sessionAdapter';
//import clientPromise from '@/lib/mongodb'; //import reusable peer connection

const dbName = 'olympus_qbank_cloud'; 
const collectionName = 'standalone'; 
const uri = process.env.MONGODB_URI!;

// This is a way to stimulate CI/CD pipeline actions
export async function GET(request: NextRequest) {
  const { userId }  = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  // create params which includes sessionId to fetch questions for that session
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('sessionId');
  if (!sessionId) {
    return NextResponse.json({ error: 'sessionId is required' }, { status: 400 });
  }
  const items = await getQuestionsForSession(sessionId as unknown as DbSessionResult);
  return NextResponse.json(items);
}


// fetching this route from client-side
//const res = await fetch('/api/items');
//const data = await res.json();
