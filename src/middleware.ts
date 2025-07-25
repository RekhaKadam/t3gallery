import { clerkMiddleware ,createRouteMatcher} from '@clerk/nextjs/server'
import { is } from 'drizzle-orm';

const isProtectedRoute = createRouteMatcher(["/.dashboard(.*)"]);
export default clerkMiddleware(async (auth, request) => {
    if (isProtectedRoute(request)) {
        const { userId } = await auth();
        if (!userId) {
            return Response.redirect('/sign-in');
        }
    }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}