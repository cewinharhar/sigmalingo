import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import db from "@/db/drizzle";
import { profileQuestions, userProfileAnswers } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const { userId } = auth();
    const { searchParams } = new URL(request.url);
    const requestedUserId = searchParams.get("userId");

    // Use the authenticated user's ID or the requested user ID
    const targetUserId = userId || requestedUserId;

    if (!targetUserId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get total number of profile questions
    const totalQuestions = await db.query.profileQuestions.findMany();
    const totalQuestionsCount = totalQuestions.length;

    // Get user's answered questions
    const answeredQuestions = await db.query.userProfileAnswers.findMany({
      where: eq(userProfileAnswers.userId, targetUserId),
    });

    // Check if all questions have been answered
    const completed = answeredQuestions.length === totalQuestionsCount;

    return NextResponse.json({ completed });
  } catch (error) {
    console.error("[PROFILE_COMPLETION_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 