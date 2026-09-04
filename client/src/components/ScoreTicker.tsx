interface ScoreTickerProps {
  home: number
  away: number
  homeLabel: string
  awayLabel: string
  live?: boolean
}

export function ScoreTicker({ home, away, homeLabel, awayLabel, live = false }: ScoreTickerProps) {
  return (
    <div className="rounded-[28px] border border-slate-800 bg-slate-950/80 p-4 shadow-[0_24px_80px_rgba(15,23,42,0.5)]">
      <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-slate-400">
        <span>{homeLabel}</span>
        <span className={`${live ? 'text-rose-300' : 'text-emerald-300'}`}>
          {live ? 'live' : 'FT'}
        </span>
        <span>{awayLabel}</span>
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <div className="text-left">
          <div className="text-3xl font-black text-white">{home}</div>
        </div>

        <div className="text-center text-sm font-medium text-slate-400">-</div>

        <div className="text-right">
          <div className="text-3xl font-black text-white">{away}</div>
        </div>
      </div>

      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-800">
        <div
          className={`h-full rounded-full ${live ? 'bg-gradient-to-r from-rose-500 to-emerald-400' : 'bg-gradient-to-r from-emerald-500 to-sky-400'}`}
          style={{
            width: `${Math.min(100, (Math.max(home, away) / (home + away || 1)) * 100 || 50)}%`,
          }}
        />
      </div>
    </div>
  )
}
