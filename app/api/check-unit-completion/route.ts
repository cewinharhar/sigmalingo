import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import db from "@/db/drizzle";
import { lessons, challenges, challengeProgress } from "@/db/schema";

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { unitId } = body;

    if (!unitId) {
      return new NextResponse("Unit ID is required", { status: 400 });
    }

    // Get all lessons in the unit
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

    return NextResponse.json({ isCompleted: isUnitCompleted });
  } catch (error) {
    console.error("[CHECK_UNIT_COMPLETION]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
