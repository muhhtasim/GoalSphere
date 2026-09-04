import { useEffect, useState } from 'react'
import { MatchCard } from '../components/MatchCard'
import { connectLiveSocket, socket } from '../services/socket'
import type { Match } from '../types'

async function fetchLiveMatches(): Promise<Match[]> {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000/api'}/matches/live`)
  const json = await response.json()
  return (json.data ?? []) as Match[]
}

export function LivePage() {
  const [matches, setMatches] = useState<Match[]>([])

  useEffect(() => {
    connectLiveSocket()

    fetchLiveMatches().then((items) => setMatches(items))

    const handleLiveUpdate = (payload: { matches?: Match[]; changes?: Array<{ message: string }> }) => {
      if (payload.matches) {
        setMatches(payload.matches)
      }

      if (payload.changes?.length) {
        const latest = payload.changes[payload.changes.length - 1]
        if (latest?.message) {
          console.info('Live match update:', latest.message)
        }
      }
    }

    socket.on('live:matches', handleLiveUpdate)

    return () => {
      socket.off('live:matches', handleLiveUpdate)
    }
  }, [])

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <header className="mb-6 flex items-end justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-emerald-400">Live</p>
          <h1 className="mt-2 text-3xl font-black text-white">Live matches</h1>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-rose-300">
          <span className="h-2 w-2 rounded-full bg-rose-400" />
          {matches.length} live
        </div>
      </header>

      <div className="space-y-4">
        {matches.length === 0 ? (
          <div className="rounded-[28px] border border-dashed border-slate-700 bg-slate-900/70 p-8 text-center text-slate-300">
            <p className="text-xl font-semibold text-white">No live matches right now.</p>
            <p className="mt-2 text-sm text-slate-400">Check back shortly for the next set of fixtures and breaking updates.</p>
          </div>
        ) : (
          matches.map((match) => <MatchCard key={match.id} match={match} />)
        )}
      </div>
    </main>
  )
}
