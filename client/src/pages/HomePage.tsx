import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MatchCard } from '../components/MatchCard'
import { fetchMatches } from '../services/footballService'
import type { Match } from '../types'

export function HomePage() {
  const [matches, setMatches] = useState<Match[]>([])

  useEffect(() => {
    fetchMatches().then(setMatches)
  }, [])

  const featuredMatch = matches[0]

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <header className="mb-8 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-emerald-400">GoalSphere</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">
            Football intelligence, built for fans.
          </h1>
        </div>
        <Link
          to="/live"
          className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-slate-500 hover:text-white"
        >
          Live updates
        </Link>
      </header>

      {featuredMatch && (
        <section className="mb-8 grid gap-4 lg:grid-cols-[1.5fr_0.9fr]">
          <Link to={`/matches/${featuredMatch.id}`} className="block rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/60 p-5 shadow-2xl shadow-slate-950/30">
            <div className="mb-4 flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-emerald-300">
              <span>Featured match</span>
              <span>{featuredMatch.status}</span>
            </div>

            <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-800 text-sm font-black text-white">
                  {featuredMatch.homeTeam.badge}
                </div>
                <div>
                  <p className="text-xl font-black text-white">{featuredMatch.homeTeam.name}</p>
                  <p className="text-sm text-slate-400">{featuredMatch.homeTeam.shortName}</p>
                </div>
              </div>

              <div className="text-center">
                <div className="text-4xl font-black text-white">
                  {featuredMatch.score.home} - {featuredMatch.score.away}
                </div>
                <p className="mt-2 text-sm text-slate-400">
                  {featuredMatch.minute ? `Minute ${featuredMatch.minute}` : 'Kickoff scheduled'} · {featuredMatch.venue}
                </p>
              </div>

              <div className="flex items-center gap-4 md:flex-row-reverse">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-800 text-sm font-black text-white">
                  {featuredMatch.awayTeam.badge}
                </div>
                <div className="md:text-right">
                  <p className="text-xl font-black text-white">{featuredMatch.awayTeam.name}</p>
                  <p className="text-sm text-slate-400">{featuredMatch.awayTeam.shortName}</p>
                </div>
              </div>
            </div>
          </Link>

          <aside className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
            <h2 className="mb-3 text-lg font-bold text-white">Trending</h2>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="rounded-2xl bg-slate-950/70 p-3">Real Madrid pushing late in the title race.</div>
              <div className="rounded-2xl bg-slate-950/70 p-3">Liverpool and Arsenal set for a key showdown.</div>
              <div className="rounded-2xl bg-slate-950/70 p-3">Champions League group picture tightening up.</div>
            </div>
          </aside>
        </section>
      )}

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Live & upcoming</h2>
          <span className="text-sm text-slate-400">{matches.length} matches</span>
        </div>

        <div className="space-y-4">
          {matches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </section>
    </main>
  )
}
