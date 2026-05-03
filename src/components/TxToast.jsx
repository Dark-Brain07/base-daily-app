import React from 'react'

export default function TxToast({ hash, error, pending }) {
  if (!hash && !error && !pending) return null

  const bg    = error ? 'var(--red-bg)' : pending ? 'var(--base-blue-muted)' : 'var(--green-bg)'
  const color = error ? 'var(--red)'    : pending ? 'var(--base-blue)'       : 'var(--green)'
  const msg   = error
    ? error.length > 80 ? error.slice(0, 80) + '...' : error
    : pending ? 'Transaction pending...'
    : 'Transaction confirmed!'

  return (
    <div style={{
      margin: '12px 0 0',
      padding: '12px 16px',
      borderRadius: 12,
      background: bg,
      color,
      fontSize: 13,
      fontWeight: 500,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      animation: 'slideIn 0.25s ease'
    }}>
      {pending && (
        <span style={{
          width: 14, height: 14, border: `2px solid ${color}`,
          borderTopColor: 'transparent', borderRadius: '50%',
          display: 'inline-block',
          animation: 'spin 0.8s linear infinite', flexShrink: 0
        }} />
      )}
      {!pending && !error && '✓ '}
      {!pending && error && '✗ '}
      <span>{msg}</span>
      {hash && !pending && (
        <a
          href={`https://basescan.org/tx/${hash}`}
          target="_blank"
          rel="noreferrer"
          style={{ marginLeft: 'auto', color, fontSize: 12, textDecoration: 'underline', whiteSpace: 'nowrap' }}
        >
          View on Basescan →
        </a>
      )}
    </div>
  )
}
