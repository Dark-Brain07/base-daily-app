import React from 'react'
import Navbar from '../components/Navbar'

const steps = [
  {
    n: '01',
    title: 'Connect your wallet',
    body: 'Connect MetaMask or Coinbase Wallet. The app will automatically switch to Base Mainnet.',
    color: '#0052FF'
  },
  {
    n: '02',
    title: 'Check in daily',
    body: 'Hit the Check In button once every 20 hours. Each check-in is an on-chain transaction that extends your streak.',
    color: '#7c3aed'
  },
  {
    n: '03',
    title: 'Mint your Early Access NFT',
    body: 'Claim your free Early Access NFT — only 1,000 available. One per wallet, first come first served.',
    color: '#059669'
  },
  {
    n: '04',
    title: 'Build your streak',
    body: 'Check in within 48 hours of your last check-in to keep your streak alive. Miss it and you start from 1.',
    color: '#d97706'
  }
]

const contractInfo = [
  { name: 'DailyCheckIn.sol', desc: 'Tracks streaks and check-in timestamps per wallet. Bot-callable for batch operations.' },
  { name: 'EarlyAccessNFT.sol', desc: 'ERC-721, 1000 max supply, free mint, one per wallet. OpenZeppelin-based.' }
]

export default function HowItWorks() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Navbar />

      <div style={{ maxWidth: 600, margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ marginBottom: 40, textAlign: 'center' }} className="fade-up">
          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: 32,
            fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12
          }}>
            How It Works
          </h1>
          <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Two smart contracts on Base Mainnet power this app.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40 }} className="fade-up fade-up-1">
          {steps.map((step) => (
            <div key={step.n} style={{
              display: 'flex', gap: 20, alignItems: 'flex-start',
              background: 'var(--surface)', borderRadius: 16,
              border: '1px solid var(--border)', padding: '20px 24px'
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                background: step.color + '18', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-display)', fontSize: 13,
                fontWeight: 700, color: step.color
              }}>
                {step.n}
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 15, color: 'var(--text-primary)', marginBottom: 5 }}>
                  {step.title}
                </div>
                <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {step.body}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="fade-up fade-up-2">
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: 18,
            fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16
          }}>
            Smart Contracts
          </h2>
          {contractInfo.map((c) => (
            <div key={c.name} style={{
              background: 'var(--surface)', borderRadius: 14,
              border: '1px solid var(--border)', padding: '16px 20px', marginBottom: 12
            }}>
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: 13,
                fontWeight: 700, color: 'var(--base-blue)', marginBottom: 6
              }}>
                {c.name}
              </div>
              <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {c.desc}
              </div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 32, padding: '20px 24px',
          background: 'var(--base-blue-muted)', borderRadius: 16,
          border: '1px solid var(--border-strong)'
        }} className="fade-up fade-up-3">
          <div style={{ fontWeight: 600, color: 'var(--base-blue)', marginBottom: 6, fontSize: 14 }}>
            Bot strategy for Base leaderboard
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            The owner bot wallet can call <code style={{ background: 'white', padding: '1px 6px', borderRadius: 5, fontFamily: 'var(--font-display)', fontSize: 12 }}>batchCheckIn(users[])</code> daily
            on behalf of all registered users, creating on-chain weekly active user activity
            that contributes to ranking on the Base ecosystem leaderboard.
          </div>
        </div>
      </div>
    </div>
  )
}
