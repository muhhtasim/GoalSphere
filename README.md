# GoalSphere

GoalSphere is a production-ready football intelligence platform focused on live scores, match intelligence, personalized follow-based feeds, and premium football UX.

## Stack
- Frontend: React + Vite + TypeScript + Tailwind
- Backend: Node.js + Express + TypeScript
- Database: MongoDB + Mongoose
- Auth: JWT + bcrypt
- Real-time: Socket.IO

## Project structure
- client/ — Vite React frontend
- server/ — Express API backend
- docs/ — architecture, API, database, deployment docs
- .env.example — environment configuration template

## Phase 1 status
- Frontend scaffold created
- Backend scaffold created
- Environment configuration added
- MongoDB placeholder configuration included
- Health endpoint wired up
- TypeScript and production build checks passing

## Run locally

Frontend:
```bash
cd client
npm install
npm run dev
```

Backend:
```bash
cd server
npm install
npm run dev
```

## Environment
Copy `.env.example` to `.env` and fill in the required secrets before enabling real services.
