import { challengeOptions, challenges } from "@/db/schema";
import { cn } from "@/lib/utils";

import { Card } from "./card";

type ChallengeProps = {
  options: (typeof challengeOptions.$inferSelect)[];
  onSelect: (id: number) => void;
  status: "correct" | "wrong" | "none";
  selectedOption?: number;
  disabled?: boolean;
  type: (typeof challenges.$inferSelect)["type"];
};

export const Challenge = ({
  options,
  onSelect,
  status,
  selectedOption,
  disabled,
  type,
}: ChallengeProps) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-2",
        type === "ASSIST" && "w-full",
        type === "SELECT" && "w-full"
      )}
    >
      {options.map((option, i) => (
        <Card
          key={option.id}
          id={option.id}
          text={option.text}
          imageSrc={option.imageSrc}
          shortcut={`${i + 1}`}
          selected={selectedOption === option.id}
          onClick={() => onSelect(option.id)}
          status={status}
          audioSrc={option.audioSrc}
          disabled={disabled}
          type={type}
        />
      ))}
    </div>
  );
};
