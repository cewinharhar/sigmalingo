"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { QuestDialog } from "./quest-dialog";
import { type Resource } from "@/constants";

interface Quest {
  id: number;
  title: string;
  emoji: string;
  value: number;
  description: string;
  resourceType?: Resource['type'];
  resourceUrl?: string;
  resourceTitle?: string;
  resourceDescription?: string;
  order: number;
}

type QuestsProps = { points: number };

export const Quests = ({ points }: QuestsProps) => {
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);
  const [availableQuests, setAvailableQuests] = useState<Quest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuests = async () => {
      try {
        const response = await fetch('/api/quests/available');
        if (response.ok) {
          const quests = await response.json();
          setAvailableQuests(quests);
        }
      } catch (error) {
        console.error('Failed to fetch quests:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuests();
  }, []);

  // Show only the first 4 quests in the sidebar
  const displayedQuests = availableQuests.slice(0, 4);

  if (isLoading) {
    return (
      <div className="space-y-4 rounded-xl border-2 p-4">
        <div className="flex items-center justify-center p-4">
          <div className="animate-spin h-6 w-6 border-2 border-neutral-200 border-t-neutral-800 rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4 rounded-xl border-2 p-4">
        <div className="flex w-full items-center justify-between space-y-2">
          <h3 className="text-lg font-bold">Daily Quests</h3>

          <Link href="/quests">
            <Button size="sm" variant="primaryOutline">
              View all
            </Button>
          </Link>
        </div>

        <ul className="w-full space-y-4">
          {displayedQuests.map((quest) => (
            <div
              className="flex w-full items-center gap-x-3 pb-4 cursor-pointer hover:bg-neutral-50 p-2 rounded-lg transition-colors"
              key={quest.title}
              onClick={() => setSelectedQuest(quest)}
            >
              <span className="text-2xl">{quest.emoji}</span>
              <div className="flex w-full flex-col">
                <p className="text-sm font-bold text-neutral-700">
                  {quest.title}
                </p>
                <p className="text-xs text-neutral-500">
                  +{quest.value} points
                </p>
              </div>
            </div>
          ))}
        </ul>
      </div>

      <QuestDialog
        quest={selectedQuest}
        isOpen={!!selectedQuest}
        onClose={() => setSelectedQuest(null)}
      />
    </>
  );
};
