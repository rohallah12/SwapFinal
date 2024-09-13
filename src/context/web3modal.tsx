"use client";

import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

export const chains = [
  {
    chainId: 1,
    name: "Ethereum",
    currency: "ETH",
    explorerUrl: "https://etherscan.io",
    rpcUrl: "https://cloudflare-eth.com",
  },
  {
    chainId: 42161,
    name: "Arbitrum One",
    currency: "ARB",
    commonName: "arbitrum",
    explorerUrl: "https://arbiscan.io",
    rpcUrl: "https://arbitrum-rpc.publicnode.com",
  },
  {
    chainId: 137,
    name: "Polygon",
    currency: "MATIC",
    commonName: "matic",
    explorerUrl: "https://polygonscan.com/",
    rpcUrl: "https://polygon-rpc.com",
  },
  {
    chainId: 10,
    name: "Optimism",
    currency: "OPT",
    commonName: "optimism",
    explorerUrl: "https://optimistic.etherscan.io/",
    rpcUrl: "https://optimism.llamarpc.com",
  },
  {
    chainId: 56,
    name: "Binance Smart Chain",
    currency: "BNB",
    commonName: "bsc",
    explorerUrl: "https://bscscan.com",
    rpcUrl: "https://bsc-dataseed.binance.org/",
  },
  {
    chainId: 43114,
    name: "Avalanche",
    currency: "AVAX",
    commonName: "avalanche",
    explorerUrl: "https://snowtrace.io",
    rpcUrl: "https://api.avax.network/ext/bc/C/rpc",
  },
];

// 3. Create a metadata object
const metadata = {
  name: "SuperTransfer",
  description: "SuperTransfer dApp, swap, transfer cross-chain",
  url: "https://mywebsite.com", // origin must match your domain & subdomain
  icons: ["https://avatars.mywebsite.com/"],
};

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,

  /*Optional*/
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
  rpcUrl: "...", // used for the Coinbase SDK
  defaultChainId: 1, // used for the Coinbase SDK
});

// 5. Create a Web3Modal instance
createWeb3Modal({
  ethersConfig,
  chains,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
});

export function Web3Modal({ children }) {
  return children;
}
