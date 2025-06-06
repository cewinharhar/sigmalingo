import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { getCompletedQuests } from "@/db/quest-queries";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const completedQuests = await getCompletedQuests();
    
    return NextResponse.json(completedQuests);
  } catch (error) {
    console.error("[COMPLETED_QUESTS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
