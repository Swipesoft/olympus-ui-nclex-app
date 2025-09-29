// app/api/sync-user/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { syncUserWithDatabase } from '@/lib/auth'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(_req: NextRequest) {
  try {
    console.log("🔄 API: Starting user sync...");
    const result = await syncUserWithDatabase();
    
    if (result) {
      console.log("✅ API: User sync result:", result);
      return NextResponse.json({ success: true, user: result });

    } else {
      return NextResponse.json({ success: false, message: "User not authenticated" });
    }
  } catch (error: unknown) {
    console.error("❌ API sync error:", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}


// @params req renamed to _req to avoid lint error for unused variable