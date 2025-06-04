import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default authMiddleware({
  publicRoutes: ["/", "/api/webhooks/stripe", "/api/profile-answers"],
  async afterAuth(auth, req) {
    // If the user is not logged in and trying to access a protected route
    if (!auth.userId && !auth.isPublicRoute) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // If the user is logged in and trying to access the root page, redirect to courses
    if (auth.userId && req.nextUrl.pathname === "/") {
      return NextResponse.redirect(new URL("/courses", req.url));
    }

    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
