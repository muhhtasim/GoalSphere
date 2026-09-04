import { Link } from 'react-router-dom'
import type { Match } from '../types'

interface MatchCardProps {
  match: Match
}

export function MatchCard({ match }: MatchCardProps) {
  return (
    <Link to={`/matches/${match.id}`} className="block">
      <article className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-lg shadow-slate-950/20 transition hover:border-emerald-500/60 hover:bg-slate-900">
        <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-slate-400">
          <span>{match.competition}</span>
          <span>{match.status}</span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-xs font-semibold text-slate-100">
              {match.homeTeam.badge}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{match.homeTeam.shortName}</p>
              <p className="text-xs text-slate-400">{match.homeTeam.name}</p>
            </div>
          </div>

          <div className="text-center text-2xl font-black text-white">
            {match.score.home} - {match.score.away}
          </div>

          <div className="flex min-w-0 items-center gap-3 text-right">
            <div>
              <p className="text-sm font-semibold text-white">{match.awayTeam.shortName}</p>
              <p className="text-xs text-slate-400">{match.awayTeam.name}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-xs font-semibold text-slate-100">
              {match.awayTeam.badge}
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
          <span>{match.minute ? `Minute ${match.minute}` : 'Kickoff scheduled'}</span>
          <span>{match.venue}</span>
        </div>
      </article>
    </Link>
  )
}
