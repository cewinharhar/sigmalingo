import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import db from "@/db/drizzle";
import { wrongAnswers, userProfileAnswers, profileQuestions } from "@/db/schema";
import { eq } from "drizzle-orm";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { unitId } = body;

    if (!unitId) {
      return new NextResponse("Missing unit ID", { status: 400 });
    }

    // Get user's profile answers
    const profileAnswers = await db.query.userProfileAnswers.findMany({
      where: eq(userProfileAnswers.userId, userId),
      with: {
        question: true,
      },
    });

    // Get user's wrong answers for this unit
    const wrongAnswersForUnit = await db.query.wrongAnswers.findMany({
      where: eq(wrongAnswers.unitId, unitId),
      with: {
        challenge: true,
        selectedOption: true,
      },
    });

    // Prepare context for OpenAI
    const profileContext = profileAnswers
      .map((answer) => `${answer.question.question}: ${answer.answer}`)
      .join("\n");

    const wrongAnswersContext = wrongAnswersForUnit
      .map(
        (wrong) =>
          `Question: ${wrong.challenge.question}\nSelected Answer: ${wrong.selectedOption.text}`
      )
      .join("\n");

    const prompt = `Based on the following user profile and their performance in this unit, provide personalized feedback and suggestions for improvement:

User Profile:
${profileContext}

Areas of Difficulty:
${wrongAnswersContext}

Please provide:
1. A brief analysis of their strengths and areas for improvement
2. Specific suggestions for practice and improvement
3. Motivational feedback tailored to their goals and challenges
4. Recommended tools or resources that could help them improve

Keep the feedback encouraging and actionable.`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4-turbo-preview",
      temperature: 0.7,
      max_tokens: 500,
    });

    const feedback = completion.choices[0]?.message?.content;

    if (!feedback) {
      return new NextResponse("Failed to generate feedback", { status: 500 });
    }

    return NextResponse.json({ feedback });
  } catch (error) {
    console.error("[UNIT_FEEDBACK_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 