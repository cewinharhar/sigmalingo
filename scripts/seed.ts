import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { profileQuestions, userProfiles } from "@/db/schema";
import "dotenv/config";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set in environment variables");
}

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

interface ProfileQuestion {
  question: string;
  type: "CHOICE" | "TEXT" | "MULTI_SELECT";
  options?: string[];
  order: number;
}

const questions: ProfileQuestion[] = [
  {
    question: "How can I call you?",
    type: "TEXT",
    order: 0,
  },
  {
    question: "Please enter your age",
    type: "TEXT",
    order: 1,
  },
  {
    question: "What best describes your current relationship/family status?",
    type: "CHOICE",
    options: [
      "Single",
      "In a committed relationship",
      "Married/Partnered",
      "Separated/Divorced",
      "Parent/Guardian",
      "Other"
    ],
    order: 2,
  },
  {
    question: "Which areas of your personal life do you feel need the most attention right now? (Select all that apply)",
    type: "MULTI_SELECT",
    options: [
      "Emotional/romantic relationships",
      "Family dynamics",
      "Physical health/fitness",
      "Mental well-being",
      "Work/life balance",
      "Pursuing a personal passion/hobby",
      "Financial stability",
      "Spiritual or inner growth"
    ],
    order: 3,
  },
  {
    question: "How many days per week do you currently exercise or move your body intentionally?",
    type: "CHOICE",
    options: [
      "0 days",
      "1–2 days",
      "3–4 days",
      "5 or more days"
    ],
    order: 4,
  },
  {
    question: "Which passions or hobbies energize you the most? (Select all that apply)",
    type: "MULTI_SELECT",
    options: [
      "Creative arts (music, writing, painting)",
      "Sports or outdoor adventure",
      "Reading or learning new topics",
      "Building or DIY projects",
      "Cooking or nutrition",
      "Meditation or mindfulness practices",
      "Volunteering/community work",
      "Other"
    ],
    order: 5,
  },
  {
    question: "How would you describe your main source of stress right now?",
    type: "CHOICE",
    options: [
      "Work or career pressures",
      "Family or relationship issues",
      "Health or fitness concerns",
      "Lack of direction/purpose",
      "Financial worries",
      "I feel generally calm"
    ],
    order: 6,
  },
  {
    question: "What do you hope to achieve by using this app? (Select all that apply)",
    type: "MULTI_SELECT",
    options: [
      "Improve my confidence",
      "Strengthen my relationships",
      "Build healthier habits",
      "Discover or deepen my passions",
      "Find greater life balance",
      "Develop emotional resilience",
      "Clarify my goals and purpose"
    ],
    order: 7,
  },
  {
    question: "Is there any other personal context you'd like us to know (briefly)?",
    type: "TEXT",
    order: 8,
  }
];

async function seed() {
  try {
    console.log("🌱 Starting database seeding...");

    // Seed profile questions
    console.log("📝 Seeding profile questions...");
    for (const question of questions) {
      await db.insert(profileQuestions).values(question);
    }
    console.log("✅ Profile questions seeded successfully!");

    // Create a default user profile for testing
    console.log("👤 Creating default user profile...");
    await db.insert(userProfiles).values({
      userId: "test_user",
    });
    console.log("✅ Default user profile created successfully!");

    console.log("🎉 Database seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

// Execute the seed function
seed(); 