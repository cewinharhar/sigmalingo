import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import db from "@/db/drizzle";
import { quests, questProgress, userProgress } from "@/db/schema";

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { questId } = body;

    if (!questId) {
      return new NextResponse("Quest ID is required", { status: 400 });
    }

    // Get the quest details
    const quest = await db.query.quests.findFirst({
      where: eq(quests.id, questId),
      with: {
        progress: {
          where: eq(questProgress.userId, userId),
        },
      },
    });

    if (!quest) {
      return new NextResponse("Quest not found", { status: 404 });
    }

    // Check if quest is already completed
    if (quest.progress && quest.progress.length > 0) {
      return new NextResponse("Quest already completed", { status: 400 });
    }

    // Add quest completion record first
    await db.insert(questProgress).values({
      userId,
      questId,
    });

    // Then update user points
    const currentProgress = await db.query.userProgress.findFirst({
      where: eq(userProgress.userId, userId),
    });

    if (!currentProgress) {
      throw new Error("User progress not found");
    }

    await db.update(userProgress)
      .set({
        points: currentProgress.points + quest.value,
      })
      .where(eq(userProgress.userId, userId));

    // Revalidate relevant paths
    revalidatePath("/quests");
    revalidatePath("/learn");
    revalidatePath("/leaderboard");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[QUEST_COMPLETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
