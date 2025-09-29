// src/lib/db/upload-session.ts
import clientPromise from '@/lib/mongodb';
const dbName = 'olympus_users_cloud'; 
//const uri = process.env.MONGODB_URI!;
const collectionName = 'user_sessions'; 

import { QuizResultDocument } from '@/constant/types';

export async function postSession(sessionLog: QuizResultDocument) {
  const client = await clientPromise;
  const db = client.db(dbName);
  const collection = db.collection(collectionName);

  const result = await collection.insertOne(sessionLog);
  console.log(`📝 Session logged with id: ${result.insertedId}`);
  return { success: true, id: result.insertedId };
}




