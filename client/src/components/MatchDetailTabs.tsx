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
          <MatchTimeline match={match} />
          <HeadToHeadCard match={match} />
        </div>
      )}

      {activeTab === 'Commentary' && <MatchTimeline match={match} />}
      {activeTab === 'Stats' && <StatsTable match={match} />}
      {activeTab === 'Lineups' && <LineupsTable match={match} />}
      {activeTab === 'H2H' && <HeadToHeadCard match={match} />}
    </section>
  )
}
