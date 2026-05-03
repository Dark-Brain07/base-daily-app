import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useWallet } from '../hooks/useWallet'

const styles = {
  nav: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '14px 24px', background: 'rgba(255,255,255,0.85)',
    backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border)',
    position: 'sticky', top: 0, zIndex: 100
  },
  logo: {
    display: 'flex', alignItems: 'center', gap: 10,
    fontFamily: 'var(--font-display)', fontWeight: 700,
    fontSize: 16, color: 'var(--text-primary)', textDecoration: 'none'
  },
  logoIcon: {
    width: 32, height: 32, background: 'var(--base-blue)',
    borderRadius: 8, display: 'flex', alignItems: 'center',
    justifyContent: 'center', color: 'white', fontSize: 14, fontWeight: 700
  },
  links: { display: 'flex', alignItems: 'center', gap: 4 },
  link: {
    padding: '6px 14px', borderRadius: 8, fontSize: 14, fontWeight: 500,
    color: 'var(--text-secondary)', transition: 'all 0.15s', textDecoration: 'none'
  },
  linkActive: {
    color: 'var(--base-blue)', background: 'var(--base-blue-muted)'
  },
  btn: {
    padding: '8px 18px', borderRadius: 10, fontSize: 14, fontWeight: 600,
    background: 'var(--base-blue)', color: 'white', border: 'none',
    cursor: 'pointer', transition: 'opacity 0.15s', fontFamily: 'var(--font-body)'
  },
  addrBadge: {
    padding: '7px 14px', borderRadius: 10, fontSize: 13, fontWeight: 500,
    background: 'var(--base-blue-muted)', color: 'var(--base-blue)',
    fontFamily: 'var(--font-display)', letterSpacing: '-0.01em'
  }
}

export default function Navbar() {
  const { address, connect, connecting } = useWallet()
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>
        <div style={styles.logoIcon}>B</div>
        Base Daily
      </Link>

      <div style={styles.links}>
        {[['/', 'App'], ['/leaderboard', 'Leaderboard'], ['/how', 'How It Works']].map(([path, label]) => (
          <Link key={path} to={path} style={{ ...styles.link, ...(isActive(path) ? styles.linkActive : {}) }}>
            {label}
          </Link>
        ))}
      </div>

      {address ? (
        <div style={styles.addrBadge}>
          {address.slice(0, 6)}...{address.slice(-4)}
        </div>
      ) : (
        <button style={styles.btn} onClick={connect} disabled={connecting}>
          {connecting ? 'Connecting...' : 'Connect Wallet'}
        </button>
      )}
    </nav>
  )
}
