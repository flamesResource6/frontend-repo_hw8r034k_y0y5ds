import React, { useState } from 'react'

export default function RoundCreator({ onCreated }) {
  const [roundId, setRoundId] = useState('R-' + new Date().toISOString().slice(0,10))
  const [entryFee, setEntryFee] = useState(1000000)
  const [treasury, setTreasury] = useState('TREASURY_PUBLIC_KEY_HERE')
  const [network, setNetwork] = useState('devnet')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const api = import.meta.env.VITE_BACKEND_URL

  const create = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${api}/api/rounds`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ round_id: roundId, entry_fee_lamports: Number(entryFee), treasury_address: treasury, network })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Failed to create round')
      onCreated?.(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-slate-800/50 border border-blue-500/20 rounded-xl p-4 space-y-3">
      <div className="text-sm text-blue-200">Create a new round</div>
      <div className="grid sm:grid-cols-2 gap-3">
        <input className="bg-slate-900/60 border border-slate-700 rounded px-3 py-2 text-sm text-white" value={roundId} onChange={e=>setRoundId(e.target.value)} placeholder="Round ID" />
        <input className="bg-slate-900/60 border border-slate-700 rounded px-3 py-2 text-sm text-white" type="number" value={entryFee} onChange={e=>setEntryFee(e.target.value)} placeholder="Entry fee (lamports)" />
        <input className="bg-slate-900/60 border border-slate-700 rounded px-3 py-2 text-sm text-white sm:col-span-2" value={treasury} onChange={e=>setTreasury(e.target.value)} placeholder="Treasury public key" />
        <select className="bg-slate-900/60 border border-slate-700 rounded px-3 py-2 text-sm text-white" value={network} onChange={e=>setNetwork(e.target.value)}>
          <option value="devnet">devnet</option>
          <option value="testnet">testnet</option>
          <option value="mainnet-beta">mainnet-beta</option>
        </select>
        <button onClick={create} disabled={loading} className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 rounded px-3 py-2 text-white text-sm">
          {loading ? 'Creating...' : 'Create round'}
        </button>
      </div>
      {error && <div className="text-xs text-red-300">{error}</div>}
    </div>
  )
}
