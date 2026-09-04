import { useState } from 'react'
import type { Match } from '../types'
import { HeadToHeadCard } from './HeadToHeadCard'
import { LineupsTable } from './LineupsTable'
import { MatchTimeline } from './MatchTimeline'
import { StatsTable } from './StatsTable'

interface MatchDetailTabsProps {
  match: Match
}

const tabs = ['Overview', 'Commentary', 'Stats', 'Lineups', 'H2H'] as const

export function MatchDetailTabs({ match }: MatchDetailTabsProps) {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('Overview')

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              activeTab === tab
                ? 'bg-emerald-500 text-slate-950'
                : 'border border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-500 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Overview' && (
        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <MatchTimeline match={match} />
            <StatsTable match={match} />
          </div>
          <div className="space-y-4">
            <HeadToHeadCard match={match} />
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-4">
              <h3 className="mb-3 text-lg font-bold text-white">Match story</h3>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
                  <span className="font-semibold text-white">Momentum:</span> The home side has controlled the pace and created the cleaner chances.
                </li>
                <li className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
                  <span className="font-semibold text-white">Threat:</span> Progression down the flanks has been the key channel for both teams.
                </li>
                <li className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
                  <span className="font-semibold text-white">Risk:</span> A set-piece could decide the final phase of this match.
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Commentary' && <MatchTimeline match={match} />}
      {activeTab === 'Stats' && <StatsTable match={match} />}
      {activeTab === 'Lineups' && <LineupsTable match={match} />}
      {activeTab === 'H2H' && <HeadToHeadCard match={match} />}
    </section>
  )
}
