// scripts/types.ts
export type ChallengeType = "SELECT" | "ASSIST";

export type ChallengeOption = {
  text: string;
  correct: boolean;
};

export type ChallengeTemplate = {
  type: ChallengeType;
  question: string;
  order: number;
  options: ChallengeOption[];
};

export type Lesson = {
  id: number;
  title: string;
  challenges: ChallengeTemplate[];
  order: number;
};

export type Unit = {
  id: number;
  title: string;
  description: string;
  lessons: Lesson[];
  order: number;
};

export type CourseContent = {
  id: number;
  title: string;
  imageSrc: string;
  description: string;
  units: Unit[];
};

export const COURSE_CONTENT: Record<string, CourseContent> = {
  "Self Growth": {
    id: 1,
    title: "Self Growth",
    imageSrc: "/selfGrowth_sigma.png",
    description: "Master your mindset and unlock your potential",
    units: [
      {
        id: 1,
        title: "Unit 1: Taking Responsibility",
        description: "The foundation of all growth - owning your life completely",
        order: 1,
        lessons: [
          {
            id: 1,
            title: "Lesson 1: The Weight of Choice",
            order: 1,
            challenges: [
              {
                type: "SELECT",
                question: "Before you answer this - sit up straight. Now: What separates a man from a boy?",
                order: 1,
                options: [
                  { text: "Age and physical development", correct: false },
                  { text: "Taking full responsibility for his choices and their consequences", correct: true },
                  { text: "Having money and status", correct: false },
                  { text: "Being respected by others", correct: false }
                ]
              },
              {
                type: "SELECT",
                question: "You made a mistake that hurt someone you care about. What's the mark of character?",
                order: 2,
                options: [
                  { text: "Explain why it wasn't really your fault", correct: false },
                  { text: "Own it completely, apologize genuinely, and change your behavior", correct: true },
                  { text: "Wait for them to get over it", correct: false }
                ]
              },
              {
                type: "SELECT",
                question: "Stop and think honestly - what's the biggest lie you tell yourself?",
                order: 3,
                options: [
                  { text: "That your problems are mostly other people's fault", correct: true },
                  { text: "That you're trying your best when you know you're not", correct: true },
                  { text: "That you'll start making changes 'tomorrow'", correct: true },
                  { text: "That you don't have what it takes", correct: true }
                ]
              }
            ]
          },
          {
            id: 2,
            title: "Lesson 2: Discipline as Freedom",
            order: 2,
            challenges: [
              {
                type: "SELECT",
                question: "Why do most young men avoid discipline?",
                order: 1,
                options: [
                  { text: "They mistake discipline for punishment", correct: true },
                  { text: "They're naturally lazy", correct: false },
                  { text: "Society doesn't teach it anymore", correct: false },
                  { text: "It's too hard", correct: false }
                ]
              },
              {
                type: "SELECT",
                question: "Put your phone face down right now. What just happened in your mind?",
                order: 2,
                options: [
                  { text: "Nothing, I did it easily", correct: true },
                  { text: "I felt a small resistance or anxiety", correct: true },
                  { text: "I refused to do it", correct: true }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 2,
        title: "Unit 2: Building Mental Strength",
        description: "Forging an unbreakable mindset through adversity",
        order: 2,
        lessons: [
          {
            id: 1,
            title: "Lesson 1: Embracing Discomfort",
            order: 1,
            challenges: [
              {
                type: "SELECT",
                question: "When did you last voluntarily do something uncomfortable?",
                order: 1,
                options: [
                  { text: "I can't remember - I avoid discomfort", correct: false },
                  { text: "Recently - I seek out challenges", correct: true },
                  { text: "Only when forced to", correct: false }
                ]
              },
              {
                type: "SELECT",
                question: "You're about to give up on something difficult. What voice should you listen to?",
                order: 2,
                options: [
                  { text: "The one saying 'this is too hard, quit'", correct: false },
                  { text: "The one asking 'what would I be capable of if I pushed through?'", correct: true },
                  { text: "The one saying 'I'll try again tomorrow'", correct: false },
                  { text: "The one saying 'I'm not built for this'", correct: false }
                ]
              },
              {
                type: "SELECT",
                question: "Close your eyes for 30 seconds and sit in complete silence. What happened in your mind?",
                order: 3,
                options: [
                  { text: "I felt restless and wanted to grab my phone", correct: false },
                  { text: "I noticed my thoughts but stayed present", correct: true },
                  { text: "I couldn't do it - I opened my eyes early", correct: false },
                  { text: "My mind went completely blank", correct: false }
                ]
              }
            ]
          },
          {
            id: 2,
            title: "Lesson 2: The Hierarchy of Suffering",
            order: 2,
            challenges: [
              {
                type: "SELECT",
                question: "What's worse: the pain of discipline or the pain of regret?",
                order: 1,
                options: [
                  { text: "The pain of discipline - it's immediate", correct: false },
                  { text: "The pain of regret - it lasts forever", correct: true },
                  { text: "They're the same", correct: false }
                ]
              },
              {
                type: "SELECT",
                question: "Stand up and hold a plank position for 60 seconds right now. What did you learn about yourself?",
                order: 2,
                options: [
                  { text: "I quit before 60 seconds", correct: true },
                  { text: "My body wanted to quit but my mind pushed through", correct: true },
                  { text: "I didn't even try", correct: true },
                  { text: "It was easy", correct: true }
                ]
              },
              {
                type: "SELECT",
                question: "Why do most people choose immediate pleasure over long-term fulfillment?",
                order: 3,
                options: [
                  { text: "They're not smart enough to see the future", correct: false },
                  { text: "They haven't developed the muscle of delayed gratification", correct: true },
                  { text: "Life is short, so why wait?", correct: false },
                  { text: "Society encourages instant gratification", correct: false }
                ]
              }
            ]
          },
          {
            id: 3,
            title: "Lesson 3: Confronting Your Shadow",
            order: 3,
            challenges: [
              {
                type: "SELECT",
                question: "What's the darkest thought you've had about yourself this week?",
                order: 1,
                options: [
                  { text: "I try not to think negative thoughts", correct: false },
                  { text: "I acknowledged it and chose not to be defined by it", correct: true },
                  { text: "I pushed it away immediately", correct: false },
                  { text: "I don't have dark thoughts", correct: false }
                ]
              },
              {
                type: "SELECT",
                question: "Write down three things you hate about yourself. Now burn the paper. How does it feel?",
                order: 2,
                options: [
                  { text: "I couldn't write them down", correct: false },
                  { text: "Liberating - I'm not my worst thoughts", correct: true },
                  { text: "Scary - what if they're true?", correct: false },
                  { text: "I didn't do this exercise", correct: false }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 3,
        title: "Unit 3: The Heroic Journey",
        description: "Every man must become the hero of his own story",
        order: 3,
        lessons: [
          {
            id: 1,
            title: "Lesson 1: Answering the Call",
            order: 1,
            challenges: [
              {
                type: "SELECT",
                question: "What's the biggest challenge you're avoiding right now?",
                order: 1,
                options: [
                  { text: "Having a difficult conversation", correct: true },
                  { text: "Starting something I might fail at", correct: true },
                  { text: "Facing a truth about myself", correct: true },
                  { text: "I'm not avoiding anything", correct: false }
                ]
              },
              {
                type: "SELECT",
                question: "Every hero's journey begins with a call to adventure. What's yours?",
                order: 2,
                options: [
                  { text: "To become financially independent", correct: true },
                  { text: "To build meaningful relationships", correct: true },
                  { text: "To overcome my deepest fears", correct: true },
                  { text: "I don't know yet", correct: false }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "Mental Health": {
    id: 2,
    title: "Mental Health",
    imageSrc: "/mentalHealth_sigma.png",
    description: "Build resilience and emotional intelligence",
    units: [
      {
        id: 1,
        title: "Unit 1: Understanding Your Inner World",
        description: "Navigate emotions without being controlled by them",
        order: 1,
        lessons: [
          {
            id: 1,
            title: "Lesson 1: Emotional Awareness Without Weakness",
            order: 1,
            challenges: [
              {
                type: "SELECT",
                question: "Take a deep breath. How are you feeling right now, honestly?",
                order: 1,
                options: [
                  { text: "I don't really know - I don't pay attention", correct: false },
                  { text: "I can identify what I'm feeling", correct: true },
                  { text: "I feel nothing most of the time", correct: false }
                ]
              },
              {
                type: "SELECT",
                question: "What's the difference between acknowledging emotions and being controlled by them?",
                order: 2,
                options: [
                  { text: "There isn't one - emotions are weakness", correct: false },
                  { text: "Acknowledging gives you power; being controlled takes it away", correct: true },
                  { text: "Only weak people acknowledge emotions", correct: false },
                  { text: "It's better to suppress all emotions", correct: false }
                ]
              }
            ]
          },
          {
            id: 2,
            title: "Lesson 2: Dealing with Darkness",
            order: 2,
            challenges: [
              {
                type: "SELECT",
                question: "Everyone has dark thoughts sometimes. What separates good men from dangerous ones?",
                order: 1,
                options: [
                  { text: "Good men never have dark thoughts", correct: false },
                  { text: "Good men acknowledge the darkness but choose light", correct: true },
                  { text: "It's all about genetics", correct: false }
                ]
              },
              {
                type: "SELECT",
                question: "When you're at your lowest point, who do you become?",
                order: 2,
                options: [
                  { text: "Someone who blames everyone else", correct: false },
                  { text: "Someone who retreats and isolates completely", correct: false },
                  { text: "Someone who fights back against the darkness", correct: true },
                  { text: "Someone who gives up", correct: false }
                ]
              },
              {
                type: "SELECT",
                question: "Look in a mirror right now. What do you see behind your eyes?",
                order: 3,
                options: [
                  { text: "Fear and uncertainty", correct: false },
                  { text: "Potential waiting to be unleashed", correct: true },
                  { text: "Someone I don't recognize", correct: false },
                  { text: "I avoided looking deeply", correct: false }
                ]
              },
              {
                type: "SELECT",
                question: "Your worst enemy is talking behind your back. If everything they said was true, what would it be?",
                order: 4,
                options: [
                  { text: "That I'm lazy and waste my potential", correct: true },
                  { text: "That I'm selfish and don't care about others", correct: true },
                  { text: "That I'm weak and avoid challenges", correct: true },
                  { text: "They couldn't say anything true", correct: true }
                ]
              }
            ]
          },
          {
            id: 3,
            title: "Lesson 3: Anxiety as a Teacher",
            order: 3,
            challenges: [
              {
                type: "SELECT",
                question: "Take 10 deep breaths right now. What is your anxiety trying to tell you?",
                order: 1,
                options: [
                  { text: "That I'm in danger", correct: false },
                  { text: "That I'm avoiding something important", correct: true },
                  { text: "That I'm broken", correct: false },
                  { text: "Nothing - anxiety is meaningless", correct: false }
                ]
              },
              {
                type: "SELECT",
                question: "What would you attempt if you knew you couldn't fail?",
                order: 2,
                options: [
                  { text: "Start my own business", correct: true },
                  { text: "Ask someone out", correct: true },
                  { text: "Travel the world", correct: false },
                  { text: "Nothing would change", correct: false }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 2,
        title: "Unit 2: Building Resilience",
        description: "Develop the strength to bounce back from anything",
        order: 2,
        lessons: [
          {
            id: 2,
            title: "Lesson 2: The Power of Meaning",
            order: 1,
            challenges: [
              {
                type: "SELECT",
                question: "What would make your suffering worthwhile?",
                order: 1,
                options: [
                  { text: "Nothing - suffering is pointless", correct: false },
                  { text: "If it served something greater than myself", correct: true },
                  { text: "If it made me famous", correct: false },
                  { text: "If it was easy", correct: false }
                ]
              },
              {
                type: "SELECT",
                question: "Write down your biggest problem right now. Now write how this problem is making you stronger. What did you discover?",
                order: 2,
                options: [
                  { text: "I couldn't find any benefit", correct: false },
                  { text: "Every struggle is teaching me something valuable", correct: true },
                  { text: "I didn't do the exercise", correct: false },
                  { text: "My problems are someone else's fault", correct: false }
                ]
              },
              {
                type: "SELECT",
                question: "If you died tomorrow, what would be left undone that would haunt you?",
                order: 3,
                options: [
                  { text: "Telling someone I love them", correct: true },
                  { text: "Starting the business I've been planning", correct: true },
                  { text: "Becoming the man I know I can be", correct: true },
                  { text: "Nothing - I'm living fully", correct: true }
                ]
              }
            ]
          },
          {
            id: 3,
            title: "Lesson 3: Post-Traumatic Growth",
            order: 3,
            challenges: [
              {
                type: "SELECT",
                question: "What's the worst thing that ever happened to you? How did it change you?",
                order: 1,
                options: [
                  { text: "It broke me and I never recovered", correct: false },
                  { text: "It revealed strength I didn't know I had", correct: true },
                  { text: "I try not to think about it", correct: false },
                  { text: "It made me bitter", correct: false }
                ]
              },
              {
                type: "SELECT",
                question: "Clench your fist as tight as you can for 30 seconds. Now release it. What does this teach you about holding onto pain?",
                order: 2,
                options: [
                  { text: "Holding on creates more suffering than letting go", correct: true },
                  { text: "Some pain should be held forever", correct: false },
                  { text: "I didn't do the exercise", correct: false }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "Physical Health": {
    id: 3,
    title: "Physical Health",
    imageSrc: "/physicalHealth_sigma.png",
    description: "Optimize your body and energy levels",
    units: [
      {
        id: 1,
        title: "Unit 1: Your Body as Your Temple",
        description: "Respect and develop your physical vessel",
        order: 1,
        lessons: [
          {
            id: 1,
            title: "Lesson 1: The Foundation of Strength",
            order: 1,
            challenges: [
              {
                type: "SELECT",
                question: "Stand up right now and do 10 push-ups. How did that feel?",
                order: 1,
                options: [
                  { text: "I didn't do them", correct: false },
                  { text: "Difficult but I pushed through", correct: true },
                  { text: "Easy - I'm already in good shape", correct: true },
                  { text: "Impossible - I'm too out of shape", correct: false }
                ]
              },
              {
                type: "SELECT",
                question: "Why do strong men often become leaders?",
                order: 2,
                options: [
                  { text: "Physical strength equals mental strength", correct: true },
                  { text: "People are intimidated by them", correct: false },
                  { text: "They're naturally more aggressive", correct: false },
                  { text: "Society favors the strong", correct: false }
                ]
              }
            ]
          },
          {
            id: 2,
            title: "Lesson 2: Discipline in Diet",
            order: 2,
            challenges: [
              {
                type: "SELECT",
                question: "What did you eat for your last meal? Be honest.",
                order: 1,
                options: [
                  { text: "Something I knew was bad for me", correct: false },
                  { text: "Something that nourished my body", correct: true },
                  { text: "I don't remember", correct: false }
                ]
              },
              {
                type: "SELECT",
                question: "Open your fridge right now. What does it say about who you're becoming?",
                order: 2,
                options: [
                  { text: "I'm someone who values convenience over health", correct: false },
                  { text: "I'm investing in my future self", correct: true },
                  { text: "I don't plan ahead", correct: false },
                  { text: "I'm broke so I eat whatever's cheap", correct: false }
                ]
              }
            ]
          },
          {
            id: 3,
            title: "Lesson 3: The Warrior's Body",
            order: 3,
            challenges: [
              {
                type: "SELECT",
                question: "Do 20 jumping jacks right now. How do you feel?",
                order: 1,
                options: [
                  { text: "Energized and alive", correct: true },
                  { text: "Out of breath and embarrassed", correct: false },
                  { text: "I didn't do them", correct: false }
                ]
              },
              {
                type: "SELECT",
                question: "Your body is the only vehicle you get for this lifetime. How are you treating it?",
                order: 2,
                options: [
                  { text: "Like a rental car I don't care about", correct: false },
                  { text: "Like a temple that deserves respect", correct: true },
                  { text: "Like it owes me something", correct: false },
                  { text: "I never think about this", correct: false }
                ]
              },
              {
                type: "SELECT",
                question: "What's more important: looking strong or being strong?",
                order: 3,
                options: [
                  { text: "Looking strong - perception is reality", correct: false },
                  { text: "Being strong - real strength shows itself", correct: true },
                  { text: "They're the same thing", correct: false }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "Digital Wellness": {
    id: 4,
    title: "Digital Wellness",
    imageSrc: "/digitalWellness_sigma.png",
    description: "Master technology and digital habits",
    units: [
      {
        id: 1,
        title: "Unit 1: Breaking Digital Chains",
        description: "Reclaim your attention and mental freedom",
        order: 1,
        lessons: [
          {
            id: 1,
            title: "Lesson 1: The Attention War",
            order: 1,
            challenges: [
              {
                type: "SELECT",
                question: "Check your screen time from yesterday. How many hours?",
                order: 1,
                options: [
                  { text: "Less than 3 hours", correct: true },
                  { text: "3-6 hours", correct: false },
                  { text: "More than 6 hours", correct: false },
                  { text: "I don't want to check", correct: false }
                ]
              },
              {
                type: "SELECT",
                question: "Who profits when you're scrolling mindlessly?",
                order: 2,
                options: [
                  { text: "No one - it's harmless entertainment", correct: false },
                  { text: "Tech companies selling your attention", correct: true },
                  { text: "Content creators", correct: false },
                  { text: "Advertisers", correct: false }
                ]
              },
              {
                type: "SELECT",
                question: "Right now, turn off all notifications except calls and texts. What resistance do you feel?",
                order: 3,
                options: [
                  { text: "None - I did it immediately", correct: true },
                  { text: "Anxiety about missing something", correct: false },
                  { text: "I refuse to do it", correct: false }
                ]
              },
              {
                type: "SELECT",
                question: "Count how many times you've checked your phone today. Don't estimate - actually count. What's the number?",
                order: 4,
                options: [
                  { text: "Less than 20 times", correct: true },
                  { text: "20-50 times", correct: false },
                  { text: "More than 50 times", correct: false },
                  { text: "I lost count", correct: false }
                ]
              },
              {
                type: "SELECT",
                question: "Put your phone in another room and sit with your thoughts for 5 minutes. What happened?",
                order: 5,
                options: [
                  { text: "I felt withdrawal symptoms", correct: false },
                  { text: "I realized how addicted I am", correct: false },
                  { text: "I enjoyed the peace and clarity", correct: true },
                  { text: "I couldn't do it", correct: false }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 2,
        title: "Unit 2: Digital Masculinity",
        description: "Navigate online spaces with integrity and purpose",
        order: 2,
        lessons: [
          {
            id: 1,
            title: "Lesson 1: Your Digital Shadow",
            order: 1,
            challenges: [
              {
                type: "SELECT",
                question: "If your future son could see everything you've ever posted online, would you be proud?",
                order: 1,
                options: [
                  { text: "Absolutely - I represent my values online", correct: true },
                  { text: "Mostly, with a few regrets", correct: false },
                  { text: "No - I'd be embarrassed", correct: false }
                ]
              },
              {
                type: "SELECT",
                question: "Delete your most embarrassing social media post right now. How does it feel?",
                order: 2,
                options: [
                  { text: "Liberating - I'm cleaning up my digital presence", correct: true },
                  { text: "Scary - what if people notice?", correct: false },
                  { text: "I don't have any embarrassing posts", correct: false },
                  { text: "I didn't delete anything", correct: false }
                ]
              }
            ]
          },
          {
            id: 2,
            title: "Lesson 2: The Dopamine Wars",
            order: 2,
            challenges: [
              {
                type: "SELECT",
                question: "What's designed to be more addictive: cocaine or your smartphone?",
                order: 1,
                options: [
                  { text: "Cocaine - it's a drug", correct: false },
                  { text: "Your smartphone - it's engineered by teams of neuroscientists", correct: true },
                  { text: "They're equally addictive", correct: false }
                ]
              },
              {
                type: "SELECT",
                question: "Go 24 hours without social media starting now. What's your biggest fear about doing this?",
                order: 2,
                options: [
                  { text: "I'll miss something important", correct: false },
                  { text: "I'll be bored", correct: false },
                  { text: "I'll realize how dependent I am", correct: true },
                  { text: "I can't do it", correct: false }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "Life Skills": {
    id: 5,
    title: "Life Skills",
    imageSrc: "/lifeSkills_sigma.png",
    description: "Develop essential life management skills",
    units: [
      {
        id: 1,
        title: "Unit 1: Financial Mastery",
        description: "Build wealth and financial independence",
        order: 1,
        lessons: [
          {
            id: 1,
            title: "Lesson 1: Money and Character",
            order: 1,
            challenges: [
              {
                type: "SELECT",
                question: "What's your relationship with money?",
                order: 1,
                options: [
                  { text: "I avoid thinking about it", correct: false },
                  { text: "I see it as a tool for freedom and service", correct: true },
                  { text: "I'm obsessed with having more", correct: false },
                  { text: "Money is evil", correct: false }
                ]
              },
              {
                type: "SELECT",
                question: "You get an unexpected $1000. What reveals your character?",
                order: 2,
                options: [
                  { text: "Spend it immediately on wants", correct: false },
                  { text: "Save or invest most of it", correct: true },
                  { text: "Use it to help others first", correct: true }
                ]
              },
              {
                type: "SELECT",
                question: "Check your bank account right now. Without looking at the number, how do you feel?",
                order: 3,
                options: [
                  { text: "Anxious - I avoid looking at it", correct: false },
                  { text: "Confident - I know exactly where I stand", correct: true },
                  { text: "Shameful - I've made bad decisions", correct: false },
                  { text: "Hopeless - nothing will change", correct: false }
                ]
              }
            ]
          },
          {
            id: 2,
            title: "Lesson 2: The Discipline of Wealth",
            order: 2,
            challenges: [
              {
                type: "SELECT",
                question: "What separates the rich from the poor?",
                order: 1,
                options: [
                  { text: "Luck and family connections", correct: false },
                  { text: "Delayed gratification and long-term thinking", correct: true },
                  { text: "Exploitation of others", correct: false },
                  { text: "Natural talent", correct: false }
                ]
              },
              {
                type: "SELECT",
                question: "Write down every purchase you made this week. What pattern do you see?",
                order: 2,
                options: [
                  { text: "I spend on impulse and emotions", correct: false },
                  { text: "I invest in my future self", correct: true },
                  { text: "I waste money on things that don't matter", correct: false },
                  { text: "I didn't track my spending", correct: false }
                ]
              }
            ]
          }
            ]
          }
        ]
  },
  "Relationships": {
    id: 6,
    title: "Relationships",
    imageSrc: "/relationships_sigma.png",
    description: "Build and maintain healthy relationships",
    units: [
      {
        id: 1,
        title: "Unit 1: Authentic Connection",
        description: "Build relationships based on genuine value and respect",
        order: 1,
        lessons: [
          {
            id: 1,
            title: "Lesson 1: The Foundation of Respect",
            order: 1,
            challenges: [
              {
                type: "SELECT",
                question: "What makes someone worthy of your respect?",
                order: 1,
                options: [
                  { text: "Their status or wealth", correct: false },
                  { text: "Their character and integrity", correct: true },
                  { text: "How they treat you", correct: false },
                  { text: "Their achievements", correct: false }
                ]
              },
              {
                type: "SELECT",
                question: "Think of your closest friend. Why do they matter to you?",
                order: 2,
                options: [
                  { text: "They make me feel good about myself", correct: false },
                  { text: "They challenge me to be better", correct: true },
                  { text: "They're always available", correct: false },
                  { text: "We have fun together", correct: false }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 2,
        title: "Unit 2: Leadership in Relationships",
        description: "Lead by example in all your relationships",
        order: 2,
        lessons: [
          {
            id: 1,
            title: "Lesson 1: Leading Without Dominating",
            order: 1,
            challenges: [
              {
                type: "SELECT",
                question: "What's the difference between leadership and control?",
                order: 1,
                options: [
                  { text: "There isn't one", correct: false },
                  { text: "Leadership inspires; control dominates", correct: true },
                  { text: "Leadership is for the weak", correct: false }
                ]
              },
              {
                type: "SELECT",
                question: "You're in a group project and no one is taking charge. What do you do?",
                order: 2,
                options: [
                  { text: "Wait for someone else to step up", correct: false },
                  { text: "Take initiative and organize everyone", correct: true },
                  { text: "Do everything myself", correct: false },
                  { text: "Complain about the lack of leadership", correct: false }
                ]
              },
              {
                type: "SELECT",
                question: "Look someone in the eye for 30 seconds without speaking. What did you communicate?",
                order: 3,
                options: [
                  { text: "Confidence and presence", correct: true },
                  { text: "Aggression and intimidation", correct: false },
                  { text: "I couldn't maintain eye contact", correct: false },
                  { text: "Nothing - it was awkward", correct: false }
                ]
              }
            ]
          },
          {
            id: 2,
            title: "Lesson 2: Earning Respect vs Demanding It",
            order: 2,
            challenges: [
              {
                type: "SELECT",
                question: "How do you know when someone truly respects you?",
                order: 1,
                options: [
                  { text: "They tell you they do", correct: false },
                  { text: "They seek your advice and opinion", correct: true },
                  { text: "They fear you", correct: false },
                  { text: "They do what you say", correct: false }
                ]
              },
              {
                type: "SELECT",
                question: "You witness someone being disrespected. What reveals your character?",
                order: 2,
                options: [
                  { text: "I stay quiet to avoid conflict", correct: false },
                  { text: "I speak up regardless of consequences", correct: true },
                  { text: "I intervene only if I know the person", correct: false },
                  { text: "I record it on my phone", correct: false }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 3,
        title: "Unit 3: Understanding Women",
        description: "Build genuine connections with the opposite sex",
        order: 3,
        lessons: [
          {
            id: 1,
            title: "Lesson 1: Beyond the Surface",
            order: 1,
            challenges: [
              {
                type: "SELECT",
                question: "What do women most want from men?",
                order: 1,
                options: [
                  { text: "Money and status", correct: false },
                  { text: "Safety, respect, and genuine strength", correct: true },
                  { text: "Constant attention", correct: false },
                  { text: "To be entertained", correct: false }
                ]
              },
              {
                type: "SELECT",
                question: "When approaching relationships, what mindset serves you best?",
                order: 2,
                options: [
                  { text: "What can I get from this person?", correct: false },
                  { text: "What value can I bring to their life?", correct: true },
                  { text: "How can I impress them?", correct: false },
                  { text: "How can I avoid rejection?", correct: false }
                ]
              },
              {
                type: "SELECT",
                question: "Ask a woman in your life what she values most in a man. Actually ask - don't assume. What did she say?",
                order: 3,
                options: [
                  { text: "Physical attractiveness", correct: false },
                  { text: "Emotional strength and reliability", correct: true },
                  { text: "Money and success", correct: false },
                  { text: "I didn't ask anyone", correct: false }
                ]
              },
              {
                type: "SELECT",
                question: "What's more attractive: a man who never shows emotion or one who feels deeply but controls his actions?",
                order: 4,
                options: [
                  { text: "Never showing emotion - stoicism is strength", correct: false },
                  { text: "Feeling deeply but maintaining control", correct: true },
                  { text: "Showing all emotions freely", correct: false }
                ]
              }
            ]
          },
          {
            id: 2,
            title: "Lesson 2: The Gentleman's Code",
            order: 2,
            challenges: [
              {
                type: "SELECT",
                question: "You're walking with a woman and approach a door. What do you do?",
                order: 1,
                options: [
                  { text: "Push through first - equality means she can get her own door", correct: false },
                  { text: "Hold it open - courtesy is a strength, not weakness", correct: true },
                  { text: "Let her decide what she wants", correct: false }
                ]
              },
              {
                type: "SELECT",
                question: "A woman is struggling with something heavy. Your response reveals what about you?",
                order: 2,
                options: [
                  { text: "I assume she doesn't need help - don't be sexist", correct: false },
                  { text: "I offer to help - strength serves others", correct: true },
                  { text: "I ignore it - not my problem", correct: false }
                ]
              }
            ]
          }
            ]
          }
        ]
  }
};