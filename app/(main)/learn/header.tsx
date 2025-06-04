"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

type HeaderProps = {
  title: string;
  onExit?: () => void;
};

export const Header = ({ title, onExit }: HeaderProps) => {
  const router = useRouter();

  const handleBack = () => {
    if (onExit) {
      onExit();
    } else {
      router.push("/courses");
    }
  };

  return (
    <div className="sticky top-0 mb-5 flex items-center justify-between border-b-2 bg-neutral-900 pb-3 text-white lg:z-50 lg:mt-[-28px] lg:pt-[28px]">
      <div className="flex items-center gap-4">
        <Button size="sm" variant="ghost" className="text-white hover:bg-neutral-800" onClick={handleBack}>
          <ArrowLeft className="h-5 w-5 stroke-2" />
        </Button>
        <Button size="sm" variant="ghost" className="text-white hover:bg-neutral-800" onClick={handleBack}>
          <Image
            src="/mascot_sigma.png"
            alt="Logo"
            width={32}
            height={32}
            className="h-8 w-auto"
          />
        </Button>
      </div>

      <h1 className="text-lg font-bold">{title}</h1>
      <div aria-hidden />
    </div>
  );
};
