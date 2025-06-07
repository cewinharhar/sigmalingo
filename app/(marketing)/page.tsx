'use client';

import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { Loader, Pause, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

export default function MarketingPage() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  return (
    <div className="mx-auto flex w-full max-w-[988px] flex-1 flex-col items-center justify-center gap-4 p-4 pb-24 lg:flex-row lg:gap-8 lg:pb-4">
      <audio ref={audioRef} src="/wantToLove_startPage.mp3" loop />

      <div className="relative mb-4 h-[240px] w-[240px] sm:h-[320px] sm:w-[320px] lg:mb-0 lg:h-[424px] lg:w-[424px]">
        <Image
          src="/hero.png"
          alt="Hero"
          fill
          priority
          className="object-contain transition-transform hover:scale-105"
        />
      </div>

      <div className="flex flex-col items-center gap-y-6 lg:gap-y-8">
        <h1 className="max-w-[480px] text-center text-xl font-bold text-white sm:text-2xl lg:text-3xl">
          Awaken the chad in you. Embrace healthy masculinity bit by bit.
        </h1>

        <div className="flex w-full max-w-[330px] flex-col items-center gap-y-3">
          <ClerkLoading>
            <Loader className="h-5 w-5 animate-spin text-muted-foreground" />
          </ClerkLoading>

          <ClerkLoaded>
            <SignedOut>
              <SignUpButton
                mode="modal"
                afterSignInUrl="/learn"
                afterSignUpUrl="/learn"
              >
                <Button size="lg" variant="secondary" className="w-full transition-transform hover:scale-105">
                  Get Started
                </Button>
              </SignUpButton>

              <SignInButton
                mode="modal"
                afterSignInUrl="/learn"
                afterSignUpUrl="/learn"
              >
                <Button size="lg" variant="primaryOutline" className="w-full transition-transform hover:scale-105">
                  I already have an account
                </Button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <Button size="lg" variant="secondary" className="w-full transition-transform hover:scale-105" asChild>
                <Link href="/learn">Continue Learning</Link>
              </Button>
            </SignedIn>
          </ClerkLoaded>
        </div>
      </div>
      <div className="fixed bottom-6 left-0 right-0 flex flex-col items-center gap-2 sm:bottom-8">
        <Button
          onClick={togglePlay}
          variant="ghost"
          size="icon"
          className="h-12 w-12 rounded-full bg-background/20 backdrop-blur-md transition-all hover:bg-background/30 hover:scale-110 active:scale-95"
        >
          {isPlaying ? (
            <Pause className="h-6 w-6 text-white" />
          ) : (
            <Play className="h-6 w-6 text-white" />
          )}
        </Button>
        <div className="text-sm font-medium text-muted-foreground/90 backdrop-blur-sm">
          {isPlaying ? "Playing Aloboi - Want To Love (Just Raw)" : "Click to play"}
        </div>
      </div>
    </div>
  );
}
