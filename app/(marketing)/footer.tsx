import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Mail, Coffee } from "lucide-react";

export const Footer = () => {
  return (
    <div className="hidden h-20 w-full border-t-2 border-slate-200 p-2 lg:block">
      <div className="mx-auto flex h-full max-w-screen-lg items-center justify-center gap-6">
        <a href="mailto:kevin.yar@outlook.com" className="no-underline">
          <Button size="lg" variant="ghost" className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            kevin.yar@outlook.com
          </Button>
        </a>

        <a
          href="https://coff.ee/kevinyarb"
          target="_blank"
          rel="noopener noreferrer"
          className="no-underline"
        >
          <Button size="lg" variant="ghost" className="flex items-center gap-2">
            <Coffee className="h-5 w-5" />
            Buy me a coffee
          </Button>
        </a>
      </div>
    </div>
  );
};
