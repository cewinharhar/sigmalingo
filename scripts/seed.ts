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
  type: "CHOICE" | "TEXT";
  options?: string[];
  order: number;
}

const questions: ProfileQuestion[] = [
  {
    question: "What is your current age?",
    type: "CHOICE",
    options: ["18-24", "25-34", "35-44", "45-54", "55+"],
    order: 1,
  },
  {
    question: "What is your current employment status?",
    type: "CHOICE",
    options: ["Employed full-time", "Employed part-time", "Self-employed", "Student", "Unemployed", "Other"],
    order: 2,
  },
  {
    question: "What are your main life goals? (Select all that apply)",
    type: "CHOICE",
    options: [
      "Career advancement",
      "Financial independence",
      "Personal relationships",
      "Health and fitness",
      "Personal development",
      "Work-life balance",
    ],
    order: 3,
  },
  {
    question: "What areas do you struggle with the most?",
    type: "TEXT",
    order: 4,
  },
  {
    question: "What motivates you to improve yourself?",
    type: "TEXT",
    order: 5,
  },
  {
    question: "How much time can you dedicate to personal development daily?",
    type: "CHOICE",
    options: ["Less than 30 minutes", "30 minutes to 1 hour", "1-2 hours", "More than 2 hours"],
    order: 6,
  },
  {
    question: "What is your preferred learning style?",
    type: "CHOICE",
    options: ["Visual", "Auditory", "Reading/Writing", "Kinesthetic"],
    order: 7,
  },
  {
    question: "What are your main interests? (Select all that apply)",
    type: "CHOICE",
    options: [
      "Technology",
      "Business",
      "Health & Fitness",
      "Arts & Creativity",
      "Science",
      "Social Skills",
      "Personal Finance",
      "Other",
    ],
    order: 8,
  },
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
      learningStyle: "Visual",
      interests: ["Technology", "Business"],
      goals: ["Career advancement", "Personal development"],
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