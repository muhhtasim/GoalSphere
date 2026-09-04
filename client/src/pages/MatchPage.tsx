import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { MatchDetailTabs } from '../components/MatchDetailTabs'
import { MatchHeader } from '../components/MatchHeader'
import { fetchMatchById, fetchMatches } from '../services/footballService'
import type { Match } from '../types'

export function MatchPage() {
  const { id } = useParams()
  const [match, setMatch] = useState<Match | null>(null)

  useEffect(() => {
    if (!id) {
      fetchMatches().then((matches) => setMatch(matches[0] ?? null))
      return
    }

    fetchMatchById(id).then((nextMatch) => setMatch(nextMatch ?? null))
  }, [id])

  if (!match) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 text-slate-300">
          Loading match details...
        </div>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <MatchHeader match={match} />
      <div className="mt-6">
        <MatchDetailTabs match={match} />
      </div>
    </main>
  )
}
