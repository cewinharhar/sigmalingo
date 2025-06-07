import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  unique,
} from "drizzle-orm/pg-core";

import { MAX_HEARTS } from "@/constants";

export const answerStateEnum = pgEnum("answer_state", ["correct", "work_in_progress", "wrong"]);

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  imageSrc: text("image_src").notNull(),
});

export const coursesRelations = relations(courses, ({ many }) => ({
  userProgress: many(userProgress),
  units: many(units),
}));

export const units = pgTable("units", {
  id: serial("id").primaryKey(), 
  title: text("title").notNull(), // Unit 1
  description: text("description").notNull(), // Learn the basics of spanish
  courseId: integer("course_id")
    .references(() => courses.id, {
      onDelete: "cascade",
    })
    .notNull(),
  order: integer("order").notNull(),
  recommendationType: text("recommendation_type"),
  recommendationTitle: text("recommendation_title"),
  recommendationAuthor: text("recommendation_author"),
});

export const unitsRelations = relations(units, ({ many, one }) => ({
  course: one(courses, {
    fields: [units.courseId],
    references: [courses.id],
  }),
  lessons: many(lessons),
}));

export const lessons = pgTable("lessons", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  unitId: integer("unit_id")
    .references(() => units.id, {
      onDelete: "cascade",
    })
    .notNull(),
  order: integer("order").notNull(),
  quoteText: text("quote_text"),
  quoteAuthor: text("quote_author"),
});

export const lessonsRelations = relations(lessons, ({ one, many }) => ({
  unit: one(units, {
    fields: [lessons.unitId],
    references: [units.id],
  }),
  challenges: many(challenges),
}));

export const challengesEnum = pgEnum("type", ["SELECT", "ASSIST"]);

export const challenges = pgTable("challenges", {
  id: serial("id").primaryKey(),
  lessonId: integer("lesson_id")
    .references(() => lessons.id, {
      onDelete: "cascade",
    })
    .notNull(),
  type: challengesEnum("type").notNull(),
  question: text("question").notNull(),
  order: integer("order").notNull(),
});

export const challengesRelations = relations(challenges, ({ one, many }) => ({
  lesson: one(lessons, {
    fields: [challenges.lessonId],
    references: [lessons.id],
  }),
  challengeOptions: many(challengeOptions),
  challengeProgress: many(challengeProgress),
}));

export const challengeOptions = pgTable("challenge_options", {
  id: serial("id").primaryKey(),
  challengeId: integer("challenge_id")
    .references(() => challenges.id, {
      onDelete: "cascade",
    })
    .notNull(),
  text: text("text").notNull(),
  state: answerStateEnum("state").notNull().default("wrong"),
  imageSrc: text("image_src"),
  audioSrc: text("audio_src"),
});

export const challengeOptionsRelations = relations(
  challengeOptions,
  ({ one }) => ({
    challenge: one(challenges, {
      fields: [challengeOptions.challengeId],
      references: [challenges.id],
    }),
  })
);

export const challengeProgress = pgTable("challenge_progress", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  challengeId: integer("challenge_id")
    .references(() => challenges.id, {
      onDelete: "cascade",
    })
    .notNull(),
  completed: boolean("completed").notNull().default(false),
});

export const challengeProgressRelations = relations(
  challengeProgress,
  ({ one }) => ({
    challenge: one(challenges, {
      fields: [challengeProgress.challengeId],
      references: [challenges.id],
    }),
  })
);

export const userProgress = pgTable("user_progress", {
  userId: text("user_id").primaryKey(),
  userName: text("user_name").notNull().default("User"),
  userImageSrc: text("user_image_src").notNull().default("/mascot_sigma.png"),
  activeCourseId: integer("active_course_id").references(() => courses.id, {
    onDelete: "cascade",
  }),
  hearts: integer("hearts").notNull().default(MAX_HEARTS),
  points: integer("points").notNull().default(0),
});

export const userProgressRelations = relations(userProgress, ({ one }) => ({
  activeCourse: one(courses, {
    fields: [userProgress.activeCourseId],
    references: [courses.id],
  }),
}));

