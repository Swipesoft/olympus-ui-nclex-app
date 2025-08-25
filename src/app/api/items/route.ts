// app/api/items/route.ts
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import {auth} from '@clerk/nextjs/server';
//import { getItems } from '@/lib/db/items';
import { getItems } from '@/lib/db/items';
import { MongoClient } from 'mongodb';
import { get } from 'http';
//import clientPromise from '@/lib/mongodb'; //import reusable peer connection

const dbName = 'olympus_qbank_cloud'; 
const collectionName = 'standalone'; 
const uri = process.env.MONGODB_URI!;


export async function GET() {
  const { userId }  = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const client = await clientPromise;
  const db = client.db(dbName);
  // return all items from collection
  //const items = await db.collection(collectionName).find({}).toArray();
  // sample 5 random items from collection 
  const items = await getItems();
  return NextResponse.json(items);
}



// fetching this route from client-side
//const res = await fetch('/api/items');
//const data = await res.json();
