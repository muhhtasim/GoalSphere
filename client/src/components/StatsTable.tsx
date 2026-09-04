import type { Match } from '../types'

interface StatsTableProps {
  match: Match
}

export function StatsTable({ match }: StatsTableProps) {
  return (
    <div className="rounded-[28px] border border-slate-800 bg-slate-900 p-4 shadow-[0_20px_60px_rgba(2,6,23,0.2)]">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-bold text-white">Statistics</h3>
        <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Live data</span>
      </div>

      <div className="space-y-4">
        {match.stats.map((stat) => {
          const total = Math.max(stat.home + stat.away, 1)
          const homeWidth = (stat.home / total) * 100
          const awayWidth = (stat.away / total) * 100

          return (
            <div key={stat.label} className="rounded-2xl border border-slate-800 bg-slate-950/55 p-3">
              <div className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-slate-400">
                <span>{stat.label}</span>
                <span>{stat.home} - {stat.away}</span>
              </div>

              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-sm text-slate-200">
                <span className="text-right font-semibold text-white">{stat.home}</span>
                <div className="relative h-2.5 w-36 overflow-hidden rounded-full bg-slate-800">
                  <div className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-300" style={{ width: `${homeWidth}%` }} />
                  <div className="absolute inset-y-0 right-0 rounded-full bg-gradient-to-r from-sky-500 to-sky-300" style={{ width: `${awayWidth}%` }} />
                </div>
                <span className="font-semibold text-white">{stat.away}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
