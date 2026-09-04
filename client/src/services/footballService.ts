import { matches } from '../mockData'
import type { Match } from '../types'

export async function fetchMatches(): Promise<Match[]> {
  return matches
}

export async function fetchMatchById(id: string): Promise<Match | undefined> {
  return matches.find((match) => match.id === id)
}
