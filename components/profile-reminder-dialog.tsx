"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

interface ProfileReminderDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileReminderDialog = ({
  isOpen,
  onClose,
}: ProfileReminderDialogProps) => {
  const router = useRouter();

  const handleProfileClick = () => {
    router.push("/profile");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Complete Your Profile
          </DialogTitle>
          <DialogDescription className="space-y-3 pt-3 text-center">
            <p>
              To help you get the most out of your learning journey, please take a moment to answer a few questions about yourself.
            </p>
            <p>
              Your answers will help us personalize your experience and recommend the best courses for you.
            </p>
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center">
          <Button
            size="lg"
            variant="default"
            onClick={handleProfileClick}
            className="mt-4"
          >
            Answer Questions Now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}; 