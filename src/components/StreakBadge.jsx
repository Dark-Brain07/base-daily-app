import React from 'react'

export default function StreakBadge({ streak }) {
  const s = streak || 0
  const color = s >= 30 ? '#ff6b00' : s >= 7 ? '#ffaa00' : 'var(--base-blue)'
  const emoji = s >= 30 ? '🔥' : s >= 7 ? '⚡' : '✦'

  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '6px 14px', borderRadius: 20,
      background: s > 0 ? `${color}18` : 'var(--surface2)',
      border: `1px solid ${s > 0 ? color + '33' : 'var(--border)'}`,
      fontFamily: 'var(--font-display)', fontSize: 13,
      color: s > 0 ? color : 'var(--text-muted)',
      fontWeight: 700
    }}>
      <span style={{ fontSize: 15 }}>{emoji}</span>
      {s > 0 ? `${s} day streak` : 'Start your streak'}
    </div>
  )
}
