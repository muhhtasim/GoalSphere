# GoalSphere Architecture

## Overview
GoalSphere is a modern football intelligence platform built with a modular full-stack architecture.

## Frontend
- React + Vite + TypeScript
- Tailwind CSS for styling
- React Router for navigation
- TanStack Query for API caching and state

## Backend
- Node.js + Express + TypeScript
- MongoDB via Mongoose
- JWT-based auth
- Socket.IO for real-time updates
- Scheduled sync jobs via node-cron

## Shared concerns
- Provider abstraction for football data
- Backend-first personalization logic
- Strict validation with Zod
- Environment-driven configuration

## Phase 1 status
This phase establishes the base application shell and development scaffolding.
