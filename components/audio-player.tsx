'use client';

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

export const AudioPlayer = () => {
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
    <div className="flex items-center gap-x-2">
      <audio ref={audioRef} src="/wantToLove_startPage.mp3" loop />
      <Button
        onClick={togglePlay}
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-full hover:bg-background/10"
      >
        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </Button>
      <div className="hidden text-xs text-muted-foreground lg:block">
        {isPlaying ? "Playing Aloboi - Want To Love" : ""}
      </div>
    </div>
  );
};
