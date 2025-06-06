import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import db from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { userProgress } from "@/db/schema";

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { questValue } = body;

    if (!questValue) {
      return new NextResponse("Quest value is required", { status: 400 });
    }

    // Get current user progress
    const currentUserProgress = await db.query.userProgress.findFirst({
      where: eq(userProgress.userId, userId),
    });

    if (!currentUserProgress) {
      return new NextResponse("User progress not found", { status: 404 });
    }

    // Update user points
    await db
      .update(userProgress)
      .set({
        points: currentUserProgress.points + questValue,
      })
      .where(eq(userProgress.userId, userId));

    return new NextResponse(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("[QUEST_COMPLETION]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
