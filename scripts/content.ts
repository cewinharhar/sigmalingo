import { type ChallengeTemplate } from "./types";

export const COURSE_CONTENT: Record<string, ChallengeTemplate[]> = {
  "Self Growth": [
    {
      type: "SELECT" as const,
      question: "When you face a major setback in life, what's your first instinct?",
      order: 1,
      options: [
        { text: "Blame external circumstances and feel victimized", correct: false },
        { text: "Analyze what went wrong and extract lessons from it", correct: true },
        { text: "Give up and find something easier to pursue", correct: false }
      ]
    },
    {
      type: "SELECT" as const,
      question: "Taking responsibility for your life means...",
      order: 2,
      options: [
        { text: "Never asking for help because it shows weakness", correct: false },
        { text: "Controlling every outcome that happens to you", correct: false },
        { text: "Owning both your successes and your failures completely", correct: true }
      ]
    },
    {
      type: "SELECT" as const,
      question: "Your worth as a man should be defined by:",
      order: 3,
      options: [
        { text: "Your achievements, status, and material possessions", correct: false },
        { text: "Your character, values, and how you treat others", correct: true },
        { text: "What others think and say about you", correct: false }
      ]
    },
    {
      type: "SELECT" as const,
      question: "What separates genuine confidence from toxic arrogance?",
      order: 4,
      options: [
        { text: "Confidence includes humility and respect for others", correct: true },
        { text: "Confidence means being louder and more aggressive", correct: false },
        { text: "There's no meaningful difference between them", correct: false }
      ]
    },
    {
      type: "SELECT" as const,
      question: "When should you deliberately step outside your comfort zone?",
      order: 5,
      options: [
        { text: "Never - comfort zones exist to protect you", correct: false },
        { text: "Regularly, but with calculated and thoughtful risks", correct: true },
        { text: "Only when circumstances force you to", correct: false }
      ]
    },
    {
      type: "SELECT" as const,
      question: "The most crucial relationship you'll ever have is:",
      order: 6,
      options: [
        { text: "The relationship with your romantic partner", correct: false },
        { text: "The relationship with yourself", correct: true },
        { text: "The relationship with your family", correct: false }
      ]
    },
    {
      type: "SELECT" as const,
      question: "True masculinity is best expressed through:",
      order: 7,
      options: [
        { text: "Emotional control, strength, and protecting others", correct: true },
        { text: "Dominance, aggression, and never showing vulnerability", correct: false },
        { text: "Competition, conquest, and proving superiority", correct: false }
      ]
    },
    {
      type: "SELECT" as const,
      question: "What does it mean to 'level up' in life?",
      order: 8,
      options: [
        { text: "Getting more followers, money, or status symbols", correct: false },
        { text: "Consistently improving your character and capabilities", correct: true },
        { text: "Surpassing others in competition and achievement", correct: false }
      ]
    }
  ],

  "Mental Health": [
    {
      type: "SELECT" as const,
      question: "When difficult emotions hit you hard, the first step should be:",
      order: 1,
      options: [
        { text: "Immediately trying to fix or eliminate the feeling", correct: false },
        { text: "Acknowledging and naming exactly what you're feeling", correct: true },
        { text: "Distracting yourself until the emotion passes", correct: false }
      ]
    },
    {
      type: "SELECT" as const,
      question: "The healthiest way to handle stress is to:",
      order: 2,
      options: [
        { text: "Push through it and ignore the warning signs", correct: false },
        { text: "Avoid all stressful situations whenever possible", correct: false },
        { text: "Develop healthy coping strategies and address root causes", correct: true }
      ]
    },
    {
      type: "SELECT" as const,
      question: "Emotional maturity looks like:",
      order: 3,
      options: [
        { text: "Responding thoughtfully rather than reacting impulsively", correct: true },
        { text: "Never showing vulnerability or emotional weakness", correct: false },
        { text: "Always maintaining a positive and upbeat attitude", correct: false }
      ]
    },
    {
      type: "SELECT" as const,
      question: "Seeking help for mental health is appropriate:",
      order: 4,
      options: [
        { text: "Never - real men handle their problems alone", correct: false },
        { text: "Whenever you're struggling or want to improve yourself", correct: true },
        { text: "Only when you're in complete crisis mode", correct: false }
      ]
    },
    {
      type: "SELECT" as const,
      question: "The relationship between your thoughts and reality is:",
      order: 5,
      options: [
        { text: "Your thoughts are always accurate reflections of reality", correct: false },
        { text: "Your thoughts influence reality but aren't always accurate", correct: true },
        { text: "Thoughts have no real impact on your daily experience", correct: false }
      ]
    },
    {
      type: "SELECT" as const,
      question: "Genuine self-esteem is built through:",
      order: 6,
      options: [
        { text: "Comparing yourself favorably to other people", correct: false },
        { text: "Consistent actions aligned with your core values", correct: true },
        { text: "External achievements and social recognition", correct: false }
      ]
    },
    {
      type: "SELECT" as const,
      question: "When anxiety strikes, the most effective approach is:",
      order: 7,
      options: [
        { text: "Face it head-on with breathing and grounding techniques", correct: true },
        { text: "Power through it and pretend it's not happening", correct: false },
        { text: "Avoid the situation causing the anxiety completely", correct: false }
      ]
    },
    {
      type: "SELECT" as const,
      question: "Depression in young men often manifests as:",
      order: 8,
      options: [
        { text: "Anger, irritability, and reckless behavior", correct: true },
        { text: "Only sadness and crying openly", correct: false },
        { text: "Complete withdrawal from all activities", correct: false }
      ]
    }
  ],

  "Physical Health": [
    {
      type: "SELECT" as const,
      question: "The foundation of lasting physical health is:",
      order: 1,
      options: [
        { text: "Following the latest fitness trends and fads", correct: false },
        { text: "Consistent daily habits and lifestyle choices", correct: true },
        { text: "Intense workout sessions only when motivated", correct: false }
      ]
    },
    {
      type: "SELECT" as const,
      question: "When building strength and fitness, you should:",
      order: 2,
      options: [
        { text: "Start gradually and focus on progressive improvement", correct: true },
        { text: "Go all-out from day one to see rapid results", correct: false },
        { text: "Wait until you have perfect conditions to begin", correct: false }
      ]
    },
    {
      type: "SELECT" as const,
      question: "Physical and mental health are:",
      order: 3,
      options: [
        { text: "Completely separate aspects of overall wellness", correct: false },
        { text: "Deeply interconnected and influence each other", correct: true },
        { text: "Important, but physical health matters more", correct: false }
      ]
    },
    {
      type: "SELECT" as const,
      question: "Sleep for a young man's development is:",
      order: 4,
      options: [
        { text: "Somewhat important but can be sacrificed for productivity", correct: false },
        { text: "Critical for physical recovery, mental clarity, and emotional regulation", correct: true },
        { text: "Overrated - willpower can overcome any tiredness", correct: false }
      ]
    },
    {
      type: "SELECT" as const,
      question: "Your approach to nutrition should be driven by:",
      order: 5,
      options: [
        { text: "Fueling your body for optimal performance and health", correct: true },
        { text: "Strict adherence to whatever diet is trending", correct: false },
        { text: "Eating whatever you want while you're still young", correct: false }
      ]
    },
    {
      type: "SELECT" as const,
      question: "When dealing with physical setbacks or injuries:",
      order: 6,
      options: [
        { text: "Push through the pain to maintain your routine", correct: false },
        { text: "Use it as an excuse to quit exercising entirely", correct: false },
        { text: "Listen to your body, seek treatment, and adapt your approach", correct: true }
      ]
    },
    {
      type: "SELECT" as const,
      question: "The best time to start taking care of your body is:",
      order: 7,
      options: [
        { text: "Right now, regardless of your current condition", correct: true },
        { text: "When you start experiencing health problems", correct: false },
        { text: "After you've achieved success in other areas", correct: false }
      ]
    },
    {
      type: "SELECT" as const,
      question: "Building physical discipline teaches you:",
      order: 8,
      options: [
        { text: "How to endure pain and suffering unnecessarily", correct: false },
        { text: "Mental toughness and self-control in all life areas", correct: true },
        { text: "That appearance is more important than character", correct: false }
      ]
    }
  ],

  "Digital Wellness": [
    {
      type: "SELECT" as const,
      question: "The biggest danger of excessive social media use is:",
      order: 1,
      options: [
        { text: "Missing out on the latest trends and updates", correct: false },
        { text: "Not having enough followers or engagement", correct: false },
        { text: "Constant comparison leading to decreased self-worth", correct: true }
      ]
    },
    {
      type: "SELECT" as const,
      question: "Your relationship with technology should be:",
      order: 2,
      options: [
        { text: "Intentional - using it as a tool to enhance your life", correct: true },
        { text: "Complete embrace without any boundaries or limits", correct: false },
        { text: "Total avoidance to maintain purity and focus", correct: false }
      ]
    },
    {
      type: "SELECT" as const,
      question: "Excessive screen time impacts your development by:",
      order: 3,
      options: [
        { text: "Making you more informed and globally connected", correct: false },
        { text: "Impairing focus, sleep quality, and real-world social skills", correct: true },
        { text: "Having no significant impact on personal growth", correct: false }
      ]
    },
    {
      type: "SELECT" as const,
      question: "To maintain authentic relationships in the digital age:",
      order: 4,
      options: [
        { text: "Focus on building your online presence and follower count", correct: false },
        { text: "Prioritize face-to-face interactions and meaningful conversations", correct: true },
        { text: "Communicate exclusively through digital platforms", correct: false }
      ]
    },
    {
      type: "SELECT" as const,
      question: "A healthy approach to consuming online content means:",
      order: 5,
      options: [
        { text: "Being selective and critical about what you consume", correct: true },
        { text: "Consuming as much as possible to stay informed", correct: false },
        { text: "Only following content that reinforces your existing beliefs", correct: false }
      ]
    },
    {
      type: "SELECT" as const,
      question: "Technology can best support your goals when you:",
      order: 6,
      options: [
        { text: "Rely on it to do most of the work for you", correct: false },
        { text: "Use apps and tools for progress tracking and accountability", correct: true },
        { text: "Use it primarily for entertainment and distraction", correct: false }
      ]
    },
    {
      type: "SELECT" as const,
      question: "Digital detoxes are valuable because they:",
      order: 7,
      options: [
        { text: "Help you reconnect with yourself and the physical world", correct: true },
        { text: "Make you appear more disciplined to others", correct: false },
        { text: "Are trendy and show you're conscious about wellness", correct: false }
      ]
    },
    {
      type: "SELECT" as const,
      question: "The dopamine hits from social media and gaming:",
      order: 8,
      options: [
        { text: "Are harmless and just part of modern entertainment", correct: false },
        { text: "Can create addictive patterns that undermine real achievement", correct: true },
        { text: "Are actually beneficial for maintaining happiness", correct: false }
      ]
    }
  ],

  "Life Skills": [
    {
      type: "SELECT" as const,
      question: "The most important financial skill for a young man is:",
      order: 1,
      options: [
        { text: "Learning to live below your means and save consistently", correct: true },
        { text: "Finding get-rich-quick investment schemes that work", correct: false },
        { text: "Spending money strategically to impress the right people", correct: false }
      ]
    },
    {
      type: "SELECT" as const,
      question: "Effective time management requires you to:",
      order: 2,
      options: [
        { text: "Try to multitask as efficiently as possible", correct: false },
        { text: "Wing it and hope everything works out fine", correct: false },
        { text: "Prioritize important tasks and eliminate time-wasters", correct: true }
      ]
    },
    {
      type: "SELECT" as const,
      question: "The key to developing unshakeable discipline is:",
      order: 3,
      options: [
        { text: "Relying on motivation and inspirational content", correct: false },
        { text: "Start with small commitments and build consistency", correct: true },
        { text: "Punishing yourself harshly for any failures or setbacks", correct: false }
      ]
    },
    {
      type: "SELECT" as const,
      question: "When you experience failure and setbacks, you should:",
      order: 4,
      options: [
        { text: "Extract lessons, adjust your approach, and keep moving forward", correct: true },
        { text: "Dwell on the failure and analyze what went wrong", correct: false },
        { text: "Pretend it didn't happen and move on quickly", correct: false }
      ]
    },
    {
      type: "SELECT" as const,
      question: "Good decision-making is founded on:",
      order: 5,
      options: [
        { text: "Always going with your gut feeling and instincts", correct: false },
        { text: "Gathering information, considering consequences, and aligning with values", correct: true },
        { text: "Asking others to make important decisions for you", correct: false }
      ]
    },
    {
      type: "SELECT" as const,
      question: "Building a meaningful career or life path means:",
      order: 6,
      options: [
        { text: "Chasing the highest salary possible regardless of fit", correct: false },
        { text: "Aligning your work with your values, strengths, and interests", correct: true },
        { text: "Following whatever path your parents have chosen for you", correct: false }
      ]
    },
    {
      type: "SELECT" as const,
      question: "Personal accountability means:",
      order: 7,
      options: [
        { text: "Taking ownership of your choices and their consequences", correct: true },
        { text: "Blaming yourself for everything that goes wrong", correct: false },
        { text: "Never admitting mistakes to maintain your reputation", correct: false }
      ]
    },
    {
      type: "SELECT" as const,
      question: "The habit that will transform your life the most is:",
      order: 8,
      options: [
        { text: "Reading self-help books and watching motivational videos", correct: false },
        { text: "Daily reflection and intentional improvement", correct: true },
        { text: "Networking with successful and influential people", correct: false }
      ]
    }
  ],

  "Relationships": [
    {
      type: "SELECT" as const,
      question: "The foundation of any healthy relationship is:",
      order: 1,
      options: [
        { text: "Shared interests and similar backgrounds", correct: false },
        { text: "Mutual respect, trust, and honest communication", correct: true },
        { text: "Strong physical attraction and chemistry", correct: false }
      ]
    },
    {
      type: "SELECT" as const,
      question: "When conflict arises in relationships, you should:",
      order: 2,
      options: [
        { text: "Address issues directly with empathy and seek understanding", correct: true },
        { text: "Avoid conflict at all costs to maintain peace", correct: false },
        { text: "Assert dominance to win every argument decisively", correct: false }
      ]
    },
    {
      type: "SELECT" as const,
      question: "Being a good friend means:",
      order: 3,
      options: [
        { text: "Always agreeing with your friends to avoid conflict", correct: false },
        { text: "Being loyal, supportive, and honest even when it's difficult", correct: true },
        { text: "Only maintaining friendships that directly benefit you", correct: false }
      ]
    },
    {
      type: "SELECT" as const,
      question: "Your approach to romantic relationships should be:",
      order: 4,
      options: [
        { text: "Focus on becoming the best version of yourself first", correct: true },
        { text: "Look for someone to complete you and fix your problems", correct: false },
        { text: "Use strategic games and manipulation tactics", correct: false }
      ]
    },
    {
      type: "SELECT" as const,
      question: "You earn genuine respect from others by:",
      order: 5,
      options: [
        { text: "Being the loudest and most dominant person present", correct: false },
        { text: "Consistently demonstrating integrity and treating others well", correct: true },
        { text: "Having the most money or impressive status symbols", correct: false }
      ]
    },
    {
      type: "SELECT" as const,
      question: "Setting healthy boundaries in relationships means:",
      order: 6,
      options: [
        { text: "Avoiding all boundaries to keep others happy", correct: false },
        { text: "Being rigid and inflexible in every situation", correct: false },
        { text: "Clearly communicating your limits and sticking to them consistently", correct: true }
      ]
    },
    {
      type: "SELECT" as const,
      question: "Family should play this role in your adult life:",
      order: 7,
      options: [
        { text: "You should cut all ties to prove your independence", correct: false },
        { text: "Maintain connection while establishing your independence", correct: true },
        { text: "Remain completely dependent on family for all decisions", correct: false }
      ]
    },
    {
      type: "SELECT" as const,
      question: "When facing peer pressure and social expectations:",
      order: 8,
      options: [
        { text: "Always conform to fit in with the group", correct: false },
        { text: "Stay true to your values while respecting others' choices", correct: true },
        { text: "Rebel against everything to appear independent", correct: false }
      ]
    },
    {
      type: "SELECT" as const,
      question: "Emotional intelligence in relationships involves:",
      order: 9,
      options: [
        { text: "Understanding and managing both your emotions and others'", correct: true },
        { text: "Suppressing all emotional responses to appear rational", correct: false },
        { text: "Using emotional manipulation to get what you want", correct: false }
      ]
    },
    {
      type: "SELECT" as const,
      question: "True intimacy is built through:",
      order: 10,
      options: [
        { text: "Vulnerability, trust, and genuine emotional connection", correct: true },
        { text: "Shared activities and spending lots of time together", correct: false },
        { text: "Physical attraction and romantic gestures", correct: false }
      ]
    }
  ]
};