export const userSubscription = pgTable("user_subscription", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().unique(),
  stripeCustomerId: text("stripe_customer_id").notNull().unique(),
  stripeSubscriptionId: text("stripe_subscription_id").notNull().unique(),
  stripePriceId: text("stripe_price_id").notNull(),
  stripeCurrentPeriodEnd: timestamp("stripe_current_period_end").notNull(),
});

export const questionTypeEnum = pgEnum("question_type", ["CHOICE", "TEXT", "MULTI_SELECT"]);

export const profileQuestions = pgTable("profile_questions", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  type: questionTypeEnum("type").notNull(),
  options: text("options").array(),
  order: integer("order").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const userProfileAnswers = pgTable("user_profile_answers", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 191 }).notNull(),
  questionId: integer("question_id")
    .notNull()
    .references(() => profileQuestions.id),
  answer: text("answer").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => ({
  // Ensure each user can only have one answer per question
  userQuestionUnique: unique().on(table.userId, table.questionId)
}));

export const userProfiles = pgTable("user_profiles", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 191 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const wrongAnswers = pgTable("wrong_answers", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 191 }).notNull(),
  challengeId: integer("challenge_id")
    .notNull()
    .references(() => challenges.id),
  selectedOptionId: integer("selected_option_id")
    .notNull()
    .references(() => challengeOptions.id),
  unitId: integer("unit_id")
    .notNull()
    .references(() => units.id),
  answerState: answerStateEnum("answer_state").notNull().default("wrong"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const unitTools = pgTable("unit_tools", {
  id: serial("id").primaryKey(),
  unitId: integer("unit_id")
    .references(() => units.id, {
      onDelete: "cascade",
    })
    .notNull(),
  toolName: text("tool_name").notNull(),
  toolDescription: text("tool_description").notNull(),
  toolUrl: text("tool_url"),
  order: integer("order").notNull(),
});

export const profileQuestionsRelations = relations(profileQuestions, ({ many }) => ({
  answers: many(userProfileAnswers),
}));

export const userProfileAnswersRelations = relations(userProfileAnswers, ({ one }) => ({
  question: one(profileQuestions, {
    fields: [userProfileAnswers.questionId],
    references: [profileQuestions.id],
  }),
}));

export const userProfilesRelations = relations(userProfiles, ({ one }) => ({
  user: one(userProgress, {
    fields: [userProfiles.userId],
    references: [userProgress.userId],
  }),
}));

export const wrongAnswersRelations = relations(wrongAnswers, ({ one }) => ({
  challenge: one(challenges, {
    fields: [wrongAnswers.challengeId],
    references: [challenges.id],
  }),
  selectedOption: one(challengeOptions, {
    fields: [wrongAnswers.selectedOptionId],
    references: [challengeOptions.id],
  }),
  unit: one(units, {
    fields: [wrongAnswers.unitId],
    references: [units.id],
  }),
}));

export const unitToolsRelations = relations(unitTools, ({ one }) => ({
  unit: one(units, {
    fields: [unitTools.unitId],
    references: [units.id],
  }),
}));

// Quest system tables
export const quests = pgTable("quests", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  emoji: text("emoji").notNull(),
  value: integer("value").notNull(),
  description: text("description").notNull(),
  resourceType: text("resource_type"),
  resourceUrl: text("resource_url"),
  resourceTitle: text("resource_title"),
  resourceDescription: text("resource_description"),
  order: integer("order").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const questProgress = pgTable("quest_progress", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  questId: integer("quest_id")
    .references(() => quests.id, {
      onDelete: "cascade",
    })
    .notNull(),
  completedAt: timestamp("completed_at").defaultNow(),
});

export const questRelations = relations(quests, ({ many }) => ({
  progress: many(questProgress),
}));

export const questProgressRelations = relations(questProgress, ({ one }) => ({
  quest: one(quests, {
    fields: [questProgress.questId],
    references: [quests.id],
  }),
}));
