import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher(['/admin/signIn','/admin/signIn/(.*)'])

export default clerkMiddleware((auth, req) => {
  if(!isProtectedRoute(req)) auth().protect()
},{signInUrl:'/admin/signIn',signUpUrl:'/not-found'})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
