"use client";

import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ProfileQuestionModal } from "./profile-question-modal";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface ProfileQuestion {
  id: number;
  question: string;
  type: "CHOICE" | "TEXT" | "MULTI_SELECT";
  options?: string[];
  order: number;
}

export interface ProfileQuestionsRef {
  handleExit: () => void;
}

export const ProfileQuestions = forwardRef<ProfileQuestionsRef>((_, ref) => {
  const [questions, setQuestions] = useState<ProfileQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);
  const [selectedQuestion, setSelectedQuestion] = useState<ProfileQuestion | null>(null);
  const [showExitWarning, setShowExitWarning] = useState(false);
  const router = useRouter();

  useImperativeHandle(ref, () => ({
    handleExit: () => {
      const answeredCount = Object.keys(answers).length;
      if (answeredCount === 0) {
        setShowExitWarning(true);
      } else {
        router.push("/courses");
      }
    }
  }));

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("/api/profile-questions");
        if (!response.ok) throw new Error("Failed to fetch questions");
        const { data } = await response.json();
        setQuestions(data);
        
        // Initialize answers from the questions data
        const initialAnswers = data.reduce((acc: Record<number, string>, curr: any) => {
          if (curr.userAnswer) {
            if (curr.type === "MULTI_SELECT" && !curr.userAnswer.startsWith("[")) {
              // Ensure multi-select answers are properly stringified arrays
              acc[curr.id] = JSON.stringify(curr.userAnswer.split(","));
            } else {
              acc[curr.id] = curr.userAnswer;
            }
          }
          return acc;
        }, {});
        setAnswers(initialAnswers);
      } catch (error) {
        console.error("Error fetching questions:", error);
        toast.error("Failed to load profile questions");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswer = async (questionId: number, answer: string) => {
    try {
      const response = await fetch("/api/profile-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionId,
          answer,
        }),
      });

      if (!response.ok) throw new Error("Failed to save answer");

      setAnswers(prev => ({ ...prev, [questionId]: answer }));
      toast.success("Answer saved!");
    } catch (error) {
      console.error("Error saving answer:", error);
      toast.error("Failed to save answer");
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-sky-700" />
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Profile Questions</h2>
        <p className="text-muted-foreground">No questions available</p>
      </Card>
    );
  }

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = questions.length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">Let's get to know you better</h2>
            <p className="text-muted-foreground">
              {answeredCount} of {totalQuestions} questions answered
            </p>
            <p className="text-sm text-muted-foreground">
              Please answer at least one question before continuing.
            </p>
          </div>

          <div className="space-y-4">
            {questions.map((question) => (
              <div key={question.id} className="space-y-2">
                <Button
                  variant="secondary"
                  className="w-full justify-start p-4 h-auto bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700"
                  onClick={() => setSelectedQuestion(question)}
                >
                  <div className="flex items-center space-x-3 w-full">
                    {answers[question.id] && (
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                    )}
                    <span className="text-left text-sm sm:text-base break-words whitespace-normal">{question.question}</span>
                  </div>
                </Button>
                {answers[question.id] && (
                  <p className="text-sm text-muted-foreground pl-8">
                    Your answer: {
                      question.type === "MULTI_SELECT" 
                        ? (() => {
                            try {
                              const parsedAnswer = JSON.parse(answers[question.id]);
                              return Array.isArray(parsedAnswer) ? parsedAnswer.join(", ") : answers[question.id];
                            } catch {
                              return answers[question.id];
                            }
                          })()
                        : answers[question.id]
                    }
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div className="relative h-[600px] w-full">
        <Image
          src="/profile.png"
          alt="Profile"
          fill
          className="object-contain"
          priority
        />
      </div>

      {selectedQuestion && (
        <ProfileQuestionModal
          isOpen={!!selectedQuestion}
          onClose={() => setSelectedQuestion(null)}
          question={selectedQuestion}
          onAnswer={handleAnswer}
          currentAnswer={answers[selectedQuestion.id]}
        />
      )}

      <Dialog open={showExitWarning} onOpenChange={setShowExitWarning}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Please answer at least one question</DialogTitle>
            <DialogDescription>
              We need at least one answer to get to know you better and provide a personalized learning experience.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setShowExitWarning(false)}>
              Stay and Answer
            </Button>
            <Button variant="danger" onClick={() => router.push("/courses")}>
              Exit Anyway
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
});