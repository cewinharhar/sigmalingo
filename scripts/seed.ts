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
    question: "Please enter your age",
    type: "TEXT",
    order: 1,
  },
  {
    question: "What best describes your current professional status?",
    type: "CHOICE",
    options: [
      "Full-time Professional",
      "Part-time Professional",
      "Entrepreneur/Business Owner",
      "Student/Academic",
      "Career Transition",
      "Other"
    ],
    order: 2,
  },
  {
    question: "Which professional and personal objectives are you pursuing? (Select all that apply)",
    type: "MULTI_SELECT",
    options: [
      "Career Advancement",
      "Financial Independence",
      "Professional Network Development",
      "Leadership Skills",
      "Work-Life Integration",
      "Personal Growth",
      "Professional Education",
      "Business Development",
      "Industry Expertise",
      "Global Perspective"
    ],
    order: 3,
  },
  {
    question: "Which areas would you like to develop further professionally?",
    type: "MULTI_SELECT",
    options: [
      "Strategic Planning",
      "Communication Skills",
      "Team Leadership",
      "Technical Expertise",
      "Project Management",
      "Business Acumen",
      "Innovation/Creativity",
      "Cross-cultural Competence",
      "Digital Literacy",
      "Time Management"
    ],
    order: 4,
  },
  {
    question: "What drives your professional development goals?",
    type: "TEXT",
    order: 5,
  },
  {
    question: "How much time can you allocate to professional development weekly?",
    type: "CHOICE",
    options: [
      "1-2 hours",
      "3-5 hours",
      "6-8 hours",
      "More than 8 hours"
    ],
    order: 6,
  },
  {
    question: "What is your preferred method of professional learning?",
    type: "CHOICE",
    options: [
      "Visual/Diagrammatic Learning",
      "Interactive/Hands-on Practice",
      "Text-based/Documentation",
      "Audio/Discussion-based",
      "Mixed Methods"
    ],
    order: 7,
  },
  {
    question: "Which industry sectors interest you most? (Select all that apply)",
    type: "MULTI_SELECT",
    options: [
      "Technology/Software",
      "Business/Finance",
      "Healthcare/Life Sciences",
      "Engineering/Manufacturing",
      "Creative Industries",
      "Education/Research",
      "Environmental/Sustainability",
      "Consulting/Professional Services",
      "Public Sector/Government",
      "Entrepreneurship/Startups"
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