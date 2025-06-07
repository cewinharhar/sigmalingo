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
  // SELF GROWTH QUESTS (100-199)
  
  // Unit 0: Facing the Facts (100-109)
  {
    title: "Reality Check Moment",
    emoji: "👁️",
    value: 15,
    description: "Look in the mirror and say out loud one thing you've been lying to yourself about. Just acknowledge it.",
    course: "Self Growth",
    unit: "Unit 0: Facing the Facts",
    order: 101,
  },
  {
    title: "Truth Journal Start",
    emoji: "📝",
    value: 20,
    description: "Write down 3 areas of your life where you're not being honest with yourself. No solutions yet, just truth.",
    course: "Self Growth",
    unit: "Unit 0: Facing the Facts",
    resourceType: "youtube",
    resourceUrl: "https://www.youtube.com/watch?v=VpHyLG-sc4g",
    resourceTitle: "The Power of Radical Honesty",
    resourceDescription: "6-minute video on why self-honesty is the foundation of growth",
    order: 102,
  },
  {
    title: "Feedback Courage",
    emoji: "🎯",
    value: 30,
    description: "Ask someone who knows you well to tell you one thing you need to improve. Listen without defending.",
    course: "Self Growth",
    unit: "Unit 0: Facing the Facts",
    order: 103,
  },

  // Unit 1: Taking Responsibility (110-119)
  {
    title: "Stop the Blame Game",
    emoji: "🛑",
    value: 20,
    description: "For one full day, catch yourself every time you blame someone else. Just notice it without judgment.",
    course: "Self Growth",
    unit: "Unit 1: Taking Responsibility",
    order: 111,
  },
  {
    title: "Own Your Mistake",
    emoji: "⚖️",
    value: 35,
    description: "Apologize to someone you've wronged without making excuses or explaining why you did it. Just own it.",
    course: "Self Growth",
    unit: "Unit 1: Taking Responsibility",
    resourceType: "website",
    resourceUrl: "https://markmanson.net/responsibility-fault-fallacy",
    resourceTitle: "The Responsibility/Fault Fallacy",
    resourceDescription: "Mark Manson's guide to embracing responsibility without assigning blame",
    order: 112
  },
  {
    title: "Clean Your Space",
    emoji: "🧹",
    value: 25,
    description: "Clean and organize your room/living space completely. Your external environment reflects your internal state.",
    course: "Self Growth",
    unit: "Unit 1: Taking Responsibility",
    order: 113,
  },

  // Unit 2: Building Mental Strength (120-129)
  {
    title: "Discomfort Practice",
    emoji: "❄️",
    value: 25,
    description: "Take a 90-second cold shower. Build your tolerance for discomfort through controlled exposure.",
    course: "Self Growth",
    unit: "Unit 2: Building Mental Strength",
    resourceType: "youtube",
    resourceUrl: "https://www.youtube.com/watch?v=pq6WHJzOkno",
    resourceTitle: "Cold Shower Benefits Explained",
    resourceDescription: "3-minute video on how cold exposure builds mental toughness",
    order: 120,
  },
  {
    title: "Morning Victory",
    emoji: "🌅",
    value: 30,
    description: "Wake up 30 minutes earlier for 3 days. Use this time for something that improves you - no phones allowed.",
    course: "Self Growth",
    unit: "Unit 2: Building Mental Strength",
    order: 122,
  },
  {
    title: "Meditation Foundation",
    emoji: "🧘‍♂️",
    value: 35,
    description: "Meditate for 5 minutes daily for one week. Use this time to build mental discipline and self-awareness.",
    course: "Self Growth",
    unit: "Unit 2: Building Mental Strength",
    resourceType: "app",
    resourceUrl: "https://apps.apple.com/us/app/headspace-meditation-sleep/id493145008",
    resourceTitle: "Headspace",
    resourceDescription: "Guided meditations to build your mental training foundation",
    order: 123,
  },
  {
    title: "Knowledge Investment",
    emoji: "📚",
    value: 45,
    description: "Read for 20 minutes daily for two weeks from a book that challenges your thinking and builds character.",
    course: "Self Growth",
    unit: "Unit 2: Building Mental Strength",
    resourceType: "book",
    resourceUrl: "https://download.books.ms/main/2349000/5f716ecfcd564ea0737664db01b2bbea/Jordan%20B.%20Peterson_%20Norman%20Doidge_%20Ethan%20Van%20Sciver%20-%2012%20Rules%20for%20Life_%20An%20Antidote%20to%20Chaos-Random%20House%20Canada%20%282018%29.pdf",
    resourceTitle: "12 Rules for Life",
    resourceDescription: "Jordan Peterson's guide to building responsibility and meaning",
    order: 124,
  },

  // Unit 3: The Heroic Journey (130-139)
  {
    title: "Daily Fear Face",
    emoji: "🦁",
    value: 30,
    description: "Do one thing that scares you each day for a week. Start small - make that phone call, speak up in a group.",
    course: "Self Growth",
    unit: "Unit 3: The Heroic Journey",
    order: 131,
  },
  {
    title: "Service Mission",
    emoji: "🤝",
    value: 40,
    description: "Help someone without them asking and without expecting anything back. True strength serves others.",
    course: "Self Growth",
    unit: "Unit 3: The Heroic Journey",
    resourceType: "website",
    resourceUrl: "https://www.volunteermatch.org/",
    resourceTitle: "VolunteerMatch",
    resourceDescription: "Find ways to serve your community and grow through giving",
    order: 132,
  },
  {
    title: "Mentor Seeking",
    emoji: "🧭",
    value: 50,
    description: "Reach out to a man you respect and ask for 20 minutes of advice. Heroes need guides on their journey.",
    course: "Self Growth",
    unit: "Unit 3: The Heroic Journey",
    order: 133,
  },

  // MENTAL HEALTH QUESTS (200-299)
  
  // Unit 0: The Urgency of Men's Mental Health (200-209)
  {
    title: "Check Your Stats",
    emoji: "📊",
    value: 15,
    description: "Read about men's mental health statistics. Understand you're not alone in this struggle.",
    course: "Mental Health",
    unit: "Unit 0: The Urgency of Men's Mental Health",
    resourceType: "website",
    resourceUrl: "https://www.movember.com/mens-health/mental-health",
    resourceTitle: "Men's Mental Health Facts",
    resourceDescription: "Eye-opening statistics about the silent crisis affecting men",
    order: 201,
  },
  {
    title: "Break the Silence",
    emoji: "🗣️",
    value: 40,
    description: "Tell one trusted person about a struggle you're facing. Break the isolation that's killing men.",
    course: "Mental Health",
    unit: "Unit 0: The Urgency of Men's Mental Health",
    order: 202,
  },

  // Unit 1: Understanding Your Inner World (210-219)
  {
    title: "Emotion Recognition",
    emoji: "🎭",
    value: 20,
    description: "For 3 days, name your emotions specifically every few hours. Move beyond just 'fine' or 'stressed'.",
    course: "Mental Health",
    unit: "Unit 1: Understanding Your Inner World",
    resourceType: "youtube",
    resourceUrl: "https://www.youtube.com/watch?v=NDQ1Mi5I4rg",
    resourceTitle: "Understanding Male Emotions",
    resourceDescription: "5-minute guide to recognizing and naming your feelings",
    order: 211,
  },
  {
    title: "Trigger Tracking",
    emoji: "🗺️",
    value: 30,
    description: "Track what triggers your anger, sadness, or anxiety for one week. Knowledge is power over your reactions.",
    course: "Mental Health",
    unit: "Unit 1: Understanding Your Inner World",
    resourceType: "app",
    resourceUrl: "https://apps.apple.com/us/app/daylio-diary/id1194023242",
    resourceTitle: "Daylio Mood Tracker",
    resourceDescription: "Simple tool to track your emotions and identify patterns",
    order: 212,
  },
  {
    title: "Feeling Expression",
    emoji: "💭",
    value: 35,
    description: "Write a letter to yourself about your deepest fears and hopes. Don't send it, just express honestly.",
    course: "Mental Health",
    unit: "Unit 1: Understanding Your Inner World",
    order: 213,
  },

  // Unit 2: Building Resilience (220-229)
  {
    title: "Breathing Control",
    emoji: "🌬️",
    value: 25,
    description: "Practice 4-7-8 breathing when you feel stressed this week. Master your body's stress response.",
    course: "Mental Health",
    unit: "Unit 2: Building Resilience",
    resourceType: "youtube",
    resourceUrl: "https://www.youtube.com/watch?v=YRPh_GaiL8s",
    resourceTitle: "4-7-8 Breathing Technique",
    resourceDescription: "2-minute tutorial on stress-relief breathing",
    order: 221,
  },
  {
    title: "Gratitude Foundation",
    emoji: "🙏",
    value: 30,
    description: "Write down 3 things you're grateful for every morning for one week. Rewire your brain for positivity.",
    course: "Mental Health",
    unit: "Unit 2: Building Resilience",
    order: 222,
  },
  {
    title: "Support Network",
    emoji: "🤝",
    value: 40,
    description: "Identify 3 people you can talk to when struggling. Build your emotional support system before you need it.",
    course: "Mental Health",
    unit: "Unit 2: Building Resilience",
    resourceType: "app",
    resourceUrl: "https://apps.apple.com/us/app/betterhelp-therapy/id995252384",
    resourceTitle: "BetterHelp",
    resourceDescription: "Professional therapy support when you're ready to go deeper",
    order: 223,
  },

  // PHYSICAL HEALTH QUESTS (300-399)
  
  // Unit 0: The Stakes of Physical Health (300-309)
  {
    title: "Baseline Reality",
    emoji: "📏",
    value: 20,
    description: "Test yourself: How many push-ups can you do? How long can you plank? Record your starting point.",
    course: "Physical Health",
    unit: "Unit 0: The Stakes of Physical Health",
    order: 301,
  },
  {
    title: "Movement Commitment",
    emoji: "🚶‍♂️",
    value: 25,
    description: "Move for 15 minutes every day for a week. Walk, dance, stretch - just move your body daily.",
    course: "Physical Health",
    unit: "Unit 0: The Stakes of Physical Health",
    resourceType: "youtube",
    resourceUrl: "https://www.youtube.com/watch?v=wIynl3at0Rs",
    resourceTitle: "No Equipment Workout",
    resourceDescription: "15-minute bodyweight routine you can do anywhere",
    order: 302,
  },

  // Unit 1: Your Body as Your Temple (310-319)
  {
    title: "Hydration Awareness",
    emoji: "💧",
    value: 20,
    description: "Drink 8 glasses of water daily for one week. Track it and notice how your body feels different.",
    course: "Physical Health",
    unit: "Unit 1: Your Body as Your Temple",
    order: 310,
  },
  { 
    title: "Warrior's Discipline",
    emoji: "🎬",
    value: 45,
    description: "Watch 'Warrior' and analyze how physical discipline helped both brothers confront their trauma and grow.",
    course: "Physical Health",
    unit: "Unit 1: Your Body as Your Temple",
    resourceType: "movies",
    resourceUrl: "https://fmoviesto.cc/movie/warrior-2011-full-18555",
    resourceTitle: "Warrior",
    resourceDescription: "Two brothers finding redemption through physical discipline and family reconciliation",
    order: 311
  },    
  {
    title: "Fuel Audit",
    emoji: "🍎",
    value: 30,
    description: "Log everything you eat for 3 days. Face the truth about what you're putting in your body.",
    course: "Physical Health",
    unit: "Unit 1: Your Body as Your Temple",
    resourceType: "app",
    resourceUrl: "https://apps.apple.com/us/app/myfitnesspal/id341232718",
    resourceTitle: "MyFitnessPal",
    resourceDescription: "Track your nutrition and understand your eating patterns",
    order: 312,
  },
  {
    title: "Strength Building",
    emoji: "💪",
    value: 35,
    description: "Do bodyweight exercises for 20 minutes, 3 times this week. Build strength without any equipment needed.",
    course: "Physical Health",
    unit: "Unit 1: Your Body as Your Temple",
    order: 313,
  },
  {
    title: "Fitness Tracking",
    emoji: "📊",
    value: 40,
    description: "Use a fitness app to track your workouts for 2 weeks. Data helps you improve consistently.",
    course: "Physical Health",
    unit: "Unit 1: Your Body as Your Temple",
    resourceType: "app",
    resourceUrl: "https://apps.apple.com/us/app/jefit-workout-tracker-gym-log/id449810000",
    resourceTitle: "JEFIT Workout Tracker",
    resourceDescription: "Track your progress and build consistent fitness habits",
    order: 314,
  },

  // DIGITAL WELLNESS QUESTS (400-499)
  
  // Unit 0: The Scope of Digital Challenges (400-409)
  {
    title: "Screen Time Truth",
    emoji: "📱",
    value: 15,
    description: "Check your daily screen time and write it down. Face the reality of your digital consumption.",
    course: "Digital Wellness",
    unit: "Unit 0: The Scope of Digital Challenges",
    order: 401,
  },
  {
    title: "Usage Awareness",
    emoji: "⏰",
    value: 20,
    description: "Set screen time notifications on your phone. Become aware of how often you're reaching for it.",
    course: "Digital Wellness",
    unit: "Unit 0: The Scope of Digital Challenges",
    resourceType: "youtube",
    resourceUrl: "https://www.youtube.com/watch?v=NUMa0QkPzns",
    resourceTitle: "Your Phone is Changing Your Brain",
    resourceDescription: "5-minute video on how smartphones affect your mind",
    order: 402,
  },

  // Unit 1: Breaking Digital Chains (410-419)
  {
    title: "Phone-Free Hour",
    emoji: "📵",
    value: 25,
    description: "Spend 1 hour daily without your phone for 3 days. Put it in another room and do something productive.",
    course: "Digital Wellness",
    unit: "Unit 1: Breaking Digital Chains",
    order: 410,
  },
  {
    title: "App Audit",
    emoji: "🧹",
    value: 30,
    description: "Delete 3 time-wasting apps from your phone. Replace the mental habit with something better.",
    course: "Digital Wellness",
    unit: "Unit 1: Breaking Digital Chains",
    resourceType: "app",
    resourceUrl: "https://apps.apple.com/us/app/one-sec/id1532875441",
    resourceTitle: "One Sec",
    resourceDescription: "Add friction to addictive apps to break mindless usage",
    order: 411,
  },
  {
    title: "Productive Replacement",
    emoji: "🔄",
    value: 35,
    description: "Replace 30 minutes of daily scrolling with learning a skill. Download a language or skill app.",
    course: "Digital Wellness",
    unit: "Unit 1: Breaking Digital Chains",
    resourceType: "app",
    resourceUrl: "https://apps.apple.com/us/app/duolingo/id570060128",
    resourceTitle: "Duolingo",
    resourceDescription: "Learn a language instead of mindless social media scrolling",
    order: 412,
  },
  {
    title: "Digital Manipulation Exposed",
    emoji: "🎬",
    value: 40,
    description: "Watch 'The Social Dilemma' and immediately delete one addictive app afterward. See the manipulation clearly.",
    course: "Digital Wellness",
    unit: "Unit 1: Breaking Digital Chains",
    resourceType: "movies",
    resourceUrl: "https://fmoviesto.cc/movie/the-social-dilemma-2020-full-63373",
    resourceTitle: "The Social Dilemma",
    resourceDescription: "Eye-opening documentary about social media's manipulation and control",
    order: 413,
  },
  {
    title: "Digital Detox Day",
    emoji: "🌿",
    value: 50,
    description: "Go 24 hours without social media. Rediscover what it means to be present in the real world.",
    course: "Digital Wellness",
    unit: "Unit 1: Breaking Digital Chains",
    resourceType: "app",
    resourceUrl: "https://apps.apple.com/us/app/freedom-block-websites-apps/id1269849722",
    resourceTitle: "Freedom",
    resourceDescription: "Block distracting websites and apps when you need focus",
    order: 414,
  },

  // Unit 2: Digital Masculinity (420-429)
  {
    title: "Real World Social",
    emoji: "🌍",
    value: 35,
    description: "Have a 10-minute face-to-face conversation with someone new. Practice real social skills.",
    course: "Digital Wellness",
    unit: "Unit 2: Digital Masculinity",
    order: 421,
  },
  {
    title: "Call Instead of Text",
    emoji: "📞",
    value: 30,
    description: "Make 3 phone calls instead of texting this week. Rebuild your ability to have real conversations.",
    course: "Digital Wellness",
    unit: "Unit 2: Digital Masculinity",
    order: 422,
  },

  // Unit 3: Confronting Soft-Porn (430-439)
  {
    title: "Feed Cleanup",
    emoji: "🚫",
    value: 30,
    description: "Unfollow all accounts that post suggestive content or objectify women. Clean your digital environment.",
    course: "Digital Wellness",
    unit: "Unit 3: Confronting Soft-Porn",
    order: 431,
  },
  {
    title: "Understanding Impact",
    emoji: "🧠",
    value: 25,
    description: "Read about how pornography affects the brain and relationships. Knowledge is the first step to freedom.",
    course: "Digital Wellness",
    unit: "Unit 3: Confronting Soft-Porn",
    resourceType: "website",
    resourceUrl: "https://fightthenewdrug.org/how-porn-changes-the-brain/",
    resourceTitle: "How Porn Changes the Brain",
    resourceDescription: "Scientific research on pornography's impact on mental health",
    order: 432,
  },
  {
    title: "Accountability Partner",
    emoji: "🤝",
    value: 40,
    description: "Find someone to be accountable to about your digital habits. Shame thrives in secrecy.",
    course: "Digital Wellness",
    unit: "Unit 3: Confronting Soft-Porn",
    resourceType: "app",
    resourceUrl: "https://apps.apple.com/us/app/covenant-eyes-screen-time/id438194216",
    resourceTitle: "Covenant Eyes",
    resourceDescription: "Accountability software for digital integrity",
    order: 433,
  },

  // LIFE SKILLS QUESTS (500-599)
  
  // Unit 0: The State of Men Today (500-509)
  {
    title: "Skills Assessment",
    emoji: "🔧",
    value: 20,
    description: "List 5 practical skills you wish you had. Be honest about what you can't do that you should know.",
    course: "Life Skills",
    unit: "Unit 0: The State of Men Today",
    order: 501,
  },
  {
    title: "Learn One Skill",
    emoji: "🛠️",
    value: 35,
    description: "Learn one practical skill this week: cook a meal, change a tire, or basic home repair.",
    course: "Life Skills",
    unit: "Unit 0: The State of Men Today",
    resourceType: "youtube",
    resourceUrl: "https://www.youtube.com/watch?v=1NqxMqU6b4Q",
    resourceTitle: "Essential Life Skills Every Man Should Know",
    resourceDescription: "Practical tutorial on basic skills for independence",
    order: 502,
  },

  // Unit 1: Financial Mastery (510-519)
  {
    title: "Money Reality Check",
    emoji: "💰",
    value: 25,
    description: "Calculate exactly how much money you have and how much you spend monthly. Face your financial truth.",
    course: "Life Skills",
    unit: "Unit 1: Financial Mastery",
    order: 511,
  },
  {
    title: "Expense Tracking",
    emoji: "📊",
    value: 30,
    description: "Track every expense for one week. Use an app to see where your money actually goes.",
    course: "Life Skills",
    unit: "Unit 1: Financial Mastery",
    resourceType: "app",
    resourceUrl: "https://apps.apple.com/us/app/mint-personal-finance/id300238550",
    resourceTitle: "Mint Personal Finance",
    resourceDescription: "Track spending and understand your money habits",
    order: 512,
  },
  {
    title: "Emergency Fund Start",
    emoji: "🛡️",
    value: 40,
    description: "Save $50 this month by cutting one unnecessary expense. Start building your financial foundation.",
    course: "Life Skills",
    unit: "Unit 1: Financial Mastery",
    order: 513,
  },
  {
    title: "Financial Education",
    emoji: "📚",
    value: 45,
    description: "Read a book about money management and building wealth. Education is your best investment.",
    course: "Life Skills",
    unit: "Unit 1: Financial Mastery",
    resourceType: "book",
    resourceUrl: "https://download.books.ms/main/3072000/696b15b81d854af223cb221f961c1807/Morgan%20Housel%20-%20The%20Psychology%20of%20Money.pdf",
    resourceTitle: "The Psychology of Money: Timeless lessons on wealth, greed, and happiness",
    resourceDescription: "Timeless principles of wealth building and financial wisdom",
    order: 514,
  },
  {
    title: "The pursuit of happiness",
    emoji: "🎬",
    value: 50,
    description: "Watch 'The pursuit of happiness' and write down 3 things you learned about discipline, determination and resilience.",
    course: "Life Skills",
    unit: "Unit 1: Financial Mastery",
    resourceType: "movies",
    resourceUrl: "https://fmoviesto.cc/movie/the-pursuit-of-happyness-2006-full-19175",
    resourceTitle: "The pursuit of happiness",
    resourceDescription: "Budgeting, sacrifice, hard work, resilience, and never giving up despite financial setbacks.",
    order: 515,
  },

  // RELATIONSHIPS QUESTS (600-699)
  
  // Unit 0: The Stakes of Disconnection (600-609)
  {
    title: "Connection Audit",
    emoji: "📋",
    value: 20,
    description: "List your 5 closest relationships. When did you last have a meaningful conversation with each?",
    course: "Relationships",
    unit: "Unit 0: The Stakes of Disconnection",
    order: 601,
  },
  {
    title: "Reach Out",
    emoji: "📞",
    value: 25,
    description: "Contact someone you haven't spoken to in months. Rebuild a connection you've let fade.",
    course: "Relationships",
    unit: "Unit 0: The Stakes of Disconnection",
    order: 602,
  },

  // Unit 1: Authentic Connection (610-619)
  {
    title: "Active Listening Practice",
    emoji: "👂",
    value: 30,
    description: "In your next conversation, focus entirely on listening. Don't plan what to say next - just listen.",
    course: "Relationships",
    unit: "Unit 1: Authentic Connection",
    order: 611,
  },
  {
    title: "Appreciation Expression",
    emoji: "🙏",
    value: 35,
    description: "Tell a male friend specifically why you appreciate him. Break the barrier of unexpressed brotherhood.",
    course: "Relationships",
    unit: "Unit 1: Authentic Connection",
    order: 612,
  },
  {
    title: "Deep Conversation",
    emoji: "💬",
    value: 40,
    description: "Have a 20-minute conversation about dreams, fears, or values. Go beyond surface topics.",
    course: "Relationships",
    unit: "Unit 1: Authentic Connection",
    resourceType: "website",
    resourceUrl: "https://www.nytimes.com/2015/01/09/style/no-37-big-wedding-or-small.html",
    resourceTitle: "36 Questions That Lead to Love",
    resourceDescription: "Research-backed questions to deepen any relationship",
    order: 613,
  },

  // Unit 2: Leadership in Relationships (620-629)
  {
    title: "Take Initiative",
    emoji: "🎯",
    value: 30,
    description: "Plan and organize a social gathering. Practice leading through service to others.",
    course: "Relationships",
    unit: "Unit 2: Leadership in Relationships",
    order: 621,
  },
  {
    title: "Difficult Conversation",
    emoji: "⚖️",
    value: 45,
    description: "Address a relationship conflict you've been avoiding. Lead with honesty and take responsibility.",
    course: "Relationships",
    unit: "Unit 2: Leadership in Relationships",
    resourceType: "book",
    resourceUrl: "https://download.books.ms/main/3935000/655041e7da27c5404c1330a6a96c0194/Rosenberg%2C%20Marshall%20B.%2C%20and%20Deepak%20Chopra%20-%20Nonviolent%20communication_%20A%20language%20of%20life-PuddleDancer%20Press%20%282015%29.pdf",
    resourceTitle: "Nonviolent Communication",
    resourceDescription: "Marshall Rosenberg's guide to compassionate communication",
    order: 622,
  },
  {
    title: "Leadership Through Unity",
    emoji: "🎬",
    value: 45,
    description: "Watch 'Remember the Titans' and analyze the leadership styles shown. How do they build authentic team unity?",
    course: "Relationships",
    unit: "Unit 2: Leadership in Relationships",
    resourceType: "movies",
    resourceUrl: "https://fmoviesto.cc/movie/remember-the-titans-2000-full-17383",
    resourceTitle: "Remember the Titans",
    resourceDescription: "Leadership, breaking down barriers, and building authentic team unity",
    order: 623,
  },

  // Unit 3: Understanding Women (630-639)
  {
    title: "Listen Without Fixing",
    emoji: "🤫",
    value: 35,
    description: "When a woman shares a problem, just listen and ask 'How can I support you?' Don't immediately try to fix.",
    course: "Relationships",
    unit: "Unit 3: Understanding Women",
    resourceType: "youtube",
    resourceUrl: "https://www.youtube.com/watch?v=-4EDhdAHrOg",
    resourceTitle: "It's Not About the Nail",
    resourceDescription: "Understanding when to listen vs. when to problem-solve",
    order: 631,
  },
  {
    title: "Respectful Compliment",
    emoji: "🌟",
    value: 30,
    description: "Give a sincere, non-appearance-based compliment to a woman. Practice respectful appreciation.",
    course: "Relationships",
    unit: "Unit 3: Understanding Women",
    order: 632,
  },
  {
    title: "Ask and Learn",
    emoji: "❓",
    value: 40,
    description: "Ask a woman in your life what makes her feel valued and respected. Listen to understand, not to debate.",
    course: "Relationships",
    unit: "Unit 3: Understanding Women",
    order: 633,
  },
  {
    title: "Appreciating Moments",
    emoji: "🎬",
    value: 40,
    description: "Watch 'About Time' and reflect on how he treated relationships with reverence. Apply one lesson this week.",
    course: "Relationships",
    unit: "Unit 3: Understanding Women",
    resourceType: "movies",
    resourceUrl: "https://fmoviesto.cc/movie/about-time-2013-full-19112",
    resourceTitle: "About Time",
    resourceDescription: "Appreciating everyday moments and treating relationships with reverence",
    order: 634,
  }
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
