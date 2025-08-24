import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/settings(.*)',
  '/profile(.*)',
  '/admin(.*)',
])

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect()   // redirects to /sign-in
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:css|js|png|jpg|jpeg|svg|ico)).*)',
    '/(api|trpc)(.*)',
  ],
}