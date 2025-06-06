import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import db from "@/db/drizzle";
import { wrongAnswers, units, challengeOptions } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { challengeId, selectedOptionId, unitId } = body;

    if (!challengeId || !selectedOptionId || !unitId) {
      return new NextResponse(
        JSON.stringify({ error: "Missing required fields" }), 
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Verify that the unit exists
    const unit = await db.query.units.findFirst({
      where: eq(units.id, unitId)
    });

    if (!unit) {
      console.error(`Unit with ID ${unitId} not found`);
      return new NextResponse(
        JSON.stringify({ error: "Invalid unit ID" }), 
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get the selected option's state
    const selectedOption = await db.query.challengeOptions.findFirst({
      where: eq(challengeOptions.id, selectedOptionId)
    });

    // Only track wrong and work_in_progress answers
    if (selectedOption && selectedOption.state !== "correct") {
      // Log the values being inserted for debugging
      console.log("Inserting wrong answer:", {
        userId,
        challengeId,
        selectedOptionId,
        unitId,
        state: selectedOption.state // Log the state being inserted
      });

      await db.insert(wrongAnswers).values({
        userId,
        challengeId,
        selectedOptionId,
        unitId,
        answerState: selectedOption.state // Add this field to track the state
      });
    }

    return new NextResponse(
      JSON.stringify({ success: true }), 
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("[WRONG_ANSWERS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}