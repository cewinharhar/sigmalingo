import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const unitId = searchParams.get("unitId");

    if (!unitId) {
      return new NextResponse("Unit ID is required", { status: 400 });
    }

    // Get unit details
    const unit = await db.unit.findUnique({
      where: { id: parseInt(unitId) },
      select: { title: true, description: true },
    });

    if (!unit) {
      return new NextResponse("Unit not found", { status: 404 });
    }

    // Get user's wrong answers for this unit
    const wrongAnswers = await db.wrongAnswer.findMany({
      where: { unitId: parseInt(unitId) },
      select: { question: true },
    });

    // Get user's profile data
    const profileData = await db.userProfile.findFirst({
      select: {
        learningStyle: true,
        interests: true,
        goals: true,
      },
    });

    // Generate tools based on unit content and user profile
    const tools = generateTools(unit, wrongAnswers, profileData);

    return NextResponse.json(tools);
  } catch (error) {
    console.error("[UNIT_TOOLS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

function generateTools(
  unit: { title: string; description: string },
  wrongAnswers: { question: string }[],
  profileData: { learningStyle: string; interests: string[]; goals: string[] } | null
) {
  const tools: {
    toolName: string;
    toolDescription: string;
    toolUrl?: string;
  }[] = [];

  // Add general learning tools
  tools.push({
    toolName: "Quizlet",
    toolDescription: "Create flashcards and practice quizzes for this unit",
    toolUrl: "https://quizlet.com",
  });

  tools.push({
    toolName: "Duolingo",
    toolDescription: "Practice language skills with interactive exercises",
    toolUrl: "https://duolingo.com",
  });

  // Add tools based on learning style
  if (profileData?.learningStyle === "visual") {
    tools.push({
      toolName: "YouTube",
      toolDescription: "Watch educational videos about this topic",
      toolUrl: "https://youtube.com",
    });
  }

  if (profileData?.learningStyle === "auditory") {
    tools.push({
      toolName: "Spotify",
      toolDescription: "Listen to educational podcasts about this topic",
      toolUrl: "https://spotify.com",
    });
  }

  // Add tools based on interests
  if (profileData?.interests.includes("technology")) {
    tools.push({
      toolName: "Codecademy",
      toolDescription: "Learn programming concepts related to this unit",
      toolUrl: "https://codecademy.com",
    });
  }

  // Add tools based on wrong answers
  if (wrongAnswers.length > 0) {
    tools.push({
      toolName: "Practice Exercises",
      toolDescription: "Additional practice problems focusing on your weak areas",
      toolUrl: "/practice",
    });
  }

  return tools;
} 