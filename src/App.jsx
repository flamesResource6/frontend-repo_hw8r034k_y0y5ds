import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import RoundCreator from './components/RoundCreator'
import RoundList from './components/RoundList'
import RoundDetail from './components/RoundDetail'

function App() {
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    document.title = 'Solana Lottery (Minimal)'
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_-10%,rgba(59,130,246,0.15),transparent_35%),radial-gradient(circle_at_80%_110%,rgba(168,85,247,0.15),transparent_35%)] pointer-events-none" />
      <div className="relative">
        <Header />
        <main className="max-w-5xl mx-auto px-6 pb-16 grid md:grid-cols-5 gap-6">
          <div className="md:col-span-2 space-y-4">
            <RoundCreator onCreated={(r)=>setSelected(r)} />
            <div className="text-sm text-blue-200">Rounds</div>
            <RoundList onSelect={(r)=>setSelected(r)} />
          </div>
          <div className="md:col-span-3">
            {selected ? (
              <RoundDetail round={selected} />
            ) : (
              <div className="h-full min-h-[320px] bg-slate-800/40 border border-slate-700 rounded-xl flex items-center justify-center text-blue-200">
                Select or create a round to view details
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
