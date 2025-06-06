export const POINTS_TO_REFILL = 10;

export const MAX_HEARTS = 5;

export interface Resource {
  type: 'youtube' | 'app' | 'book' | 'website';
  url: string;
  title: string;
  description?: string;
}

export const QUESTS = [
  {
    title: "Morning Meditation",
    emoji: "🧘‍♂️",
    value: 25,
    description: "Take 5 minutes to meditate and set your intentions for the day. This builds mental clarity and emotional stability.",
    resource: {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=inpok4MKVLM',
      title: '5-Minute Meditation You Can Do Anywhere',
      description: 'A guided meditation perfect for beginners'
    }
  },
  {
    title: "Digital Detox Hour",
    emoji: "📵",
    value: 30,
    description: "Spend one hour completely disconnected from digital devices. Use this time for self-reflection or physical activity.",
    resource: {
      type: 'app',
      url: 'https://apps.apple.com/us/app/forest-focus-for-productivity/id866450515',
      title: 'Forest App',
      description: 'Stay focused, be present. Plant trees while staying off your phone.'
    }
  },
  {
    title: "Gratitude Practice",
    emoji: "🙏",
    value: 20,
    description: "Write down three things you're grateful for today. This practice builds emotional resilience and positive mindset.",
    resource: {
      type: 'book',
      url: 'https://www.goodreads.com/book/show/40591267-the-gratitude-diaries',
      title: 'The Gratitude Diaries',
      description: 'How a Year Looking on the Bright Side Can Transform Your Life'
    }
  },
  {
    title: "Physical Challenge",
    emoji: "💪",
    value: 35,
    description: "Complete a workout of your choice - whether it's pushups, a run, or gym session. Strong body, strong mind.",
    resource: {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=oAPCPjnU1wA',
      title: '20 Minute Full Body Workout',
      description: 'No equipment needed, perfect for beginners'
    }
  },
  {
    title: "Acts of Service",
    emoji: "🤝",
    value: 40,
    description: "Perform an act of kindness or help someone without expecting anything in return. True strength lies in serving others."
  },
  {
    title: "Knowledge Seeker",
    emoji: "📚",
    value: 30,
    description: "Read a chapter from a self-improvement book or listen to an educational podcast. Growth comes from continuous learning."
  },
  {
    title: "Emotional Check-in",
    emoji: "🎯",
    value: 25,
    description: "Reflect on your emotions today. What triggered them? How did you handle them? Self-awareness is key to growth."
  },
  {
    title: "Social Connection",
    emoji: "🫂",
    value: 35,
    description: "Have a meaningful conversation with a friend or family member about their life and wellbeing. Build genuine connections."
  }
];
