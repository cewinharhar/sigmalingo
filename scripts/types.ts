export type ChallengeType = "SELECT" | "ASSIST";

export type ChallengeOption = {
  text: string;
  state: "correct" | "work_in_progress" | "wrong";
};

export type ChallengeTemplate = {
  type: ChallengeType;
  question: string;
  order: number;
  options: ChallengeOption[];
};

export type Quote = {
  author: string;
  text: string;
};

export type Recommendation = {
  type: string;
  title: string;
  author: string;
};

export type Lesson = {
  id: number;
  title: string;
  order: number;
  quote: Quote;
  challenges: ChallengeTemplate[];
};

export type Unit = {
  id: number;
  title: string;
  description: string;
  order: number;
  recommendation: Recommendation;
  lessons: Lesson[];
};

export type CourseContent = {
  id: number;
  title: string;
  imageSrc: string;
  description: string;
  units: Unit[];
};