"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ResourceView } from "./resource-view";
import { Separator } from "./ui/separator";
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
}

interface QuestDialogProps {
  quest: Quest | null;
  onClose: () => void;
  isOpen: boolean;
}

export const QuestDialog = ({ quest, onClose, isOpen }: QuestDialogProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getResource = (quest: Quest): Resource | undefined => {
    if (!quest.resourceType || !quest.resourceUrl) return undefined;

    // All valid resource types are already checked by TypeScript
    return {
      type: quest.resourceType,
      url: quest.resourceUrl,
      title: quest.resourceTitle || '',
      description: quest.resourceDescription,
    };
  };

  const onComplete = async () => {
    if (!quest) return;

    try {
      setIsSubmitting(true);
      const response = await fetch("/api/quests/complete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          questId: quest.id,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Failed to complete quest");
      }

      toast.success(`Quest completed! Earned ${quest.value} points`);
      router.refresh();
      onClose();
    } catch (error) {
      console.error("Failed to complete quest:", error);
      toast.error(error instanceof Error ? error.message : "Failed to complete quest");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resource = quest ? getResource(quest) : undefined;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-[calc(100%-2rem)] sm:w-full px-3 sm:px-6 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-center text-2xl font-bold break-words">
            {quest?.emoji} {quest?.title}
          </DialogTitle>
          <DialogDescription className="text-center text-base text-muted-foreground break-words">
            {quest?.description}
          </DialogDescription>
        </DialogHeader>

        {resource && (
          <>
            <Separator className="my-2" />
            <div className="relative -mx-3 sm:mx-0">
              <ResourceView resource={resource} />
            </div>
          </>
        )}

        <DialogFooter className="mt-6 sm:mt-8">
          <div className="flex w-full flex-col gap-y-3">
            <Button
              onClick={onComplete}
              disabled={isSubmitting}
              variant="primary"
              className="w-full"
              size="lg"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Completing...
                </span>
              ) : (
                `I've Completed This Quest (${quest?.value} points)`
              )}
            </Button>
            <Button
              onClick={onClose}
              variant="primaryOutline"
              className="w-full"
              size="lg"
            >
              Maybe Later
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
