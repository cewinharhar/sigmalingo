"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface UnitFeedbackProps {
  unitId: number;
}

interface Tool {
  toolName: string;
  toolDescription: string;
  toolUrl?: string;
}

interface Badge {
  title: string;
  description: string;
  type: "completion";
}

interface Answer {
  question: string;
  selectedAnswer: string;
  state: string;
  timestamp?: string;
}

export const UnitFeedback = ({ unitId }: UnitFeedbackProps) => {
  const [feedback, setFeedback] = useState<string>("");
  const [tools, setTools] = useState<Tool[]>([]);
  const [workInProgressAnswers, setWorkInProgressAnswers] = useState<Answer[]>([]);
  const [wrongAnswers, setWrongAnswers] = useState<Answer[]>([]);
  const [loading, setLoading] = useState(true);
  const [badge, setBadge] = useState<Badge | null>(null);
  const [showBadge, setShowBadge] = useState(false);

  // Delayed badge reveal
  useEffect(() => {
    if (badge) {
      const timer = setTimeout(() => {
        setShowBadge(true);
        // Play a celebratory sound
        const audio = new Audio("/wantToLove_startPage.mp3");
        void audio.play();
      }, 2000); // Show badge 2 seconds after feedback loads
      return () => clearTimeout(timer);
    }
  }, [badge]);

  console.log("UnitFeedback component rendered with unitId:", { unitId, type: typeof unitId });

  useEffect(() => {
    let isSubscribed = true;
    
    const fetchFeedback = async () => {
      try {
        console.log("Sending request with unitId:", unitId);
        const response = await fetch("/api/unit-feedback", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({ 
            unitId: parseInt(String(unitId), 10)
          })
        });

        if (!response.ok) {
          throw new Error("Failed to fetch feedback");
        }

        const data = await response.json();
        console.log("Received data:", data);
        
        if (!data.feedback) {
          throw new Error("No feedback received from server");
        }
        
        if (isSubscribed) {
          setFeedback(data.feedback);
          setWorkInProgressAnswers(data.workInProgressAnswers || []);
          setWrongAnswers(data.wrongAnswers || []);
          if (data.tools) {
            setTools(data.tools);
          }
          if (data.badge) {
            setBadge(data.badge);
          }
        }
      } catch (error) {
        console.error("Error fetching feedback:", error);
        if (isSubscribed) {
          setFeedback("Unable to load personalized feedback at this time. Please try again later.");
        }
      } finally {
        if (isSubscribed) {
          setLoading(false);
        }
      }
    };

    fetchFeedback();

    return () => {
      isSubscribed = false;
    };
  }, [unitId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-sky-700" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-br from-sky-50 to-white">
        <h2 className="text-2xl font-bold mb-4">Personalized Feedback</h2>
        <div className="prose prose-sm max-w-none">
          {feedback.split("\n").map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </Card>

      {workInProgressAnswers.length > 0 && (
        <Card className="p-6 bg-gradient-to-br from-orange-50 to-white">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-2xl font-bold text-orange-600">Answers Needing More Reflection</h2>
            <Badge variant="outline" className="bg-orange-100 text-orange-600 border-orange-200">
              {workInProgressAnswers.length}
            </Badge>
          </div>
          <div className="space-y-4">
            {workInProgressAnswers.map((answer, index) => (
              <div key={index} className="border-l-4 border-orange-500 pl-4 py-2 bg-orange-50/50 rounded-r-lg">
                <p className="font-semibold text-orange-900">{answer.question}</p>
                <p className="text-orange-700">Your answer: {answer.selectedAnswer}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {wrongAnswers.length > 0 && (
        <Card className="p-6 bg-gradient-to-br from-rose-50 to-white">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-2xl font-bold text-rose-600">Areas for Improvement</h2>
            <Badge variant="outline" className="bg-rose-100 text-rose-600 border-rose-200">
              {wrongAnswers.length}
            </Badge>
          </div>
          <div className="space-y-4">
            {wrongAnswers.map((answer, index) => (
              <div key={index} className="border-l-4 border-rose-500 pl-4 py-2 bg-rose-50/50 rounded-r-lg">
                <p className="font-semibold text-rose-900">{answer.question}</p>
                <p className="text-rose-700">Your answer: {answer.selectedAnswer}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {tools.length > 0 && (
        <Card className="p-6 bg-gradient-to-br from-emerald-50 to-white">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-2xl font-bold text-emerald-700">Recommended Tools</h2>
            <Badge variant="outline" className="bg-emerald-100 text-emerald-600 border-emerald-200">
              {tools.length}
            </Badge>
          </div>
          <div className="space-y-4">
            {tools.map((tool) => (
              <div key={tool.toolName} className="border rounded-lg p-4 bg-white/80">
                <h3 className="text-lg font-semibold mb-2">{tool.toolName}</h3>
                <p className="text-muted-foreground mb-4">
                  {tool.toolDescription}
                </p>
                {tool.toolUrl && (
                  <Button
                    variant="secondary"
                    onClick={() => window.open(tool.toolUrl, "_blank")}
                    className="bg-emerald-100 hover:bg-emerald-200 text-emerald-700"
                  >
                    Visit Tool
                  </Button>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      <AnimatePresence>
        {badge && showBadge && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 25
            }}
          >
            <Card className="p-6 bg-gradient-to-br from-purple-50 to-white overflow-hidden relative">
              <motion.div 
                className="absolute top-0 right-0 w-32 h-32 opacity-10"
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <Image
                  src="/mascot_sigma.png"
                  alt="Badge Background"
                  width={128}
                  height={128}
                  className="object-contain"
                />
              </motion.div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-2xl font-bold text-purple-700">{badge.title}</h2>
                  <Badge variant="outline" className="bg-purple-100 text-purple-600 border-purple-200">
                    Course Complete
                  </Badge>
                </div>
                <p className="text-purple-600">{badge.description}</p>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-4"
                >
                  <Button
                    variant="secondary"
                    onClick={() => window.open("/learn", "_self")}
                    className="bg-purple-100 hover:bg-purple-200 text-purple-700"
                  >
                    Continue Learning
                  </Button>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};