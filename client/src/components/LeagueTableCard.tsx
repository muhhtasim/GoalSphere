const standings = [
  { pos: 1, team: 'Real Madrid', played: 10, won: 8, drawn: 1, lost: 1, gf: 24, ga: 8, pts: 25 },
  { pos: 2, team: 'Barcelona', played: 10, won: 7, drawn: 2, lost: 1, gf: 22, ga: 9, pts: 23 },
  { pos: 3, team: 'Liverpool', played: 10, won: 7, drawn: 1, lost: 2, gf: 20, ga: 10, pts: 22 },
  { pos: 4, team: 'Arsenal', played: 10, won: 6, drawn: 2, lost: 2, gf: 19, ga: 12, pts: 20 },
  { pos: 5, team: 'Bayern', played: 10, won: 5, drawn: 2, lost: 3, gf: 17, ga: 14, pts: 17 },
]

export function LeagueTableCard() {
  return (
    <section className="rounded-[28px] border border-slate-800 bg-slate-900/80 p-5 shadow-[0_30px_80px_rgba(2,6,23,0.45)]">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-emerald-300">League table</p>
          <h3 className="mt-2 text-xl font-bold text-white">Champions Pulse</h3>
        </div>
        <span className="rounded-full border border-slate-700 bg-slate-950/75 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-slate-300">
          Top 5
        </span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/60">
        <div className="grid grid-cols-[26px_1fr_42px_42px_42px] gap-2 px-3 py-2 text-[10px] uppercase tracking-[0.16em] text-slate-400">
          <span>#</span>
          <span>Team</span>
          <span className="text-right">P</span>
          <span className="text-right">GD</span>
          <span className="text-right">Pts</span>
        </div>

        {standings.map((team) => (
          <div
            key={team.team}
            className="grid grid-cols-[26px_1fr_42px_42px_42px] items-center gap-2 border-t border-slate-800 px-3 py-3 text-sm text-slate-200"
          >
            <span className="font-semibold text-slate-400">{team.pos}</span>
            <span className="truncate font-medium text-white">{team.team}</span>
            <span className="text-right">{team.played}</span>
            <span className="text-right text-emerald-300">+{team.gf - team.ga}</span>
            <span className="text-right font-bold text-white">{team.pts}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
