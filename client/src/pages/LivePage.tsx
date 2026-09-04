import { useEffect, useState } from 'react'
import { MatchCard } from '../components/MatchCard'
import { fetchMatches } from '../services/footballService'
import type { Match } from '../types'

export function LivePage() {
  const [matches, setMatches] = useState<Match[]>([])

  useEffect(() => {
    fetchMatches().then((items) => setMatches(items.filter((match) => match.status === 'live')))
  }, [])

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <header className="mb-6">
        <p className="text-xs uppercase tracking-[0.28em] text-emerald-400">Live</p>
        <h1 className="mt-2 text-3xl font-black text-white">Live matches</h1>
      </header>

      <div className="space-y-4">
        {matches.length === 0 ? (
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 text-slate-300">
            No live matches right now.
          </div>
        ) : (
          matches.map((match) => <MatchCard key={match.id} match={match} />)
        )}
      </div>
    </main>
  )
}
