import { useEffect, useState } from 'react'
import { MatchCard } from '../components/MatchCard'
import { fetchMatches } from '../services/footballService'
import type { Match } from '../types'

export function FixturesPage() {
  const [matches, setMatches] = useState<Match[]>([])

  useEffect(() => {
    fetchMatches().then((items) => setMatches(items.filter((match) => match.status === 'scheduled')))
  }, [])

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <header className="mb-6">
        <p className="text-xs uppercase tracking-[0.28em] text-emerald-400">Fixtures</p>
        <h1 className="mt-2 text-3xl font-black text-white">Upcoming fixtures</h1>
      </header>

      <div className="space-y-4">
        {matches.length === 0 ? (
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 text-slate-300">
            No upcoming fixtures.
          </div>
        ) : (
          matches.map((match) => <MatchCard key={match.id} match={match} />)
        )}
      </div>
    </main>
  )
}
