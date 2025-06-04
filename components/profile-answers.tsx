"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface ProfileAnswer {
  questionId: number;
  question: string;
  answer: string;
}

export const ProfileAnswers = () => {
  const [answers, setAnswers] = useState<ProfileAnswer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const response = await fetch("/api/profile-answers");
        if (!response.ok) throw new Error("Failed to fetch answers");
        const data = await response.json();
        setAnswers(data);
      } catch (error) {
        console.error("Error fetching answers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnswers();
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-sky-700" />
      </div>
    );
  }

  if (answers.length === 0) {
    return (
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Your Answers</h2>
        <p className="text-muted-foreground">No answers available yet.</p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Answers</h2>
      <div className="space-y-4">
        {answers.map((answer) => (
          <div key={answer.questionId} className="space-y-2">
            <h3 className="font-semibold">{answer.question}</h3>
            <p className="text-muted-foreground">{answer.answer}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}; 