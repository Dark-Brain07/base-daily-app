export const BASE_CHAIN_ID = 8453

export const BASE_CHAIN_PARAMS = {
  chainId: '0x2105',
  chainName: 'Base',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: ['https://mainnet.base.org'],
  blockExplorerUrls: ['https://basescan.org']
}

export const ADDRESSES = {
  checkIn: import.meta.env.VITE_CHECKIN_CONTRACT || '0x0000000000000000000000000000000000000000',
  nft:     import.meta.env.VITE_NFT_CONTRACT     || '0x0000000000000000000000000000000000000000'
}

export const CHECKIN_ABI = [
  'function checkIn() external',
  'function canCheckIn(address user) view returns (bool)',
  'function getStats(address user) view returns (uint256 streak, uint256 total, uint256 lastCheckIn, bool canCheckIn)',
  'event CheckedIn(address indexed user, uint256 streak, uint256 timestamp)'
]

export const NFT_ABI = [
  'function mint() external payable',
  'function hasMinted(address) view returns (bool)',
  'function totalMinted() view returns (uint256)',
  'function MAX_SUPPLY() view returns (uint256)',
  'event Minted(address indexed user, uint256 tokenId)'
]
