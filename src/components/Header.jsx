import React from 'react'

export default function Header() {
  return (
    <header className="px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300 font-bold">L</div>
        <span className="text-white font-semibold tracking-tight">Solana Lottery</span>
      </div>
      <div className="text-xs text-blue-300/70">Minimalistic Web3 Lottery • Devnet</div>
    </header>
  )
}
