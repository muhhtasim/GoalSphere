import type { Match } from './types'

export const teams = {
  realMadrid: {
    id: 'real-madrid',
    name: 'Real Madrid',
    shortName: 'RMA',
    badge: 'RM',
    accent: '#f4d35e',
  },
  barcelona: {
    id: 'barcelona',
    name: 'Barcelona',
    shortName: 'BAR',
    badge: 'FCB',
    accent: '#a70042',
  },
  liverpool: {
    id: 'liverpool',
    name: 'Liverpool',
    shortName: 'LIV',
    badge: 'LIV',
    accent: '#d90429',
  },
  arsenal: {
    id: 'arsenal',
    name: 'Arsenal',
    shortName: 'ARS',
    badge: 'ARS',
    accent: '#c8a87d',
  },
}

export const matches: Match[] = [
  {
    id: 'real-madrid-vs-barcelona',
    homeTeam: teams.realMadrid,
    awayTeam: teams.barcelona,
    competition: 'UEFA Champions League',
    venue: 'Santiago Bernabéu',
    kickoff: '2026-09-04T18:30:00.000Z',
    status: 'live',
    minute: 63,
    score: { home: 2, away: 1 },
    referee: 'Szymon Marciniak',
    commentary: [
      { id: 'c1', minute: 12, teamId: 'real-madrid', text: 'Early pressure from Real Madrid in midfield.', type: 'normal' },
      { id: 'c2', minute: 31, teamId: 'real-madrid', text: 'Goal! Real Madrid take the lead.', type: 'goal' },
      { id: 'c3', minute: 58, teamId: 'barcelona', text: 'Barcelona earn a booking after a tactical foul.', type: 'card' },
    ],
    stats: [
      { label: 'Possession', home: 58, away: 42 },
      { label: 'Shots', home: 11, away: 7 },
      { label: 'Shots on target', home: 5, away: 3 },
      { label: 'Pass accuracy', home: 86, away: 80 },
    ],
    lineups: [
      {
        teamId: 'real-madrid',
        formation: '4-3-3',
        coach: 'Carlo Ancelotti',
        players: [
          { id: 'p1', name: 'Courtois', position: 'GK', number: 1, isStarter: true },
          { id: 'p2', name: 'Carvajal', position: 'RB', number: 2, isStarter: true },
          { id: 'p3', name: 'Militao', position: 'CB', number: 3, isStarter: true },
          { id: 'p4', name: 'Ramos', position: 'CB', number: 4, isStarter: true },
          { id: 'p5', name: 'Mendy', position: 'LB', number: 23, isStarter: true },
        ],
      },
      {
        teamId: 'barcelona',
        formation: '4-2-3-1',
        coach: 'Xavi',
        players: [
          { id: 'p6', name: 'ter Stegen', position: 'GK', number: 1, isStarter: true },
          { id: 'p7', name: 'Koundé', position: 'RB', number: 23, isStarter: true },
          { id: 'p8', name: 'Araujo', position: 'CB', number: 4, isStarter: true },
          { id: 'p9', name: 'Cubarsí', position: 'CB', number: 5, isStarter: true },
          { id: 'p10', name: 'Balde', position: 'LB', number: 3, isStarter: true },
        ],
      },
    ],
    h2h: { homeWins: 8, awayWins: 6, draws: 2, lastMeeting: '2026-08-28T20:00:00.000Z' },
  },
  {
    id: 'liverpool-vs-arsenal',
    homeTeam: teams.liverpool,
    awayTeam: teams.arsenal,
    competition: 'Premier League',
    venue: 'Anfield',
    kickoff: '2026-09-05T17:30:00.000Z',
    status: 'scheduled',
    score: { home: 0, away: 0 },
    commentary: [
      { id: 'l1', minute: 0, teamId: 'liverpool', text: 'Kickoff approaching at Anfield.', type: 'normal' },
    ],
    stats: [
      { label: 'Possession', home: 0, away: 0 },
      { label: 'Shots', home: 0, away: 0 },
      { label: 'Corners', home: 0, away: 0 },
      { label: 'Fouls', home: 0, away: 0 },
    ],
    lineups: [
      { teamId: 'liverpool', formation: '4-3-3', coach: 'Arne Slot', players: [] },
      { teamId: 'arsenal', formation: '4-2-3-1', coach: 'Mikel Arteta', players: [] },
    ],
    h2h: { homeWins: 5, awayWins: 4, draws: 3, lastMeeting: '2026-08-15T20:00:00.000Z' },
  },
  {
    id: 'barcelona-vs-arsenal-result',
    homeTeam: teams.barcelona,
    awayTeam: teams.arsenal,
    competition: 'UEFA Champions League',
    venue: 'Camp Nou',
    kickoff: '2026-09-01T20:00:00.000Z',
    status: 'finished',
    score: { home: 3, away: 1 },
    commentary: [
      { id: 'r1', minute: 18, teamId: 'barcelona', text: 'Barcelona strike first through a swift transition.', type: 'goal' },
      { id: 'r2', minute: 54, teamId: 'arsenal', text: 'Arsenal respond after a clever through-ball.', type: 'goal' },
      { id: 'r3', minute: 72, teamId: 'barcelona', text: 'Barcelona seal the result with a late burst.', type: 'goal' },
    ],
    stats: [
      { label: 'Possession', home: 54, away: 46 },
      { label: 'Shots', home: 13, away: 9 },
      { label: 'Shots on target', home: 7, away: 4 },
      { label: 'Pass accuracy', home: 88, away: 82 },
    ],
    lineups: [
      { teamId: 'barcelona', formation: '4-3-3', coach: 'Xavi', players: [] },
      { teamId: 'arsenal', formation: '4-2-3-1', coach: 'Mikel Arteta', players: [] },
    ],
    h2h: { homeWins: 2, awayWins: 1, draws: 1, lastMeeting: '2026-09-01T20:00:00.000Z' },
  },
]
