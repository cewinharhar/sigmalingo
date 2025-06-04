import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import db from "@/db/drizzle";
import { profileQuestions, userProfileAnswers } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const { userId } = auth();
    console.log("[PROFILE_ANSWERS_GET] User ID:", userId);

    if (!userId) {
      console.log("[PROFILE_ANSWERS_GET] No user ID found");
      return new NextResponse(
        JSON.stringify({ error: "Unauthorized" }),
        { 
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Get all profile questions
    console.log("[PROFILE_ANSWERS_GET] Fetching questions");
    const questions = await db.query.profileQuestions.findMany();
    console.log("[PROFILE_ANSWERS_GET] Questions found:", questions.length);

    // Get user's answers
    console.log("[PROFILE_ANSWERS_GET] Fetching answers for user:", userId);
    const answers = await db.query.userProfileAnswers.findMany({
      where: eq(userProfileAnswers.userId, userId),
    });
    console.log("[PROFILE_ANSWERS_GET] Answers found:", answers.length);

    // Combine questions and answers
    const profileAnswers = questions.map((question) => {
      const answer = answers.find((a) => a.questionId === question.id);
      return {
        questionId: question.id,
        question: question.question,
        answer: answer?.answer || "Not answered yet",
      };
    });

    console.log("[PROFILE_ANSWERS_GET] Returning profile answers");
    return new NextResponse(
      JSON.stringify({ data: profileAnswers }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error("[PROFILE_ANSWERS_GET] Detailed error:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
} 