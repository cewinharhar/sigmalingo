import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import db from "@/db/drizzle";
import { profileQuestions, userProfileAnswers } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get all profile questions
    const questions = await db.query.profileQuestions.findMany();

    // Get user's answers
    const answers = await db.query.userProfileAnswers.findMany({
      where: eq(userProfileAnswers.userId, userId),
    });

    // Combine questions and answers
    const profileAnswers = questions.map((question) => {
      const answer = answers.find((a) => a.questionId === question.id);
      return {
        questionId: question.id,
        question: question.question,
        answer: answer?.answer || "Not answered yet",
      };
    });

    return NextResponse.json(profileAnswers);
  } catch (error) {
    console.error("[PROFILE_ANSWERS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 