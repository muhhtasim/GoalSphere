import type { Match } from '../types'

interface MatchHeaderProps {
  match: Match
}

export function MatchHeader({ match }: MatchHeaderProps) {
  return (
    <section className="rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/60 p-6 shadow-2xl shadow-slate-950/30">
      <div className="mb-4 flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-emerald-300">
        <span>{match.competition}</span>
        <span>{match.status}</span>
      </div>

      <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-800 text-lg font-black text-white">
            {match.homeTeam.badge}
          </div>
          <div>
            <p className="text-2xl font-black text-white">{match.homeTeam.name}</p>
            <p className="text-sm text-slate-400">{match.homeTeam.shortName}</p>
          </div>
        </div>

        <div className="text-center">
          <div className="text-5xl font-black text-white">
            {match.score.home} - {match.score.away}
          </div>
          <p className="mt-2 text-sm text-slate-400">
            {match.minute ? `Minute ${match.minute}` : 'Kick-off scheduled'} · {match.venue}
          </p>
        </div>

        <div className="flex items-center gap-4 md:flex-row-reverse">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-800 text-lg font-black text-white">
            {match.awayTeam.badge}
          </div>
          <div className="md:text-right">
            <p className="text-2xl font-black text-white">{match.awayTeam.name}</p>
            <p className="text-sm text-slate-400">{match.awayTeam.shortName}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
