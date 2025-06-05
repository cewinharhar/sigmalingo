"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useFeedbackModal } from "@/store/use-feedback-modal";
import Link from "next/link";

export const FeedbackModal = () => {
  const [isClient, setIsClient] = useState(false);
  const { isOpen, close, feedback, unitTools } = useFeedbackModal();

  useEffect(() => setIsClient(true), []);

  if (!isClient) return null;

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="mb-5 flex w-full items-center justify-center">
            <Image src="/mascot_sigma.png" alt="Mascot" height={80} width={80} />
          </div>

          <DialogTitle className="text-center text-2xl font-bold">
            Your Unit Feedback
          </DialogTitle>

          <DialogDescription className="text-base whitespace-pre-wrap">
            {feedback}
          </DialogDescription>

          {unitTools.length > 0 && (
            <div className="mt-6">
              <h3 className="font-bold text-lg mb-4">Recommended Tools</h3>
              <div className="space-y-4">
                {unitTools.map((tool, index) => (
                  <div key={index} className="p-4 bg-slate-50 rounded-lg">
                    <h4 className="font-bold text-base">{tool.toolName}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{tool.toolDescription}</p>
                    {tool.toolUrl && (
                      <Link 
                        href={tool.toolUrl} 
                        target="_blank" 
                        className="text-sm text-primary hover:underline"
                      >
                        Learn more →
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </DialogHeader>

        <DialogFooter className="mb-4">
          <div className="flex w-full flex-col gap-y-4">
            <Button variant="primary" className="w-full" size="lg" onClick={close}>
              Continue
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
