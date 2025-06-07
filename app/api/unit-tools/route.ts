// Unit tools API route - handles fetching and generating educational tools
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import db from "@/db/drizzle";
import { wrongAnswers, userProfiles, units, userProfileAnswers, profileQuestions } from "@/db/schema";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const unitId = searchParams.get("unitId");

    if (!unitId) {
      return new NextResponse("Unit ID is required", { status: 400 });
    }

    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get unit details
    const unit = await db.query.units.findFirst({
      where: eq(units.id, parseInt(unitId)),
    });

    if (!unit) {
      return new NextResponse("Unit not found", { status: 404 });
    }

    // Get user's wrong answers for this unit
    const wrongAnswersData = await db.query.wrongAnswers.findMany({
      where: and(
        eq(wrongAnswers.unitId, parseInt(unitId)),
        eq(wrongAnswers.userId, userId)
      ),
      with: {
        challenge: true
      }
    });

    // Get user's profile answers
    const profileAnswers = await db.query.userProfileAnswers.findMany({
      where: eq(userProfileAnswers.userId, userId),
      with: {
        question: true
      }
    });

    // Format wrong answers for the tools generator
    const formattedWrongAnswers = wrongAnswersData.map(wa => ({
      question: wa.challenge.question
    }));

    // Format profile answers for the tools generator
    const formattedProfileAnswers = profileAnswers.map(answer => ({
      question: answer.question.question,
      answer: answer.answer,
      type: answer.question.type
    }));

    // Generate tools based on unit content and user profile
    const tools = generateTools(unit, formattedWrongAnswers, formattedProfileAnswers);

    return NextResponse.json(tools);
  } catch (error) {
    console.error("[UNIT_TOOLS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

function generateTools(
  unit: { title: string; description: string },
  wrongAnswers: { question: string }[],
  profileAnswers: Array<{
    question: string;
    answer: string;
    type: string;
  }>
) {
  const tools: {
    toolName: string;
    toolDescription: string;
    toolUrl?: string;
  }[] = [];

  return tools;
}