import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { quests } from "@/db/schema";
import "dotenv/config";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set in environment variables");
}

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

const questsData = [
  {
    title: "Morning Meditation",
    emoji: "🧘‍♂️",
    value: 25,
    description: "Take 5 minutes to meditate and set your intentions for the day. This builds mental clarity and emotional stability.",
    resourceType: "youtube",
    resourceUrl: "https://www.youtube.com/watch?v=inpok4MKVLM",
    resourceTitle: "5-Minute Meditation You Can Do Anywhere",
    resourceDescription: "A guided meditation perfect for beginners",
    order: 1,
  },
  {
    title: "Digital Detox Hour",
    emoji: "📵",
    value: 30,
    description: "Spend one hour completely disconnected from digital devices. Use this time for self-reflection or physical activity.",
    resourceType: "app",
    resourceUrl: "https://apps.apple.com/us/app/forest-focus-for-productivity/id866450515",
    resourceTitle: "Forest App",
    resourceDescription: "Stay focused, be present. Plant trees while staying off your phone.",
    order: 2,
  },
  {
    title: "Gratitude Practice",
    emoji: "🙏",
    value: 20,
    description: "Write down three things you're grateful for today. This practice builds emotional resilience and positive mindset.",
    resourceType: "book",
    resourceUrl: "https://www.goodreads.com/book/show/40591267-the-gratitude-diaries",
    resourceTitle: "The Gratitude Diaries",
    resourceDescription: "How a Year Looking on the Bright Side Can Transform Your Life",
    order: 3,
  },
  {
    title: "Physical Challenge",
    emoji: "💪",
    value: 35,
    description: "Complete a workout of your choice - whether it's pushups, a run, or gym session. Strong body, strong mind.",
    resourceType: "youtube",
    resourceUrl: "https://www.youtube.com/watch?v=oAPCPjnU1wA",
    resourceTitle: "20 Minute Full Body Workout",
    resourceDescription: "No equipment needed, perfect for beginners",
    order: 4,
  },
  {
    title: "Acts of Service",
    emoji: "🤝",
    value: 40,
    description: "Perform an act of kindness or help someone without expecting anything in return. True strength lies in serving others.",
    order: 5,
  },
  {
    title: "Knowledge Seeker",
    emoji: "📚",
    value: 30,
    description: "Read a chapter from a self-improvement book or listen to an educational podcast. Growth comes from continuous learning.",
    order: 6,
  },
  {
    title: "Emotional Check-in",
    emoji: "🎯",
    value: 25,
    description: "Reflect on your emotions today. What triggered them? How did you handle them? Self-awareness is key to growth.",
    order: 7,
  },
  {
    title: "Social Connection",
    emoji: "🫂",
    value: 35,
    description: "Have a meaningful conversation with a friend or family member about their life and wellbeing. Build genuine connections.",
    order: 8,
  },
];

async function seedQuests() {
  try {
    console.log("🌱 Starting quests seeding...");

    // Delete existing quests
    // await db.delete(quests);

    // Seed quests
    for (const quest of questsData) {
      await db.insert(quests).values(quest);
    }

    console.log("✅ Quests seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding quests:", error);
    process.exit(1);
  }
}

// Execute the seed function
seedQuests();
