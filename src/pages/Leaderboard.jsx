import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'

const MOCK_DATA = [
  { rank: 1, address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', streak: 87, checkIns: 87 },
  { rank: 2, address: '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B', streak: 74, checkIns: 74 },
  { rank: 3, address: '0x1Db3439a222C519ab44bb1144fC28167b4Fa6EE6', streak: 63, checkIns: 66 },
  { rank: 4, address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e', streak: 51, checkIns: 55 },
  { rank: 5, address: '0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE', streak: 48, checkIns: 50 },
  { rank: 6, address: '0x28C6c06298d514Db089934071355E5743bf21d60', streak: 42, checkIns: 45 },
  { rank: 7, address: '0x21a31Ee1afC51d94C2eFcCAa2092aD1028285549', streak: 38, checkIns: 41 },
  { rank: 8, address: '0xDFd5293D8e347dFe59E90eFd55b2956a1343963d', streak: 33, checkIns: 36 },
  { rank: 9, address: '0x5754284f345afc66a98fbB0a0Afe71e0F007B949', streak: 29, checkIns: 31 },
  { rank: 10, address: '0x4E9ce36E442e55EcD9025B9a6E0D88485d628A67', streak: 24, checkIns: 27 },
]

const medals = { 1: '🥇', 2: '🥈', 3: '🥉' }

function shorten(addr) {
  return addr.slice(0, 6) + '...' + addr.slice(-4)
}

export default function Leaderboard() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Navbar />

      <div style={{ maxWidth: 600, margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ marginBottom: 32, textAlign: 'center' }} className="fade-up">
          <div style={{
            display: 'inline-block', padding: '4px 14px', borderRadius: 20,
            background: 'var(--base-blue-muted)', color: 'var(--base-blue)',
            fontSize: 12, fontWeight: 600, letterSpacing: '0.06em',
            textTransform: 'uppercase', marginBottom: 14
          }}>
            Top Streakers
          </div>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: 32,
            fontWeight: 700, color: 'var(--text-primary)'
          }}>
            Leaderboard
          </h1>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', marginTop: 8 }}>
            Updated live from on-chain data
          </p>
        </div>

        <div style={{
          background: 'var(--surface)', borderRadius: 20,
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow)', overflow: 'hidden'
        }} className="fade-up fade-up-1">
          {MOCK_DATA.map((row, i) => (
            <div key={row.rank} style={{
              display: 'flex', alignItems: 'center', gap: 16,
              padding: '14px 20px',
              borderBottom: i < MOCK_DATA.length - 1 ? '1px solid var(--border)' : 'none',
              background: row.rank <= 3 ? `${row.rank === 1 ? '#fffbeb' : row.rank === 2 ? '#f8f9ff' : '#fff8f5'}` : 'transparent'
            }}>
              <div style={{
                width: 32, textAlign: 'center',
                fontFamily: 'var(--font-display)',
                fontSize: row.rank <= 3 ? 20 : 14,
                fontWeight: 700,
                color: row.rank <= 3 ? 'inherit' : 'var(--text-muted)'
              }}>
                {medals[row.rank] || row.rank}
              </div>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: 'var(--base-blue-muted)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-display)', fontSize: 13,
                fontWeight: 700, color: 'var(--base-blue)', flexShrink: 0
              }}>
                {row.address.slice(2, 4).toUpperCase()}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>
                  {shorten(row.address)}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 1 }}>
                  {row.checkIns} total check-ins
                </div>
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '4px 12px', borderRadius: 20,
                background: row.streak >= 30 ? '#fff3e0' : 'var(--base-blue-muted)',
                color: row.streak >= 30 ? '#e65100' : 'var(--base-blue)',
                fontSize: 13, fontWeight: 700, fontFamily: 'var(--font-display)'
              }}>
                {row.streak >= 30 ? '🔥' : '⚡'} {row.streak}d
              </div>
            </div>
          ))}
        </div>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: 'var(--text-muted)' }}>
          Sample data shown — will update from on-chain events after deployment
        </p>
      </div>
    </div>
  )
}
