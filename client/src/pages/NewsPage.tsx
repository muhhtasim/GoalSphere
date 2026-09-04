export function NewsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <header className="mb-6">
        <p className="text-xs uppercase tracking-[0.28em] text-emerald-400">News</p>
        <h1 className="mt-2 text-3xl font-black text-white">Latest football briefing</h1>
      </header>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {[
          'Real Madrid continue to strengthen their control in the title race.',
          'Arsenal quietly build momentum ahead of a decisive month.',
          'Barcelona look sharper in possession and create more high-value chances.',
          'Liverpool have become more efficient in transition moments.',
          'Champions League ties are tightening as the group stage reaches its peak.',
          'Managers are adjusting tactics as match intensity rises across Europe.'
        ].map((story, index) => (
          <article key={story} className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
            <div className="mb-3 text-[11px] uppercase tracking-[0.2em] text-emerald-300">
              {index % 2 === 0 ? 'Analysis' : 'Briefing'}
            </div>
            <p className="text-lg font-semibold text-white">{story}</p>
          </article>
        ))}
      </div>
    </main>
  )
}
