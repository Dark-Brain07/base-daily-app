# Base Daily

A daily check-in mini app on Base Mainnet designed to drive weekly active users (WAU) and rank on the [Base Dashboard Leaderboard](https://dashboard.base.org/leaderboard).

## What's included

- **DailyCheckIn.sol** — On-chain streak tracker
- **EarlyAccessNFT.sol** — Free ERC-721 mint, 1000 supply, one per wallet
- **React frontend** — Wallet connect, check-in, NFT mint, streak display

---

## Project structure

```
base-daily/
├── contracts/
│   ├── DailyCheckIn.sol       # Check-in contract
│   └── EarlyAccessNFT.sol     # NFT contract
├── public/
│   └── favicon.svg

├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── StatCard.jsx
│   │   ├── StreakBadge.jsx
│   │   └── TxToast.jsx
│   ├── hooks/
│   │   ├── useWallet.jsx      # Wallet context + connect
│   │   └── useContracts.js    # Contract interactions
│   ├── lib/
│   │   └── contracts.js       # ABIs + addresses
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Leaderboard.jsx
│   │   └── HowItWorks.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example
├── .gitignore
├── index.html                 # Farcaster frame meta tags here
├── package.json
├── vercel.json
└── vite.config.js
```

---

## Step 1 — Deploy contracts on Remix

1. Go to [remix.ethereum.org](https://remix.ethereum.org)
2. Create two new files and paste each contract
3. Install OpenZeppelin: in the Remix file explorer, the import will auto-resolve
4. Compile with Solidity **0.8.24**
5. In **Deploy & Run**, select **Injected Provider - MetaMask**
6. Switch MetaMask to **Base Mainnet** (Chain ID: 8453)

**Deploy DailyCheckIn.sol:**
- Click Deploy, copy the contract address

**Deploy EarlyAccessNFT.sol:**
- Constructor args:
  - `baseURI` = your metadata URI (e.g. `ipfs://YOUR_CID/` or `https://your-api.com/metadata/`)
- Click Deploy, copy the contract address

---

## Step 2 — Configure the frontend

```bash
cp .env.example .env
```

Edit `.env`:
```
VITE_CHECKIN_CONTRACT=0xYOUR_CHECKIN_CONTRACT_ADDRESS
VITE_NFT_CONTRACT=0xYOUR_NFT_CONTRACT_ADDRESS
VITE_BASE_RPC=https://mainnet.base.org
```

Also update `index.html` and replace `https://YOUR_VERCEL_URL` with your actual Vercel URL after deploying.

---

## Step 3 — Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## Step 4 — Deploy to Vercel

### Option A: Vercel CLI
```bash
npm install -g vercel
vercel
```

### Option B: Vercel Dashboard
1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repo
4. Add environment variables (same as `.env`):
   - `VITE_CHECKIN_CONTRACT`
   - `VITE_NFT_CONTRACT`
   - `VITE_BASE_RPC`
5. Click Deploy

---

## Contracts at a glance

| Contract | Key functions |
|---|---|
| DailyCheckIn | `checkIn()` |
| EarlyAccessNFT | `mint()` |

---

## License

MIT
