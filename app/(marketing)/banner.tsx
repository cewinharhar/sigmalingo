"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { XIcon } from "lucide-react";
import Link from "next/link";

import { links } from "@/config";

type BannerProps = {
  hide: boolean;
  setHide: Dispatch<SetStateAction<boolean>>;
};

const BANNER_KEY = "hide-lingo-banner";

const Banner = ({ hide, setHide }: BannerProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const hideBanner = localStorage.getItem(BANNER_KEY);

    if (hideBanner) return;

    setHide(false);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBannerClose = () => {
    setHide(true);
    localStorage.setItem(BANNER_KEY, "1");
  };

  if (hide || isScrolled) return null;

  return (
    <div
      id="sticky-banner"
      className="fixed left-0 top-0 z-50 block w-full bg-gradient-to-r from-secondary/95 to-secondary/90 p-2.5 shadow-lg backdrop-blur-sm sm:h-16 lg:h-12"
    >
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-center">
          <p className="text-center text-sm font-normal leading-relaxed text-white sm:text-base">
            📢{" "}
            <strong className="font-semibold">
              Build to help men grow in a world full of unrealistic expectations, hate, distractions and egoism. 
            </strong>{" "}
            <span className="hidden sm:inline">It doesn't take much to start the change. Want to help?{" "}</span>
            <Link
              href="mailto:kevin.yar@outlook.com"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center text-green-400 transition-colors hover:text-green-300"
            >
              Contact me
            </Link>
          </p>
        </div>

        <button
          data-dismiss-target="#sticky-banner"
          onClick={handleBannerClose}
          type="button"
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-1.5 transition-colors hover:bg-white/20"
          aria-label="Close banner"
        >
          <XIcon className="size-4 text-white" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};

export default Banner;
