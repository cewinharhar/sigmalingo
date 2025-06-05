import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import db from "@/db/drizzle";
import { wrongAnswers, userProfileAnswers, profileQuestions, unitTools, lessons, challenges, challengeProgress } from "@/db/schema";
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
    console.log("Received request body:", body);
    
    if (!body || (!body.unitId && body.unitId !== 0)) {
      console.log("Invalid body:", body);
      return new NextResponse(
        JSON.stringify({ error: "Invalid or missing unit ID" }), 
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const unitId = parseInt(body.unitId, 10);
    if (isNaN(unitId)) {
      console.log("Invalid unitId (NaN):", body.unitId);
      return new NextResponse(
        JSON.stringify({ error: "Unit ID must be a valid number" }), 
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check if the unit is actually completed
    const lessonsInUnit = await db.query.lessons.findMany({
      where: eq(lessons.unitId, unitId),
      with: {
        challenges: {
          with: {
            challengeProgress: {
              where: eq(challengeProgress.userId, userId),
            },
          },
        },
      },
    });

    // Check if all challenges in all lessons are completed
    const isUnitCompleted = lessonsInUnit.every((lesson) =>
      lesson.challenges.every(
        (challenge) =>
          challenge.challengeProgress &&
          challenge.challengeProgress.length > 0 &&
          challenge.challengeProgress.every((progress) => progress.completed)
      )
    );

    if (!isUnitCompleted) {
      return NextResponse.json({ 
        feedback: "Please complete all lessons in this unit to receive feedback.",
        tools: [] 
      });
    }

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

    // Get unit's recommended tools
    const unitToolsList = await db.query.unitTools.findMany({
      where: eq(unitTools.unitId, unitId),
      orderBy: (tools) => [tools.order],
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
A very short feedback on their performance in this unit.
Suggestions for improvement, focusing on areas where they struggled.
Include any relevant tools or resources that could help them improve in these areas.
Make it concise, actionable, and friendly.
Use a friendly and encouraging tone, as if you are a supportive mentor.
Remember to keep the feedback light-hearted and encouraging, as if you are a supportive mentor. Use a friendly and approachable tone.

Keep the feedback encouraging and actionable.`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4.1-nano-2025-04-14",
      temperature: 0.7,
      max_tokens: 500,
    });

    const feedback = completion.choices[0]?.message?.content;

    if (!feedback) {
      return new NextResponse("Failed to generate feedback", { status: 500 });
    }

    return NextResponse.json({ 
      feedback,
      tools: unitToolsList 
    });
  } catch (error) {
    console.error("[UNIT_FEEDBACK_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 