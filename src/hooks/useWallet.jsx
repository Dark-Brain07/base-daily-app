import React, { createContext, useContext, useState, useCallback } from 'react'
import { ethers } from 'ethers'
import { BASE_CHAIN_ID, BASE_CHAIN_PARAMS } from '../lib/contracts'

const WalletContext = createContext(null)

export function WalletProvider({ children }) {
  const [provider, setProvider] = useState(null)
  const [signer, setSigner]     = useState(null)
  const [address, setAddress]   = useState(null)
  const [chainOk, setChainOk]   = useState(false)
  const [connecting, setConnecting] = useState(false)
  const [error, setError]       = useState(null)

  const connect = useCallback(async () => {
    if (!window.ethereum) {
      setError('No wallet detected. Install MetaMask or Coinbase Wallet.')
      return
    }
    setConnecting(true)
    setError(null)
    try {
      const _provider = new ethers.providers.Web3Provider(window.ethereum)
      await _provider.send('eth_requestAccounts', [])
      const network = await _provider.getNetwork()

      if (network.chainId !== BASE_CHAIN_ID) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: BASE_CHAIN_PARAMS.chainId }]
          })
        } catch (switchErr) {
          if (switchErr.code === 4902) {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [BASE_CHAIN_PARAMS]
            })
          } else throw switchErr
        }
      }

      const fresh = new ethers.providers.Web3Provider(window.ethereum)
      const _signer = fresh.getSigner()
      const _address = await _signer.getAddress()
      const _network = await fresh.getNetwork()

      setProvider(fresh)
      setSigner(_signer)
      setAddress(_address)
      setChainOk(_network.chainId === BASE_CHAIN_ID)

      window.ethereum.on('accountsChanged', (accounts) => {
        setAddress(accounts[0] || null)
        if (!accounts[0]) { setSigner(null); setAddress(null) }
      })
      window.ethereum.on('chainChanged', () => window.location.reload())
    } catch (e) {
      setError(e.message || 'Connection failed')
    } finally {
      setConnecting(false)
    }
  }, [])

  const disconnect = useCallback(() => {
    setProvider(null); setSigner(null); setAddress(null); setChainOk(false)
  }, [])

  return (
    <WalletContext.Provider value={{ provider, signer, address, chainOk, connecting, error, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  return useContext(WalletContext)
}
