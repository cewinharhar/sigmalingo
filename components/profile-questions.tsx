"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ProfileQuestion {
  id: number;
  question: string;
  type: "CHOICE" | "TEXT";
  options?: string[];
  order: number;
}

export const ProfileQuestions = () => {
  const [questions, setQuestions] = useState<ProfileQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("/api/profile-questions");
        if (!response.ok) throw new Error("Failed to fetch questions");
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchAnswers = async () => {
      try {
        const response = await fetch("/api/profile-answers");
        if (!response.ok) throw new Error("Failed to fetch answers");
        const data = await response.json();
        const answersMap = data.reduce((acc: Record<number, string>, curr: any) => {
          acc[curr.questionId] = curr.answer;
          return acc;
        }, {});
        setAnswers(answersMap);
        
        // Check if this is a first-time user (no answers yet)
        setIsFirstTime(Object.keys(answersMap).length === 0);
      } catch (error) {
        console.error("Error fetching answers:", error);
      }
    };

    fetchQuestions();
    fetchAnswers();
  }, []);

  const handleAnswer = async (answer: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: answer }));

    try {
      setSaving(true);
      const response = await fetch("/api/profile-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionId: currentQuestion.id,
          answer,
        }),
      });

      if (!response.ok) throw new Error("Failed to save answer");

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        toast.success("Answer saved!");
      } else {
        // All questions answered
        toast.success("Profile completed!");
        if (isFirstTime) {
          // Redirect to learn page only for first-time users
          router.push("/learn");
        }
      }
    } catch (error) {
      console.error("Error saving answer:", error);
      toast.error("Failed to save answer");
    } finally {
      setSaving(false);
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

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">
            {isFirstTime ? "Let's get to know you better" : "Profile Questions"}
          </h2>
          <p className="text-muted-foreground">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">{currentQuestion.question}</h3>

          {currentQuestion.type === "CHOICE" && currentQuestion.options ? (
            <RadioGroup
              onValueChange={handleAnswer}
              value={answers[currentQuestion.id] || ""}
              className="space-y-3"
            >
              {currentQuestion.options.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={option} />
                  <Label htmlFor={option}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
          ) : (
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="Type your answer..."
                value={answers[currentQuestion.id] || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAnswer(e.target.value)}
              />
              <Button
                onClick={() => handleAnswer(answers[currentQuestion.id] || "")}
                disabled={!answers[currentQuestion.id] || saving}
              >
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : isLastQuestion ? (
                  "Complete Profile"
                ) : (
                  "Save Answer"
                )}
              </Button>
            </div>
          )}
        </div>

        <div className="flex justify-between">
          <Button
            variant="secondary"
            onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </Button>
          <Button
            variant="secondary"
            onClick={() => setCurrentQuestionIndex(prev => Math.min(questions.length - 1, prev + 1))}
            disabled={currentQuestionIndex === questions.length - 1}
          >
            Next
          </Button>
        </div>
      </div>
    </Card>
  );
}; 