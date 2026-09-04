import { useEffect, useState } from 'react'

interface FollowItem {
  id: string
  entityType: 'team' | 'player' | 'league'
  entityId: string
}

export function FollowingPage() {
  const [items, setItems] = useState<FollowItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000/api'}/follows/demo-user`)
      .then((response) => response.json())
      .then((json) => {
        setItems(json.data ?? [])
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <p className="text-slate-300">Loading your follows...</p>
      </main>
    )
  }

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900 p-8 text-center text-slate-300">
          <h1 className="text-2xl font-bold text-white">You are not following anything yet.</h1>
          <p className="mt-2">Follow teams, players, or leagues to build your personalized feed.</p>
        </div>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <header className="mb-6">
        <p className="text-xs uppercase tracking-[0.28em] text-emerald-400">Following</p>
        <h1 className="mt-2 text-3xl font-black text-white">Your followed entities</h1>
      </header>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <article key={item.id} className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{item.entityType}</p>
            <h2 className="mt-2 text-xl font-bold text-white">{item.entityId}</h2>
          </article>
        ))}
      </div>
    </main>
  )
}
