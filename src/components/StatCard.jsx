import React from 'react'

export default function StatCard({ label, value, sub, accent }) {
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 14,
      padding: '18px 20px',
      textAlign: 'center',
      transition: 'box-shadow 0.2s',
      flex: 1
    }}>
      <div style={{
        fontSize: 28, fontWeight: 700,
        fontFamily: 'var(--font-display)',
        color: accent || 'var(--base-blue)',
        lineHeight: 1
      }}>
        {value ?? '—'}
      </div>
      <div style={{
        fontSize: 12, color: 'var(--text-muted)',
        fontWeight: 500, marginTop: 6, textTransform: 'uppercase',
        letterSpacing: '0.06em'
      }}>
        {label}
      </div>
      {sub && (
        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 3 }}>
          {sub}
        </div>
      )}
    </div>
  )
}
