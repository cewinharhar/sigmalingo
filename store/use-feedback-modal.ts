import { create } from "zustand";

type FeedbackModalState = {
  isOpen: boolean;
  feedback: string;
  unitTools: {
    toolName: string;
    toolDescription: string;
    toolUrl: string | null;
  }[];
  open: (feedback: string, unitTools: { toolName: string; toolDescription: string; toolUrl: string | null }[]) => void;
  close: () => void;
};

export const useFeedbackModal = create<FeedbackModalState>((set) => ({
  isOpen: false,
  feedback: "",
  unitTools: [],
  open: (feedback, unitTools) => set({ isOpen: true, feedback, unitTools }),
  close: () => set({ isOpen: false }),
}));
