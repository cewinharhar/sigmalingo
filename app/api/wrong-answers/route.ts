import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import db from "@/db/drizzle";
import { wrongAnswers } from "@/db/schema";

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { challengeId, selectedOptionId, unitId } = body;

    if (!challengeId || !selectedOptionId || !unitId) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    await db.insert(wrongAnswers).values({
      userId,
      challengeId,
      selectedOptionId,
      unitId,
    });

    return new NextResponse("OK", { status: 200 });
  } catch (error) {
    console.error("[WRONG_ANSWERS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 