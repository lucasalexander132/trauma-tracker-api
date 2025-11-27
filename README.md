# Trauma Tracker - API Backend

NestJS-based REST API for the Trauma Tracker mobile application.

## Tech Stack
- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- Passport.js (JWT + OAuth)
- Docker

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 15+

### Installation
// I'm going to get back to this with a more in depth guide since configuring the DB for first go can be a pain

# Run migrations
npx prisma migrate dev

# Seed database
Running npm run start:dev will automatically seed the database if it needs it

## Environment Variables
See `.env.example` for required variables.

## License
TBD
