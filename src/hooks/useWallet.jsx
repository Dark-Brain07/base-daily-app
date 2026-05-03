import React, { createContext, useContext, useState, useCallback, useMemo } from 'react'
import { ethers } from 'ethers'
import CoinbaseWalletSDK from '@coinbase/wallet-sdk'
import { BASE_CHAIN_ID, BASE_CHAIN_PARAMS } from '../lib/contracts'

const WalletContext = createContext(null)

export function WalletProvider({ children }) {
  const [provider, setProvider] = useState(null)
  const [signer, setSigner]     = useState(null)
  const [address, setAddress]   = useState(null)
  const [chainOk, setChainOk]   = useState(false)
  const [connecting, setConnecting] = useState(false)
  const [error, setError]       = useState(null)

  // Initialize Coinbase Wallet SDK
  const coinbaseWallet = useMemo(() => new CoinbaseWalletSDK({
    appName: 'Base Daily',
    appLogoUrl: window.location.origin + '/favicon.svg',
    darkMode: true
  }), [])

  const setupWallet = async (injectedProvider) => {
    const _provider = new ethers.providers.Web3Provider(injectedProvider)
    await _provider.send('eth_requestAccounts', [])
    const network = await _provider.getNetwork()

    if (network.chainId !== BASE_CHAIN_ID) {
      try {
        await injectedProvider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: BASE_CHAIN_PARAMS.chainId }]
        })
      } catch (switchErr) {
        if (switchErr.code === 4902) {
          await injectedProvider.request({
            method: 'wallet_addEthereumChain',
            params: [BASE_CHAIN_PARAMS]
          })
        } else throw switchErr
      }
    }

    const fresh = new ethers.providers.Web3Provider(injectedProvider)
    const _signer = fresh.getSigner()
    const _address = await _signer.getAddress()
    const _network = await fresh.getNetwork()

    setProvider(fresh)
    setSigner(_signer)
    setAddress(_address)
    setChainOk(_network.chainId === BASE_CHAIN_ID)

    injectedProvider.on('accountsChanged', (accounts) => {
      if (accounts.length === 0) {
        setSigner(null); setAddress(null); setProvider(null)
      } else {
        setAddress(accounts[0])
      }
    })
    injectedProvider.on('chainChanged', () => window.location.reload())
  }

  const connect = useCallback(async () => {
    if (!window.ethereum) {
      setError('No wallet detected. Please install a wallet extension.')
      return
    }
    setConnecting(true); setError(null)
    try {
      await setupWallet(window.ethereum)
    } catch (e) {
      setError(e.message || 'Connection failed')
    } finally {
      setConnecting(false)
    }
  }, [])

  const connectCoinbase = useCallback(async () => {
    setConnecting(true); setError(null)
    try {
      const cbProvider = coinbaseWallet.makeWeb3Provider(BASE_CHAIN_PARAMS.rpcUrls[0], BASE_CHAIN_ID)
      await setupWallet(cbProvider)
    } catch (e) {
      setError(e.message || 'Coinbase connection failed')
    } finally {
      setConnecting(false)
    }
  }, [coinbaseWallet])

  const disconnect = useCallback(() => {
    setProvider(null); setSigner(null); setAddress(null); setChainOk(false)
  }, [])

  return (
    <WalletContext.Provider value={{ provider, signer, address, chainOk, connecting, error, connect, connectCoinbase, disconnect }}>
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  return useContext(WalletContext)
}
