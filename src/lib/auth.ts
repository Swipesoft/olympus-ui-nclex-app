import { auth, currentUser } from '@clerk/nextjs/server'
//import { prisma } from '@/lib/prisma'
import clientPromise from '@/lib/mongodb';

export async function syncUserWithDatabase() {
  try {
    const { userId } = await auth()
    console.log("Auth userId:", userId);
    
    if (!userId) {
      console.log("No userId found");
      return null;
    }

    const clerkUser = await currentUser()
    if (!clerkUser) {
      console.log("No clerk user found");
      return null;
    }

    // Better email handling
    const primaryEmail = clerkUser.emailAddresses?.find(email => email.id === clerkUser.primaryEmailAddressId)?.emailAddress 
      || clerkUser.emailAddresses?.[0]?.emailAddress 
      || '';

    if (!primaryEmail) {
      console.error("No email found for user:", clerkUser.id);
      return null;
    }

    const data = {
      email: primaryEmail,
      firstName: clerkUser.firstName || '',
      lastName: clerkUser.lastName || '',
      profileImageUrl: clerkUser.imageUrl || '',
    }

    //console.log("Attempting to upsert user:", { clerkId: clerkUser.id, ...data });
    //prisma writes 
    //const result = await prisma.user.upsert({
      //where: { clerkId: clerkUser.id },
      //update: data,
      //create: { clerkId: clerkUser.id, ...data },
    //})

    //console.log("User upserted successfully:", result);
    //return result;

    // mongoDB writes 
    
    const client = await clientPromise;
    const collectionName = 'users';
    const dbName = 'olympus_users_cloud'; 
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Check if user exists
    const existingUser = await collection.findOne({ clerkId: clerkUser.id });

    let mongodb_result;
    if (existingUser) {
      // Update existing user
      mongodb_result = await collection.updateOne(
        { clerkId: clerkUser.id },
        { 
          $set: { 
            ...data, 
            updatedAt: new Date() 
          }
        }
      );
      console.log("User updated:", mongodb_result.modifiedCount);
    } else {
      // Create new user
      mongodb_result = await collection.insertOne({
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
        clerkId: clerkUser.id
      });
      console.log("User created:", mongodb_result.insertedId);
      return mongodb_result; 
    }

    return existingUser;  // result from 'prisma' in v1

  } catch (error) {
  const err = error as Error;
  console.error("Database sync error:", err.message);
  console.error("Error stack:", err.stack);
  return null;
  }
}