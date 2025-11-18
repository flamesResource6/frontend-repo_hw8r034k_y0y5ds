import React, { useEffect, useState } from 'react'

export default function RoundList({ onSelect }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const api = import.meta.env.VITE_BACKEND_URL

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${api}/api/rounds`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Failed to load rounds')
      setItems(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  if (loading) return <div className="text-blue-200 text-sm">Loading rounds...</div>
  if (error) return <div className="text-red-300 text-sm">{error}</div>

  return (
    <div className="space-y-2">
      {items.map(r => (
        <button key={r._id} onClick={() => onSelect?.(r)} className="w-full text-left bg-slate-900/50 hover:bg-slate-900 border border-slate-700 rounded p-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-medium">{r.round_id}</div>
              <div className="text-xs text-blue-300/70">{r.is_active ? 'Active' : 'Closed'} • {r.entry_fee_lamports} lamports • {r.network}</div>
            </div>
            {r.winner_address && <div className="text-xs text-green-300">Winner: {r.winner_address.slice(0,4)}…{r.winner_address.slice(-4)}</div>}
          </div>
        </button>
      ))}
      {!items.length && <div className="text-blue-300/70 text-sm">No rounds yet</div>}
    </div>
  )
}
