import { useMemo, useState } from 'react'

interface FollowButtonProps {
  userId: string
  entityType: 'team' | 'player' | 'league'
  entityId: string
  entityName: string
  initiallyFollowing?: boolean
}

export function FollowButton({ userId, entityType, entityId, entityName, initiallyFollowing = false }: FollowButtonProps) {
  const [following, setFollowing] = useState(initiallyFollowing)
  const [loading, setLoading] = useState(false)

  const label = useMemo(() => {
    if (loading) return 'Updating...'
    return following ? 'Following' : 'Follow'
  }, [following, loading])

  async function toggleFollow() {
    setLoading(true)

    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000/api'}/follows/${userId}`, {
      method: following ? 'DELETE' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ entityType, entityId }),
    })

    if (response.ok) {
      setFollowing(!following)
    }

    setLoading(false)
  }

  return (
    <button
      type="button"
      onClick={toggleFollow}
      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
        following
          ? 'bg-emerald-500 text-slate-950'
          : 'border border-slate-700 bg-slate-900 text-slate-200 hover:border-slate-500 hover:text-white'
      }`}
      aria-label={`${following ? 'Unfollow' : 'Follow'} ${entityName}`}
    >
      {label}
    </button>
  )
}
