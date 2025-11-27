# Trauma Tracker - API Backend

NestJS-based REST API for the Trauma Tracker mobile application.

## Tech Stack
- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- Passport.js (JWT + OAuth)

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 15+

### Installation
\`\`\`bash
npm install
npm run dev
\`\`\`

### Database Setup
\`\`\`bash
# Create database
createdb trauma_tracker

# Run migrations
npx prisma migrate dev

# Seed database
Running npm run start:dev will automatically seed the database if it needs it

## Environment Variables
See `.env.example` for required variables.

## License
TBD
