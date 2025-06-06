import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import db from "@/db/drizzle";
import { wrongAnswers, userProfileAnswers, profileQuestions, unitTools, lessons, challenges, challengeProgress, units } from "@/db/schema";
import { eq, and } from "drizzle-orm";
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

    // Get unit data including recommendation
    const unitData = await db.query.units.findFirst({
      where: eq(units.id, unitId),
    });

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
      where: and(
        eq(wrongAnswers.unitId, unitId),
        eq(wrongAnswers.userId, userId)
      ),
      with: {
        challenge: true,
        selectedOption: true,
      },
    });

    // Group answers by state
    const answersGrouped = wrongAnswersForUnit.reduce((acc, answer) => {
      const state = answer.answerState;
      if (!acc[state]) {
        acc[state] = [];
      }
      acc[state].push({
        question: answer.challenge.question,
        selectedAnswer: answer.selectedOption.text,
        state: answer.answerState
      });
      return acc;
    }, {} as Record<string, Array<{question: string, selectedAnswer: string, state: string}>>);

    // Get unit's recommended tools
    const unitToolsList = await db.query.unitTools.findMany({
      where: eq(unitTools.unitId, unitId),
      orderBy: (tools) => [tools.order],
    });

    // Create the prompt with detailed answer information
    const prompt = `You are an AI mentor with the love, compassion and wisdome of jordan peterson. 
    Your task is to give feedback to a young man using an app which focuses on their growth towards healthy masculinity.
    You will be given the user's profile answers, the unit recommendation, their wrong answers, and their work-in-progress answers:

Profile Question Answers:
${profileAnswers.map(a => 
  `Question: ${a.question.question}\nAnswer: ${a.answer}`
).join('\n\n') || 'None'}

Unit Recommendation:
Title: ${unitData?.recommendationTitle || 'None'}
Type: ${unitData?.recommendationType || 'None'}
Author: ${unitData?.recommendationAuthor || 'None'}

Work in Progress Answers:
${answersGrouped['work_in_progress']?.map(a => 
  `Question: ${a.question}\nAnswer: ${a.selectedAnswer}`
).join('\n\n') || 'None'}

Wrong Answers:
${answersGrouped['wrong']?.map(a => 
  `Question: ${a.question}\nAnswer: ${a.selectedAnswer}`
).join('\n\n') || 'None'}

Please provide:
A reflection of the users progress based on their answers and profile. 
Shortly summarize the user's profile answers, focusing on their strengths and areas for improvement. Keep it short. 
Remind the user to take a breather, stand up and stretch, and drink some water. He can come back later to continue his journey
End the reflection with a positive note, encouraging the user to continue their journey of growth. Generate the response in plain text format, without any markdown or code blocks.`;

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

    // Check if this was the last unit in the course
    const unit = await db.query.units.findFirst({
      where: eq(units.id, unitId),
      with: {
        course: {
          with: {
            units: true
          }
        }
      }
    });

    const isLastUnit = unit?.course?.units.every(u => 
      u.id === unitId || u.order < unit.order
    );

    const courseBadge = isLastUnit ? {
      title: unit?.course?.title || "Course Completed",
      description: "Congratulations on completing this course!",
      type: "completion"
    } : null;

    return NextResponse.json({ 
      feedback,
      tools: unitToolsList,
      workInProgressAnswers: answersGrouped['work_in_progress'] || [],
      wrongAnswers: answersGrouped['wrong'] || [],
      badge: courseBadge
    });

  } catch (error) {
    console.error("[UNIT_FEEDBACK_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}