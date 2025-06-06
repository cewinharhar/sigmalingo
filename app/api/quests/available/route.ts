import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { getAvailableQuests } from "@/db/quest-queries";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const quests = await getAvailableQuests();
    
    return NextResponse.json(quests);
  } catch (error) {
    console.error("[AVAILABLE_QUESTS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
