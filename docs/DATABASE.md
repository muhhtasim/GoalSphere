# GoalSphere Database Design

## Core collections
- User
- Team
- Player
- League
- Fixture
- Match
- MatchEvent
- Lineup
- MatchStatistic
- Standing
- NewsArticle
- Follow
- Notification
- UserPreference

## Design goals
- external provider IDs for synchronization
- strong indexing on lookup-heavy queries
- normalized entity relationships
- support for personalization and feed ranking

## Phase 1 status
The database layer is scaffolded for future model implementation.
