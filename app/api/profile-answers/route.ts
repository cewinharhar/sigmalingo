import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import db from "@/db/drizzle";
import { profileQuestions, userProfileAnswers } from "@/db/schema";
import { eq } from "drizzle-orm";

export const dynamic = 'force-dynamic';

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
      
      let formattedAnswer: string | string[] = "Not answered yet";
      if (answer?.answer && answer.answer.trim() !== '') {
        if (question.type === "MULTI_SELECT") {
          try {
            const parsedAnswer = JSON.parse(answer.answer);
            // Ensure the answer is an array and has at least one non-empty value
            if (Array.isArray(parsedAnswer) && parsedAnswer.length > 0 && parsedAnswer.some(item => item.trim() !== '')) {
              formattedAnswer = parsedAnswer;
            }
          } catch {
            // Handle case where answer might be stored as comma-separated string
            const items = answer.answer.split(',').map(item => item.trim()).filter(item => item !== '');
            if (items.length > 0) {
              formattedAnswer = items;
            }
          }
        } else {
          // For non-multi-select, only set answer if it's not empty
          const trimmedAnswer = answer.answer.trim();
          if (trimmedAnswer !== '') {
            formattedAnswer = trimmedAnswer;
          }
        }
      }

      return {
        questionId: question.id,
        question: question.question,
        type: question.type,
        options: question.options,
        answer: formattedAnswer,
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