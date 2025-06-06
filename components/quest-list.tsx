"use client";

"use client";

import { useState, useEffect } from "react";
import { QuestDialog } from "@/components/quest-dialog";
import { Separator } from "@/components/ui/separator";

interface Quest {
  id: number;
  title: string;
  emoji: string;
  value: number;
  description: string;
  resourceType?: string;
  resourceUrl?: string;
  resourceTitle?: string;
  resourceDescription?: string;
}

export const QuestList = () => {
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);
  const [availableQuests, setAvailableQuests] = useState<Quest[]>([]);
  const [completedQuests, setCompletedQuests] = useState<{ quest: Quest, completedAt: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuests = async () => {
      try {
        const [availableRes, completedRes] = await Promise.all([
          fetch('/api/quests/available'),
          fetch('/api/quests/completed')
        ]);

        if (availableRes.ok && completedRes.ok) {
          const [available, completed] = await Promise.all([
            availableRes.json(),
            completedRes.json()
          ]);

          setAvailableQuests(available);
          setCompletedQuests(completed);
        }
      } catch (error) {
        console.error('Failed to fetch quests:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuests();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center py-10">
        <div className="animate-spin h-8 w-8 border-4 border-neutral-200 border-t-neutral-800 rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Available Quests */}
      <div>
        <h2 className="text-xl font-bold mb-4">Available Quests</h2>
        <ul className="w-full space-y-4">
          {availableQuests.map((quest) => (
            <div
              key={quest.id}
              className="flex w-full items-center gap-x-4 border border-neutral-200 p-4 rounded-lg cursor-pointer hover:bg-neutral-50 transition-colors"
              onClick={() => setSelectedQuest(quest)}
            >
              <div className="flex items-center justify-center w-12 h-12 text-3xl">
                {quest.emoji}
              </div>

              <div className="flex flex-col flex-grow">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-neutral-700">
                    {quest.title}
                  </h3>
                  <span className="text-sm font-medium text-neutral-500">
                    +{quest.value} points
                  </span>
                </div>
                <p className="text-sm text-neutral-600 mt-1 line-clamp-2">
                  {quest.description}
                </p>
              </div>
            </div>
          ))}
        </ul>
      </div>

      {/* Completed Quests */}
      {completedQuests.length > 0 && (
        <>
          <Separator className="my-8" />
          <div>
            <h2 className="text-xl font-bold mb-4">Completed Quests</h2>
            <ul className="w-full space-y-4">
              {completedQuests.map(({ quest, completedAt }) => (
                <div
                  key={quest.id}
                  className="flex w-full items-center gap-x-4 border border-neutral-200 p-4 rounded-lg bg-neutral-50/50"
                >
                  <div className="flex items-center justify-center w-12 h-12 text-3xl opacity-50">
                    {quest.emoji}
                  </div>

                  <div className="flex flex-col flex-grow">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-neutral-600">
                        {quest.title}
                      </h3>
                      <span className="text-xs text-neutral-500">
                        Completed {new Date(completedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-neutral-500 mt-1 line-clamp-2">
                      {quest.description}
                    </p>
                  </div>
                </div>
              ))}
            </ul>
          </div>
        </>
      )}

      <QuestDialog
        quest={selectedQuest}
        isOpen={!!selectedQuest}
        onClose={() => setSelectedQuest(null)}
      />
    </div>
  );
};
