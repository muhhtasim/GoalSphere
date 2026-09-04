import { ScoreTicker } from './ScoreTicker'
import type { Match } from '../types'

interface MatchHeaderProps {
  match: Match
}

export function MatchHeader({ match }: MatchHeaderProps) {
  const isLive = match.status === 'live'

  return (
    <section className="overflow-hidden rounded-[32px] border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-950 to-emerald-950/70 p-5 shadow-[0_35px_90px_rgba(2,6,23,0.55)]">
      <div className="mb-5 flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-emerald-300">
        <span>{match.competition}</span>
        <span className={`rounded-full border px-2 py-1 ${isLive ? 'border-rose-500/40 bg-rose-500/10 text-rose-300' : 'border-slate-600 bg-slate-950/70 text-slate-200'}`}>
          {match.status}
        </span>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.8fr_1.1fr] lg:items-center">
        <div className="flex items-center gap-4 lg:justify-start">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-800 text-lg font-black text-white ring-1 ring-slate-700">
            {match.homeTeam.badge}
          </div>
          <div>
            <p className="text-2xl font-black text-white">{match.homeTeam.name}</p>
            <p className="text-sm text-slate-400">{match.homeTeam.shortName}</p>
          </div>
        </div>

        <div className="lg:justify-self-center">
          <ScoreTicker
            home={match.score.home}
            away={match.score.away}
            homeLabel={match.homeTeam.shortName}
            awayLabel={match.awayTeam.shortName}
            live={isLive}
          />
        </div>

        <div className="flex items-center gap-4 lg:justify-end">
          <div className="text-right">
            <p className="text-2xl font-black text-white">{match.awayTeam.name}</p>
            <p className="text-sm text-slate-400">{match.awayTeam.shortName}</p>
          </div>
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-800 text-lg font-black text-white ring-1 ring-slate-700">
            {match.awayTeam.badge}
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 pt-4 text-sm text-slate-300">
        <span>{match.minute ? `Minute ${match.minute}` : 'Kick-off scheduled'}</span>
        <span>{match.venue}</span>
        <span>{match.referee ?? 'Referee assigned'}</span>
      </div>
    </section>
  )
}
