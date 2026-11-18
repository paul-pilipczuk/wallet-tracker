export type Chain = "BTC" | "ETH" | "SOL";

export const CHAIN_COLORS: Record<Chain, string> = {
  BTC: "#F7931A",
  ETH: "#627EEA",
  SOL: "#00FFA3",
};

export const CHAIN_ICONS: Record<Chain, string> = {
  BTC: "₿",
  ETH: "Ξ",
  SOL: "◎",
};

export const ETH_L2 = ["Base", "Ink", "OP Mainnet", "Arbitrum", "Polygon", "zkSync"];
