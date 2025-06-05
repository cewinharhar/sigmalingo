"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface UnitFeedbackProps {
  unitId: number;
}

interface Tool {
  toolName: string;
  toolDescription: string;
  toolUrl?: string;
}

export const UnitFeedback = ({ unitId }: UnitFeedbackProps) => {
  const [feedback, setFeedback] = useState<string>("");
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  
  console.log("UnitFeedback component rendered with unitId:", { unitId, type: typeof unitId });

  useEffect(() => {
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

        const contentType = response.headers.get("content-type");
        if (!response.ok) {
          if (contentType && contentType.includes("application/json")) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to fetch feedback");
          } else {
            const errorText = await response.text();
            throw new Error(`Server error: ${errorText}`);
          }
        }
        
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error(`Expected JSON response but got ${contentType}`);
        }

        const data = await response.json();
        console.log("Received data:", data);
        
        if (!data.feedback) {
          throw new Error("No feedback received from server");
        }
        setFeedback(data.feedback);
        if (data.tools) {
          setTools(data.tools);
        }
      } catch (error) {
        console.error("Error fetching feedback:", error);
        setFeedback("Unable to load personalized feedback at this time. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    const fetchTools = async () => {
      try {
        const response = await fetch(`/api/unit-tools?unitId=${unitId}`);
        if (!response.ok) throw new Error("Failed to fetch tools");
        const data = await response.json();
        setTools(data);
      } catch (error) {
        console.error("Error fetching tools:", error);
      }
    };

    fetchFeedback();
    fetchTools();
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
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Personalized Feedback</h2>
        <div className="prose prose-sm max-w-none">
          {feedback.split("\n").map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </Card>

      {tools.length > 0 && (
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Recommended Tools</h2>
          <div className="space-y-4">
            {tools.map((tool) => (
              <div key={tool.toolName} className="border rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">{tool.toolName}</h3>
                <p className="text-muted-foreground mb-4">
                  {tool.toolDescription}
                </p>
                {tool.toolUrl && (
                  <Button
                    variant="secondary"
                    onClick={() => window.open(tool.toolUrl, "_blank")}
                  >
                    Visit Tool
                  </Button>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}; 