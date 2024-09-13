import ArbTokens from "./arbitrum.json";
import ETHTokens from "./ethereum.json";
import BSCTokens from "./bsc.json";
import PolygonTokens from "./polygon.json";
import OPTokens from "./optimism.json";
import AVATokens from "./avalanche.json";

export const Tokens = {
  1: ETHTokens,
  10: OPTokens,
  56: BSCTokens,
  137: PolygonTokens,
  42161: ArbTokens,
  43114: AVATokens,
};
