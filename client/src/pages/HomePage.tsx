import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MatchCard } from '../components/MatchCard'
import { LeaderboardCard } from '../components/LeaderboardCard'
import { LeagueTableCard } from '../components/LeagueTableCard'
import { ScoreTicker } from '../components/ScoreTicker'
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
      <header className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.28em] text-emerald-400">GoalSphere</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">
            Football intelligence, built for fans.
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/personalized"
            className="rounded-full bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
          >
            My feed
          </Link>
          <Link
            to="/live"
            className="rounded-full border border-slate-700 bg-slate-900/80 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-slate-500 hover:text-white"
          >
            Live updates
          </Link>
        </div>
      </header>

      <div className="mb-8 grid gap-3 sm:grid-cols-3">
        {[
          { label: 'Live matches', value: '12', accent: 'text-emerald-400' },
          { label: 'Top leagues', value: '8', accent: 'text-sky-400' },
          { label: 'Followed clubs', value: '24', accent: 'text-violet-400' },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <p className="text-xs uppercase tracking-[0.22em] text-slate-400">{stat.label}</p>
            <p className={`mt-3 text-3xl font-black ${stat.accent}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {featuredMatch && (
        <section className="mb-8 grid gap-4 lg:grid-cols-[1.55fr_0.95fr]">
          <Link
            to={`/matches/${featuredMatch.id}`}
            className="block overflow-hidden rounded-[28px] border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/70 p-5 shadow-[0_30px_80px_rgba(2,6,23,0.6)] transition hover:border-emerald-500/50"
          >
            <div className="mb-5 flex items-center justify-between text-[11px] uppercase tracking-[0.24em] text-emerald-300">
              <span>Featured match</span>
              <span>{featuredMatch.status}</span>
            </div>

            <div className="mb-5 flex items-center justify-between gap-4 rounded-2xl border border-slate-700 bg-slate-950/50 p-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-xs font-black text-white">{featuredMatch.homeTeam.badge}</div>
                <span className="text-sm font-semibold text-white">{featuredMatch.homeTeam.shortName}</span>
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">{featuredMatch.minute ? `Min ${featuredMatch.minute}` : 'Scheduled'}</span>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-white">{featuredMatch.awayTeam.shortName}</span>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-xs font-black text-white">{featuredMatch.awayTeam.badge}</div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-800 text-sm font-black text-white ring-1 ring-slate-700">
                  {featuredMatch.homeTeam.badge}
                </div>
                <div>
                  <p className="text-xl font-black text-white">{featuredMatch.homeTeam.name}</p>
                  <p className="text-sm text-slate-400">{featuredMatch.homeTeam.shortName}</p>
                </div>
              </div>

              <div className="w-full max-w-xs">
                <ScoreTicker
                  home={featuredMatch.score.home}
                  away={featuredMatch.score.away}
                  homeLabel={featuredMatch.homeTeam.shortName}
                  awayLabel={featuredMatch.awayTeam.shortName}
                  live={featuredMatch.status === 'live'}
                />
              </div>

              <div className="flex items-center gap-4 md:flex-row-reverse">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-800 text-sm font-black text-white ring-1 ring-slate-700">
                  {featuredMatch.awayTeam.badge}
                </div>
                <div className="md:text-right">
                  <p className="text-xl font-black text-white">{featuredMatch.awayTeam.name}</p>
                  <p className="text-sm text-slate-400">{featuredMatch.awayTeam.shortName}</p>
                </div>
              </div>
            </div>
          </Link>

          <aside className="rounded-[28px] border border-slate-800 bg-slate-900/80 p-5">
            <h2 className="mb-4 text-lg font-bold text-white">Trending</h2>
            <div className="space-y-3 text-sm text-slate-300">
              {[
                'Real Madrid pushing late in the title race.',
                'Liverpool and Arsenal set for a key showdown.',
                'Champions League group picture tightening up.',
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-slate-800 bg-slate-950/65 p-3 transition hover:border-emerald-500/40">
                  {item}
                </div>
              ))}
            </div>
          </aside>
        </section>
      )}

      <section className="mb-8 grid gap-4 lg:grid-cols-2">
        <LeagueTableCard />
        <LeaderboardCard />
      </section>

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
