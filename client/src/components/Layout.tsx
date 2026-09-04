import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'For you', to: '/personalized' },
  { label: 'Following', to: '/following' },
  { label: 'Matches', to: '/matches' },
  { label: 'Live', to: '/live' },
  { label: 'Fixtures', to: '/fixtures' },
  { label: 'News', to: '/news' },
]

export function Layout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <header className="sticky top-0 z-30 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2 text-sm font-black tracking-[0.22em] text-emerald-400">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/15 text-[10px] text-emerald-300 ring-1 ring-emerald-400/30">
              GS
            </span>
            GOALSPHERE
          </Link>

          <nav className="hidden items-center gap-2 rounded-full border border-slate-800 bg-slate-900/70 p-1.5 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `rounded-full px-3 py-2 text-sm font-medium transition ${
                    isActive
                      ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/25'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button className="hidden rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-300 transition hover:border-emerald-400 hover:bg-emerald-500/15 hover:text-emerald-200 sm:inline-flex">
              Sign in
            </button>

            <button
              type="button"
              aria-label="Toggle navigation"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((value) => !value)}
              className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900 p-2.5 text-slate-200 transition hover:border-slate-500 hover:text-white md:hidden"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                <path d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75Zm0 5.5A.75.75 0 0 1 3.75 12h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12.25Zm0 5.5A.75.75 0 0 1 3.75 17.5h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 17.75Z" />
              </svg>
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="border-t border-slate-800 bg-slate-950 md:hidden">
            <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 sm:px-6">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `rounded-xl px-3 py-2 text-sm font-medium transition ${
                      isActive
                        ? 'bg-emerald-500 text-slate-950'
                        : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main>{children}</main>
    </div>
  )
}
