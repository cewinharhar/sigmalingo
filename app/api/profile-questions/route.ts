import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import db from "@/db/drizzle";
import { profileQuestions, userProfileAnswers, userProfiles } from "@/db/schema";
import { eq, asc, and } from "drizzle-orm";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const questions = await db.query.profileQuestions.findMany({
      orderBy: asc(profileQuestions.order),
    });

    // Get the user's answers
    const answers = await db.query.userProfileAnswers.findMany({
      where: eq(userProfileAnswers.userId, userId),
    });

    // Combine questions with user's answers
    const questionsWithAnswers = questions.map(question => {
      const userAnswer = answers.find(a => a.questionId === question.id);
      return {
        ...question,
        userAnswer: userAnswer ? userAnswer.answer : null
      };
    });

    return NextResponse.json({ data: questionsWithAnswers });
  } catch (error) {
    console.error("[PROFILE_QUESTIONS_GET]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { questionId, answer } = body;

    if (!questionId || !answer) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Ensure user profile exists
    const existingProfile = await db.query.userProfiles.findFirst({
      where: eq(userProfiles.userId, userId)
    });

    if (!existingProfile) {
      await db.insert(userProfiles).values({
        userId,
      });
    }

    // FIX: Use proper table reference and combine conditions with 'and'
    const existingAnswer = await db.query.userProfileAnswers.findFirst({
      where: and(
        eq(userProfileAnswers.userId, userId),
        eq(userProfileAnswers.questionId, questionId)
      )
    });

    if (existingAnswer) {
      // Update existing answer
      await db
        .update(userProfileAnswers)
        .set({ 
          answer,
          updatedAt: new Date() // Update timestamp
        })
        .where(eq(userProfileAnswers.id, existingAnswer.id));
    } else {
      // Insert new answer
      await db.insert(userProfileAnswers).values({
        userId,
        questionId,
        answer,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[PROFILE_QUESTIONS_POST]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}