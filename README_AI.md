# Sigmalingo - Interactive Male Mentoring Platform

## Project Overview
Sigmalingo is a modern, interactive male mentoring platform built with Next.js 14, featuring a comprehensive learning system with lessons, quizzes, progress tracking, and gamification elements focused on personal development and growth.

## Architecture Overview

### Core Technologies
- **Frontend Framework**: Next.js 14 (App Router)
- **Authentication**: Clerk
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: Zustand
- **Payment Processing**: Stripe
- **Deployment**: Vercel

### Project Structure
```bash
sigmalingo/
├── actions/ # Server actions for data mutations
├── app/ # Next.js app directory (App Router)
│ ├── (main)/ # Main application routes
│ ├── (marketing)/ # Marketing pages
│ ├── admin/ # Admin dashboard
│ ├── api/ # API routes
│ └── lesson/ # Lesson-related components
├── components/ # Reusable UI components
├── config/ # Configuration files
├── db/ # Database schema and queries
├── lib/ # Utility functions and shared logic
├── public/ # Static assets
├── scripts/ # Database and utility scripts
└── store/ # Zustand store definitions
```

## Course Structure and Learning Flow

### Hierarchical Organization
The mentoring content is organized in a hierarchical structure:
```bash
Course
└── Units (e.g., "Unit 1: Personal Development", "Unit 2: Leadership")
└── Lessons (e.g., "Lesson 1: Goal Setting", "Lesson 2: Time Management")
└── Challenges (e.g., "Complete the self-assessment", "Apply the technique")
```

### Database Schema Relationships
1. **Courses**
   - Top-level container for mentoring content
   - Contains metadata: title, image source
   - One-to-many relationship with Units
   - Tracks user progress and active course selection

2. **Units**
   - Logical grouping of related lessons
   - Contains: title, description, course reference, order
   - One-to-many relationship with Lessons
   - Ordered sequence within a course

3. **Lessons**
   - Individual learning segments
   - Contains: title, unit reference, order
   - One-to-many relationship with Challenges
   - Ordered sequence within a unit

4. **Challenges**
   - Interactive learning exercises
   - Types: "SELECT" and "ASSIST"
   - Contains: question, type, order
   - Includes challenge options (answers) with:
     - Text content
     - Correct/incorrect flag
     - Optional media (images, audio)

### Learning Flow
1. **Course Selection**
   - Users select a development course
   - System tracks active course in user progress
   - Maintains learning state per user

2. **Unit Progression**
   - Units are completed sequentially
   - Each unit contains multiple lessons
   - Progress is tracked at the unit level

3. **Lesson Structure**
   - Lessons contain multiple challenges
   - Challenges are completed in order
   - Progress is tracked per challenge
   - Users earn points and maintain hearts (lives)

4. **Challenge Types**
   - **SELECT**: Multiple choice questions
   - **ASSIST**: Guided learning exercises
   - Each challenge can have:
     - Text-based questions
     - Image-based questions
     - Audio-based questions
     - Multiple correct/incorrect options

### Progress Tracking
1. **User Progress**
   - Tracks active course
   - Maintains hearts (lives) system
   - Records points earned
   - Stores user profile information

2. **Challenge Progress**
   - Tracks completion status of individual challenges
   - Maintains user-specific progress
   - Enables resume functionality

### Gamification Elements
1. **Hearts System**
   - Users start with maximum hearts
   - Hearts are lost on incorrect answers
   - Hearts can be replenished through various means

2. **Points System**
   - Points earned for completing challenges
   - Points contribute to overall progress
   - Points can unlock additional features

### Data Flow
1. **Course Loading**
   ```
   Course → Units → Lessons → Challenges → Challenge Options
   ```

2. **Progress Saving**
   ```
   User Progress → Challenge Progress → Course Progress
   ```

### Implementation Details
1. **Database Relations**
   - Uses Drizzle ORM for type-safe database operations
   - Implements cascading deletes for data integrity
   - Maintains referential integrity between entities

2. **State Management**
   - Tracks current course, unit, and lesson
   - Manages user progress and statistics
   - Handles challenge completion states
   
3. **UI Components**
   - Course selection interface
   - Unit navigation
   - Lesson progress tracking
   - Challenge interaction components

### Key Features

1. **Learning System**
   - Interactive lessons with multiple challenge types
   - Progress tracking and achievements
   - Gamification elements (hearts, XP, levels)

2. **User Management**
   - Authentication via Clerk
   - User progress tracking
   - Subscription management

3. **Admin Dashboard**
   - Course management
   - Challenge creation and editing
   - User progress monitoring

4. **Payment Integration**
   - Stripe integration for subscriptions
   - Webhook handling for payment events

### Database Schema
The application uses PostgreSQL with Drizzle ORM, featuring tables for:
- Users and progress
- Courses and lessons
- Challenges and options
- Subscriptions and payments

### State Management
- Uses Zustand for global state management
- Implements modal states and user progress tracking
- Manages application-wide settings and preferences

### API Structure
- RESTful API endpoints under `/api`
- Server actions for data mutations
- Webhook handlers for external services

### Authentication Flow
1. User authentication handled by Clerk
2. Protected routes and API endpoints
3. Role-based access control for admin features

### Development Setup

1. **Prerequisites**
   - Node.js
   - PostgreSQL database
   - Clerk account
   - Stripe account

2. **Environment Variables**
   Required environment variables:
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=
   DATABASE_URL=
   STRIPE_API_SECRET_KEY=
   STRIPE_WEBHOOK_SECRET=
   NEXT_PUBLIC_APP_URL=
   CLERK_ADMIN_IDS=
   ```

3. **Installation**
   ```bash
   npm install
   npm run db:push
   npm run db:prod
   npm run dev
   ```

### Key Dependencies
- `@clerk/nextjs`: Authentication
- `drizzle-orm`: Database ORM
- `@radix-ui`: UI components
- `zustand`: State management
- `stripe`: Payment processing
- `tailwindcss`: Styling
- `next-themes`: Theme management

### Development Workflow
1. Database changes: Use Drizzle migrations
2. UI components: Follow shadcn/ui patterns
3. State management: Use Zustand stores
4. API routes: Follow RESTful conventions
5. Server actions: Place in `actions/` directory

### Testing and Deployment
- Development: `npm run dev`
- Production build: `npm run build`
- Start production: `npm run start`
- Database management: `npm run db:studio`

### Contributing
Please refer to CONTRIBUTING.md for detailed guidelines on:
- Code style and formatting
- Pull request process
- Development workflow
- Testing requirements

### Security
- Authentication via Clerk
- Secure API routes
- Environment variable protection
- Database security measures
- Payment security with Stripe

### Performance Considerations
- Server-side rendering with Next.js
- Optimized database queries
- Efficient state management
- Asset optimization
- Caching strategies

This README provides a comprehensive overview of the project's architecture and development workflow, making it easier for AI systems and developers to understand and work with the codebase.