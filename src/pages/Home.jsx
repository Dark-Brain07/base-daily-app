import React from 'react'
import Navbar from '../components/Navbar'
import StatCard from '../components/StatCard'
import TxToast from '../components/TxToast'
import StreakBadge from '../components/StreakBadge'
import { useWallet } from '../hooks/useWallet'
import { useContracts } from '../hooks/useContracts'

const s = {
  page: { minHeight: '100vh', background: 'var(--bg)' },
  hero: {
    textAlign: 'center', padding: '48px 24px 32px',
    maxWidth: 560, margin: '0 auto'
  },
  badge: {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    padding: '4px 14px', borderRadius: 20, marginBottom: 20,
    background: 'var(--base-blue-muted)', color: 'var(--base-blue)',
    fontSize: 12, fontWeight: 600, letterSpacing: '0.06em',
    textTransform: 'uppercase'
  },
  h1: {
    fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 700,
    color: 'var(--text-primary)', lineHeight: 1.1, marginBottom: 14
  },
  sub: {
    fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.6,
    maxWidth: 420, margin: '0 auto 24px'
  },
  card: {
    maxWidth: 480, margin: '0 auto', background: 'var(--surface)',
    borderRadius: 24, border: '1px solid var(--border)',
    boxShadow: 'var(--shadow-lg)', overflow: 'hidden'
  },
  cardHeader: {
    background: 'linear-gradient(135deg, #0052FF 0%, #1a6bff 100%)',
    padding: '28px 28px 24px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between'
  },
  cardHeaderLeft: {},
  networkPill: {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    padding: '4px 12px', borderRadius: 20, marginBottom: 12,
    background: 'rgba(255,255,255,0.2)', color: 'white',
    fontSize: 12, fontWeight: 600
  },
  dot: {
    width: 6, height: 6, borderRadius: '50%',
    background: '#00c853', boxShadow: '0 0 6px #00c853'
  },
  cardTitle: {
    fontFamily: 'var(--font-display)', fontSize: 22,
    fontWeight: 700, color: 'white'
  },
  cardSub: { fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 4 },
  bigB: {
    width: 52, height: 52, borderRadius: 14,
    background: 'rgba(255,255,255,0.2)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700,
    color: 'white'
  },
  cardBody: { padding: 28 },
  statsRow: { display: 'flex', gap: 10, marginBottom: 24 },
  divider: { height: 1, background: 'var(--border)', margin: '0 0 24px' },
  actionGrid: { display: 'flex', flexDirection: 'column', gap: 12 },
  btnPrimary: {
    width: '100%', padding: '16px 24px',
    borderRadius: 14, fontSize: 15, fontWeight: 600,
    background: 'var(--base-blue)', color: 'white',
    border: 'none', cursor: 'pointer',
    transition: 'opacity 0.15s, transform 0.1s',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    fontFamily: 'var(--font-body)'
  },
  btnSecondary: {
    width: '100%', padding: '16px 24px',
    borderRadius: 14, fontSize: 15, fontWeight: 600,
    background: 'var(--surface2)', color: 'var(--base-blue)',
    border: '1.5px solid var(--border-strong)', cursor: 'pointer',
    transition: 'all 0.15s',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    fontFamily: 'var(--font-body)'
  },
  btnDisabled: { opacity: 0.5, cursor: 'not-allowed' },
  btnConnect: {
    width: '100%', padding: '16px 24px',
    borderRadius: 14, fontSize: 15, fontWeight: 600,
    background: '#0a0f1e', color: 'white',
    border: 'none', cursor: 'pointer',
    fontFamily: 'var(--font-body)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
  },
  footer: {
    textAlign: 'center', padding: '32px 24px',
    fontSize: 13, color: 'var(--text-muted)'
  }
}

function Spinner() {
  return (
    <span style={{
      width: 16, height: 16, borderRadius: '50%',
      border: '2px solid rgba(255,255,255,0.3)',
      borderTopColor: 'white', display: 'inline-block',
      animation: 'spin 0.7s linear infinite'
    }} />
  )
}

export default function Home() {
  const { address, connect, connecting } = useWallet()
  const { stats, nftMinted, totalMinted, maxSupply, txPending, txHash, txError, doCheckIn, doMint } = useContracts()

  const checkinDisabled = txPending || !stats?.canCheckIn
  const mintDisabled    = txPending || nftMinted

  return (
    <div style={s.page}>
      <Navbar />

      <div style={s.hero} className="fade-up">
        <div style={s.badge}>
          <div style={s.dot} /> Base Mainnet
        </div>
        <h1 style={s.h1}>Daily Check-In<br />on Base</h1>
        <p style={s.sub}>
          Build your streak, mint your Early Access NFT, and contribute to Base ecosystem activity every day.
        </p>
        {stats && <StreakBadge streak={stats.streak} />}
      </div>

      <div style={{ maxWidth: 480, margin: '0 auto 24px', padding: '0 24px' }} className="fade-up fade-up-1">
        <div style={s.card}>
          <div style={s.cardHeader}>
            <div style={s.cardHeaderLeft}>
              <div style={s.networkPill}>
                <div style={s.dot} /> Live on Base
              </div>
              <div style={s.cardTitle}>Base Daily</div>
              <div style={s.cardSub}>
                {address
                  ? `${address.slice(0, 6)}...${address.slice(-4)}`
                  : 'Connect wallet to start'
                }
              </div>
            </div>
            <div style={s.bigB}>B</div>
          </div>

          <div style={s.cardBody}>
            <div style={s.statsRow}>
              <StatCard
                label="Day Streak"
                value={stats ? `${stats.streak}` : '—'}
                accent={stats?.streak >= 7 ? '#ffaa00' : undefined}
              />
              <StatCard label="Check-Ins" value={stats ? `${stats.total}` : '—'} />
              <StatCard
                label="NFT"
                value={nftMinted ? '✓' : address ? '0' : '—'}
                sub={`${totalMinted}/${maxSupply}`}
                accent={nftMinted ? 'var(--green)' : undefined}
              />
            </div>

            <div style={s.divider} />

            <div style={s.actionGrid}>
              {!address ? (
                <button style={s.btnConnect} onClick={connect} disabled={connecting}>
                  {connecting ? <><Spinner /> Connecting...</> : '⬛ Connect Wallet'}
                </button>
              ) : (
                <>
                  <button
                    style={{ ...s.btnPrimary, ...(checkinDisabled ? s.btnDisabled : {}) }}
                    onClick={doCheckIn}
                    disabled={checkinDisabled}
                  >
                    {txPending ? <Spinner /> : '✦'}
                    {txPending ? 'Confirming...'
                      : !stats?.canCheckIn ? 'Already Checked In Today'
                      : 'Check In Today'}
                  </button>

                  <button
                    style={{ ...s.btnSecondary, ...(mintDisabled ? s.btnDisabled : {}) }}
                    onClick={doMint}
                    disabled={mintDisabled}
                  >
                    {nftMinted ? '✓ Early Access NFT Claimed' : '⬛ Mint Early Access NFT'}
                  </button>
                </>
              )}

              <TxToast hash={txHash} error={txError} pending={txPending} />
            </div>
          </div>
        </div>
      </div>

      <div style={s.footer}>
        Built on Base · Contracts on{' '}
        <a href="https://basescan.org" target="_blank" rel="noreferrer">Basescan</a>
      </div>
    </div>
  )
}
