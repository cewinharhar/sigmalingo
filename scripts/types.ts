export type ChallengeType = "SELECT" | "ASSIST";

export type ChallengeOption = {
  text: string;
  correct: boolean;
};

export type ChallengeTemplate = {
  type: ChallengeType;
  question: string;
  order: number;
  options: ChallengeOption[];
};

export type CourseContent = {
  title: string;
  imageSrc: string;
  description: string;
  challenges: ChallengeTemplate[];
}; 