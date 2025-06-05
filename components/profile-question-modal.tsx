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
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ProfileQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: {
    id: number;
    question: string;
    type: "CHOICE" | "TEXT" | "MULTI_SELECT";
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
  const [answer, setAnswer] = useState(() => {
    if (!currentAnswer) {
      return question.type === "MULTI_SELECT" ? "[]" : "";
    }
    if (question.type === "MULTI_SELECT") {
      try {
        // Test if it's already valid JSON
        JSON.parse(currentAnswer);
        return currentAnswer;
      } catch {
        // Convert comma-separated string to JSON array
        return JSON.stringify(currentAnswer.split(',').map(s => s.trim()));
      }
    }
    return currentAnswer;
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!answer) {
      toast.error("Please provide an answer");
      return;
    }
    
    if (question.type === "MULTI_SELECT") {
      try {
        const selections = JSON.parse(answer);
        if (selections.length === 0) {
          toast.error("Please select at least one option");
          return;
        }
      } catch {
        const selections = answer.split(',').filter(s => s.trim());
        if (selections.length === 0) {
          toast.error("Please select at least one option");
          return;
        }
      }
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
          ) : question.type === "MULTI_SELECT" && question.options ? (
            <div className="space-y-3">
              {question.options.map((option) => {
                // Handle both string and JSON array formats for existing answers
                let selectedOptions: string[] = [];
                try {
                  selectedOptions = answer ? JSON.parse(answer) : [];
                } catch {
                  // If parsing fails, treat it as a comma-separated string
                  selectedOptions = answer ? answer.split(',').map(s => s.trim()) : [];
                }
                return (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                      id={option}
                      checked={selectedOptions.includes(option)}
                      onCheckedChange={(checked) => {
                        try {
                          const selected = answer ? JSON.parse(answer) : [];
                          if (checked) {
                            setAnswer(JSON.stringify([...selected, option]));
                          } else {
                            setAnswer(JSON.stringify(selected.filter((item: string) => item !== option)));
                          }
                        } catch {
                          // Handle existing string format
                          const selected = answer ? answer.split(',').map(s => s.trim()) : [];
                          if (checked) {
                            setAnswer(JSON.stringify([...selected, option]));
                          } else {
                            setAnswer(JSON.stringify(selected.filter((item: string) => item !== option)));
                          }
                        }
                      }}
                    />
                    <Label htmlFor={option}>{option}</Label>
                  </div>
                );
              })}
            </div>
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