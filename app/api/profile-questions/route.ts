import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import db from "@/db/drizzle";
import { profileQuestions, userProfileAnswers } from "@/db/schema";
import { eq, asc } from "drizzle-orm";

export async function GET() {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const questions = await db.query.profileQuestions.findMany({
      orderBy: asc(profileQuestions.order),
    });

    return NextResponse.json({ data: questions });
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

    const existingAnswer = await db.query.userProfileAnswers.findFirst({
      where: (answers) => 
        eq(answers.userId, userId) && 
        eq(answers.questionId, questionId)
    });

    if (existingAnswer) {
      await db
        .update(userProfileAnswers)
        .set({ answer })
        .where(eq(userProfileAnswers.id, existingAnswer.id));
    } else {
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