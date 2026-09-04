import type { Match } from '../types'

interface MatchTimelineProps {
  match: Match
}

export function MatchTimeline({ match }: MatchTimelineProps) {
  return (
    <div className="space-y-4 rounded-3xl border border-slate-800 bg-slate-900 p-4">
      <h3 className="text-lg font-bold text-white">Commentary</h3>
      {match.commentary.map((entry) => (
        <div key={entry.id} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
          <div className="mb-2 flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-slate-400">
            <span>{entry.minute}'</span>
            <span>{entry.type}</span>
          </div>
          <p className="text-sm leading-6 text-slate-200">{entry.text}</p>
        </div>
      ))}
    </div>
  )
}
