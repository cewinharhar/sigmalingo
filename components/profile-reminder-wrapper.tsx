"use client";

import { useState, useEffect } from "react";
import { ProfileReminderDialog } from "./profile-reminder-dialog";
import { useAuth } from "@clerk/nextjs";

export const ProfileReminderWrapper = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { userId } = useAuth();

  useEffect(() => {
    const checkProfileAnswers = async () => {
      if (!userId) return;

      try {
        const response = await fetch("/api/profile-answers", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        
        if (response.ok) {
          const { data } = await response.json();
          const hasAllAnswers = data && data.length > 0 && data.every((answer: any) => 
            answer.answer && answer.answer !== "Not answered yet"
          );
          setIsOpen(!hasAllAnswers);
        }
      } catch (error) {
        console.error("Error checking profile answers:", error);
      }
    };

    checkProfileAnswers();
  }, [userId]);

  return (
    <ProfileReminderDialog 
      isOpen={isOpen} 
      onClose={() => setIsOpen(false)} 
    />
  );
}; 