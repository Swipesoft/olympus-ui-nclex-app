import clientPromise  from "@/lib/mongodb"


const dbName = 'olympus_users_cloud'; 
const collectionName = 'user_sessions'; 
//const uri = process.env.MONGODB_URI!; 


export async function getUserSessions(clerkId: string) {
    const client = await clientPromise;
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Fetch sessions for the given clerkId, sorted by most recent
    const sessions = await collection.find({userId: clerkId }).sort({ date: -1 }).toArray();
    return sessions;
}   


// testing the github actions with the trivial change
// another trivial change to test the github actions
