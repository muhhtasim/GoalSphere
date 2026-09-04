import type { Match } from '../types'

interface LineupsTableProps {
  match: Match
}

export function LineupsTable({ match }: LineupsTableProps) {
  return (
    <div className="space-y-4 rounded-3xl border border-slate-800 bg-slate-900 p-4">
      <h3 className="text-lg font-bold text-white">Lineups</h3>
      {match.lineups.map((lineup) => (
        <div key={lineup.teamId} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-white">
              {match.homeTeam.id === lineup.teamId ? match.homeTeam.name : match.awayTeam.name}
            </span>
            <span className="text-xs uppercase tracking-[0.2em] text-slate-400">{lineup.formation}</span>
          </div>
          <div className="grid gap-2 text-sm text-slate-300">
            {lineup.players.length > 0 ? (
              lineup.players.map((player) => (
                <div key={player.id} className="flex items-center justify-between rounded-xl bg-slate-900/80 px-2 py-1">
                  <span>{player.name}</span>
                  <span className="text-slate-400">#{player.number}</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-400">Lineup data will be available closer to kickoff.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
