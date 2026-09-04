import type { Match } from '../types'

interface HeadToHeadCardProps {
  match: Match
}

export function HeadToHeadCard({ match }: HeadToHeadCardProps) {
  return (
    <div className="rounded-[28px] border border-slate-800 bg-slate-900 p-4 shadow-[0_20px_60px_rgba(2,6,23,0.2)]">
      <h3 className="mb-4 text-lg font-bold text-white">Head-to-head</h3>
      <div className="grid gap-3 text-sm text-slate-200 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Home wins</p>
          <p className="mt-2 text-2xl font-black text-white">{match.h2h.homeWins}</p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Draws</p>
          <p className="mt-2 text-2xl font-black text-white">{match.h2h.draws}</p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Away wins</p>
          <p className="mt-2 text-2xl font-black text-white">{match.h2h.awayWins}</p>
        </div>
      </div>
      <p className="mt-4 text-sm text-slate-400">Last meeting: {new Date(match.h2h.lastMeeting).toLocaleDateString()}</p>
    </div>
  )
}
