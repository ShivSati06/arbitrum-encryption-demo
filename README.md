 🔐 Encryption + Blockchain Demo (Arbitrum-Inspired Layer 2)

This project is a **web-based encryption and blockchain simulation** that mimics **Layer 2 rollups like Arbitrum**, complete with encrypted messaging, blockchain storage, L1 submission, and export/import functionality.

## 🚀 Features

### 🔐 Encryption
- AES-based encryption of user input.
- Optional custom key integration (TODO).

### 📦 Mock Blockchain
- Stores encrypted messages as blocks on a simulated **Layer 2 chain**.
- Includes timestamp, hash, and chaining via previous hash.

### ⛓️ Layer 1 Finalization
- Users can "submit" blocks from L2 to a simulated Layer 1 chain.
- Simulates Arbitrum's optimistic rollup behavior with finality proofs.

### 🔁 Import/Export
- Export full blockchain state (L2 + L1) to JSON.
- Import previously saved chains.

### 🎨 UX Features
- Light/Dark theme toggle.
- Responsive UI with animations and toasts.
- Focused on accessibility and visual clarity.

## 🧪 How to Use

1. Enter a message into the text area.
2. Click **Encrypt & Store (L2)** to add it to the Layer 2 blockchain.
3. Click **Submit to L1** to simulate Arbitrum-style finalization.
4. Use **Decrypt Last Entry** to retrieve and view the original message.
5. Export your blockchain state, or import a previous one.

## 🧠 Advanced Ideas
- 🔄 Real Arbitrum integration via MetaMask + testnet.
- 🧬 Turn encrypted blocks into NFTs.
- 🔑 Only NFT holders can decrypt messages.
- 🌐 IPFS or decentralized storage for immutable message logs.

## 🛠 Tech Stack
- HTML, CSS, JavaScript
- [CryptoJS](https://cryptojs.gitbook.io/docs/) for AES encryption
- `localStorage` for persistent blockchain state

## 📦 Folder Structure
```
├── index.html         # Main HTML UI
├── style.css          # Responsive dark/light styling
├── script.js          # Encryption, Blockchain, Arbitrum simulation
```

## 🎯 Hackathon Pitch Idea
> “A secure messaging DApp simulation using rollup-based Layer 2 architecture — inspired by Arbitrum. We built a fully interactive blockchain simulator with encryption, L2 transaction batching, and L1 finality, perfect for learning or demonstrating how optimistic rollups actually work.”

## 🌐 Demo (if hosted)
Coming soon — or host via:
- GitHub Pages
- Netlify / Vercel

## 🤝 Contributions
PRs welcome! Suggestions for improving smart contract integration or adding ZK-rollup support are 🔥 appreciated.

---

Built for exploration. Inspired by Arbitrum. Powered by creativity.

