import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ProfileQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: {
    id: number;
    question: string;
    type: "CHOICE" | "TEXT";
    options?: string[];
  };
  onAnswer: (questionId: number, answer: string) => Promise<void>;
  currentAnswer?: string;
}

export const ProfileQuestionModal = ({
  isOpen,
  onClose,
  question,
  onAnswer,
  currentAnswer,
}: ProfileQuestionModalProps) => {
  const [answer, setAnswer] = useState(currentAnswer || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!answer) {
      toast.error("Please provide an answer");
      return;
    }

    try {
      setIsSubmitting(true);
      await onAnswer(question.id, answer);
      toast.success("Answer saved!");
      onClose();
    } catch (error) {
      toast.error("Failed to save answer");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {question.question}
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          {question.type === "CHOICE" && question.options ? (
            <RadioGroup
              value={answer}
              onValueChange={setAnswer}
              className="space-y-3"
            >
              {question.options.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={option} />
                  <Label htmlFor={option}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
          ) : (
            <Input
              type="text"
              placeholder="Type your answer..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full"
            />
          )}
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Answer"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}; 