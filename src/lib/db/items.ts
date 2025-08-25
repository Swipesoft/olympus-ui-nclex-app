import clientPromise from '@/lib/mongodb';
import { adaptItemsToSchema } from '@/lib/adapters/questionAdapter';
//import { adaptItemsToSchema } from '@/lib/adapters/questionAdapter';

const dbName = 'olympus_qbank_cloud'; 
const collectionName = 'standalone'; 
const uri = process.env.MONGODB_URI!;


export async function getItems() {
  const client = await clientPromise;
  const db = client.db(dbName);

  // return all items from collection
  //const items = await db.collection(collectionName).find({}).toArray();

  // sample 5 random items from collection 
    const items = await db
        .collection(collectionName)
        .aggregate([{ $sample: { size: 5 } }])
        .toArray();

    //const result = await items.json(); 
    //const adaptedItems = items.map(adaptItemsToSchema);
    return items;
}



// fetching this route from client-side
//const res = await fetch('/api/items');
//const data = await res.json();
