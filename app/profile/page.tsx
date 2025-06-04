"use client";

import { ProfileQuestions } from "@/components/profile-questions";
import { Header } from "@/app/(main)/learn/header";
import { useRef } from "react";

export default function ProfilePage() {
  const profileQuestionsRef = useRef<{ handleExit: () => void }>(null);

  return (
    <div className="flex flex-col h-full">
      <Header title="Profile" onExit={() => profileQuestionsRef.current?.handleExit()} />
      <div className="container mx-auto py-6 flex-1">
        <ProfileQuestions ref={profileQuestionsRef} />
      </div>
    </div>
  );
} 