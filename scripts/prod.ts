import { neon } from "@neondatabase/serverless";
import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "@/db/schema";
import { COURSE_CONTENT } from "./content";
import { type ChallengeTemplate } from "./types";

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql, { schema });

// Course data structure
const COURSES = [
  { 
    title: "Self Growth", 
    imageSrc: "/selfGrowth_sigma.png",
    description: "Master your mindset and unlock your potential"
  },
  { 
    title: "Mental Health", 
    imageSrc: "/mentalHealth_sigma.png",
    description: "Build resilience and emotional intelligence"
  },
  { 
    title: "Physical Health", 
    imageSrc: "/physicalHealth_sigma.png",
    description: "Optimize your body and energy levels"
  },
  { 
    title: "Digital Wellness", 
    imageSrc: "/digitalWellness_sigma.png",
    description: "Master technology and digital habits"
  },
  { 
    title: "Life Skills", 
    imageSrc: "/lifeSkills_sigma.png",
    description: "Develop essential life management skills"
  },
  { 
    title: "Relationships", 
    imageSrc: "/relationships_sigma.png",
    description: "Build and maintain healthy relationships"
  }
];

// Unit templates
const UNIT_TEMPLATES = [
  {
    title: "Fundamentals",
    description: (courseTitle: string) => `Master the basics of ${courseTitle.toLowerCase()}`,
    order: 1
  },
  {
    title: "Advanced",
    description: (courseTitle: string) => `Take your ${courseTitle.toLowerCase()} to the next level`,
    order: 2
  }
];

// Lesson templates
const LESSON_TEMPLATES = [
  { title: "Core Concepts", order: 1 },
  { title: "Practical Applications", order: 2 },
  { title: "Advanced Techniques", order: 3 },
  { title: "Real-world Scenarios", order: 4 },
  { title: "Mastery Challenges", order: 5 }
];

// Helper functions
const createChallengeOptions = async (challengeId: number, options: { text: string; correct: boolean }[]) => {
  await db.insert(schema.challengeOptions).values(
    options.map(option => ({
      challengeId,
      text: option.text,
      correct: option.correct
    }))
  );
};

const createChallenges = async (lessonId: number, courseTitle: string, imageSrc: string) => {
  // Get challenges for this course from the content file
  const courseChallenges = COURSE_CONTENT[courseTitle] || [];
  
  // If no specific challenges exist for this course, use default templates
  if (courseChallenges.length === 0) {
    const defaultChallenges: ChallengeTemplate[] = [
      {
        type: "SELECT" as const,
        question: `What's the foundation of ${courseTitle.toLowerCase()}?`,
        order: 1,
        options: [
          { text: "Understanding and awareness", correct: true },
          { text: "Setting ambitious goals", correct: false },
          { text: "Finding motivation", correct: false }
        ]
      },
      {
        type: "SELECT" as const,
        question: `What's the most effective way to improve ${courseTitle.toLowerCase()}?`,
        order: 2,
        options: [
          { text: "Consistent practice and dedication", correct: true },
          { text: "Quick fixes and shortcuts", correct: false },
          { text: "Waiting for inspiration", correct: false }
        ]
      }
    ];
    
    for (const challenge of defaultChallenges) {
      const createdChallenge = await db.insert(schema.challenges)
        .values({
          lessonId,
          type: challenge.type,
          question: challenge.question,
          order: challenge.order
        })
        .returning();

      await createChallengeOptions(createdChallenge[0].id, challenge.options);
    }
  } else {
    // Use the specific challenges from the content file
    for (const challenge of courseChallenges) {
      const createdChallenge = await db.insert(schema.challenges)
        .values({
          lessonId,
          type: challenge.type,
          question: challenge.question,
          order: challenge.order
        })
        .returning();

      await createChallengeOptions(createdChallenge[0].id, challenge.options);
    }
  }
};

const createLessons = async (unitId: number, courseTitle: string, imageSrc: string) => {
  for (const template of LESSON_TEMPLATES) {
    const lesson = await db.insert(schema.lessons)
      .values({
        unitId,
        title: template.title,
        order: template.order
      })
      .returning();

    await createChallenges(lesson[0].id, courseTitle, imageSrc);
  }
};

const createUnits = async (courseId: number, courseTitle: string, imageSrc: string) => {
  for (const template of UNIT_TEMPLATES) {
    const unit = await db.insert(schema.units)
      .values({
        courseId,
        title: `${courseTitle} ${template.title}`,
        description: template.description(courseTitle),
        order: template.order
      })
      .returning();

    await createLessons(unit[0].id, courseTitle, imageSrc);
  }
};

const main = async () => {
  try {
    console.log("Seeding database");

    // Delete all existing data
    await Promise.all([
      db.delete(schema.userProgress),
      db.delete(schema.challenges),
      db.delete(schema.units),
      db.delete(schema.lessons),
      db.delete(schema.courses),
      db.delete(schema.challengeOptions),
      db.delete(schema.userSubscription),
    ]);

    // Create courses and their content
    for (const course of COURSES) {
      const createdCourse = await db.insert(schema.courses)
        .values({
          title: course.title,
          imageSrc: course.imageSrc
        })
        .returning();

      await createUnits(createdCourse[0].id, course.title, course.imageSrc);
    }

    console.log("Seeding finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

main();
