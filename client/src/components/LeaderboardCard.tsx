const leaders = [
  { name: 'Kylian Mbappé', team: 'Real Madrid', value: '12 goals', accent: 'text-emerald-300' },
  { name: 'Robert Lewandowski', team: 'Barcelona', value: '11 goals', accent: 'text-sky-300' },
  { name: 'Mohamed Salah', team: 'Liverpool', value: '9 goals', accent: 'text-violet-300' },
  { name: 'Bukayo Saka', team: 'Arsenal', value: '8 goals', accent: 'text-amber-300' },
]

export function LeaderboardCard() {
  return (
    <section className="rounded-[28px] border border-slate-800 bg-slate-900/80 p-5 shadow-[0_30px_80px_rgba(2,6,23,0.45)]">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-violet-300">Top performers</p>
          <h3 className="mt-2 text-xl font-bold text-white">Golden boot race</h3>
        </div>
        <span className="rounded-full border border-slate-700 bg-slate-950/75 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-slate-300">
          2026
        </span>
      </div>

      <div className="space-y-3">
        {leaders.map((player, index) => (
          <div key={player.name} className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-slate-700 to-slate-800 text-xs font-bold text-white">
                {index + 1}
              </div>
              <div>
                <p className="font-semibold text-white">{player.name}</p>
                <p className="text-xs text-slate-400">{player.team}</p>
              </div>
            </div>
            <span className={`text-sm font-semibold ${player.accent}`}>{player.value}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
