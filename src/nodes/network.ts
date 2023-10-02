import { Subset } from "../utils";
import { type Network } from "../utils/network";

export type NetworkEnvironment =
  // | ["ethereum", "mainnet"]
  // | ["celo", "mainnet"]
  | ["celo", "alfajores"]
  // | ["chainlink", "mainnet"]
  | ["chainlink", "sepolia"];

export type NetworkEnvironmentKey = Subset<
  Network,
  // "celo" |
  | "alfajores"
  // "chainlink" |
  | "chainlink_sepolia"
// "ethereum" | "celo" | "alfajores" | "chainlink" | "chainlink_sepolia"
>;

export const NetworksEnvironments: { [K in NetworkEnvironmentKey]: NetworkEnvironment } = {
  // ethereum: ["ethereum", "mainnet"],
  // celo: ["celo", "mainnet"],
  alfajores: ["celo", "alfajores"],
  // chainlink: ["chainlink", "mainnet"],
  chainlink_sepolia: ["chainlink", "sepolia"],
};
