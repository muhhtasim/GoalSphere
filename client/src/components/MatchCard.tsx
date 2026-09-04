import { Link } from 'react-router-dom'
import type { Match } from '../types'

interface MatchCardProps {
  match: Match
}

export function MatchCard({ match }: MatchCardProps) {
  const live = match.status === 'live'

  return (
    <Link to={`/matches/${match.id}`} className="block group">
      <article className="rounded-[26px] border border-slate-800 bg-slate-900/75 p-4 shadow-[0_24px_80px_rgba(2,6,23,0.35)] transition duration-200 hover:-translate-y-0.5 hover:border-emerald-500/60 hover:bg-slate-900/90">
        <div className="mb-3 flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-slate-400">
          <span>{match.competition}</span>
          <span
            className={`rounded-full border px-2 py-1 text-[10px] ${
              live
                ? 'border-rose-500/40 bg-rose-500/10 text-rose-300'
                : 'border-slate-700 bg-slate-950/70 text-emerald-300'
            }`}
          >
            {match.status}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-slate-700 to-slate-800 text-xs font-bold text-slate-100 ring-1 ring-slate-600">
              {match.homeTeam.badge}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{match.homeTeam.shortName}</p>
              <p className="text-xs text-slate-400">{match.homeTeam.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-center text-2xl font-black text-white">
            <span className="min-w-[1.2rem] text-right transition-transform duration-200 group-hover:scale-105">
              {match.score.home}
            </span>
            <span className="text-base text-slate-500">:</span>
            <span className="min-w-[1.2rem] text-left transition-transform duration-200 group-hover:scale-105">
              {match.score.away}
            </span>
          </div>

          <div className="flex min-w-0 items-center gap-3 text-right">
            <div>
              <p className="text-sm font-semibold text-white">{match.awayTeam.shortName}</p>
              <p className="text-xs text-slate-400">{match.awayTeam.name}</p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-slate-700 to-slate-800 text-xs font-bold text-slate-100 ring-1 ring-slate-600">
              {match.awayTeam.badge}
            </div>
          </div>
        </div>

        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-800">
          <div
            className={`h-full rounded-full ${live ? 'bg-gradient-to-r from-rose-500 to-emerald-400' : 'bg-gradient-to-r from-emerald-500 to-sky-400'}`}
            style={{ width: `${Math.min(100, 50 + ((match.score.home + match.score.away) / 10) * 10)}%` }}
          />
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
          <span>{match.minute ? `Minute ${match.minute}` : 'Kickoff scheduled'}</span>
          <span className="truncate max-w-[45%] text-right">{match.venue}</span>
        </div>
      </article>
    </Link>
  )
}
