import { auth, currentUser } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

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

    console.log("Attempting to upsert user:", { clerkId: clerkUser.id, ...data });

    const result = await prisma.user.upsert({
      where: { clerkId: clerkUser.id },
      update: data,
      create: { clerkId: clerkUser.id, ...data },
    })

    console.log("User upserted successfully:", result);
    return result;

  } catch (error) {
  const err = error as Error;
  console.error("Database sync error:", err.message);
  console.error("Error stack:", err.stack);
  return null;
  }
}