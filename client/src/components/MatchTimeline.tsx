import type { Match } from '../types'

interface MatchTimelineProps {
  match: Match
}

export function MatchTimeline({ match }: MatchTimelineProps) {
  return (
    <div className="space-y-4 rounded-[28px] border border-slate-800 bg-slate-900 p-4 shadow-[0_20px_60px_rgba(2,6,23,0.2)]">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-lg font-bold text-white">Commentary</h3>
        <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Key moments</span>
      </div>

      {match.commentary.map((entry) => (
        <div key={entry.id} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
          <div className="mb-2 flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-slate-400">
            <span>{entry.minute}'</span>
            <span className={entry.type === 'goal' ? 'text-emerald-300' : entry.type === 'card' ? 'text-amber-300' : 'text-sky-300'}>{entry.type}</span>
          </div>
          <p className="text-sm leading-6 text-slate-200">{entry.text}</p>
        </div>
      ))}
    </div>
  )
}
