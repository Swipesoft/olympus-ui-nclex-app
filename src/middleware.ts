import { NextResponse } from 'next/server' 
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/settings(.*)',
  '/profile(.*)',
  '/admin(.*)',
  '/quiz-builder(.*)', // protect the quiz-builder route
  '/quiz(.*)', 
])

export default clerkMiddleware(async(auth, req) => {
  const { userId } = await auth(); 

  // If the route is protected and the user is not authenticated, redirect to /sign-in
  if (isProtectedRoute(req) && !userId) {
  const signInUrl = new URL('/sign-in', req.url);
  signInUrl.searchParams.set('redirect_url', req.url);
  return NextResponse.redirect(signInUrl);
  }
  
  if (isProtectedRoute(req)) {
    // console log: userId
    console.log("🔍 userId from protected 01 middleware:", userId);
    // protect the route using clerk 
    auth.protect()   // redirects to /sign-in
    // manually sync user with database here if needed
    // Call the sync API
    const syncResponse = await fetch(`${req.nextUrl.origin}/api/sync-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Forward the authentication headers
        'Cookie': req.headers.get('cookie') || '',
        },
      });

    if (syncResponse.ok) {
        const syncResult = await syncResponse.json();
        console.log("✅ User sync successful:", syncResult.success);
      } else {
        console.error("❌ User sync failed:", syncResponse.status);
      }
  }
  console.log("🔍 userId from middleware 02:", userId);
  // Return NextResponse to continue the request
  return NextResponse.next(); 
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:css|js|png|jpg|jpeg|svg|ico)).*)',
    '/(api|trpc)(.*)',
  ],
}