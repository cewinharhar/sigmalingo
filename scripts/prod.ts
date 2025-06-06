import { neon } from "@neondatabase/serverless";
import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "@/db/schema";
import { COURSE_CONTENT } from "./content";
import { type ChallengeTemplate, type Lesson, type Unit } from "./types";

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
const createChallengeOptions = async (challengeId: number, options: { text: string; state: "correct" | "work_in_progress" | "wrong" }[]) => {
  await db.insert(schema.challengeOptions).values(
    options.map(option => ({
      challengeId,
      text: option.text,
      state: option.state
    }))
  );
};

const createChallenges = async (lessonId: number, challenges: ChallengeTemplate[]) => {
  for (const challenge of challenges) {
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
};

const createLessons = async (unitId: number, lessons: Lesson[]) => {
  for (const lesson of lessons) {
    const createdLesson = await db.insert(schema.lessons)
      .values({
        unitId,
        title: lesson.title,
        order: lesson.order,
        quoteText: lesson.quote?.text || null,
        quoteAuthor: lesson.quote?.author || null
      })
      .returning();

    await createChallenges(createdLesson[0].id, lesson.challenges);
  }
};

const createUnits = async (courseId: number, units: Unit[]) => {
  for (const unit of units) {
    const createdUnit = await db.insert(schema.units)
      .values({
        courseId,
        title: unit.title,
        description: unit.description,
        order: unit.order,
        recommendationType: unit.recommendation?.type || null,
        recommendationTitle: unit.recommendation?.title || null,
        recommendationAuthor: unit.recommendation?.author || null
      })
      .returning();

    await createLessons(createdUnit[0].id, unit.lessons);
  }
};

const createDefaultContent = async (courseId: number, courseTitle: string) => {
  // Create default units if no specific content exists
  for (const template of UNIT_TEMPLATES) {
    const unit = await db.insert(schema.units)
      .values({
        courseId,
        title: `${courseTitle} ${template.title}`,
        description: template.description(courseTitle),
        order: template.order
      })
      .returning();

    // Create default lessons for this unit
    for (const lessonTemplate of LESSON_TEMPLATES) {
      const lesson = await db.insert(schema.lessons)
        .values({
          unitId: unit[0].id,
          title: lessonTemplate.title,
          order: lessonTemplate.order
        })
        .returning();

      // Create default challenges for this lesson
      const defaultChallenges: ChallengeTemplate[] = [
        {
          type: "SELECT" as const,
          question: `What's the foundation of ${courseTitle.toLowerCase()}?`,
          order: 1,
          options: [
            { text: "Understanding and awareness", state: "correct" },
            { text: "Setting ambitious goals", state: "wrong" },
            { text: "Finding motivation", state: "wrong" }
          ]
        },
        {
          type: "SELECT" as const,
          question: `What's the most effective way to improve ${courseTitle.toLowerCase()}?`,
          order: 2,
          options: [
            { text: "Consistent practice and dedication", state: "correct" },
            { text: "Quick fixes and shortcuts", state: "wrong" },
            { text: "Waiting for inspiration", state: "wrong" }
          ]
        }
      ];

      await createChallenges(lesson[0].id, defaultChallenges);
    }
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

      // If this course has specific content in COURSE_CONTENT, use it
      if (COURSE_CONTENT[course.title]) {
        await createUnits(createdCourse[0].id, COURSE_CONTENT[course.title].units);
      } else {
        // Otherwise, use default content
        await createDefaultContent(createdCourse[0].id, course.title);
      }
    }

    console.log("Seeding finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

main();