// Additional advanced content for deeper exploration
export const ADDITIONAL_CONTENT = {
  "Leadership & Purpose": [
    {
      type: "SELECT" as const,
      question: "A true leader is someone who:",
      order: 1,
      options: [
        { text: "Commands others through authority and position", correct: false },
        { text: "Serves others and leads by authentic example", correct: true },
        { text: "Is the most popular or naturally charismatic person", correct: false }
      ]
    },
    {
      type: "SELECT" as const,
      question: "You discover your life's purpose by:",
      order: 2,
      options: [
        { text: "Copying what other successful people are doing", correct: false },
        { text: "Waiting for a dramatic revelation or divine sign", correct: false },
        { text: "Exploring your values, passions, and how you can serve others", correct: true }
      ]
    },
    {
      type: "SELECT" as const,
      question: "Young men become leaders when they:",
      order: 3,
      options: [
        { text: "Take responsibility for improving their communities", correct: true },
        { text: "Achieve high status and recognition from others", correct: false },
        { text: "Dominate others through strength and influence", correct: false }
      ]
    },
    {
      type: "SELECT" as const,
      question: "Your legacy will be determined by:",
      order: 4,
      options: [
        { text: "The wealth and achievements you accumulate", correct: false },
        { text: "How you impacted and influenced others positively", correct: true },
        { text: "The recognition and fame you receive", correct: false }
      ]
    }
  ],

  "Financial Wisdom": [
    {
      type: "SELECT" as const,
      question: "The difference between being rich and being wealthy is:",
      order: 1,
      options: [
        { text: "They're essentially the same concept", correct: false },
        { text: "Wealth is about financial freedom and security, not just income", correct: true },
        { text: "Rich people simply have more expensive possessions", correct: false }
      ]
    },
    {
      type: "SELECT" as const,
      question: "You should start thinking about your financial future:",
      order: 2,
      options: [
        { text: "As soon as you start earning any income at all", correct: true },
        { text: "Only after you're making substantial money", correct: false },
        { text: "When you're approaching retirement age", correct: false }
      ]
    },
    {
      type: "SELECT" as const,
      question: "The most dangerous financial mistake young men make is:",
      order: 3,
      options: [
        { text: "Not investing in appreciating assets early", correct: false },
        { text: "Lifestyle inflation and trying to impress others", correct: true },
        { text: "Being too conservative with money and investments", correct: false }
      ]
    },
    {
      type: "SELECT" as const,
      question: "Financial independence means:",
      order: 4,
      options: [
        { text: "Having enough passive income to cover your chosen lifestyle", correct: true },
        { text: "Making more money than everyone in your peer group", correct: false },
        { text: "Never having to work or be productive again", correct: false }
      ]
    }
  ],

  "Resilience & Character": [
    {
      type: "SELECT" as const,
      question: "True resilience is built through:",
      order: 1,
      options: [
        { text: "Avoiding all difficult and challenging situations", correct: false },
        { text: "Facing challenges and learning from both successes and failures", correct: true },
        { text: "Pretending that problems and setbacks don't affect you", correct: false }
      ]
    },
    {
      type: "SELECT" as const,
      question: "Unshakeable character is developed by:",
      order: 2,
      options: [
        { text: "Always doing what others expect of you", correct: false },
        { text: "Making choices based on your values, especially when no one is watching", correct: true },
        { text: "Focusing primarily on your image and reputation", correct: false }
      ]
    },
    {
      type: "SELECT" as const,
      question: "When facing your darkest moments, you should:",
      order: 3,
      options: [
        { text: "Remember that this too shall pass and growth comes from struggle", correct: true },
        { text: "Isolate yourself until you can handle it alone", correct: false },
        { text: "Distract yourself with pleasure and entertainment", correct: false }
      ]
    },
    {
      type: "SELECT" as const,
      question: "Courage is not the absence of fear, but:",
      order: 4,
      options: [
        { text: "Acting in spite of fear when it matters", correct: true },
        { text: "Never feeling afraid in dangerous situations", correct: false },
        { text: "Hiding your fear so others don't see weakness", correct: false }
      ]
    }
  ],

  "Masculine Identity": [
    {
      type: "SELECT" as const,
      question: "Healthy masculinity is characterized by:",
      order: 1,
      options: [
        { text: "Strength balanced with compassion and emotional intelligence", correct: true },
        { text: "Dominance, aggression, and emotional suppression", correct: false },
        { text: "Competition, conquest, and material success", correct: false }
      ]
    },
    {
      type: "SELECT" as const,
      question: "A man's role in modern society should be:",
      order: 2,
      options: [
        { text: "Provider, protector, and positive role model", correct: true },
        { text: "Competitor who wins at all costs", correct: false },
        { text: "Whatever society tells him it should be", correct: false }
      ]
    },
    {
      type: "SELECT" as const,
      question: "Toxic masculinity harms men by:",
      order: 3,
      options: [
        { text: "Preventing emotional expression and authentic connection", correct: true },
        { text: "Making them too sensitive and weak", correct: false },
        { text: "It doesn't actually harm men at all", correct: false }
      ]
    },
    {
      type: "SELECT" as const,
      question: "The modern man's greatest challenge is:",
      order: 4,
      options: [
        { text: "Economic uncertainty and job market competition", correct: false },
        { text: "Finding authentic identity amidst conflicting messages", correct: true },
        { text: "Meeting society's expectations for material success", correct: false }
      ]
    }
  ]
};