import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import db from "@/db/drizzle";
import { profileQuestions, userProfileAnswers } from "@/db/schema";
import { eq } from "drizzle-orm";

export default authMiddleware({
  publicRoutes: ["/", "/api/webhooks/stripe", "/api/profile-answers"],
  async afterAuth(auth, req) {
    // If the user is not logged in and trying to access a protected route
    if (!auth.userId && !auth.isPublicRoute) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // If the user is logged in
    if (auth.userId) {
      try {
        // Get total number of profile questions
        const totalQuestions = await db.query.profileQuestions.findMany();
        const totalQuestionsCount = totalQuestions.length;

        // Get user's answered questions
        const answeredQuestions = await db.query.userProfileAnswers.findMany({
          where: eq(userProfileAnswers.userId, auth.userId),
        });

        // Check if all questions have been answered
        const hasCompletedProfile = answeredQuestions.length === totalQuestionsCount;

        // If the user hasn't completed their profile and isn't already on the profile page
        if (!hasCompletedProfile && !req.nextUrl.pathname.startsWith("/profile")) {
          return NextResponse.redirect(new URL("/profile", req.url));
        }
      } catch (error) {
        console.error("Error checking profile completion:", error);
        // In case of error, allow the request to proceed
        return NextResponse.next();
      }
    }

    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
