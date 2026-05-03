import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { WalletProvider } from './hooks/useWallet'
import Home from './pages/Home'
import Leaderboard from './pages/Leaderboard'
import HowItWorks from './pages/HowItWorks'

export default function App() {
  return (
    <WalletProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/how" element={<HowItWorks />} />
        </Routes>
      </BrowserRouter>
    </WalletProvider>
  )
}
