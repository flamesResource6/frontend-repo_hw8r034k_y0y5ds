import React, { useEffect, useState } from 'react'

export default function RoundDetail({ round }) {
  const api = import.meta.env.VITE_BACKEND_URL
  const [entries, setEntries] = useState([])
  const [wallet, setWallet] = useState('')
  const [sig, setSig] = useState('')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')

  const loadEntries = async () => {
    const res = await fetch(`${api}/api/rounds/${round.round_id}/entries`)
    const data = await res.json()
    setEntries(data)
  }

  useEffect(() => { loadEntries() }, [round.round_id])

  const submitEntry = async () => {
    setLoading(true)
    setMsg('')
    try {
      const res = await fetch(`${api}/api/rounds/${round.round_id}/enter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wallet_address: wallet, tx_signature: sig })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Failed to submit entry')
      setMsg('Entry submitted. Verification: ' + (data.verified ? 'passed' : 'pending/failed'))
      setWallet('')
      setSig('')
      loadEntries()
    } catch (e) {
      setMsg(e.message)
    } finally {
      setLoading(false)
    }
  }

  const draw = async () => {
    setLoading(true)
    setMsg('')
    try {
      const res = await fetch(`${api}/api/rounds/${round.round_id}/draw`, { method: 'POST' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Failed to draw winner')
      setMsg('Winner: ' + data.winner.wallet_address)
    } catch (e) {
      setMsg(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-slate-800/50 border border-blue-500/20 rounded-xl p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-white font-medium">{round.round_id}</div>
          <div className="text-xs text-blue-300/70">{round.is_active ? 'Active' : 'Closed'} • {round.entry_fee_lamports} lamports • {round.network}</div>
        </div>
        {round.is_active && <button onClick={draw} disabled={loading} className="px-3 py-2 bg-purple-600 hover:bg-purple-500 rounded text-white text-sm">Draw winner</button>}
      </div>

      <div className="space-y-2">
        <div className="text-sm text-blue-200">Submit your participation</div>
        <div className="grid sm:grid-cols-3 gap-2">
          <input className="bg-slate-900/60 border border-slate-700 rounded px-3 py-2 text-sm text-white" value={wallet} onChange={e=>setWallet(e.target.value)} placeholder="Your wallet address" />
          <input className="bg-slate-900/60 border border-slate-700 rounded px-3 py-2 text-sm text-white sm:col-span-2" value={sig} onChange={e=>setSig(e.target.value)} placeholder="Payment transaction signature" />
        </div>
        <button onClick={submitEntry} disabled={loading} className="px-3 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white text-sm">Submit entry</button>
      </div>

      <div className="text-xs text-blue-300/80">Entries</div>
      <div className="space-y-2 max-h-64 overflow-auto">
        {entries.map(e => (
          <div key={e._id} className="bg-slate-900/50 border border-slate-700 rounded p-2 text-sm text-blue-100 flex items-center justify-between">
            <div className="truncate">{e.wallet_address}</div>
            <div className={`text-xs rounded px-2 py-0.5 ${e.verified ? 'bg-green-500/20 text-green-300 border border-green-400/30' : 'bg-yellow-500/10 text-yellow-200 border border-yellow-400/20'}`}>{e.verified ? 'verified' : 'unverified'}</div>
          </div>
        ))}
        {!entries.length && <div className="text-blue-300/70 text-sm">No entries yet</div>}
      </div>

      {msg && <div className="text-xs text-blue-200">{msg}</div>}
    </div>
  )
}
