import { Check } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";

type CardProps = {
  title: string;
  id: number;
  imageSrc: string;
  onClick: (id: number) => void;
  disabled?: boolean;
  isActive?: boolean;
};

export const Card = ({
  title,
  id,
  imageSrc,
  onClick,
  disabled,
  isActive,
}: CardProps) => {
  return (
    <div
      onClick={() => onClick(id)}
      className={cn(
        "flex h-full min-h-[217px] min-w-[200px] cursor-pointer flex-col items-center justify-between rounded-xl p-3 pb-6 transition-transform hover:scale-105",
        disabled && "pointer-events-none opacity-50"
      )}
    >
      <Image
        src={imageSrc}
        alt={title}
        height={70}
        width={93.33}
        className="rounded-lg object-cover"
      />

      <p className="mt-3 text-center font-bold text-neutral-700">{title}</p>
    </div>
  );
};
