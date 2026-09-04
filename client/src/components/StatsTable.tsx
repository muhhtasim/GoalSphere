import type { Match } from '../types'

interface StatsTableProps {
  match: Match
}

export function StatsTable({ match }: StatsTableProps) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-4">
      <h3 className="mb-4 text-lg font-bold text-white">Statistics</h3>
      <div className="space-y-3">
        {match.stats.map((stat) => (
          <div key={stat.label}>
            <div className="mb-1 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-slate-400">
              <span>{stat.label}</span>
            </div>
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-sm text-slate-200">
              <span className="text-right">{stat.home}</span>
              <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-emerald-400"
                  style={{ width: `${(stat.home / Math.max(stat.home + stat.away, 1)) * 100}%` }}
                />
              </div>
              <span>{stat.away}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
