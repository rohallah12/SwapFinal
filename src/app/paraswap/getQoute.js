import axios from "axios";
import { GET_PRICE, GET_SWAP_OBJ } from "./routes";

//Get a qoute for tokenA => tokenB swap on chain
export const getQoute = async (
  chain,
  slippage,
  amountIn,
  tokenIn,
  tokenOut,
  userAddress,
  isSwap = false,
  receiver = ""
) => {
  let data = {
    srcToken: tokenIn.address,
    destToken: tokenOut.address,
    srcDecimals: tokenIn.decimals,
    destDecimals: tokenOut.decimals,
    network: chain,
    slippage,
    amount: amountIn,
    side: "SELL",
    userAddress,
    maxImpact: 10,
    isDirectFeeTransfer: true,
    partnerFeeBps: 100,
    partnerAddress: '0x2146eDa06a5823e840f0F99A34bF41C6CC9CE504',
    partner: '0x2146eDa06a5823e840f0F99A34bF41C6CC9CE504'
  };
  console.log(chain);
  console.log(data)
  if (isSwap) {
    if (!receiver || !userAddress) {
      throw Error("receiver and userAddress must be set!");
    }
    data = { ...data, receiver, userAddress };
  }
  const params = new URLSearchParams(data);
  try {
    const result = await axios.get(
      `${!isSwap ? GET_PRICE : GET_SWAP_OBJ}?${params}`
    );
    console.log(result);
    console.log(result.data);
    return { ...result.data.priceRoute, txParams: result.data.txParams };
  } catch (e) {
    if (e.response.data.error == "No routes found with enough liquidity") {
      return "NO_LIQUIDITY";
    }
  }
};
