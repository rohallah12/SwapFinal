import swapRouterABI from "./abis/SwapRouterABI.json";
import ERC20ABI from "./abis/ERC20ABI.json";

//UniswapV2 router addresses on different chain ids
export const Routers = {
  1: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D", //ETH
  56: "0x10ED43C718714eb63d5aA57B78B54704E256024E", //BSC
  42161: "0x4752ba5DBc23f44D87826276BF6Fd6b1C372aD24", //Arbitrum
  137: "0x9e5A52f57b3038F1B8EeE45F28b3C1967e22799C", //Polygon
  10: "0x0c3c1c532F1e39EdF36BE9Fe0bE1410313E074Bf", //Optimism
  8453: "0x8909Dc15e40173Ff4699343b6eB8132c65e18eC6", //Base
};

export const Qouters = {
  1: "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6", //ETH
  56: "0x10ED43C718714eb63d5aA57B78B54704E256024E", //BSC
  42161: "0x4752ba5DBc23f44D87826276BF6Fd6b1C372aD24", //Arbitrum
  137: "0x9e5A52f57b3038F1B8EeE45F28b3C1967e22799C", //Polygon
  10: "0x0c3c1c532F1e39EdF36BE9Fe0bE1410313E074Bf", //Optimism
  8453: "0x8909Dc15e40173Ff4699343b6eB8132c65e18eC6", //Base
};

//UniswapV2 router addresses on different chain ids
export const Factories = {
  1: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D", //ETH
  56: "0x10ED43C718714eb63d5aA57B78B54704E256024E", //BSC
  42161: "0x4752ba5DBc23f44D87826276BF6Fd6b1C372aD24", //Arbitrum
  137: "0x9e5A52f57b3038F1B8EeE45F28b3C1967e22799C", //Polygon
  10: "0x0c3c1c532F1e39EdF36BE9Fe0bE1410313E074Bf", //Optimism
  8453: "0x8909Dc15e40173Ff4699343b6eB8132c65e18eC6", //Base
};
//Chain RPC providers
export const Providers = {
  1: "https://ethereum-rpc.publicnode.com", //ETH
  56: "https://bsc-rpc.publicnode.com", //BSC
  42161: "https://arbitrum-one.publicnode.com", //Arbitrum
  43114: "https://avalanche-c-chain-rpc.publicnode.com", //Arbitrum
  137: "https://polygon-bor-rpc.publicnode.com", //Polygon
  10: "https://optimism-rpc.publicnode.com", //Optimism
  8453: "https://base-rpc.publicnode.com", //Base
};

//Default tokens addresses
export const MainTokens = {
  1: {
    ETH: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    USDT: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    USDC: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    DAI: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    BTC: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
    BNB: "0xB8c77482e45F1F44dE1745F52C74426C631bDD52",
  },
  137: {
    ETH: "",
    USDT: "",
    DAI: "",
    BTC: "",
    BNB: "",
  },
  56: {
    ETH: "",
    USDT: "",
    DAI: "",
    BTC: "",
    BNB: "",
  },
  10: {
    ETH: "",
    USDT: "",
    DAI: "",
    BTC: "",
    BNB: "",
  },
};

export const ABIs = {
  swapRouterABI,
  ERC20ABI,
};
