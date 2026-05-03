import { useState, useEffect, useCallback } from 'react'
import { ethers } from 'ethers'
import { useWallet } from './useWallet'
import { ADDRESSES, CHECKIN_ABI, NFT_ABI } from '../lib/contracts'

export function useContracts() {
  const { provider, signer, address } = useWallet()

  const [stats, setStats]         = useState(null)
  const [nftMinted, setNftMinted] = useState(false)
  const [totalMinted, setTotalMinted] = useState(0)
  const [maxSupply, setMaxSupply] = useState(1000)
  const [loading, setLoading]     = useState(false)
  const [txPending, setTxPending] = useState(false)
  const [txHash, setTxHash]       = useState(null)
  const [txError, setTxError]     = useState(null)

  const loadStats = useCallback(async () => {
    if (!provider || !address) return
    setLoading(true)
    try {
      const checkin = new ethers.Contract(ADDRESSES.checkIn, CHECKIN_ABI, provider)
      const nft     = new ethers.Contract(ADDRESSES.nft, NFT_ABI, provider)

      const [s, minted, total, max] = await Promise.all([
        checkin.getStats(address),
        nft.hasMinted(address),
        nft.totalMinted(),
        nft.MAX_SUPPLY()
      ])

      setStats({
        streak:    s[0].toNumber(),
        total:     s[1].toNumber(),
        lastCheckIn: s[2].toNumber(),
        canCheckIn:  s[3]
      })
      setNftMinted(minted)
      setTotalMinted(total.toNumber())
      setMaxSupply(max.toNumber())
    } catch (e) {
      console.error('loadStats error:', e)
    } finally {
      setLoading(false)
    }
  }, [provider, address])

  // Reset stats when address changes to ensure we aren't showing old wallet data
  useEffect(() => {
    setStats(null)
    setNftMinted(false)
    loadStats()
  }, [address, loadStats])

  const doCheckIn = useCallback(async () => {
    if (!signer) return
    setTxPending(true); setTxError(null); setTxHash(null)
    try {
      // Generate correct suffix using official ox library
      const { Attribution } = await import('ox/erc8021')
      const builderCode = import.meta.env.VITE_BUILDER_CODE || 'bc_p69yn51y'
      const DATA_SUFFIX = Attribution.toDataSuffix({ codes: [builderCode] })

      const checkin = new ethers.Contract(ADDRESSES.checkIn, CHECKIN_ABI, signer)
      const txData = await checkin.populateTransaction.checkIn()
      txData.data = txData.data + DATA_SUFFIX.slice(2)

      const tx = await signer.sendTransaction(txData)
      setTxHash(tx.hash)
      await tx.wait()
      await loadStats()
    } catch (e) {
      setTxError(e.reason || e.message || 'Transaction failed')
    } finally {
      setTxPending(false)
    }
  }, [signer, loadStats])

  const doMint = useCallback(async () => {
    if (!signer) return
    setTxPending(true); setTxError(null); setTxHash(null)
    try {
      // Generate correct suffix using official ox library
      const { Attribution } = await import('ox/erc8021')
      const builderCode = import.meta.env.VITE_BUILDER_CODE || 'bc_p69yn51y'
      const DATA_SUFFIX = Attribution.toDataSuffix({ codes: [builderCode] })

      const nft = new ethers.Contract(ADDRESSES.nft, NFT_ABI, signer)
      const txData = await nft.populateTransaction.mint({ value: 0 })
      txData.data = txData.data + DATA_SUFFIX.slice(2)

      const tx = await signer.sendTransaction(txData)
      setTxHash(tx.hash)
      await tx.wait()
      await loadStats()
    } catch (e) {
      setTxError(e.reason || e.message || 'Mint failed')
    } finally {
      setTxPending(false)
    }
  }, [signer, loadStats])

  return {
    stats, nftMinted, totalMinted, maxSupply,
    loading, txPending, txHash, txError,
    doCheckIn, doMint, reload: loadStats
  }
}
