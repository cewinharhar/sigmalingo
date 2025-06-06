import { cache } from "react";
import { auth } from "@clerk/nextjs";
import { and, eq, notInArray } from "drizzle-orm";
import db from "./drizzle";
import { quests, questProgress } from "./schema";

export const getAvailableQuests = cache(async () => {
  const { userId } = auth();

  if (!userId) return [];

  const completed = await db.query.questProgress.findMany({
    where: eq(questProgress.userId, userId),
  });

  const completedIds = completed.map((p) => p.questId);
  
  return db.query.quests.findMany({
    where: completed.length === 0 ? undefined : notInArray(quests.id, completedIds),
    orderBy: (quests, { asc }) => [asc(quests.order)],
  });
});

export const getCompletedQuests = cache(async () => {
  const { userId } = auth();

  if (!userId) return [];

  return db.query.questProgress.findMany({
    where: eq(questProgress.userId, userId),
    with: {
      quest: true,
    },
    orderBy: (questProgress, { desc }) => [desc(questProgress.completedAt)],
  });
});
