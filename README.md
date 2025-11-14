# Trauma Tracker - API Backend

NestJS-based REST API for the Trauma Tracker mobile application.

## Tech Stack
- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- Passport.js (JWT + OAuth)
- Bull (Queue management)

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 15+
- Redis (for queues)

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
npm run seed
\`\`\`

## Project Structure
\`\`\`
/src
  /auth
  /users
  /events
  /tags
  /insights
  /reports
  /resources
  /notifications
  /storage
  /common
  /config
  /prisma
\`\`\`

## API Documentation
Once running, visit: http://localhost:3000/api/docs

## Environment Variables
See `.env.example` for required variables.

## License
TBD
