import { useEffect, useState } from 'react'
import { FollowButton } from '../components/FollowButton'
import { MatchCard } from '../components/MatchCard'

interface FeedItem {
  id: string
  kind: string
  reason: string
  score: number
  match?: {
    id: string
    homeTeam: { name: string; shortName: string; badge: string }
    awayTeam: { name: string; shortName: string; badge: string }
    competition: string
    venue: string
    kickoff: string
    status: 'live' | 'scheduled' | 'finished'
    minute?: number
    score: { home: number; away: number }
  }
}

export function PersonalizedHomePage() {
  const [feed, setFeed] = useState<FeedItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000/api'}/feed/personalized/demo-user`)
      .then((response) => response.json())
      .then((json) => {
        setFeed(json.data ?? [])
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-slate-800 bg-slate-900/70 p-8 text-slate-300">
          <p className="text-sm uppercase tracking-[0.25em] text-emerald-400">For you</p>
          <p className="mt-4 text-xl font-semibold text-white">Loading your personalized feed...</p>
        </div>
      </main>
    )
  }

  if (feed.length === 0) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-dashed border-slate-700 bg-slate-900/70 p-8 text-center shadow-2xl shadow-slate-950/20 sm:p-12">
          <p className="text-xs uppercase tracking-[0.24em] text-emerald-400">For you</p>
          <h1 className="mt-4 text-3xl font-black text-white">Your personalized feed is empty</h1>
          <p className="mt-3 text-slate-300">
            Follow teams, players, or leagues to see the most relevant football content rise to the top.
          </p>
          <div className="mt-8 flex justify-center">
            <FollowButton userId="demo-user" entityType="team" entityId="team-real-madrid" entityName="Real Madrid" />
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <header className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-emerald-400">For you</p>
          <h1 className="mt-2 text-3xl font-black text-white">Personalized home</h1>
        </div>
        <div className="rounded-full border border-slate-800 bg-slate-900/70 px-3 py-2 text-sm text-slate-300">
          {feed.length} prioritized updates
        </div>
      </header>

      <div className="space-y-4">
        {feed.map((item) => (
          <div key={item.id} className="rounded-[28px] border border-slate-800 bg-slate-900/75 p-4 shadow-lg shadow-slate-950/20">
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
                {item.kind}
              </span>
              <span className="text-xs text-slate-400">{item.reason}</span>
            </div>
            {item.match && <MatchCard match={item.match as never} />}
          </div>
        ))}
      </div>
    </main>
  )
}
